"use client";

import { useParams } from "next/navigation";
import { AuthGate } from "@/components/auth";
import { TaskWorkspace } from "@/components/task-workspace";
import { EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function TaskPage() {
  return (
    <AuthGate role="student" redirectTo="/login">
      <TaskView />
    </AuthGate>
  );
}

function TaskView() {
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
          title="Task not available"
          body="This assignment doesn’t exist for your demo student account."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <TaskWorkspace assignment={assignment} template={template} />
    </div>
  );
}
