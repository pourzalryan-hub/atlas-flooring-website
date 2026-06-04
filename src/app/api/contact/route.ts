import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { appendLeadToSheet } from '@/lib/googleSheets'

function formatEmailHtml(data: Record<string, string>, date: string) {
  const field = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;font-weight:600;color:#1C1C1C;width:160px;vertical-align:top">${label}</td>
           <td style="padding:8px 12px;color:#444">${value}</td>
         </tr>`
      : ''

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#FAF8F3;margin:0;padding:32px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
    <div style="background:#1C1C1C;padding:24px 32px">
      <h1 style="color:#C9A84C;font-size:22px;margin:0">Atlas Rug &amp; Design Centre</h1>
      <p style="color:#fff;margin:6px 0 0;font-size:14px;font-family:sans-serif">New consultation request — ${date}</p>
    </div>
    <div style="padding:32px">
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:15px">
        <tbody>
          ${field('Name', data.name)}
          ${field('Email', data.email)}
          ${field('Phone', data.phone)}
          ${field('Product Interest', data.product)}
          ${field('Project Type', data.projectType)}
          ${field('Square Footage', data.sqft)}
          ${field('Preferred Contact', data.contactMethod)}
          ${field('Heard About Us', data.referral)}
        </tbody>
      </table>
      ${data.message ? `
      <div style="margin-top:24px;padding:16px;background:#FAF8F3;border-left:3px solid #C9A84C;font-family:sans-serif;font-size:15px;color:#444">
        <strong style="color:#1C1C1C">Message:</strong><br>${data.message.replace(/\n/g, '<br>')}
      </div>` : ''}
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #eee;font-family:sans-serif;font-size:13px;color:#999">
        Submitted via atlasrugflooring.com/contact
      </div>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const {
    firstName = '', lastName = '', email = '', phone = '',
    product = '', projectType = '', sqft = '', contactMethod = '',
    referral = '', message = '',
  } = body

  if (!firstName || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const name = `${firstName} ${lastName}`.trim()
  const date = new Date().toLocaleString('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const emailData = { name, email, phone, product, projectType, sqft, contactMethod, referral, message }

  // ── Email notification ────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY)
  const emailResult = await resend.emails.send({
    from: 'Atlas Website <noreply@atlasrugflooring.com>',
    to: 'info@atlasrugflooring.com',
    replyTo: email,
    subject: `New Lead: ${name}${product ? ` — ${product}` : ''}`,
    html: formatEmailHtml(emailData, date),
  })

  if (emailResult.error) {
    console.error('Resend error:', emailResult.error)
    // Don't block the response — still try the sheet
  }

  // ── Google Sheets append ──────────────────────────────────────
  // Sheet columns: Date | Name | Phone | Email | Product Interest | Message
  try {
    await appendLeadToSheet([date, name, phone, email, product, message])
  } catch (err) {
    console.error('Sheets error:', err)
    // Non-fatal — email already sent
  }

  return NextResponse.json({ ok: true })
}
