import { NextResponse } from "next/server";

// Sample rows for local preview only (used when env vars aren't set and not in
// production). Lets you see the dashboard layout before wiring up the sheet.
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const TODAY = iso(new Date());
const SOON = iso(new Date(Date.now() + 4 * 864e5)); // 4 days out

const SAMPLE_LEADS = [
  { row: 3, date: "2026-11-06", name: "Sarah M.", address: "Leaside, Toronto", phone: "(416) 555-0142", email: "sarah@example.com", product: "Carpet & Broadloom", status: "Appointment", bookedDate: `${TODAY} 9–10 AM`, value: "", material: "", install: "", deposit: "", payment: "", followUp: "", notes: "In-home measure this morning.", source: "Google Ads – Carpet" },
  { row: 4, date: "2026-11-05", name: "David K.", address: "Etobicoke", phone: "(416) 555-0199", email: "davidk@example.com", product: "Laminate Flooring", status: "Appointment", bookedDate: `${TODAY} 2–3 PM`, value: "4200", material: "1500", install: "900", deposit: "", payment: "", followUp: "Nov 12", notes: "Wants Nylon, 2 bedrooms + stairs.", source: "Google Ads – Laminate" },
  { row: 5, date: "2026-11-03", name: "Nina P.", address: "Forest Hill", phone: "(416) 555-0170", email: "nina@example.com", product: "Carpet — Instant Estimate", status: "Booked", bookedDate: `${SOON} 10–11 AM`, installDate: iso(new Date(Date.now() + 14 * 864e5)), value: "6800", material: "2600", install: "1400", deposit: "2000", payment: "e-transfer", followUp: "", notes: "Measure booked, 10am.", source: "Google Ads – Carpet", tasks: "order,binding" },
  { row: 9, date: "2026-11-04", name: "Rachel B.", address: "Riverdale", phone: "(416) 555-0155", email: "rachelb@example.com", product: "Carpet & Broadloom", status: "Sold", bookedDate: "", installDate: "", value: "5200", material: "2000", install: "1100", deposit: "1500", payment: "e-transfer", followUp: "Call to schedule install", notes: "Signed! Need to book install date.", source: "Google Ads – Carpet", tasks: "order,pickup" },
  { row: 6, date: "2026-10-30", name: "Tom R.", address: "North York", phone: "(416) 555-0133", email: "tomr@example.com", product: "Stair Runners", status: "Completed", bookedDate: "", value: "2100", material: "700", install: "500", deposit: "1000", payment: "credit", followUp: "", notes: "Installed — balance still owing.", source: "Organic – Google", tasks: "unpaid" },
  { row: 7, date: iso(new Date(Date.now() - 4 * 864e5)), name: "Mike T.", address: "The Beaches", phone: "(416) 555-0188", email: "miket@example.com", product: "Hardwood", status: "New", bookedDate: "", value: "", material: "", install: "", deposit: "", payment: "", followUp: "", notes: "Called about hardwood in living room.", source: "Referral – houzz.com" },
  { row: 8, date: "2026-11-01", name: "Jane L.", address: "Scarborough", phone: "(416) 555-0120", email: "janel@example.com", product: "Laminate Flooring", status: "Lost", bookedDate: "", value: "", material: "", install: "", deposit: "", payment: "", followUp: "", notes: "Went with a cheaper quote elsewhere.", source: "Google Ads – Laminate" },
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
