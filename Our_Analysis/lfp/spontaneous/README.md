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


## Ordered master analysis plan (2026-11-17)

**Study design:** compare WT, Fmr1, Cntnap2 and Shank3B, initially in the same nine regions as prior single-unit analysis, subject to LF availability and genotype coverage. Begin with comparable quiet-state periods; treat behavior-aligned LFP as a separate later module. All analyses are exploratory unless prespecified otherwise.

### 1. Inventory and raw-signal quality control
- Confirm LF raw-file availability per subject/session/probe and confirm sample rate, voltage scaling and reference.
- Map channels to regions with probe geometry and histology. Audit animal counts for each region × genotype.
- Set consistent channel-selection, artifact rejection, state/wheel/stimulus exclusion rules. Save an auditable exclusion log.
- Do not treat channels, windows or repeated sessions as independent animals.

### 2. Primary spectral power analysis
- Compute Welch PSD from comparable artifact-free LFP segments (provisional Hann window 4s, 50% overlap; pilot-verify suitability).
- Derive absolute integrated band power in uV^2, relative band power (%), log absolute band power, optional band peak frequency and full saved PSD.
- Provisional bands: delta 1–4, theta 4–8, alpha-like 8–12, beta 12–30, low gamma 30–55, high gamma 65–100 Hz; check real sampling/Nyquist, line noise and mouse-region-specific definitions before freezing.
- Secondary: spectral parameterization (periodic peaks, aperiodic exponent/offset), to disambiguate true oscillatory peaks from 1/f background.
- Compare WT vs Fmr1, Cntnap2, Shank3B in the same anatomical regions; report effect sizes and confidence intervals alongside multiplicity-corrected p-values.

### 3. Interregional LFP functional connectivity
- Only simultaneously recorded regions, with matched time windows. Compute frequency-resolved magnitude-squared coherence, imaginary coherence, wPLI, and LFP–LFP phase-locking / lag.
- Map available anatomical pairs and build region-pair × genotype networks; optional graph metrics only if coverage supports them.
- Evaluate common-reference contamination, volume conduction, distances and signal quality before biological interpretation.

### 4. Spike–field coupling
- Join prior spike timestamps to synchronized LF recordings. Quantify spike-phase PLV / vector strength, preferred phase, bias-robust PPC, and spike-field coherence.
- Control spike counts and firing rates, phase estimation stability, spike leakage on nearby channels and pseudo-replication.

### 5. Cross-frequency phase–amplitude coupling
- Estimate theta–gamma PAC and carefully prespecified additional pairs using phase of low-frequency band and envelope of higher-frequency band.
- Report modulation index, preferred modulation phase, comodulograms, surrogate-normalized significance.
- Guard against waveform non-sinusoidality, harmonics, transients and filtering artifacts.

### 6. Putative neuron classes from extracellular waveforms
- Evaluate trough-to-peak duration, half-width, asymmetry, repolarization slope, and firing phenotype.
- Compare narrow- and broad-spiking **putative** groups for firing, bursting and spike–LFP coupling. Do not equate narrow spikes with confirmed PV identity.

### 7. Integrative analysis
- Relate single-unit FR / ISI / bursting, spectral power, cross-region connectivity, spike–field coupling, PAC and putative waveform classes.
- Explore associations with behavior only when states and trial timing are comparable.
- Interpret null results alongside estimates of uncertainty; do not use significance hunting to select pipelines.

### Statistical rules
- Primary inferential unit: **mouse**. Aggregate channels/windows to animal-region measurements, or use hierarchical/mixed-effects models for sessions nested in animals.
- Predeclare contrasts WT vs each model, regions, frequency bands, FDR family, QC thresholds and covariates before all-genotype inferential analysis.
- Include genotype-wise number of subjects, channel/session coverage, effect sizes, 95% CIs, unadjusted p and corrected q.

**Immediate next step:** inventory LF availability and one WT pilot recording. No heavy-data download or inferential analysis yet.
