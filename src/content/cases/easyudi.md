---
title: "EasyUDI"
subtitle: "Turning fragmented medical-device data into regulatory-ready records"
order: 5
featured: true
coverImage: "/images/cases/easyudi-1.png"
coverAlt: "EasyUDI regulatory workflow preview"
role: "Product Designer"
scope: "Product framing · Information architecture · Interaction design · Workflow design · Document intelligence · Validation UX"
timeline: "2025–2026"
team: "Product Managers · Engineers · Regulatory / Quality stakeholders"
prevSlug: "tablox"
nextSlug: "alpaca-ds"
---

## Context

EasyUDI is a regulatory workflow product for medical-device manufacturers. Its purpose is to turn fragmented compliance work—UDI management, regulatory-document preparation, validation, and EUDAMED submission—into one auditable flow.

This case study focuses on the product-design challenge: helping Regulatory and Quality teams move from incomplete source material to a validated, submission-ready device record without losing context or trust.

![EasyUDI three-level information architecture concept](/images/cases/easyudi-2.png)

*Concept view: a three-level information architecture—Basic UDI-DI, device group, and individual device—keeps regulatory hierarchy visible while preserving a focused workspace.*

## The challenge

Manufacturers often manage critical information across spreadsheets, ERP systems, eQMS tools, labeling systems, regulatory portals, and local documents. The result is duplicated entry, inconsistent identifiers, and uncertainty about which version is authoritative.

The design problem was therefore larger than “make EUDAMED submission easier.” EasyUDI needed to act as a single source of truth across design, production, labeling, and regulation, while making complex regulatory dependencies understandable to users who are accountable for accuracy.

**Key tensions:**

- Regulatory workflows are sequential, but users often discover missing information out of order.
- UDI-DI data is structured and rule-bound, but source documents are inconsistent and unstructured.
- Validation must be strict enough to prevent submission errors without becoming a black box.
- Traceability is essential, but exposing every possible field and identifier would overwhelm the main workflow.

## Users and needs

- **Primary user: Regulatory Manager**: Needs a clear path to completion, confidence that records are correct, and evidence of what changed, by whom, and when.
- **Secondary user: Admin / Owner**: Needs permissioned control over overrides and final submission, plus visibility into workflow status and unresolved blockers.

### Core user needs

- Understand what is missing and why it matters.
- Complete work incrementally and resume later.
- Fix errors in context rather than searching across disconnected screens.
- Distinguish blocking issues from recommendations.
- Trust that uploaded documents and generated values remain traceable.

## Design strategy

The product direction centered on three principles:

### 1. Guide the work, don’t just display the data

A contextual wizard in the left rail turns a complex submission into a finite sequence of tasks. Each step communicates progress, approximate effort, completion state, and the next recommended action.

The proposed flow is:

1. Start / Summary
2. Add or link the Basic UDI-DI
3. Add Devices / UDI-DIs
4. Set EMDN codes and product category
5. Complete package and risk-class information
6. Validate
7. Review and confirm
8. Submit to EUDAMED

Users can save drafts, resume later, and revisit completed steps. Final submission remains blocked until required validations pass.

![EasyUDI contextual wizard concept](/images/cases/easyudi-3.png)

*Wizard concept: progressive disclosure turns a high-stakes submission into a sequence of bounded decisions, with validation and recovery built into the flow.*

### 2. Make validation actionable

Validation is presented as a prioritized list rather than a generic pass/fail state:

- `BLOCKER`: must be fixed before completion or submission.
- `WARNING`: recommended correction or review.
- `INFO`: contextual guidance.

Each issue includes a direct fix link to the relevant device or group. Non-controversial suggestions, such as EMDN recommendations, can be applied selectively rather than silently changing user data.

![EasyUDI actionable validation view](/images/cases/easyudi-4.png)

### 3. Preserve a defensible audit trail

The workflow treats each Basic UDI-DI as a stateful instance. Step states move through a controlled lifecycle, from `NOT_STARTED` and `IN_PROGRESS` to `COMPLETED`, `VALIDATED`, `SUBMITTED`, and ultimately `ACCEPTED` or `REJECTED`.

Every transition records the actor, timestamp, previous state, new state, and action. The server is authoritative; the interface mirrors state and requests transitions.

## Document intelligence as a foundation

A submission-ready workflow cannot rely on manual re-entry alone. EasyUDI’s document-parsing concept uses regulatory documents as evidence for structured records.

Relevant sources include:

- **Declaration of Conformity** → manufacturer, representative, device, and Basic UDI-DI data.
- **CE / Notified Body Certificate** → certificate, notified body, scope, and expiry data.
- **Technical File** → device family, Basic UDI-DI, classification, intended purpose, and taxonomy data.
- **SSCP** → device and clinical-summary data.
- **PMS / vigilance reports** → monitoring and corrective-action data.

The design requirement is not full automation at any cost. It is traceable automation: every extracted value should map back to a source document, uncertain values should require human validation, and missing or conflicting information should be surfaced before XML generation.

A validation-status dashboard and an audit trail make the automation inspectable rather than magical.

![EasyUDI upload and parsing pipeline concept](/images/cases/easyudi-5.png)

*Upload and parsing concept: the interface makes the system’s internal pipeline legible—uploaded, parsed, organized, and structured—so automation can be reviewed rather than merely trusted.*

## Information architecture and search

The product distinguishes three levels of identity:

- **Basic UDI-DI** — family-level grouping.
- **UDI-DI** — specific device model or version.
- **UDI-PI** — lot, batch, or serial-level traceability.

The primary interface should optimize for Basic UDI-DI and UDI-DI because those support regulatory reporting and device-level compliance. UDI-PI is a different search problem focused on logistics, expiry, recall, and post-market traceability.

For the initial regulatory product, the recommended approach is to keep UDI-PI out of global search and expose it only as an optional drill-down from a device. This preserves a clean compliance workflow while leaving room for an enterprise traceability expansion.

![EasyUDI information architecture and search](/images/cases/easyudi-6.png)

## Key interaction decisions

- **Progressive disclosure**: Show the minimum information needed for the current step, then provide links to deeper device and group details. This keeps the wizard focused without hiding the underlying record.
- **Persistent progress**: Use a progress indicator, completion timestamps, and resumable drafts so users always know where they are and what remains.
- **Inline recovery**: Validation errors should link directly to the object that needs correction. Users should not need to remember an error code or navigate back through the information architecture.
- **Configurable workflow**: Steps, order, requiredness, and validators should be driven by a configurable definition rather than hard-coded in the UI. Regulatory requirements and product scope will evolve; the workflow should adapt without a redeploy.

![EasyUDI workflow and validation details](/images/cases/easyudi-7.png)

## Success measures

The proposed design defined measurable outcomes rather than relying on subjective satisfaction:

- Reduce EUDAMED submission error rate by at least 75% from baseline.
- Reduce time to ready a Basic UDI-DI by at least 50%.
- Achieve more than 90% first-time validation success for wizard-completed items.
- Maintain a clear audit trail for every change.

Product telemetry should track wizard starts, step completion, abandonment, validation failures, submission attempts, and submission outcomes. These signals can identify the highest-friction steps and the most common blocker types.

## Risks and trade-offs

- **Automation vs. control**: auto-population accelerates work, but uncertain extractions must remain reviewable.
- **Completeness vs. simplicity**: the system must capture regulatory detail without presenting every field at once.
- **Flexibility vs. consistency**: configurable steps support change, but state transitions and validation rules must remain governed.
- **Regulatory scope vs. platform ambition**: global UDI-PI search would support traceability, but it would also add indexing, data-volume, and workflow complexity.
- **Submission visibility**: EUDAMED rejection codes need a clear mapping to user-facing fixes.

## Outcome

EasyUDI’s design direction reframes compliance from a form-filling exercise into a guided, evidence-backed workflow. The combination of a stateful wizard, actionable validation, document-to-schema mapping, and auditable transitions gives users both speed and confidence.

The central design lesson is that trust is a product feature. In a regulated environment, a fast workflow is only successful when users can understand what the system knows, what it inferred, what still needs attention, and how every submitted value can be justified.
