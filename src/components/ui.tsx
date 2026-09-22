import Link from "next/link";
import type { ReactNode } from "react";

export function BrandMark({
  href = "/",
  light = false,
}: {
  href?: string;
  light?: boolean;
}) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2.5">
      <span
        className={`grid h-9 w-9 place-items-center rounded-md text-sm font-semibold tracking-tight transition group-hover:scale-[1.03] ${
          light
            ? "bg-teal-bright text-navy-deep"
            : "bg-navy text-sand"
        }`}
      >
        JM
      </span>
      <span className="leading-tight">
        <span
          className={`block font-[family-name:var(--font-display)] text-lg tracking-tight ${
            light ? "text-sand" : "text-navy"
          }`}
        >
          Juvenis Maxime
        </span>
        <span
          className={`block text-[11px] uppercase tracking-[0.18em] ${
            light ? "text-sand/70" : "text-muted"
          }`}
        >
          Job Simulation
        </span>
      </span>
    </Link>
  );
}

export function Shell({
  children,
  nav,
  footer,
}: {
  children: ReactNode;
  nav?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grain relative flex min-h-screen flex-col">
      <header className="relative z-10 border-b border-line/70 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <BrandMark />
          {nav}
        </div>
      </header>
      <main className="relative z-10 flex-1">{children}</main>
      {footer ? (
        <footer className="relative z-10 border-t border-line/70 bg-surface/60">
          <div className="mx-auto max-w-6xl px-5 py-4 text-sm text-muted">
            {footer}
          </div>
        </footer>
      ) : null}
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line/80 bg-surface/90 shadow-[0_18px_50px_-28px_rgba(12,35,64,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const styles = {
    primary:
      "bg-navy text-sand hover:bg-navy-deep shadow-sm shadow-navy/20",
    secondary:
      "bg-teal text-sand hover:bg-teal-bright hover:text-navy-deep",
    ghost: "bg-transparent text-navy hover:bg-sand-deep/70 border border-line",
    danger: "bg-warning/15 text-warning hover:bg-warning/25",
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ProgressBar({
  value,
  total,
  label,
  barClassName = "from-teal to-teal-bright",
}: {
  value: number;
  total: number;
  label?: string;
  barClassName?: string;
}) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{label ?? "Progress"}</span>
        <span className="font-medium text-navy">
          {value}/{total} · {pct}%
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-sand-deep">
        <div
          className={`progress-bar-fill h-full rounded-full bg-gradient-to-r ${barClassName}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "teal" | "success" | "warning";
}) {
  const tones = {
    neutral: "bg-sand-deep text-muted",
    teal: "bg-teal/10 text-teal",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  }[tone];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface/50 px-6 py-10 text-center">
      <h3 className="font-[family-name:var(--font-display)] text-xl text-navy">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
    </div>
  );
}
