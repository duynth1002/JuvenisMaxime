import Link from "next/link";
import { ArrowRight, ClipboardList, GraduationCap, Shield } from "lucide-react";
import { BrandMark, Button, Panel, Shell } from "@/components/ui";

export default function HomePage() {
  return (
    <Shell
      nav={
        <div className="flex items-center gap-2 text-sm">
          <Link href="/admin/login" className="rounded-lg px-3 py-2 hover:bg-sand-deep">
            Admin
          </Link>
          <Link href="/login">
            <Button className="!py-2">Student login</Button>
          </Link>
        </div>
      }
      footer="Juvenis Maxime demo · Frontend-only prototype for client review"
    >
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="animate-rise">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
              Career simulation demo
            </p>
            <h1 className="max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-6xl">
              Juvenis Maxime
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Practice a real job task step by step — then watch admins reshape
              the checklist with drag-and-drop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login">
                <Button>
                  Enter as student
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="ghost">Open admin builder</Button>
              </Link>
            </div>
          </div>

          <div className="animate-rise-delay relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal/20 via-transparent to-navy/15 blur-2xl" />
            <Panel className="relative overflow-hidden p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <BrandMark href="/" />
                <span className="rounded-full bg-navy px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-sand">
                  Live demo
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "Marketing Campaign Simulation",
                  "Software & Data Simulation",
                  "Business & Finance Simulation",
                ].map((title, i) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-xl border border-line bg-sand/60 px-4 py-3"
                    style={{ animationDelay: `${0.12 + i * 0.08}s` }}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-xs font-semibold text-sand">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-navy">{title}</p>
                      <p className="text-xs text-muted">9 gated checklist steps</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="border-t border-line/70 bg-surface/50">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Student path",
              body: "Mock login → assigned task → unlock steps in order → completion screen.",
            },
            {
              icon: ClipboardList,
              title: "Admin builder",
              body: "Reorder, edit, add, and remove checklist steps with dnd-kit drag-and-drop.",
            },
            {
              icon: Shield,
              title: "No backend needed",
              body: "Seeded JSON templates and localStorage keep the demo clickable in-browser.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-line/80 bg-surface/80 p-5">
              <item.icon className="h-5 w-5 text-teal" />
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl text-navy">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
