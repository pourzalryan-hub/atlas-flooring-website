import { NextResponse } from "next/server";
import { googleAdsConfigured, syncAdSpend } from "@/lib/googleAds";

// Daily automatic ad-spend sync, called by Vercel Cron (see vercel.json).
// This route lives outside /manage so the auth middleware does not guard it;
// instead it requires the Bearer CRON_SECRET that Vercel attaches to cron
// requests, so it cannot be triggered by just anyone.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET is not set" }, { status: 500 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!googleAdsConfigured()) {
    return NextResponse.json({ ok: false, error: "Google Ads is not configured" }, { status: 400 });
  }
  const result = await syncAdSpend();
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
