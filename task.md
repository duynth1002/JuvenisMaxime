# Project Spec: Job Simulation Platform (Demo)
Client: Juvenis Maxime (juvenismaxime.com) — career development / job simulation programs for students

## 1. Goal
Build a **frontend-only demo** of a job simulation learning platform:
- Students log in and work through a simulated real-world task, step by step.
- Admins can drag-and-drop to build/customize task templates and assign them to students.
No production backend is required for this phase — mock/local data is fine. The priority is a working, clickable UI to demo to the client.

## 2. Core concept: the "Task Template"
Each simulation is a **Task Template** made of an ordered checklist of steps (~9 steps in the reference demo).
- Steps are **sequential and gated**: step N+1 is locked until step N is marked complete.
- Each step is a simple content block, e.g.:
  - Title + description
  - Instructional content (text/video/image placeholder)
  - A "mark as complete" action (checkbox / button)
- Progress persists across the checklist (visually: progress bar or stepper showing X/9 complete).

## 3. Deliverables
1. **2–3 drag-and-drop Task Templates** representing different career tracks (suggested: Marketing Campaign task, Software/Data task, Business/Finance task — pick based on client's target student audience).
2. **Admin UI**:
   - Template library / list view (see existing templates)
   - Drag-and-drop builder screen — admin can reorder, add, remove, and edit the ~9 checklist steps within a template
   - Assign a template to a student (can be a simple dropdown/mock action, no real backend wiring needed)
3. **Student UI**:
   - Login screen (mock auth)
   - "My assigned task" view — shows the template as a step-by-step checklist
   - Step detail view — shows current step content, locked/unlocked state for future steps, "mark complete" to advance
   - Progress indicator

## 4. Page list

### Admin
- `/admin/login`
- `/admin/dashboard` — overview: list of templates, list of students (mock data)
- `/admin/templates` — template library (2–3 seeded templates)
- `/admin/templates/:id/edit` — the drag-and-drop builder (core screen): reorder steps, edit step title/description/content, add/remove step
- `/admin/templates/:id/preview` — preview exactly what the student will see

### Student
- `/login`
- `/dashboard` — shows assigned task(s)
- `/task/:id` — the simulation workspace: step list on the side (locked/unlocked/complete states), active step content in the main panel
- `/task/:id/complete` — completion/certificate screen (nice-to-have polish for the demo)

## 5. Tech constraints
- Frontend-only demo — no real backend, no real database.
- Use mock JSON data / React local state (or localStorage) to simulate persistence within a session.
- Drag-and-drop: use **dnd-kit** (React) for the step-reordering builder.
- Framework: React + Next.js (per existing stack).
- Keep each Task Template's data as a simple JSON structure, e.g.:
```json
{
  "id": "template-1",
  "title": "Marketing Campaign Simulation",
  "steps": [
    { "id": "step-1", "title": "...", "description": "...", "content": "...", "order": 1 }
  ]
}
```
This makes it trivial to add a real backend later without changing the UI logic.

## 6. Explicitly out of scope for this phase
- Real authentication / user accounts
- Persistent database
- File upload / grading / analytics
- Multi-role permissions beyond admin vs. student

## 7. Demo success criteria
- Client can watch an admin drag steps around to build/edit a template.
- Client can watch a student go through the checklist and see steps unlock in order.
- At least 2–3 distinct templates exist to show variety.