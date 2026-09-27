# VUTV Equipment Booking
## Exhibition Version: Deep Analysis, Feedback Synthesis & Improvement Backlog

**Repository:** `rsp45/VUTV_Equpment_Booking`  
**Live build:** `https://rsp45.github.io/VUTV_Equpment_Booking/`  
**Review basis:** GitHub `main` branch reviewed on 26 September 2026 + `VUTV - Exhibition Feedbacks.xlsx`  
**Purpose:** Identify the changes that are still necessary for the exhibition build, not redesign the project from scratch.

---

## 1. Executive Summary

The current build has moved beyond a simple wireframe. It now demonstrates a complete booking concept with equipment discovery, equipment detail, scheduling, confirmation, success, My Bookings, return handling, feedback capture, conflict handling, flexible duration, and booking of equipment that is currently in use for a later time.

The exhibition feedback also shows that the **core concept is easy to understand**. Across 11 submitted feedback records, every response marked the overall ease of use as **“5 - Very Easy.”** The detailed heuristic-style feedback is also consistently positive, although navigation contains the clearest outlier: one response gave navigation a score of 1 while the other navigation scores with submitted detail were 5.

The important point is therefore not that the current build is unusable. The evidence suggests the opposite: **the concept is understood, but the product still has several workflow, information architecture, state-management, realism, and visual-polish issues that can make the exhibition version feel like a prototype rather than a convincing working product.**

The strongest next iteration should focus on:

1. Making the **booking journey deterministic and context-aware**.
2. Fixing the **schedule/calendar interaction** so date selection really changes the schedule.
3. Making **In Use** equipment behave as a first-class bookable state with a visible “Book for later” path.
4. Improving **dashboard/home utility** instead of using largely static summary numbers.
5. Strengthening **booking lifecycle management** from booking → pickup → active use → return → feedback.
6. Improving **role clarity and coordinator notification** so a real-world resource owner can act on a booking.
7. Removing demo-only inconsistencies, hard-coded values, misleading availability claims, and dead interactions.
8. Refining the visual system around the **VUTV identity** with a cleaner, more product-like interface.

---

# 2. What Was Reviewed

## 2.1 Repository structure

The repository currently contains:

- `index.html`
- `styles.css`
- `app.js`
- `assets/`
- `assets/wireframes/`
- `VUTV Equipment Booking — End Term Ideation.md`
- `test.js`
- `package.json`
- `node_modules/`

The project is a static HTML/CSS/JavaScript application. `app.js` is the primary prototype engine, with screens rendered dynamically into `#app`.

The repository also contains large `node_modules` content even though the application itself is a static front-end build. For a cleaner exhibition repository, those generated dependencies should not be committed unless there is a concrete build/test requirement for them.

---

# 3. Current Product Architecture

The current implementation uses a screen/state model roughly equivalent to:

`Home → Equipment → Detail → Calendar → Review → Success → My Bookings`

with additional states for:

`Loading`, `Conflict`, `Return Confirmation`, `Feedback`

The event model is largely driven by:

- `data-go`
- `data-tab`
- `data-calday`

The current app also maintains in-memory state for bookings and equipment.

This is a reasonable prototype architecture, but the data model is still much thinner than the UI now implies.

---

# 4. What Is Already Working

## 4.1 Strong concept coverage

The build currently communicates the intended product idea clearly:

> Shared VUTV equipment should be discoverable, schedulable, bookable, trackable, returnable, and reviewable.

That is much stronger than a simple “book equipment” demo.

## 4.2 The user can see equipment states

The current equipment data distinguishes several states:

- Available
- Ready
- Used Just Now
- Check condition
- In use until a specified time
- Needs repair

This is useful because equipment booking needs more than a simple binary Available / Unavailable model.

## 4.3 The system has real interactive search and filters

The Equipment view has actual filtering logic rather than purely visual buttons.

Current search behaviour checks:

- Equipment name
- Category

The category controls include:

- All
- Cameras
- Audio
- Lighting
- Support

This should be preserved.

## 4.4 There is a conflict state

The build includes a dedicated conflict recovery state. This is aligned with the original HCI direction of handling booking conflicts explicitly rather than pretending they cannot happen.

## 4.5 There is a booking history concept

`My Bookings` currently separates:

- Upcoming
- Past

and supports cancellation.

That establishes the basis for a real booking lifecycle.

## 4.6 Feedback was integrated into the journey

The newer build includes return and feedback states in the recorded interaction logs. This is directly relevant to the exhibition feedback that asked for a return-record mechanism.

---

# 5. Exhibition Feedback Synthesis

## 5.1 Dataset size and caveat

The uploaded exhibition workbook contains **11 submitted records**, with some duplicate participant identifiers.

All 11 submitted records selected:

**5 - Very Easy**

This is strong evidence that the prototype was generally perceived as easy to use by the people who completed this exhibition evaluation.

However, the detailed feedback is still small-sample exhibition feedback, not a statistically generalizable usability study. The findings should be presented as directional evidence.

---

## 5.2 Concrete feedback received

The workbook contains seven substantive improvement suggestions.

### Feedback A: Flexible time selection

> “the user should have the ability to choose time slots rather then just a fixed preset of time slots”

### Feedback B: Multi-day booking

> “Option to book for multiple days can be added”

### Feedback C: Booking extension

> “Requesting for extending the booking duration!”

### Feedback D: Better dashboard

> “maybe a better dashboard exp in future”

### Feedback E: Return photo / condition evidence

> “A photo adding option can be added while returning the equipment so that it stays in record that the equipment is returned in it's original state”

### Feedback F: In Use state should support future booking

> “The "In Use" status needs work even it is in use what if the user wants to book it for the future ... Need to add an option for that!!!”

### Feedback G: Book currently in-use equipment for later

> “Option to book an equipment that is currently in use for a later time”

---

## 5.3 Feedback themes

| Theme | Evidence in feedback | Required interpretation |
|---|---|---|
| Booking duration flexibility | Custom slots, multi-day booking, extension | The current fixed-slot model is too rigid for real production planning |
| Future booking | Two separate users raised booking in-use equipment for later | “In Use” should not be equivalent to “Unavailable forever” |
| Dashboard | Better dashboard requested | Home needs stronger operational utility |
| Return accountability | Return photo requested | Return should create evidence, not merely change a status |
| Current learnability | 11/11 marked Very Easy | Changes should preserve the simplicity of the current core flow |

---

# 6. What The Feedback Already Caused

The repository's own ideation document states that the prototype has already added:

1. Flexible booking duration options.
2. A Dashboard Overview grid.
3. Return photo support.
4. A “Book for later” route for equipment that is currently in use.

Therefore, these should not now be treated as missing features. They should be treated as **implemented concepts that still need to be checked for quality, consistency, and completeness**.

This distinction matters.

The feedback did not simply identify features. It identified **workflow expectations**.

For example:

- “Book for later” is not only a button.
- It requires the system to show the current use period, the earliest future availability, and the future booking window.
- A return photo is not only an upload action.
- It requires a clear place in the booking history and an understandable reason for collecting the image.
- Multi-day booking is not only a duration selector.
- It requires date-range logic and conflict handling across the entire range.

---

# 7. Highest-Priority Problems Still Present

## P0: Booking state is still too hard-coded

This is the largest technical and UX problem.

`app.js` still contains hard-coded booking content such as:

- Sony A7III Camera
- Monday, Sep 21, 2026
- 9:00–11:00 AM
- Equipment Room B
- Shelf 3
- fixed booking references

The booking confirmation action itself inserts a specific Sony booking regardless of which equipment/date/time the user selected.

That creates a mismatch:

**What the interface lets the user choose is not reliably the same thing that gets booked.**

For an exhibition demo, this is a critical credibility risk.

### Required change

Create a single `bookingDraft` object:

```js
{
  equipmentId,
  startDate,
  endDate,
  startTime,
  endTime,
  durationType,
  purpose,
  requester,
  coordinator,
  status
}
```

Every screen should read from that object.

The final confirmation should create a booking from the actual draft rather than a hard-coded record.

---

# 8. P0: Calendar Interaction Needs a Real State Model

The current calendar shows September 2026 and visually highlights a date, but the schedule below is effectively static.

The calendar code contains multiple manual empty cells and a comment that shows the layout was manually approximated.

The schedule heading also remains:

**Available slots — Mon, Sep 21**

even after interacting with the date area.

### Why this matters

The user sees a calendar that looks interactive, but the interaction does not fully behave like a calendar.

This is exactly the type of visual affordance mismatch that can reduce trust.

### Required change

Use actual JavaScript date calculations.

At minimum:

- Current visible month
- Selected date
- Previous month
- Next month
- Correct weekday offset
- Disable unavailable dates
- Show selected date in the time-slot heading
- Recompute slots for the selected date

Better:

```js
selectedDate = '2026-09-21'
selectedMonth = '2026-09'
```

and generate the calendar dynamically.

---

# 9. P0: “In Use” Must Become A Complete Future-Booking State

The exhibition feedback raised this issue twice.

The current information architecture should make a distinction between:

**In use now**

and

**Unavailable for the selected time**

A user should be able to see:

> In use until 5:00 PM

then:

> Book for later

and then:

> Next available: Today, 5:00 PM

### Required interaction

For an in-use item:

`Equipment → Detail → Book for later → Schedule future time → Review → Confirm`

Do not make the user infer that they need to open a calendar to discover this.

### Recommended wording

**In use until 5:00 PM**

**Book for later**

**Next available today at 5:00 PM**

This directly addresses the exhibition feedback without adding ambiguity.

---

# 10. P0: Flexible Booking Must Support Real Date Ranges

The repository says flexible durations were added, but the underlying prototype architecture needs to mature beyond fixed presets.

The feedback asks for:

- User-selected time
- Multi-day booking
- Booking extension

These are three variations of the same requirement:

> Users need a booking interval, not merely a predefined slot.

### Recommended model

Support:

```text
Start date
Start time
End date
End time
```

Then offer optional shortcuts:

- 2 hours
- 4 hours
- Full day
- Multiple days

The shortcut should fill the actual start/end fields rather than act as a separate booking model.

### Extension

For an existing booking:

**Extend booking**

should:

1. Show current end time.
2. Show the next available continuation window.
3. Warn about conflicts.
4. Update the booking.
5. Record the updated end time.

Do not make “extension” an isolated decorative option.

---

# 11. P1: Home / Dashboard Needs More Operational Value

One participant explicitly asked for a better dashboard.

The current Home structure is still largely a summary surface with static metrics such as:

- Available
- In Use
- Advance

A true equipment-management home should answer immediate questions:

### “What do I need to know right now?”

Recommended home sections:

### Upcoming

Show the next booking with:

- Equipment
- Date
- Time
- Status
- Pickup location
- Coordinator

### Active booking

If the user currently has equipment:

- Currently checked out
- Return due
- Extend booking
- Mark return

### Availability snapshot

Use live data from the equipment array:

- Available now
- In use
- Maintenance
- Upcoming bookings

### Quick actions

Use three operational actions:

**Find Equipment**

**Check Schedule**

**My Bookings**

This is more useful than two large equal-weight buttons plus static numbers.

---

# 12. P1: Equipment Cards Need Explicit Booking Actions

The current equipment list uses the entire row as a navigation target.

That makes the interaction less explicit.

A participant previously described needing clarity about “HOW TO BOOK,” and the exhibition evolution should continue to address this.

### Recommended row structure

```text
[image]

Sony A7III
Camera
Available • Ready

[View details] [Book]
```

For in-use gear:

```text
Aputure 120D
In use until 5:00 PM

[View details] [Book for later]
```

For repair:

```text
Zoom H6
Needs repair

[View details]
```

This reduces ambiguity about what the next action actually is.

---

# 13. P1: Equipment Detail Must Be Data-Driven

The detail screen currently presents useful information:

- Condition
- Location
- Battery
- Last checked
- Next booking

But the values are static.

The detail page should render based on the selected equipment object.

Current prototype logic visually supports multiple equipment items, but the detail implementation is heavily centered on the Sony A7III.

### Required change

When the user opens:

- Rode NTG3
- Manfrotto Tripod
- Aputure 120D
- Zoom H6

the detail page should change accordingly.

Use a single:

```js
selectedEquipmentId
```

and render the correct object.

This is especially important for the exhibition because visitors will instinctively tap different cards.

---

# 14. P1: Readiness, Availability and Condition Need Clear Hierarchy

The current design has several statuses:

- Available
- Ready
- Used Just Now
- Check condition
- In use
- Needs repair

The system should simplify the conceptual model.

### Recommended hierarchy

**Availability**
- Available
- In use until 5:00 PM
- Reserved
- Unavailable

**Readiness**
- Shoot-ready
- Needs check
- Needs repair

**Condition**
- Good
- Check required

Do not mix these into a single ambiguous status.

The strongest mental model is:

> **Can I book it?**
>  
> **Can I use it?**

Those are different questions.

---

# 15. P1: Coordinator / Equipment Owner Role Is Missing

The prior user research also suggested:

> Add the person responsible for providing equipment and notify them.

The current repository direction should make this role explicit.

For every bookable item, include:

```text
Equipment coordinator
Name
Role
Contact / notification state
```

At confirmation:

**Coordinator**

`VUTV Equipment Desk`

**Notification**

`Coordinator will be notified after confirmation.`

For a prototype, this does not need a real notification service.

A simulated notification state is sufficient:

`Notification queued`

That makes the system feel operational.

---

# 16. P1: Booking Lifecycle Should Be More Realistic

The current booking system mostly treats a booking as:

**Confirmed → Completed**

The exhibition version can become much more convincing by using:

```text
Requested
Confirmed
Ready for pickup
Checked out
In use
Return due
Returned
Feedback submitted
Cancelled
```

You do not need every state on every screen.

Show the appropriate next state based on context.

Example:

### Before pickup

**Confirmed**

`Pickup available from 1:00 PM`

### During booking

**Checked out**

`Return due at 5:00 PM`

### After return

**Returned**

`Return recorded at 5:12 PM`

This creates a stronger operational story.

---

# 17. P1: Return Flow Should Capture Evidence Properly

The exhibition feedback specifically requested a photo to prove that equipment was returned in original condition.

The prototype already added return-photo support according to the project documentation.

The next improvement is the **information architecture around it**.

### Recommended return screen

```text
Return Equipment

Sony A7III
Booking #VR-2026-0924-014

Condition
[ Good ] [ Minor issue ] [ Damage ]

Return photo
[ Add photo ]

Notes
[ Optional text field ]

[ Confirm Return ]
```

After submission:

```text
Return recorded

Photo attached
Condition: Good
Returned: 5:12 PM
```

This makes the feature meaningful rather than decorative.

---

# 18. P1: Feedback Should Be Connected To The Booking

Feedback should not feel like a separate generic form.

It should clearly reference:

- Equipment
- Booking
- User
- Return event

Example:

```text
How was your experience with
Sony A7III?

Booking #VR-2026-0924-014

Equipment condition
★★★★★

Booking experience
★★★★★

What should we improve?
[ text ]
```

This makes feedback actionable.

---

# 19. P1: Conflict Handling Needs A More Realistic Trigger

The current conflict flow is useful conceptually, but one important implementation problem remains:

The 3:00–5:00 slot is visually presented as available while its action directly routes into the conflict screen.

That is fine as a research demonstration, but it is misleading in a real product.

### Better exhibition solution

Add two modes:

### Normal state

3:00–5:00

**Available**

### Demo conflict trigger

A dedicated action:

**Simulate conflict**

or a hidden exhibition/demo control.

Then the conflict genuinely happens because state changes, rather than because one visually available slot is hard-wired to error.

This is much more credible for a live demonstration.

---

# 20. P2: Loading Experience Is Too Long For A Static Demo

The current `go('browse')` introduces an 800 ms loading delay.

The interface says:

**Checking live availability...**

But the app is a local static prototype.

For normal user flow, this is unnecessary friction.

One exhibition workflow can tolerate a short loading state, but repeated navigation should feel instant.

### Recommended

Use:

- 150–250 ms transition if a loading animation is desired
- Full skeleton only for an initial data-load simulation
- No artificial delay on every navigation

The goal is to make the prototype feel responsive while retaining a visible system-status state for the HCI story.

---

# 21. P2: Static and Inconsistent Dates Must Be Removed

There are several date-related credibility problems.

Examples include:

- September 21 being repeatedly embedded in different screens.
- “Next booking” values not necessarily matching the selected equipment.
- Fixed booking references being reused.
- Displayed current availability that does not derive from actual booking state.

The product should have one source of truth.

### Recommended

Use a small local demo dataset:

```js
demoData = {
  bookings: [...],
  equipment: [...],
  users: [...],
  coordinators: [...]
}
```

Then derive screen content from this dataset.

---

# 22. P2: Booking References Should Be Generated

Current booking references are fixed.

Use:

```js
#VR-2026-0926-001
```

or:

```js
VR26-0926-001
```

The reference should be unique for every newly created demo booking.

This immediately improves perceived realism.

---

# 23. P2: Booking State Should Persist During Exhibition

The current state is mainly in JavaScript memory.

A page refresh can therefore return the demo to initial state.

For an exhibition, this is risky.

### Recommended

Use `localStorage` for:

- bookings
- draft booking
- selected equipment
- selected date
- feedback
- return record

Add a subtle exhibition utility:

**Reset Demo**

This can be hidden behind a simple menu or keyboard shortcut.

---

# 24. P2: Navigation Needs A Cleaner Mental Model

The current bottom navigation contains:

- Home
- Equipment
- Schedule
- Bookings

This is reasonable.

The problem is that `Schedule` and the equipment booking calendar can behave like two different concepts even though they are closely related.

### Recommended

Separate the concepts:

**Equipment**
Browse equipment and its details.

**Schedule**
See date-first availability.

**Bookings**
Manage the user's own reservations.

When a user selects an equipment item from Schedule:

`Schedule → Equipment → Booking`

When a user starts from Equipment:

`Equipment → Booking`

Both routes should converge on the same booking draft model.

This supports the original dual-entry concept without creating two separate booking systems.

---

# 25. P2: Calendar Should Support Equipment Context

A schedule screen without a clear equipment context can become ambiguous.

At the top of the calendar, show:

```text
Scheduling
Sony A7III
```

If started from Schedule-first:

```text
Schedule
All equipment
```

then let the user filter the equipment.

This makes the relationship between the calendar and equipment explicit.

---

# 26. P2: Category Filter Data Is Incomplete

The actual equipment includes:

- Cameras
- Audio
- Support
- Lighting

The home/filter language should consistently use those categories.

Avoid mixing:

- Support
- Accessories
- Gear
- Equipment

unless they are intentionally defined.

Use one taxonomy.

---

# 27. P2: Visual Design Needs Another Refinement Pass

The current CSS is still strongly “prototype showcase” oriented.

It includes:

- Editorial serif headings
- Warm ivory surfaces
- Gold-heavy visual treatment
- Large device presentation
- Decorative hero elements
- Shadow-heavy cards
- Emoji-based interface icons

This can work for a case-study presentation, but the **in-app product UI** should be more neutral and operational.

### Direction

Use the VUTV logo identity, but apply it to a practical product surface.

Suggested system:

- VUTV navy as primary
- VUTV gold as accent
- Green for available/confirmed
- Red for conflict/repair
- Neutral off-white background
- White cards
- Dark text
- Modern sans-serif typography
- Thin borders
- Controlled shadows
- No visual noise

The logo should drive the brand identity, not force every component to become gold.

---

# 28. Remove Emoji UI Icons

The current app still uses emoji in places such as:

- Search
- Booking
- Calendar
- Location
- Camera
- Alert
- Bottom navigation

For a polished VUTV application, replace these with a single SVG icon system.

Recommended source:

- Lucide
- Heroicons
- Custom VUTV outline icons

Use consistent stroke weight and dimensions.

This should be part of the same design-system pass, not random icon replacements.

---

# 29. Avoid Fake Data That Contradicts The UI

Examples to audit:

- “5 Items Available”
- “3 in use”
- “1 needs repair”
- “24h Advance”

These should be derived from `equipment` and `bookings`.

Do not show a metric that says 5 available when only two equipment items are actually available.

A dashboard should calculate:

```js
availableCount
inUseCount
maintenanceCount
upcomingBookingCount
```

from the actual data.

---

# 30. Search Should Search More Fields

Current search checks equipment name and category.

For real exhibition exploration, it should also match:

- Asset ID
- Description
- Equipment type
- Location
- status

Example:

Searching `CAM-014` should find Sony A7III.

Searching `Audio` should find audio equipment.

Searching `Shelf 3` should find equipment stored there.

---

# 31. Filters Should Reflect Booking Utility

Instead of only category filters, add optional status filters:

- All
- Available
- In use
- Shoot-ready
- Maintenance

This directly supports user intent.

Category filters and availability filters are different filter dimensions.

---

# 32. Booking Purpose Should Be Editable

The current review screen includes:

**VUTV · Podcast recording**

but it appears as fixed content.

A real booking should allow:

```text
Purpose
[ Podcast recording ]
```

or examples:

- Podcast
- Faculty interview
- Event coverage
- Social media shoot
- Photography
- Other

This also makes the notification sent to the coordinator more useful.

---

# 33. Review Screen Should Become A True Safety Check

The review screen already shows:

- Equipment
- Date
- Time
- Purpose
- Readiness
- Pickup
- Conflict state

This is good.

The next step is to make the screen interactive enough to prevent mistakes.

Recommended:

```text
Equipment
Sony A7III
Edit

Date
21 Sep 2026
Edit

Time
9:00 AM – 11:00 AM
Edit

Purpose
Podcast recording
Edit

Pickup
Equipment Room B · Shelf 3

Coordinator
VUTV Equipment Desk
```

Only the final action should be:

**Confirm Booking**

This makes “Review” function as an actual confirmation checkpoint.

---

# 34. Accessibility Improvements

The current product should include:

- Larger tap targets
- Visible focus states
- Strong text contrast
- Labels that do not depend only on colour
- Disabled state styling
- Clear keyboard navigation on the web version
- `aria-label` for icon-only controls
- Actual buttons rather than click-only decorative elements

Particularly important:

Do not communicate:

**Available = green**

only.

Use both:

**Available**

and the visual treatment.

---

# 35. Mobile Layout Should Be The Primary Product Surface

The repository currently uses a large device shell and scales a simulated phone.

For an exhibition website this is visually useful.

For the actual app experience, the core layout should also work naturally at:

- 360 px
- 390 px
- 402 px
- 430 px
- desktop browser width

Do not let the presentation shell dictate the product component sizes.

---

# 36. Exhibition-Specific Mode

The exhibition build should have a deliberately designed demo experience.

### Recommended hidden demo utility

A small “Demo” control can expose:

- Reset demo
- Load sample booking
- Simulate conflict
- Mark equipment in use
- Simulate return
- View feedback record

This is much safer than relying on a predetermined user path.

It also lets you recover instantly if a visitor breaks the flow.

---

# 37. Recommended New Data Model

The current application will become significantly easier to maintain if the prototype uses a single data model.

```js
const equipment = [
  {
    id: "cam1",
    name: "Sony A7III Camera",
    category: "Camera",
    assetId: "CAM-014",
    description: "Full-frame mirrorless body",
    location: "Equipment Room B",
    shelf: "Shelf 3",
    condition: "Good",
    readiness: "Shoot-ready",
    battery: 78,
    state: "available",
    availableFrom: null,
    coordinatorId: "coord1"
  }
];
```

```js
const bookings = [
  {
    id: "VR-2026-0926-001",
    equipmentId: "cam1",
    user: "Demo User",
    start: "2026-09-26T14:00",
    end: "2026-09-26T16:00",
    purpose: "Podcast recording",
    coordinatorId: "coord1",
    status: "confirmed",
    returnState: null,
    returnPhoto: null,
    feedback: null
  }
];
```

This one step will fix many of the current hard-coded UI problems.

---

# 38. Revised End-to-End User Flow

The final exhibition product should converge on this:

```text
HOME
 ↓
Choose:
 Find Equipment
 Check Schedule
 My Bookings

FIND EQUIPMENT
 ↓
Equipment list
 ↓
Equipment detail
 ↓
Book / Book for later
 ↓
Select date
 ↓
Select start time
 ↓
Select end time
 ↓
Enter purpose
 ↓
Review
 ↓
Confirm
 ↓
Booking success
 ↓
My Booking

MY BOOKING
 ↓
Before pickup
 Pickup details / coordinator

During use
 Extend / return

RETURN
 ↓
Condition
Return photo
Notes
 ↓
Return recorded
 ↓
Feedback
 ↓
Booking history updated
```

Conflict branch:

```text
Selected slot
 ↓
Conflict detected
 ↓
Explain what changed
 ↓
Preserve equipment + date
 ↓
Show alternatives
 ↓
Choose new time
 ↓
Return to review
```

In-use branch:

```text
Equipment
 ↓
In use until 5 PM
 ↓
Book for later
 ↓
Show 5 PM onward availability
 ↓
Select future interval
 ↓
Review
 ↓
Confirm
```

---

# 39. Screen-by-Screen Change List

## Home

### Keep
- VUTV identity
- availability summary
- upcoming booking concept

### Change
- Replace static metrics with derived values
- Show the user's next booking
- Add active booking section when relevant
- Reduce decorative space
- Make three primary actions explicit
- Add a compact schedule preview

---

## Equipment

### Keep
- Search
- Category filtering
- Equipment images

### Change
- Add explicit booking actions
- Separate View details from Book
- Add status filters
- Search asset IDs and location
- Distinguish available / in use / maintenance visually
- Remove emoji icons

---

## Equipment Detail

### Keep
- Hero image
- Availability
- Readiness
- Condition
- Location
- Battery

### Change
- Make content data-driven
- Add coordinator
- Add next available time
- Add Book for later
- Add booking purpose only after action is initiated
- Remove decorative/non-functional header controls

---

## Schedule

### Keep
- Calendar
- slot list
- conflict concept

### Change
- Real date selection
- Real month navigation
- Dynamic selected date
- equipment context
- status-aware slots
- future availability for in-use items
- real conflict logic

---

## Review

### Keep
- Summary structure
- conflict check

### Change
- Actual draft values
- Edit actions
- coordinator details
- notification status
- purpose
- duration/date range

---

## Success

### Keep
- booking reference
- pickup information
- route to My Bookings

### Change
- use generated booking reference
- include exact selected values
- show coordinator notification state
- add View Booking as the primary action

---

## My Bookings

### Keep
- upcoming / past
- cancellation

### Change
- booking statuses
- detail view
- pickup state
- extension action
- return action
- feedback state
- generated reference
- real date/time from booking data

---

## Return

### Keep
- return action
- feedback handoff

### Change
- condition selector
- return photo
- notes
- return timestamp
- confirmation summary

---

## Feedback

### Keep
- rating concept

### Change
- connect to a specific booking
- separate equipment condition from service/booking experience
- add concise comment
- persist result
- display feedback submitted state

---

# 40. Proposed Visual System

## Brand

Use the VUTV logo as the identity source.

Recommended hierarchy:

**Primary**
- VUTV Navy

**Accent**
- VUTV Gold

**Success**
- Green

**Warning / conflict**
- Red

**Background**
- Soft neutral / off-white

**Surface**
- White

**Text**
- Dark navy / charcoal

---

## Typography

Use a modern sans-serif:

- Inter
- Manrope
- Plus Jakarta Sans

Avoid using the editorial serif as the main in-app heading face.

The website showcase can retain a stronger presentation style if desired, but the embedded product should feel like a production application.

---

## Component language

Use:

- 12–16 px radius
- subtle borders
- restrained shadows
- 44 px minimum action height
- 16 px page padding
- strong text hierarchy
- compact metadata
- consistent SVG icons

Avoid:

- excessive gold
- strong gradients
- oversized decorative shapes
- fake-gloss effects
- emoji UI
- visual noise

---

# 41. What Should NOT Be Added Yet

Do not turn the exhibition build into an ERP.

Avoid adding unless the actual demo requires it:

- full user administration
- complex permissions
- analytics dashboards
- financial tracking
- multi-location inventory management
- chat
- complicated notification settings
- large backend architecture
- unnecessary authentication

The target is a convincing equipment-booking experience.

---

# 42. Suggested Implementation Order

## Phase 1: Fix correctness

1. Introduce `bookingDraft`.
2. Introduce `selectedEquipmentId`.
3. Introduce `selectedDate`.
4. Generate booking values from state.
5. Generate booking references.
6. Fix calendar date logic.
7. Make slots dynamic.
8. Implement actual future booking for in-use equipment.

## Phase 2: Complete lifecycle

9. Booking purpose.
10. Coordinator.
11. Notification state.
12. Extend booking.
13. Return condition.
14. Return photo.
15. Feedback persistence.

## Phase 3: Product polish

16. Explicit action buttons on equipment cards.
17. Better dashboard.
18. SVG icons.
19. VUTV visual refinement.
20. Responsive QA.
21. Remove dead controls.
22. Add demo reset.

## Phase 4: Exhibition hardening

23. Add localStorage.
24. Add demo states.
25. Test every route.
26. Test page refresh.
27. Test repeated bookings.
28. Test cancellation.
29. Test return.
30. Test conflict.
31. Test in-use future booking.
32. Test multi-day booking.

---

# 43. Exhibition Test Scenarios

Before presenting, manually run these exact scenarios:

### Scenario 1
Book an available camera for 2 hours.

### Scenario 2
Book a camera for multiple days.

### Scenario 3
Book equipment currently in use for a future time.

### Scenario 4
Extend an existing booking.

### Scenario 5
Attempt a slot that becomes unavailable.

### Scenario 6
Cancel a booking.

### Scenario 7
Return equipment with a photo and condition.

### Scenario 8
Submit feedback.

### Scenario 9
Refresh the browser and verify the booking remains.

### Scenario 10
Reset the demo and verify the clean starting state.

If any of these scenarios produces hard-coded or contradictory information, the exhibition build is not ready.

---

# 44. Feedback-to-Change Traceability

| Feedback received | Current response | Still necessary |
|---|---|---|
| Choose custom time slots | Flexible duration concept added | Convert it into a true start/end interval model |
| Multi-day booking | Duration concept added | Implement date-range conflict checking |
| Extend booking | Mentioned in feedback/ideation | Add a complete extend flow |
| Better dashboard | Dashboard grid added | Make it data-driven and operational |
| Return photo | Return photo concept added | Connect it to return record and booking history |
| Book in-use equipment later | “Book for later” added | Make next-available time and future schedule explicit |

---

# 45. Measurement Strategy For The Next Round

The current exhibition feedback is positive on ease of use. The next test should therefore concentrate on **quality of interaction**, not only general ease.

Capture:

- Time to find equipment
- Time to select a valid date/time
- Number of backtracks
- Whether users discover “Book for later”
- Whether users understand “In use” versus “Unavailable”
- Whether users notice coordinator information
- Whether users know where to extend a booking
- Whether users understand the return-photo purpose
- Whether the selected values persist into confirmation
- Whether the final booking matches what they selected

The most important new validation question is:

> **Does the system behave consistently with what the interface promises?**

---

# 46. Product Principles For The Final Iteration

## Principle 1
**Show availability before asking for commitment.**

## Principle 2
**Separate availability from readiness.**

## Principle 3
**Make the primary action explicit.**

## Principle 4
**Treat an in-use item as a schedulable resource, not a dead end.**

## Principle 5
**Make time a real interval, not only a preset label.**

## Principle 6
**Preserve user choices when a conflict occurs.**

## Principle 7
**Treat booking as a lifecycle, not a single confirmation event.**

## Principle 8
**Make the UI reflect actual state rather than demo copy.**

---

# 47. Final Direction

The current build does **not** need another feature explosion.

It needs a stronger transition from:

> **prototype screens that demonstrate features**

to:

> **one coherent system whose data, states, and interactions agree with each other.**

The feedback already validated the broad usability of the concept. The next iteration should therefore spend less effort adding new screens and more effort making the existing screens truthful, connected, and operational.

The most important transformation is:

```text
Static prototype
        ↓
State-driven prototype
        ↓
Lifecycle-driven prototype
        ↓
Exhibition-ready product demo
```

The exhibition version should ultimately let a visitor intuitively answer five questions:

1. **What equipment can I use?**
2. **When can I use it?**
3. **What happens if it is currently in use?**
4. **What happens after I book it?**
5. **What happens when I return it?**

If the final version answers those five questions clearly and the underlying state always matches the UI, the VUTV Equipment Booking concept will feel substantially more complete without becoming unnecessarily complex.
