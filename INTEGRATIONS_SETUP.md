# Integrations Setup Guide

This document covers the one-time setup for:
1. Resend — email notifications on form submission
2. Make.com — Google Sheets lead logging via webhook
3. Google Tag Manager — analytics & conversion tracking
4. Google Ads — conversion tracking via GTM

---

## 1. RESEND (Email Notifications)

Every contact form submission sends a formatted email to info@atlasrugflooring.com.

### Setup Steps

1. Go to **resend.com** and create a free account
2. In the dashboard, click **Domains → Add Domain**
3. Add `atlasrugflooring.com` and follow the DNS verification steps (adds 2–3 DNS records to your domain registrar)
4. Once verified, click **API Keys → Create API Key**
5. Copy the key — it starts with `re_`

### Add to Vercel

In Vercel → your project → **Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | `re_your_key_here` |

**Note:** Until the domain is verified, Resend only sends to the address you signed up with. For testing, temporarily change the `to:` field in `src/app/api/contact/route.ts` to your personal email.

---

## 2. MAKE.COM WEBHOOK → GOOGLE SHEETS

Every submission POSTs JSON to a Make.com webhook, which appends a row to your Google Sheet. No service account or API keys required.

### Step 1 — Create the Google Sheet

1. Go to **sheets.google.com** → New spreadsheet
2. Name it **Atlas Flooring Leads**
3. Add these headers in Row 1:

```
A1: Date Submitted
B1: Name
C1: Phone
D1: Email
E1: Product Interest
F1: Project Type
G1: Square Footage
H1: Preferred Contact
I1: Heard About Us
J1: Message
```

### Step 2 — Create the Make.com Scenario

1. Go to **make.com** and create a free account
2. Click **Create a new scenario**
3. Click the **+** to add the first module → search for **Webhooks**
4. Choose **Custom webhook**
5. Click **Add** → name it `Atlas Contact Form` → **Save**
6. Make shows you a webhook URL — click **Copy address to clipboard**
   - It looks like: `https://hook.eu2.make.com/abc123xyz...`
   - **This is your `MAKE_WEBHOOK_URL` — copy it now**
7. Click **OK**

### Step 3 — Add the Google Sheets Module

1. Click **+** after the Webhook module to add a second module
2. Search for **Google Sheets** → choose **Add a Row**
3. Click **Create a connection** → sign in with your Google account (the one that owns the sheet) → Allow access
4. **Spreadsheet ID**: click the dropdown and select **Atlas Flooring Leads**
5. **Sheet name**: select the first sheet tab
6. **Values** — map each column to the webhook data field:

| Column | Map to |
|---|---|
| A (Date Submitted) | `date` |
| B (Name) | `name` |
| C (Phone) | `phone` |
| D (Email) | `email` |
| E (Product Interest) | `product` |
| F (Project Type) | `projectType` |
| G (Square Footage) | `sqft` |
| H (Preferred Contact) | `contactMethod` |
| I (Heard About Us) | `referral` |
| J (Message) | `message` |

7. Click **OK**

### Step 4 — Activate the Scenario

1. Click **Save** (bottom of screen)
2. Toggle the scenario **ON** using the switch in the bottom-left
3. Set scheduling to **Immediately** (so it runs as each webhook arrives, not in batches)

### Step 5 — Test It

1. Add `MAKE_WEBHOOK_URL` to your local `.env.local`
2. Run `npm run dev`, go to `/contact`, submit the form
3. In Make, click **Run once** to process any queued webhooks
4. Check your Google Sheet — a new row should appear within seconds

### Add to Vercel

In Vercel → your project → **Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `MAKE_WEBHOOK_URL` | `https://hook.eu2.make.com/your-webhook-id` |

---

## 3. GOOGLE TAG MANAGER

GTM is already injected into the site. It activates when you set `NEXT_PUBLIC_GTM_ID`.

### Setup Steps

1. Go to **tagmanager.google.com** → Create Account
   - Account name: Atlas Rug & Design Centre
   - Container name: atlasrugflooring.com
   - Platform: Web
2. Copy your container ID (format: `GTM-XXXXXXX`)

### Add to Vercel

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` |

### What the Site Sends to GTM

On every successful form submission:

```js
{
  event: 'contact_form_submit',
  product_interest: 'Hardwood Flooring',
  project_type: 'New Install',
  referral_source: 'Google Search',
  conversion_event: 'generate_lead'
}
```

---

## 4. GOOGLE ADS CONVERSION TRACKING (via GTM)

### Step 1 — Get Your Conversion ID & Label

1. In Google Ads: **Tools → Conversions → + New conversion action**
2. Choose **Website** → Category: **Lead** → Action: **Submit lead form**
3. Copy the **Conversion ID** (e.g. `AW-123456789`) and **Conversion Label**

### Step 2 — Create the GTM Trigger

In GTM:
1. **Triggers → New** → name: `Contact Form Submit`
2. Trigger type: **Custom Event**
3. Event name: `contact_form_submit`
4. Save

### Step 3 — Create the Google Ads Conversion Tag

In GTM:
1. **Tags → New** → name: `Google Ads — Lead Conversion`
2. Tag type: **Google Ads Conversion Tracking**
3. Conversion ID: your `AW-` ID
4. Conversion Label: from Step 1
5. Trigger: `Contact Form Submit`
6. Save → **Submit → Publish**

---

## VERCEL ENVIRONMENT VARIABLES — COMPLETE LIST

| Variable | Required | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Yes | resend.com → API Keys |
| `MAKE_WEBHOOK_URL` | Yes | Make.com → your scenario → Webhook module |
| `NEXT_PUBLIC_GTM_ID` | Optional | tagmanager.google.com |

After adding variables: **Redeploy** from the Vercel dashboard.

---

## TESTING CHECKLIST

- [ ] Submit the contact form on the live site
- [ ] Email arrives at info@atlasrugflooring.com within 30 seconds
- [ ] New row appears in the Google Sheet
- [ ] In GTM Preview mode, `contact_form_submit` event fires on submission
- [ ] Google Ads conversion status shows **Recording** within 24 hours
