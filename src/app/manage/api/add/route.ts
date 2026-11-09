import { NextResponse } from "next/server";
import { dbConfigured, insertLead } from "@/lib/db";

// Manually add a lead to the database from the Lead Manager. Behind Basic Auth.
export const dynamic = "force-dynamic";

const todayISO = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

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

  try {
    const id = await insertLead({
      name,
      phone,
      email,
      address: String(body.address ?? "").trim(),
      product: String(body.product ?? "").trim(),
      notes: String(body.message ?? "").trim(),
      status: "New",
      date: todayISO(),
      source: "Manual (Lead Manager)",
    });
    return NextResponse.json({ ok: true, row: id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
