import { NextResponse } from "next/server";

/**
 * Lightweight usage tracking for the carpet estimator.
 * The browser pings this with { type: "start" | "prices" | "book", tier? }.
 * We forward it server-side to ESTIMATOR_WEBHOOK (an Apps Script web app that
 * appends a row to the "Estimator Log" tab). If ESTIMATOR_WEBHOOK is not set,
 * this does nothing — so it can ship before the sheet side is wired up, with
 * zero risk of polluting the leads Pipeline.
 */
export async function POST(req: Request) {
  let data: Record<string, string> = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const type = (data.type || "").toString().trim();
  const tier = (data.tier || "").toString().trim();
  const webhook = process.env.ESTIMATOR_WEBHOOK;

  if (webhook && type) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ event: "estimator", type, tier, source: "Carpet Estimator" }),
      });
    } catch {
      // Tracking is best-effort — never surface an error to the visitor.
    }
  }

  return NextResponse.json({ ok: true });
}
