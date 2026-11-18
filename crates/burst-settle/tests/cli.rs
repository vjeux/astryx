//! The command end to end, on recordings ffmpeg made: two moves of a box
//! (YDIF), one pixel that changes by one luma step (YDIF `6.17284e-06`), and a
//! fade (YAVG).

use std::io::Write;
use std::path::Path;
use std::process::{Command, Stdio};

fn run(args: &[&str], stdin: Option<&str>) -> (Option<i32>, String) {
    let (code, out, _) = run_full(args, stdin);
    (code, out)
}

fn run_full(args: &[&str], stdin: Option<&str>) -> (Option<i32>, String, String) {
    let mut child = Command::new(env!("CARGO_BIN_EXE_burst-settle"))
        .args(args)
        .current_dir(Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures"))
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .unwrap();
    child.stdin.take().unwrap().write_all(stdin.unwrap_or("").as_bytes()).unwrap();
    let out = child.wait_with_output().unwrap();
    let text = |b: Vec<u8>| String::from_utf8(b).unwrap();
    (out.status.code(), text(out.stdout), text(out.stderr))
}

fn bursts_of(text: &str) -> Vec<&str> {
    text.lines().filter(|l| l.starts_with("burst ")).collect()
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
    assert!(text.contains("\"settle\":{\"frame\":85,\"time\":2.833333},\"quiet_after_frames\":3}]"), "{text}");
    assert!(text.contains("\"settle_ms\":null,\"settle_frames\":3,\"end\":null"), "{text}");
    assert!(text.trim_end().ends_with("\"settled\":true}"), "{text}");
}

#[test]
fn a_series_on_stdin_that_ends_moving_exits_1() {
    let (code, text) = run(&["--threshold", "1", "--fps", "10", "-"], Some("0\n0\n5\n0\n"));
    assert_eq!(code, Some(1), "{text}");
    assert!(
        text.contains("burst 1: from 0.200 s (frame 2) to 0.200 s (frame 2), peak 5 at 0.200 s (frame 2); NOT SETTLED: the series ends 1 quiet frame after it, under 3"),
        "{text}"
    );
    assert!(text.ends_with("1 burst; burst 1 has not settled when the series ends\n"), "{text}");
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

/// The 12 Android rotation takes of #8095 (portrait, landscape, portrait), as
/// the farm reads them: the YAVG of each frame's difference from the one
/// before, 270 px wide (`movie=rotate.mp4,scale=270:-2,format=gray,
/// tblend=all_mode=difference,signalstats`), with each recording's duration
/// from ffprobe. A screen recording writes a frame only on a change, so the
/// frame times are irregular.
const ROTATIONS: [(&str, &str); 12] = [
    ("custom-cancel-label-B", "5.260378"),
    ("custom-cancel-label-H", "5.377144"),
    ("delete-B", "5.203044"),
    ("delete-H", "5.351444"),
    ("desktop-fine-pointer-B", "5.304789"),
    ("desktop-fine-pointer-H", "5.198900"),
    ("long-content-B", "5.244422"),
    ("long-content-H", "5.426267"),
    ("mobile-touch-B", "7.959533"),
    ("mobile-touch-H", "5.211633"),
    ("narrow-fine-pointer-B", "5.160811"),
    ("narrow-fine-pointer-H", "5.253633"),
];

fn rotation(label: &str, end: &str) -> (Option<i32>, String) {
    let file = format!("rotate-8095/{label}.json");
    let args = ["--key", "lavfi.signalstats.YAVG", "--threshold", "0.4", "--settle-ms", "250", "--end", end, &file];
    run(&args, None)
}

#[test]
fn the_twelve_rotation_takes_give_the_farms_bursts() {
    for (label, end) in ROTATIONS {
        let (code, text) = rotation(label, end);
        assert!(code == Some(0) || code == Some(1), "{label}: {text}");
        let want = if label == "narrow-fine-pointer-B" { 3 } else { 2 };
        assert_eq!(bursts_of(&text).len(), want, "{label}: {text}");
    }
    let (_, text) = rotation("narrow-fine-pointer-B", "5.160811");
    let b = bursts_of(&text);
    assert!(b[0].contains("from 1.320 s") && b[0].contains(" to 1.442 s"), "{text}");
    assert!(b[1].contains("from 1.702 s") && b[1].contains(" to 1.702 s"), "{text}");
    assert!(b[2].contains("from 4.735 s") && b[2].contains(" to 5.085 s"), "{text}");
}

#[test]
fn counting_frames_is_refused_on_a_variable_frame_rate_take() {
    let file = "rotate-8095/narrow-fine-pointer-B.json";
    let (code, out, err) = run_full(&["--key", "lavfi.signalstats.YAVG", "--threshold", "0.4", file], None);
    assert_eq!(code, Some(2), "{out}");
    assert!(out.is_empty(), "{out}");
    assert!(err.contains("irregular") && err.contains("--settle-ms"), "{err}");
    let (code, out) = run(&["--key", "lavfi.signalstats.YAVG", "--threshold", "0.4", "--force-frames", file], None);
    assert!(code == Some(0) || code == Some(1), "{out}");
    assert!(!bursts_of(&out).is_empty(), "{out}");
}

#[test]
fn two_moves_3_s_apart_with_no_frame_between_are_two_bursts() {
    let series = "0.000 0\n0.100 5\n0.117 5\n3.100 5\n3.117 5\n3.500 0\n";
    let (code, text) = run(&["--threshold", "1", "--settle-ms", "250", "--end", "4", "-"], Some(series));
    assert_eq!(code, Some(0), "{text}");
    let b = bursts_of(&text);
    assert_eq!(b.len(), 2, "{text}");
    assert!(b[0].ends_with("settles at 0.117 s (frame 2); no frame moves for the next 2983 ms"), "{text}");
    assert_eq!(run(&["--threshold", "1", "-"], Some(series)).0, Some(2), "frame counting would merge them");
}

#[test]
fn still_moving_is_judged_at_the_recordings_end() {
    let series = "0.000 0\n0.500 5\n0.533 0\n";
    let (code, text) = run(&["--threshold", "1", "--settle-ms", "250", "--end", "1.0", "-"], Some(series));
    assert_eq!(code, Some(0), "{text}");
    assert!(text.contains("settles at 0.500 s (frame 1); no frame moves in the 500 ms before the recording ends"), "{text}");
    let (code, text) = run(&["--threshold", "1", "--settle-ms", "250", "--end", "0.6", "-"], Some(series));
    assert_eq!(code, Some(1), "{text}");
    assert!(text.contains("NOT SETTLED: the recording ends 100 ms after its last moving frame, under 250 ms"), "{text}");
}

#[test]
fn format_duration_in_the_json_is_the_recordings_end() {
    let json = r#"{"frames": [{"pts_time": "0.0", "tags": {"k": "0"}}, {"pts_time": "0.5", "tags": {"k": "5"}},
                  {"pts_time": "0.6", "tags": {"k": "0"}}], "format": {"start_time": "0.000000", "duration": "1.000000"}}"#;
    let (code, text) = run(&["--key", "k", "--threshold", "1", "--settle-ms", "250", "-"], Some(json));
    assert_eq!(code, Some(0), "{text}");
    assert!(text.lines().next().unwrap().ends_with("the recording ends at 1.000 s (format.duration)"), "{text}");
    let (code, text) = run(&["--key", "k", "--threshold", "1", "--settle-ms", "250", "--end", "0.7", "-"], Some(json));
    assert_eq!(code, Some(1), "{text}");
    assert!(text.lines().next().unwrap().ends_with("the recording ends at 0.700 s (--end)"), "{text}");
}

#[test]
fn settle_ms_needs_frame_times_and_the_recordings_end() {
    let timed = "0 0\n0.5 5\n";
    for (args, stdin) in [
        (vec!["--threshold", "1", "--settle-ms", "250", "-"], "0\n5\n0\n"),
        (vec!["--threshold", "1", "--settle-ms", "250", "-"], timed),
        (vec!["--threshold", "1", "--settle-ms", "250", "--end", "0.4", "-"], timed),
        (vec!["--threshold", "1", "--settle-ms", "250", "--settle-frames", "3", "--end", "1", "-"], timed),
        (vec!["--threshold", "1", "--settle-ms", "0", "--end", "1", "-"], timed),
    ] {
        let (code, out, err) = run_full(&args, Some(stdin));
        assert_eq!(code, Some(2), "{args:?}: {out}");
        assert!(out.is_empty() && !err.is_empty(), "{args:?}: {out} / {err}");
    }
}

#[test]
fn json_output_in_settle_ms_mode_carries_the_quiet_time() {
    let (code, text) = run(&["--threshold", "1", "--settle-ms", "250", "--end", "1.0", "--json", "-"], Some("0.000 0\n0.500 5\n0.533 0\n"));
    assert_eq!(code, Some(0), "{text}");
    assert!(text.contains("\"settle_ms\":250,\"settle_frames\":null,\"end\":1"), "{text}");
    assert!(text.contains("\"settle\":{\"frame\":1,\"time\":0.5},\"quiet_after_ms\":500"), "{text}");
}
