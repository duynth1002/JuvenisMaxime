"use client";

import { FileImage, Paperclip } from "lucide-react";
import {
  HIGHLIGHT_COLORS,
  formatBytes,
  segmentContent,
} from "@/lib/step-content";
import type { Step, StepMedia } from "@/lib/types";

function MediaCard({ item }: { item: StepMedia }) {
  const isImage = item.type.startsWith("image/");
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface/90">
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.dataUrl}
          alt={item.caption || item.name}
          className="max-h-72 w-full object-contain bg-sand"
        />
      ) : (
        <div className="flex items-center gap-3 px-4 py-5">
          <Paperclip className="h-5 w-5 text-teal" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-navy">{item.name}</p>
            <p className="text-xs text-muted">
              {item.type || "file"} · {formatBytes(item.size)}
            </p>
            <a
              href={item.dataUrl}
              download={item.name}
              className="mt-1 inline-flex text-xs text-teal underline-offset-2 hover:underline"
            >
              Download attachment
            </a>
          </div>
        </div>
      )}
      {(item.caption || isImage) && (
        <figcaption className="border-t border-line px-3 py-2 text-xs text-muted">
          {item.caption || item.name}
          {isImage ? ` · ${formatBytes(item.size)}` : ""}
        </figcaption>
      )}
    </figure>
  );
}

export function StepContentView({
  step,
  showEmptyMediaHint = false,
}: {
  step: Step;
  showEmptyMediaHint?: boolean;
}) {
  const highlights = step.highlights ?? [];
  const media = step.media ?? [];
  const segments = segmentContent(step.content, highlights);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-sand/50 p-5">
        <p className="whitespace-pre-wrap text-sm leading-7 text-ink">
          {segments.map((seg, i) => {
            if (seg.type === "text") {
              return <span key={`t-${i}`}>{seg.text}</span>;
            }
            const tone =
              HIGHLIGHT_COLORS.find((c) => c.id === seg.color)?.mark ??
              "bg-amber-200/90";
            return (
              <mark
                key={seg.id}
                title={seg.note || undefined}
                className={`rounded-sm px-0.5 ${tone}`}
              >
                {seg.text}
              </mark>
            );
          })}
        </p>
        {highlights.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {HIGHLIGHT_COLORS.filter((c) =>
              highlights.some((h) => h.color === c.id),
            ).map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[11px] text-muted"
              >
                <span className={`h-2 w-2 rounded-full ${c.swatch}`} />
                {c.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {media.length > 0 ? (
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Attached media
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {media.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : showEmptyMediaHint ? (
        <div className="rounded-xl border border-dashed border-line bg-surface/80 px-4 py-6 text-center text-sm text-muted">
          <FileImage className="mx-auto mb-2 h-5 w-5 opacity-60" />
          No media attached to this step yet.
        </div>
      ) : null}
    </div>
  );
}
