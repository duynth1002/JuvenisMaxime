import type { Assignment, Student, TaskTemplate } from "./types";

export const SEED_STUDENTS: Student[] = [
  {
    id: "student-1",
    name: "Minh Anh Tran",
    email: "minhanh@student.demo",
    track: "Marketing",
  },
  {
    id: "student-2",
    name: "Kai Nguyen",
    email: "kai@student.demo",
    track: "Software & Data",
  },
  {
    id: "student-3",
    name: "Linh Pham",
    email: "linh@student.demo",
    track: "Business & Finance",
  },
];

export const SEED_TEMPLATES: TaskTemplate[] = [
  {
    id: "template-marketing",
    title: "Marketing Campaign Simulation",
    track: "Marketing",
    description:
      "Plan and launch a youth career brand campaign — from brief to launch checklist.",
    estimatedMinutes: 90,
    steps: [
      {
        id: "m-1",
        order: 1,
        title: "Read the client brief",
        description: "Understand Juvenis Maxime’s campaign goals and constraints.",
        content:
          "You are a junior marketer at a youth career brand. The client wants a 2-week social campaign that drives sign-ups for a job simulation workshop.\n\nGoals: 500 landing-page visits, 80 workshop registrations, brand-safe tone for students aged 16–22.\n\nConstraints: Budget = organic + one paid boost. Channels = Instagram + email. Deadline = Friday demo day.\n\nTask: Write 3 bullet points summarizing the brief in your own words (mentally), then mark this step complete.",
        highlights: [
          {
            id: "m-1-hl-goals",
            start: 146,
            end: 245,
            color: "amber",
            note: "Primary success metrics",
          },
          {
            id: "m-1-hl-constraints",
            start: 247,
            end: 352,
            color: "rose",
            note: "Stay inside these limits",
          },
          {
            id: "m-1-hl-task",
            start: 354,
            end: 463,
            color: "teal",
            note: "Your deliverable for this step",
          },
        ],
        media: [
          {
            id: "m-1-media-brief",
            name: "campaign-brief-board.svg",
            type: "image/svg+xml",
            size: 520,
            caption: "Client brief snapshot — goals, channels, deadline",
            dataUrl:
              "data:image/svg+xml," +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#0c2340"/><rect x="28" y="28" width="584" height="304" rx="18" fill="#fffcf7"/><text x="56" y="88" fill="#0c2340" font-family="Georgia, serif" font-size="28">Campaign brief board</text><text x="56" y="140" fill="#0f766e" font-family="Arial, sans-serif" font-size="16">GOAL · 500 visits · 80 registrations</text><text x="56" y="178" fill="#5b6678" font-family="Arial, sans-serif" font-size="16">CHANNELS · Instagram + email</text><text x="56" y="216" fill="#5b6678" font-family="Arial, sans-serif" font-size="16">DEADLINE · Friday demo day</text><text x="56" y="270" fill="#0c2340" font-family="Arial, sans-serif" font-size="14">Juvenis Maxime · Job Simulation</text></svg>`,
              ),
          },
        ],
      },
      {
        id: "m-2",
        order: 2,
        title: "Define the target audience",
        description: "Build a simple persona for the campaign.",
        content:
          "Create a one-paragraph persona covering: age range, career stage, primary worry, preferred content format, and what would make them register.\n\nHint persona: final-year high school / first-year university students who feel unsure about majors and want “real work” practice before applying for internships.",
      },
      {
        id: "m-3",
        order: 3,
        title: "Write the campaign message",
        description: "Craft a single clear value proposition.",
        content:
          "Draft one primary message (max 20 words) and one supporting line (max 30 words).\n\nExample structure: “Practice a real job before you apply.” / “Complete a guided simulation and walk away with a portfolio-ready story.”",
      },
      {
        id: "m-4",
        order: 4,
        title: "Choose channel mix",
        description: "Decide where the campaign will live.",
        content:
          "Pick primary + secondary channel and justify each in one sentence.\n\nOptions: Instagram Reels, Instagram carousel posts, email newsletter, campus QR posters, short LinkedIn posts for parents/teachers.",
      },
      {
        id: "m-5",
        order: 5,
        title: "Draft 3 content pieces",
        description: "Outline hooks for the first week of content.",
        content:
          "Write titles/hooks for 3 pieces:\n1) Awareness (what is a job simulation?)\n2) Proof (student outcome story)\n3) Call-to-action (register this week)\n\nKeep each hook under 12 words.",
      },
      {
        id: "m-6",
        order: 6,
        title: "Build a simple creative brief",
        description: "Brief a designer (or yourself) for visuals.",
        content:
          "Fill in: visual mood (3 adjectives), must-include brand elements, forbidden elements, and one reference image description.\n\nMood direction for JM: confident, youthful, professional — not childish, not corporate-stiff.",
      },
      {
        id: "m-7",
        order: 7,
        title: "Set success metrics",
        description: "Translate goals into measurable KPIs.",
        content:
          "Define KPIs for reach, engagement, and conversion. Include a check-in cadence (e.g. mid-week review). Write them as a short dashboard list.",
      },
      {
        id: "m-8",
        order: 8,
        title: "Prepare the launch checklist",
        description: "List what must be ready before go-live.",
        content:
          "Create a launch checklist covering: final copy approval, creative assets, tracking links, posting schedule, and who responds to DMs/comments.",
      },
      {
        id: "m-9",
        order: 9,
        title: "Present your campaign plan",
        description: "Summarize the plan as if pitching a manager.",
        content:
          "Write a 5-bullet executive summary: audience, message, channels, timeline, and expected outcome. This is your “demo day” deliverable.",
      },
    ],
  },
  {
    id: "template-software",
    title: "Software & Data Simulation",
    track: "Software & Data",
    description:
      "Take a messy signup dataset from brief to a clean insight memo for stakeholders.",
    estimatedMinutes: 100,
    steps: [
      {
        id: "s-1",
        order: 1,
        title: "Clarify the business question",
        description: "Translate a vague request into an analysis goal.",
        content:
          "Stakeholder ask: “Are our workshop sign-ups converting well?”\n\nRewrite this into a precise question with timeframe and success definition. Example: “What % of landing-page visitors registered for a workshop in the last 30 days, and which sources convert best?”",
      },
      {
        id: "s-2",
        order: 2,
        title: "Inspect the raw data",
        description: "Identify fields, gaps, and quality issues.",
        content:
          "Imagine a CSV with columns: visitor_id, source, device, landed_at, registered (yes/no), workshop_track.\n\nList 4 quality checks you would run (nulls, duplicates, impossible timestamps, inconsistent categories).",
      },
      {
        id: "s-3",
        order: 3,
        title: "Clean & normalize",
        description: "Decide how you would fix the data.",
        content:
          "Propose cleaning rules for: missing source → “unknown”; duplicate visitor_id → keep earliest; registered typos (“Y”, “yes”, “1”) → boolean true/false. Write them as bullet rules a teammate could follow.",
      },
      {
        id: "s-4",
        order: 4,
        title: "Define key metrics",
        description: "Choose metrics that answer the business question.",
        content:
          "Define: conversion rate, conversion by source, conversion by track, and a simple funnel (visit → register). Note one metric you will NOT prioritize and why.",
      },
      {
        id: "s-5",
        order: 5,
        title: "Explore patterns",
        description: "Hypothesize what the data might show.",
        content:
          "Write 3 hypotheses (e.g. “Instagram converts better than email among mobile users”). For each, note what chart you would use to check it.",
      },
      {
        id: "s-6",
        order: 6,
        title: "Build a mini dashboard layout",
        description: "Sketch the stakeholder view.",
        content:
          "Describe a 4-panel dashboard: KPI strip, source comparison bar chart, track breakdown, and a daily trend line. One sentence per panel on what decision it supports.",
      },
      {
        id: "s-7",
        order: 7,
        title: "Draft insights",
        description: "Turn numbers into action.",
        content:
          "Write 3 insights in the format: Observation → Implication → Recommended action. Keep each under 2 sentences.",
      },
      {
        id: "s-8",
        order: 8,
        title: "Flag risks & limitations",
        description: "Show mature analytical judgment.",
        content:
          "List limitations: sample size, tracking gaps, seasonality, selection bias. For each, say how it affects confidence in your recommendation.",
      },
      {
        id: "s-9",
        order: 9,
        title: "Ship the insight memo",
        description: "Package the work for a non-technical manager.",
        content:
          "Write a short memo: Goal, Method (2 lines), Top 3 findings, Recommendation, Next experiment. This is your completion deliverable.",
      },
    ],
  },
  {
    id: "template-finance",
    title: "Business & Finance Simulation",
    track: "Business & Finance",
    description:
      "Build a lean unit-economics model for a new student workshop offering.",
    estimatedMinutes: 85,
    steps: [
      {
        id: "f-1",
        order: 1,
        title: "Frame the decision",
        description: "State what leadership needs to decide.",
        content:
          "Leadership question: Should Juvenis Maxime launch a paid “Job Sim Weekend” product next quarter?\n\nWrite the decision statement and the 2–3 criteria that would make “yes” the right call.",
      },
      {
        id: "f-2",
        order: 2,
        title: "Map revenue drivers",
        description: "Identify how money comes in.",
        content:
          "List revenue inputs: ticket price, seats per cohort, cohorts per quarter, expected fill rate, and optional add-ons (portfolio review). Note which lever has the biggest upside.",
      },
      {
        id: "f-3",
        order: 3,
        title: "Map cost structure",
        description: "Separate fixed vs variable costs.",
        content:
          "Categorize costs: venue, facilitators, materials, ads, CRM tools, student support. Mark each as fixed or variable per cohort. Flag one cost you could reduce first.",
      },
      {
        id: "f-4",
        order: 4,
        title: "Build a simple unit model",
        description: "Calculate contribution per seat.",
        content:
          "Assume: ticket = 1,200,000 VND; variable cost/seat = 450,000 VND; fixed cost/cohort = 8,000,000 VND; seats = 25; fill = 80%.\n\nCompute contribution margin per seat and break-even seats. Show your arithmetic briefly.",
      },
      {
        id: "f-5",
        order: 5,
        title: "Run a sensitivity check",
        description: "See what happens if assumptions move.",
        content:
          "Test 3 scenarios: optimistic (+15% fill), base, pessimistic (−20% fill or −10% price). Note which assumption breaks profitability first.",
      },
      {
        id: "f-6",
        order: 6,
        title: "Assess risk",
        description: "Identify operational and market risks.",
        content:
          "List top risks: demand risk, facilitator availability, brand fit, refund policy. For each, propose one mitigation.",
      },
      {
        id: "f-7",
        order: 7,
        title: "Recommend a pilot",
        description: "Propose a low-risk first launch.",
        content:
          "Design a 1-cohort pilot: target audience, ticket price, success metrics (fill rate, NPS, cost variance), and go/no-go threshold after the pilot.",
      },
      {
        id: "f-8",
        order: 8,
        title: "Prepare the decision slide",
        description: "Summarize for a 3-minute leadership update.",
        content:
          "Outline one slide: Decision asked, Base-case economics, Risks, Pilot ask (budget + timeline), Recommended call (Go / Hold / Kill).",
      },
      {
        id: "f-9",
        order: 9,
        title: "Deliver the recommendation",
        description: "Close with a clear yes/no and next step.",
        content:
          "Write a final recommendation paragraph (max 80 words) stating your call, the key number that drove it, and the immediate next action for the team.",
      },
    ],
  },
];

export const SEED_ASSIGNMENTS: Assignment[] = [
  {
    id: "assign-1",
    studentId: "student-1",
    templateId: "template-marketing",
    assignedAt: "2026-09-01T09:00:00.000Z",
    completedStepIds: [],
    status: "assigned",
  },
  {
    id: "assign-2",
    studentId: "student-2",
    templateId: "template-software",
    assignedAt: "2026-09-01T09:00:00.000Z",
    completedStepIds: [],
    status: "assigned",
  },
  {
    id: "assign-3",
    studentId: "student-3",
    templateId: "template-finance",
    assignedAt: "2026-09-01T09:00:00.000Z",
    completedStepIds: [],
    status: "assigned",
  },
];
