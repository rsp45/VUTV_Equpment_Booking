# VUTV Equipment Booking — End Term Step-by-Step Plan

**Student:** Rudra Patel  
**Course:** STET301 · Human–Computer Interaction  
**Project:** VUTV Equipment Booking  
**Recommended tool:** Figma + Maze + Google Sheets/Excel + Canva/Figma for presentation + Behance for publication

## Executive recommendation

**Yes, use Maze for this End Term.** It is a good fit because the current work already has an interactive Figma prototype, and Maze can import Figma prototypes, run task-based tests, and generate completion rates, misclick data, task duration, paths, heatmaps, and shareable reports [1][2]. Maze also allows you to invite your own participants through a direct link without using panel credits [3].

However, do not rely on Maze alone. The assignment asks you to document **common failures, friction points, broken heuristics, and system behaviour under unpredictable human behaviour**. Maze is excellent for structured, unmoderated evidence, but it may not explain why a participant hesitated or misunderstood something. The recommended method is therefore:

> **Maze for measurable task performance + a short moderated debrief for explanation + a peer-benchmarking discussion for comparison.**

Use your own VUTV/student participants rather than paying for Maze’s external panel. The assignment requires real users in the project context, and five classmates or student producers can be more relevant than generic panel respondents. Maze’s panel is optional and credit-based; confirm the current plan limits and study quota inside your account before launch because the pricing page is dynamic [3].

## End Term success criteria

By the end of the project, you should have:

| Requirement | Evidence to submit |
|---|---|
| Five real-user tests | Participant codes, profile summary, task results, screenshots/exported Maze report |
| Usability analysis | Success rate, misclicks, time, backtracks, quotes, friction points, heuristic mapping |
| Peer benchmarking | Notes from at least three peers, including one similar-domain project, plus a comparison matrix |
| Revised design | Before/after screens showing what changed and why |
| Five-minute presentation | A concise slide deck with a timed narrative |
| Behance case study | Complete UX journey from problem to evidence-based iteration |

## Phase 1 — Freeze the baseline before testing

### Step 1: Define the baseline prototype

Duplicate the current Figma file and name the copies clearly:

- `VUTV_EndTerm_Baseline`
- `VUTV_EndTerm_Iteration_01`
- `VUTV_EndTerm_Final`

Do not change the baseline after the first participant starts. The baseline should contain the current eight-screen flow:

1. Home
2. Equipment Browse
3. Equipment Detail
4. Select Date & Time
5. Confirm Booking
6. Booking Success
7. Loading State
8. Booking Conflict

The purpose of the baseline is to prove what was tested before making improvements.

### Step 2: Confirm the prototype is testable

Before importing into Maze, check every interaction in Figma using Present mode. Confirm that buttons, back navigation, date selection, confirmation, success, loading, and conflict recovery all lead to a visible state. Add realistic but fictional equipment names and dates. Avoid using real personal data or real reservations.

Create one short prototype path for each task. If a task requires a state that the current prototype does not contain, label it as a **future test opportunity** rather than pretending that it was tested.

### Step 3: Define the research questions

Use these questions as the foundation of the study:

1. Can users find a specific piece of equipment and understand its availability?
2. Do users distinguish equipment availability from equipment readiness?
3. Can users review the critical booking information before confirming?
4. Can users recover from a booking conflict without restarting?
5. Do users understand how to verify that their booking is complete?

## Phase 2 — Prepare the user test

### Step 4: Recruit five appropriate participants

Recruit at least five real users. The preferred sample is:

- Three students who produce videos, podcasts, events, or media projects.
- Two students who have used or may use shared university equipment/resources.

Record only the information relevant to the study: participant code, general role, prior booking experience, and whether they are familiar with VUTV. Use `P01`–`P05`, not names, in the report unless explicit permission is provided.

### Step 5: Prepare participant consent and introduction

Use a short introduction before the Maze link or recording begins:

> “This study evaluates the VUTV Equipment Booking prototype, not your ability. Please complete each task as naturally as possible. If something is unclear, tell us what you expected to happen. Do not enter real personal information. Your responses will be recorded using a participant code and used only for this HCI assignment.”

If screen recording or audio is used, obtain permission first. If permission is not given, collect Maze metrics and written comments only.

### Step 6: Create the Maze study

In Maze:

1. Create a new prototype test.
2. Import the Figma prototype using the Figma integration [1].
3. Verify that the imported interactions work on the intended device size.
4. Add a clear study title: `VUTV Equipment Booking — End Term Usability Test`.
5. Add a short welcome message explaining the study.
6. Add the tasks below as separate missions.
7. Add a 1–5 confidence question after the most important tasks.
8. Add one final open-ended question.
9. Run the study yourself before sending the link.

Maze supports interactive Figma components and reports with usability metrics, paths, heatmaps, and related analytics [1][2]. Treat those automated metrics as evidence about behaviour, not as a replacement for interpretation.

### Step 7: Add the test missions

| Mission | Participant instruction | Data to capture |
|---|---|---|
| M1 — Find equipment | “You are planning a podcast next week. Find a camera that is available on the required day.” | First click, completion, misclicks, path, time |
| M2 — Check readiness | “Before your crew arrives, check whether the selected camera is ready to use.” | Whether availability and readiness are understood |
| M3 — Make a booking | “Reserve the camera for the selected date and time.” | Completion, date/time mistakes, hesitation |
| M4 — Review before confirming | “Review the booking details and identify anything important before confirmation.” | Recognition of equipment, date, time, and status |
| M5 — Recover from conflict | “The selected slot has just been booked by another student. Choose what you would do next.” | Recovery path, abandonment, use of alternatives |
| M6 — Verify booking | “After booking, show where you would check that your reservation exists.” | Trust and post-booking findability |

If the current prototype does not support M6, do not force a false result. Either add a small “My bookings” state in the iteration prototype or report M6 as an unmet opportunity for future work.

### Step 8: Add post-task questions

After M3 and M5, ask:

- “How confident are you that the booking is correct?” — 1 to 5.
- “What, if anything, made you hesitate?” — open text.

At the end, ask:

- “What is the one thing you would improve in this booking experience?”

Keep the study short enough that participants complete it attentively. A 10–15-minute test is suitable for this assignment.

## Phase 3 — Pilot and launch

### Step 9: Run a pilot with one person

Test the Maze link with one person who is not part of the final five participants. Check:

- All missions open at the correct screen.
- Maze records clicks and completion correctly.
- The wording does not reveal the answer.
- The prototype does not depend on the moderator explaining labels.
- The study can be completed on a phone or laptop, depending on the chosen device.

Fix only technical problems before launch. Do not alter the design to remove a genuine usability problem discovered in the pilot without documenting the change.

### Step 10: Launch to five participants

Send the direct Maze link individually rather than posting it publicly. This lets you track participant codes and context. Maze states that direct-link recruitment of your own participants does not use panel credits [3]. Ask each participant to complete the test independently. For a stronger qualitative layer, schedule a five-minute follow-up conversation after each test.

Do not use Maze’s paid panel unless your own recruitment fails or you specifically need a different audience. A generic panel is less relevant to the VUTV context and may add unnecessary cost.

## Phase 4 — Analyze the results

### Step 11: Export and preserve raw evidence

When all five participants finish:

1. Export or screenshot the Maze report.
2. Save the raw results separately from your interpretation.
3. Label files with the date and study version.
4. Keep a copy of the Figma baseline.
5. Store participant notes in a structured spreadsheet.

Do not edit raw values after export. If you correct a transcription error, preserve the original and record the correction.

### Step 12: Build the results table

Use one row per participant and one column per mission.

| Participant | M1 | M2 | M3 | M4 | M5 | M6 | Critical error | Confidence | Key observation |
|---|---|---|---|---|---|---|---|---:|---|
| P01 |  |  |  |  |  |  |  |  |  |
| P02 |  |  |  |  |  |  |  |  |  |
| P03 |  |  |  |  |  |  |  |  |  |
| P04 |  |  |  |  |  |  |  |  |  |
| P05 |  |  |  |  |  |  |  |  |  |

Use these categories consistently:

- **Success:** completed independently.
- **Assisted success:** completed after a neutral prompt.
- **Failure:** abandoned or could not complete.
- **Critical error:** wrong equipment, wrong date/time, premature confirmation, or inability to recover from conflict.

### Step 13: Identify patterns, not isolated mistakes

A single misclick is an observation. A repeated wrong first click, repeated hesitation, or repeated misunderstanding is a pattern. Prioritise issues that are:

1. Repeated by at least two participants.
2. Connected to a real booking risk.
3. Related to a core journey step.
4. Explainable through a recognised heuristic.
5. Fixable within the prototype scope.

### Step 14: Map findings to heuristics

Create a table like this using actual evidence:

| Finding | Evidence | Friction point | Nielsen heuristic | Severity | Proposed fix |
|---|---|---|---|---|---|
| Example only — replace with actual result | 3/5 users looked under the wrong label | Entry-point ambiguity | Recognition rather than recall | High | Rename or provide dual entry |
| Example only — replace with actual result |  |  |  |  |  |

Use severity levels:

- **High:** could cause a wrong booking, abandonment, or failed shoot.
- **Medium:** causes hesitation, backtracking, or unnecessary effort.
- **Low:** cosmetic or minor comprehension issue.

Do not write example numbers as final findings. Replace every example with the actual Maze result.

## Phase 5 — Peer benchmarking

### Step 15: Select three peer projects

Meet at least three students. Include one project with a comparable coordination, administration, request, complaint, booking, or shared-resource problem. Ask for permission before taking screenshots of peer work.

### Step 16: Use the same discussion guide

Ask each peer:

1. What is the main user goal?
2. What is the first decision the user makes?
3. How is the Information Architecture organised?
4. Why did you choose these labels and categories?
5. How does the design handle failure or changing conditions?
6. What evidence informed the structure?
7. What did you learn from testing?
8. What would you change now?

### Step 17: Create the benchmark matrix

| Project | Domain | Primary entry point | IA logic | Failure recovery | Research evidence | Learning for VUTV |
|---|---|---|---|---|---|---|
| VUTV | Equipment booking |  |  |  |  |  |
| Peer 1 |  |  |  |  |  |  |
| Peer 2 |  |  |  |  |  |  |
| Peer 3 |  |  |  |  |  |  |

The goal is not to declare a winner. Explain why each structure fits its problem and identify which principle can transfer to VUTV.

## Phase 6 — Ideate and iterate

### Step 18: Generate three possible improvements

Use the research evidence to compare:

- **Equipment-first:** start with categories and show availability on the detail page.
- **Calendar-first:** start with the shared schedule and filter by equipment.
- **Dual-entry:** offer “Find equipment” and “Find a time” as two task-based starting points.

For every concept, explain the benefit, risk, and evidence it addresses.

### Step 19: Select the direction with a decision matrix

Score each concept from 1 to 5.

| Criterion | Weight | Equipment-first | Calendar-first | Dual-entry |
|---|---:|---:|---:|---:|
| Prevents booking conflicts | 30% |  |  |  |
| Makes readiness understandable | 25% |  |  |  |
| Supports conflict recovery | 20% |  |  |  |
| Easy for first-time users | 15% |  |  |  |
| Feasible for the assignment | 10% |  |  |  |
| **Weighted total** | **100%** |  |  |  |

Select the highest-scoring option, but explain any important trade-off. Do not choose a concept because it has more screens.

### Step 20: Build the iteration prototype

Update only the screens connected to validated issues. The likely high-value additions are:

1. A clearer entry point for equipment versus time-first planning.
2. Separate availability and readiness signals.
3. A confirmation summary showing equipment, date, time, and status.
4. A conflict state that preserves selections and offers alternative time/equipment.
5. A post-booking record if M6 revealed uncertainty.

Label the revised flow as an iteration. Keep the baseline visible for before/after comparison.

## Phase 7 — Prepare the 5-minute presentation

Use no more than 8–10 slides.

| Time | Slide | Content |
|---:|---|---|
| 0:00–0:30 | 1. Problem | Invisible email reservations and late equipment clashes |
| 0:30–0:55 | 2. Baseline | Existing prototype and the “certainty before commitment” principle |
| 0:55–1:20 | 3. Method | Five participants, Maze, tasks, and peer benchmark method |
| 1:20–2:30 | 4. Findings | Three strongest user-testing patterns with actual evidence |
| 2:30–3:10 | 5. Heuristics | Broken heuristics and friction-point analysis |
| 3:10–3:50 | 6. Peer comparison | Three peers and the most useful structural learning |
| 3:50–4:35 | 7. Iteration | Before/after screens and evidence behind each change |
| 4:35–5:00 | 8. Reflection | What improved, what remains uncertain, and Behance link |

Practice with a timer. Do not spend the first four minutes explaining the original research and rush the End Term evidence. The strongest story is **baseline → test → failure → decision → iteration**.

## Phase 8 — Build the Behance case study

Organise the case study as a visual narrative:

1. Cover and one-sentence outcome.
2. Context: VUTV, shared equipment, invisible reservations.
3. Original research and problem definition.
4. Existing IA, card sort, tree test, and prioritisation.
5. Interactive prototype and heuristic fixes.
6. End Term research questions and test method.
7. Maze task setup and participant profile.
8. Results dashboard and usability findings.
9. Heuristic analysis and friction points.
10. Peer benchmarking matrix.
11. Ideation alternatives and decision matrix.
12. Before/after iteration.
13. Reflection, limitations, and next steps.
14. Prototype and source links.

Every major section should answer: **What did we observe? What did it mean? What changed?**

## Phase 9 — Final quality check

Before submission, confirm:

- At least five real users completed the test.
- The Maze study link/report matches the prototype version described.
- All numbers are calculated from actual results.
- Every reported heuristic failure has a concrete observation.
- At least three peers were consulted, including one similar-domain project.
- Peer insights are documented respectfully and accurately.
- The presentation is five minutes or less.
- The Behance case study includes the complete process, not only final UI screens.
- Participant names, recordings, and screenshots are used only with permission.
- Hypotheses, results, and future work are clearly separated.
- The final Figma prototype, Maze report, slide deck, and Behance URL are all accessible.

## Recommended tool stack

| Need | Recommended tool | Reason |
|---|---|---|
| Prototype | Figma | Existing prototype and easy iteration |
| Unmoderated usability test | Maze | Figma import, task missions, metrics, heatmaps, reports |
| Qualitative follow-up | Short moderated interview or Google Meet | Explains hesitation and unexpected behaviour |
| Results table | Google Sheets or Excel | Simple coding and calculation |
| Presentation | Figma Slides, Canva, or HTML slide workflow | Fast visual storytelling |
| Publication | Behance | Required case-study destination |
| Backup evidence | PDF exports and screenshots | Protects against link or access problems |

## Sources

[1]: https://maze.co/integrations/figma/ "Maze Figma integration"

[2]: https://maze.co/features/prototype-testing/ "Maze prototype testing"

[3]: https://maze.co/features/research-panel/ "Maze participant recruitment and direct-link testing"

[4]: https://maze.co/pricing/ "Maze pricing and plan comparison"
