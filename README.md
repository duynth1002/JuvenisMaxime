# Juvenis Maxime — Job Simulation Demo

Frontend-only demo of a job simulation learning platform (see `task.md`).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo paths

- **Student:** `/login` → pick a demo student → start an assigned task → fill the **Submit your work** form (response + optional file) → wait for admin → continue
- **Admin:** `/admin/login` → dashboard **Approval requests** → review submitted work → Accept / Reject
- **Create template:** `/admin/templates/new` → basics form → opens drag-and-drop builder
- **Rich builder:** select text → highlight (Key / Action / Caution / Tip) → attach step media → toggle **Student preview**

Data persists in `localStorage` for the browser session. Use **Reset demo data** to restore seeds.

> Tip: student and admin share the same browser storage in this demo — log out of one role and into the other to review a pending request.
