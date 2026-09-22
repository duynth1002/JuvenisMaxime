"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginLayout } from "@/components/auth";
import { Button, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function StudentLoginPage() {
  const { students, loginStudent, hydrated } = useStore();
  const [studentId, setStudentId] = useState("student-1");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    loginStudent(studentId);
    router.push("/dashboard");
  }

  return (
    <LoginLayout
      title="Student login"
      subtitle="Mock auth — pick a demo student and continue."
    >
      <Panel className="p-5 sm:p-6">
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Demo student
            <select
              className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={!hydrated}
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {s.track}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" className="w-full" disabled={!hydrated}>
            Continue to my tasks
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          Admin?{" "}
          <Link
            href="/admin/login"
            className="text-teal underline-offset-2 hover:underline"
          >
            Go to admin login
          </Link>
        </p>
      </Panel>
    </LoginLayout>
  );
}
