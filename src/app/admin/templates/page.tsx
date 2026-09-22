"use client";

import Link from "next/link";
import { AuthGate } from "@/components/auth";
import { TemplateLibraryCard } from "@/components/template-card";
import { Button } from "@/components/ui";
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
            Each career track has its own color story — create new simulations
            or open a builder to customize steps, highlights, and media.
          </p>
        </div>
        <Link href="/admin/templates/new">
          <Button>Create template</Button>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/admin/templates/new"
          className="flex min-h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-gradient-to-br from-surface via-sand/40 to-teal/10 p-5 text-center transition hover:-translate-y-0.5 hover:border-teal hover:shadow-lg"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-xl font-semibold text-sand">
            +
          </span>
          <span className="mt-4 font-[family-name:var(--font-display)] text-xl text-navy">
            New template
          </span>
          <span className="mt-2 max-w-xs text-sm text-muted">
            Start from a blank checklist and build colorful, interactive steps.
          </span>
        </Link>

        {templates.map((template) => (
          <TemplateLibraryCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
