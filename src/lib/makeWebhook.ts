export async function sendToMakeWebhook(data: {
  date: string
  name: string
  phone: string
  email: string
  product: string
  projectType: string
  sqft: string
  contactMethod: string
  referral: string
  message: string
}) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('MAKE_WEBHOOK_URL not set — skipping sheet logging')
    return
  }
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  console.log(`[makeWebhook] response status: ${res.status}`)
  if (!res.ok) {
    throw new Error(`Make webhook responded with ${res.status}`)
  }
}
