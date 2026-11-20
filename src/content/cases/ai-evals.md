---
title: "AI Evaluation Study Guide"
subtitle: "A 7-module visual course and protocol toolkit for evidence-based AI and Human–AI evaluation"
order: 1
featured: false
coverImage: "/images/cases/ai-evals-1.png"
coverAlt: "AI Evaluation Study Guide 7-module course interface"
role: "Product Designer · Author · Builder"
scope: "Curriculum architecture · Information design · Interactive evaluation tools · Front-end engineering"
timeline: "November 2026"
team: "Solo + AI-assisted development"
nextSlug: "epistemia-ux"
---

## Context

Most introductory material on AI evaluation stays at the level of prompt tuning, vibes-based playgrounds, or isolated leaderboard benchmarks. Teams know they need "evals," yet struggle to connect model-level metrics to workflow reliability, human verification effort, and launch decisions.

I designed and built the [AI Evaluation Study Guide](https://m5rc238.github.io/ai-evals/) ([source repository](https://github.com/m5rc238/ai-evals), plus a standalone [one-page Markdown reference](https://github.com/m5rc238/ai-evals/blob/main/ai-evals-guide.md)) to bridge foundational measurement concepts, statistical rigor, and Human–AI interaction design inside one structured, inspectable web application.

## The design question

Instead of starting from a benchmark metric or grading library, the guide asks:

**What decision is the evaluation supposed to inform, and what unit of evidence actually supports that claim?**

Across seven modules, every concept ties back to three explicit components—**Dataset (Stimulus)**, **Rubric (Criteria)**, and **Judge (Scorer)**—alongside **Construct Validity** (whether the rubric measures the real goal rather than surface polish) and **External Validity** (whether clean test inputs generalize to real users and shifting data).

## Seven evaluation layers and units of analysis

A recurring source of confusion in AI teams is treating a lower-layer score as proof of higher-layer product value. The guide organizes evaluation scope across seven layers, each with its own unit of analysis:

| # | Layer | What it evaluates | Unit of analysis |
| --- | --- | --- | --- |
| 1 | **Data & Inputs** | Source coverage and parsing fidelity | Source packet / input category |
| 2 | **Isolated Model** | Claim grounding and output behavior | Claim or response |
| 3 | **Component** | Retrieval or tool-call relevance | Search query / tool call |
| 4 | **Workflow / Agent** | End-to-end state and citation integrity | End-to-end run |
| 5 | **Human–AI Interaction** | Error visibility and total verification time | Task session or analyst |
| 6 | **Organizational** | Team throughput and review bottlenecks | Team or team-week |
| 7 | **Wider Impacts** | Equity across languages and affected groups | Language community / group |

The central principle across layers is explicit: passing a lower-layer eval alone cannot establish higher-layer success. A factually accurate model can still fail in practice if the interface makes verifying citations slower than doing the work manually.

![AI Evaluation Study Guide metrics taxonomy tool](/images/cases/ai-evals-2.png)

*Metrics Taxonomy Tool: 29 operationalized evaluation metrics mapped across layers, scopes, and units of analysis so teams can assemble an inspectable eval plan.*

## Course architecture and practice tools

The curriculum spans **7 modules and 23 chapters**, each pairing dedicated **Theory**, an interactive **Practice Lab**, and an **End-of-Module Quiz** with local progress tracking:

1. **Foundations of AI Evaluation** — Evals vs. unit tests, the 7 layers, validity, and the Four Operating Rules (*start with the decision*, *treat the eval as the spec*, *account for contamination*, *watch for Goodhart's Law*).
2. **Scoping & Datasets** — Testing simpler non-AI baselines first, pinning the full execution harness, separating exploratory from confirmatory runs, and building ordinary, ambiguous, and escalation cases.
3. **Rubrics, Judges & Aggregation** — Deriving observable rubrics from reviewer disagreements, deterministic vs. LLM vs. human judges, inter-rater agreement (κ, α, ICC), and avoiding Simpson's paradox.
4. **Comparing Versions, Statistics & Validity** — Paired difference intervals, clustering at the unit of analysis, Rule of Three bounds, and an interactive 12-question Statistical Workbench.
5. **Real-World Workflows & Production Monitoring** — Environment-state checks for agents (Layer 4), total human task time across drafting, checking, and correction (Layer 5), and separate evaluator versioning.
6. **Human–AI Interaction & Epistemic Risk** — Complementarity, calibrated reliance, oversight cost, and anti-epistemia interface evaluation.
7. **Auditing Benchmarks & Vendor Claims** — How leaderboards mislead, a 4-question audit checklist, and calibrated reporting.

Alongside the core chapters, the app includes **Optional Advanced Tracks (A–G)** (covering RAG, Agents, Safety, Multimodal, Advanced Measurement, Organizational Evals, and Deep Human–AI Research & SPHERE by Zhao et al., ACL 2025) and three interactive builder tools: the **Metrics Taxonomy Tool**, a **12-field Eval Protocol & Decision Builder** with Exploratory/Confirmatory modes and `.md` / `.json` export, and a **SPHERE Card Tool**.

![AI Evaluation Study Guide 12-field eval protocol builder](/images/cases/ai-evals-3.png)

*12-field Eval Protocol & Decision Builder: turns loose evaluation ideas into a bounded decision statement and exportable Markdown or JSON specification.*

## Worked capstone without hiding uncertainty

Rather than ending with abstract guidelines, the **Final Capstone Project** walks through a complete 22-element evaluation proposal for a **fictional** internal tool—the *Meridian Research Assistant v2.1*—paired with a reusable 22-field template, mixed fictional results, sample statistical interpretation, a sample final report, and a 4-level grading rubric.

Showing mixed fictional outcomes alongside explicit scope boundaries models how real product evaluations report trade-offs: where citation quality improved, where verification time offset speed gains, and what remained unproven.

![AI Evaluation Study Guide Meridian Research Assistant capstone](/images/cases/ai-evals-4.png)

*Final Capstone Project: a worked 22-element evaluation proposal for the fictional Meridian Research Assistant, paired with a reusable template and 4-level rubric.*

## Scope and limits

The AI Evaluation Study Guide is an open-source educational curriculum and protocol toolkit, not an empirically evaluated training intervention. All examples inside the Meridian capstone—and the worked example data in the protocol builder—are explicitly fictional illustrations designed to teach methodological rigor rather than report real product outcomes.
