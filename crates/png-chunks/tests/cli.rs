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
fn a_clean_tree_exits_0_and_skips_other_files() {
    let dir = scratch("clean");
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("a.png")).unwrap();
    std::fs::create_dir(dir.join("sub")).unwrap();
    std::fs::copy(fixture("imagemagick-strip.png"), dir.join("sub/B.PNG")).unwrap();
    std::fs::write(dir.join("notes.txt"), "not a png").unwrap();
    let (code, text) = run(&[&dir]);
    assert_eq!(code, Some(0), "{text}");
    assert!(text.ends_with("2 PNGs: 2 clean, 0 with metadata, 0 unreadable\n"), "{text}");
    assert!(text.contains("a.png: IHDR"), "{text}");
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
