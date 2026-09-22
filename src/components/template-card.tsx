import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Panel } from "@/components/ui";
import { getTrackTheme } from "@/lib/track-theme";
import type { TaskTemplate } from "@/lib/types";

export function TrackChip({ track }: { track: string }) {
  const theme = getTrackTheme(track);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${theme.chip}`}
    >
      <theme.Icon className="h-3.5 w-3.5" />
      {track}
    </span>
  );
}

export function TemplateCard({
  template,
  footer,
}: {
  template: TaskTemplate;
  footer?: ReactNode;
}) {
  const theme = getTrackTheme(template.track);
  const highlightCount = template.steps.reduce(
    (n, s) => n + (s.highlights?.length ?? 0),
    0,
  );
  const mediaCount = template.steps.reduce(
    (n, s) => n + (s.media?.length ?? 0),
    0,
  );

  return (
    <Panel
      className={`relative flex flex-col overflow-hidden border ${theme.ring}`}
    >
      <div className={`relative h-28 ${theme.banner}`}>
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-sm ring-1 ring-white/30">
            <theme.Icon className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {template.steps.length} steps
          </span>
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col bg-gradient-to-b ${theme.wash} p-5`}>
        <TrackChip track={template.track} />
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl text-navy">
          {template.title}
        </h2>
        <p className="mt-2 flex-1 text-sm text-muted">{template.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted">
          <span className="rounded-full bg-surface/90 px-2.5 py-1 ring-1 ring-line/60">
            ~{template.estimatedMinutes} min
          </span>
          {highlightCount > 0 ? (
            <span className="rounded-full bg-surface/90 px-2.5 py-1 ring-1 ring-line/60">
              {highlightCount} highlights
            </span>
          ) : null}
          {mediaCount > 0 ? (
            <span className="rounded-full bg-surface/90 px-2.5 py-1 ring-1 ring-line/60">
              {mediaCount} media
            </span>
          ) : null}
        </div>
        {footer ? <div className="mt-4 flex flex-wrap gap-2">{footer}</div> : null}
      </div>
    </Panel>
  );
}

export function TemplateLibraryCard({ template }: { template: TaskTemplate }) {
  return (
    <TemplateCard
      template={template}
      footer={
        <>
          <Link href={`/admin/templates/${template.id}/edit`}>
            <Button>Edit builder</Button>
          </Link>
          <Link href={`/admin/templates/${template.id}/preview`}>
            <Button variant="ghost">Preview</Button>
          </Link>
        </>
      }
    />
  );
}

export function AssignmentTemplateCard({
  template,
  statusBadge,
  progress,
  cta,
}: {
  template: TaskTemplate;
  statusBadge: ReactNode;
  progress: ReactNode;
  cta: ReactNode;
}) {
  const theme = getTrackTheme(template.track);
  return (
    <Panel className={`relative overflow-hidden border ${theme.ring}`}>
      <div className={`h-2 ${theme.banner}`} />
      <div className={`bg-gradient-to-br ${theme.wash} p-5`}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TrackChip track={template.track} />
          {statusBadge}
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-xl text-navy">
          {template.title}
        </h2>
        <p className="mt-1 text-sm text-muted">{template.description}</p>
        <div className="mt-4">{progress}</div>
        <div className="mt-5">{cta}</div>
      </div>
    </Panel>
  );
}

export function LandingTrackRow({
  title,
  track,
  blurb,
  index,
}: {
  title: string;
  track: string;
  blurb: string;
  index: number;
}) {
  const theme = getTrackTheme(track);
  return (
    <div
      className={`relative flex items-center gap-3 overflow-hidden rounded-xl border bg-surface/90 px-3 py-3 shadow-sm ${theme.ring}`}
    >
      <div className={`absolute inset-y-0 left-0 w-1.5 ${theme.banner}`} />
      <span
        className={`ml-1 grid h-10 w-10 place-items-center rounded-xl text-sm font-semibold ${theme.tile}`}
      >
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-navy">{title}</p>
        <p className={`text-xs ${theme.accentText}`}>{blurb}</p>
      </div>
      <theme.Icon className={`h-4 w-4 shrink-0 ${theme.accentText}`} />
    </div>
  );
}

export function TrackBadge({ track }: { track: string }) {
  return <TrackChip track={track} />;
}
