# Neural Response Dynamics Across Genetic Mouse Models of Autism

An independent, reproducible Python reanalysis of publicly accessible electrophysiology and behavioral data associated with Noel et al. (2025), *A common computational and neural anomaly across mouse models of autism*, Nature Neuroscience. DOI: https://doi.org/10.1038/s41593-025-01965-8.

> **Status:** Project setup and data-access verification. No independent results are claimed yet.

## Original study

### Authors' hypothesis
- Distinct autism-associated genetic mutations may converge on a shared computational abnormality in probabilistic inference and prior updating.
- This abnormality may be associated with common changes in neural representations of prior expectations and sensory prediction errors.

### What the authors investigated
- Behavioral adaptation to changing stimulus probabilities in wild-type mice and three mutant models (*Fmr1*, *Cntnap2*, *Shank3B*).
- Subjective prior updating via computational decision models.
- Brain-wide Neuropixels recordings and neural representations of priors, sensory information, choices, and unexpected events.

### What the authors reported
- Reduced flexibility of prior updating across the three mutant models.
- A relative shift in subjective prior representation from visual toward frontal cortical areas.
- Altered frontal encoding of deviations from long-run prior expectations.
- Reduced detectable differentiation of expected and unexpected observations in frontal sensory responses.

## Independent reanalysis

### Hypotheses
1. Stimulus-evoked response dynamics and trial-to-trial reliability in VISp and ACAd may differ between wild-type and mutant groups.
2. These differences may be shared across models or genotype-specific.
3. Electrophysiological response metrics may be associated with behavioral flexibility in prior updating.

### Planned analyses
- Reproduce selected stimulus-aligned responses to validate alignment, definitions, and data access.
- Quantify baseline firing, response magnitude, onset latency, and response duration.
- Estimate trial-level spike-count variability and response reliability where trial-resolved spikes are available.
- Analyze ISI distributions, CV2, and appropriately defined bursting metrics.
- Account for stimulus contrast, trial history, behavioral covariates, and animal/session nesting.
- Compare effects across *Fmr1*, *Cntnap2*, and *Shank3B* cohorts.

**All analyses are exploratory until an analysis plan and inclusion criteria have been frozen.** Neurons from the same mouse/session are not independent biological replicates.

## Data provenance
- Study and data instructions: https://osf.io/fap2s/
- International Brain Laboratory ONE: https://int-brain-lab.github.io/ONE/
- Behavioral model code: https://github.com/int-brain-lab/ibl-changepoint
- Encoding model code: https://github.com/BalzaniEdoardo/PGAM

Raw Neuropixels recordings and large derived datasets are **not committed to Git**. Data provenance, external dataset identifiers, download procedures, analysis configurations, and derived summary tables will be documented.

## Repository structure
```
notebooks/00_environment_and_data_access.ipynb
requirements.txt
.gitignore
README.md
LICENSE
```

## Reproducibility and attribution
- All code and prose in this repository are written in English.
- Original author datasets and code remain attributed to the original research team.
- This repository documents independent analysis rather than ownership of the underlying recordings.
- Commit history should reflect real contributions; identify collaborators and AI assistance where appropriate.

## Getting started
1. Open `notebooks/00_environment_and_data_access.ipynb` in Google Colab.
2. Run environment checks and query public IBL metadata.
3. Verify the session list before downloading any substantial datasets.

## Citation
Noel et al. (2025). *A common computational and neural anomaly across mouse models of autism*. *Nature Neuroscience*. https://doi.org/10.1038/s41593-025-01965-8
