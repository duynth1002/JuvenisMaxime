"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AuthGate, ResetDemoButton } from "@/components/auth";
import { AdminApprovalsQueue } from "@/components/admin-approvals";
import { TrackChip } from "@/components/template-card";
import { Badge, Button, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";
import { getTrackTheme } from "@/lib/track-theme";

export default function AdminDashboardPage() {
  return (
    <AuthGate role="admin" redirectTo="/admin/login">
      <AdminDashboard />
    </AuthGate>
  );
}

function AdminDashboard() {
  const {
    templates,
    students,
    assignments,
    assignTemplate,
    getTemplate,
    getPendingApprovals,
  } = useStore();
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "");
  const [toast, setToast] = useState<string | null>(null);
  const pendingCount = getPendingApprovals().length;

  const rows = useMemo(
    () =>
      students.map((student) => {
        const theirs = assignments.filter((a) => a.studentId === student.id);
        return { student, theirs };
      }),
    [students, assignments],
  );

  function handleAssign() {
    if (!studentId || !templateId) return;
    assignTemplate(studentId, templateId);
    const student = students.find((s) => s.id === studentId);
    const template = templates.find((t) => t.id === templateId);
    setToast(
      `Assigned “${template?.title}” to ${student?.name}. Progress reset for this template.`,
    );
    window.setTimeout(() => setToast(null), 3500);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Admin overview
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-navy sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted">
            Review student step submissions, manage templates, and assign
            simulations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ResetDemoButton />
          <Link href="/admin/templates/new">
            <Button variant="secondary">Create template</Button>
          </Link>
          <Link href="/admin/templates">
            <Button>Template library</Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Pending approvals", value: pendingCount },
          { label: "Templates", value: templates.length },
          { label: "Students", value: students.length },
          { label: "Assignments", value: assignments.length },
        ].map((stat) => (
          <Panel key={stat.label} className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted">
              {stat.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-navy">
              {stat.value}
            </p>
          </Panel>
        ))}
      </div>

      <div className="mb-6">
        <AdminApprovalsQueue />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-navy">
            Templates
          </h2>
          <ul className="mt-4 space-y-3">
            {templates.map((t) => {
              const theme = getTrackTheme(t.track);
              return (
                <li
                  key={t.id}
                  className={`flex items-center justify-between gap-3 overflow-hidden rounded-xl border bg-gradient-to-r ${theme.wash} px-3 py-3 ${theme.ring}`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${theme.tile}`}
                    >
                      <theme.Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-navy">
                        {t.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <TrackChip track={t.track} />
                        <span className="text-xs text-muted">
                          {t.steps.length} steps
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/admin/templates/${t.id}/edit`}>
                    <Button variant="ghost" className="!py-1.5 text-xs">
                      Edit
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-navy">
            Assign template
          </h2>
          <p className="mt-1 text-sm text-muted">
            Mock action — updates local demo state only.
          </p>
          <div className="mt-4 space-y-3">
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              Student
              <select
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm outline-none focus:border-teal"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              Template
              <select
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm outline-none focus:border-teal"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </label>
            <Button onClick={handleAssign}>Assign to student</Button>
            {toast ? (
              <p className="animate-rise rounded-xl bg-success/10 px-3 py-2 text-sm text-success">
                {toast}
              </p>
            ) : null}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6 overflow-x-auto p-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-navy">
          Students
        </h2>
        <table className="mt-4 w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr className="border-b border-line">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Track</th>
              <th className="pb-2 font-medium">Assignments</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ student, theirs }) => (
              <tr key={student.id} className="border-b border-line/70">
                <td className="py-3">
                  <p className="font-medium text-navy">{student.name}</p>
                  <p className="text-xs text-muted">{student.email}</p>
                </td>
                <td className="py-3">
                  <TrackChip track={student.track} />
                </td>
                <td className="py-3">
                  {theirs.length === 0 ? (
                    <span className="text-muted">None</span>
                  ) : (
                    <ul className="space-y-1">
                      {theirs.map((a) => (
                        <li key={a.id} className="text-navy">
                          {getTemplate(a.templateId)?.title ?? a.templateId}{" "}
                          <span className="text-muted">({a.status})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
