import { NextResponse } from "next/server";

/**
 * Contact form handler.
 * - Emails the lead details to Atlas (so you get notified).
 * - Sends a personalized, branded welcome auto-reply to the customer.
 * Both via Resend (https://resend.com). Configure with env vars:
 *   RESEND_API_KEY       — your Resend API key (required)
 *   LEADS_FROM_EMAIL     — verified sender, e.g. "Atlas Rug & Design Centre <hello@atlasrugflooring.com>"
 *   LEADS_NOTIFY_EMAIL   — where lead notifications go, e.g. "info@atlasrugflooring.com"
 *   LEADS_WEBHOOK        — (optional, private) Apps Script web app URL that logs the
 *                          lead into the Google Sheet Pipeline. Called server-side so
 *                          the URL is never exposed to the browser.
 */

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Pull the bare email address out of a "Name <email>" string. */
function emailAddress(from: string): string {
  const m = from.match(/<([^>]+)>/);
  return m ? m[1].trim() : from.trim();
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(req: Request) {
  let data: Record<string, string> = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const address = (data.address || "").trim();
  const product = (data.product || "").trim();
  const message = (data.message || "").trim();

  if (!name || !email || !phone) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.LEADS_FROM_EMAIL || "Atlas Rug & Design Centre <onboarding@resend.dev>";
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL || "info@atlasrugflooring.com";

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email is not configured. Please call us at (416) 533-3366." },
      { status: 500 }
    );
  }

  // 1) Notification to Atlas (the important one)
  const notifyHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1C1C1C;max-width:600px;">
      <h2 style="margin:0 0 12px;">New website lead</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Name</td><td style="padding:4px 0;"><strong>${esc(name)}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Phone</td><td style="padding:4px 0;"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Address</td><td style="padding:4px 0;">${esc(address) || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Interested in</td><td style="padding:4px 0;">${esc(product) || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;vertical-align:top;">Message</td><td style="padding:4px 0;">${esc(message).replace(/\n/g, "<br>") || "—"}</td></tr>
      </table>
      <p style="margin:16px 0 0;color:#6B6B6B;font-size:13px;">Reply to this email to respond directly to ${esc(name)}. Respond fast — speed to lead wins jobs.</p>
    </div>`;

  // 2) Personalized welcome auto-reply to the customer.
  // Kept plain and personal (no images/buttons) so Gmail delivers it to the
  // Primary inbox instead of the Promotions tab.
  const welcomeText =
`Hi ${name},

Thanks for reaching out — we've got your request, and someone from Atlas Rug & Design Centre will call you within one business day to set up your in-home visit.

We're a family-owned Toronto flooring store that's been on Bathurst Street since 1959. If you'd like to reach us sooner, just call (416) 533-3366 or reply to this email.

Talk soon,
Ryan
Atlas Rug & Design Centre`;

  const welcomeHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#222222;max-width:560px;">
      <p>Hi ${esc(name)},</p>
      <p>Thanks for reaching out — we&apos;ve got your request, and someone from Atlas Rug &amp; Design Centre will call you within one business day to set up your in-home visit.</p>
      <p>We&apos;re a family-owned Toronto flooring store that&apos;s been on Bathurst Street since 1959. If you&apos;d like to reach us sooner, just call (416) 533-3366 or reply to this email.</p>
      <p>Talk soon,<br>Ryan<br>Atlas Rug &amp; Design Centre</p>
    </div>`;

  try {
    // Notification first — this is the critical one
    const stamp = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Toronto",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

    const notify = await sendEmail(apiKey, {
      from: `🔔 New Lead · ${stamp} <${emailAddress(fromEmail)}>`,
      to: [notifyEmail],
      reply_to: email,
      subject: `🔔 New lead: ${name}${product ? ` (${product})` : ""}`,
      html: notifyHtml,
    });

    if (!notify.ok) {
      const detail = await notify.text();
      return NextResponse.json(
        { ok: false, error: "Could not send your request. Please call us at (416) 533-3366.", detail },
        { status: 502 }
      );
    }

    // Capture the lead into the Google Sheet (Pipeline) via a private webhook.
    // Server-side, so the Apps Script URL never reaches the browser. Non-fatal.
    const leadsWebhook = process.env.LEADS_WEBHOOK;
    if (leadsWebhook) {
      try {
        await fetch(leadsWebhook, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ name, email, phone, address, product, message, source: "Website" }),
        });
      } catch {
        // The lead already emailed through — don't fail the form over the sheet.
      }
    }

    // Auto-reply to the customer — best effort (don't fail the form if this hiccups)
    await sendEmail(apiKey, {
      from: fromEmail,
      to: [email],
      reply_to: notifyEmail,
      subject: `Thanks for reaching out, ${name}`,
      text: welcomeText,
      html: welcomeHtml,
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call us at (416) 533-3366.", detail: String(err) },
      { status: 500 }
    );
  }
}
