import { getSettings, saveSettings } from "./db";

// Live ad-spend sync from the Google Ads API. Pulls total account spend per
// month and writes it into the app settings (settings.months[].adSpend), so the
// dashboard reads it exactly like a manually entered figure. Everything is
// driven by environment variables — nothing here hard-codes an account.
//
// Required env (set in Vercel → Project → Settings → Environment Variables):
//   GOOGLE_ADS_DEVELOPER_TOKEN      from your Google Ads API Center
//   GOOGLE_ADS_CLIENT_ID            OAuth client (Google Cloud console)
//   GOOGLE_ADS_CLIENT_SECRET        OAuth client secret
//   GOOGLE_ADS_REFRESH_TOKEN        refresh token for the authorizing Google user
//   GOOGLE_ADS_CUSTOMER_ID          the ad account to read (10 digits, dashes ok)
// Optional:
//   GOOGLE_ADS_LOGIN_CUSTOMER_ID    manager (MCC) account id, if the account sits under one
//   GOOGLE_ADS_API_VERSION          e.g. "v18" (defaults below) — bump without a code change

const API_VERSION = (process.env.GOOGLE_ADS_API_VERSION || "v18").replace(/^v?/, "v");
const DEV_TOKEN = (process.env.GOOGLE_ADS_DEVELOPER_TOKEN || "").trim();
const CLIENT_ID = (process.env.GOOGLE_ADS_CLIENT_ID || "").trim();
const CLIENT_SECRET = (process.env.GOOGLE_ADS_CLIENT_SECRET || "").trim();
const REFRESH_TOKEN = (process.env.GOOGLE_ADS_REFRESH_TOKEN || "").trim();
const CUSTOMER_ID = (process.env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/\D/g, "");
const LOGIN_CUSTOMER_ID = (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/\D/g, "");

/** True only when every credential needed to read spend is present. */
export function googleAdsConfigured(): boolean {
  return !!(DEV_TOKEN && CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN && CUSTOMER_ID);
}

// Exchange the long-lived refresh token for a short-lived access token.
async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`OAuth token (${res.status}): ${text.slice(0, 300)}`);
  const json = JSON.parse(text) as { access_token?: string };
  if (!json.access_token) throw new Error("OAuth token: no access_token returned");
  return json.access_token;
}

const pad2 = (n: number) => String(n).padStart(2, "0");
const isoDate = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

/**
 * Total account ad spend (in dollars) per month, keyed "YYYY-MM", covering
 * roughly the trailing `monthsBack` months.
 */
export async function fetchMonthlySpend(monthsBack = 13): Promise<Record<string, number>> {
  const token = await getAccessToken();
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1), 1);
  const query =
    "SELECT segments.month, metrics.cost_micros FROM customer " +
    `WHERE segments.date BETWEEN '${isoDate(start)}' AND '${isoDate(now)}'`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "developer-token": DEV_TOKEN,
    "Content-Type": "application/json",
  };
  if (LOGIN_CUSTOMER_ID) headers["login-customer-id"] = LOGIN_CUSTOMER_ID;

  const res = await fetch(
    `https://googleads.googleapis.com/${API_VERSION}/customers/${CUSTOMER_ID}/googleAds:search`,
    { method: "POST", headers, body: JSON.stringify({ query, pageSize: 1000 }) }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Google Ads API (${res.status}): ${text.slice(0, 400)}`);

  const json = JSON.parse(text) as {
    results?: { segments?: { month?: string }; metrics?: { costMicros?: string | number } }[];
  };
  const out: Record<string, number> = {};
  for (const row of json.results || []) {
    const month = row?.segments?.month; // "YYYY-MM-DD" (first of month)
    const micros = Number(row?.metrics?.costMicros || 0);
    if (typeof month === "string" && month.length >= 7) {
      const key = month.slice(0, 7);
      out[key] = (out[key] || 0) + micros / 1e6;
    }
  }
  return out;
}

export type AdSyncResult =
  | { ok: true; months: Record<string, number>; syncedAt: string }
  | { ok: false; error: string };

/**
 * Fetch spend from Google Ads and merge it into app settings, preserving each
 * month's overhead / review figures. Stamps settings.lastAdSync.
 */
export async function syncAdSpend(): Promise<AdSyncResult> {
  if (!googleAdsConfigured()) return { ok: false, error: "Google Ads is not configured" };
  try {
    const spend = await fetchMonthlySpend();
    const settings = (await getSettings()) as Record<string, unknown>;
    const months = { ...((settings.months as Record<string, Record<string, unknown>>) || {}) };
    for (const [key, dollars] of Object.entries(spend)) {
      months[key] = { ...(months[key] || {}), adSpend: Math.round(dollars * 100) / 100 };
    }
    const syncedAt = new Date().toISOString();
    await saveSettings({ ...settings, months, lastAdSync: syncedAt });
    return { ok: true, months: spend, syncedAt };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
