---
title: "Epistemia UX"
subtitle: "Seven Human–AI chatbot patterns tested with 12 practitioners to replace fluent guesswork with inspectable judgment"
order: 2
featured: false
category: "ai-research"
tag: "Human–AI UX Research"
summary: "Translated seven epistemological fault lines from arXiv:2512.19466 into inline chatbot UX patterns and evaluated them with 12 domain practitioners—raising fault detection from 37% to 88% and cutting high-confidence overtrust from 48% to 4%."
repoUrl: "https://github.com/m5rc238/epistemia-solutions"
coverImage: "/images/cases/epistemia-ux-chatbot-grounding.png"
coverAlt: "Side-by-side comparison of Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with UX annotations"
role: "Product Designer · UX Researcher · Builder"
scope: "Human–AI interaction design · 12-user evaluative research · Chatbot UX patterns · Front-end prototyping"
timeline: "November 2026"
team: "Solo + AI-assisted development"
prevSlug: "ai-evals"
nextSlug: "decision-router"
---

## Context

In [Quattrociocchi, Capraro & Perc (arXiv:2512.19466)](https://arxiv.org/html/2512.19466v1), **epistemia** describes a failure mode where linguistic plausibility substitutes for epistemic evaluation—producing the *subjective feeling of knowing without the labor of critical judgment*.

Conventional AI chat interfaces optimize for smooth, authoritative prose. When a source contradicts the headline claim, a command is structurally ambiguous, a sensor log has been superseded, or a prompt nudges the model toward sycophancy, fluent text hides the failure behind the exact same visual confidence.

I designed and built [Epistemia Solutions](https://github.com/m5rc238/epistemia-solutions) to translate all seven epistemological fault lines into lightweight inline chatbot UX patterns, and evaluated them in a **12-user study** with practitioners across clinical, policy, legal, safety-eval, journalism, and operations roles (84 paired Baseline vs. Solution evaluations).

## 12-user research outcomes

| Metric (n = 12, 84 paired evaluations) | Conventional Baseline | Epistemic UX Solution |
| --- | --- | --- |
| **Fault detection rate** | 37% (31/84) | **88%** (74/84) |
| **High-confidence overtrust** (missed fault, confidence ≥ 4/5) | 48% (40/84) | **4%** (3/84) |
| **Perceived usability (mean SUS)** | 73.5 | **79.6** |

The baseline felt smooth and usable (73.5 SUS), which was precisely the trap: participants routinely accepted ungrounded, outdated, or sycophantic replies with high confidence. Adding inline epistemic scaffolding inside the chat bubble sharply reduced overtrust while improving perceived usability.

## Seven chatbot UX solutions

Each comparison below pairs the **Conventional Fluent Chatbot (Baseline)** against the **Epistemic-Scaffolded Chatbot (Solution)** alongside the hidden epistemia risk and UX rationale annotations.

### 1. Grounding — Inline Status Pill & Bound Evidence Drawer

- **12-user result:** Fault detection rose from **4/12 to 11/12**; high-confidence overtrust dropped from **6/12 to 0/12**.

![Grounding: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-grounding.png)

### 2. Parsing — Semantic Role Pill & One-Tap Disambiguator

- **12-user result:** Fault detection rose from **6/12 to 11/12**; high-confidence overtrust dropped from **5/12 to 0/12**.

![Parsing: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-parsing.png)

### 3. Experience — Dated State Card & Superseded History Pill

- **12-user result:** Fault detection rose from **5/12 to 11/12**; high-confidence overtrust dropped from **5/12 to 1/12**.

![Experience: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-experience.png)

### 4. Motivation — Premise-Neutral Evidence Check Banner

- **12-user result:** Fault detection rose from **4/12 to 10/12**; high-confidence overtrust dropped from **6/12 to 0/12**.

![Motivation: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-motivation.png)

### 5. Causality — Underdetermination Hold & Competing Paths Card

- **12-user result:** Fault detection rose from **4/12 to 10/12**; high-confidence overtrust dropped from **6/12 to 2/12**.

![Causality: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-causality.png)

### 6. Metacognition — Tri-Modal Action Router (`Answer` / `Seek` / `Abstain`)

- **12-user result:** Fault detection rose from **4/12 to 11/12**; high-confidence overtrust dropped from **6/12 to 0/12**.

![Metacognition: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-metacognition.png)

### 7. Value — Standard Charter & Inline Contestability Action

- **12-user result:** Fault detection rose from **4/12 to 10/12**; high-confidence overtrust dropped from **6/12 to 0/12**.

![Value: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-value.png)

## Key takeaways & friction points

- **Fluency masks failure even when usability scores look healthy:** At 73.5 SUS, the conventional chatbot felt effortless—yet participants missed 63% of injected faults and rated nearly half of their wrong answers at high confidence.
- **Lightweight inline widgets beat prose disclaimers:** Status badges, bound evidence slots, one-tap disambiguators, and superseded timestamps worked directly inside the chat bubble without pulling users out of their workflow.
- **Where friction remained:** Two non-technical participants still misread the Causality competing-model structure with high confidence, one participant hesitated over the boundary between *Seek Evidence* and *Abstain*, and two slip-error regressions occurred on denser controls—pointing directly to simpler visual legends and clearer button copy in the next iteration.
