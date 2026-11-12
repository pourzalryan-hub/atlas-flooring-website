import { NextResponse } from "next/server";
import { dbConfigured, getSettings, saveSettings } from "@/lib/db";
import { googleAdsConfigured } from "@/lib/googleAds";

// App-wide settings (scorecard targets, monthly ad spend / overhead / reviews).
// One JSON blob the client reads on load and writes back when edited. Behind
// auth (middleware). Adding new settings never needs changes here.
export const dynamic = "force-dynamic";

// Local preview only (no DB): keep settings in memory so edits round-trip
// within a dev server session.
let devSettings: Record<string, unknown> = {};

export async function GET() {
  const adSyncConfigured = googleAdsConfigured();
  if (!dbConfigured()) {
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ ok: true, settings: devSettings, adSyncConfigured });
    return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
  }
  try {
    const settings = await getSettings();
    return NextResponse.json({ ok: true, settings, adSyncConfigured });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const settings =
    body.settings && typeof body.settings === "object" && !Array.isArray(body.settings)
      ? (body.settings as Record<string, unknown>)
      : {};

  if (!dbConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      devSettings = settings;
      return NextResponse.json({ ok: true, demo: true });
    }
    return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
  }

  try {
    await saveSettings(settings);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
