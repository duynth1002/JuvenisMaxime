export type HighlightColor = "amber" | "teal" | "rose" | "sky";

export type TextHighlight = {
  id: string;
  start: number;
  end: number;
  color: HighlightColor;
  note?: string;
};

export type StepMedia = {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  caption?: string;
};

export type Step = {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  highlights?: TextHighlight[];
  media?: StepMedia[];
};

export type TaskTemplate = {
  id: string;
  title: string;
  track: string;
  description: string;
  estimatedMinutes: number;
  steps: Step[];
};

export type Student = {
  id: string;
  name: string;
  email: string;
  track: string;
};

export type Assignment = {
  id: string;
  studentId: string;
  templateId: string;
  assignedAt: string;
  completedStepIds: string[];
  status: "assigned" | "in_progress" | "completed";
};

export type StepSubmissionMedia = {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
};

export type StepSubmission = {
  response: string;
  media?: StepSubmissionMedia;
};

export type ApprovalRequest = {
  id: string;
  assignmentId: string;
  studentId: string;
  templateId: string;
  stepId: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  note?: string;
  submission: StepSubmission;
};

export type SessionUser =
  | { role: "admin"; name: string }
  | { role: "student"; studentId: string; name: string };

export type AppState = {
  templates: TaskTemplate[];
  students: Student[];
  assignments: Assignment[];
  approvals: ApprovalRequest[];
  session: SessionUser | null;
};
