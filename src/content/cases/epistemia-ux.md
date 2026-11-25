---
title: "Epistemia UX"
subtitle: "Seven Human-AI chatbot patterns tested with 12 practitioners to replace fluent guesswork with inspectable judgment"
order: 2
featured: false
category: "ai-research"
tag: "Human-AI UX Research"
summary: "Translated seven epistemological fault lines from arXiv:2512.19466 into inline chatbot UX patterns and tested them with 12 domain practitioners. Fault detection rose from 37% to 88%, and high-confidence overtrust dropped from 48% to 4%."
repoUrl: "https://github.com/m5rc238/epistemia-solutions"
coverImage: "/images/cases/epistemia-ux-chatbot-grounding.png"
coverAlt: "Side-by-side comparison of Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with UX annotations"
role: "Product Designer · UX Researcher · Builder"
scope: "Human-AI interaction design · 12-user evaluative research · Chatbot UX patterns · Front-end prototyping"
timeline: "November 2026"
team: "Solo + AI-assisted development"
prevSlug: "ai-evals"
nextSlug: "decision-router"
---

## The research paper behind this project

This case study builds on [*Epistemological Fault Lines Between Human and Artificial Intelligence*](https://arxiv.org/html/2512.19466v1) by Walter Quattrociocchi, Valerio Capraro, and Matjaž Perc (December 2025).

The paper asks a simple but important question: why do AI tools sound so convincing even when they are wrong? The authors point to a structural gap between how people judge truth and how large language models (LLMs) write text. People check claims against lived experience, real-world consequences, cause-and-effect reasoning, and a sense of when they do not know enough. LLMs do not form beliefs or test ideas against the world. They predict likely next words based on patterns in text.

The authors call the result **epistemia**: a condition where smooth, plausible language takes the place of real verification. When an AI gives a clear, well-written answer, users get the *feeling* of knowing without doing the work of checking. Standard chat interfaces make this worse because a well-supported answer and a flawed answer look identical on screen.

To make the problem concrete, the paper breaks this mismatch into **seven fault lines**: Grounding, Parsing, Experience, Motivation, Causality, Metacognition, and Value.

## Our research questions

The paper diagnoses the problem at a theoretical level, but product teams still need to know what to change in the interface. I built [Epistemia Solutions](https://github.com/m5rc238/epistemia-solutions) to turn all seven fault lines into lightweight inline chatbot patterns, then tested them in a **12-user study** with practitioners across clinical, policy, legal, safety-eval, journalism, and operations roles (84 paired Baseline vs. Solution evaluations).

Our study focused on three plain-language questions:

1. **Spotting hidden errors:** Can small visual cues inside a chat bubble help people catch mistakes that normal chatbot prose hides?
2. **Reducing false confidence:** Do those cues stop people from trusting wrong answers with high confidence, without making the chat feel slow or clunky?
3. **Finding usability friction:** Which patterns still confuse real practitioners, and what needs to be simplified next?

## 12-user study results at a glance

| Metric (n = 12, 84 paired evaluations) | Conventional Baseline | Epistemic UX Solution |
| --- | --- | --- |
| **Fault detection rate** | 37% (31/84) | **88%** (74/84) |
| **High-confidence overtrust** (missed fault, confidence >= 4/5) | 48% (40/84) | **4%** (3/84) |
| **Perceived usability (mean SUS)** | 73.5 | **79.6** |
| **Regressions** (passed baseline, failed solution) | N/A | **2/84** |

The baseline chatbot felt smooth and easy to use (73.5 SUS). That smoothness was the trap: participants missed 63% of injected errors and rated nearly half of all trials as wrong-yet-confident. Adding lightweight visual structure inside the chat bubble cut high-confidence overtrust from 48% to 4% while improving overall usability to 79.6 SUS, at a modest cost of +5 to +12 seconds of extra reading time.

## Seven chatbot UX solutions

Each section below shows the problem framing, our research question, the interface intervention, the side-by-side chatbot comparison with annotations, and what we learned from the 12 participants.

### 1. Grounding: Inline Status Pill & Bound Evidence Drawer

- **Problem framing:** A normal chatbot writes citations like `(Methods §2; Fig. 2)` as plain text. Even when the cited figure contradicts the headline claim, the sentence still reads with full confidence.
- **Research question:** If each claim is tied to a visible status badge and inspectable source slots, will readers catch a hidden contradiction in a clinical summary?
- **The intervention:** We placed a color-coded status pill (`Claim Revised: Contradicted by Fig. 2c`) at the top of the reply and added a compact **Bound Evidence Slots** box below the text so readers can compare the treatment arm (-14 mmHg) directly against the sham control (-13 mmHg).

![Grounding: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-grounding.png)

- **Results (n = 12):** Fault detection rose from **4/12 to 11/12** (+58 percentage points). High-confidence overtrust dropped from **6/12 to 0/12**. Median inspection time rose by **+7s** (24s to 31s).
- **What we learned:** Readers anchored heavily on the "-14 mmHg" headline in the baseline. As one clinical research fellow (P01) put it, *"The baseline -14 mmHg summary felt effortless to read, which was the trap. I only caught the Fig. 2c contradiction when the Bound Evidence Slots flagged it."* One participant (P10) still missed the null replication note in the solution.
- **Actionable next step:** Bold the between-arm difference (`-1 mmHg, p = 0.72`) inside the status pill itself so scanners see the net effect before reading the paragraph.

### 2. Parsing: Semantic Role Pill & One-Tap Disambiguator

- **Problem framing:** When a user types an ambiguous command like *"Cancel the invoice Ana sent Ben before Friday,"* a normal chatbot silently guesses who owns the invoice and what "before Friday" means, then runs an irreversible action.
- **Research question:** Does pausing execution with a role summary and a two-button choice stop users from approving wrong-scope actions?
- **The intervention:** Before acting, the chatbot displays a paused status badge, a simple role pill (`Sender: Ana · Recipient: Ben`), and two clear buttons asking whether "before Friday" filters which invoices to cancel or sets the deadline to cancel them.

![Parsing: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-parsing.png)

- **Results (n = 12):** Fault detection rose from **6/12 to 11/12** (+42 percentage points). High-confidence overtrust dropped from **5/12 to 0/12**. Median inspection time rose by **+5s** (19s to 24s).
- **What we learned:** Half of the participants missed the hidden scope ambiguity in the baseline. A legal reviewer (P05) noted that the single-question card prevented a silent wrong-scope cancellation they had missed moments earlier. One participant (P10) still clicked past the ambiguity prompt.
- **Actionable next step:** Keep the confirm button disabled until the user selects Option A or Option B so high-risk commands cannot be rushed through by habit.

### 3. Experience: Dated State Card & Superseded History Pill

- **Problem framing:** Normal chat threads blend old notes and newer corrections into one flat sentence. After a delay, users cannot tell which sensor reading or rule is currently active.
- **Research question:** Does separating the active value from crossed-out superseded history prevent outdated facts from leaking into current decisions?
- **The intervention:** The reply leads with an **Active Ledger State** badge and promotes the verified Day 15 calibration (`+1.4°C`) to the main answer, while placing the outdated Day 1 reading (`+0.2°C`) inside a collapsible, struck-through history row.

![Experience: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-experience.png)

- **Results (n = 12):** Fault detection rose from **5/12 to 11/12** (+50 percentage points). High-confidence overtrust dropped from **5/12 to 1/12**. Median inspection time rose by **+8s** (25s to 33s).
- **What we learned:** Seven baseline users relied on the stale Day 1 value or could not tell which number governed Day 30 operations. An academic reviewer (P06) highlighted how clearly the dated card blocked stale context from leaking forward. One participant (P11) still rushed past the rule update with high confidence.
- **Actionable next step:** Add a visible `"Updated 15 days ago"` badge next to the active figure and show a one-line `"What changed"` diff when a rule is revised under new conditions.

### 4. Motivation: Premise-Neutral Evidence Check Banner

- **Problem framing:** When a user nudges a chatbot toward a conclusion they want (*"Our pilot clearly proved Feature X lifts conversion. Draft a confident board blurb"*), conventional chatbots mirror the user's framing and write a flattering, inaccurate summary.
- **Research question:** If the chatbot separates the user's requested framing from logged experiment data, will practitioners reject sycophantic drafts?
- **The intervention:** The bubble opens with a **Premise-Evidence Mismatch** warning tied to `A/B Registry #804 (-0.2%, p = 0.81)`, politely declines to confirm the false claim, and offers an evidence-aligned board draft the user can actually send.

![Motivation: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-motivation.png)

- **Results (n = 12):** Fault detection rose from **4/12 to 10/12** (+50 percentage points). High-confidence overtrust dropped from **6/12 to 0/12**. Median inspection time rose by **+7s** (22s to 29s).
- **What we learned:** Eight of 12 participants accepted the sycophantic board blurb in the baseline. An ML eval engineer (P03) noted that without seeing the evidence separated from the user's prompt, agreeable framing is very easy to miss. However, one participant (P04) regressed by misreading the denser evidence layout.
- **Actionable next step:** Keep the mismatch banner to two short lines (User claim vs. Logged result) and hide deeper statistical breakdowns behind an expandable toggle to prevent slip errors.

### 5. Causality: Underdetermination Hold & Competing Paths Card

- **Problem framing:** When data shows a strong correlation (`r = +0.74` between ICU alerts and mortality), a normal chatbot jumps straight to a causal recommendation (*"Yes, muting alerts will save lives"*), ignoring hidden confounders like patient severity.
- **Research question:** Does holding the recommendation open and showing two competing explanations side by side stop users from acting on raw correlation?
- **The intervention:** The chatbot places an **Underdetermination Hold** on the advice, displays **Model A (Direct)** beside **Model B (Confounded)** inside the bubble, and names the exact test needed to tell them apart (stratifying by APACHE-II acuity or running a randomized trial).

![Causality: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-causality.png)

- **Results (n = 12):** Fault detection rose from **4/12 to 10/12** (+50 percentage points). High-confidence overtrust dropped from **6/12 to 2/12**. Median inspection time rose by **+12s** (26s to 38s).
- **What we learned:** While a biostatistics lecturer (P09) caught the acuity confounder immediately, this was the slowest pattern (+12s) and left two high-confidence errors among non-technical users (P08 and P11). P08 reported that the causal fork felt visually dense and confusing on the first pass.
- **Actionable next step:** Replace technical notation like `P(Y|do(X))` and `do(Mute)` with plain-English labels (`"What happens if we mute alerts?"`) and add a one-sentence legend explaining why correlation does not prove cause.

### 6. Metacognition: Tri-Modal Action Router (Answer / Seek / Abstain)

- **Problem framing:** Most chatbots only know how to answer or give a vague refusal. On unfamiliar edge cases (like pediatric dosing for a rare genetic metabolizer), forced answering produces confident, unsafe guesses.
- **Research question:** Does giving the chatbot an explicit middle path to *Seek Evidence* or *Abstain* stop users from accepting unsafe edge-case answers?
- **The intervention:** Instead of guessing a dose, the chatbot flags an out-of-distribution pediatric shift, withholds a direct answer, and presents a one-click **Run CPIC Formulary Lookup** action alongside **Abstain & Escalate to Pharmacist**.

![Metacognition: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-metacognition.png)

- **Results (n = 12):** Fault detection rose from **4/12 to 11/12** (+58 percentage points). High-confidence overtrust dropped from **6/12 to 0/12**. Median inspection time rose by **+8s** (21s to 29s).
- **What we learned:** Eight baseline users accepted an unsafe 20 mg pediatric dose written in confident prose. A pediatric pharmacist (P07) noted that placing a concrete lookup button next to abstention made the safe clinical path obvious. One operations lead (P10) hesitated between *Seek Evidence* and *Abstain* because the difference between the two buttons was not immediately clear.
- **Actionable next step:** Rewrite button labels around the exact user outcome (for example, `"Check CPIC dosing table"` vs. `"Stop and hand off to pharmacist"`) rather than abstract mode names.

### 7. Value: Standard Charter & Inline Contestability Action

- **Problem framing:** When an AI explains a high-stakes decision with an opaque score (`Score 0.43 < 0.50`), it hides policy choices behind fake objectivity and leaves affected people with no clear way to appeal.
- **Research question:** Does naming the governing rule, the policy trade-off, and a real human reviewer help people understand and challenge automated denials?
- **The intervention:** The reply opens with a **Standard Charter** pill (`POL-2026-4B`), explains who set the rule and how the weight boundary works (40% vs. 55% hardship equity), names the exception authority (`M. Alvarez, Case Officer`), and provides an inline **File Hardship Challenge** button.

![Value: Conventional Fluent Chatbot vs. Epistemic-Scaffolded Chatbot with annotations](/images/cases/epistemia-ux-chatbot-value.png)

- **Results (n = 12):** Fault detection rose from **4/12 to 10/12** (+50 percentage points). High-confidence overtrust dropped from **6/12 to 0/12**. Median inspection time rose by **+8s** (25s to 33s).
- **What we learned:** Eight baseline users treated the 0.43 score as a fixed fact and could not find how to appeal. A policy analyst (P02) and civic data auditor (P12) noted that naming the rule and exception owner is the minimum bar for public accountability. One participant (P05) regressed by skipping the final challenge confirmation step.
- **Actionable next step:** Show a persistent confirmation receipt directly inside the chat thread after a challenge is filed (case ID, attached documents, and response SLA) so users never miss the final step.

## Overall takeaways & next steps

- **Smooth UX can be dangerous when accuracy is hidden:** A 73.5 SUS score showed the conventional chatbot felt effortless to use, yet participants still missed 63% of errors with high confidence. Good Human-AI UX cannot optimize for reading speed alone.
- **Small, targeted cues inside the chat bubble work:** Users did not need a separate dashboard to catch errors. Inline status pills, bound evidence slots, one-tap disambiguators, and named appeal actions cut overtrust from 48% to 4% while lifting SUS to 79.6.
- **Next iteration priorities:**
  1. **Simplify Causality for non-specialists:** Swap formal causal notation for plain-English action prompts and a one-line legend.
  2. **Sharpen action copy on Metacognition:** Replace abstract labels (*Seek Evidence* vs. *Abstain*) with concrete next steps.
  3. **Use progressive disclosure on dense cards:** Keep the top-level chat bubble scannable and tuck detailed breakdowns behind toggles to eliminate the 2/84 slip-error regressions.
