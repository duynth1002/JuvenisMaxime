"use client";

import Link from "next/link";
import { AuthGate } from "@/components/auth";
import { Badge, Button, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function TemplatesPage() {
  return (
    <AuthGate role="admin" redirectTo="/admin/login">
      <TemplatesLibrary />
    </AuthGate>
  );
}

function TemplatesLibrary() {
  const { templates } = useStore();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Library
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-navy sm:text-4xl">
            Task templates
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Create new career-track simulations or open the builder to drag
            steps, edit content, and preview the student experience.
          </p>
        </div>
        <Link href="/admin/templates/new">
          <Button>Create template</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/admin/templates/new"
          className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/50 p-5 text-center transition hover:border-teal hover:bg-teal/5"
        >
          <span className="font-[family-name:var(--font-display)] text-xl text-navy">
            New template
          </span>
          <span className="mt-2 max-w-xs text-sm text-muted">
            Start from a blank checklist and build steps in the drag-and-drop
            editor.
          </span>
        </Link>

        {templates.map((template) => (
          <Panel key={template.id} className="flex flex-col p-5">
            <Badge tone="teal">{template.track}</Badge>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl text-navy">
              {template.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">
              {template.description}
            </p>
            <p className="mt-4 text-xs text-muted">
              {template.steps.length} steps · ~{template.estimatedMinutes} min
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/admin/templates/${template.id}/edit`}>
                <Button>Edit builder</Button>
              </Link>
              <Link href={`/admin/templates/${template.id}/preview`}>
                <Button variant="ghost">Preview</Button>
              </Link>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
