---
title: "Epistemia UX"
subtitle: "Seven Human–AI interface patterns that replace fluent guesswork with inspectable judgment"
order: 2
featured: false
category: "ai-research"
tag: "Human–AI UX Patterns"
summary: "Translated seven epistemological fault lines from arXiv:2512.19466 into side-by-side before/after interface solutions—showing where conventional fluent AI UI fails and how epistemic scaffolding supports critical judgment."
liveUrl: "https://m5rc238.github.io/epistemia-ux/"
repoUrl: "https://github.com/m5rc238/epistemia-ux"
coverImage: "/images/cases/epistemia-ux-3.png"
coverAlt: "Epistemic UX Solutions Lab comparing conventional fluent UI against claim-evidence binding"
role: "Product Designer · UX Researcher · Builder"
scope: "Human–AI interaction design · Pattern library · Counterfactual UX prototyping · Front-end engineering"
timeline: "November 2026"
team: "Solo + AI-assisted development"
prevSlug: "ai-evals"
nextSlug: "decision-router"
---

## Context

In [Quattrociocchi, Capraro & Perc (arXiv:2512.19466)](https://arxiv.org/html/2512.19466v1), **epistemia** describes a failure mode where linguistic plausibility substitutes for epistemic evaluation—producing the *subjective feeling of knowing without the labor of critical judgment*.

A person using an AI summary can receive fluent, factually accurate prose and still miss when an underlying assumption breaks. Standard accuracy metrics rarely catch that failure, because the interface looks equally confident whether the claim is grounded, sycophantic, or underdetermined.

I built [Epistemia UX](https://m5rc238.github.io/epistemia-ux/) ([source repository](https://github.com/m5rc238/epistemia-ux)) as an interactive **UX Solutions Lab** translating all seven epistemological fault lines from the paper into concrete interface interventions.

## Before & after: conventional fluent UI vs. epistemic scaffolding

Rather than proposing abstract guidelines, the lab pairs **Conventional Fluent UI (Epistemia Risk)** directly against an **Epistemic UX Solution** under live counterfactual perturbations. Reviewers can toggle perturbations in the browser—removing a decisive control arm, flipping user preference, or introducing competing causal models—to see where fluent prose stays deceptively confident and how the epistemic pattern responds.

![Epistemic UX Solutions Lab side-by-side comparison](/images/cases/epistemia-ux-3.png)

*Epistemic UX Solutions Lab: side-by-side comparison of Conventional Fluent UI vs. Claim–Evidence Binding & Decisive Cue Strip under live counterfactual perturbations.*

## Seven epistemic UX solutions

Each pattern targets a specific breakdown between linguistic fluency and warranted belief:

### 1. Grounding — Claim–Evidence Binding & Decisive Cue Strip
- **Conventional UI trap:** Citations appear as static text tokens (`(Methods §2; Fig. 2)`), so fluent confidence persists even when the cited passage is missing or contradicts the claim.
- **Epistemic solution:** Binds each claim to live evidence slots and highlights the **decisive cue** (e.g., the sham-control arm). When that cue is removed or contradicted, the claim status shifts from *Grounded & Qualified* to *Unverified* or *Contradicted*.

![Grounding comparison: Conventional Fluent UI vs. Claim-Evidence Binding](/images/cases/epistemia-ux-grounding.png)

*Grounding comparison: static unlinked citation tokens vs. live bound evidence slots and decisive-cue verification.*

### 2. Parsing — Semantic Role Preview & Single-Question Disambiguation
- **Conventional UI trap:** Paraphrases and subtle role reversals (*who did what to whom*) are silently smoothed over into one confident answer.
- **Epistemic solution:** Exposes parsed semantic roles (`Agent`, `Action`, `Target`, `Condition`) before committing to an interpretation and surfaces a single clarifying question when roles are ambiguous.

### 3. Experience — Dated Epistemic Ledger & Transfer Revision Log
- **Conventional UI trap:** Stale facts and newer corrections blend together in conversational memory with no visible supersession trail.
- **Epistemic solution:** Maintains a timestamped ledger where newer evidence explicitly supersedes older entries and records how learned rules transfer across contexts.

### 4. Motivation — Premise-Neutral Evidence Ledger (Anti-Sycophancy Guard)
- **Conventional UI trap:** When a user nudges the model toward a preferred conclusion, fluent prose mirrors the user's framing and selectively rationalizes it.
- **Epistemic solution:** Separates user preference from an invariant evidence ledger, holding supporting and contradicting evidence steady even when the prompt's framing flips.

![Motivation comparison: Conventional Sycophantic AI vs. Premise-Neutral Evidence Ledger](/images/cases/epistemia-ux-motivation.png)

*Motivation comparison: when the user asserts a false positive, the conventional reply agrees sycophantically (50% matrix accuracy), while the evidence-locked ledger corrects the premise against A/B Registry #804 (100% accuracy).*

### 5. Causality — Causal Mechanism DAG & Underdetermination Hold
- **Conventional UI trap:** Correlational patterns are narrated in causal language, masking when multiple competing mechanisms fit the same data.
- **Epistemic solution:** Visualizes the assumed causal graph (DAG) alongside competing models and triggers an explicit **Underdetermination Hold** when observational evidence cannot separate them.

### 6. Metacognition — Tri-Modal Action Router (`Answer` / `Seek Evidence` / `Abstain`)
- **Conventional UI trap:** Binary answer-or-refuse interfaces push systems toward guessing fluently on borderline queries.
- **Epistemic solution:** Replaces binary output with a tri-modal router—answering when grounded, **seeking specific evidence** when a targeted lookup can resolve uncertainty, and **abstaining** when evidence is insufficient.

![Metacognition comparison: Forced Single-Mode Output vs. Tri-Modal Action Router](/images/cases/epistemia-ux-metacognition.png)

*Metacognition comparison: under an unfamiliar pediatric task shift, forced fluency emits an unsafe guess at 89% token confidence, whereas the tri-modal router detects the shift and routes to `SEEK EVIDENCE`.*

### 7. Value — Standard Charter, Weight Slider & Contestability Workflow
- **Conventional UI trap:** Normative trade-offs (e.g., speed vs. false-positive risk) are buried inside an ostensibly neutral recommendation.
- **Epistemic solution:** Surfaces the active value weights with interactive sliders and pairs every recommendation with a named contestability path to inspect or reverse the decision.

## Status and limits

Epistemia UX is a working interactive pattern laboratory rather than an empirical user study. Alongside the 7-pattern Solutions Lab, the live workbench includes a runnable 2×2 paper appraisal pilot and telemetry dashboard for anyone interested in testing how these interventions affect revision behavior.
