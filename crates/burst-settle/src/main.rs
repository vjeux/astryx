//! burst-settle: the motion bursts in a screen recording's per-frame series,
//! and where each one settles, at a stated threshold.
//!
//! Every number is read with Rust's float parser, so `6.17284e-06` is six
//! millionths, never 6.17. A value that does not parse is an error with its
//! place, never a skipped frame. A recording that writes a frame only on a
//! change is judged by elapsed time (`--settle-ms`): counting frames there is
//! refused unless forced.

mod bursts;
mod input;
mod json;

use std::io::{Read, Write};
use std::process::ExitCode;

use input::{Format, Sample};

const USAGE: &str = "\
burst-settle: motion bursts and settle points in a recording's per-frame series

USAGE:
  burst-settle --threshold T [options] <file or ->

  --threshold T      a frame MOVES when its motion is over T, and is QUIET at or
                     below it (required; exponents such as 5e-3 are fine)
  --settle-ms S      judge by elapsed time: a burst settles once more than S ms
                     pass after its last moving frame with no moving frame
                     (needs frame times and the recording's end)
  --settle-frames N  judge by frame count: a burst settles after N quiet frames
                     in a row (the default, with N = 3, for a steady frame rate)
  --force-frames     count frames even when the frame times are irregular
  --end T            the recording's end in seconds, for --settle-ms (default:
                     the JSON's format start_time + duration)
  --key NAME         the tag or key to read (default lavfi.signalstats.YDIF)
  --delta            motion is the change of the value from the previous frame,
                     for a level such as lavfi.signalstats.YAVG; without it, the
                     value itself is the motion, as YDIF or a change energy is
  --format F         ffprobe, metadata or series (default: detected)
  --fps F            frame times for a series without a time column
  --list             also print every frame's time, value and motion
  --json             print the result as one JSON object

INPUTS:
  ffprobe JSON       ffprobe -f lavfi -i \"movie=REC,signalstats\" \\
                       -show_entries frame=pts_time:frame_tags=KEY -of json
  metadata=print     ffmpeg -i REC -vf signalstats,metadata=print:key=KEY:file=OUT -f null -
  series             one `value` or `time value` per line (comma or space between);
                     # starts a comment, so a header line needs one
  the end            ffprobe -v error -show_entries format=duration -of csv=p=0 REC

BY TIME (--settle-ms S): a burst starts at a moving frame, and a moving frame
at most S ms after the burst's last one joins it. Quiet frames and spans with
no frame at all both count as quiet. The burst SETTLES at its last moving
frame once more than S ms pass with no moving frame. The last burst settles
only when the recording's end comes more than S ms after its last moving frame.

BY FRAMES (--settle-frames N): a burst lasts until N quiet frames follow its
last moving frame, and SETTLES at the first of them. When the frame intervals
are irregular (one over 1.5 times the median or under half of it, as when a
recording writes a frame only on a change), counting frames is refused unless
--force-frames is given.

A burst's PEAK is its first frame with the highest motion.

EXIT: 0 every burst settles (or there is none); 1 a burst has not settled by
the end of the series or the recording; 2 a usage, read or parse error.
";

/// How a burst is judged to settle.
#[derive(Debug, Clone, Copy, PartialEq)]
enum Settle {
    /// After this many quiet frames in a row.
    Frames(usize),
    /// Once more than this many milliseconds pass with no moving frame.
    Ms(f64),
}

#[derive(Debug)]
struct Options {
    threshold: f64,
    threshold_text: String,
    settle: Settle,
    settle_text: String,
    force_frames: bool,
    end: Option<f64>,
    key: String,
    delta: bool,
    format: Option<Format>,
    fps: Option<f64>,
    list: bool,
    json: bool,
    path: String,
}

fn value_of<'a>(args: &'a [String], i: &mut usize, flag: &str) -> Result<&'a str, String> {
    *i += 1;
    args.get(*i).map(String::as_str).ok_or_else(|| format!("{flag} needs a value"))
}

fn parse_args(args: &[String]) -> Result<Options, String> {
    let mut threshold = None;
    let mut frames: Option<(usize, String)> = None;
    let mut ms: Option<(f64, String)> = None;
    let mut force_frames = false;
    let mut end = None;
    let mut key = "lavfi.signalstats.YDIF".to_string();
    let mut delta = false;
    let mut format = None;
    let mut fps = None;
    let mut list = false;
    let mut json = false;
    let mut path = None;
    let mut i = 0;
    while i < args.len() {
        let arg = args[i].as_str();
        let (flag, inline) = match arg.split_once('=') {
            Some((f, v)) if f.starts_with("--") => (f, Some(v)),
            _ => (arg, None),
        };
        let take = |i: &mut usize| -> Result<String, String> {
            match inline {
                Some(v) => Ok(v.to_string()),
                None => value_of(args, i, flag).map(str::to_string),
            }
        };
        match flag {
            "--threshold" => {
                let text = take(&mut i)?;
                threshold = Some((input::number(&text, "--threshold")?, text));
            }
            "--settle-frames" => {
                let text = take(&mut i)?;
                let n = text
                    .parse()
                    .ok()
                    .filter(|&n: &usize| n >= 1)
                    .ok_or_else(|| format!("--settle-frames: `{text}` is not a whole number of at least 1"))?;
                frames = Some((n, text));
            }
            "--settle-ms" => {
                let text = take(&mut i)?;
                let v = input::number(&text, "--settle-ms")?;
                if v <= 0.0 {
                    return Err(format!("--settle-ms: `{text}` is not above 0"));
                }
                ms = Some((v, text));
            }
            "--force-frames" => force_frames = true,
            "--end" => {
                let text = take(&mut i)?;
                let v = input::number(&text, "--end")?;
                if v < 0.0 {
                    return Err(format!("--end: `{text}` is before 0"));
                }
                end = Some(v);
            }
            "--key" => key = take(&mut i)?,
            "--delta" => delta = true,
            "--format" => {
                let text = take(&mut i)?;
                format = Some(
                    Format::from_flag(&text)
                        .ok_or_else(|| format!("--format: `{text}` is not ffprobe, metadata or series"))?,
                );
            }
            "--fps" => {
                let text = take(&mut i)?;
                let f = input::number(&text, "--fps")?;
                if f <= 0.0 {
                    return Err(format!("--fps: `{text}` is not above 0"));
                }
                fps = Some(f);
            }
            "--list" => list = true,
            "--json" => json = true,
            a if a.starts_with("--") => return Err(format!("unknown option {a}")),
            a => {
                if path.replace(a.to_string()).is_some() {
                    return Err("name one input file".to_string());
                }
            }
        }
        i += 1;
    }
    let (threshold, threshold_text) = threshold.ok_or("--threshold is required: state the motion that counts")?;
    let path = path.ok_or("name the input file, or - for stdin")?;
    let (settle, settle_text) = match (frames, ms) {
        (Some(_), Some(_)) => return Err("give --settle-ms or --settle-frames, not both".to_string()),
        (Some((n, text)), None) => (Settle::Frames(n), text),
        (None, Some((v, text))) => (Settle::Ms(v), text),
        (None, None) => (Settle::Frames(3), "3".to_string()),
    };
    if force_frames && matches!(settle, Settle::Ms(_)) {
        return Err("--force-frames counts frames, so it does not go with --settle-ms".to_string());
    }
    if end.is_some() && matches!(settle, Settle::Frames(_)) {
        return Err("--end is for --settle-ms; counting frames ends at the last frame".to_string());
    }
    Ok(Options {
        threshold,
        threshold_text,
        settle,
        settle_text,
        force_frames,
        end,
        key,
        delta,
        format,
        fps,
        list,
        json,
        path,
    })
}

/// A number as printf's %g writes it, six significant digits.
fn g(v: f64) -> String {
    if v == 0.0 {
        return "0".to_string();
    }
    let exp = v.abs().log10().floor() as i32;
    let trim = |s: String| -> String {
        if s.contains('.') {
            s.trim_end_matches('0').trim_end_matches('.').to_string()
        } else {
            s
        }
    };
    if !(-4..6).contains(&exp) {
        let s = format!("{:.5e}", v);
        let (mantissa, power) = s.split_once('e').expect("exponent form");
        let power: i32 = power.parse().expect("exponent");
        format!("{}e{}{:02}", trim(mantissa.to_string()), if power < 0 { '-' } else { '+' }, power.abs())
    } else {
        trim(format!("{:.*}", (5 - exp).max(0) as usize, v))
    }
}

fn at(s: &Sample) -> String {
    match s.time {
        Some(t) => format!("{t:.3} s (frame {})", s.frame),
        None => format!("frame {}", s.frame),
    }
}

/// A motion as the input wrote it, or as computed for `--delta`.
fn shown(samples: &[Sample], motion: &[f64], i: usize, delta: bool) -> String {
    if delta {
        g(motion[i])
    } else {
        samples[i].raw.clone()
    }
}

fn json_place(s: &Sample) -> String {
    match s.time {
        Some(t) => format!("{{\"frame\":{},\"time\":{t}}}", s.frame),
        None => format!("{{\"frame\":{},\"time\":null}}", s.frame),
    }
}

fn json_text(s: &str) -> String {
    let mut out = String::from("\"");
    for c in s.chars() {
        match c {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            c if (c as u32) < 0x20 => out.push_str(&format!("\\u{:04x}", c as u32)),
            c => out.push(c),
        }
    }
    out.push('"');
    out
}

/// Milliseconds from microseconds, rounded, for text.
fn whole_ms(us: i64) -> i64 {
    (us as f64 / 1000.0).round() as i64
}

/// One burst, as printed, in either mode.
struct Row {
    start: usize,
    end: usize,
    peak: usize,
    /// Where it settles, when it does.
    settle: Option<usize>,
    /// What follows the peak on its line.
    tail: String,
    /// Its quiet span for the JSON, as `"name":value`.
    quiet_json: String,
}

/// The bursts by frame count.
fn rows_by_frames(samples: &[Sample], motion: &[f64], o: &Options, n: usize) -> Vec<Row> {
    bursts::find(motion, o.threshold, n)
        .into_iter()
        .map(|b| Row {
            start: b.start,
            end: b.end,
            peak: b.peak,
            settle: b.settle,
            tail: match b.settle {
                Some(s) => format!("settles at {}", at(&samples[s])),
                None => format!(
                    "NOT SETTLED: the series ends {} quiet frame{} after it, under {n}",
                    b.quiet_after,
                    if b.quiet_after == 1 { "" } else { "s" }
                ),
            },
            quiet_json: format!("\"quiet_after_frames\":{}", b.quiet_after),
        })
        .collect()
}

/// The bursts by elapsed time, judged against the recording's end.
fn rows_by_time(samples: &[Sample], motion: &[f64], o: &Options, ms: f64, times: &[f64], end: f64) -> Vec<Row> {
    let found = bursts::find_by_time(times, motion, o.threshold, (ms * 1000.0).round() as i64, end);
    let count = found.len();
    found
        .into_iter()
        .enumerate()
        .map(|(k, b)| {
            let quiet = whole_ms(b.quiet_us);
            let tail = match (b.settled, k + 1 == count) {
                (true, false) => format!("settles at {}; no frame moves for the next {quiet} ms", at(&samples[b.end])),
                (true, true) => format!(
                    "settles at {}; no frame moves in the {quiet} ms before the recording ends",
                    at(&samples[b.end])
                ),
                (false, _) => format!(
                    "NOT SETTLED: the recording ends {quiet} ms after its last moving frame, under {} ms",
                    o.settle_text
                ),
            };
            Row {
                start: b.start,
                end: b.end,
                peak: b.peak,
                settle: b.settled.then_some(b.end),
                tail,
                quiet_json: format!("\"quiet_after_ms\":{}", b.quiet_us as f64 / 1000.0),
            }
        })
        .collect()
}

struct Judged {
    rows: Vec<Row>,
    /// The recording's end and where it came from, when judged by time.
    end: Option<(f64, &'static str)>,
}

fn report(o: &Options, format: Format, samples: &[Sample], motion: &[f64], judged: &Judged) -> String {
    let rows = &judged.rows;
    let mut out = String::new();
    let measure = if o.delta { "change from the previous frame" } else { "value" };
    let null = || "null".to_string();
    if o.json {
        let bursts: Vec<String> = rows
            .iter()
            .map(|b| {
                format!(
                    "{{\"start\":{},\"end\":{},\"peak\":{{\"frame\":{},\"time\":{},\"motion\":{}}},\"settle\":{},{}}}",
                    json_place(&samples[b.start]),
                    json_place(&samples[b.end]),
                    samples[b.peak].frame,
                    samples[b.peak].time.map_or_else(null, |t| t.to_string()),
                    motion[b.peak],
                    b.settle.map_or_else(null, |s| json_place(&samples[s])),
                    b.quiet_json,
                )
            })
            .collect();
        let (ms, frames) = match o.settle {
            Settle::Ms(v) => (v.to_string(), null()),
            Settle::Frames(n) => (null(), n.to_string()),
        };
        out.push_str(&format!(
            "{{\"input\":{},\"format\":{},\"key\":{},\"motion\":{},\"threshold\":{},\"settle_ms\":{ms},\"settle_frames\":{frames},\"end\":{},\"frames\":{},\"bursts\":[{}],\"settled\":{}}}\n",
            json_text(&o.path),
            json_text(format.name()),
            json_text(&o.key),
            json_text(measure),
            o.threshold,
            judged.end.map_or_else(null, |(e, _)| e.to_string()),
            samples.len(),
            bursts.join(","),
            rows.iter().all(|b| b.settle.is_some()),
        ));
        return out;
    }
    let what = if format == Format::Series { "value".to_string() } else { o.key.clone() };
    let motion_is = if o.delta {
        format!("the change of {what} from the previous frame")
    } else {
        format!("each frame's {what}")
    };
    let span = match (samples.first().and_then(|s| s.time), samples.last().and_then(|s| s.time)) {
        (Some(a), Some(b)) => format!(", {a:.3}–{b:.3} s"),
        _ => String::new(),
    };
    let rule = match (o.settle, judged.end) {
        (Settle::Ms(_), Some((end, from))) => format!(
            "a burst settles once {} ms pass with no moving frame; the recording ends at {end:.3} s ({from})",
            o.settle_text
        ),
        _ => format!("a burst settles after {} quiet frames", o.settle_text),
    };
    out.push_str(&format!(
        "{}: {} frames ({}{span}); motion is {motion_is}; threshold {}; {rule}\n",
        o.path,
        samples.len(),
        format.name(),
        o.threshold_text,
    ));
    if o.list {
        for (i, s) in samples.iter().enumerate() {
            let mark = if motion[i] > o.threshold { "  MOVES" } else { "" };
            let time = s.time.map_or(String::new(), |t| format!("  {t:.6} s"));
            let change = if o.delta { format!("  motion {}", g(motion[i])) } else { String::new() };
            out.push_str(&format!("frame {}{time}  value {}{change}{mark}\n", s.frame, s.raw));
        }
    }
    for (n, b) in rows.iter().enumerate() {
        out.push_str(&format!(
            "burst {}: from {} to {}, peak {} at {}; {}\n",
            n + 1,
            at(&samples[b.start]),
            at(&samples[b.end]),
            shown(samples, motion, b.peak, o.delta),
            at(&samples[b.peak]),
            b.tail,
        ));
    }
    match rows.last() {
        None => {
            let top = (0..motion.len()).fold(0, |best, i| if motion[i] > motion[best] { i } else { best });
            out.push_str(&format!(
                "no burst: no frame's motion is over {}; the highest is {} at {}\n",
                o.threshold_text,
                shown(samples, motion, top, o.delta),
                at(&samples[top])
            ));
        }
        Some(last) => {
            let noun = if rows.len() == 1 { "burst" } else { "bursts" };
            let ends = if judged.end.is_some() { "recording" } else { "series" };
            match last.settle {
                Some(s) => out.push_str(&format!("{} {noun}; the last settles at {}\n", rows.len(), at(&samples[s]))),
                None => out.push_str(&format!(
                    "{} {noun}; burst {} has not settled when the {ends} ends\n",
                    rows.len(),
                    rows.len()
                )),
            }
        }
    }
    out
}

/// A failure, and whether the usage helps with it.
struct Fail {
    message: String,
    usage: bool,
}

fn input_error(message: String) -> Fail {
    Fail { message, usage: false }
}

fn run(args: &[String]) -> Result<(String, bool), Fail> {
    let o = parse_args(args).map_err(|message| Fail { message, usage: true })?;
    let mut text = String::new();
    if o.path == "-" {
        std::io::stdin().read_to_string(&mut text).map_err(|e| input_error(format!("stdin: {e}")))?;
    } else {
        text = std::fs::read_to_string(&o.path).map_err(|e| input_error(format!("{}: {e}", o.path)))?;
    }
    let format = o.format.unwrap_or_else(|| input::detect(&text));
    let (samples, stated_end) =
        input::read(&text, format, &o.key, o.fps).map_err(|e| input_error(format!("{}: {e}", o.path)))?;
    let values: Vec<f64> = samples.iter().map(|s| s.value).collect();
    let motion = bursts::motion(&values, o.delta);
    let times: Option<Vec<f64>> = samples.iter().map(|s| s.time).collect();
    let judged = match o.settle {
        Settle::Frames(n) => {
            if let (Some(t), false) = (&times, o.force_frames) {
                if let Some((low, median, high)) = bursts::irregular(t) {
                    let ms = |s: f64| g(s * 1000.0);
                    return Err(input_error(format!(
                        "{}: the frame times are irregular (intervals from {} to {} ms, median {} ms), as when a recording writes a frame only on a change, so counting quiet frames would misjudge it: use --settle-ms, or --force-frames to count frames anyway",
                        o.path,
                        ms(low),
                        ms(high),
                        ms(median)
                    )));
                }
            }
            Judged { rows: rows_by_frames(&samples, &motion, &o, n), end: None }
        }
        Settle::Ms(ms) => {
            let t = times.ok_or_else(|| {
                input_error(format!("{}: --settle-ms needs frame times, and this series has none", o.path))
            })?;
            let (end, from) = match (o.end, stated_end) {
                (Some(e), _) => (e, "--end"),
                (None, Some(e)) => (e, "format.duration"),
                (None, None) => {
                    return Err(input_error(format!(
                        "{}: --settle-ms needs the recording's end: give --end T, from ffprobe -v error -show_entries format=duration -of csv=p=0 REC",
                        o.path
                    )))
                }
            };
            let last = t[t.len() - 1];
            if bursts::micros(end) < bursts::micros(last) {
                return Err(input_error(format!(
                    "{}: the recording's end, {end} s ({from}), is before its last frame at {last} s",
                    o.path
                )));
            }
            Judged { rows: rows_by_time(&samples, &motion, &o, ms, &t, end), end: Some((end, from)) }
        }
    };
    let settled = judged.rows.iter().all(|b| b.settle.is_some());
    Ok((report(&o, format, &samples, &motion, &judged), settled))
}

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    if args.iter().any(|a| a == "--help" || a == "-h") {
        print!("{USAGE}");
        return ExitCode::SUCCESS;
    }
    match run(&args) {
        Ok((text, settled)) => {
            let mut out = std::io::stdout().lock();
            if out.write_all(text.as_bytes()).and_then(|_| out.flush()).is_err() {
                return ExitCode::from(2);
            }
            if settled {
                ExitCode::SUCCESS
            } else {
                ExitCode::from(1)
            }
        }
        Err(fail) => {
            eprintln!("burst-settle: {}", fail.message);
            if fail.usage {
                eprint!("{USAGE}");
            }
            ExitCode::from(2)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn g_writes_six_significant_digits_like_printf() {
        assert_eq!(g(0.0), "0");
        assert_eq!(g(6.17284e-6), "6.17284e-06");
        assert_eq!(g(1.58958), "1.58958");
        assert_eq!(g(128.271), "128.271");
        assert_eq!(g(0.30000000000000004), "0.3");
        assert_eq!(g(2.5), "2.5");
        assert_eq!(g(1234567.0), "1.23457e+06");
        assert_eq!(g(-0.0001), "-0.0001");
    }

    #[test]
    fn the_threshold_is_required_and_read_with_its_exponent() {
        let args = |v: &[&str]| v.iter().map(|s| s.to_string()).collect::<Vec<_>>();
        assert!(parse_args(&args(&["in.json"])).unwrap_err().contains("--threshold is required"));
        let o = parse_args(&args(&["--threshold", "5e-3", "--settle-frames=2", "in.json"])).unwrap();
        assert_eq!((o.threshold, o.threshold_text.as_str(), o.settle), (0.005, "5e-3", Settle::Frames(2)));
        let o = parse_args(&args(&["--threshold", "0.4", "--settle-ms", "250", "--end=5.16", "x"])).unwrap();
        assert_eq!((o.settle, o.end), (Settle::Ms(250.0), Some(5.16)));
        assert!(parse_args(&args(&["--threshold", "1", "--settle-ms", "250", "--force-frames", "x"])).is_err());
        assert!(parse_args(&args(&["--threshold", "1", "--end", "5", "x"])).is_err());
        assert!(parse_args(&args(&["--threshold", "1", "--settle-ms", "-1", "x"])).is_err());
        assert!(parse_args(&args(&["--threshold", "1", "--settle-frames", "0", "x"])).is_err());
        assert!(parse_args(&args(&["--threshold", "abc", "x"])).is_err());
        assert!(parse_args(&args(&["--threshold", "1", "a", "b"])).is_err());
        assert!(parse_args(&args(&["--threshold", "1", "--format", "csv", "x"])).is_err());
    }
}
