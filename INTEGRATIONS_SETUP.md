# Integrations Setup Guide

This document covers the one-time setup for:
1. Resend — email notifications on form submission
2. Google Sheets — lead logging
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

1. Go to your Vercel project → Settings → Environment Variables
2. Add: `RESEND_API_KEY` = `re_your_key_here`
3. Scope: Production + Preview

### Test

After deploying, submit the contact form. You should receive an email at info@atlasrugflooring.com within seconds.

**Note:** Until the domain is verified, Resend will only send to the address you signed up with. For testing, temporarily change the `to:` in `src/app/api/contact/route.ts` to your personal email.

---

## 2. GOOGLE SHEETS (Lead Logging)

Every submission appends a row to a Google Sheet with: Date | Name | Phone | Email | Product Interest | Message

### Step 1 — Create the Google Sheet

1. Go to **sheets.google.com** → New spreadsheet
2. Rename it "Atlas Flooring Leads"
3. On the first tab, rename it to **Leads** (exact spelling — must match `SHEET_TAB` in googleSheets.ts)
4. Add these headers in Row 1:
   ```
   A1: Date Submitted
   B1: Name
   C1: Phone
   D1: Email
   E1: Product Interest
   F1: Message
   ```
5. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/` **THIS_IS_YOUR_SHEET_ID** `/edit`

### Step 2 — Create a Google Cloud Service Account

1. Go to **console.cloud.google.com**
2. Create a new project (e.g. "Atlas Flooring")
3. In the left menu: **APIs & Services → Library**
4. Search for **Google Sheets API** → Enable it
5. Go to **APIs & Services → Credentials**
6. Click **Create Credentials → Service Account**
   - Name: `atlas-leads`
   - Click through to finish
7. Click the new service account → **Keys tab → Add Key → Create new key → JSON**
8. Download the JSON file — keep it safe, you won't get it again

### Step 3 — Share the Sheet with the Service Account

1. Open the downloaded JSON file
2. Copy the `client_email` value (looks like `atlas-leads@your-project.iam.gserviceaccount.com`)
3. Open your Google Sheet → **Share**
4. Paste that email address and set role to **Editor**
5. Uncheck "Notify people" → Share

### Step 4 — Add Credentials to Vercel

In Vercel → Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `GOOGLE_SHEET_ID` | The ID from Step 1 |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The `client_email` from the JSON |
| `GOOGLE_PRIVATE_KEY` | The `private_key` from the JSON — paste it exactly, including `\n` characters |

**Important for GOOGLE_PRIVATE_KEY:** Copy the entire value from the JSON including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`. In Vercel, paste it as a single line — Vercel handles the newlines correctly.

---

## 3. GOOGLE TAG MANAGER

GTM is already injected into the site via `layout.tsx`. It activates automatically when you set `NEXT_PUBLIC_GTM_ID`.

### Setup Steps

1. Go to **tagmanager.google.com** → Create Account
   - Account name: Atlas Rug & Design Centre
   - Container name: atlasrugflooring.com
   - Platform: Web
2. Copy your container ID (format: `GTM-XXXXXXX`)
3. Add to Vercel: `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`

### What the Site Sends to GTM

The contact form fires this `dataLayer` event on every successful submission:

```js
{
  event: 'contact_form_submit',
  product_interest: 'Hardwood Flooring',  // whatever the user selected
  project_type: 'New Install',
  referral_source: 'Google Search',
  conversion_event: 'generate_lead'
}
```

---

## 4. GOOGLE ADS CONVERSION TRACKING (via GTM)

### Step 1 — Get Your Conversion ID & Label from Google Ads

1. In Google Ads: **Tools → Conversions → + New conversion action**
2. Choose **Website**
3. Category: **Lead** / Action: **Submit lead form**
4. Copy the **Conversion ID** (e.g. `AW-123456789`) and **Conversion Label**

### Step 2 — Create the GTM Trigger

In GTM:
1. **Triggers → New**
2. Name: `Contact Form Submit`
3. Trigger type: **Custom Event**
4. Event name: `contact_form_submit`
5. Save

### Step 3 — Create the Google Ads Conversion Tag

In GTM:
1. **Tags → New**
2. Name: `Google Ads — Lead Conversion`
3. Tag type: **Google Ads Conversion Tracking**
4. Conversion ID: `AW-123456789` (from Step 1)
5. Conversion Label: (from Step 1)
6. Conversion value: leave blank or set a value (e.g. `50` for a lead)
7. Trigger: `Contact Form Submit` (from Step 2)
8. Save

### Step 4 — Add Google Ads Remarketing Tag (Optional)

1. **Tags → New**
2. Tag type: **Google Ads Remarketing**
3. Conversion ID: same `AW-` ID
4. Trigger: **All Pages**

### Step 5 — Publish

1. In GTM: click **Submit → Publish**
2. In Google Ads: go back to your conversion action — it should show **Status: Recording** within 24–48 hours of the first form submission

---

## VERCEL ENVIRONMENT VARIABLES SUMMARY

All variables to add in Vercel → Settings → Environment Variables:

| Variable | Where to get it |
|---|---|
| `RESEND_API_KEY` | resend.com → API Keys |
| `GOOGLE_SHEET_ID` | From your Google Sheet URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | From downloaded service account JSON |
| `GOOGLE_PRIVATE_KEY` | From downloaded service account JSON |
| `NEXT_PUBLIC_GTM_ID` | From tagmanager.google.com (format: GTM-XXXXXXX) |

After adding all variables: **Redeploy** the site from Vercel dashboard for them to take effect.

---

## TESTING CHECKLIST

- [ ] Submit the contact form on the live site
- [ ] Confirm email arrives at info@atlasrugflooring.com within 30 seconds
- [ ] Check the Google Sheet — new row should appear
- [ ] In GTM Preview mode, verify `contact_form_submit` event fires on submission
- [ ] In Google Ads, check conversion status after 24 hours
