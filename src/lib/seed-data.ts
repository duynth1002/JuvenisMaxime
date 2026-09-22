import type { Assignment, Student, TaskTemplate } from "./types";
import {
  FINANCE_COLORS,
  MARKETING_COLORS,
  SOFTWARE_COLORS,
  richStep,
} from "./seed-media";

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
      richStep({
        id: "m-1",
        order: 1,
        title: "Read the client brief",
        description: "Understand Juvenis Maxime’s campaign goals and constraints.",
        content:
          "You are a junior marketer at a youth career brand. The client wants a 2-week social campaign that drives sign-ups for a job simulation workshop.\n\nGoals: 500 landing-page visits, 80 workshop registrations, brand-safe tone for students aged 16–22.\n\nConstraints: Budget = organic + one paid boost. Channels = Instagram + email. Deadline = Friday demo day.\n\nTask: Write 3 bullet points summarizing the brief in your own words (mentally), then mark this step complete.",
        phrases: [
          {
            text: "Goals: 500 landing-page visits, 80 workshop registrations, brand-safe tone for students aged 16–22.",
            color: "amber",
            note: "Primary success metrics",
          },
          {
            text: "Constraints: Budget = organic + one paid boost. Channels = Instagram + email. Deadline = Friday demo day.",
            color: "rose",
            note: "Stay inside these limits",
          },
          {
            text: "Task: Write 3 bullet points summarizing the brief in your own words (mentally), then mark this step complete.",
            color: "teal",
            note: "Your deliverable for this step",
          },
        ],
        filename: "campaign-brief-board.svg",
        board: {
          title: "Campaign brief board",
          lines: [
            "GOAL · 500 visits · 80 registrations",
            "CHANNELS · Instagram + email",
            "DEADLINE · Friday demo day",
          ],
          caption: "Marketing track · Juvenis Maxime",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-2",
        order: 2,
        title: "Define the target audience",
        description: "Build a simple persona for the campaign.",
        content:
          "Create a one-paragraph persona covering: age range, career stage, primary worry, preferred content format, and what would make them register.\n\nHint persona: final-year high school / first-year university students who feel unsure about majors and want “real work” practice before applying for internships.",
        phrases: [
          {
            text: "age range, career stage, primary worry, preferred content format",
            color: "sky",
            note: "Persona fields to cover",
          },
          {
            text: "final-year high school / first-year university students",
            color: "amber",
            note: "Core audience",
          },
          {
            text: "“real work” practice before applying for internships",
            color: "teal",
            note: "Motivation hook",
          },
        ],
        filename: "audience-persona-board.svg",
        board: {
          title: "Audience persona",
          lines: [
            "WHO · HS seniors & first-year uni",
            "WORRY · Unsure about majors / internships",
            "WANT · Real work practice + portfolio story",
          ],
          caption: "Marketing · persona snapshot",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-3",
        order: 3,
        title: "Write the campaign message",
        description: "Craft a single clear value proposition.",
        content:
          "Draft one primary message (max 20 words) and one supporting line (max 30 words).\n\nExample structure: “Practice a real job before you apply.” / “Complete a guided simulation and walk away with a portfolio-ready story.”",
        phrases: [
          {
            text: "primary message (max 20 words)",
            color: "amber",
            note: "Headline limit",
          },
          {
            text: "“Practice a real job before you apply.”",
            color: "teal",
            note: "Example primary line",
          },
          {
            text: "“Complete a guided simulation and walk away with a portfolio-ready story.”",
            color: "sky",
            note: "Example support line",
          },
        ],
        filename: "message-board.svg",
        board: {
          title: "Message craft",
          lines: [
            "PRIMARY · Practice a real job before you apply",
            "SUPPORT · Guided sim → portfolio-ready story",
            "TONE · Confident · Youthful · Clear",
          ],
          caption: "Marketing · value proposition",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-4",
        order: 4,
        title: "Choose channel mix",
        description: "Decide where the campaign will live.",
        content:
          "Pick primary + secondary channel and justify each in one sentence.\n\nOptions: Instagram Reels, Instagram carousel posts, email newsletter, campus QR posters, short LinkedIn posts for parents/teachers.",
        phrases: [
          {
            text: "primary + secondary channel",
            color: "teal",
            note: "Choose a clear mix",
          },
          {
            text: "Instagram Reels, Instagram carousel posts, email newsletter",
            color: "amber",
            note: "Strong student-facing options",
          },
          {
            text: "short LinkedIn posts for parents/teachers",
            color: "sky",
            note: "Influencer / guardian channel",
          },
        ],
        filename: "channel-mix-board.svg",
        board: {
          title: "Channel mix",
          lines: [
            "PRIMARY · Instagram Reels (reach)",
            "SECONDARY · Email newsletter (convert)",
            "SUPPORT · Campus QR + parent LinkedIn",
          ],
          caption: "Marketing · distribution plan",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-5",
        order: 5,
        title: "Draft 3 content pieces",
        description: "Outline hooks for the first week of content.",
        content:
          "Write titles/hooks for 3 pieces:\n1) Awareness (what is a job simulation?)\n2) Proof (student outcome story)\n3) Call-to-action (register this week)\n\nKeep each hook under 12 words.",
        phrases: [
          {
            text: "1) Awareness (what is a job simulation?)",
            color: "sky",
            note: "Top-of-funnel",
          },
          {
            text: "2) Proof (student outcome story)",
            color: "amber",
            note: "Social proof",
          },
          {
            text: "3) Call-to-action (register this week)",
            color: "teal",
            note: "Conversion push",
          },
        ],
        filename: "content-hooks-board.svg",
        board: {
          title: "Week-1 content hooks",
          lines: [
            "AWARE · What is a job simulation?",
            "PROOF · Student outcome story",
            "CTA · Register this week",
          ],
          caption: "Marketing · content ladder",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-6",
        order: 6,
        title: "Build a simple creative brief",
        description: "Brief a designer (or yourself) for visuals.",
        content:
          "Fill in: visual mood (3 adjectives), must-include brand elements, forbidden elements, and one reference image description.\n\nMood direction for JM: confident, youthful, professional — not childish, not corporate-stiff.",
        phrases: [
          {
            text: "visual mood (3 adjectives), must-include brand elements, forbidden elements",
            color: "amber",
            note: "Brief checklist",
          },
          {
            text: "confident, youthful, professional",
            color: "teal",
            note: "Target mood",
          },
          {
            text: "not childish, not corporate-stiff",
            color: "rose",
            note: "Avoid these vibes",
          },
        ],
        filename: "creative-brief-board.svg",
        board: {
          title: "Creative brief",
          lines: [
            "MOOD · Confident · Youthful · Pro",
            "MUST · JM mark · real workplace cues",
            "AVOID · Childish icons · stiff stock suits",
          ],
          caption: "Marketing · visual direction",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-7",
        order: 7,
        title: "Set success metrics",
        description: "Translate goals into measurable KPIs.",
        content:
          "Define KPIs for reach, engagement, and conversion. Include a check-in cadence (e.g. mid-week review). Write them as a short dashboard list.",
        phrases: [
          {
            text: "reach, engagement, and conversion",
            color: "amber",
            note: "KPI trio",
          },
          {
            text: "mid-week review",
            color: "sky",
            note: "Cadence checkpoint",
          },
          {
            text: "short dashboard list",
            color: "teal",
            note: "Deliverable format",
          },
        ],
        filename: "kpi-dashboard-board.svg",
        board: {
          title: "Success metrics",
          lines: [
            "REACH · Impressions / unique viewers",
            "ENGAGE · Saves · shares · replies",
            "CONVERT · Landing visits → registrations",
          ],
          caption: "Marketing · KPI board",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-8",
        order: 8,
        title: "Prepare the launch checklist",
        description: "List what must be ready before go-live.",
        content:
          "Create a launch checklist covering: final copy approval, creative assets, tracking links, posting schedule, and who responds to DMs/comments.",
        phrases: [
          {
            text: "final copy approval, creative assets, tracking links",
            color: "amber",
            note: "Pre-flight assets",
          },
          {
            text: "posting schedule",
            color: "sky",
            note: "Timing plan",
          },
          {
            text: "who responds to DMs/comments",
            color: "teal",
            note: "Owner clarity",
          },
        ],
        filename: "launch-checklist-board.svg",
        board: {
          title: "Launch checklist",
          lines: [
            "COPY · Final approval locked",
            "ASSETS · Creatives + tracking links",
            "OWNERS · Poster schedule · DM responder",
          ],
          caption: "Marketing · go-live readiness",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
      richStep({
        id: "m-9",
        order: 9,
        title: "Present your campaign plan",
        description: "Summarize the plan as if pitching a manager.",
        content:
          "Write a 5-bullet executive summary: audience, message, channels, timeline, and expected outcome. This is your “demo day” deliverable.",
        phrases: [
          {
            text: "audience, message, channels, timeline, and expected outcome",
            color: "teal",
            note: "Five pitch bullets",
          },
          {
            text: "“demo day” deliverable",
            color: "amber",
            note: "What you present",
          },
        ],
        filename: "exec-summary-board.svg",
        board: {
          title: "Demo-day pitch",
          lines: [
            "WHO · Audience persona",
            "WHAT · Message + channel mix",
            "WIN · Timeline + expected outcome",
          ],
          caption: "Marketing · executive summary",
          colors: MARKETING_COLORS,
          accent: "#c9184a",
        },
      }),
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
      richStep({
        id: "s-1",
        order: 1,
        title: "Clarify the business question",
        description: "Translate a vague request into an analysis goal.",
        content:
          "Stakeholder ask: “Are our workshop sign-ups converting well?”\n\nRewrite this into a precise question with timeframe and success definition. Example: “What % of landing-page visitors registered for a workshop in the last 30 days, and which sources convert best?”",
        phrases: [
          {
            text: "“Are our workshop sign-ups converting well?”",
            color: "sky",
            note: "Vague ask to rewrite",
          },
          {
            text: "“What % of landing-page visitors registered for a workshop in the last 30 days, and which sources convert best?”",
            color: "teal",
            note: "Strong question pattern",
          },
        ],
        filename: "data-question-board.svg",
        board: {
          title: "Data question board",
          lines: [
            "INPUT · Are sign-ups converting well?",
            "OUTPUT · Conversion % by source · 30 days",
            "CHECK · Visits → Registers → Best channel",
          ],
          caption: "Software & Data · Juvenis Maxime",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-2",
        order: 2,
        title: "Inspect the raw data",
        description: "Identify fields, gaps, and quality issues.",
        content:
          "Imagine a CSV with columns: visitor_id, source, device, landed_at, registered (yes/no), workshop_track.\n\nList 4 quality checks you would run (nulls, duplicates, impossible timestamps, inconsistent categories).",
        phrases: [
          {
            text: "visitor_id, source, device, landed_at, registered (yes/no), workshop_track",
            color: "sky",
            note: "Schema fields",
          },
          {
            text: "nulls, duplicates, impossible timestamps, inconsistent categories",
            color: "rose",
            note: "Quality checklist",
          },
        ],
        filename: "data-quality-board.svg",
        board: {
          title: "Raw data inspection",
          lines: [
            "FIELDS · id · source · device · time · track",
            "CHECKS · Nulls · Dupes · Bad timestamps",
            "WATCH · Inconsistent categories",
          ],
          caption: "Software & Data · quality pass",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-3",
        order: 3,
        title: "Clean & normalize",
        description: "Decide how you would fix the data.",
        content:
          "Propose cleaning rules for: missing source → “unknown”; duplicate visitor_id → keep earliest; registered typos (“Y”, “yes”, “1”) → boolean true/false. Write them as bullet rules a teammate could follow.",
        phrases: [
          {
            text: "missing source → “unknown”",
            color: "amber",
            note: "Fill rule",
          },
          {
            text: "duplicate visitor_id → keep earliest",
            color: "sky",
            note: "Dedupe rule",
          },
          {
            text: "registered typos (“Y”, “yes”, “1”) → boolean true/false",
            color: "teal",
            note: "Normalize booleans",
          },
        ],
        filename: "cleaning-rules-board.svg",
        board: {
          title: "Cleaning rules",
          lines: [
            "SOURCE missing → unknown",
            "DUPE visitor_id → keep earliest",
            "REGISTERED Y/yes/1 → true",
          ],
          caption: "Software & Data · normalize",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-4",
        order: 4,
        title: "Define key metrics",
        description: "Choose metrics that answer the business question.",
        content:
          "Define: conversion rate, conversion by source, conversion by track, and a simple funnel (visit → register). Note one metric you will NOT prioritize and why.",
        phrases: [
          {
            text: "conversion rate, conversion by source, conversion by track",
            color: "teal",
            note: "Core metrics",
          },
          {
            text: "funnel (visit → register)",
            color: "sky",
            note: "Simple funnel",
          },
          {
            text: "one metric you will NOT prioritize",
            color: "rose",
            note: "Scope discipline",
          },
        ],
        filename: "metrics-board.svg",
        board: {
          title: "Metric map",
          lines: [
            "CORE · Conversion rate",
            "CUT · By source · By track",
            "FUNNEL · Visit → Register",
          ],
          caption: "Software & Data · KPIs",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-5",
        order: 5,
        title: "Explore patterns",
        description: "Hypothesize what the data might show.",
        content:
          "Write 3 hypotheses (e.g. “Instagram converts better than email among mobile users”). For each, note what chart you would use to check it.",
        phrases: [
          {
            text: "Write 3 hypotheses",
            color: "amber",
            note: "Deliverable count",
          },
          {
            text: "“Instagram converts better than email among mobile users”",
            color: "sky",
            note: "Example hypothesis",
          },
          {
            text: "what chart you would use to check it",
            color: "teal",
            note: "Validation method",
          },
        ],
        filename: "hypothesis-board.svg",
        board: {
          title: "Exploration board",
          lines: [
            "H1 · Instagram > email on mobile?",
            "H2 · Track mix skews conversion?",
            "CHART · Bars · lines · segmented tables",
          ],
          caption: "Software & Data · patterns",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-6",
        order: 6,
        title: "Build a mini dashboard layout",
        description: "Sketch the stakeholder view.",
        content:
          "Describe a 4-panel dashboard: KPI strip, source comparison bar chart, track breakdown, and a daily trend line. One sentence per panel on what decision it supports.",
        phrases: [
          {
            text: "KPI strip, source comparison bar chart, track breakdown, and a daily trend line",
            color: "teal",
            note: "Four panels",
          },
          {
            text: "what decision it supports",
            color: "amber",
            note: "Decision link",
          },
        ],
        filename: "dashboard-layout-board.svg",
        board: {
          title: "Mini dashboard",
          lines: [
            "PANEL A · KPI strip",
            "PANEL B · Source bars · Track mix",
            "PANEL C · Daily trend line",
          ],
          caption: "Software & Data · stakeholder view",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-7",
        order: 7,
        title: "Draft insights",
        description: "Turn numbers into action.",
        content:
          "Write 3 insights in the format: Observation → Implication → Recommended action. Keep each under 2 sentences.",
        phrases: [
          {
            text: "Observation → Implication → Recommended action",
            color: "teal",
            note: "Insight formula",
          },
          {
            text: "Keep each under 2 sentences",
            color: "amber",
            note: "Brevity rule",
          },
        ],
        filename: "insights-board.svg",
        board: {
          title: "Insight cards",
          lines: [
            "SEE · Observation from the chart",
            "SO · Implication for the business",
            "DO · Recommended action next",
          ],
          caption: "Software & Data · action insights",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-8",
        order: 8,
        title: "Flag risks & limitations",
        description: "Show mature analytical judgment.",
        content:
          "List limitations: sample size, tracking gaps, seasonality, selection bias. For each, say how it affects confidence in your recommendation.",
        phrases: [
          {
            text: "sample size, tracking gaps, seasonality, selection bias",
            color: "rose",
            note: "Limitation set",
          },
          {
            text: "how it affects confidence in your recommendation",
            color: "amber",
            note: "Confidence impact",
          },
        ],
        filename: "limitations-board.svg",
        board: {
          title: "Risk & limits",
          lines: [
            "SAMPLE · Too small to overclaim?",
            "TRACKING · Missing attribution gaps",
            "BIAS · Seasonality · selection effects",
          ],
          caption: "Software & Data · caveats",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
      richStep({
        id: "s-9",
        order: 9,
        title: "Ship the insight memo",
        description: "Package the work for a non-technical manager.",
        content:
          "Write a short memo: Goal, Method (2 lines), Top 3 findings, Recommendation, Next experiment. This is your completion deliverable.",
        phrases: [
          {
            text: "Goal, Method (2 lines), Top 3 findings, Recommendation, Next experiment",
            color: "teal",
            note: "Memo outline",
          },
          {
            text: "completion deliverable",
            color: "amber",
            note: "Final package",
          },
        ],
        filename: "insight-memo-board.svg",
        board: {
          title: "Insight memo",
          lines: [
            "GOAL · Method · Top 3 findings",
            "RECOMMEND · Clear next action",
            "NEXT · One experiment to run",
          ],
          caption: "Software & Data · ship it",
          colors: SOFTWARE_COLORS,
          accent: "#023e8a",
        },
      }),
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
      richStep({
        id: "f-1",
        order: 1,
        title: "Frame the decision",
        description: "State what leadership needs to decide.",
        content:
          "Leadership question: Should Juvenis Maxime launch a paid “Job Sim Weekend” product next quarter?\n\nWrite the decision statement and the 2–3 criteria that would make “yes” the right call.",
        phrases: [
          {
            text: "Should Juvenis Maxime launch a paid “Job Sim Weekend” product next quarter?",
            color: "amber",
            note: "The go / no-go question",
          },
          {
            text: "2–3 criteria that would make “yes” the right call",
            color: "teal",
            note: "Define decision criteria",
          },
        ],
        filename: "decision-frame-board.svg",
        board: {
          title: "Decision frame",
          lines: [
            "ASK · Launch paid Job Sim Weekend?",
            "CRITERIA · Margin · Demand · Brand fit",
            "OUTPUT · Go / Hold / Kill + pilot plan",
          ],
          caption: "Business & Finance · Juvenis Maxime",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-2",
        order: 2,
        title: "Map revenue drivers",
        description: "Identify how money comes in.",
        content:
          "List revenue inputs: ticket price, seats per cohort, cohorts per quarter, expected fill rate, and optional add-ons (portfolio review). Note which lever has the biggest upside.",
        phrases: [
          {
            text: "ticket price, seats per cohort, cohorts per quarter, expected fill rate",
            color: "teal",
            note: "Core revenue levers",
          },
          {
            text: "optional add-ons (portfolio review)",
            color: "sky",
            note: "Upsell lever",
          },
          {
            text: "biggest upside",
            color: "amber",
            note: "Prioritize one lever",
          },
        ],
        filename: "revenue-drivers-board.svg",
        board: {
          title: "Revenue drivers",
          lines: [
            "PRICE · Ticket + add-ons",
            "VOLUME · Seats · Cohorts · Fill %",
            "UPSIDE · Which lever moves most?",
          ],
          caption: "Finance · revenue map",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-3",
        order: 3,
        title: "Map cost structure",
        description: "Separate fixed vs variable costs.",
        content:
          "Categorize costs: venue, facilitators, materials, ads, CRM tools, student support. Mark each as fixed or variable per cohort. Flag one cost you could reduce first.",
        phrases: [
          {
            text: "venue, facilitators, materials, ads, CRM tools, student support",
            color: "sky",
            note: "Cost categories",
          },
          {
            text: "fixed or variable per cohort",
            color: "teal",
            note: "Cost type split",
          },
          {
            text: "one cost you could reduce first",
            color: "amber",
            note: "Quick win",
          },
        ],
        filename: "cost-structure-board.svg",
        board: {
          title: "Cost structure",
          lines: [
            "FIXED · Venue · CRM tools",
            "VARIABLE · Facilitators · materials · ads",
            "CUT FIRST · Pick one reduction lever",
          ],
          caption: "Finance · cost map",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-4",
        order: 4,
        title: "Build a simple unit model",
        description: "Calculate contribution per seat.",
        content:
          "Assume: ticket = 1,200,000 VND; variable cost/seat = 450,000 VND; fixed cost/cohort = 8,000,000 VND; seats = 25; fill = 80%.\n\nCompute contribution margin per seat and break-even seats. Show your arithmetic briefly.",
        phrases: [
          {
            text: "ticket = 1,200,000 VND; variable cost/seat = 450,000 VND; fixed cost/cohort = 8,000,000 VND",
            color: "amber",
            note: "Model inputs",
          },
          {
            text: "contribution margin per seat and break-even seats",
            color: "teal",
            note: "What to compute",
          },
        ],
        filename: "unit-model-board.svg",
        board: {
          title: "Unit economics",
          lines: [
            "TICKET 1.2M · VAR 0.45M / seat",
            "FIXED 8M / cohort · 25 seats · 80% fill",
            "FIND · CM / seat · break-even seats",
          ],
          caption: "Finance · base model",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-5",
        order: 5,
        title: "Run a sensitivity check",
        description: "See what happens if assumptions move.",
        content:
          "Test 3 scenarios: optimistic (+15% fill), base, pessimistic (−20% fill or −10% price). Note which assumption breaks profitability first.",
        phrases: [
          {
            text: "optimistic (+15% fill), base, pessimistic (−20% fill or −10% price)",
            color: "sky",
            note: "Three scenarios",
          },
          {
            text: "which assumption breaks profitability first",
            color: "rose",
            note: "Stress find",
          },
        ],
        filename: "sensitivity-board.svg",
        board: {
          title: "Sensitivity check",
          lines: [
            "OPT · +15% fill",
            "BASE · Current assumptions",
            "PESS · −20% fill or −10% price",
          ],
          caption: "Finance · stress test",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-6",
        order: 6,
        title: "Assess risk",
        description: "Identify operational and market risks.",
        content:
          "List top risks: demand risk, facilitator availability, brand fit, refund policy. For each, propose one mitigation.",
        phrases: [
          {
            text: "demand risk, facilitator availability, brand fit, refund policy",
            color: "rose",
            note: "Risk list",
          },
          {
            text: "propose one mitigation",
            color: "teal",
            note: "Action per risk",
          },
        ],
        filename: "risk-board.svg",
        board: {
          title: "Risk register",
          lines: [
            "DEMAND · Facilitator supply",
            "BRAND FIT · Refund policy",
            "MITIGATE · One action each",
          ],
          caption: "Finance · risk map",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-7",
        order: 7,
        title: "Recommend a pilot",
        description: "Propose a low-risk first launch.",
        content:
          "Design a 1-cohort pilot: target audience, ticket price, success metrics (fill rate, NPS, cost variance), and go/no-go threshold after the pilot.",
        phrases: [
          {
            text: "1-cohort pilot",
            color: "amber",
            note: "Scope limit",
          },
          {
            text: "fill rate, NPS, cost variance",
            color: "sky",
            note: "Pilot metrics",
          },
          {
            text: "go/no-go threshold",
            color: "teal",
            note: "Decision gate",
          },
        ],
        filename: "pilot-board.svg",
        board: {
          title: "Pilot design",
          lines: [
            "SCOPE · 1 cohort only",
            "METRICS · Fill · NPS · Cost variance",
            "GATE · Go / No-go threshold",
          ],
          caption: "Finance · low-risk launch",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-8",
        order: 8,
        title: "Prepare the decision slide",
        description: "Summarize for a 3-minute leadership update.",
        content:
          "Outline one slide: Decision asked, Base-case economics, Risks, Pilot ask (budget + timeline), Recommended call (Go / Hold / Kill).",
        phrases: [
          {
            text: "Decision asked, Base-case economics, Risks, Pilot ask (budget + timeline)",
            color: "sky",
            note: "Slide blocks",
          },
          {
            text: "Recommended call (Go / Hold / Kill)",
            color: "teal",
            note: "Clear recommendation",
          },
        ],
        filename: "decision-slide-board.svg",
        board: {
          title: "Leadership slide",
          lines: [
            "ASK · Base-case economics",
            "RISKS · Pilot ask (budget + time)",
            "CALL · Go / Hold / Kill",
          ],
          caption: "Finance · 3-minute update",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
      richStep({
        id: "f-9",
        order: 9,
        title: "Deliver the recommendation",
        description: "Close with a clear yes/no and next step.",
        content:
          "Write a final recommendation paragraph (max 80 words) stating your call, the key number that drove it, and the immediate next action for the team.",
        phrases: [
          {
            text: "max 80 words",
            color: "amber",
            note: "Length limit",
          },
          {
            text: "your call, the key number that drove it, and the immediate next action",
            color: "teal",
            note: "Must include these three",
          },
        ],
        filename: "final-call-board.svg",
        board: {
          title: "Final recommendation",
          lines: [
            "CALL · Yes / No with conviction",
            "NUMBER · The metric that decided it",
            "NEXT · Immediate team action",
          ],
          caption: "Finance · close the loop",
          colors: FINANCE_COLORS,
          accent: "#1b4332",
        },
      }),
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
