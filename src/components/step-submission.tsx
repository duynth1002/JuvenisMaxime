"use client";

import { FileImage, Paperclip, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui";
import type { StepSubmission, StepSubmissionMedia } from "@/lib/types";

const MAX_FILE_BYTES = 1.5 * 1024 * 1024;
const ACCEPTED =
  "image/*,application/pdf,text/plain,.doc,.docx,.ppt,.pptx,.xls,.xlsx";

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

async function readFileAsMedia(file: File): Promise<StepSubmissionMedia> {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("File is too large. Keep uploads under 1.5 MB for this demo.");
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

export function SubmissionWorkView({
  submission,
  label = "Submitted work",
}: {
  submission: StepSubmission;
  label?: string;
}) {
  const media = submission.media;
  const isImage = media?.type.startsWith("image/");

  return (
    <div className="rounded-2xl border border-line bg-sand/40 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink">
        {submission.response}
      </p>
      {media ? (
        <div className="mt-4 rounded-xl border border-line bg-surface/80 p-3">
          <div className="flex items-center gap-2 text-sm text-navy">
            {isImage ? (
              <FileImage className="h-4 w-4 text-teal" />
            ) : (
              <Paperclip className="h-4 w-4 text-teal" />
            )}
            <span className="min-w-0 truncate font-medium">{media.name}</span>
            <span className="shrink-0 text-xs text-muted">
              {formatBytes(media.size)}
            </span>
          </div>
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.dataUrl}
              alt={media.name}
              className="mt-3 max-h-64 w-full rounded-lg object-contain bg-sand"
            />
          ) : (
            <a
              href={media.dataUrl}
              download={media.name}
              className="mt-3 inline-flex text-sm text-teal underline-offset-2 hover:underline"
            >
              Download attachment
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function StepSubmissionForm({
  onSubmit,
  submittingLabel,
  initialResponse = "",
}: {
  onSubmit: (submission: StepSubmission) => void;
  submittingLabel: string;
  initialResponse?: string;
}) {
  const inputId = useId();
  const [response, setResponse] = useState(initialResponse);
  const [media, setMedia] = useState<StepSubmissionMedia | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setResponse(initialResponse);
    setMedia(undefined);
    setError(null);
  }, [initialResponse]);

  async function onFileChange(file: File | null) {
    setError(null);
    if (!file) {
      setMedia(undefined);
      return;
    }
    try {
      setBusy(true);
      setMedia(await readFileAsMedia(file));
    } catch (err) {
      setMedia(undefined);
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = response.trim();
    if (!trimmed) {
      setError("Write a short response before submitting.");
      return;
    }
    onSubmit({ response: trimmed, media });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-2xl border border-line bg-surface/90 p-5"
    >
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-xl text-navy">
          Submit your work
        </h3>
        <p className="mt-1 text-sm text-muted">
          Share your response and optionally attach an image or document for
          admin review.
        </p>
      </div>

      <label className="block text-xs font-medium uppercase tracking-wide text-muted">
        Your response
        <textarea
          className="mt-1.5 min-h-32 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm leading-relaxed text-navy outline-none focus:border-teal"
          placeholder="Write what you completed for this step…"
          value={response}
          onChange={(e) => {
            setResponse(e.target.value);
            if (error) setError(null);
          }}
          required
        />
      </label>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Attachment (optional)
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-3">
          <label
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-sand/40 px-3 py-2 text-sm text-navy hover:bg-sand-deep/70"
          >
            <Paperclip className="h-4 w-4 text-teal" />
            {busy ? "Reading file…" : "Upload media / file"}
          </label>
          <input
            id={inputId}
            type="file"
            className="sr-only"
            accept={ACCEPTED}
            disabled={busy}
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          <span className="text-xs text-muted">Max 1.5 MB · demo localStorage</span>
        </div>

        {media ? (
          <div className="mt-3 flex items-start gap-3 rounded-xl border border-line bg-sand/50 px-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-navy">{media.name}</p>
              <p className="text-xs text-muted">
                {media.type || "file"} · {formatBytes(media.size)}
              </p>
              {media.type.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.dataUrl}
                  alt={media.name}
                  className="mt-2 max-h-40 rounded-lg object-contain"
                />
              ) : null}
            </div>
            <button
              type="button"
              className="rounded-md p-1.5 text-muted hover:bg-warning/10 hover:text-warning"
              aria-label="Remove attachment"
              onClick={() => setMedia(undefined)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-xl bg-warning/10 px-3 py-2 text-sm text-warning">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={busy || !response.trim()}>
        {submittingLabel}
      </Button>
    </form>
  );
}
