import { NextResponse } from "next/server";

// Sample rows for local preview only (used when env vars aren't set and not in
// production). Lets you see the dashboard layout before wiring up the sheet.
const SAMPLE_LEADS = [
  { row: 3, date: "2026-11-06", name: "Sarah M.", address: "Leaside, Toronto", phone: "(416) 555-0142", email: "sarah@example.com", product: "Carpet & Broadloom", status: "New", bookedDate: "", value: "", notes: "" },
  { row: 4, date: "2026-11-05", name: "David K.", address: "Etobicoke", phone: "(416) 555-0199", email: "davidk@example.com", product: "Laminate Flooring", status: "Quoted", bookedDate: "", value: "4200", notes: "Wants Nylon, 2 bedrooms + stairs. Sending written quote." },
  { row: 5, date: "2026-11-03", name: "Nina P.", address: "Forest Hill", phone: "(416) 555-0170", email: "nina@example.com", product: "Carpet — Instant Estimate", status: "Booked", bookedDate: "2026-11-14", value: "6800", notes: "Measure booked Nov 14, 9am." },
  { row: 6, date: "2026-10-30", name: "Tom R.", address: "North York", phone: "(416) 555-0133", email: "tomr@example.com", product: "Stair Runners", status: "Completed", bookedDate: "2026-11-01", value: "2100", notes: "Done, happy — ask for Google review." },
];

// Reads the Pipeline from the Google Sheet via the Apps Script web app.
// Protected two ways: Basic Auth (middleware) + a secret key the server holds.
export const dynamic = "force-dynamic";

export async function GET() {
  const webhook = process.env.LEADS_WEBHOOK;
  const key = process.env.SHEET_API_KEY;
  if (!webhook || !key) {
    // Local preview only — never in production (Vercel sets NODE_ENV=production).
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, leads: SAMPLE_LEADS });
    }
    return NextResponse.json({ ok: false, error: "Not configured (LEADS_WEBHOOK / SHEET_API_KEY)" }, { status: 500 });
  }
  try {
    const url = `${webhook}?action=pipeline&key=${encodeURIComponent(key)}`;
    const res = await fetch(url, { method: "GET", redirect: "follow", cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
