import { NextResponse } from "next/server";
import { dbConfigured, insertLead } from "@/lib/db";

// Manually add a lead to the database from the Lead Manager. Behind Basic Auth.
export const dynamic = "force-dynamic";

// Today's date in Toronto (the server runs on UTC, which would file evening
// leads under tomorrow).
const todayISO = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

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

  if (!dbConfigured()) {
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ ok: true, demo: true });
    return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
  }

  // Where they found us (picked in the form), and an optional measure booking.
  const source = String(body.source ?? "").trim().slice(0, 80) || "Not recorded";
  const bookedDate = String(body.bookedDate ?? "").trim().slice(0, 40);
  const hasAppt = /^\d{4}-\d{2}-\d{2}/.test(bookedDate);

  try {
    const id = await insertLead({
      name,
      phone,
      email,
      address: String(body.address ?? "").trim(),
      product: String(body.product ?? "").trim(),
      notes: String(body.message ?? "").trim(),
      status: hasAppt ? "Appointment" : "New",
      bookedDate: hasAppt ? bookedDate : "",
      date: todayISO(),
      source,
    });
    return NextResponse.json({ ok: true, row: id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
