---
title: "Decision Router"
subtitle: "Comparing composed LLM pipelines, typed authority boundaries, and deterministic rules under fault injection"
order: 3
featured: false
category: "ai-research"
tag: "AI Systems · Benchmark"
summary: "Evaluated five refund-handling architectures, from 10-line deterministic rules to an 8-stage typed router and ReAct, under fault injection and an audited stage-aware grader, reproducible offline with zero API keys."
repoUrl: "https://github.com/m5rc238/decision-router"
coverImage: "/images/cases/decision-router-1.png"
coverAlt: "Decision Router empirical architecture comparison interface"
role: "Systems Designer · Evaluation Engineer"
scope: "AI systems architecture · Evaluation harness · Fault injection · Grader auditing · Interactive UI"
timeline: "September–November 2026"
team: "Solo + AI-assisted development"
prevSlug: "epistemia-ux"
nextSlug: "tablox"
---

## Context

When teams deploy LLMs inside operational workflows, judgment, routing, and prose generation often collapse into a single prompt or tool loop. **Decision Router** ([GitHub repository](https://github.com/m5rc238/decision-router)) explores a narrower, testable design question:

**When should an AI refund system make a decision, escalate to a person, or stop because its inputs are unreliable?**

The repository evaluates five refund-handling designs side by side under a 30-day policy (`purchase_age_days <= refund_window_days`, active account, fewer than two prior refunds), fault injection, and a stage-aware grader (`grader-v2.0`). All benchmark tables and 20 automated tests can be reproduced offline with zero API keys from the committed replay bundle (`npm run replay`).

## Typed authority boundaries

Rather than letting an LLM inspect policy, decide an outcome, and write the reply in one opaque step, the **Decision Router** pipeline separates authority across eight explicit stages:

`user_input` → `semantic_router` (LLM) → `route_contract` → `verified_facts` → `jev_judgment` (bounded Jev API) → `decision_contract` → `response_composer` (LLM + `composerGuardV2_1`) → `user_response`

Deterministic TypeScript enforces every contract boundary and fails closed (`halt`) if downstream prose contradicts the policy decision (for example, congratulating a user on an approved refund when the decision contract recorded `deny_refund`) or if verified evidence is partial or unavailable.

## What the benchmark actually showed

Comparing the composed router against a zero-AI **Deterministic Policy Rules** baseline, **Direct-LLM (CoT)**, **Direct-LLM + Validator**, and a **ReAct** tool loop surfaced both where architectural separation helps and where simpler code wins outright:

| Architecture | Decide (Unique / Runs) | Shared faults (`n=4`) | Comp. outage (`jev-500`) | Mean latency |
| --- | --- | --- | --- | --- |
| **Deterministic Policy Rules** (`0` LLM, `0` Jev) | `13/15` (`86.7%`) | `4/4` (`100%`) | `n/a` | `<1 ms` |
| **Decision Router** (`Big Pickle + Jev`, v1 audited) | `21P / 7F / 2U` (`n=30`) | `2P / 0F / 6U` (`n=8`) | `0P / 2U` (`n=2`) | `9.9 s` |
| **Direct-LLM + Validator** (`v2.1`, Gemini / Big Pickle) | `13/15` · `65/75` (`86.7%`) | `4/4` (matched fault test) | `n/a` (excl.) | `2.0–2.2 s` |
| **Direct-LLM (CoT)** (Gemini / Big Pickle) | `13/15` · `65/75` (`86.7%`) | `0/4` (told & not-told) | `n/a` (excl.) | `1.7–2.8 s` |
| **ReAct Agent** (Gemini / Big Pickle) | `51/75` (`68%`) · `64/75` (`85%`) | `0/4` (told & not-told) | `n/a` (excl.) | `3.7 s` |

Three findings stood out after auditing the saved traces:

1. **Deterministic rules matched Direct-LLM on well-formed tickets (`13/15`, `<1 ms`, `$0`).** Using an LLM or external judge to check `200 > 30` added latency and failure modes with zero accuracy gain on rule-computable cases.
2. **Structural halting does not require an 8-stage pipeline.** `Direct-LLM + Validator` matched `Direct-LLM` accuracy (`65/75`) while catching `4/4` shared downstream faults at ~2 seconds.
3. **Where the Router helped vs. what it cost:** Explicit pre-judgment intent separation (`human_triage`) caught `ambiguous-plan` (`2/2` in v1 vs. `0/10` for Direct-LLM and Direct + Validator across repeat-5 runs), yet extra live network stages also introduced new timeouts and null-decision halts (`~9.9 s` mean latency).

![Decision Router offline-verified benchmark results matrix](/images/cases/decision-router-2.png)

*Evaluation Results page: offline-recomputed comparison matrix reflecting the corrected `grader-v2.0` audit across all five architectures.*

## Auditing the grader and validator ceiling

A central lesson in the project came from fixing the evaluation harness itself. The original `grader-v1` passed any Router error or triage whenever `request_review` was expected, silently grading a **241.5-second composer timeout** (after a wrong approval) and two **null-decision halts** with missing triage notes as successes.

Under `grader-v2.0`, those **3 passes flipped to FAIL**, **10 historical Router halt runs** were marked honestly as **unverifiable (`U`)** because v1 JSON logs omitted stage traces, and `scripts/eval.ts` was patched to stop masking upstream HTTP 429 quota errors as safe halts.

Running a 3-version audit on the deterministic validator revealed a parallel lesson about over-fitting to test fixtures:

- **`validator-v1.0-frozen`** memorized the 4 original regression fixtures (`4/4`) but missed `8/8` reworded challenge faults and false-stopped `3/4` valid inputs.
- **`validator-v2.0-structural`** caught those challenge faults (`8/8`), yet failed 3 post-v2 audit cases, including prompt injection via flat-string customer `CASE:` text.
- **`validator-v2.1-structured`** accepts structured `serviceOutputs` (closing the injection path) and validates Direct-LLM's own draft (`3/3`), while deliberately leaving `regex-stress-v1.0` at **`0/4`** (`2` missed paraphrases such as *"reversed the charge"*, `2` false-stops on long negations) to expose the structural ceiling of regex-based contradiction checks.

![Decision Router authority boundaries and ASD-STE100 evaluation report](/images/cases/decision-router-3.png)

*Authority boundary comparison and dual-format technical report (Controlled Technical English ASD-STE100 vs. Academic format) with top-level `grader-v2.0` errata notes.*

## Main limitations

The repository documents four explicit constraints on interpreting these numbers: the benchmark covers a narrow 4-field domain (20 core, 15 challenge, 8 post-v2 audit, 3 Direct-native, and 4 regex-stress scenarios); historical v1 Router runs used Big Pickle via OpenCode while baselines used Gemini flash-lite at `T = 0.7`; repeat-5 totals (`65/75`) reflect clustered repeats rather than 75 independent observations; and offline challenge sets isolate contract logic using policy-oracle decisions while live v2 Router traces remain pending.
