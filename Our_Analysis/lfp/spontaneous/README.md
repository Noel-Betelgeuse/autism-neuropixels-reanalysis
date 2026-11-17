# Spontaneous LFP analysis

Genotypes: WT, Fmr1, Cntnap2, Shank3B.

Each genotype has three Colab notebooks: explore (inventory/QC), processing (download LF excerpts, region mapping, PSD), results (within-genotype visualizations and QC summaries). **Between-genotype statistical comparisons must be conducted jointly at animal level, not independently per genotype.** The shared notebook is `genotype_comparison.ipynb`.

Status: **scaffold only**, LF data availability and region coverage not yet verified.

Working Drive path: `/content/drive/MyDrive/Reanalysis/Our_Analysis/lfp/spontaneous/`.

Planned primary metric: log10 absolute integrated band power from artifact-screened Welch PSD (units microvolt squared). Per-animal regional estimates with fixed, predeclared channel selection. Genotype comparisons WT vs each model, multiplicity corrected. Frequency bands and quiet-state definition require final confirmation after pilot QC. Keep raw LF recordings out of git.


## Future roadmap (not part of the initial PSD study)

1. **Interregional LFP connectivity:** magnitude-squared coherence, imaginary coherence, weighted phase-lag index (wPLI), phase-locking estimates, and possibly directed analyses if assumptions are met. Only compare signals recorded simultaneously; evaluate volume conduction, common reference and channel distance. Aggregate to independent animals.
2. **Spike–LFP coupling:** per-neuron spike phase locking (vector strength / spike-based PLV, preferably bias-corrected pairwise phase consistency, PPC); frequency-resolved spike-field coherence (SFC) separately. These are related but **not identical** estimators. Use properly synchronized spikes and raw LF traces, control firing rate/spike count and avoid spiking contamination from same/nearby contacts.
3. **Cross-frequency phase–amplitude coupling (PAC):** theta phase vs gamma amplitude and other predefined frequency pairs, assessed with Hilbert transform after appropriate filters and surrogate tests. Control nonsinusoidal waveforms, sharp transients, harmonics and 1/f changes. PAC is not proof of mechanistic modulation.
4. **Waveform-based neuron subclasses:** waveform width, trough-to-peak time, asymmetry, and potentially firing properties for putative narrow- vs broad-spiking groups. Waveform clusters alone **cannot definitively identify PV interneurons or excitatory cells**; thresholds must be validated by region and recording geometry.
5. **Integrative hypothesis:** first identify frequency/regional differences in LFP power, then test whether local spikes show changed phase locking and whether coherent networks differ by genotype. No claims about a specific ASD genotype's effect direction without testing.

**Current priority remains straightforward spontaneous/quiet-state PSD band-power comparison across WT, Fmr1, Cntnap2 and Shank3B.** Future analyses should be preregistered or clearly labeled exploratory; do not select later analyses simply to obtain significant p-values.
