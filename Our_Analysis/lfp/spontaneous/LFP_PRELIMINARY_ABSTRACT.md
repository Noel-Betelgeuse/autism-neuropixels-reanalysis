# Preliminary LFP reanalysis of three mouse ASD models: WT-referenced spectral power changes

**Status:** 19 November 2026 · **Study:** Angelaki/IBL mouse ASD · **Analysis:** Intertrial wheel-still LFP · **Exploratory report**

## Mini-abstract

**Background.** Local field potential (LFP) spectral power was reanalyzed in the Angelaki/IBL mouse autism-spectrum-disorder dataset to evaluate spontaneous-like network signatures across Fmr1, Cntnap2 and Shank3B mutant models relative to wild-type (WT) controls.

**Methods.** LF streams were analyzed in nine brain regions (DG, CA1, CA3, SUB, VISp, MOs, CP, MRN and APN) and available anatomical subdivisions. Up to 30 motion-free intertrial windows (2 s each) per recording were analyzed with Welch PSD after upper Tukey 3×IQR RMS artifact rejection. Absolute (µV²) and relative (%) band powers were calculated for delta (1–4 Hz), theta (4–8), alpha-like (8–12), beta (12–30), low gamma (30–55) and high gamma (65–100), with 55–65 Hz excluded from the relative-power denominator. Estimates were aggregated across contacts and insertions to the mouse level. Included cohorts comprised WT **n=15**, Fmr1 **n=15**, Cntnap2 **n=16**, Shank3B **n=14** animals, with region-specific n varying. Comparisons used two-sided Mann–Whitney tests, Cliff's delta, and Benjamini–Hochberg FDR within separate region/subregion × absolute/relative-power families.

**Results.** Each WT comparison comprised 312 band-power tests. Uncorrected p<0.05 occurred in **19** Fmr1, **26** Cntnap2 and **12** Shank3B tests; respectively **0**, **1** and **0** survived the applied BH-FDR correction. The surviving difference was **higher absolute high-gamma (65–100 Hz) power in secondary motor cortex layers 2/3 (MOs2/3) in Cntnap2** versus WT: WT **n=10**, median **48.40 µV²**; Cntnap2 **n=8**, median **126.65 µV²**; **p=0.000320**, **q=0.032634**, **Cliff's δ=+0.925** (2.62-fold median ratio). Shank3B showed visually concordant positive absolute-power effects across MOs cortical layers, including nominally elevated high gamma in MOs2/3; however, no Shank3B result remained significant after BH-FDR. Fmr1 yielded no within-family FDR-significant differences.

**Conclusions.** This exploratory reanalysis identifies a model-associated high-frequency LFP power difference in superficial secondary motor cortex of Cntnap2 mice, with broader uncorrected cortical spectral trends across ASD models. Because intertrial wheel-still is not equivalent to verified rest and 65–100 Hz power may include aperiodic and spike-related contributions, this observation should not yet be interpreted as altered gamma oscillation strength or inhibitory interneuron activity. Independent replication and additional spectral QC are required; a single FDR correction across all models and families has not been performed.

## Figure index (saved figures on Google Drive)

1. [Cntnap2 vs WT: individual-mouse MOs2/3 absolute high gamma](https://drive.google.com/file/d/19bJt772Lh9vIK-4yry-LMNAaLdMWOEtI/view) — **within-family FDR significant**, n=10 vs n=8.
2. [Cntnap2 vs WT: regional absolute-power effect-size heatmap](https://drive.google.com/file/d/1gnIU9ew-rxSDdrPdlJretm2rvJz4jgE-/view) — nominal trends; no regional BH-FDR significance.
3. [Cntnap2 vs WT: regional relative-power effect-size heatmap](https://drive.google.com/file/d/12VvhX7OoPD2jnsnMllMHThVXuqiZBL-b/view).
4. [Shank3B vs WT: subregion absolute-power heatmap](https://drive.google.com/file/d/16hbSohJXTuQiZrha-tbQ7d7FhyEHaXZy/view) — * denotes uncorrected p<0.05; no ** within-family BH-FDR result.
5. [Shank3B vs WT: relative-power heatmap](https://drive.google.com/file/d/1-cxf_3QU3SQdeuzXAjEaNxsFGNXMJ_1o/view).
6. [Fmr1 vs WT: regional absolute-power heatmap](https://drive.google.com/file/d/1jJadNOBZAw_m_PeZGedSGQs3XXvX6pf_/view); [regional relative-power heatmap](https://drive.google.com/file/d/1cz-jXWck3N93pqNSaoQ2UxaDU0_bNku_/view).

## Primary statistics tables

- [WT vs Fmr1](https://drive.google.com/file/d/1ia7UriAQJh-7q-DvOXiSWKEP6Ng_Dar1/view)
- [WT vs Cntnap2](https://drive.google.com/file/d/1pmFJ8vlTc3D8az5m6G1Hi4QbVEn8p2cN/view)
- [WT vs Shank3B](https://drive.google.com/file/d/1lOO2ALfUcuRVw0JgryomDUG9S93H0kwg/view)

**Reporting note:** FDR p-values above are corrected **within four analysis families for each comparison**, not across all three model comparisons. The `ALL` regional measurements and subregions are correlated/nested; report these as distinct analysis levels but do not count them as independent experiments.
