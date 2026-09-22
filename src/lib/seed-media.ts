import type {
  HighlightColor,
  Step,
  StepMedia,
  TextHighlight,
} from "./types";

type PhraseHighlight = {
  text: string;
  color: HighlightColor;
  note?: string;
};

type BoardSpec = {
  title: string;
  lines: [string, string, string];
  caption: string;
  colors: [string, string, string];
  accent: string;
};

export function boardMedia(
  id: string,
  filename: string,
  board: BoardSpec,
): StepMedia {
  const [c1, c2, c3] = board.colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="55%" stop-color="${c2}"/><stop offset="100%" stop-color="${c3}"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><circle cx="540" cy="50" r="95" fill="#fff" opacity=".16"/><circle cx="70" cy="310" r="75" fill="#fff" opacity=".12"/><rect x="36" y="40" width="568" height="280" rx="22" fill="#fff" opacity=".95"/><text x="64" y="108" fill="${board.accent}" font-family="Georgia, serif" font-size="28">${escapeXml(board.title)}</text><text x="64" y="158" fill="${c2}" font-family="Arial, sans-serif" font-size="16" font-weight="700">${escapeXml(board.lines[0])}</text><text x="64" y="202" fill="#5b6678" font-family="Arial, sans-serif" font-size="16">${escapeXml(board.lines[1])}</text><text x="64" y="246" fill="#5b6678" font-family="Arial, sans-serif" font-size="16">${escapeXml(board.lines[2])}</text><text x="64" y="292" fill="#0c2340" font-family="Arial, sans-serif" font-size="14">${escapeXml(board.caption)}</text></svg>`;

  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return {
    id,
    name: filename,
    type: "image/svg+xml",
    size: dataUrl.length,
    caption: board.caption,
    dataUrl,
  };
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function highlightsFromPhrases(
  stepId: string,
  content: string,
  phrases: PhraseHighlight[],
): TextHighlight[] {
  return phrases.map((phrase, index) => {
    const start = content.indexOf(phrase.text);
    if (start < 0) {
      throw new Error(
        `Seed highlight not found in ${stepId}: "${phrase.text}"`,
      );
    }
    return {
      id: `${stepId}-hl-${index + 1}`,
      start,
      end: start + phrase.text.length,
      color: phrase.color,
      note: phrase.note,
    };
  });
}

export function richStep(input: {
  id: string;
  order: number;
  title: string;
  description: string;
  content: string;
  phrases: PhraseHighlight[];
  board: BoardSpec;
  filename: string;
}): Step {
  return {
    id: input.id,
    order: input.order,
    title: input.title,
    description: input.description,
    content: input.content,
    highlights: highlightsFromPhrases(input.id, input.content, input.phrases),
    media: [
      boardMedia(`${input.id}-media`, input.filename, input.board),
    ],
  };
}

export const MARKETING_COLORS: [string, string, string] = [
  "#ff4d6d",
  "#ff7a59",
  "#ffb703",
];
export const SOFTWARE_COLORS: [string, string, string] = [
  "#023e8a",
  "#0077b6",
  "#90e0ef",
];
export const FINANCE_COLORS: [string, string, string] = [
  "#1b4332",
  "#2d6a4f",
  "#95d5b2",
];
