import { NextResponse } from "next/server";
import { googleAdsConfigured, syncAdSpend } from "@/lib/googleAds";
import { placesConfigured, syncReviews } from "@/lib/places";

// Daily automatic sync (ad spend + Google reviews), called by Vercel Cron (see
// vercel.json). This route lives outside /manage so the auth middleware does
// not guard it; instead it requires the Bearer CRON_SECRET that Vercel attaches
// to cron requests, so it cannot be triggered by just anyone. Each sync runs
// only if its own credentials are present.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET is not set" }, { status: 500 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const adSpend = googleAdsConfigured() ? await syncAdSpend() : { ok: false, error: "not configured" };
  const reviews = placesConfigured() ? await syncReviews() : { ok: false, error: "not configured" };
  return NextResponse.json({ ok: true, adSpend, reviews });
}
