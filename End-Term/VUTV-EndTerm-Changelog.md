# VUTV Equipment Booking — End-Term Changelog
### From Unit Test 2 (static wireframes) → Execute-stage functional product

---

## 1. What existed before (UT2 baseline)

- 8 static Figma screens covering one happy path: Home → Browse → Detail → Select Date & Time → Confirm → Success, plus a Loading state and a Booking Conflict state.
- Two heuristic violations found and fixed in the wireframes: Visibility of System Status (loading screen) and Error Prevention / User Control & Freedom (conflict-recovery screen).
- No admin role, no working booking logic, no calendar, no equipment-condition tracking — it was a clickable mockup of one flow, not a running system.

---

## 2. New features / add-ons (End-Term product)

### 2.1 Admin Panel (Head of VUTV role)
- **Dashboard** — live counts: pending requests, equipment flagged "Needs repair," bookings today.
- **Equipment management** — add new equipment (name, category, condition note, location); manually clear a "Needs repair" flag once an item is physically fixed.
- **Requests** — approve or reject pending booking requests. Booking is now a request→approval workflow, not instant self-service confirmation, per the End-Term brief.

### 2.2 Shared Equipment Calendar (both roles)
- Month-grid view, same component used by Producer and Admin.
- Each day cell shows a booking-density count and shades darker as more equipment is booked that day.
- Tapping a day drills into exactly what's booked, by whom, and its approval status.

### 2.3 Digital Handover Log — the innovative add-on
- Grounded directly in the UT2 research: the P1 dead-battery incident and P3's ("Head of VUTV") pain point of becoming "a constant escalation inbox."
- At **check-out** and **check-in**, the booker logs equipment condition (Working fine / Battery low / Damage noticed) plus an optional note.
- If anything other than "Working fine" is reported, the system **automatically** flags that equipment "Needs repair" — visible instantly to the next browsing producer and on the Admin dashboard, with no phone call or email required.
- This is what turns the old dead-end "assume gear is ready" failure mode into a self-reporting loop.

### 2.4 Conflict checking, now enforced (not just illustrated)
- UT2's screen 07 ("This slot was just booked") showed the *error state* only.
- The End-Term build actually checks for date/time/equipment overlaps before a request is created, and blocks it with the same message pattern — so the heuristic fix is now functional, not decorative.

---

## 3. UI changes

| Area | UT2 | End-Term |
|---|---|---|
| Navigation | Single linear flow, one screen at a time | Role switch (Producer / Admin) → tabbed navigation within each role |
| Equipment list | Static rows | Category filter chips, live readiness badges (Ready / Needs repair) |
| Booking | Separate full-screen steps (date → confirm → success) | Inline expandable form directly under the equipment card |
| Status feedback | One error state (booking conflict) | Color-coded status badges throughout: Pending / Confirmed / Rejected / Completed, Ready / Needs repair |
| Calendar | Did not exist | New — month grid with density shading, shared across both roles |
| Theming | Not addressed | Light/dark mode support, safe-area-aware layout for mobile |

---

## 4. Functionality / data changes

- Booking flow changed from **self-service instant confirm** (UT2 MVP definition) to **request → admin approval**, matching the End-Term brief's requirement for an approval-based admin workflow.
- Equipment `readiness` is no longer a static field set once by an admin — it now updates automatically from real handover reports.
- State (equipment + bookings) persists in the browser (localStorage) and is shared live between the Producer and Admin views in the same session, so an admin approval or a new equipment entry shows up immediately without a refresh.

---

## 5. Known simplifications (worth stating openly in the case study / viva)

- No real authentication — role is a manual switch, not a login system.
- No photo upload on handover — condition is a dropdown + text note, not an image.
- No edit/delete on existing equipment records — only add, and clear-repair-flag.
- Single-browser demo: there's no real multi-user backend, so "shared" state only syncs within one browser's storage, not across different people's devices.

---