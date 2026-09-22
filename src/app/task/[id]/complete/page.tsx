"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Award } from "lucide-react";
import { AuthGate } from "@/components/auth";
import { Button, EmptyState, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function TaskCompletePage() {
  return (
    <AuthGate role="student" redirectTo="/login">
      <CompleteView />
    </AuthGate>
  );
}

function CompleteView() {
  const params = useParams<{ id: string }>();
  const { getAssignment, getTemplate, session } = useStore();
  const assignment = getAssignment(params.id);
  const template = assignment
    ? getTemplate(assignment.templateId)
    : undefined;

  if (
    !assignment ||
    !template ||
    !session ||
    session.role !== "student" ||
    assignment.studentId !== session.studentId
  ) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          title="Completion screen unavailable"
          body="Finish the checklist steps first, then return here."
        />
      </div>
    );
  }

  const done =
    template.steps.length > 0 &&
    template.steps.every((s) =>
      assignment.completedStepIds.includes(s.id),
    );

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-16 text-center">
      <Panel className="animate-rise w-full p-8 sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal text-sand">
          <Award className="h-8 w-8" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Simulation complete
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-navy sm:text-4xl">
          Nice work, {session.name}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          You completed <strong className="text-navy">{template.title}</strong>{" "}
          — {template.steps.length} steps across the {template.track} track.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-line bg-sand/60 px-5 py-6">
          <p className="font-[family-name:var(--font-display)] text-lg text-navy">
            Certificate of Simulation Practice
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
            Juvenis Maxime · Demo
          </p>
          <p className="mt-4 text-sm text-muted">
            {done
              ? "All checklist gates unlocked and marked complete."
              : "Some steps are still open — finish them to fully unlock this certificate."}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/task/${assignment.id}`}>
            <Button variant="ghost">Review steps</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Back to my tasks</Button>
          </Link>
        </div>
      </Panel>
    </div>
  );
}
