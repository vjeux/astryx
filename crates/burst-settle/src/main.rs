//! burst-settle: the motion bursts in a screen recording's per-frame series,
//! and the frame where each one settles, at a stated threshold.
//!
//! Every number is read with Rust's float parser, so `6.17284e-06` is six
//! millionths, never 6.17. A value that does not parse is an error with its
//! place, never a skipped frame.

mod bursts;
mod input;
mod json;

use std::io::{Read, Write};
use std::process::ExitCode;

use bursts::Burst;
use input::{Format, Sample};

const USAGE: &str = "\
burst-settle: motion bursts and settle points in a recording's per-frame series

USAGE:
  burst-settle --threshold T [options] <file or ->

  --threshold T      a frame MOVES when its motion is over T, and is QUIET at or
                     below it (required; exponents such as 5e-3 are fine)
  --settle-frames N  a burst ends after N quiet frames in a row (default 3)
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

A BURST starts at a moving frame and lasts until N quiet frames follow its last
moving frame; a shorter pause stays inside it. It SETTLES at the first of those
quiet frames. Its PEAK is its first frame with the highest motion.

EXIT: 0 every burst settles (or there is none); 1 a burst is still moving when
the series ends; 2 a usage, read or parse error.
";

#[derive(Debug)]
struct Options {
    threshold: f64,
    threshold_text: String,
    settle: usize,
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
    let mut settle = 3;
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
                settle = text
                    .parse()
                    .ok()
                    .filter(|&n: &usize| n >= 1)
                    .ok_or_else(|| format!("--settle-frames: `{text}` is not a whole number of at least 1"))?;
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
    Ok(Options { threshold, threshold_text, settle, key, delta, format, fps, list, json, path })
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

fn report(o: &Options, format: Format, samples: &[Sample], motion: &[f64], found: &[Burst]) -> String {
    let mut out = String::new();
    let measure = if o.delta { "change from the previous frame" } else { "value" };
    if o.json {
        let bursts: Vec<String> = found
            .iter()
            .map(|b| {
                format!(
                    "{{\"start\":{},\"end\":{},\"peak\":{{\"frame\":{},\"time\":{},\"motion\":{}}},\"settle\":{}}}",
                    json_place(&samples[b.start]),
                    json_place(&samples[b.end]),
                    samples[b.peak].frame,
                    samples[b.peak].time.map_or("null".to_string(), |t| t.to_string()),
                    motion[b.peak],
                    b.settle.map_or("null".to_string(), |s| json_place(&samples[s])),
                )
            })
            .collect();
        out.push_str(&format!(
            "{{\"input\":{},\"format\":{},\"key\":{},\"motion\":{},\"threshold\":{},\"settle_frames\":{},\"frames\":{},\"bursts\":[{}],\"settled\":{}}}\n",
            json_text(&o.path),
            json_text(format.name()),
            json_text(&o.key),
            json_text(measure),
            o.threshold,
            o.settle,
            samples.len(),
            bursts.join(","),
            found.iter().all(|b| b.settle.is_some()),
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
    out.push_str(&format!(
        "{}: {} frames ({}{span}); motion is {motion_is}; threshold {}; a burst settles after {} quiet frames\n",
        o.path,
        samples.len(),
        format.name(),
        o.threshold_text,
        o.settle
    ));
    if o.list {
        for (i, s) in samples.iter().enumerate() {
            let mark = if motion[i] > o.threshold { "  MOVES" } else { "" };
            let time = s.time.map_or(String::new(), |t| format!("  {t:.6} s"));
            let change = if o.delta { format!("  motion {}", g(motion[i])) } else { String::new() };
            out.push_str(&format!("frame {}{time}  value {}{change}{mark}\n", s.frame, s.raw));
        }
    }
    for (n, b) in found.iter().enumerate() {
        let tail = match b.settle {
            Some(s) => format!("settles at {}", at(&samples[s])),
            None => format!(
                "STILL MOVING: the series ends {} quiet frame{} after it",
                b.quiet_after,
                if b.quiet_after == 1 { "" } else { "s" }
            ),
        };
        out.push_str(&format!(
            "burst {}: from {} to {}, peak {} at {}; {tail}\n",
            n + 1,
            at(&samples[b.start]),
            at(&samples[b.end]),
            shown(samples, motion, b.peak, o.delta),
            at(&samples[b.peak]),
        ));
    }
    match found.last() {
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
            let noun = if found.len() == 1 { "burst" } else { "bursts" };
            match last.settle {
                Some(s) => out.push_str(&format!(
                    "{} {noun}; the last settles at {}\n",
                    found.len(),
                    at(&samples[s])
                )),
                None => out.push_str(&format!(
                    "{} {noun}; burst {} is still moving when the series ends\n",
                    found.len(),
                    found.len()
                )),
            }
        }
    }
    out
}

fn run(args: &[String]) -> Result<(String, bool), String> {
    let o = parse_args(args)?;
    let mut text = String::new();
    if o.path == "-" {
        std::io::stdin().read_to_string(&mut text).map_err(|e| format!("stdin: {e}"))?;
    } else {
        text = std::fs::read_to_string(&o.path).map_err(|e| format!("{}: {e}", o.path))?;
    }
    let format = o.format.unwrap_or_else(|| input::detect(&text));
    let samples = input::read(&text, format, &o.key, o.fps).map_err(|e| format!("{}: {e}", o.path))?;
    let values: Vec<f64> = samples.iter().map(|s| s.value).collect();
    let motion = bursts::motion(&values, o.delta);
    let found = bursts::find(&motion, o.threshold, o.settle);
    let settled = found.iter().all(|b| b.settle.is_some());
    Ok((report(&o, format, &samples, &motion, &found), settled))
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
        Err(e) => {
            eprintln!("burst-settle: {e}");
            if e.contains("--") || e.starts_with("name ") || e.starts_with("unknown") {
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
        assert_eq!((o.threshold, o.threshold_text.as_str(), o.settle), (0.005, "5e-3", 2));
        assert!(parse_args(&args(&["--threshold", "1", "--settle-frames", "0", "x"])).is_err());
        assert!(parse_args(&args(&["--threshold", "abc", "x"])).is_err());
        assert!(parse_args(&args(&["--threshold", "1", "a", "b"])).is_err());
        assert!(parse_args(&args(&["--threshold", "1", "--format", "csv", "x"])).is_err());
    }
}
