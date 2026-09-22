"use client";

import {
  CheckCircle2,
  Circle,
  Clock3,
  Lock,
  PlayCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  StepSubmissionForm,
  SubmissionWorkView,
} from "@/components/step-submission";
import { Badge, Button, Panel, ProgressBar } from "@/components/ui";
import { useStore } from "@/lib/store";
import type { Assignment, StepSubmission, TaskTemplate } from "@/lib/types";

type StepUiStatus =
  | "complete"
  | "pending"
  | "active"
  | "locked"
  | "available";

function stepStatus(
  stepId: string,
  order: number,
  steps: TaskTemplate["steps"],
  completedIds: string[],
  pendingStepId?: string | null,
): StepUiStatus {
  if (completedIds.includes(stepId)) return "complete";
  if (pendingStepId === stepId) return "pending";
  const sorted = [...steps].sort((a, b) => a.order - b.order);
  const firstIncomplete = sorted.find((s) => !completedIds.includes(s.id));
  if (firstIncomplete?.id === stepId) return "active";
  if (order > (firstIncomplete?.order ?? Infinity)) return "locked";
  return "available";
}

export function TaskWorkspace({
  assignment,
  template,
  preview = false,
}: {
  assignment?: Assignment;
  template: TaskTemplate;
  preview?: boolean;
}) {
  const { submitStepForApproval, getStepApproval, approvals } = useStore();
  const router = useRouter();
  const steps = useMemo(
    () => [...template.steps].sort((a, b) => a.order - b.order),
    [template.steps],
  );
  const completedIds = assignment?.completedStepIds ?? [];

  const pendingForAssignment = useMemo(() => {
    if (!assignment) return null;
    return (
      approvals.find(
        (r) => r.assignmentId === assignment.id && r.status === "pending",
      ) ?? null
    );
  }, [approvals, assignment]);

  const firstActive =
    steps.find((s) => !completedIds.includes(s.id))?.id ?? steps[0]?.id;

  const [activeId, setActiveId] = useState<string | null>(firstActive ?? null);
  const active = steps.find((s) => s.id === activeId) ?? steps[0];

  const completedCount = steps.filter((s) =>
    completedIds.includes(s.id),
  ).length;
  const allDone =
    !preview &&
    steps.length > 0 &&
    steps.every((s) => completedIds.includes(s.id));

  const activeApproval =
    assignment && active
      ? getStepApproval(assignment.id, active.id)
      : undefined;

  const canSubmit =
    !preview &&
    !!assignment &&
    !!active &&
    !completedIds.includes(active.id) &&
    activeApproval?.status !== "pending" &&
    stepStatus(
      active.id,
      active.order,
      steps,
      completedIds,
      pendingForAssignment?.stepId,
    ) !== "locked";

  function selectStep(stepId: string, status: StepUiStatus) {
    if (status === "locked" && !preview) return;
    setActiveId(stepId);
  }

  function handleSubmit(submission: StepSubmission) {
    if (!assignment || !active || preview) return;
    submitStepForApproval(assignment.id, active.id, submission);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <Panel className="h-fit p-4">
        <div className="mb-4 space-y-3">
          <div>
            <Badge tone="teal">{template.track}</Badge>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-navy">
              {template.title}
            </h2>
          </div>
          <ProgressBar value={completedCount} total={steps.length} />
          {pendingForAssignment ? (
            <p className="rounded-xl bg-warning/10 px-3 py-2 text-xs text-warning">
              Waiting for admin approval before the next step unlocks.
            </p>
          ) : null}
        </div>
        <ol className="space-y-2">
          {steps.map((step) => {
            const status = preview
              ? step.id === active?.id
                ? "active"
                : "available"
              : stepStatus(
                  step.id,
                  step.order,
                  steps,
                  completedIds,
                  pendingForAssignment?.stepId,
                );
            const Icon =
              status === "complete"
                ? CheckCircle2
                : status === "pending"
                  ? Clock3
                  : status === "locked"
                    ? Lock
                    : status === "active"
                      ? PlayCircle
                      : Circle;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => selectStep(step.id, status)}
                  disabled={status === "locked" && !preview}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    active?.id === step.id
                      ? "border-teal bg-teal/5"
                      : "border-transparent hover:bg-sand-deep/60"
                  } ${status === "locked" && !preview ? "cursor-not-allowed opacity-55" : ""}`}
                >
                  <Icon
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      status === "complete"
                        ? "text-success"
                        : status === "pending"
                          ? "text-warning"
                          : status === "active"
                            ? "text-teal"
                            : "text-muted"
                    }`}
                  />
                  <span>
                    <span className="block text-xs text-muted">
                      Step {step.order}
                      {status === "pending" ? " · pending review" : ""}
                    </span>
                    <span className="block text-sm font-medium text-navy">
                      {step.title}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </Panel>

      <Panel className="animate-rise p-5 sm:p-8">
        {active ? (
          <>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal">
                  Step {active.order} of {steps.length}
                </p>
                <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-navy">
                  {active.title}
                </h1>
                <p className="mt-2 text-sm text-muted">{active.description}</p>
              </div>
              {preview ? <Badge tone="warning">Student preview</Badge> : null}
              {!preview && activeApproval?.status === "pending" ? (
                <Badge tone="warning">Awaiting approval</Badge>
              ) : null}
              {!preview && activeApproval?.status === "rejected" ? (
                <Badge tone="warning">Needs revision</Badge>
              ) : null}
            </div>

            <div className="rounded-2xl border border-line bg-sand/50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-ink">
                {active.content}
              </p>
            </div>

            {!preview && activeApproval?.status === "rejected" ? (
              <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
                <p className="font-medium">Admin requested changes</p>
                <p className="mt-1 opacity-90">
                  {activeApproval.note ??
                    "Please revise this step and submit again."}
                </p>
              </div>
            ) : null}

            {!preview &&
            activeApproval?.submission &&
            (activeApproval.status === "pending" ||
              activeApproval.status === "approved" ||
              completedIds.includes(active.id)) ? (
              <div className="mt-6">
                <SubmissionWorkView
                  submission={activeApproval.submission}
                  label={
                    activeApproval.status === "pending"
                      ? "Your submitted work (pending review)"
                      : "Your approved submission"
                  }
                />
              </div>
            ) : null}

            {canSubmit ? (
              <StepSubmissionForm
                key={`${assignment?.id}-${active.id}-${activeApproval?.status ?? "new"}`}
                initialResponse={
                  activeApproval?.status === "rejected"
                    ? activeApproval.submission?.response ?? ""
                    : ""
                }
                onSubmit={handleSubmit}
                submittingLabel={
                  activeApproval?.status === "rejected"
                    ? "Resubmit for approval"
                    : "Submit for approval"
                }
              />
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                {preview
                  ? "Preview mode — submission is disabled."
                  : allDone
                    ? "All steps approved and complete."
                    : activeApproval?.status === "pending"
                      ? "Submitted — waiting for an admin to approve before you can continue."
                      : canSubmit
                        ? "Complete the form above to send this step for review."
                        : "Submit work for admin approval to unlock the next step."}
              </p>
              {!preview &&
              assignment &&
              completedIds.includes(active.id) ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (allDone) {
                      router.push(`/task/${assignment.id}/complete`);
                    } else {
                      const next = steps.find(
                        (s) => !completedIds.includes(s.id),
                      );
                      if (next) setActiveId(next.id);
                    }
                  }}
                >
                  {allDone ? "View certificate" : "Continue to next step"}
                </Button>
              ) : null}
              {!preview && activeApproval?.status === "pending" ? (
                <Button variant="ghost" disabled>
                  Waiting for approval
                </Button>
              ) : null}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">No steps in this template yet.</p>
        )}
      </Panel>
    </div>
  );
}
