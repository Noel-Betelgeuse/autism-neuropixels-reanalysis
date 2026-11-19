# Angelaki mouse ASD — intertrial wheel-still LFP reanalysis

**Status (2026-11-19):** Four genotype pipelines completed and three WT pairwise comparisons available. This README supersedes the original scaffold-only status.

## Study cohorts and outputs

| Genotype | Animals with processed LFP | Anatomical region/subregion groups meeting n ≥ 5 |
|---|---:|---:|
| WT | 15 | 26 |
| Fmr1 | 15 | 29 |
| Cntnap2 | 16 | 29 |
| Shank3B | 14 | 28 |

The canonical files for each model are located under `<genotype>/processing/`:

- `<genotype>_LFP_Processing.ipynb` — cleaned, output-free reproducible notebook.
- `<genotype>_LFP_inventory.csv`, `<genotype>_LFP_processing_log.csv` — source insertion availability and failures.
- `<genotype>_LFP_insertion_results.csv` — probe/insertion-level estimates.
- `<genotype>_LFP_all_animal_results.csv` — **preferred input for cross-genotype comparisons**, one mouse × anatomical group per row.
- `<genotype>_LFP_region_eligibility.csv`, `<genotype>_LFP_final_animal_results.csv`, `<genotype>_LFP_group_summary.csv` — coverage, included groups and descriptive median values.
- `per_insertion/` — detailed per-PID estimates and selected window times.

Cross-genotype notebooks and results:
- `genotype_comparison/WT_vs_Fmr1/WT_vs_Fmr1_LFP_Comparison.ipynb`
- `genotype_comparison/WT_vs_Cntnap2/WT_vs_Cntnap2_LFP_Comparison.ipynb`
- `genotype_comparison/WT_vs_Shank3B/WT_vs_Shank3B_LFP_Comparison.ipynb`

**Active Google Drive workspace:** [LFP spontaneous](https://drive.google.com/drive/folders/1pqc3P3VvNbDMa4Igjw2VAVTbG5V6TziO). Seven original notebooks are backed up in `_archive_original_notebooks_2026-11-19/` on Drive. The source-of-truth clean notebooks are in GitHub; original Colab notebooks on Drive were moved into appropriate project folders, but their cell bodies were not replaced.

## Methods actually implemented

- Behavioral state: **intertrial wheel-still**, using intervals from feedback to the next stimulus with 0.5 s guards and wheel-motion subtraction; this is **not verified physiological rest**.
- Up to 30 reproducibly sampled **2 s windows** per session; Welch PSD, Hann window, linear detrend; frequency resolution roughly 0.5 Hz.
- Atlas-based mapping of LF neural-channel indices to the nine target regions and identified subdivisions using annotated `channels` or `electrodeSites` collections and available revisions.
- Reject high-RMS extreme windows/contact-windows using upper **Tukey 3 × IQR**.
- Absolute band powers in µV²; relative power as a percent of integrated PSD from **1–55 and 65–100 Hz** (excluding 55–65 Hz).
- Spectral bands: delta 1–4; theta 4–8; alpha-like 8–12; beta 12–30; low gamma 30–55; high gamma 65–100 Hz.
- Aggregate across accepted windows and contacts to a per-insertion estimate, then use a median across insertions/sessions to obtain one estimate per animal × anatomical group. Only anatomical groups with at least five mice **in each genotype** are compared.
- Pairwise tests: two-sided Mann–Whitney U; effect size Cliff's delta (positive = mutant > WT). Benjamini–Hochberg adjusted p-values within **four separate analysis families**: (region vs subregion) × (absolute vs relative power).

The region-level `ALL` estimate is not an additional independent biological replicate; `ALL` and subdivisions must be interpreted as nested/overlapping anatomical summaries. Some region vs acronym-specific rows are mathematically identical and should not be counted as distinct biological discoveries.

## Statistical results (WT comparisons)

| Comparison | Total comparisons | Uncorrected p < .05 | BH-FDR p < .05 |
|---|---:|---:|---:|
| WT vs Fmr1 | 312 | 19 | 0 |
| WT vs Cntnap2 | 312 | 26 | **1** |
| WT vs Shank3B | 312 | 12 | 0 |

**One within-family BH-FDR significant result:** Cntnap2 exhibits increased **absolute high-gamma (65–100 Hz) band power** in **MOs2/3**, compared with WT: WT n = 10, median 48.4005 µV²; Cntnap2 n = 8, median 126.6545 µV²; uncorrected p = 0.00031994; within-family BH-FDR p = 0.032634; Cliff's delta = +0.925. This is approximately a 2.62-fold difference in sample medians.

The effect does **not** establish an increase in oscillatory gamma or GABA interneuron firing. High-frequency LFP includes aperiodic/spike-related contributions. Multiple-genotype correction, spectrum/aperiodic QC, contact-mapping cross-validation and outlier checks should be undertaken before manuscript-level causal interpretation.

See [LFP preliminary abstract and figure index](./LFP_PRELIMINARY_ABSTRACT.md).

## Organization and code hygiene

All seven notebooks stored in canonical GitHub locations are executable-source copies stripped of historical output blobs and repeated top-level imports; original Drive notebooks were preserved in an archive. Code changes are deliberately limited to import consolidation and empty/stale display-cell removal, not a redefinition of PSD, QC, or genotype comparisons. Re-run reproducibility against animal-level CSV outputs before interpreting any new results.

Do **not** delete `per_insertion/`, inventories, logs, all-animal tables or original Drive notebook backups: these provide provenance and permit re-aggregation without streaming raw recordings.
