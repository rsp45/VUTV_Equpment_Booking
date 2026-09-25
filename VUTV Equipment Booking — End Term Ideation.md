# VUTV Equipment Booking — End Term Ideation

**Student:** Rudra Patel  
**Course:** STET301 · Human–Computer Interaction  
**Assessment direction:** Usability testing, peer benchmarking, 5-minute presentation, and Behance case study

## 1. What the End Term is asking us to do

The End Term is the **validation stage** of the VUTV project. Ideation here means generating evidence-based improvements to the existing interactive prototype, not inventing an unrelated product. The process must connect the current design decisions to observed user behaviour and then show how the design changes in response.

> **Usability testing** observes whether representative users can complete realistic tasks with the prototype. **Peer benchmarking** compares the structure and reasoning of this solution with comparable student projects. **Iteration** converts the evidence into a revised design direction.

The current VUTV prototype already covers the core booking journey: browse equipment, view details, select a date and time, confirm a booking, and receive a success state. It also includes a loading state and a booking-conflict recovery state. The End Term opportunity is therefore to stress-test whether users understand the system, trust its availability information, and recover successfully when conditions change.

## 2. Design opportunity

The research and prototype identify one central design principle:

> **Make certainty available before commitment.**

The existing system is designed to replace invisible email reservations with a shared, conflict-aware schedule. The End Term should test whether that promise is actually experienced by users. In particular, the study should investigate three moments where certainty may still break down: finding the correct equipment, understanding whether it is truly ready, and recovering when the selected slot becomes unavailable.

### Refined End Term problem statement

**VUTV producers need to reserve equipment with confidence before assembling a crew, but a booking flow can still fail if availability, readiness, and conflict recovery are not understood at the moment of decision.**

### Refined “How might we?” question

**How might we help student producers choose equipment, verify its readiness, and recover from a live scheduling conflict without losing trust or restarting the booking journey?**

## 3. Ideation themes

| Theme | User risk to investigate | Design idea to test | Evidence of success |
|---|---|---|---|
| Findability | A user may not know whether to start from Equipment or Schedule & Availability. | Make the entry points explicit: browse equipment for a specific item, or view the shared schedule for a time-first plan. | Users choose the correct starting point without backtracking. |
| Availability confidence | A user may interpret “available” as “ready to use.” | Show availability and readiness as separate, visible signals: booked status, battery level, condition, and last checked time. | Users can explain whether the item is both free and shoot-ready. |
| Booking comprehension | A user may miss important information before confirmation. | Use a confirmation summary with equipment, date, time, readiness, pickup step, and conflict-check status. | Users detect a deliberately introduced mistake before confirming. |
| Conflict recovery | A live clash may make users feel trapped or force them to restart. | Preserve all non-conflicting selections and offer alternative time, alternative equipment, or return-to-calendar actions. | Users recover from a conflict without restarting the entire flow. |
| Trust and ownership | Users may still rely on an administrator to know whether a booking is valid. | Add a clear booking reference, status label, and “My bookings” record after success. | Users know where to verify their booking later. |

## 4. Recommended concept direction

### Concept: **VUTV ReadyReserve**

ReadyReserve is a focused extension of the existing VUTV booking portal. It does not add feature inflation; it makes the four existing MVP capabilities more testable and trustworthy.

1. **Equipment directory:** Browse by equipment type and inspect essential details.
2. **Shared availability:** See open and booked time slots before making a commitment.
3. **Readiness signal:** Distinguish “available” from “ready,” using battery/condition information and a last-checked indicator.
4. **Resilient booking:** Confirm with a compact summary, then recover through alternatives if a slot is taken.

The strongest prototype iteration should add only the minimum screens needed to test these decisions: an improved equipment card, a clearer detail state, a booking summary with readiness information, and a conflict-recovery branch with preserved selections.

## 5. Usability-testing plan

### Participants

Recruit at least **five real users** who regularly plan student work, shoots, events, or shared-resource activities. The recommended mix is three producers or media users and two students who have experience booking shared university resources. Record participant code, relevant experience, and whether they have used the previous email-based VUTV process. Do not record unnecessary personal information.

### Test format

Run a moderated, task-based test of approximately 12–15 minutes per participant. Begin with a short introduction, explain that the prototype—not the participant—is being tested, and ask the participant to think aloud. Do not teach the interface during the task. Ask neutral follow-up questions such as “What would you expect to happen next?”

### Test tasks

| Task | Scenario | Primary observation |
|---|---|---|
| T1 | You are planning a podcast next week. Find a camera that is free on the required day. | Entry-point clarity and availability findability |
| T2 | Check whether the selected camera is ready to use before your crew arrives. | Difference between availability and readiness |
| T3 | Reserve the camera for a selected date and time. | Date/time selection and booking comprehension |
| T4 | Review the final booking before confirming it. | Error prevention and visibility of important details |
| T5 | Imagine another student has just taken the selected slot. Recover and choose another option. | Conflict recovery, user control, and preservation of choices |
| T6 | After booking, show where you would verify the reservation later. | Trust, system status, and booking ownership |

T6 may be used as a stretch task if the current prototype does not yet include a “My bookings” state. It is a useful ideation candidate, but it should not be presented as an existing feature until it has been designed and tested.

### Measures

| Measure | How to record it | Suggested interpretation |
|---|---|---|
| Task success | Completed independently, completed with prompt, or failed | Shows whether the flow works without explanation |
| Time on task | Start and end time for each task | Identifies unusually slow or confusing stages |
| First click | First control selected for each task | Reveals information-architecture expectations |
| Backtracks | Number of unnecessary reversals or returns | Signals uncertainty or poor labels |
| Critical errors | Wrong equipment, wrong date/time, premature confirmation, or abandonment | Indicates risk to a real booking |
| Confidence rating | 1–5 rating after each task | Measures whether users trust the result |
| Quote/evidence | Exact observed behaviour and concise participant statement | Supports the case study without inventing findings |

### Heuristics to inspect

| Heuristic | Expected test point |
|---|---|
| Visibility of system status | Loading state, live availability, booking confirmation, and conflict state |
| Match between system and real world | Labels such as “ready,” “booked,” “pickup,” and “return” |
| User control and freedom | Back navigation, preserved selections, cancellation, and conflict recovery |
| Consistency and standards | Repeated status labels, buttons, dates, and time formats |
| Error prevention | Preventing unavailable-slot confirmation and exposing readiness before commitment |
| Recognition rather than recall | Visible schedule, equipment metadata, and summary rather than memory-based steps |
| Help users recognize and recover from errors | Specific conflict language and actionable alternatives |

## 6. Hypotheses to validate

| ID | Hypothesis | Pass signal |
|---|---|---|
| H1 | Users will find a specific camera’s availability through “Schedule & Availability” or the equipment directory without guessing. | At least 4 of 5 users complete T1 independently. |
| H2 | Separating availability from readiness will prevent users from assuming that a free item is automatically ready. | At least 4 of 5 users correctly explain both signals in T2. |
| H3 | A confirmation summary will help users catch incorrect booking details before commitment. | At least 4 of 5 users review all critical details in T4. |
| H4 | A conflict state with preserved selections will reduce abandonment. | At least 4 of 5 users recover in T5 without restarting. |
| H5 | A post-booking record will increase confidence that the reservation exists. | Average confidence for T6 is at least 4/5. |

These are **targets**, not results. Replace them with actual observations after testing; never report target values as completed findings.

## 7. Likely design alternatives to compare

The ideation session should produce at least three alternatives before selecting one for the next prototype.

| Alternative | Description | Strength | Risk |
|---|---|---|---|
| A — Equipment-first | Start with equipment categories, then show availability on the detail page. | Familiar for users who know the item they need. | Slower for users who plan around a date/time first. |
| B — Calendar-first | Start with a shared calendar and filter by equipment type. | Makes conflicts visible early. | Can overwhelm users who do not know the schedule structure. |
| C — Dual entry | Offer two prominent actions: “Find equipment” and “Find a time.” | Supports both mental models and is directly testable. | Requires careful labels and may introduce a choice point. |

**Recommended direction:** prototype Alternative C, but test it against the strongest version of A or B. The peer discussion should help explain whether other students solved similar shared-resource problems with a single dominant entry point or multiple task-based entry points.

## 8. Peer benchmarking and discussion plan

Meet at least three students, including one project from a similar domain such as hostel complaints, administration, event coordination, or another booking/request system. Use the same questions with every peer so the comparison is fair.

| Discussion question | What to capture |
|---|---|
| What is the primary user goal in your project? | Whether the design is task-first, status-first, or role-first |
| What is the top-level Information Architecture? | Main categories, labels, and entry points |
| What happens when a request fails or changes? | Error prevention and recovery logic |
| Which user type did you prioritise? | Primary persona and trade-offs |
| What research evidence changed your structure? | Link between findings and IA/UI decisions |
| What would you change after testing? | Honest reflection and iteration quality |

Create a comparison matrix with one row per peer. Do not rank another student’s work as “better” in general. Instead, compare **fit to the problem**, explain why their structure may suit their users, and identify one transferable learning for VUTV.

## 9. Decision criteria for the next prototype

Select the final direction using a simple weighted decision matrix. Score each alternative from 1 (weak) to 5 (strong).

| Criterion | Weight |
|---|---:|
| Prevents booking conflicts before commitment | 30% |
| Makes equipment readiness understandable | 25% |
| Supports recovery when availability changes | 20% |
| Easy to learn for a first-time student | 15% |
| Feasible to prototype and explain in five minutes | 10% |

A concept should be selected because it addresses the core failure and can be validated, not because it contains the most screens.

## 10. 5-minute presentation ideation structure

| Time | Slide purpose | Content |
|---:|---|---|
| 0:00–0:30 | Foundation | Define usability testing, peer benchmarking, and the VUTV problem. |
| 0:30–1:00 | Baseline | Show the existing booking flow and the design principle: certainty before commitment. |
| 1:00–2:15 | User testing | Explain participants, tasks, and the most important observed failures. Use only real results once testing is complete. |
| 2:15–3:15 | Heuristic analysis | Map the failures to Nielsen heuristics and show the affected screens. |
| 3:15–4:00 | Peer benchmarking | Compare three peers’ IA/UI decisions and state what VUTV learned. |
| 4:00–4:40 | Iteration | Show the chosen design changes and why the evidence supports them. |
| 4:40–5:00 | Outcome | State what changed, what remains uncertain, and the final case-study link. |

## 11. Behance case-study structure

The Behance case study should tell a clear evidence-to-decision story. Start with the problem and context, then show the original research, existing IA, prototype, test setup, participant evidence, failure analysis, peer comparisons, iteration, and reflection. Each major design decision should answer three questions: **What did we observe? What did it mean? What did we change?**

Use annotated prototype frames rather than decorative screenshots alone. Include a compact methodology panel, participant count, task list, heuristic mapping, benchmark matrix, before/after comparisons, and a limitations note. Clearly separate **completed evidence**, **design hypotheses**, and **future work**.

## 12. Immediate next actions

1. Finalise the revised testable prototype branch using the current eight-screen flow as the baseline.
2. Add or annotate readiness information and a confirmation summary only if they are needed to test H2 and H3.
3. Recruit five participants and run the six tasks in the same order.
4. Record task success, first click, time, errors, confidence, and observed heuristic failures.
5. Meet three peers and complete the same comparison matrix.
6. Synthesize findings into three high-impact changes, then update the prototype.
7. Build the 5-minute presentation and Behance case study from the same evidence set.

## Guardrails for credible submission

Do not fabricate participant results, peer quotes, task success rates, or Behance links. If a test is remote, record the method accurately. Use participant codes instead of names, obtain permission before sharing screenshots or recordings, and label the Head of VUTV perspective separately from production-member evidence. The End Term will be strongest when it demonstrates a traceable chain from **observed behaviour → heuristic diagnosis → design decision → revised prototype**.

## Final ideation statement

**ReadyReserve should evolve from a basic booking flow into a confidence-building workflow: users should see what is available, understand what is ready, commit with a clear summary, and recover without panic when reality changes. The End Term will validate whether the prototype truly delivers that confidence.**

## 13. Usability Testing Feedback & Implemented Changes

Based on the feedback received during usability testing, the following changes were ideated and applied to the prototype:
1. **Flexible Booking Durations:** Users requested the ability to choose custom time slots, book for multiple days, and extend booking durations. A duration selector (2 Hours, 4 Hours, Full Day, Multiple Days) has been added to the calendar view.
2. **Dashboard Experience:** A visually distinct "Dashboard Overview" grid was implemented on the Home screen to quickly display upcoming bookings, shoot-ready items, and overall availability, providing a stronger at-a-glance experience.
3. **Condition Verification on Return:** A "Add return photo" action was added to the return confirmation screen, ensuring the equipment is recorded in its original state upon return.
4. **Booking "In Use" Equipment for Later:** The flow was updated so that items currently marked as "In Use" are no longer fully locked. Users can now select them and use the "Book for later" action to reserve them for a future date.
