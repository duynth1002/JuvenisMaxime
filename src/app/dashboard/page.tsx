"use client";

import Link from "next/link";
import { AuthGate, ResetDemoButton } from "@/components/auth";
import { Badge, Button, EmptyState, Panel, ProgressBar } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function StudentDashboardPage() {
  return (
    <AuthGate role="student" redirectTo="/login">
      <StudentDashboard />
    </AuthGate>
  );
}

function StudentDashboard() {
  const {
    session,
    getStudentAssignments,
    getTemplate,
    students,
    approvals,
  } = useStore();
  if (!session || session.role !== "student") return null;

  const assignments = getStudentAssignments(session.studentId);
  const student = students.find((s) => s.id === session.studentId);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Welcome back
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-navy sm:text-4xl">
            {session.name}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {student?.track} track · your assigned job simulations
          </p>
        </div>
        <ResetDemoButton />
      </div>

      {assignments.length === 0 ? (
        <EmptyState
          title="No tasks assigned yet"
          body="Ask an admin to assign a template from the admin dashboard."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {assignments.map((assignment) => {
            const template = getTemplate(assignment.templateId);
            if (!template) return null;
            const done = assignment.completedStepIds.length;
            const total = template.steps.length;
            const pending = approvals.some(
              (r) =>
                r.assignmentId === assignment.id && r.status === "pending",
            );
            return (
              <Panel key={assignment.id} className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        tone={
                          assignment.status === "completed"
                            ? "success"
                            : assignment.status === "in_progress"
                              ? "teal"
                              : "neutral"
                        }
                      >
                        {assignment.status.replace("_", " ")}
                      </Badge>
                      {pending ? (
                        <Badge tone="warning">awaiting approval</Badge>
                      ) : null}
                    </div>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-navy">
                      {template.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {template.description}
                    </p>
                  </div>
                </div>
                <ProgressBar value={done} total={total} label="Checklist" />
                <div className="mt-5">
                  <Link href={`/task/${assignment.id}`}>
                    <Button className="w-full sm:w-auto">
                      {assignment.status === "completed"
                        ? "Review task"
                        : pending
                          ? "View pending step"
                          : assignment.status === "in_progress"
                            ? "Continue simulation"
                            : "Start simulation"}
                    </Button>
                  </Link>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}
