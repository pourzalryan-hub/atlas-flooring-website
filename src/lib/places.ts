import { getSettings, saveSettings } from "./db";

// Live Google review count + rating from the Places API (New). Needs only an
// API key (no OAuth). We snapshot the running total and derive "new reviews
// this month" from a per-month baseline, writing it into settings.months so it
// feeds the scorecard exactly like a manual count.
//
// Required env:
//   GOOGLE_PLACES_API_KEY   a Google Maps / Places API (New) key
//   GOOGLE_PLACES_PLACE_ID  the business's Place ID (e.g. "ChIJ...")

const API_KEY = (process.env.GOOGLE_PLACES_API_KEY || "").trim();
const PLACE_ID = (process.env.GOOGLE_PLACES_PLACE_ID || "").trim();

export function placesConfigured(): boolean {
  return !!(API_KEY && PLACE_ID);
}

/** Current total review count and average rating for the business. */
export async function fetchReviewStats(): Promise<{ total: number; rating: number }> {
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`, {
    headers: { "X-Goog-Api-Key": API_KEY, "X-Goog-FieldMask": "rating,userRatingCount" },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Places API (${res.status}): ${text.slice(0, 300)}`);
  const json = JSON.parse(text) as { rating?: number; userRatingCount?: number };
  return { total: Number(json.userRatingCount || 0), rating: Number(json.rating || 0) };
}

export type ReviewState = { total: number; rating: number; syncedAt: string; baselines: Record<string, number> };
export type ReviewSyncResult =
  | { ok: true; total: number; rating: number; newThisMonth: number; syncedAt: string }
  | { ok: false; error: string };

/**
 * Pull the live review total/rating and update settings. "New this month" is
 * total minus the baseline captured at the first reading of the month.
 */
export async function syncReviews(): Promise<ReviewSyncResult> {
  if (!placesConfigured()) return { ok: false, error: "Google reviews are not configured" };
  try {
    const { total, rating } = await fetchReviewStats();
    const settings = (await getSettings()) as Record<string, unknown>;
    const prev = (settings.reviewState as ReviewState | undefined) || undefined;
    const baselines: Record<string, number> = { ...(prev?.baselines || {}) };
    const monthKey = new Date().toISOString().slice(0, 7);
    // First reading of the month: start the counter from the previous known
    // total (or the current total if this is the very first sync).
    if (baselines[monthKey] === undefined) {
      baselines[monthKey] = typeof prev?.total === "number" ? prev.total : total;
    }
    const newThisMonth = Math.max(0, total - baselines[monthKey]);
    const syncedAt = new Date().toISOString();
    const months = { ...((settings.months as Record<string, Record<string, unknown>>) || {}) };
    months[monthKey] = { ...(months[monthKey] || {}), reviews: newThisMonth };
    await saveSettings({ ...settings, months, reviewState: { total, rating, syncedAt, baselines } });
    return { ok: true, total, rating, newThisMonth, syncedAt };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
