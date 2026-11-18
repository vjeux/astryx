//! The command end to end: exit codes and output on files written here.

use std::path::{Path, PathBuf};
use std::process::{Command, Output};

fn run(args: &[&Path]) -> (Option<i32>, String) {
    let Output { status, stdout, .. } =
        Command::new(env!("CARGO_BIN_EXE_png-chunks")).args(args).output().unwrap();
    (status.code(), String::from_utf8(stdout).unwrap())
}

fn scratch(name: &str) -> PathBuf {
    let dir = std::env::temp_dir().join(format!("png-chunks-test-{}-{name}", std::process::id()));
    let _ = std::fs::remove_dir_all(&dir);
    std::fs::create_dir_all(&dir).unwrap();
    dir
}

fn fixture(name: &str) -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures").join(name)
}

#[test]
fn a_clean_tree_exits_0_and_names_other_files() {
    let dir = scratch("clean");
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("a.png")).unwrap();
    std::fs::create_dir(dir.join("sub")).unwrap();
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("sub/B.PNG")).unwrap();
    std::fs::write(dir.join("notes.txt"), "not a png").unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(0), "{text}");
    assert!(text.ends_with("2 PNGs: 2 clean, 0 with metadata, 0 unreadable; 1 other file not checked\n"), "{text}");
    assert!(text.contains("a.png: IHDR"), "{text}");
    assert!(text.contains("notes.txt: not checked: not a .png name"), "{text}");
}

#[test]
fn a_text_chunk_exits_1_and_is_named_without_its_text() {
    let dir = scratch("text");
    std::fs::copy(fixture("imagemagick-comment.png"), dir.join("c.png")).unwrap();
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("d.png")).unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(1), "{text}");
    assert!(text.contains("  METADATA: "), "{text}");
    assert!(text.contains("tEXt \"comment\""), "{text}");
    assert!(!text.contains("hello"), "the comment's text is never printed: {text}");
    assert!(text.ends_with("2 PNGs: 1 clean, 1 with metadata, 0 unreadable\n"), "{text}");
}

#[test]
fn quiet_prints_only_the_failures_and_the_summary() {
    let dir = scratch("quiet");
    std::fs::copy(fixture("imagemagick-comment.png"), dir.join("c.png")).unwrap();
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("d.png")).unwrap();
    let (code, text) = run(&[Path::new("--quiet"), &dir]);
    assert_eq!(code, Some(1), "{text}");
    assert!(!text.contains("d.png"), "{text}");
    assert_eq!(text.lines().count(), 3, "{text}");
}

#[test]
fn a_damaged_file_exits_2_even_beside_metadata() {
    let dir = scratch("damaged");
    std::fs::copy(fixture("imagemagick-comment.png"), dir.join("c.png")).unwrap();
    let mut bytes = std::fs::read(fixture("imagemagick-strip.png")).unwrap();
    let middle = bytes.len() / 2;
    bytes[middle] ^= 0xFF;
    std::fs::write(dir.join("e.png"), bytes).unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(2), "{text}");
    assert!(text.contains("e.png: UNREADABLE: "), "{text}");
    assert!(text.ends_with("2 PNGs: 0 clean, 1 with metadata, 1 unreadable\n"), "{text}");
}

#[test]
fn no_png_and_usage_errors_exit_2() {
    let empty = scratch("empty");
    assert_eq!(run(&[&empty]).0, Some(2));
    assert_eq!(run(&[]).0, Some(2));
    assert_eq!(run(&[Path::new("--bogus"), &empty]).0, Some(2));
    assert_eq!(run(&[&empty.join("missing.png")]).0, Some(2));
}

/// PNG's CRC-32, bit by bit.
fn crc32(parts: &[&[u8]]) -> u32 {
    let mut c = 0xFFFF_FFFFu32;
    for part in parts {
        for &b in *part {
            c ^= u32::from(b);
            for _ in 0..8 {
                c = if c & 1 != 0 { 0xEDB8_8320 ^ (c >> 1) } else { c >> 1 };
            }
        }
    }
    c ^ 0xFFFF_FFFF
}

/// The PNG with one more chunk, with a valid CRC, just before IEND.
fn with_chunk(png: &[u8], kind: &[u8; 4], data: &[u8]) -> Vec<u8> {
    let iend = png.len() - 12;
    let mut out = png[..iend].to_vec();
    out.extend_from_slice(&(data.len() as u32).to_be_bytes());
    out.extend_from_slice(kind);
    out.extend_from_slice(data);
    out.extend_from_slice(&crc32(&[kind, data]).to_be_bytes());
    out.extend_from_slice(&png[iend..]);
    out
}

#[test]
fn a_private_chunk_fails_unless_allowed() {
    let dir = scratch("private");
    let clean = std::fs::read(fixture("imagemagick-strip.png")).unwrap();
    std::fs::write(dir.join("p.png"), with_chunk(&clean, b"prIv", b"secret-host.example")).unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(1), "{text}");
    assert!(text.contains("  METADATA: unknown chunk prIv at byte "), "{text}");
    assert!(!text.contains("secret-host"), "{text}");
    let (code, text) = run(&[Path::new("--allow"), Path::new("prIv"), &dir]);
    assert_eq!(code, Some(0), "{text}");
    assert!(text.contains("p.png: IHDR"), "{text}");
}

#[test]
fn an_icc_profile_needs_an_allow_and_known_metadata_stays_named() {
    let dir = scratch("iccp");
    let clean = std::fs::read(fixture("imagemagick-strip.png")).unwrap();
    std::fs::write(dir.join("i.png"), with_chunk(&clean, b"iCCP", b"Display\0\0xyz")).unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(1), "{text}");
    assert!(text.contains("unknown chunk iCCP at byte "), "{text}");
    assert_eq!(run(&[Path::new("--allow=iCCP"), &dir]).0, Some(0));
    std::fs::copy(fixture("imagemagick-comment.png"), dir.join("c.png")).unwrap();
    let (code, text) = run(&[Path::new("--allow=iCCP"), &dir]);
    assert_eq!(code, Some(1), "{text}");
    assert!(text.contains("tEXt \"comment\" at byte "), "{text}");
    assert_eq!(run(&[Path::new("--allow"), Path::new("bad!"), &dir]).0, Some(2));
}

#[cfg(unix)]
#[test]
fn a_symlinked_directory_is_followed() {
    let dir = scratch("link");
    let other = scratch("link-target");
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("ok.png")).unwrap();
    std::fs::copy(fixture("imagemagick-comment.png"), other.join("c.png")).unwrap();
    std::os::unix::fs::symlink(&other, dir.join("linked")).unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(1), "{text}");
    assert!(text.contains("linked/c.png: IHDR"), "{text}");
    assert!(text.ends_with("2 PNGs: 1 clean, 1 with metadata, 0 unreadable\n"), "{text}");
}

#[cfg(unix)]
#[test]
fn a_symlink_loop_is_named_and_exits_2() {
    let dir = scratch("loop");
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("ok.png")).unwrap();
    std::fs::create_dir(dir.join("sub")).unwrap();
    std::os::unix::fs::symlink(&dir, dir.join("sub/back")).unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(2), "{text}");
    assert!(text.contains("sub/back: UNREADABLE: a symlink loop back to "), "{text}");
}

#[cfg(unix)]
#[test]
fn a_broken_symlink_is_unreadable() {
    let dir = scratch("broken");
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("ok.png")).unwrap();
    std::os::unix::fs::symlink(dir.join("gone.png"), dir.join("dangling")).unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(2), "{text}");
    assert!(text.contains("dangling: UNREADABLE: "), "{text}");
}

#[test]
fn other_files_are_named_and_counted_even_when_quiet() {
    let dir = scratch("others");
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("ok.png")).unwrap();
    std::fs::write(dir.join("notes.jpg"), "x").unwrap();
    std::fs::write(dir.join("labels.md"), "x").unwrap();
    let (code, text) = run(&[Path::new("--quiet"), &dir]);
    assert_eq!(code, Some(0), "{text}");
    assert!(text.contains("labels.md: not checked: not a .png name"), "{text}");
    assert!(text.contains("notes.jpg: not checked: not a .png name"), "{text}");
    assert!(text.ends_with("1 PNG: 1 clean, 0 with metadata, 0 unreadable; 2 other files not checked\n"), "{text}");
}
