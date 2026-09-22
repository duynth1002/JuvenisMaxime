"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SEED_ASSIGNMENTS,
  SEED_STUDENTS,
  SEED_TEMPLATES,
} from "./seed-data";
import type {
  AppState,
  ApprovalRequest,
  Assignment,
  SessionUser,
  Step,
  StepSubmission,
  TaskTemplate,
} from "./types";
import { normalizeStep } from "./step-content";

const STORAGE_KEY = "jm-simulation-demo-v4";

type StoreContextValue = AppState & {
  hydrated: boolean;
  loginAdmin: (name?: string) => void;
  loginStudent: (studentId: string) => void;
  logout: () => void;
  updateTemplate: (template: TaskTemplate) => void;
  createTemplate: (input: {
    title: string;
    track: string;
    description: string;
    estimatedMinutes: number;
  }) => string;
  reorderSteps: (templateId: string, steps: Step[]) => void;
  addStep: (templateId: string) => void;
  removeStep: (templateId: string, stepId: string) => void;
  updateStep: (
    templateId: string,
    stepId: string,
    patch: Partial<Omit<Step, "id">>,
  ) => void;
  assignTemplate: (studentId: string, templateId: string) => void;
  submitStepForApproval: (
    assignmentId: string,
    stepId: string,
    submission: StepSubmission,
  ) => void;
  approveRequest: (requestId: string) => void;
  rejectRequest: (requestId: string, note?: string) => void;
  resetDemoData: () => void;
  getTemplate: (id: string) => TaskTemplate | undefined;
  getAssignment: (id: string) => Assignment | undefined;
  getStudentAssignments: (studentId: string) => Assignment[];
  getPendingApprovals: () => ApprovalRequest[];
  getStepApproval: (
    assignmentId: string,
    stepId: string,
  ) => ApprovalRequest | undefined;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function createInitialState(): AppState {
  return {
    templates: structuredClone(SEED_TEMPLATES).map((t) => ({
      ...t,
      steps: t.steps.map(normalizeStep),
    })),
    students: structuredClone(SEED_STUDENTS),
    assignments: structuredClone(SEED_ASSIGNMENTS),
    approvals: [],
    session: null,
  };
}

function loadState(): AppState {
  if (typeof window === "undefined") return createInitialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const base = createInitialState();
    return {
      ...base,
      ...parsed,
      templates: (parsed.templates ?? base.templates).map((t) => ({
        ...t,
        steps: t.steps.map(normalizeStep),
      })),
      approvals: parsed.approvals ?? [],
      session: parsed.session ?? null,
    };
  } catch {
    return createInitialState();
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createInitialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const loginAdmin = useCallback((name = "Demo Admin") => {
    setState((prev) => ({
      ...prev,
      session: { role: "admin", name },
    }));
  }, []);

  const loginStudent = useCallback(
    (studentId: string) => {
      const student = state.students.find((s) => s.id === studentId);
      if (!student) return;
      setState((prev) => ({
        ...prev,
        session: {
          role: "student",
          studentId: student.id,
          name: student.name,
        },
      }));
    },
    [state.students],
  );

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, session: null }));
  }, []);

  const updateTemplate = useCallback((template: TaskTemplate) => {
    setState((prev) => ({
      ...prev,
      templates: prev.templates.map((t) =>
        t.id === template.id ? template : t,
      ),
    }));
  }, []);

  const createTemplate = useCallback(
    (input: {
      title: string;
      track: string;
      description: string;
      estimatedMinutes: number;
    }) => {
      const id = `template-${Date.now()}`;
      const template: TaskTemplate = {
        id,
        title: input.title.trim() || "Untitled simulation",
        track: input.track.trim() || "General",
        description:
          input.description.trim() ||
          "Describe what students will practice in this simulation.",
        estimatedMinutes: Math.max(15, input.estimatedMinutes || 60),
        steps: [
          {
            id: `step-${Date.now()}`,
            order: 1,
            title: "Step 1 — Getting started",
            description: "Introduce the scenario and first deliverable.",
            content:
              "Write the instructional content students will see for this opening step.",
            highlights: [],
            media: [],
          },
        ],
      };
      setState((prev) => ({
        ...prev,
        templates: [...prev.templates, template],
      }));
      return id;
    },
    [],
  );

  const reorderSteps = useCallback((templateId: string, steps: Step[]) => {
    const ordered = steps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));
    setState((prev) => ({
      ...prev,
      templates: prev.templates.map((t) =>
        t.id === templateId ? { ...t, steps: ordered } : t,
      ),
    }));
  }, []);

  const addStep = useCallback((templateId: string) => {
    setState((prev) => ({
      ...prev,
      templates: prev.templates.map((t) => {
        if (t.id !== templateId) return t;
        const nextOrder = t.steps.length + 1;
        const step: Step = {
          id: `step-${Date.now()}`,
          title: `New step ${nextOrder}`,
          description: "Add a short description for this step.",
          content: "Write the instructional content students will see here.",
          order: nextOrder,
          highlights: [],
          media: [],
        };
        return { ...t, steps: [...t.steps, step] };
      }),
    }));
  }, []);

  const removeStep = useCallback((templateId: string, stepId: string) => {
    setState((prev) => ({
      ...prev,
      templates: prev.templates.map((t) => {
        if (t.id !== templateId) return t;
        const steps = t.steps
          .filter((s) => s.id !== stepId)
          .map((s, index) => ({ ...s, order: index + 1 }));
        return { ...t, steps };
      }),
    }));
  }, []);

  const updateStep = useCallback(
    (
      templateId: string,
      stepId: string,
      patch: Partial<Omit<Step, "id">>,
    ) => {
      setState((prev) => ({
        ...prev,
        templates: prev.templates.map((t) => {
          if (t.id !== templateId) return t;
          return {
            ...t,
            steps: t.steps.map((s) =>
              s.id === stepId ? { ...s, ...patch } : s,
            ),
          };
        }),
      }));
    },
    [],
  );

  const assignTemplate = useCallback(
    (studentId: string, templateId: string) => {
      setState((prev) => {
        const existing = prev.assignments.find(
          (a) => a.studentId === studentId && a.templateId === templateId,
        );
        if (existing) {
          return {
            ...prev,
            assignments: prev.assignments.map((a) =>
              a.id === existing.id
                ? {
                    ...a,
                    assignedAt: new Date().toISOString(),
                    completedStepIds: [],
                    status: "assigned",
                  }
                : a,
            ),
            approvals: prev.approvals.filter(
              (r) => r.assignmentId !== existing.id,
            ),
          };
        }
        const assignment: Assignment = {
          id: `assign-${Date.now()}`,
          studentId,
          templateId,
          assignedAt: new Date().toISOString(),
          completedStepIds: [],
          status: "assigned",
        };
        return { ...prev, assignments: [...prev.assignments, assignment] };
      });
    },
    [],
  );

  const submitStepForApproval = useCallback(
    (
      assignmentId: string,
      stepId: string,
      submission: StepSubmission,
    ) => {
      setState((prev) => {
        const assignment = prev.assignments.find((a) => a.id === assignmentId);
        if (!assignment) return prev;
        if (assignment.completedStepIds.includes(stepId)) return prev;

        const response = submission.response.trim();
        if (!response) return prev;

        const existingPending = prev.approvals.find(
          (r) =>
            r.assignmentId === assignmentId &&
            r.stepId === stepId &&
            r.status === "pending",
        );
        if (existingPending) return prev;

        const request: ApprovalRequest = {
          id: `approval-${Date.now()}`,
          assignmentId,
          studentId: assignment.studentId,
          templateId: assignment.templateId,
          stepId,
          status: "pending",
          submittedAt: new Date().toISOString(),
          submission: {
            response,
            media: submission.media,
          },
        };

        return {
          ...prev,
          assignments: prev.assignments.map((a) =>
            a.id === assignmentId && a.status === "assigned"
              ? { ...a, status: "in_progress" }
              : a,
          ),
          approvals: [
            ...prev.approvals.filter(
              (r) =>
                !(
                  r.assignmentId === assignmentId &&
                  r.stepId === stepId &&
                  r.status === "rejected"
                ),
            ),
            request,
          ],
        };
      });
    },
    [],
  );

  const approveRequest = useCallback((requestId: string) => {
    setState((prev) => {
      const request = prev.approvals.find((r) => r.id === requestId);
      if (!request || request.status !== "pending") return prev;

      const assignment = prev.assignments.find(
        (a) => a.id === request.assignmentId,
      );
      const template = prev.templates.find(
        (t) => t.id === request.templateId,
      );
      if (!assignment || !template) return prev;

      const completed = assignment.completedStepIds.includes(request.stepId)
        ? assignment.completedStepIds
        : [...assignment.completedStepIds, request.stepId];
      const allDone = template.steps.every((s) => completed.includes(s.id));

      return {
        ...prev,
        approvals: prev.approvals.map((r) =>
          r.id === requestId
            ? {
                ...r,
                status: "approved",
                reviewedAt: new Date().toISOString(),
              }
            : r,
        ),
        assignments: prev.assignments.map((a) =>
          a.id === request.assignmentId
            ? {
                ...a,
                completedStepIds: completed,
                status: allDone
                  ? "completed"
                  : completed.length > 0
                    ? "in_progress"
                    : "assigned",
              }
            : a,
        ),
      };
    });
  }, []);

  const rejectRequest = useCallback((requestId: string, note?: string) => {
    setState((prev) => ({
      ...prev,
      approvals: prev.approvals.map((r) =>
        r.id === requestId && r.status === "pending"
          ? {
              ...r,
              status: "rejected",
              reviewedAt: new Date().toISOString(),
              note: note || "Please revise and resubmit this step.",
            }
          : r,
      ),
    }));
  }, []);

  const resetDemoData = useCallback(() => {
    const next = createInitialState();
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const getTemplate = useCallback(
    (id: string) => state.templates.find((t) => t.id === id),
    [state.templates],
  );

  const getAssignment = useCallback(
    (id: string) => state.assignments.find((a) => a.id === id),
    [state.assignments],
  );

  const getStudentAssignments = useCallback(
    (studentId: string) =>
      state.assignments.filter((a) => a.studentId === studentId),
    [state.assignments],
  );

  const getPendingApprovals = useCallback(
    () => state.approvals.filter((r) => r.status === "pending"),
    [state.approvals],
  );

  const getStepApproval = useCallback(
    (assignmentId: string, stepId: string) => {
      const forStep = state.approvals.filter(
        (r) => r.assignmentId === assignmentId && r.stepId === stepId,
      );
      return (
        forStep.find((r) => r.status === "pending") ??
        forStep.find((r) => r.status === "rejected") ??
        forStep[forStep.length - 1]
      );
    },
    [state.approvals],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      hydrated,
      loginAdmin,
      loginStudent,
      logout,
      updateTemplate,
      createTemplate,
      reorderSteps,
      addStep,
      removeStep,
      updateStep,
      assignTemplate,
      submitStepForApproval,
      approveRequest,
      rejectRequest,
      resetDemoData,
      getTemplate,
      getAssignment,
      getStudentAssignments,
      getPendingApprovals,
      getStepApproval,
    }),
    [
      state,
      hydrated,
      loginAdmin,
      loginStudent,
      logout,
      updateTemplate,
      createTemplate,
      reorderSteps,
      addStep,
      removeStep,
      updateStep,
      assignTemplate,
      submitStepForApproval,
      approveRequest,
      rejectRequest,
      resetDemoData,
      getTemplate,
      getAssignment,
      getStudentAssignments,
      getPendingApprovals,
      getStepApproval,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useRequireSession(role?: SessionUser["role"]) {
  const store = useStore();
  return {
    ...store,
    ready: store.hydrated,
    allowed:
      store.hydrated &&
      !!store.session &&
      (!role || store.session.role === role),
  };
}
