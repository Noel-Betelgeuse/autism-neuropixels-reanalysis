# WT vs Cntnap2 — LFP band-power comparison (preliminary)

Analysis unit: independent animal. Spectral power estimated from intertrial wheel-still 2-second windows, aggregated across contacts and insertions to animal level. Six frequency bands, absolute and relative power; comparison: two-sided Mann–Whitney U, Cliff's delta (positive = Cntnap2 higher than WT), and Benjamini–Hochberg FDR within four separate analysis families (region/subregion × absolute/relative power).

## FDR-significant finding

- Region/subregion: MOs / MOs2/3 (secondary motor cortex, layers 2/3)
- Band: High gamma, 65–100 Hz
- Metric: Absolute LFP band power (µV²)
- WT: n = 10 mice
- Cntnap2: n = 8 mice
- Raw p = 0.000320
- BH-FDR adjusted p = 0.032634
- Cliff's delta (Cntnap2 vs WT) = +0.925
- Direction: Higher in Cntnap2

Across all 312 band-power comparisons, 26 had uncorrected p < 0.05 and one survived BH-FDR under the defined families.

## Interpretation and caveats

This is an exploratory finding requiring PSD/aperiodic-spectrum review and verification of possible spike/high-frequency contamination. A 65–100 Hz LFP power increase alone does not establish an increase in oscillatory gamma activity or fast-spiking interneuron activity. `ALL` and subregion estimates are analyzed as separate families; the MOs2/3 finding does not imply significance at MOs/ALL level. The window state is intertrial wheel-still, not verified rest. Independent biological replication and review of potential confounds are needed.

Source: WT vs Cntnap2 Colab statistics output reported by user on 2026-11-18; verify against the saved animal-level and statistics CSV prior to manuscript submission.
