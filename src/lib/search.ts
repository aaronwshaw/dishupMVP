// Forgiving text search: ignores filler words ("food", "near me"), treats plurals as
// singular ("tacos" → "taco"), maps common synonyms ("barbecue" → "bbq"), and matches
// prefixes so results update while someone is still typing.

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "of", "for", "to", "in", "at", "on", "with", "some", "any",
  "food", "foods", "restaurant", "restaurants", "place", "places", "spot", "spots", "joint",
  "near", "me", "nearby", "around", "best", "good", "great", "top", "want", "craving", "eat", "get",
]);

const PHRASES: [RegExp, string][] = [
  [/\bhot ?dogs?\b/g, "hotdog"],
  [/\bbar ?b ?q(ue)?\b|\bbarbe(c|q)ue\b/g, "bbq"],
  [/\bfrench fries\b/g, "fries"],
  [/\bfry ?bread\b/g, "frybread"],
];

/** Words that mean "inexpensive" rather than something on the menu. */
const CHEAP_WORDS = new Set(["cheap", "budget", "inexpensive", "affordable", "cheapest"]);

export function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.length > 4 && /(ches|shes|xes|oes)$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function normalize(text: string): string {
  let s = text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  s = s.replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ");
  for (const [re, rep] of PHRASES) s = s.replace(re, rep);
  return s.trim();
}

/** Turns searchable text into a set of stemmed words. */
export function indexWords(...parts: string[]): string[] {
  return [...new Set(normalize(parts.join(" ")).split(" ").filter(Boolean).map(stem))];
}

export interface ParsedQuery {
  tokens: string[];
  cheap: boolean;
}

export function parseQuery(query: string): ParsedQuery {
  const words = normalize(query).split(" ").filter(Boolean);
  const cheap = words.some((w) => CHEAP_WORDS.has(w));
  const tokens = words.filter((w) => !STOPWORDS.has(w) && !CHEAP_WORDS.has(w)).map(stem);
  return { tokens, cheap };
}

const matchesToken = (words: string[], token: string) => words.some((w) => w.startsWith(token));

export const matchesAll = (words: string[], tokens: string[]) => tokens.every((t) => matchesToken(words, t));
export const matchesAny = (words: string[], tokens: string[]) => tokens.some((t) => matchesToken(words, t));

function editDistance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
}

/** Closest known word for a likely typo ("ramn" → "ramen"), or undefined. */
export function closestWord(token: string, vocabulary: string[]): string | undefined {
  if (token.length < 3) return undefined;
  const maxDistance = token.length <= 4 ? 1 : 2;
  let best: string | undefined;
  let bestDistance = Infinity;
  for (const word of vocabulary) {
    if (word.length < 3) continue;
    const d = editDistance(token, word);
    if (d > 0 && d <= maxDistance && d < bestDistance) {
      best = word;
      bestDistance = d;
    }
  }
  return best;
}
