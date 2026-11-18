//! The three inputs, read into one per-frame series: ffprobe's JSON, ffmpeg's
//! `metadata=print` text, and a plain series of `value` or `time value` lines.
//!
//! Each number is read with Rust's float parser, so an exponent is part of the
//! number. A value that does not parse, a frame without the key, or a time
//! that goes back is an error with its place: no frame is ever skipped.

use crate::json::{self, Json};

/// One frame's sample.
#[derive(Debug, Clone, PartialEq)]
pub struct Sample {
    /// The frame's number: ffmpeg's `frame:N`, else its place in the input.
    pub frame: usize,
    pub time: Option<f64>,
    /// The value's text as written.
    pub raw: String,
    pub value: f64,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Format {
    Ffprobe,
    Metadata,
    Series,
}

impl Format {
    pub fn name(self) -> &'static str {
        match self {
            Format::Ffprobe => "ffprobe JSON",
            Format::Metadata => "ffmpeg metadata=print",
            Format::Series => "series",
        }
    }

    pub fn from_flag(flag: &str) -> Option<Format> {
        match flag {
            "ffprobe" => Some(Format::Ffprobe),
            "metadata" => Some(Format::Metadata),
            "series" => Some(Format::Series),
            _ => None,
        }
    }
}

/// The input's format, from its first non-blank character and its lines.
pub fn detect(text: &str) -> Format {
    if text.trim_start().starts_with('{') {
        Format::Ffprobe
    } else if text.lines().any(|l| l.trim_start().starts_with("frame:")) {
        Format::Metadata
    } else {
        Format::Series
    }
}

/// A finite number, exponent and all. `place` names where it was read.
pub fn number(text: &str, place: &str) -> Result<f64, String> {
    let t = text.trim();
    let v: f64 = t.parse().map_err(|_| format!("{place}: `{t}` is not a number"))?;
    if !v.is_finite() {
        return Err(format!("{place}: `{t}` is not a finite number"));
    }
    Ok(v)
}

/// The text of a JSON string or number.
fn scalar(value: &Json, place: &str) -> Result<String, String> {
    match value {
        Json::Str(s) => Ok(s.clone()),
        Json::Num(n) => Ok(n.clone()),
        other => Err(format!("{place}: expected a number or a string, found {other:?}")),
    }
}

/// The time fields ffprobe writes, in the order they are read.
const TIME_FIELDS: [&str; 3] = ["pts_time", "pkt_pts_time", "best_effort_timestamp_time"];

fn read_ffprobe(text: &str, key: &str) -> Result<Vec<Sample>, String> {
    let root = json::parse(text)?;
    let frames = root.get("frames").and_then(Json::as_arr).ok_or(
        "the JSON has no \"frames\" array: run ffprobe with -show_entries frame=pts_time:frame_tags=KEY -of json",
    )?;
    let mut out = Vec::with_capacity(frames.len());
    for (i, f) in frames.iter().enumerate() {
        let place = format!("frame {i}");
        let time = match TIME_FIELDS.iter().find_map(|k| f.get(k).map(|v| (k, v))) {
            Some((k, v)) => Some(number(&scalar(v, &place)?, &format!("{place} {k}"))?),
            None => None,
        };
        let tag = f
            .get("tags")
            .and_then(|t| t.get(key))
            .ok_or_else(|| format!("{place} has no {key} tag"))?;
        let raw = scalar(tag, &place)?;
        let value = number(&raw, &format!("{place} {key}"))?;
        out.push(Sample { frame: i, time, raw, value });
    }
    Ok(out)
}

fn read_metadata(text: &str, key: &str) -> Result<Vec<Sample>, String> {
    let mut out: Vec<Sample> = Vec::new();
    // The frame being read: its number, its line, its time and its value.
    let mut open: Option<(usize, usize, Option<f64>, Option<(String, f64)>)> = None;
    let close = |open: Option<(usize, usize, Option<f64>, Option<(String, f64)>)>,
                 out: &mut Vec<Sample>|
     -> Result<(), String> {
        if let Some((frame, line, time, value)) = open {
            let (raw, value) =
                value.ok_or_else(|| format!("line {line}: frame {frame} has no {key}= line"))?;
            out.push(Sample { frame, time, raw, value });
        }
        Ok(())
    };
    for (n, line) in text.lines().enumerate() {
        let line_no = n + 1;
        let l = line.trim();
        if l.is_empty() {
            continue;
        }
        if let Some(rest) = l.strip_prefix("frame:") {
            close(open.take(), &mut out)?;
            let mut fields = rest.split_whitespace();
            let frame: usize = fields
                .next()
                .and_then(|f| f.parse().ok())
                .ok_or_else(|| format!("line {line_no}: `frame:` without a frame number"))?;
            let mut time = None;
            for field in fields {
                if let Some(t) = field.strip_prefix("pts_time:") {
                    time = Some(number(t, &format!("line {line_no} pts_time"))?);
                }
            }
            open = Some((frame, line_no, time, None));
        } else if let Some((name, value)) = l.split_once('=') {
            let Some(current) = open.as_mut() else {
                return Err(format!("line {line_no}: `{name}=` comes before any frame: line"));
            };
            if name == key {
                if current.3.is_some() {
                    return Err(format!("line {line_no}: frame {} has {key} twice", current.0));
                }
                let v = number(value, &format!("line {line_no} {key}"))?;
                current.3 = Some((value.trim().to_string(), v));
            }
        } else {
            return Err(format!("line {line_no}: neither a frame: line nor a key=value line: `{l}`"));
        }
    }
    close(open.take(), &mut out)?;
    Ok(out)
}

fn read_series(text: &str, fps: Option<f64>) -> Result<Vec<Sample>, String> {
    let mut out: Vec<Sample> = Vec::new();
    let mut width: Option<(usize, usize)> = None;
    for (n, line) in text.lines().enumerate() {
        let line_no = n + 1;
        let content = line.split('#').next().unwrap_or("").trim();
        if content.is_empty() {
            continue;
        }
        let fields: Vec<&str> = content
            .split(|c: char| c == ',' || c.is_whitespace())
            .filter(|f| !f.is_empty())
            .collect();
        match width {
            None => width = Some((fields.len(), line_no)),
            Some((w, first)) if w != fields.len() => {
                return Err(format!(
                    "line {line_no}: {} fields, where line {first} has {w}",
                    fields.len()
                ))
            }
            Some(_) => {}
        }
        let frame = out.len();
        let (time, raw) = match fields.as_slice() {
            [value] => (fps.map(|f| frame as f64 / f), *value),
            [time, value] => {
                if fps.is_some() {
                    return Err("--fps applies only to a series without a time column".to_string());
                }
                (Some(number(time, &format!("line {line_no} time"))?), *value)
            }
            _ => {
                return Err(format!(
                    "line {line_no}: expected `value` or `time value`, found {} fields (a header line needs a leading #)",
                    fields.len()
                ))
            }
        };
        let value = number(raw, &format!("line {line_no} value"))?;
        out.push(Sample { frame, time, raw: raw.to_string(), value });
    }
    Ok(out)
}

/// Reads the input in `format`. `key` names the value in ffprobe's JSON and in
/// ffmpeg's metadata text; `fps` gives a timeless series its times.
pub fn read(text: &str, format: Format, key: &str, fps: Option<f64>) -> Result<Vec<Sample>, String> {
    if fps.is_some() && format != Format::Series {
        return Err(format!("--fps applies only to a series; {} carries its own times", format.name()));
    }
    let samples = match format {
        Format::Ffprobe => read_ffprobe(text, key)?,
        Format::Metadata => read_metadata(text, key)?,
        Format::Series => read_series(text, fps)?,
    };
    if samples.is_empty() {
        return Err("no frames in the input".to_string());
    }
    let timed = samples.iter().filter(|s| s.time.is_some()).count();
    if timed != 0 && timed != samples.len() {
        return Err(format!("{timed} of {} frames have a time: all or none must", samples.len()));
    }
    for pair in samples.windows(2) {
        if let (Some(a), Some(b)) = (pair[0].time, pair[1].time) {
            if b < a {
                return Err(format!(
                    "frame {}'s time {b} is before frame {}'s {a}",
                    pair[1].frame, pair[0].frame
                ));
            }
        }
    }
    Ok(samples)
}

#[cfg(test)]
mod tests {
    use super::*;

    const KEY: &str = "lavfi.signalstats.YDIF";

    #[test]
    fn numbers_read_their_exponents_and_refuse_the_rest() {
        assert_eq!(number("6.17284e-06", "x").unwrap(), 6.17284e-6);
        assert_eq!(number(" 1E3 ", "x").unwrap(), 1000.0);
        assert_eq!(number("-2.5e+2", "x").unwrap(), -250.0);
        for bad in ["", "6.17284e", "1.2.3", "0x10", "nan", "inf", "-infinity", "N/A", "1,5"] {
            assert!(number(bad, "here").unwrap_err().starts_with("here: "), "{bad}");
        }
    }

    #[test]
    fn detect_tells_the_three_formats_apart() {
        assert_eq!(detect("  {\"frames\": []}"), Format::Ffprobe);
        assert_eq!(detect("frame:0    pts:0       pts_time:0\nk=1\n"), Format::Metadata);
        assert_eq!(detect("# t v\n0 1\n"), Format::Series);
    }

    #[test]
    fn ffprobe_json_reads_time_and_tag_exponent_and_all() {
        let text = r#"{"frames": [
            {"pts_time": "0.000000", "tags": {"lavfi.signalstats.YDIF": "0"}},
            {"pts_time": "0.033333", "tags": {"lavfi.signalstats.YDIF": "6.17284e-06"}},
            {"pkt_pts_time": 0.066667, "tags": {"lavfi.signalstats.YDIF": 1.58958}}
        ]}"#;
        let s = read(text, Format::Ffprobe, KEY, None).unwrap();
        assert_eq!(s.len(), 3);
        assert_eq!(s[1].value, 6.17284e-6);
        assert_eq!(s[1].raw, "6.17284e-06");
        assert_eq!(s[2].time, Some(0.066667));
        assert_eq!(s[2].value, 1.58958);
    }

    #[test]
    fn ffprobe_json_refuses_a_missing_tag_or_a_bad_time() {
        let missing = r#"{"frames": [{"pts_time": "0", "tags": {}}]}"#;
        assert!(read(missing, Format::Ffprobe, KEY, None).unwrap_err().contains("frame 0 has no"));
        let na = r#"{"frames": [{"pts_time": "N/A", "tags": {"lavfi.signalstats.YDIF": "0"}}]}"#;
        assert!(read(na, Format::Ffprobe, KEY, None).unwrap_err().contains("`N/A` is not a number"));
        let back = r#"{"frames": [{"pts_time": "1", "tags": {"lavfi.signalstats.YDIF": "0"}},
                                  {"pts_time": "0.5", "tags": {"lavfi.signalstats.YDIF": "0"}}]}"#;
        assert!(read(back, Format::Ffprobe, KEY, None).unwrap_err().contains("before frame 0"));
        assert!(read("{}", Format::Ffprobe, KEY, None).unwrap_err().contains("no \"frames\" array"));
    }

    #[test]
    fn metadata_print_reads_each_frame_block() {
        let text = "frame:0    pts:0       pts_time:0\nlavfi.signalstats.YDIF=0\n\
                    frame:1    pts:512     pts_time:0.0333333\nlavfi.other=4\nlavfi.signalstats.YDIF=6.17284e-06\n";
        let s = read(text, Format::Metadata, KEY, None).unwrap();
        assert_eq!(s.len(), 2);
        assert_eq!((s[1].frame, s[1].time, s[1].value), (1, Some(0.0333333), 6.17284e-6));
    }

    #[test]
    fn metadata_print_refuses_a_frame_without_the_key_and_stray_lines() {
        let missing = "frame:0 pts:0 pts_time:0\nlavfi.other=1\nframe:1 pts:1 pts_time:1\nlavfi.signalstats.YDIF=0\n";
        assert!(read(missing, Format::Metadata, KEY, None).unwrap_err().contains("frame 0 has no"));
        let stray = "frame:0 pts:0 pts_time:0\nlavfi.signalstats.YDIF=0\nnoise\n";
        assert!(read(stray, Format::Metadata, KEY, None).unwrap_err().contains("line 3"));
    }

    #[test]
    fn a_series_reads_one_or_two_columns() {
        let s = read("# YDIF\n0\n6.17284e-06\n2\n", Format::Series, KEY, Some(30.0)).unwrap();
        assert_eq!(s.iter().map(|x| x.value).collect::<Vec<_>>(), vec![0.0, 6.17284e-6, 2.0]);
        assert_eq!(s[2].time, Some(2.0 / 30.0));
        let t = read("0.0, 1\n0.5,2\n", Format::Series, KEY, None).unwrap();
        assert_eq!((t[1].time, t[1].value), (Some(0.5), 2.0));
        let untimed = read("1\n2\n", Format::Series, KEY, None).unwrap();
        assert_eq!(untimed[0].time, None);
    }

    #[test]
    fn a_series_refuses_mixed_columns_headers_and_words() {
        assert!(read("1\n0.5 2\n", Format::Series, KEY, None).unwrap_err().contains("line 2"));
        assert!(read("time,value\n0,1\n", Format::Series, KEY, None).unwrap_err().contains("line 1 time"));
        assert!(read("1\nabc\n", Format::Series, KEY, None).unwrap_err().contains("line 2 value"));
        assert!(read("0 1\n", Format::Series, KEY, Some(30.0)).unwrap_err().contains("--fps"));
        assert!(read("", Format::Series, KEY, None).unwrap_err().contains("no frames"));
    }
}
