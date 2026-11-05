# WT baseline electrophysiology — descriptive results (2026-11-05)

Cohort: 15 WT mice; 99 completed probe insertions. 2,436 recorded QC-pass units assigned to the 24 selected Allen labels, including 1,898 units in nine neuronal regions and 538 units with excluded/unresolved region labels.

## Regional summaries

| Region | Mice | Units | FR (Hz) | CV ISI | CV2 | Burst rate/min (preliminary) | Burst fraction % (preliminary) |
|---|---:|---:|---:|---:|---:|---:|---:|
| DG | 15 | 223 | 5.07 | 5.02 | 1.028 | 26.21 | 52.95 |
| CA1 | 13 | 212 | 5.15 | 4.88 | 0.874 | 21.05 | 48.79 |
| CA3 | 8 | 121 | 5.26 | 4.10 | 0.991 | 25.61 | 50.06 |
| SUB | 9 | 166 | 6.16 | 5.46 | 0.935 | 25.10 | 52.56 |
| VISp | 12 | 160 | 4.72 | 6.02 | 0.902 | 20.68 | 52.40 |
| MOs | 10 | 272 | 4.81 | 4.52 | 0.849 | 11.37 | 33.79 |
| CP | 7 | 208 | 3.52 | 4.99 | 0.915 | 14.40 | 46.64 |
| MRN | 8 | 391 | 5.62 | 9.06 | 0.892 | 12.78 | 57.34 |
| APN | 9 | 145 | 8.75 | 11.07 | 0.822 | 28.49 | 60.73 |

Values are averaged first within each mouse and then across mice. All units retain original Allen labels in the neuron-level data.

## Preliminary conclusions

- WT firing rates vary by anatomical region: APN 8.75 Hz, CP 3.52 Hz. No genotype comparisons are possible from WT alone.
- CV2 is approximately 0.82–1.03 across groups, describing mixed neuronal populations rather than identified cell types.
- Unique mouse coverage per region ranges from 7 to 15.

## Critical burst calculation limitation

The current shortened logISI-like code uses an automatic 100 ms fallback threshold when it fails to identify an eligible histogram valley. Of 1,898 units in the nine-region panel, 1,413 (74.4%) used this 100 ms threshold. Additionally, 85 units showed per-neuron mean burst durations over 1 second. The original 24-label table includes CA1 mean burst duration 4,126 ms and VISp5 8,039 ms. These outputs are preserved as preliminary algorithm results but MUST NOT be interpreted as validated biological burst effects. A published, fully specified logISI implementation is required before formal bursting comparisons.

## Data files

- `Our_Analysis/03_processed_data/WT/WT_region_summary.csv` — all 24 original Allen labels.
- `Our_Analysis/04_results/WT_9_region_mouse_averaged.csv` — nine merged regions reconstructed directly from neuron-level data; mouse identities deduplicated.
- `Our_Analysis/03_processed_data/WT/WT_all_neurons.csv` — individual neurons, stored on Google Drive.
- `Our_Analysis/03_processed_data/WT/processing_log.csv` — completed insertions.

Metrics: FR, mean ISI, CV ISI, CV2, provisional burst rate, burst fraction, burst duration, spikes per burst, intraburst FR, inter-burst interval. All nine-region aggregation uses one mean per mouse per region before averaging across mice.
