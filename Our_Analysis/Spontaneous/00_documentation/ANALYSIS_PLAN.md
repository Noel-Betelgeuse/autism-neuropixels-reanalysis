# Electrophysiological reanalysis plan

Dataset: angelaki_mouseASD
Genotypes: WT, Fmr1, Cntnap2, Shank3B

Primary neuronal regions:
DG, CA1, CA3, SUB, VISp, MOs, CP, MRN, APN.

1. Recover mouse/session/probe/cluster identifiers and Allen labels.
2. Merge anatomical sublayers at the individual-cluster level.
3. Select QC-pass neuronal units and report unique mouse coverage.
4. Calculate firing rate, ISI CV and CV2.
5. Quantify bursting and pause characteristics.
6. Analyze stimulus-, movement- and feedback-aligned activity.
7. Compare each ASD genotype with WT.
8. Assess shared and genotype-specific abnormalities.

Statistics:
Mouse is the biological replicate.
Retain neuron, probe and session identifiers.
Report effect sizes, confidence intervals and adjusted p-values.
Apply multiple-comparison correction to confirmatory tests.

Important:
VL denotes lateral ventricle, not ventrolateral thalamus.
White matter and unspecified parent regions are excluded
from primary neuronal comparisons.

All long computations must save checkpoints to Google Drive.
