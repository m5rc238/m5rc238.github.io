---
title: "Epistemia UX"
subtitle: "Operationalizing seven epistemological fault lines into a 2×2 paper appraisal pilot and interactive UX lab"
order: 2
featured: false
coverImage: "/images/cases/epistemia-ux-1.png"
coverAlt: "Epistemia UX overview and seven epistemological fault lines workbench"
role: "Product Designer · UX Researcher · Builder"
scope: "Experimental UX design · Interaction prototyping · Epistemic instrumentation · Front-end engineering"
timeline: "November 2026"
team: "Solo + AI-assisted development"
prevSlug: "ai-evals"
nextSlug: "decision-router"
---

## Context

In [Quattrociocchi, Capraro & Perc (arXiv:2512.19466)](https://arxiv.org/html/2512.19466v1), **epistemia** describes a failure mode where linguistic plausibility substitutes for epistemic evaluation—producing the *subjective feeling of knowing without the labor of critical judgment*.

A person using an AI summary can receive fluent, factually accurate prose and still lose the ability to notice when an underlying assumption breaks. Standard accuracy metrics rarely catch that failure, because the summary looks right until something decisive changes.

I built [Epistemia UX](https://m5rc238.github.io/epistemia-ux/) ([source repository](https://github.com/m5rc238/epistemia-ux)) as a runnable experimental workbench and design laboratory translating all seven epistemological fault lines from the paper into testable interface interventions.

## The 2×2 paper appraisal pilot

The first module is a blinded **2×2 AI-assisted paper appraisal experiment** across three controlled empirical mini-papers in Chronobiology, Learning Analytics, and Urban Policy:

- **Summary Interface:** *Conventional Fluent Summary* vs. *Epistemic-Scaffolded Summary* (exposing the load-bearing assumption and a one-click anchor directly to the decisive passage in the manuscript).
- **Post-Publication Erratum:** *Decisive* (falsifying the load-bearing assumption) vs. *Non-Decisive* (changing an equally prominent but irrelevant detail, such as rounding or sample typo).

Crucially, both interface conditions present the **exact same initial conclusion** and full access to the source manuscript. Only the epistemic scaffolding varies. Measuring **Appropriate Revision** separates two distinct failure modes:

- **Decisive Sensitivity** — revising judgment downward when the load-bearing assumption is falsified (resisting epistemic inertia).
- **Non-Decisive Specificity** — preserving justified trust when a prominent correction affects only a peripheral detail (ruling out blanket skepticism).

![Epistemia UX 2x2 AI-assisted paper appraisal pilot](/images/cases/epistemia-ux-2.png)

*Paper Appraisal Pilot: blinded protocol runner (with a Researcher/Demo condition switcher) testing how summary scaffolding affects revision when an erratum arrives.*

## Seven fault lines translated into UX interventions

The **7 Fault Lines UX Lab** pairs conventional fluent UI baselines against epistemic interface interventions with live counterfactual perturbation controls so each pattern can be stress-tested directly in the browser:

| # | Fault line | UX pattern intervention | Verification criterion |
| --- | --- | --- | --- |
| 1 | **Grounding** | Claim–Evidence Binding & Decisive Cue Strip | Score citation support separately from factual shift when decisive cues are removed or contradicted |
| 2 | **Parsing** | Semantic Role Preview & Single-Question Disambiguation | Preserve paraphrase invariance while staying sensitive to meaning-reversing role edits |
| 3 | **Experience** | Dated Epistemic Ledger & Transfer Revision Log | Verify that newer corrections supersede stale entries and learned rules transfer across contexts |
| 4 | **Motivation** | Premise-Neutral Evidence Ledger (Anti-Sycophancy Guard) | Hold evidence fixed and flip user preference (and vice versa); track evidence across all 4 cells |
| 5 | **Causality** | Causal Mechanism DAG & Underdetermination Hold | Separate interventional predictions from correlation and abstain when competing models fit equally |
| 6 | **Metacognition** | Tri-Modal Action Router (`Answer` / `Seek Evidence` / `Abstain`) | Reduce errors at matched answer rates and test whether seeking evidence resolves uncertain cases |
| 7 | **Value** | Standard Charter, Weight Slider & Contestability Workflow | Expose value trade-offs and test end-to-end reversal through a named decision-maker |

![Epistemia UX 7 Fault Lines interactive design lab](/images/cases/epistemia-ux-3.png)

*7 Fault Lines UX Solutions Lab: side-by-side comparison of conventional fluent UI vs. claim–evidence binding under live counterfactual perturbations.*

## Researcher dashboard and verification telemetry

During a pilot run, the workbench logs initial reading time, revision latency, decisive-passage anchor clicks, and written rationales to `localStorage`. The **Researcher Dashboard** aggregates these into cell-level sensitivity, specificity, Youden's *J* discrimination index, and reading-time trade-offs using custom SVG charts, alongside RFC-4180 CSV and JSON export.

Measuring time alongside accuracy makes verification effort explicit: an interface that improves revision accuracy only because users spend significantly longer checking claims reveals a clear human-factors trade-off rather than hiding it.

![Epistemia UX researcher dashboard with simulated reference pilot data](/images/cases/epistemia-ux-4.png)

*Researcher Dashboard: custom SVG calibration and effort–judgment charts displaying the toggleable simulated reference cohort (n = 24).*

## Status and limits

Epistemia UX is a working experimental instrument and interactive pattern laboratory rather than a completed empirical study. The `n = 24` dataset visible by default in the Researcher Dashboard is explicitly labeled as an **illustrative simulated reference cohort** to demonstrate the scoring pipeline, Youden's *J* calculations, and export format; real human-subject evaluation would require running the blinded protocol with target readers.
