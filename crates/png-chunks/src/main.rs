//! png-chunks: list each PNG's chunk types, and exit non-zero when a PNG
//! carries metadata that can leak: a tEXt, iTXt, zTXt, eXIf or tIME chunk, or
//! bytes after IEND.
//!
//! Every chunk's length, type and CRC is checked, so a damaged or misread file
//! is an error, never a pass.

use std::fs;
use std::io::Write as _;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

const USAGE: &str = "\
png-chunks: list each PNG's chunk types; refuse text, Exif and time metadata

USAGE:
  png-chunks [--quiet] <file or directory>...

  A directory is walked for files whose name ends in .png (any case), in
  sorted order. A file named directly is read whatever its name.
  --quiet   print only the files that fail, and the summary

Each PNG gets one line: its chunk types in file order, a run of one type as
TYPE×N. A PNG FAILS when it has a tEXt, iTXt, zTXt, eXIf or tIME chunk, or
bytes after IEND. Each one is named on the next line, with the keyword of a
text chunk; the text itself is never printed. Other chunk types are listed,
not judged.

A file is UNREADABLE when its signature is wrong, a chunk's length runs past
the end of the file, a chunk type is not four letters, a CRC is wrong, the
first chunk is not IHDR, or no IEND ends it.

EXIT: 0 every PNG is clean; 1 a PNG carries metadata; 2 a usage error, an
unreadable file, or no PNG found.
";

const SIGNATURE: [u8; 8] = [0x89, b'P', b'N', b'G', 0x0D, 0x0A, 0x1A, 0x0A];

/// Chunk types that carry text, Exif or a timestamp.
const METADATA: [&str; 5] = ["tEXt", "iTXt", "zTXt", "eXIf", "tIME"];

/// The text chunks, whose data starts with a keyword and a NUL.
const TEXT: [&str; 3] = ["tEXt", "iTXt", "zTXt"];

/// The longest keyword a text chunk may have (PNG 11.3.4).
const KEYWORD_MAX: usize = 79;

/// The CRC-32 table of PNG's polynomial (ISO 3309, PNG Annex D).
const CRC_TABLE: [u32; 256] = crc_table();

const fn crc_table() -> [u32; 256] {
    let mut table = [0u32; 256];
    let mut n = 0;
    while n < 256 {
        let mut c = n as u32;
        let mut k = 0;
        while k < 8 {
            c = if c & 1 != 0 { 0xEDB8_8320 ^ (c >> 1) } else { c >> 1 };
            k += 1;
        }
        table[n] = c;
        n += 1;
    }
    table
}

/// The CRC-32 of the parts, in order, as PNG computes it over a chunk's type
/// and data.
pub fn crc32(parts: &[&[u8]]) -> u32 {
    let mut c = 0xFFFF_FFFFu32;
    for part in parts {
        for &b in *part {
            c = CRC_TABLE[((c ^ u32::from(b)) & 0xFF) as usize] ^ (c >> 8);
        }
    }
    c ^ 0xFFFF_FFFF
}

#[derive(Debug, Clone, PartialEq)]
pub struct Chunk {
    pub kind: String,
    /// The byte where the chunk's length field starts.
    pub offset: usize,
    /// The keyword of a text chunk.
    pub keyword: Option<String>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Png {
    pub chunks: Vec<Chunk>,
    /// Bytes that follow the IEND chunk.
    pub after_iend: usize,
}

fn be32(bytes: &[u8], at: usize) -> u32 {
    u32::from_be_bytes([bytes[at], bytes[at + 1], bytes[at + 2], bytes[at + 3]])
}

/// A text chunk's keyword: its bytes before the first NUL, read as Latin-1,
/// with control characters shown as `?`. At most 79 bytes are read.
fn keyword_of(data: &[u8]) -> String {
    let end = data.iter().position(|&b| b == 0).unwrap_or(data.len());
    data[..end.min(KEYWORD_MAX)]
        .iter()
        .map(|&b| if b < 0x20 || b == 0x7F { '?' } else { char::from(b) })
        .collect()
}

/// Reads a PNG's chunk list, checking every length, type and CRC.
pub fn scan(bytes: &[u8]) -> Result<Png, String> {
    if bytes.len() < SIGNATURE.len() || bytes[..SIGNATURE.len()] != SIGNATURE {
        return Err("not a PNG: the 8-byte signature is wrong".to_string());
    }
    let mut chunks: Vec<Chunk> = Vec::new();
    let mut pos = SIGNATURE.len();
    loop {
        let left = bytes.len() - pos;
        if left == 0 {
            return Err(format!("no IEND chunk: the file ends at byte {pos}"));
        }
        if left < 12 {
            return Err(format!("truncated: {left} bytes at byte {pos}, too few for a chunk"));
        }
        let declared = be32(bytes, pos);
        if declared > 0x7FFF_FFFF {
            return Err(format!(
                "the chunk at byte {pos} declares {declared} bytes, over PNG's 2^31-1 limit"
            ));
        }
        let kind_bytes = &bytes[pos + 4..pos + 8];
        if !kind_bytes.iter().all(u8::is_ascii_alphabetic) {
            return Err(format!(
                "the chunk at byte {pos} has a type that is not four letters: {kind_bytes:02x?}"
            ));
        }
        let kind = String::from_utf8_lossy(kind_bytes).into_owned();
        let data_start = pos + 8;
        let data_end = data_start + declared as usize;
        if data_end + 4 > bytes.len() {
            return Err(format!(
                "truncated: the {kind} chunk at byte {pos} declares {declared} bytes, past the end of the file"
            ));
        }
        let data = &bytes[data_start..data_end];
        if be32(bytes, data_end) != crc32(&[kind_bytes, data]) {
            return Err(format!("bad CRC in the {kind} chunk at byte {pos}"));
        }
        if chunks.is_empty() && kind != "IHDR" {
            return Err(format!("the first chunk is {kind}, not IHDR"));
        }
        let keyword = TEXT.contains(&kind.as_str()).then(|| keyword_of(data));
        let is_end = kind == "IEND";
        chunks.push(Chunk { kind, offset: pos, keyword });
        pos = data_end + 4;
        if is_end {
            return Ok(Png { chunks, after_iend: bytes.len() - pos });
        }
    }
}

/// What makes a PNG fail: each metadata chunk, with its keyword when it has
/// one, and any bytes after IEND.
pub fn findings(png: &Png) -> Vec<String> {
    let mut out: Vec<String> = png
        .chunks
        .iter()
        .filter(|c| METADATA.contains(&c.kind.as_str()))
        .map(|c| match &c.keyword {
            Some(k) => format!("{} \"{k}\" at byte {}", c.kind, c.offset),
            None => format!("{} at byte {}", c.kind, c.offset),
        })
        .collect();
    if png.after_iend > 0 {
        out.push(format!("{} bytes after IEND", png.after_iend));
    }
    out
}

/// The chunk types in file order, a run of one type as TYPE×N.
pub fn chunk_line(png: &Png) -> String {
    let mut parts: Vec<String> = Vec::new();
    let mut i = 0;
    while i < png.chunks.len() {
        let kind = &png.chunks[i].kind;
        let mut run = 1;
        while i + run < png.chunks.len() && &png.chunks[i + run].kind == kind {
            run += 1;
        }
        parts.push(if run > 1 { format!("{kind}×{run}") } else { kind.clone() });
        i += run;
    }
    parts.join(" ")
}

fn is_png_name(path: &Path) -> bool {
    path.extension().is_some_and(|e| e.eq_ignore_ascii_case("png"))
}

/// Adds the PNG files under `dir` in sorted order. A directory reached through
/// a symbolic link is not entered.
fn walk(dir: &Path, out: &mut Vec<PathBuf>) -> Result<(), String> {
    let mut entries: Vec<PathBuf> = fs::read_dir(dir)
        .map_err(|e| format!("{}: {e}", dir.display()))?
        .map(|entry| entry.map(|e| e.path()).map_err(|e| format!("{}: {e}", dir.display())))
        .collect::<Result<_, _>>()?;
    entries.sort();
    for path in entries {
        let meta = fs::symlink_metadata(&path).map_err(|e| format!("{}: {e}", path.display()))?;
        if meta.is_dir() {
            walk(&path, out)?;
        } else if is_png_name(&path) {
            out.push(path);
        }
    }
    Ok(())
}

/// The files to read: each file named, and the PNG files under each directory
/// named.
fn collect(args: &[String]) -> Result<Vec<PathBuf>, String> {
    let mut out = Vec::new();
    for arg in args {
        let path = PathBuf::from(arg);
        let meta = fs::metadata(&path).map_err(|e| format!("{arg}: {e}"))?;
        if meta.is_dir() {
            walk(&path, &mut out)?;
        } else {
            out.push(path);
        }
    }
    Ok(out)
}

#[derive(Debug, Default, PartialEq)]
struct Tally {
    clean: usize,
    failed: usize,
    unreadable: usize,
}

/// Why a run stopped before its summary.
#[derive(Debug, PartialEq)]
enum Stop {
    /// The command line is wrong: the usage is printed.
    Usage(String),
    /// A path, a directory or stdout failed.
    Io(String),
}

fn line(out: &mut impl std::io::Write, text: &str) -> Result<(), Stop> {
    writeln!(out, "{text}").map_err(|e| Stop::Io(format!("stdout: {e}")))
}

fn run(args: &[String], out: &mut impl std::io::Write) -> Result<Tally, Stop> {
    let mut quiet = false;
    let mut paths = Vec::new();
    for arg in args {
        match arg.as_str() {
            "--quiet" => quiet = true,
            a if a.starts_with("--") => return Err(Stop::Usage(format!("unknown option {a}"))),
            a => paths.push(a.to_string()),
        }
    }
    if paths.is_empty() {
        return Err(Stop::Usage("name at least one file or directory".to_string()));
    }
    let files = collect(&paths).map_err(Stop::Io)?;
    if files.is_empty() {
        return Err(Stop::Io("no PNG found in the paths given".to_string()));
    }
    let mut tally = Tally::default();
    for file in &files {
        let shown = file.display();
        match fs::read(file).map_err(|e| e.to_string()).and_then(|b| scan(&b)) {
            Err(e) => {
                tally.unreadable += 1;
                line(out, &format!("{shown}: UNREADABLE: {e}"))?;
            }
            Ok(png) => {
                let found = findings(&png);
                if found.is_empty() {
                    tally.clean += 1;
                    if !quiet {
                        line(out, &format!("{shown}: {}", chunk_line(&png)))?;
                    }
                } else {
                    tally.failed += 1;
                    line(out, &format!("{shown}: {}", chunk_line(&png)))?;
                    line(out, &format!("  METADATA: {}", found.join(", ")))?;
                }
            }
        }
    }
    let total = files.len();
    let noun = if total == 1 { "PNG" } else { "PNGs" };
    line(
        out,
        &format!(
            "{total} {noun}: {} clean, {} with metadata, {} unreadable",
            tally.clean, tally.failed, tally.unreadable
        ),
    )?;
    Ok(tally)
}

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    if args.iter().any(|a| a == "--help" || a == "-h") {
        print!("{USAGE}");
        return ExitCode::SUCCESS;
    }
    let stdout = std::io::stdout();
    let mut out = stdout.lock();
    let result = run(&args, &mut out);
    let _ = out.flush();
    match result {
        Err(Stop::Usage(e)) => {
            eprintln!("png-chunks: {e}");
            eprint!("{USAGE}");
            ExitCode::from(2)
        }
        Err(Stop::Io(e)) => {
            eprintln!("png-chunks: {e}");
            ExitCode::from(2)
        }
        Ok(t) if t.unreadable > 0 => ExitCode::from(2),
        Ok(t) if t.failed > 0 => ExitCode::from(1),
        Ok(_) => ExitCode::SUCCESS,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// A PNG from chunks, each with its length and CRC. The data is never
    /// decoded, so IDAT need not be zlib.
    fn png(chunks: &[(&str, &[u8])]) -> Vec<u8> {
        let mut out = SIGNATURE.to_vec();
        for (kind, data) in chunks {
            out.extend_from_slice(&(data.len() as u32).to_be_bytes());
            out.extend_from_slice(kind.as_bytes());
            out.extend_from_slice(data);
            out.extend_from_slice(&crc32(&[kind.as_bytes(), data]).to_be_bytes());
        }
        out
    }

    const IHDR: &[u8] = &[0, 0, 0, 2, 0, 0, 0, 2, 8, 2, 0, 0, 0];

    fn clean() -> Vec<u8> {
        png(&[("IHDR", IHDR), ("sRGB", &[0]), ("IDAT", b"abc"), ("IDAT", b"def"), ("IEND", b"")])
    }

    #[test]
    fn the_crc_matches_pngs_known_iend_value() {
        assert_eq!(crc32(&[b"IEND"]), 0xAE42_6082);
        assert_eq!(crc32(&[b"IE", b"ND"]), 0xAE42_6082);
    }

    #[test]
    fn a_clean_png_lists_its_chunks_and_passes() {
        let p = scan(&clean()).unwrap();
        assert_eq!(chunk_line(&p), "IHDR sRGB IDAT×2 IEND");
        assert_eq!(p.after_iend, 0);
        assert!(findings(&p).is_empty());
    }

    #[test]
    fn each_metadata_chunk_fails_with_its_keyword() {
        let cases: [(&str, &[u8], &str); 5] = [
            ("tEXt", b"Comment\0secret", "tEXt \"Comment\""),
            ("zTXt", b"Raw profile\0\0xyz", "zTXt \"Raw profile\""),
            ("iTXt", b"XML:com.adobe.xmp\0\0\0\0\0<x/>", "iTXt \"XML:com.adobe.xmp\""),
            ("eXIf", b"MM\0*", "eXIf"),
            ("tIME", &[7, 234, 11, 18, 12, 0, 0], "tIME"),
        ];
        for (kind, data, named) in cases {
            let p = scan(&png(&[("IHDR", IHDR), (kind, data), ("IDAT", b"a"), ("IEND", b"")])).unwrap();
            let found = findings(&p);
            assert_eq!(found, vec![format!("{named} at byte 33")], "{kind}");
            assert!(!found[0].contains("secret"), "the text is never printed");
        }
    }

    #[test]
    fn bytes_after_iend_fail() {
        let mut bytes = clean();
        bytes.extend_from_slice(b"hidden");
        let p = scan(&bytes).unwrap();
        assert_eq!(findings(&p), vec!["6 bytes after IEND".to_string()]);
    }

    #[test]
    fn a_keyword_shows_control_bytes_as_question_marks_and_stops_at_79() {
        assert_eq!(keyword_of(b"a\x01b\0text"), "a?b");
        assert_eq!(keyword_of(&[b'k'; 100]).len(), KEYWORD_MAX);
        assert_eq!(keyword_of(b"caf\xe9\0"), "café");
    }

    #[test]
    fn damage_is_an_error_never_a_pass() {
        let good = clean();
        assert!(scan(b"GIF89a").unwrap_err().contains("signature"));

        let mut bad_crc = good.clone();
        let last = bad_crc.len() - 1;
        bad_crc[last] ^= 1;
        assert!(scan(&bad_crc).unwrap_err().contains("bad CRC in the IEND chunk"));

        let truncated = &good[..good.len() - 20];
        assert!(scan(truncated).unwrap_err().contains("truncated"));

        let no_end = png(&[("IHDR", IHDR), ("IDAT", b"a")]);
        assert!(scan(&no_end).unwrap_err().contains("no IEND"));

        let wrong_first = png(&[("IDAT", b"a"), ("IEND", b"")]);
        assert!(scan(&wrong_first).unwrap_err().contains("not IHDR"));

        let mut bad_type = good.clone();
        bad_type[12] = b'1';
        assert!(scan(&bad_type).unwrap_err().contains("not four letters"));

        let mut huge = good;
        huge[8..12].copy_from_slice(&0x8000_0000u32.to_be_bytes());
        assert!(scan(&huge).unwrap_err().contains("2^31-1"));
    }

    #[test]
    fn real_encoder_output_reads_as_expected() {
        let comment = scan(include_bytes!("../tests/fixtures/imagemagick-comment.png")).unwrap();
        let found = findings(&comment);
        assert!(found.iter().any(|f| f.starts_with("tEXt \"comment\"")), "{found:?}");
        assert!(found.iter().any(|f| f.starts_with("tIME")), "{found:?}");
        let strip = scan(include_bytes!("../tests/fixtures/imagemagick-strip.png")).unwrap();
        assert!(findings(&strip).is_empty(), "{}", chunk_line(&strip));
    }
}
