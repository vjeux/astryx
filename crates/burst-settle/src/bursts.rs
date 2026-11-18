//! Motion bursts and their settle points.
//!
//! A frame MOVES when its motion is over the threshold, and is QUIET at or
//! below it. A burst starts at a moving frame and lasts until `settle` quiet
//! frames in a row follow its last moving frame: a pause shorter than that
//! stays inside the burst. The burst SETTLES at the first of those quiet
//! frames. When the series ends first, the burst is still moving.

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
