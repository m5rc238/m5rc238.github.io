# Frame

A self-paced course in problem framing for product designers.

Ten modules and a capstone contain 40 quiz items and 23 exercises. Each module includes a lesson, worked example, writing activities, example responses, and review criteria. The final capstone introduces evidence in stages and includes a six-dimension self-assessment rubric.

## Use

Serve index.html and its three sibling assets with any static web server. All links and assets use relative paths. No dependencies or build step are needed to run the course. build_content.py regenerates course-data.js from the authored curriculum.

Answers and scores are saved in localStorage in the current browser. Export a Markdown workbook before clearing site data or switching devices. Written exercise quality is self-reviewed, and course completion is not a validated competence assessment. All supplied cases are fictional.

## Publishing

The course is designed for a subdirectory of an existing GitHub Pages site. For Astro, place these static files under public/problem-framing/ so the existing build copies them to dist/problem-framing/. No root-page changes are required.

## Evidence

The course notes list ten research and practitioner references. The course combines their concepts with illustrative exercises. The complete course and scoring rubric have not been independently validated.
