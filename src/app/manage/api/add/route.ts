import { NextResponse } from "next/server";

// Manually add a lead to the Pipeline sheet from the Lead Manager.
// Reuses the same Apps Script web app (LEADS_WEBHOOK) the website contact
// form uses — its default branch appends a row with status "New". No email
// is sent (that's handled separately by /api/contact). Behind Basic Auth.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!name && !/\d/.test(phone) && !/@/.test(email)) {
    return NextResponse.json({ ok: false, error: "Add at least a name, phone, or email." }, { status: 400 });
  }

  const webhook = process.env.LEADS_WEBHOOK;
  if (!webhook) {
    // Local preview only — pretend it worked so the flow is testable.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, row: 0, demo: true });
    }
    return NextResponse.json({ ok: false, error: "Not configured (LEADS_WEBHOOK)" }, { status: 500 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name,
        phone,
        email,
        address: String(body.address ?? "").trim(),
        product: String(body.product ?? "").trim(),
        message: String(body.message ?? "").trim(),
        source: "Manual (Lead Manager)",
      }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
