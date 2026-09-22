"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AuthGate } from "@/components/auth";
import { TaskWorkspace } from "@/components/task-workspace";
import { Button, EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function PreviewTemplatePage() {
  return (
    <AuthGate role="admin" redirectTo="/admin/login">
      <PreviewTemplate />
    </AuthGate>
  );
}

function PreviewTemplate() {
  const params = useParams<{ id: string }>();
  const { getTemplate } = useStore();
  const template = getTemplate(params.id);

  if (!template) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <EmptyState
          title="Template not found"
          body="This template id is missing from the demo data."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Student preview
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-navy">
            {template.title}
          </h1>
        </div>
        <Link href={`/admin/templates/${template.id}/edit`}>
          <Button variant="ghost">Back to builder</Button>
        </Link>
      </div>
      <TaskWorkspace template={template} preview />
    </div>
  );
}
