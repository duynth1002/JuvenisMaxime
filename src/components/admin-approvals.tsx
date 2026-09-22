"use client";

import { Check, X } from "lucide-react";
import { SubmissionWorkView } from "@/components/step-submission";
import { Badge, Button, EmptyState, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";

export function AdminApprovalsQueue() {
  const {
    getPendingApprovals,
    students,
    getTemplate,
    approveRequest,
    rejectRequest,
  } = useStore();

  const pending = getPendingApprovals().sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );

  return (
    <Panel className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-navy">
            Approval requests
          </h2>
          <p className="mt-1 text-sm text-muted">
            Review the student’s work, then accept to unlock their next step.
          </p>
        </div>
        <Badge tone={pending.length > 0 ? "warning" : "neutral"}>
          {pending.length} pending
        </Badge>
      </div>

      {pending.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No pending reviews"
            body="When a student submits step work, it will appear here for approval."
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {pending.map((request) => {
            const student = students.find((s) => s.id === request.studentId);
            const template = getTemplate(request.templateId);
            const step = template?.steps.find((s) => s.id === request.stepId);
            return (
              <li
                key={request.id}
                className="rounded-xl border border-line bg-sand/40 px-4 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-navy">
                      {student?.name ?? "Unknown student"}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {template?.title ?? "Template"} · Step {step?.order}:{" "}
                      {step?.title ?? request.stepId}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Submitted{" "}
                      {new Date(request.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="!py-2 text-xs"
                      onClick={() => approveRequest(request.id)}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      className="!py-2 text-xs"
                      onClick={() =>
                        rejectRequest(
                          request.id,
                          "Please revise your submission and upload updated work.",
                        )
                      }
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </div>
                </div>

                {request.submission ? (
                  <div className="mt-4">
                    <SubmissionWorkView submission={request.submission} />
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted">
                    No submission details were attached.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}
