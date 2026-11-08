import { NextResponse } from "next/server";

// Updates one Pipeline row (status / notes / value / booked date) in the sheet
// via the Apps Script. Behind Basic Auth (middleware) + secret key.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const webhook = process.env.LEADS_WEBHOOK;
  const key = process.env.SHEET_API_KEY;
  if (!webhook || !key) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 500 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const row = parseInt(String(body.row ?? ""), 10);
  if (!row) return NextResponse.json({ ok: false, error: "Missing row" }, { status: 400 });

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        event: "pipeline_update",
        key,
        row,
        status: body.status,
        notes: body.notes,
        value: body.value,
        bookedDate: body.bookedDate,
        installDate: body.installDate,
        material: body.material,
        install: body.install,
        deposit: body.deposit,
        payment: body.payment,
        followUp: body.followUp,
      }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
