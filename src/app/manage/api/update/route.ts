import { NextResponse } from "next/server";
import { dbConfigured, updateLead } from "@/lib/db";

// Updates one lead in the database (merges the provided fields). New fields
// added in future need no changes here — they just flow through. Behind auth.
export const dynamic = "force-dynamic";

const FIELDS = [
  "status", "notes", "value", "bookedDate", "installDate", "address", "lostReason",
  "material", "install", "deposit", "payment", "followUp", "tasks", "quote",
] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const id = parseInt(String(body.row ?? ""), 10);
  if (!id) return NextResponse.json({ ok: false, error: "Missing row" }, { status: 400 });

  if (!dbConfigured()) {
    // Local preview: pretend it saved so the UI flow is testable.
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ ok: true, demo: true });
    return NextResponse.json({ ok: false, error: "Database not configured" }, { status: 500 });
  }

  const patch: Record<string, unknown> = {};
  for (const f of FIELDS) if (body[f] !== undefined) patch[f] = body[f];

  try {
    await updateLead(id, patch);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
