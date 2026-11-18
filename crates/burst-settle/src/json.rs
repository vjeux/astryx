//! A small, strict JSON reader for ffprobe's output. A number keeps its source
//! text, so the caller parses it once, exponent and all.

#[derive(Debug, Clone, PartialEq)]
pub enum Json {
    Null,
    Bool(bool),
    /// The number's text as written, such as `6.17284e-06`.
    Num(String),
    Str(String),
    Arr(Vec<Json>),
    /// Members in document order.
    Obj(Vec<(String, Json)>),
}

impl Json {
    pub fn get(&self, key: &str) -> Option<&Json> {
        match self {
            Json::Obj(members) => members.iter().find(|(k, _)| k == key).map(|(_, v)| v),
            _ => None,
        }
    }

    pub fn as_arr(&self) -> Option<&[Json]> {
        match self {
            Json::Arr(items) => Some(items),
            _ => None,
        }
    }
}

/// The deepest nesting read; ffprobe's output nests a few levels.
const MAX_DEPTH: usize = 64;

pub fn parse(text: &str) -> Result<Json, String> {
    let mut p = Parser { b: text.as_bytes(), i: 0 };
    p.space();
    let value = p.value(0)?;
    p.space();
    if p.i != p.b.len() {
        return Err(p.error("text after the JSON value"));
    }
    Ok(value)
}

struct Parser<'a> {
    b: &'a [u8],
    i: usize,
}

impl Parser<'_> {
    fn error(&self, what: &str) -> String {
        let before = &self.b[..self.i.min(self.b.len())];
        let line = before.iter().filter(|&&c| c == b'\n').count() + 1;
        let column = before.iter().rev().take_while(|&&c| c != b'\n').count() + 1;
        format!("JSON line {line}, column {column}: {what}")
    }

    fn peek(&self) -> Option<u8> {
        self.b.get(self.i).copied()
    }

    fn space(&mut self) {
        while matches!(self.peek(), Some(b' ' | b'\t' | b'\n' | b'\r')) {
            self.i += 1;
        }
    }

    fn eat(&mut self, c: u8) -> Result<(), String> {
        if self.peek() == Some(c) {
            self.i += 1;
            Ok(())
        } else {
            Err(self.error(&format!("expected `{}`", c as char)))
        }
    }

    fn value(&mut self, depth: usize) -> Result<Json, String> {
        if depth > MAX_DEPTH {
            return Err(self.error("nested too deep"));
        }
        match self.peek() {
            Some(b'{') => self.object(depth),
            Some(b'[') => self.array(depth),
            Some(b'"') => Ok(Json::Str(self.string()?)),
            Some(b't') => self.word("true", Json::Bool(true)),
            Some(b'f') => self.word("false", Json::Bool(false)),
            Some(b'n') => self.word("null", Json::Null),
            Some(b'-' | b'0'..=b'9') => self.number(),
            Some(_) => Err(self.error("unexpected character")),
            None => Err(self.error("unexpected end")),
        }
    }

    fn word(&mut self, word: &str, value: Json) -> Result<Json, String> {
        if self.b[self.i..].starts_with(word.as_bytes()) {
            self.i += word.len();
            Ok(value)
        } else {
            Err(self.error(&format!("expected `{word}`")))
        }
    }

    fn object(&mut self, depth: usize) -> Result<Json, String> {
        self.eat(b'{')?;
        let mut members = Vec::new();
        self.space();
        if self.peek() == Some(b'}') {
            self.i += 1;
            return Ok(Json::Obj(members));
        }
        loop {
            self.space();
            if self.peek() != Some(b'"') {
                return Err(self.error("expected a member name"));
            }
            let key = self.string()?;
            self.space();
            self.eat(b':')?;
            self.space();
            let value = self.value(depth + 1)?;
            members.push((key, value));
            self.space();
            match self.peek() {
                Some(b',') => self.i += 1,
                Some(b'}') => {
                    self.i += 1;
                    return Ok(Json::Obj(members));
                }
                _ => return Err(self.error("expected `,` or `}`")),
            }
        }
    }

    fn array(&mut self, depth: usize) -> Result<Json, String> {
        self.eat(b'[')?;
        let mut items = Vec::new();
        self.space();
        if self.peek() == Some(b']') {
            self.i += 1;
            return Ok(Json::Arr(items));
        }
        loop {
            self.space();
            items.push(self.value(depth + 1)?);
            self.space();
            match self.peek() {
                Some(b',') => self.i += 1,
                Some(b']') => {
                    self.i += 1;
                    return Ok(Json::Arr(items));
                }
                _ => return Err(self.error("expected `,` or `]`")),
            }
        }
    }

    fn digits(&mut self) -> usize {
        let start = self.i;
        while matches!(self.peek(), Some(b'0'..=b'9')) {
            self.i += 1;
        }
        self.i - start
    }

    /// A number by JSON's grammar: `-`? int (`.` digits)? ([eE] [+-]? digits)?
    fn number(&mut self) -> Result<Json, String> {
        let start = self.i;
        if self.peek() == Some(b'-') {
            self.i += 1;
        }
        match self.peek() {
            Some(b'0') => {
                self.i += 1;
                if matches!(self.peek(), Some(b'0'..=b'9')) {
                    return Err(self.error("a number may not start with 0"));
                }
            }
            Some(b'1'..=b'9') => {
                self.digits();
            }
            _ => return Err(self.error("expected a digit")),
        }
        if self.peek() == Some(b'.') {
            self.i += 1;
            if self.digits() == 0 {
                return Err(self.error("expected a digit after `.`"));
            }
        }
        if matches!(self.peek(), Some(b'e' | b'E')) {
            self.i += 1;
            if matches!(self.peek(), Some(b'+' | b'-')) {
                self.i += 1;
            }
            if self.digits() == 0 {
                return Err(self.error("expected a digit in the exponent"));
            }
        }
        let text = std::str::from_utf8(&self.b[start..self.i]).expect("ASCII");
        Ok(Json::Num(text.to_string()))
    }

    fn hex4(&mut self) -> Result<u32, String> {
        let digits = self.b.get(self.i..self.i + 4).ok_or_else(|| self.error("short \\u escape"))?;
        let text = std::str::from_utf8(digits).map_err(|_| self.error("bad \\u escape"))?;
        let code = u32::from_str_radix(text, 16).map_err(|_| self.error("bad \\u escape"))?;
        self.i += 4;
        Ok(code)
    }

    fn string(&mut self) -> Result<String, String> {
        self.eat(b'"')?;
        let mut out: Vec<u8> = Vec::new();
        loop {
            let Some(c) = self.peek() else {
                return Err(self.error("unterminated string"));
            };
            self.i += 1;
            match c {
                b'"' => break,
                b'\\' => {
                    let Some(e) = self.peek() else {
                        return Err(self.error("unterminated escape"));
                    };
                    self.i += 1;
                    let simple = match e {
                        b'"' => Some(b'"'),
                        b'\\' => Some(b'\\'),
                        b'/' => Some(b'/'),
                        b'b' => Some(0x08),
                        b'f' => Some(0x0C),
                        b'n' => Some(b'\n'),
                        b'r' => Some(b'\r'),
                        b't' => Some(b'\t'),
                        b'u' => None,
                        _ => return Err(self.error("unknown escape")),
                    };
                    if let Some(byte) = simple {
                        out.push(byte);
                        continue;
                    }
                    let high = self.hex4()?;
                    let code = if (0xD800..0xDC00).contains(&high) {
                        if !self.b[self.i..].starts_with(b"\\u") {
                            return Err(self.error("a high surrogate without its low half"));
                        }
                        self.i += 2;
                        let low = self.hex4()?;
                        if !(0xDC00..0xE000).contains(&low) {
                            return Err(self.error("a high surrogate without its low half"));
                        }
                        0x10000 + ((high - 0xD800) << 10) + (low - 0xDC00)
                    } else if (0xDC00..0xE000).contains(&high) {
                        return Err(self.error("a lone low surrogate"));
                    } else {
                        high
                    };
                    let ch = char::from_u32(code).ok_or_else(|| self.error("bad code point"))?;
                    let mut buf = [0u8; 4];
                    out.extend_from_slice(ch.encode_utf8(&mut buf).as_bytes());
                }
                0x00..=0x1F => return Err(self.error("a control character in a string")),
                _ => out.push(c),
            }
        }
        String::from_utf8(out).map_err(|_| self.error("a string that is not UTF-8"))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn numbers_keep_their_text_exponent_and_all() {
        let j = parse(r#"{"a": 6.17284e-06, "b": -1.5E+3, "c": 0, "d": [1, 2.5]}"#).unwrap();
        assert_eq!(j.get("a"), Some(&Json::Num("6.17284e-06".into())));
        assert_eq!(j.get("b"), Some(&Json::Num("-1.5E+3".into())));
        assert_eq!(j.get("c"), Some(&Json::Num("0".into())));
        assert_eq!(j.get("d").and_then(Json::as_arr).map(<[Json]>::len), Some(2));
    }

    #[test]
    fn strings_read_their_escapes() {
        let j = parse(r#"["a\"b\\c\/\n\u00e9\ud83d\ude00", true, false, null]"#).unwrap();
        let items = j.as_arr().unwrap();
        assert_eq!(items[0], Json::Str("a\"b\\c/\né😀".into()));
        assert_eq!(&items[1..], &[Json::Bool(true), Json::Bool(false), Json::Null]);
    }

    #[test]
    fn broken_json_is_refused_with_its_place() {
        for bad in [
            "{\"a\": 01}",
            "{\"a\": 1.}",
            "{\"a\": 1e}",
            "{\"a\": .5}",
            "[1, 2,]",
            "{\"a\" 1}",
            "\"open",
            "\"tab\there\"",
            "[1] [2]",
            "\"\\ud800\"",
            "{\"a\": NaN}",
        ] {
            let e = parse(bad).unwrap_err();
            assert!(e.starts_with("JSON line 1, column "), "{bad}: {e}");
        }
        assert!(parse("{\n  \"a\": x\n}").unwrap_err().starts_with("JSON line 2, column 8"));
    }
}
