import { NextResponse } from "next/server";

/**
 * Contact form handler.
 * - Emails the lead details to Atlas (so you get notified).
 * - Sends a personalized, branded welcome auto-reply to the customer.
 * Both via Resend (https://resend.com). Configure with env vars:
 *   RESEND_API_KEY       — your Resend API key (required)
 *   LEADS_FROM_EMAIL     — verified sender, e.g. "Atlas Rug & Design Centre <hello@atlasrugflooring.com>"
 *   LEADS_NOTIFY_EMAIL   — where lead notifications go, e.g. "info@atlasrugflooring.com"
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
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;">Interested in</td><td style="padding:4px 0;">${esc(product) || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B;vertical-align:top;">Message</td><td style="padding:4px 0;">${esc(message).replace(/\n/g, "<br>") || "—"}</td></tr>
      </table>
      <p style="margin:16px 0 0;color:#6B6B6B;font-size:13px;">Reply to this email to respond directly to ${esc(name)}. Respond fast — speed to lead wins jobs.</p>
    </div>`;

  // 2) Personalized welcome auto-reply to the customer
  const welcomeHtml = `
    <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1C1C1C;">
      <div style="background:#1C1C1C;padding:28px 24px;text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#ffffff;letter-spacing:0.5px;">
          Atlas Rug <span style="color:#C9A84C;">&amp;</span> Design Centre
        </div>
        <div style="color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-top:6px;">
          Toronto&apos;s Flooring Family Since 1959
        </div>
      </div>
      <div style="padding:28px 24px;font-size:15px;line-height:1.6;">
        <p>Hi ${esc(name)},</p>
        <p>Thank you for contacting <strong>Atlas Rug &amp; Design Centre</strong> — we&apos;ve received your request, and a member of our team will reach out within one business day to answer your questions and set up a free, no-obligation in-home consultation.</p>
        <p>We&apos;re a family-owned flooring store in Toronto, helping homeowners find the right floors since <strong>1959</strong> — more than 65 years from our showroom at <strong>978 Bathurst Street</strong>. From hardwood and engineered hardwood to carpet, luxury vinyl, laminate, and stair runners, we carry hundreds of options in our showroom, with written, itemized quotes and no surprises.</p>
        <p style="margin:0 0 6px;"><strong>What happens next:</strong></p>
        <ol style="margin:0 0 16px;padding-left:20px;">
          <li>We&apos;ll call to understand what you&apos;re looking for</li>
          <li>We&apos;ll book a free in-home measure and bring samples</li>
          <li>You&apos;ll get a clear, written quote — no pressure</li>
        </ol>
        <p>In the meantime, explore our full range at <a href="https://atlasrugflooring.com" style="color:#C9A84C;">atlasrugflooring.com</a>.</p>
        <p>Talk soon,<br><strong>The Atlas Team</strong></p>
      </div>
      <div style="background:#FAF8F3;padding:18px 24px;font-size:13px;color:#6B6B6B;border-top:3px solid #C9A84C;">
        978 Bathurst St, Toronto, ON &nbsp;·&nbsp; (416) 533-3366<br>
        Mon&ndash;Sat, 10am&ndash;4pm
      </div>
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

    // Auto-reply to the customer — best effort (don't fail the form if this hiccups)
    await sendEmail(apiKey, {
      from: fromEmail,
      to: [email],
      reply_to: notifyEmail,
      subject: "Thanks for reaching out — Atlas Rug & Design Centre",
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
