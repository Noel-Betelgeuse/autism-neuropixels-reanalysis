# WT behavioral-state heatmaps — reading guide

One 6×6 heatmap per brain region (DG, CA1, CA3, SUB, VISp, MOs, CP, MRN, APN) and electrophysiological parameter (10 measures). This analysis compares behavioral states **within WT**, not genotypes.

## Axes
Both rows and columns list the same states: **Q** (pre-stimulus quiescence), **S** (stimulus/premovement), **M** (wheel movement), **Reward** (first 0.5 s after positive feedback), **Error** (first 0.5 s after negative feedback), and **Inter-trial/ITI** (post-feedback waiting).

**Cell value = mean across matched mice of [COLUMN state − ROW state].** Red/positive means the column is higher; blue/negative means the column is lower. The diagonal (—) compares a state to itself. Opposite cells have opposite signs but refer to the same test.

Example: DG, firing rate, row Q / column M, `+2.05***` means firing rate is 2.05 Hz higher during movement than quiescence, with Holm-adjusted p<0.001. Row M / column Q reads −2.05***.

## Units
- `fr_hz`: Hz
- `mean_isi_ms`: ms
- `cv_isi`, `cv2`: unitless
- `burst_rate_min`: bursts/min
- `burst_fraction_pct`: percentage points
- `burst_duration_ms`: ms
- `spikes_per_burst`: spikes per burst
- `intraburst_hz`: Hz
- `interburst_interval_s`: seconds

The color scale is **rescaled separately for every heatmap**. Compare actual values and units, not color intensity across different figures.

## Statistics
Each of the 15 unique behavioral-state pairs is tested once using the **two-sided paired Wilcoxon signed-rank test**; the independent biological unit is the **mouse**. Holm correction is applied **within each heatmap** to these 15 p-values.

- `*`: adjusted p<0.05
- `**`: adjusted p<0.01
- `***`: adjusted p<0.001
- no stars: p>=0.05 or unavailable
- `n<5`: too few paired mice for the comparison

Heatmaps require at least **five WT mice with values in all six states for the same region and metric**. Different heatmaps can have different sample sizes; burst metrics may be missing if few spikes/bursts are available.

**Caution:** Within-heatmap Holm correction does not correct across all 90 region×metric heatmaps. This multi-measure survey is exploratory. Different behavioral windows can vary greatly in duration, sensory and motor context; the associations should not be interpreted as proof of causation.

## Data locations on Google Drive
`Reanalysis/Our_Analysis/Behavior_aligned/05_figures/WT/electrophysiology_v1/heatmaps_by_region/<REGION>/` — figures (PNG and PDF).

`Reanalysis/Our_Analysis/Behavior_aligned/04_results/WT/electrophysiology_v1/heatmaps_by_region/<REGION>/` — per-figure statistics, with overall CSV summaries in the enclosing directory.

`Reanalysis/Our_Analysis/Behavior_aligned/04_results/WT/electrophysiology_v1/WT_mouse_region_phase_metrics.csv` — mouse-level input.

Start with a row (reference state), scan across columns, read sign, magnitude, unit and stars in that order.