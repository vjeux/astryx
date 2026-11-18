//! The command end to end, on recordings ffmpeg made: two moves of a box
//! (YDIF), one pixel that changes by one luma step (YDIF `6.17284e-06`), and a
//! fade (YAVG).

use std::io::Write;
use std::path::Path;
use std::process::{Command, Stdio};

fn run(args: &[&str], stdin: Option<&str>) -> (Option<i32>, String) {
    let mut child = Command::new(env!("CARGO_BIN_EXE_burst-settle"))
        .args(args)
        .current_dir(Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures"))
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .spawn()
        .unwrap();
    child.stdin.take().unwrap().write_all(stdin.unwrap_or("").as_bytes()).unwrap();
    let out = child.wait_with_output().unwrap();
    (out.status.code(), String::from_utf8(out.stdout).unwrap())
}

const TWO_MOVES: [&str; 3] = [
    "burst 1: from 1.000 s (frame 30) to 1.500 s (frame 45), peak 4.54167 at 1.000 s (frame 30); settles at 1.533 s (frame 46)",
    "burst 2: from 2.533 s (frame 76) to 2.800 s (frame 84), peak 1.58958 at 2.533 s (frame 76); settles at 2.833 s (frame 85)",
    "2 bursts; the last settles at 2.833 s (frame 85)",
];

#[test]
fn ffprobe_json_finds_the_two_moves_and_their_settle_frames() {
    let (code, text) = run(&["--threshold", "0.5", "ydif-two-moves.json"], None);
    assert_eq!(code, Some(0), "{text}");
    assert_eq!(text.lines().skip(1).collect::<Vec<_>>(), TWO_MOVES, "{text}");
    assert!(text.starts_with("ydif-two-moves.json: 120 frames (ffprobe JSON, 0.000–3.967 s)"), "{text}");
}

#[test]
fn metadata_print_of_the_same_recording_agrees() {
    let (code, text) = run(&["--threshold=0.5", "ydif-two-moves.txt"], None);
    assert_eq!(code, Some(0), "{text}");
    assert_eq!(text.lines().skip(1).collect::<Vec<_>>(), TWO_MOVES, "{text}");
}

#[test]
fn an_exponent_value_is_millionths_so_one_pixel_makes_no_burst() {
    let (code, text) = run(&["--threshold", "0.5", "ydif-one-pixel.json"], None);
    assert_eq!(code, Some(0), "{text}");
    assert!(
        text.ends_with("no burst: no frame's motion is over 0.5; the highest is 6.17284e-06 at 1.000 s (frame 30)\n"),
        "{text}"
    );
    let (code, text) = run(&["--threshold", "1e-6", "ydif-one-pixel.json"], None);
    assert_eq!(code, Some(0), "{text}");
    assert!(
        text.contains("burst 1: from 1.000 s (frame 30) to 1.000 s (frame 30), peak 6.17284e-06 at 1.000 s (frame 30); settles at 1.033 s (frame 31)"),
        "{text}"
    );
}

#[test]
fn delta_finds_a_fade_in_a_level() {
    let (code, text) = run(&["--key", "lavfi.signalstats.YAVG", "--delta", "--threshold", "1", "yavg-fade.json"], None);
    assert_eq!(code, Some(0), "{text}");
    assert!(
        text.contains("burst 1: from 1.033 s (frame 31) to 1.300 s (frame 39), peak 25 at 1.067 s (frame 32); settles at 1.333 s (frame 40)"),
        "{text}"
    );
}

#[test]
fn json_output_carries_every_burst() {
    let (code, text) = run(&["--threshold", "0.5", "--json", "ydif-two-moves.json"], None);
    assert_eq!(code, Some(0), "{text}");
    assert_eq!(text.lines().count(), 1, "{text}");
    assert!(text.contains("\"bursts\":[{\"start\":{\"frame\":30,\"time\":1}"), "{text}");
    assert!(text.contains("\"settle\":{\"frame\":85,\"time\":2.833333}}]"), "{text}");
    assert!(text.trim_end().ends_with("\"settled\":true}"), "{text}");
}

#[test]
fn a_series_on_stdin_that_ends_moving_exits_1() {
    let (code, text) = run(&["--threshold", "1", "--fps", "10", "-"], Some("0\n0\n5\n0\n"));
    assert_eq!(code, Some(1), "{text}");
    assert!(
        text.contains("burst 1: from 0.200 s (frame 2) to 0.200 s (frame 2), peak 5 at 0.200 s (frame 2); STILL MOVING: the series ends 1 quiet frame after it"),
        "{text}"
    );
    assert!(text.ends_with("1 burst; burst 1 is still moving when the series ends\n"), "{text}");
}

#[test]
fn a_series_keeps_its_exponents() {
    let (code, text) = run(&["--threshold", "0.5", "-"], Some("# YDIF\n0\n6.17284e-06\n1.2E-05\n0\n"));
    assert_eq!(code, Some(0), "{text}");
    assert!(text.ends_with("the highest is 1.2E-05 at frame 2\n"), "{text}");
}

#[test]
fn errors_exit_2_and_print_nothing_on_stdout() {
    for args in [
        vec!["ydif-two-moves.json"],
        vec!["--threshold", "0.5", "missing.json"],
        vec!["--threshold", "0.5", "--key", "lavfi.signalstats.NOPE", "ydif-two-moves.json"],
        vec!["--threshold", "0.5", "--fps", "30", "ydif-two-moves.json"],
        vec!["--threshold", "0.5", "--bogus", "ydif-two-moves.json"],
    ] {
        let (code, text) = run(&args, None);
        assert_eq!(code, Some(2), "{args:?}: {text}");
        assert!(text.is_empty(), "{args:?}: {text}");
    }
    let (code, _) = run(&["--threshold", "0.5", "-"], Some("0\n6.17284e\n"));
    assert_eq!(code, Some(2));
    let (code, _) = run(&["--threshold", "0.5", "--format", "ffprobe", "-"], Some("{\"frames\": [}"));
    assert_eq!(code, Some(2));
}
