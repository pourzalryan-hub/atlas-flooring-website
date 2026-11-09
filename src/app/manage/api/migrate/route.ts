import { NextResponse } from "next/server";
import { dbConfigured, countLeads, insertLead } from "@/lib/db";

// One-time import of existing leads from the old Google Sheet into the
// database. Safe to leave in place: it refuses to run once the DB has leads,
// so it can't create duplicates. Behind Basic Auth (middleware).
export const dynamic = "force-dynamic";

export async function POST() {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured (DATABASE_URL)" }, { status: 500 });
  }

  const webhook = process.env.LEADS_WEBHOOK;
  const key = process.env.SHEET_API_KEY;
  if (!webhook || !key) {
    return NextResponse.json({ ok: false, error: "Old sheet source not configured (LEADS_WEBHOOK / SHEET_API_KEY)" }, { status: 400 });
  }

  try {
    const existing = await countLeads();
    if (existing > 0) {
      return NextResponse.json({ ok: true, skipped: true, imported: 0, existing });
    }

    const url = `${webhook}?action=pipeline&key=${encodeURIComponent(key)}`;
    const res = await fetch(url, { method: "GET", redirect: "follow", cache: "no-store" });
    const data = await res.json();
    if (!data?.ok || !Array.isArray(data.leads)) {
      return NextResponse.json({ ok: false, error: "Could not read the sheet" }, { status: 502 });
    }

    let imported = 0;
    for (const lead of data.leads) {
      const { row, id, ...rest } = lead; // drop the sheet row number; DB assigns its own id
      void row;
      void id;
      await insertLead(rest);
      imported++;
    }
    return NextResponse.json({ ok: true, imported });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
