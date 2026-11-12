import { NextResponse } from "next/server";
import { placesConfigured, syncReviews } from "@/lib/places";

// Manual "Sync now" for Google reviews. Behind auth (middleware).
export const dynamic = "force-dynamic";

export async function POST() {
  if (!placesConfigured()) {
    return NextResponse.json({ ok: false, error: "Google reviews are not connected yet." }, { status: 400 });
  }
  const result = await syncReviews();
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
