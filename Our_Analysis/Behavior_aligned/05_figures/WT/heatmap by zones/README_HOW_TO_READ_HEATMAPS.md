# WT behavioral-state heatmaps — Complete guide

**Project:** mouse Neuropixels reanalysis, behavior-aligned electrophysiology (WT genotype).  
**Figures:** `Reanalysis/Our_Analysis/Behavior_aligned/05_figures/WT/heatmap by zones/`  
**Data source:** `Reanalysis/Our_Analysis/Behavior_aligned/04_results/WT/electrophysiology_v1/WT_mouse_region_phase_metrics.csv`  
**Statistical tables:** `Reanalysis/Our_Analysis/Behavior_aligned/04_results/WT/electrophysiology_v1/heatmaps_by_region/`.

## 1. Folder structure and file naming

Each of the nine anatomical zones has its own folder, containing a `PNG/` folder for raster images and `PDF/` for print/vector images. Every zone has ten metric heatmaps if ≥5 WT mice have valid data in all six states for that metric. The **name starts with the electrophysiological metric**:

- `DG/PNG/fr_hz_WT_DG_heatmap.png`
- `MOs/PDF/intraburst_hz_WT_MOs_heatmap.pdf`

`README_HOW_TO_READ_HEATMAPS.md` (this file) applies to every zone and all ten metrics. Companion numeric tables are stored under `04_results`, *not* inside the figure folders.

## 2. How to read a heatmap

A 6 × 6 matrix compares the **same electrophysiological metric** between six behavioral states. The *row* is the reference state and the *column* the comparison state.

> **Cell value = mean across matched mice of (COLUMN state − ROW state).**

- **Positive / red:** the metric is larger in the state named by the **column**.
- **Negative / blue:** the metric is smaller in the state named by the **column**.
- **White / near zero:** little mean difference.
- **Diagonal (`—`):** the state is compared with itself.
- **Mirrored cells:** equal magnitude, opposite sign, same p-value. They represent **one** statistical comparison, not two tests.

**Example:** On the DG firing-rate heatmap, **row Q / column M = `+2.05***`** means the average mouse-level firing rate during movement is **2.05 Hz higher** than during pre-stimulus quiescence. The reverse position, row M / column Q, reads `−2.05***`. Stars show the corrected statistical result, not the effect size.

Color limits are **independently scaled for each heatmap**. A strong red in two different figures does **not** imply effects of the same numerical magnitude. Check the annotations and units. For a burst fraction measured in percent, a +5.00 difference is **5 percentage points**, not necessarily a 5% relative increase.

## 3. Behavioral states and abbreviations

| Label | Full description | Interpretation / experimental window |
| --- | --- | --- |
| **Q** | **Quiescence** | Nominal pre-stimulus wheel-stillness interval, approximately 0.4–0.7 s. Windows with detected wheel-movement overlap were flagged out of the main WT analysis. This is an **operational task state**, not unrestricted whole-animal rest. |
| **S** | **Stimulus / premovement** | Begins at visual-stimulus onset and ends at the first qualifying detected wheel movement. In the WT analysis, very short and long intervals were excluded (working limits 0.05–5 s). This period may contain perception, evaluation and motor preparation. |
| **M** | **Wheel movement** | Detected intervals of wheel movement in the response period. Very short movement segments (<0.05 s) were excluded. Movement is a proxy for a task-related motor event; it is not whole-body locomotion. |
| **F_reward / Reward** | **Correct-response feedback / reward** | First 0.5 s after positive feedback associated with reward. The 0.5 s is an **analysis window**, not a claimed duration of reward delivery. |
| **F_error / Error** | **Error feedback** | First 0.5 s after negative feedback. Error can reflect more than one behavioral cause; do not interpret it as a unique neural error signal without further analysis. |
| **I / Inter-trial / ITI** | **Inter-trial waiting** | Post-feedback waiting before the next trial's nominal quiescence. Wheel movement can occur during this interval. |

**Important:** The six categories come from five conceptual task phases with **feedback split into reward and error**. They differ in duration and sensory/motor content, so differences are *associated with task state*, not causal proof that a specific event changes firing.

## 4. Anatomical regions / zones (abbreviations)

| Abbrev. | Anatomical name | General context |
| --- | --- | --- |
| **DG** | **Dentate gyrus** | Hippocampal formation; sparse coding, contextual/spatial information, pattern separation. |
| **CA1** | **Cornu ammonis field CA1** | Hippocampus; integrates hippocampal and entorhinal input, memory and state-dependent activity. |
| **CA3** | **Cornu ammonis field CA3** | Hippocampus; recurrent circuitry, memory representations, pattern completion. |
| **SUB** | **Subiculum** | Major hippocampal output area linking the hippocampal formation with cortical and subcortical targets. |
| **VISp** | **Primary visual area (primary visual cortex, V1)** | Visual cortical processing; visual grating and task-related activity are especially relevant. |
| **MOs** | **Secondary motor area (secondary motor cortex)** | Motor planning and task-dependent actions, including wheel-choice preparation. |
| **CP** | **Caudoputamen (dorsal striatum)** | Basal ganglia input structure; action selection and sensorimotor processing. |
| **MRN** | **Midbrain reticular nucleus** | Midbrain reticular formation/reticular circuitry. **Not median raphe nucleus.** |
| **APN** | **Anterior pretectal nucleus** | Pretectal region; sensorimotor and visual pathway-related processing. |

These are **grouped atlas labels**, not direct electrophysiological identification of neuronal subtypes. A region may contain several cell types. In particular, a heatmap for MRN must never be described as serotonergic median-raphe recording solely on the basis of the acronym.

## 5. Electrophysiological metrics — all ten explained

The original recordings were segmented by behavioral states before summarizing each neuron's activity. Below, ISI means **interspike interval**, the time between consecutive action potentials. Unless otherwise indicated, increases/decreases are *descriptive*: physiological desirability or functional sign is **not** intrinsic to the metric.

| File prefix / metric | Definition, calculation, units | Higher vs lower values |
| --- | --- | --- |
| **`fr_hz`** — Firing rate | Number of spikes divided by total analyzed time in the state; **spikes/s = Hz**. | Higher = more spikes per second; lower = fewer. This is average rate, not burst-selective rate. |
| **`mean_isi_ms`** — Mean interspike interval | Arithmetic mean of positive ISIs calculated **within** individual analysis windows, pooled within neuron/state; **ms**. | Higher = larger average separation of spikes, often lower sustained firing; lower = tighter spacing. Mean ISI is **not exactly the reciprocal of the window-normalized FR** when there are discontinuous windows or periods with no spikes. |
| **`cv_isi`** — Coefficient of variation of ISIs | Standard deviation of the pooled within-window ISIs / their mean; **dimensionless**. Standard deviation uses sample `ddof=1` in the WT pipeline. | Higher = greater global irregularity/variability of ISI; lower = more regular temporal spacing. Can be affected by mixtures of activity regimes. |
| **`cv2`** — Local ISI variability | Mean of `2 × abs(ISI_(i+1) − ISI_i) / (ISI_(i+1) + ISI_i)` for successive *within-window* ISI pairs; **dimensionless**. | Higher = greater rapid local irregularity; lower = more similar neighboring ISIs. Less influenced than global CV by very slow rate drift. |
| **`burst_rate_min`** — Burst rate | Count of detected bursts divided by total analyzed time, scaled to **bursts/min**. | Higher = more detected burst events per minute; lower = fewer. Strongly dependent on burst definition and available observation time. |
| **`burst_fraction_pct`** — Burst spike fraction | `100 × (spikes belonging to detected bursts / all analyzed spikes)`; **%**. | Higher = larger fraction of spikes participate in bursts; lower = more spikes outside detected bursts. |
| **`burst_duration_ms`** — Burst duration | Mean duration from the **first to the last spike** in each detected burst; **ms**. | Higher = longer within-burst events; lower = shorter. Does not include a post-burst silent period. |
| **`spikes_per_burst`** — Spikes per burst | Mean number of action potentials assigned to each detected burst; **spikes/burst**. | Higher = more spikes contained in an average burst; lower = fewer. |
| **`intraburst_hz`** — Intraburst firing frequency | Mean across bursts of `(number of spikes − 1) / duration (s)`; **Hz**. | Higher = faster spike succession **within bursts**, not necessarily higher overall firing rate; lower = slower intra-burst succession. |
| **`interburst_interval_s`** — Interburst interval | Mean time from the **last spike of one detected burst** to the **first spike of the next detected burst**, when both occur in the **same behavioral window**; **s**. | Higher = longer gaps between neighboring bursts; lower = shorter gaps. Undefined if no pair of bursts exists inside a window. |

### Burst-detection rule and short-window limitations

The WT pipeline used a neuron-specific logISI-derived burst threshold **capped at 100 ms**, **at least three spikes per burst**, and **no extension of a burst beyond the core short-ISI run**. A burst is confined to an individual behavioral window; it cannot cross a window boundary. The threshold was inherited from the earlier spontaneous analysis for the corresponding neuron.

A short Q, S or M window may contain too few spikes for ISI variability, or too few bursts for burst duration, intra-burst frequency or interburst interval. These quantities can therefore be **missing (NaN)**. Missing metrics should **not** be substituted with zero; a zero burst rate is interpretable only where an observation window was present and burst detection was valid. More detailed event-aligned comparisons should account for unequal state exposure durations and variable numbers of analyzable bursts.

## 6. Statistical procedure and significance symbols

- The independent biological replicate is the **mouse**, not a spike, neuron, trial or recording session. Measurements from neurons are first summarized at mouse × anatomical region × state level (the CSV used here).
- Each heatmap uses mice with available values for **all six behavioral states** for that *specific metric and region*. **At least five complete WT mice** are required to draw a heatmap.
- For each metric/region, the 6 states give **15 distinct state pairs**. Each pair is compared using the **two-sided paired Wilcoxon signed-rank test**.
- **Holm correction** is applied to the **15 p-values within that single heatmap**. The upper- and lower-triangle cells share the same corrected p-value.
- Stars: `*` adjusted **p < 0.05**; `**` **p < 0.01**; `***` **p < 0.001**; no stars = not significant after within-heatmap correction.
- If fewer than five mice have complete data, that zone/metric plot is **not generated**. See `WT_heatmap_overview.csv` for the status and sample size.
- The values in cells are **mean paired differences in the metric's own units**, not p-values, standardized effect sizes, or necessarily percentage changes.

**Multiple-testing scope:** Holm correction occurs **within each single zone × metric heatmap**, *not* across all 9 × 10 heatmaps. Claims based on the entire heatmap atlas are **exploratory**. For confirmatory claims, pre-specify key comparisons and apply an across-metrics/regions multiplicity strategy or a hierarchical model. Behavioral windows are not exchangeable in duration or context; avoid treating observed associations as causal.

## 7. Where to find statistics and reproducible code

- **Processed WT mouse-level observations:** `04_results/WT/electrophysiology_v1/WT_mouse_region_phase_metrics.csv`.
- **Pairwise Wilcoxon results per region:** `04_results/WT/electrophysiology_v1/heatmaps_by_region/<REGION>/<METRIC>_WT_<REGION>_pairwise.csv`.
- **All comparisons:** `04_results/WT/electrophysiology_v1/heatmaps_by_region/WT_all_regions_pairwise_statistics.csv`.
- **Only significant comparisons:** `04_results/WT/electrophysiology_v1/heatmaps_by_region/WT_significant_pairwise_comparisons.csv`.
- **Summary of counts and sample sizes:** `04_results/WT/electrophysiology_v1/heatmaps_by_region/WT_heatmap_overview.csv`.
- **Regenerate heatmaps without downloading spikes:** `01_notebooks/WT/03_analysis_heatmaps.ipynb`.
- **Long-running spike extraction and cached per-session data:** `01_notebooks/WT/02_process_and_cache.ipynb`. Do not rerun simply to change figure formatting.

**Reading checklist:** identify the region → identify metric and units → select a **row** reference state → read the **column** state → interpret the *sign* of column − row → read the numeric difference → interpret stars, sample size and limitations.
