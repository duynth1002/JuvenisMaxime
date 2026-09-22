import Link from "next/link";
import { ArrowRight, ClipboardList, GraduationCap, Shield } from "lucide-react";
import { LandingTrackRow } from "@/components/template-card";
import { BrandMark, Button, Panel, Shell } from "@/components/ui";
import { DEMO_TRACK_PREVIEWS } from "@/lib/track-theme";

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
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#ff4d6d]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#00b4d8]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-[#52b788]/15 blur-3xl" />

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
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#ff4d6d]/20 via-[#00b4d8]/15 to-[#52b788]/20 blur-2xl" />
            <Panel className="relative overflow-hidden p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <BrandMark href="/" />
                <span className="rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#00b4d8] to-[#2d6a4f] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                  3 vivid tracks
                </span>
              </div>
              <div className="space-y-3">
                {DEMO_TRACK_PREVIEWS.map((item, i) => (
                  <LandingTrackRow
                    key={item.title}
                    title={item.title}
                    track={item.track}
                    blurb={item.blurb}
                    index={i + 1}
                  />
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
              tint: "from-[#ff4d6d]/10 to-transparent",
              iconClass: "text-[#c9184a]",
            },
            {
              icon: ClipboardList,
              title: "Admin builder",
              body: "Reorder, highlight text, attach media, and preview the student path.",
              tint: "from-[#00b4d8]/12 to-transparent",
              iconClass: "text-[#0077b6]",
            },
            {
              icon: Shield,
              title: "No backend needed",
              body: "Seeded JSON templates and localStorage keep the demo clickable in-browser.",
              tint: "from-[#52b788]/12 to-transparent",
              iconClass: "text-[#1b4332]",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border border-line/80 bg-gradient-to-br ${item.tint} bg-surface/80 p-5`}
            >
              <item.icon className={`h-5 w-5 ${item.iconClass}`} />
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
