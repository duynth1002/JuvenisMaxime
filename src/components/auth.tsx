"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { BrandMark, Button, Shell } from "@/components/ui";
import { useRequireSession, useStore } from "@/lib/store";
import type { SessionUser } from "@/lib/types";

export function AuthGate({
  role,
  children,
  redirectTo,
}: {
  role: SessionUser["role"];
  children: ReactNode;
  redirectTo: string;
}) {
  const { ready, allowed, session, logout, getPendingApprovals } =
    useRequireSession(role);
  const router = useRouter();
  const pendingCount =
    role === "admin" ? getPendingApprovals().length : 0;

  useEffect(() => {
    if (ready && !allowed) router.replace(redirectTo);
  }, [ready, allowed, redirectTo, router]);

  if (!ready || !allowed || !session) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted">
        Loading demo…
      </div>
    );
  }

  const nav =
    role === "admin" ? (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-sand-deep"
        >
          Dashboard
          {pendingCount > 0 ? (
            <span className="rounded-full bg-warning px-2 py-0.5 text-[10px] font-semibold text-sand">
              {pendingCount}
            </span>
          ) : null}
        </Link>
        <Link
          href="/admin/templates"
          className="rounded-lg px-3 py-2 hover:bg-sand-deep"
        >
          Templates
        </Link>
        <span className="hidden text-muted sm:inline">{session.name}</span>
        <Button
          variant="ghost"
          className="!py-2"
          onClick={() => {
            logout();
            router.push("/admin/login");
          }}
        >
          Log out
        </Button>
      </div>
    ) : (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:bg-sand-deep">
          My tasks
        </Link>
        <span className="hidden text-muted sm:inline">{session.name}</span>
        <Button
          variant="ghost"
          className="!py-2"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Log out
        </Button>
      </div>
    );

  return (
    <Shell
      nav={nav}
      footer="Demo only — mock auth & localStorage persistence. Data stays in this browser."
    >
      {children}
    </Shell>
  );
}

export function LoginLayout({
  title,
  subtitle,
  children,
  brandHref = "/",
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  brandHref?: string;
}) {
  return (
    <div className="grain relative flex min-h-screen items-center justify-center px-5 py-12">
      <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
        <BrandMark href={brandHref} />
      </div>
      <div className="animate-rise w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ResetDemoButton() {
  const { resetDemoData } = useStore();
  return (
    <Button variant="ghost" onClick={resetDemoData} className="text-xs">
      Reset demo data
    </Button>
  );
}
