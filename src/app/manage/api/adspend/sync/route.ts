import { NextResponse } from "next/server";
import { googleAdsConfigured, syncAdSpend } from "@/lib/googleAds";

// Manual "Sync now" from the dashboard. Behind auth (middleware).
export const dynamic = "force-dynamic";

export async function POST() {
  if (!googleAdsConfigured()) {
    return NextResponse.json({ ok: false, error: "Google Ads is not connected yet." }, { status: 400 });
  }
  const result = await syncAdSpend();
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
