# ASD mouse electrophysiology — analysis plan (working draft, 2026-11-05)

## Biological question
Do baseline spiking dynamics and task-related firing differ between WT and each of Fmr1, Cntnap2 and Shank3B within homologous brain regions?

## Data and region definition
- Mouse dataset: angelaki_mouseASD, 364 insertions catalogued in a previous exploratory run; 321 had resolvable anatomical mapping and 43 had anatomy errors.
- 24 acronyms met the preliminary >=5 mice/genotype coverage threshold before accounting for QC-passing units. Only 17 acronyms mapping to nine neuronal regions are eligible in the **primary anatomical panel**.
- `VL` is the **lateral ventricle** in Allen CCFv3, **not a thalamic motor nucleus**. Exclude, along with `ccb`, `cing`, and `dhc`.
- `HPF`, `STR`, `MB` are unspecified parent labels; retain as unresolved but exclude them from primary regional tests until validated.
- Region merging is performed **at cluster level** (subject + session + probe + cluster ID) by mapping each original Allen acronym to exactly one analysis region. Never sum unique mouse counts across layers.
- Preserve original acronym and CCF ID, and record QC information; don't label non-QC clusters as good neurons.

## Primary regions
DG (DG-mo/DG-sg/DG-po); CA1; CA3; SUB; VISp (layers 2/3,4,5,6a,6b); MOs (layers 2/3,5,6a); CP; MRN; APN.

## Analysis order
1. Generate/recover cluster-level metadata with subject, genotype, eid, pid, probe, cluster ID, original Allen label, merged region, and QC label. Process by session/probe with resumable checkpoints to Drive.
2. Report QC-pass unit and **unique mouse** coverage by genotype x region. Fix prespecified minimum coverage and discard poorly supported comparisons.
3. Compute per-neuron baseline firing rate (Hz), ISI CV, local CV2 and burst metrics. Specify minimum spikes, spike sorting QC, refractory criteria and stable epoch before inference.
4. Aggregate neuronal metrics within mouse x region (optionally first within session/probe); report distributions and mouse-level summaries. Use mice, not neurons or spikes, as the independent biological replicates.
5. Compare WT vs Fmr1, WT vs Cntnap2, WT vs Shank3B per region with mouse-level inference, effect sizes and multiplicity correction. Treat genotype x region interaction as a higher-level model where sample size supports it.
6. For quality-controlled trials, estimate peri-stimulus time histograms (stimOn), first-movement and feedback responses. Respect session/task factors, contrast, choice and trial count; avoid pooling event-absent sessions.
7. Secondary sensitivity analyses: original sublayer resolution, alternative baseline windows, minimum unit counts, and robust/hierarchical models.

## Reporting and data retention
- Drive: `Jan/Reanalysis/Our_Analysis` is primary working storage. Save each small progress table directly to `02_session_metadata`, `03_processed_data`, `04_results` and figures to `05_figures`.
- GitHub: mirror notebooks, scripts, notes and compact CSV files, not raw spike arrays or large MATLAB files.
- `recovered_24_eligible_regions.csv` is recovered from a console log: it is descriptive preliminary coverage, not validated genotype test N or QC-pass unit count.
- Atlas labels and versions should be recorded per file; for `VL` see Allen CCF references.
