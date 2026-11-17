# Spontaneous LFP analysis

Genotypes: WT, Fmr1, Cntnap2, Shank3B.

Each genotype has three Colab notebooks: explore (inventory/QC), processing (download LF excerpts, region mapping, PSD), results (within-genotype visualizations and QC summaries). **Between-genotype statistical comparisons must be conducted jointly at animal level, not independently per genotype.** The shared notebook is `genotype_comparison.ipynb`.

Status: **scaffold only**, LF data availability and region coverage not yet verified.

Working Drive path: `/content/drive/MyDrive/Reanalysis/Our_Analysis/lfp/spontaneous/`.

Planned primary metric: log10 absolute integrated band power from artifact-screened Welch PSD (units microvolt squared). Per-animal regional estimates with fixed, predeclared channel selection. Genotype comparisons WT vs each model, multiplicity corrected. Frequency bands and quiet-state definition require final confirmation after pilot QC. Keep raw LF recordings out of git.
