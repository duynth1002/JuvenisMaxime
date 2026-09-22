"use client";

import {
  Eraser,
  Highlighter,
  Paperclip,
  Trash2,
  Upload,
} from "lucide-react";
import { useId, useRef, useState } from "react";
import { StepContentView } from "@/components/step-content-view";
import { Button } from "@/components/ui";
import {
  HIGHLIGHT_COLORS,
  addHighlightRange,
  clampHighlights,
  formatBytes,
  removeHighlightsInRange,
} from "@/lib/step-content";
import type {
  HighlightColor,
  Step,
  StepMedia,
  TextHighlight,
} from "@/lib/types";

const MAX_FILE_BYTES = 1.5 * 1024 * 1024;
const ACCEPTED =
  "image/*,video/mp4,video/webm,application/pdf,text/plain,.doc,.docx,.ppt,.pptx";

async function readMedia(file: File): Promise<Omit<StepMedia, "id" | "caption">> {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("Keep media under 1.5 MB for this demo.");
  }
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
  return {
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    dataUrl,
  };
}

export function StepRichEditor({
  step,
  onChange,
}: {
  step: Step;
  onChange: (patch: Partial<Omit<Step, "id" | "order">>) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputId = useId();
  const [color, setColor] = useState<HighlightColor>("amber");
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(
    null,
  );
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  const highlights = step.highlights ?? [];
  const media = step.media ?? [];
  const selectedText =
    selection && selection.end > selection.start
      ? step.content.slice(selection.start, selection.end)
      : "";

  function captureSelection() {
    const el = textareaRef.current;
    if (!el) return;
    if (el.selectionStart === el.selectionEnd) {
      setSelection(null);
      return;
    }
    setSelection({ start: el.selectionStart, end: el.selectionEnd });
  }

  function updateContent(next: string) {
    onChange({
      content: next,
      highlights: clampHighlights(next, highlights),
    });
  }

  function applyHighlight() {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? selection?.start;
    const end = el?.selectionEnd ?? selection?.end;
    if (start == null || end == null || end <= start) {
      setError("Select text in the content box first, then highlight it.");
      return;
    }
    setError(null);
    const next = addHighlightRange(
      highlights,
      start,
      end,
      color,
      note.trim() || undefined,
    );
    onChange({ highlights: next });
    setNote("");
    setSelection({ start, end });
  }

  function clearSelectionHighlight() {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? selection?.start;
    const end = el?.selectionEnd ?? selection?.end;
    if (start == null || end == null || end <= start) {
      setError("Select a highlighted span (or any range) to clear.");
      return;
    }
    setError(null);
    onChange({
      highlights: removeHighlightsInRange(highlights, start, end),
    });
  }

  function removeHighlight(id: string) {
    onChange({ highlights: highlights.filter((h) => h.id !== id) });
  }

  async function onFile(file: File | null) {
    if (!file) return;
    try {
      setBusy(true);
      setError(null);
      const base = await readMedia(file);
      const item: StepMedia = {
        id: `media-${Date.now()}`,
        ...base,
        caption: "",
      };
      onChange({ media: [...media, item] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  function updateMediaCaption(id: string, caption: string) {
    onChange({
      media: media.map((m) => (m.id === id ? { ...m, caption } : m)),
    });
  }

  function removeMedia(id: string) {
    onChange({ media: media.filter((m) => m.id !== id) });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal">
            Interactive step editor
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-navy">
            Content, highlights & media
          </h2>
        </div>
        <div className="inline-flex rounded-xl border border-line bg-sand/50 p-1 text-xs">
          <button
            type="button"
            className={`rounded-lg px-3 py-1.5 ${mode === "edit" ? "bg-navy text-sand" : "text-muted"}`}
            onClick={() => setMode("edit")}
          >
            Edit
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-1.5 ${mode === "preview" ? "bg-navy text-sand" : "text-muted"}`}
            onClick={() => setMode("preview")}
          >
            Student preview
          </button>
        </div>
      </div>

      {mode === "preview" ? (
        <StepContentView step={step} showEmptyMediaHint />
      ) : (
        <>
          <div className="rounded-2xl border border-line bg-sand/30 p-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                <Highlighter className="h-3.5 w-3.5" />
                Highlight
              </span>
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.label}
                  onClick={() => setColor(c.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${
                    color === c.id
                      ? "border-navy bg-surface shadow-sm"
                      : "border-transparent hover:bg-surface/80"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${c.swatch}`} />
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mb-2 flex flex-wrap gap-2">
              <input
                className="min-w-[180px] flex-1 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs text-navy outline-none focus:border-teal"
                placeholder="Optional note on hover (e.g. Must include)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                type="button"
                className="!py-1.5 text-xs"
                onClick={applyHighlight}
              >
                Highlight selection
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="!py-1.5 text-xs"
                onClick={clearSelectionHighlight}
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear in selection
              </Button>
            </div>

            {selectedText ? (
              <p className="mb-2 truncate rounded-lg bg-surface/80 px-2.5 py-1.5 text-xs text-muted">
                Selected: “{selectedText}”
              </p>
            ) : (
              <p className="mb-2 text-xs text-muted">
                Tip: drag to select words in the text box, pick a color, then
                highlight.
              </p>
            )}

            <textarea
              ref={textareaRef}
              className="min-h-56 w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm leading-relaxed text-navy outline-none focus:border-teal"
              value={step.content}
              onChange={(e) => updateContent(e.target.value)}
              onSelect={captureSelection}
              onMouseUp={captureSelection}
              onKeyUp={captureSelection}
              placeholder="Write instructional content students will read…"
            />
          </div>

          {highlights.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Highlights ({highlights.length})
              </p>
              <ul className="space-y-2">
                {highlights.map((h: TextHighlight) => {
                  const tone = HIGHLIGHT_COLORS.find((c) => c.id === h.color);
                  const snippet = step.content.slice(h.start, h.end);
                  return (
                    <li
                      key={h.id}
                      className="flex items-start gap-2 rounded-xl border border-line bg-surface/80 px-3 py-2"
                    >
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${tone?.swatch ?? "bg-amber-300"}`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-navy">“{snippet}”</p>
                        <p className="text-xs text-muted">
                          {tone?.label ?? h.color}
                          {h.note ? ` · ${h.note}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-md p-1 text-muted hover:bg-warning/10 hover:text-warning"
                        aria-label="Remove highlight"
                        onClick={() => removeHighlight(h.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="rounded-2xl border border-line bg-sand/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                  <Paperclip className="h-3.5 w-3.5" />
                  Step media
                </p>
                <p className="mt-1 text-xs text-muted">
                  Attach images, short video, or worksheets students see in this
                  step.
                </p>
              </div>
              <label
                htmlFor={fileInputId}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-teal px-3 py-2 text-xs font-medium text-sand hover:bg-teal-bright hover:text-navy-deep"
              >
                <Upload className="h-3.5 w-3.5" />
                {busy ? "Uploading…" : "Attach media"}
              </label>
              <input
                id={fileInputId}
                type="file"
                className="sr-only"
                accept={ACCEPTED}
                disabled={busy}
                onChange={(e) => {
                  void onFile(e.target.files?.[0] ?? null);
                  e.target.value = "";
                }}
              />
            </div>

            {media.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-line bg-surface/60 px-4 py-6 text-center text-sm text-muted">
                No media yet — attach a reference image or brief worksheet.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {media.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-line bg-surface/90 p-3"
                  >
                    <div className="flex items-start gap-3">
                      {item.type.startsWith("image/") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.dataUrl}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ) : item.type.startsWith("video/") ? (
                        <video
                          src={item.dataUrl}
                          className="h-16 w-24 rounded-lg object-cover"
                          muted
                        />
                      ) : (
                        <div className="grid h-16 w-16 place-items-center rounded-lg bg-sand text-teal">
                          <Paperclip className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-navy">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted">
                          {formatBytes(item.size)}
                        </p>
                        <input
                          className="mt-2 w-full rounded-lg border border-line bg-sand/40 px-2.5 py-1.5 text-xs outline-none focus:border-teal"
                          placeholder="Caption shown to students"
                          value={item.caption ?? ""}
                          onChange={(e) =>
                            updateMediaCaption(item.id, e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-muted hover:bg-warning/10 hover:text-warning"
                        aria-label="Remove media"
                        onClick={() => removeMedia(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {error ? (
        <p className="rounded-xl bg-warning/10 px-3 py-2 text-sm text-warning">
          {error}
        </p>
      ) : null}
    </div>
  );
}
