"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthGate } from "@/components/auth";
import { Button, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";

const TRACK_OPTIONS = [
  "Marketing",
  "Software & Data",
  "Business & Finance",
  "Design",
  "Operations",
  "General",
];

export default function NewTemplatePage() {
  return (
    <AuthGate role="admin" redirectTo="/admin/login">
      <NewTemplateForm />
    </AuthGate>
  );
}

function NewTemplateForm() {
  const { createTemplate } = useStore();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [track, setTrack] = useState(TRACK_OPTIONS[0]);
  const [customTrack, setCustomTrack] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(60);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const resolvedTrack =
      track === "Custom" ? customTrack.trim() : track.trim();
    if (!title.trim()) {
      setError("Give the template a title.");
      return;
    }
    if (!resolvedTrack) {
      setError("Choose or enter a career track.");
      return;
    }

    const id = createTemplate({
      title: title.trim(),
      track: resolvedTrack,
      description: description.trim(),
      estimatedMinutes,
    });
    router.push(`/admin/templates/${id}/edit`);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            New template
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-navy sm:text-4xl">
            Create task template
          </h1>
          <p className="mt-2 text-sm text-muted">
            Set the basics, then continue into the drag-and-drop step builder.
          </p>
        </div>
        <Link href="/admin/templates">
          <Button variant="ghost">Back to library</Button>
        </Link>
      </div>

      <Panel className="p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Title
            <input
              className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
              placeholder="e.g. Product Launch Simulation"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              autoFocus
            />
          </label>

          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Career track
            <select
              className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
            >
              {TRACK_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="Custom">Custom…</option>
            </select>
          </label>

          {track === "Custom" ? (
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              Custom track name
              <input
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
                placeholder="e.g. Healthcare"
                value={customTrack}
                onChange={(e) => {
                  setCustomTrack(e.target.value);
                  if (error) setError(null);
                }}
              />
            </label>
          ) : null}

          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Description
            <textarea
              className="mt-1.5 min-h-28 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm leading-relaxed text-navy outline-none focus:border-teal"
              placeholder="What will students practice in this simulation?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Estimated minutes
            <input
              type="number"
              min={15}
              step={5}
              className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
              value={estimatedMinutes}
              onChange={(e) =>
                setEstimatedMinutes(Number(e.target.value) || 60)
              }
            />
          </label>

          {error ? (
            <p className="rounded-xl bg-warning/10 px-3 py-2 text-sm text-warning">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button type="submit">Create & open builder</Button>
            <Link href="/admin/templates">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Panel>
    </div>
  );
}
