import type { HighlightColor, TextHighlight, Step } from "./types";

export const HIGHLIGHT_COLORS: {
  id: HighlightColor;
  label: string;
  swatch: string;
  mark: string;
}[] = [
  {
    id: "amber",
    label: "Key point",
    swatch: "bg-amber-300",
    mark: "bg-amber-200/90 text-navy",
  },
  {
    id: "teal",
    label: "Action",
    swatch: "bg-teal-bright",
    mark: "bg-teal-bright/35 text-navy",
  },
  {
    id: "rose",
    label: "Caution",
    swatch: "bg-rose-300",
    mark: "bg-rose-200/90 text-navy",
  },
  {
    id: "sky",
    label: "Tip",
    swatch: "bg-sky-300",
    mark: "bg-sky-200/90 text-navy",
  },
];

export function normalizeStep(step: Step): Step {
  return {
    ...step,
    highlights: step.highlights ?? [],
    media: step.media ?? [],
  };
}

export function clampHighlights(
  content: string,
  highlights: TextHighlight[],
): TextHighlight[] {
  const len = content.length;
  return highlights
    .map((h) => ({
      ...h,
      start: Math.max(0, Math.min(h.start, len)),
      end: Math.max(0, Math.min(h.end, len)),
    }))
    .filter((h) => h.end > h.start)
    .sort((a, b) => a.start - b.start || a.end - b.end);
}

/** Drop highlights that overlap the new range, then insert it. */
export function addHighlightRange(
  highlights: TextHighlight[],
  start: number,
  end: number,
  color: HighlightColor,
  note?: string,
): TextHighlight[] {
  if (end <= start) return highlights;
  const kept = highlights.filter((h) => h.end <= start || h.start >= end);
  return [
    ...kept,
    {
      id: `hl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      start,
      end,
      color,
      note,
    },
  ].sort((a, b) => a.start - b.start);
}

export function removeHighlightsInRange(
  highlights: TextHighlight[],
  start: number,
  end: number,
): TextHighlight[] {
  if (end <= start) return highlights;
  return highlights.filter((h) => h.end <= start || h.start >= end);
}

export type ContentSegment =
  | { type: "text"; text: string }
  | { type: "mark"; text: string; color: HighlightColor; note?: string; id: string };

export function segmentContent(
  content: string,
  highlights: TextHighlight[] = [],
): ContentSegment[] {
  const sorted = clampHighlights(content, highlights);
  if (!content) return [];
  if (sorted.length === 0) return [{ type: "text", text: content }];

  const segments: ContentSegment[] = [];
  let cursor = 0;

  for (const h of sorted) {
    if (h.start < cursor) continue;
    if (h.start > cursor) {
      segments.push({ type: "text", text: content.slice(cursor, h.start) });
    }
    segments.push({
      type: "mark",
      text: content.slice(h.start, h.end),
      color: h.color,
      note: h.note,
      id: h.id,
    });
    cursor = h.end;
  }

  if (cursor < content.length) {
    segments.push({ type: "text", text: content.slice(cursor) });
  }

  return segments;
}

export function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
