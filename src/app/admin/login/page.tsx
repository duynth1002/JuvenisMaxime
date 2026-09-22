"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginLayout } from "@/components/auth";
import { Button, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function AdminLoginPage() {
  const { loginAdmin } = useStore();
  const [name, setName] = useState("Demo Admin");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    loginAdmin(name.trim() || "Demo Admin");
    router.push("/admin/dashboard");
  }

  return (
    <LoginLayout
      title="Admin login"
      subtitle="Mock auth — no password required for this demo."
    >
      <Panel className="p-5 sm:p-6">
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Display name
            <input
              className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <Button type="submit" className="w-full">
            Enter admin dashboard
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          Student?{" "}
          <Link
            href="/login"
            className="text-teal underline-offset-2 hover:underline"
          >
            Go to student login
          </Link>
        </p>
      </Panel>
    </LoginLayout>
  );
}
