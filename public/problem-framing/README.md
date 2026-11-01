# Frame

A self-paced course in problem framing for product designers.

A seven-part foundations section, ten practical modules, and a capstone contain 50 quiz items and 26 exercises. The foundations introduce representation, ill structured problems, knowledge claims, causal inference, abduction, boundary critique, and bounded rationality. Each module includes a lesson, worked example, writing activities, example responses, and review criteria. The final capstone introduces evidence in stages and includes a six-dimension self-assessment rubric.

## Use

Serve index.html and its three sibling assets with any static web server. All links and assets use relative paths. No dependencies or build step are needed to run the course. build_content.py imports foundations.py and regenerates course-data.js from the authored curriculum. Run it with Python 3.

Answers and scores are saved in localStorage in the current browser. Export a Markdown workbook before clearing site data or switching devices. Written exercise quality is self-reviewed, and course completion is not a validated competence assessment. All supplied cases are fictional.

## Publishing

The course is designed for a subdirectory of an existing GitHub Pages site. For Astro, place these static files under public/problem-framing/ so the existing build copies them to dist/problem-framing/. No root-page changes are required.

## Evidence

The course notes list sixteen research and practitioner references. The course combines their concepts with illustrative exercises. The complete course and scoring rubric have not been independently validated.

Two optional videos are linked to the original Product Talk pages, with attribution, viewing tasks, and limitations. Selection was reviewed against the published script or edited transcript, rather than independently reviewed footage. The two resources are practitioner illustrations from the same creator.

The foundations use ID 0 so that existing module IDs and saved learner progress remain compatible. Foundations and the capstone require 8/10 on their knowledge checks; practical modules require 2/3.
