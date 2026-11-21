---
title: "Spean Luy"
subtitle: "Repairing Critical Friction in a Microfinance Loan Lifecycle"
order: 9
featured: false
category: "product"
tag: "Shipped Product · Fintech"
summary: "Conducted field research and end-to-end UX redesign across a Cambodian microfinance loan lifecycle, repairing critical drop-offs in account verification, Wing validation, and KYC."
coverImage: "/images/cases/spean-1.png"
coverAlt: "Yellow Flower"
role: "Lead Product Designer"
scope: "End-to-end UX research and UX Design"
timeline: "2021"
team: "Senior Designer"
youtubeId: "CQd-RHODcXg"
prevSlug: "fansfirst"
nextSlug: "labellio"
---

## Context

Spean Luy is a digital micro-loan platform in Cambodia offering fast, paperless loans.

The value proposition was simple:

- Fast approval
- No paperwork
- Mobile-first

However, users were dropping off during verification, KYC, and Wing cash-out connection.

Operationally, unreadable ID images and failed account matching were increasing support burden and slowing loan processing.

![Spean Luy mobile micro-loan overview](/images/cases/spean-2.png)

## The Problem

Data revealed systemic friction:

- 2702 inactive users who did not complete verification
- 516 unreadable ID images out of 1735 applications
- High confusion during Wing account connection
- Lack of contextual feedback during critical actions

The issue was not feature gaps. It was clarity, validation, and trust signaling across the loan lifecycle.

![Spean Luy funnel analysis](/images/cases/spean-3.png)

## Strategy

Rather than redesign the entire product, I prioritized high-impact friction points.

The approach:

- Improve system feedback loops
- Guide validation instead of reacting to errors
- Reduce ambiguity in critical financial steps
- Clarify the loan lifecycle mentally and visually

## Intervention 1, Verification Funnel Repair

### Lack of Action Feedback

Users did not know:

- When verification started
- Whether actions succeeded
- What would happen next

Introduced:

- Contextual modal prompting first-time verification
- Clear explanation of processing time
- Reinforced success states
- Guided next steps

**Impact:**
- **+61% increase in account verification rate**

Small UI adjustments significantly improved behavioral follow-through.

![Spean Luy verification funnel repair](/images/cases/spean-4.png)

## Intervention 2, Wing Account Validation Redesign

### Reactive Validation

Errors were shown after submission without guidance on how to fix them.

Redesigned connection flow:

- Displayed user’s registered name for matching clarity
- Inline validation highlighting specific mismatches
- Clear error explanation
- Technical fallback screen with recovery path
- Toast confirmation after successful connection

This shifted the experience from blind retrying to informed correction.

![Spean Luy Wing account validation redesign](/images/cases/spean-5.png)

## Intervention 3, KYC Optimization

User tested to understand unreadable ID failures and redesigned capture flow:

### High-Friction KYC Capture

The 9-step ID capture flow:

- Offered little framing guidance
- Provided no positioning feedback
- Did not support low-end device camera limitations

This created both user frustration and operational inefficiency.

I analyzed unreadable ID failures and redesigned capture flow:

- Framing box guidance
- Clear positioning instructions
- Image review screen with actionable feedback
- Structured error messaging
- Proposed computer vision for auto-detection of ID position and readability
- Focus guidance for low-end devices

**Impact:**
- **92% reduction in incorrect ID image submissions**

This reduced operational load and accelerated application processing.

![Spean Luy KYC optimization](/images/cases/spean-6.png)

## Intervention 4, Lifecycle Architecture

Mapped and clarified:

- Verification
- Application
- Approval
- Wing connection
- Cash-out
- Repayment

The goal was to shift from fragmented screens to a coherent financial journey. This improved user comprehension and reduced ambiguity around loan states.

![Spean Luy loan lifecycle architecture](/images/cases/spean-7.png)

## Reflection

This project reinforced:

- In financial products, clarity is more important than aesthetics.
- Small feedback loops can produce large behavioral changes.
- Validation design directly impacts operational cost.
- Trust signaling is critical in emerging markets with low digital literacy.

Given more time, I would:

- Implement automated KYC validation fully
- Instrument deeper funnel tracking
- Optimize repayment behavioral nudges

![Spean Luy field research and iteration](/images/cases/spean-8.png)

## UX Research & Customer feedback

To ground the work in real user behavior, I also conducted in-field interviews with small business owners, observing how they currently access loans and where they struggle. These conversations revealed key friction points around trust, unclear processes, and difficulty completing verification steps. The insights directly informed design decisions, particularly around validation, feedback, and simplifying critical flows.
