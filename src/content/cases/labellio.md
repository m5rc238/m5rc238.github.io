---
title: "Labellio"
subtitle: "Restructuring ML training so domain experts could improve models independently"
order: 7
featured: false
coverImage: "/images/cases/labellio-1.png"
coverAlt: "Purple Flower"
role: "Product Designer"
scope: "Product framing · UX Design · Front-end Development"
timeline: "2016 (2 Months from Prototype to MVP)"
team: "Founders · ML engineers · Backend engineers"
prevSlug: "spean"
---

## Context

In 2015, deep learning was powerful but inaccessible. Training image classifiers required GPU infrastructure, command-line tooling, and research-level knowledge.

Most companies experimenting with computer vision struggled with dataset labeling, model iteration, and deployment, applying generic image recognition models to specialized use cases, defect detection, product classification, and niche object identification, results were inconsistent and often unusable.

What became clear was this: Generic models performed poorly in narrow domains. But custom-trained models, built on curated datasets, dramatically improved accuracy. The problem was that building those models required ML engineers and GPU infrastructure.

The challenge: simplify a highly technical workflow without misleading users about model limitations.

During close collaboration with ML engineers running early experiments and users, several patterns became clear:

- Accuracy was highly sensitive to dataset quality and labeling consistency.
- Most engineering time was spent refining data, not designing architectures.
- Iteration required script edits, retraining jobs, and log review.
- Domain experts could collect relevant datasets but couldn’t meaningfully participate in refinement.

The system optimized for model execution, not collaborative learning.

This created two structural problems:

- Slow convergence toward acceptable accuracy.
- High dependency on ML engineers for routine iteration.

![Labellio ML training interface](/images/cases/labellio-2.png)

## Framing

Initial discussions centered around simplifying the interface. But the deeper issue wasn’t surface usability. It was the shape of the training loop.

We reframed the product from:
*“How do we make deep learning easier?”*

to:
**How do we restructure the training loop so domain experts can participate in model improvement without breaking system integrity?**

## Structural Intervention

We built a system that allowed users to:

- Upload and organize image datasets
- Label images using an interactive drag-and-drop interface
- Train models on scalable multi-GPU infrastructure
- Iteratively improve accuracy through human-in-the-loop corrections

The training UI became the core innovation. Users could correct misclassified images, and the model would retrain using the refined dataset, improving performance over time.

This turned model creation into a structured feedback loop rather than a one-off engineering task.

## Decisions Under Constraint

### 1. Domain-Specific Focus Over Generic Ambition

We did not attempt to compete with broad pretrained models.

- **Trade-off**: Narrow use-case focus vs generalized AI positioning.
- **Impact**: Dramatically improved accuracy in specialized domains.

### 2. Interactive Retraining Instead of Batch Pipelines

Traditional workflows required script edits and manual relaunching.

- **Trade-off**: Higher engineering complexity vs reduced iteration latency.
- **Impact**: Faster convergence toward acceptable accuracy.

### 3. Controlled Abstraction of Infrastructure

GPU allocation and tuning remained backend-managed.

- **Trade-off**: Less configurability vs system stability and predictability.
- **Impact**: Reduced misuse while keeping training accessible.

### 4. Human-in-the-Loop Instead of Full Automation

We rejected fully automated labeling.

- **Trade-off**: Slightly slower labeling vs dataset integrity and bias control.
- **Impact**: More reliable model improvement cycles.

## Outcome

By structuring the loop, Labellio:

- Reduced time to first viable model
- Accelerated convergence toward acceptable accuracy
- Decreased routine ML engineering involvement
- Lowered cognitive overhead for domain experts
- Enabled niche use cases such as defect detection and specialized object classification

The leverage was not raw compute power. It was compressing the distance between observation, correction, and retraining.

## External Validation

Labellio received technical validation through NVIDIA coverage highlighting its scalable multi-GPU architecture.

Following its early traction and technical validation, the technology was later acquired and integrated into Kyocera Communication Systems, extending its application within enterprise contexts.
