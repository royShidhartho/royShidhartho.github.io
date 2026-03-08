---
title: "Stabilizing small-sample electroencephalography topographies with canonical correlation analysis and consensus voting"
description: "A research update on my recent algorithmic work using canonical correlation analysis to extract stable pain-related scalp patterns from heterogeneous electroencephalography data."
pubDate: "2025-11-11"
author: "Shidhartho Roy"
image: "/images/blog/cca-placeholder.jpg"
---

Canonical correlation analysis was one of the main tools I used recently to study how multichannel electroencephalography changes across the transition from sensory detection to pain. The practical problem was not only to extract a spatial pattern from each subject, but to do so in a way that remained interpretable in a small and heterogeneous cohort.

For each subject, frequency band, and feature family, canonical correlation analysis produced a channel-weight vector that defined a linear combination of scalp channels aligned with a task contrast. In simple terms, the method identified the electrode pattern whose weighted signal tracked the hypothesized task structure most strongly. Because canonical correlation analysis solutions are sign-indeterminate, I based downstream summaries on weight magnitude rather than signed values. This avoided cancellation when averaging across repeated fits or across analytical variants.

A key step was moving from trial-level variability to a more stable subject-level representation. I averaged channel-wise magnitudes across trials within each segment, while excluding malformed vectors and treating non-finite values as missing. This produced one topographic summary per subject, segment, band, and method. I then baseline-adjusted these vectors using a resting condition so that the final contrast emphasized stimulation-related deviations rather than subject-specific background structure.

The central contrast in this work was the shift from detection-related states to pain-related states. To reduce dependence on any single quantitative sensory testing segment, I formed composite detection and composite pain conditions and then computed a pain-minus-detection topographic difference for each subject. This yielded one channel-wise vector per subject describing how the canonical correlation analysis pattern changed across the transition of interest.

The main algorithmic challenge came at the group level. In a small sample, a single feature-extraction method can produce unstable or idiosyncratic maps. To reduce this dependence, I used a two-stage consensus strategy. First, within each method, I generated a subject-consensus mask by retaining scalp regions that were repeatedly active across subjects. Second, I combined these method-level masks using majority voting across feature families. The resulting vote mask emphasized spatial regions supported across subjects and robust across analytical choices, while continuous composite maps preserved the broader magnitude structure.

This strategy is closely related to a “wisdom of crowds” idea. If each feature family is imperfect but still informative, and if their errors are not identical, then aggregation can improve stability over any single method alone. In this context, majority voting across methods acts as a robustness filter, while averaging magnitude maps reduces variance in the continuous estimate.

Two limitations remain important. First, these maps reflect linear scalp-space projections rather than cortical source activity. Second, canonical correlation analysis can become unstable when the number of observations is small relative to the number of channels or when channel features are strongly collinear. Even so, the combination of baseline-matched contrasts, magnitude-based aggregation, and cross-method voting seems promising for extracting reproducible spatial structure in rare-disease or otherwise small-sample neurophysiology studies.