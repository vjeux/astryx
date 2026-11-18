//! Motion bursts and their settle points, by frame count or by elapsed time.
//!
//! A frame MOVES when its motion is over the threshold, and is QUIET at or
//! below it.
//!
//! By frame count (`find`), a burst lasts until `settle` quiet frames in a
//! row follow its last moving frame, and SETTLES at the first of them. That
//! only means something when frames come at a steady rate.
//!
//! By elapsed time (`find_by_time`), a burst lasts until more than the settle
//! time passes after its last moving frame with no moving frame; quiet frames
//! and spans with no frame at all both count as quiet. It SETTLES at its last
//! moving frame. A screen recording that writes a frame only on a change needs
//! this. The last burst settles only when the recording's end comes more than
//! the settle time after its last moving frame.

/// A burst, by positions in the series.
#[derive(Debug, Clone, PartialEq)]
pub struct Burst {
    pub start: usize,
    /// The last moving frame.
    pub end: usize,
    /// The first frame with the highest motion.
    pub peak: usize,
    /// The first quiet frame of the settle run, or None when the series ends
    /// first.
    pub settle: Option<usize>,
    /// The quiet frames that follow `end`, up to `settle` of them.
    pub quiet_after: usize,
}

/// Each frame's motion: its value, or with `delta` its change from the
/// previous frame, as a magnitude. Frame 0 has no previous frame, so its
/// change is 0.
pub fn motion(values: &[f64], delta: bool) -> Vec<f64> {
    if !delta {
        return values.to_vec();
    }
    let mut out = Vec::with_capacity(values.len());
    for (i, v) in values.iter().enumerate() {
        out.push(if i == 0 { 0.0 } else { (v - values[i - 1]).abs() });
    }
    out
}

/// The bursts in `motion`, where a burst ends after `settle` quiet frames.
pub fn find(motion: &[f64], threshold: f64, settle: usize) -> Vec<Burst> {
    assert!(settle >= 1, "a burst settles after at least one quiet frame");
    let mut out = Vec::new();
    let mut i = 0;
    while i < motion.len() {
        if motion[i] <= threshold {
            i += 1;
            continue;
        }
        let (start, mut end, mut peak) = (i, i, i);
        let mut quiet = 0;
        let mut j = i + 1;
        while j < motion.len() && quiet < settle {
            if motion[j] > threshold {
                end = j;
                quiet = 0;
                if motion[j] > motion[peak] {
                    peak = j;
                }
            } else {
                quiet += 1;
            }
            j += 1;
        }
        let settled = quiet >= settle;
        out.push(Burst { start, end, peak, settle: settled.then_some(end + 1), quiet_after: quiet });
        i = j;
    }
    out
}

/// The frame intervals' (shortest, median, longest) when they are irregular:
/// one is over 1.5 times the median or under half of it, as in a
/// variable-frame-rate recording or one with a dropped frame. Times are
/// compared in whole microseconds, the precision ffprobe writes.
pub fn irregular(times: &[f64]) -> Option<(f64, f64, f64)> {
    if times.len() < 3 {
        return None;
    }
    let mut gaps: Vec<i64> = times.windows(2).map(|w| micros(w[1]) - micros(w[0])).collect();
    gaps.sort_unstable();
    let (low, high, median) = (gaps[0], gaps[gaps.len() - 1], gaps[gaps.len() / 2]);
    let seconds = |us: i64| us as f64 / 1e6;
    (median <= 0 || 2 * high > 3 * median || 2 * low < median).then(|| (seconds(low), seconds(median), seconds(high)))
}

/// A time in whole microseconds.
pub fn micros(seconds: f64) -> i64 {
    (seconds * 1e6).round() as i64
}

/// A burst found by elapsed time, by positions in the series.
#[derive(Debug, Clone, PartialEq)]
pub struct TimedBurst {
    pub start: usize,
    /// The last moving frame, where a settled burst settles.
    pub end: usize,
    /// The first frame with the highest motion.
    pub peak: usize,
    /// Whether more than the settle time passes after `end` with no moving
    /// frame, before the next burst or the recording's end.
    pub settled: bool,
    /// The microseconds from `end` to the next burst's start, or to the
    /// recording's end for the last burst.
    pub quiet_us: i64,
}

/// The bursts in `motion` at `times` (seconds), where a moving frame joins a
/// burst when it comes at most `settle_us` microseconds after the burst's last
/// moving frame. `end` is the recording's end, at or after the last frame.
pub fn find_by_time(times: &[f64], motion: &[f64], threshold: f64, settle_us: i64, end: f64) -> Vec<TimedBurst> {
    assert!(settle_us > 0, "a burst settles after some time");
    let mut out: Vec<TimedBurst> = Vec::new();
    for i in (0..motion.len()).filter(|&i| motion[i] > threshold) {
        if let Some(last) = out.last_mut() {
            if micros(times[i]) - micros(times[last.end]) <= settle_us {
                last.end = i;
                if motion[i] > motion[last.peak] {
                    last.peak = i;
                }
                continue;
            }
        }
        out.push(TimedBurst { start: i, end: i, peak: i, settled: false, quiet_us: 0 });
    }
    let starts: Vec<i64> = out.iter().map(|b| micros(times[b.start])).collect();
    for (k, b) in out.iter_mut().enumerate() {
        let next = starts.get(k + 1).copied().unwrap_or_else(|| micros(end));
        b.quiet_us = next - micros(times[b.end]);
        b.settled = b.quiet_us > settle_us;
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn a_burst_settles_at_its_first_quiet_frame() {
        let b = find(&[0.0, 5.0, 7.0, 0.0, 0.0, 0.0], 1.0, 3);
        assert_eq!(b, vec![Burst { start: 1, end: 2, peak: 2, settle: Some(3), quiet_after: 3 }]);
    }

    #[test]
    fn a_pause_shorter_than_the_settle_run_stays_inside_the_burst() {
        let m = [5.0, 0.0, 0.0, 6.0, 0.0, 0.0, 0.0, 0.0, 9.0, 0.0, 0.0, 0.0];
        let b = find(&m, 1.0, 3);
        assert_eq!(b.len(), 2);
        assert_eq!((b[0].start, b[0].end, b[0].peak, b[0].settle), (0, 3, 3, Some(4)));
        assert_eq!((b[1].start, b[1].end, b[1].settle), (8, 8, Some(9)));
    }

    #[test]
    fn a_burst_the_series_ends_in_is_still_moving() {
        let b = find(&[0.0, 5.0, 0.0, 0.0], 1.0, 3);
        assert_eq!(b, vec![Burst { start: 1, end: 1, peak: 1, settle: None, quiet_after: 2 }]);
        let b = find(&[0.0, 5.0], 1.0, 1);
        assert_eq!(b[0].settle, None);
    }

    #[test]
    fn the_threshold_itself_is_quiet_and_the_first_peak_wins() {
        assert!(find(&[1.0, 1.0, 1.0], 1.0, 1).is_empty());
        let b = find(&[2.0, 3.0, 3.0, 0.0], 1.0, 1);
        assert_eq!(b[0].peak, 1);
    }

    #[test]
    fn steady_frame_times_are_regular_and_gaps_or_drops_are_not() {
        let steady: Vec<f64> = (0..90).map(|i| (i as f64 / 30.0 * 1e6).round() / 1e6).collect();
        assert_eq!(irregular(&steady), None);
        let mut dropped = steady.clone();
        dropped.remove(40);
        assert!(irregular(&dropped).is_some());
        let vfr = [0.0, 0.016, 0.033, 0.050, 2.918, 2.935];
        let (low, median, high) = irregular(&vfr).unwrap();
        assert_eq!((low, median, high), (0.016, 0.017, 2.868));
        assert_eq!(irregular(&[0.0, 1.0]), None, "two frames have one interval");
    }

    #[test]
    fn by_time_a_gap_with_no_frame_is_quiet_and_quiet_frames_do_not_split() {
        // 0.10 and 0.30 move with dense quiet frames between: one burst.
        // 3.10 moves 2.8 s later with no frame between: a second burst.
        let t = [0.0, 0.10, 0.15, 0.20, 0.25, 0.30, 3.10, 3.20];
        let m = [0.0, 5.0, 0.0, 0.0, 0.0, 6.0, 5.0, 0.0];
        let b = find_by_time(&t, &m, 1.0, 250_000, 4.0);
        assert_eq!(b.len(), 2);
        assert_eq!((b[0].start, b[0].end, b[0].peak, b[0].settled, b[0].quiet_us), (1, 5, 5, true, 2_800_000));
        assert_eq!((b[1].start, b[1].end, b[1].settled, b[1].quiet_us), (6, 6, true, 900_000));
    }

    #[test]
    fn by_time_the_settle_time_itself_joins_and_the_end_decides_the_last_burst() {
        let t = [0.0, 0.1, 0.35];
        let m = [5.0, 5.0, 5.0];
        let b = find_by_time(&t, &m, 1.0, 250_000, 0.6);
        assert_eq!(b.len(), 1, "a moving frame exactly 250 ms later joins");
        assert_eq!((b[0].end, b[0].settled, b[0].quiet_us), (2, false, 250_000));
        assert!(find_by_time(&t, &m, 1.0, 250_000, 0.600_001)[0].settled);
        assert!(find_by_time(&t, &[0.0; 3], 1.0, 250_000, 1.0).is_empty());
    }

    #[test]
    fn delta_motion_is_the_change_from_the_previous_frame() {
        assert_eq!(motion(&[128.0, 128.0, 130.5, 129.5], true), vec![0.0, 0.0, 2.5, 1.0]);
        assert_eq!(motion(&[1.0, 2.0], false), vec![1.0, 2.0]);
    }

    #[test]
    fn exponent_values_below_the_threshold_make_no_burst() {
        // Read whole, 6.17284e-06 is six millionths. A reader that dropped the
        // exponent would see 6.17284 and invent a burst at any threshold
        // under 6.
        let whole: Vec<f64> = ["0", "6.17284e-06", "1.2e-05", "0"].iter().map(|t| t.parse().unwrap()).collect();
        assert!(find(&whole, 0.5, 3).is_empty());
        let dropped: Vec<f64> = ["0", "6.17284", "1.2", "0"].iter().map(|t| t.parse().unwrap()).collect();
        assert_eq!(find(&dropped, 0.5, 3).len(), 1);
    }
}
