import type { LucideIcon } from "lucide-react";
import { BarChart3, Megaphone, Terminal } from "lucide-react";

export type TrackTheme = {
  id: string;
  label: string;
  Icon: LucideIcon;
  /** Card header / hero band */
  banner: string;
  /** Soft card surface wash */
  wash: string;
  /** Glow behind cards */
  glow: string;
  /** Chip / badge */
  chip: string;
  /** Progress fill */
  bar: string;
  /** Number tile */
  tile: string;
  /** Border accent */
  ring: string;
  /** Strong text accent */
  accentText: string;
  /** Sidebar active state */
  active: string;
};

const FALLBACK: TrackTheme = {
  id: "general",
  label: "General",
  Icon: Megaphone,
  banner: "bg-gradient-to-br from-navy via-[#1a4a6e] to-teal",
  wash: "from-navy/10 via-teal/5 to-transparent",
  glow: "from-teal/25 to-navy/15",
  chip: "bg-navy/10 text-navy",
  bar: "from-navy to-teal-bright",
  tile: "bg-navy text-sand",
  ring: "border-navy/25",
  accentText: "text-navy",
  active: "border-teal bg-teal/5",
};

const THEMES: TrackTheme[] = [
  {
    id: "marketing",
    label: "Marketing",
    Icon: Megaphone,
    banner: "bg-gradient-to-br from-[#ff4d6d] via-[#ff7a59] to-[#ffb703]",
    wash: "from-[#ff4d6d]/18 via-[#ffb703]/10 to-transparent",
    glow: "from-[#ff4d6d]/35 to-[#ffb703]/25",
    chip: "bg-[#ff4d6d]/15 text-[#c9184a]",
    bar: "from-[#ff4d6d] to-[#ffb703]",
    tile: "bg-[#ff4d6d] text-white",
    ring: "border-[#ff4d6d]/35",
    accentText: "text-[#c9184a]",
    active: "border-[#ff4d6d] bg-[#ff4d6d]/8",
  },
  {
    id: "software",
    label: "Software & Data",
    Icon: Terminal,
    banner: "bg-gradient-to-br from-[#0077b6] via-[#00b4d8] to-[#90e0ef]",
    wash: "from-[#0077b6]/18 via-[#00b4d8]/10 to-transparent",
    glow: "from-[#00b4d8]/35 to-[#0077b6]/20",
    chip: "bg-[#0077b6]/15 text-[#023e8a]",
    bar: "from-[#023e8a] to-[#00b4d8]",
    tile: "bg-[#0077b6] text-white",
    ring: "border-[#00b4d8]/40",
    accentText: "text-[#023e8a]",
    active: "border-[#00b4d8] bg-[#00b4d8]/10",
  },
  {
    id: "finance",
    label: "Business & Finance",
    Icon: BarChart3,
    banner: "bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#95d5b2]",
    wash: "from-[#2d6a4f]/16 via-[#95d5b2]/12 to-transparent",
    glow: "from-[#40916c]/30 to-[#1b4332]/15",
    chip: "bg-[#2d6a4f]/15 text-[#1b4332]",
    bar: "from-[#1b4332] to-[#52b788]",
    tile: "bg-[#2d6a4f] text-white",
    ring: "border-[#52b788]/40",
    accentText: "text-[#1b4332]",
    active: "border-[#52b788] bg-[#52b788]/10",
  },
];

export function getTrackTheme(track?: string): TrackTheme {
  const raw = (track ?? "").toLowerCase();
  if (raw.includes("market")) return THEMES[0];
  if (raw.includes("software") || raw.includes("data")) return THEMES[1];
  if (raw.includes("finance") || raw.includes("business")) return THEMES[2];
  return { ...FALLBACK, label: track || FALLBACK.label };
}

export const DEMO_TRACK_PREVIEWS = [
  {
    title: "Marketing Campaign Simulation",
    track: "Marketing",
    blurb: "Brand brief → launch checklist",
  },
  {
    title: "Software & Data Simulation",
    track: "Software & Data",
    blurb: "Messy data → insight memo",
  },
  {
    title: "Business & Finance Simulation",
    track: "Business & Finance",
    blurb: "Unit economics → go/no-go",
  },
] as const;
