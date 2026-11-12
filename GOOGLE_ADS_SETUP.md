# Connect Google Ads → automatic ad-spend sync

Once this is set up, the Lead Manager pulls your **exact** ad spend from Google
Ads every day (and on demand with the **Sync now** button), so you never type a
number. It reads your **total account spend per month** — since you're all-in on
carpet, that's your carpet spend.

You do this **once**. The slow part is Google approving your API token (usually
1–3 business days), so start Step 1 first and come back for the rest.

---

## What you'll end up with

Five values (plus two optional) that you'll paste into **Vercel → your project →
Settings → Environment Variables**:

| Variable | What it is |
|---|---|
| `GOOGLE_ADS_DEVELOPER_TOKEN` | Your Google Ads API token (Step 1) |
| `GOOGLE_ADS_CLIENT_ID` | OAuth client ID (Step 2) |
| `GOOGLE_ADS_CLIENT_SECRET` | OAuth client secret (Step 2) |
| `GOOGLE_ADS_REFRESH_TOKEN` | Refresh token (Step 3) |
| `GOOGLE_ADS_CUSTOMER_ID` | Your ad account number, e.g. `123-456-7890` (Step 4) |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | *Optional* — your manager (MCC) account number, if your account sits under one |
| `CRON_SECRET` | *Any random string you make up* — lets the daily auto-sync run securely |

---

## Step 1 — Get a Developer Token (start this first)

1. Sign in to **[Google Ads](https://ads.google.com)** with the account that runs your campaigns.
2. Top menu: **Tools → Setup → API Center** (you may need to be on a **Manager
   account**; if you don't have one, create a free manager account and link your
   ad account to it — the API Center only appears there).
3. Copy the **Developer token** shown. A brand-new token has **Test** access
   only, which can't read real campaigns — click **Apply for Basic access**,
   fill in the short form, and wait for approval (1–3 days).

> When the token says **Basic access** (not Test), it's ready.

## Step 2 — Create OAuth credentials

1. Go to the **[Google Cloud Console](https://console.cloud.google.com)** and
   create a project (or reuse one).
2. **APIs & Services → Library →** search **"Google Ads API" → Enable**.
3. **APIs & Services → OAuth consent screen:** choose **External**, fill in the
   app name/email, and add **your own email** as a **Test user** (so you can
   authorize it without a public review).
4. **APIs & Services → Credentials → Create credentials → OAuth client ID →**
   Application type **Desktop app**. Copy the **Client ID** and **Client secret**.

## Step 3 — Get a Refresh Token (easiest: OAuth Playground)

1. Open **[developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)**.
2. Click the **⚙️ gear (top right) → tick "Use your own OAuth credentials"** and
   paste your **Client ID** and **Client secret** from Step 2.
3. In the left box, scroll to the bottom, and in **"Input your own scopes"** type:
   `https://www.googleapis.com/auth/adwords` → **Authorize APIs**.
4. Sign in with the Google account that can see your ad data and allow access.
5. Click **Exchange authorization code for tokens**. Copy the **Refresh token**
   (a long string starting with `1//`).

## Step 4 — Find your Customer ID

- It's the 10-digit number at the top right of Google Ads, e.g. **123-456-7890**
  (dashes are fine). This is the account you want spend from.
- If that account sits **under a manager (MCC) account**, also grab the
  manager's number for `GOOGLE_ADS_LOGIN_CUSTOMER_ID`.

## Step 5 — Put the values in Vercel

1. Vercel → your project → **Settings → Environment Variables**.
2. Add each variable from the table above (set them for **Production**).
3. For `CRON_SECRET`, invent a long random string (e.g. mash the keyboard) — it
   just needs to be secret.
4. **Redeploy** (Vercel → Deployments → ⋯ → Redeploy) so the new variables take
   effect.

## Step 6 — Confirm it works

1. Open the Lead Manager → **Reports**. The **Ad spend** card should now show
   **⚡ Auto-synced from Google Ads**.
2. Tap **Sync now**. Within a few seconds it should say **Synced ✓** and your
   real spend should fill in (this month and recent months).
3. If it shows an error instead, it tells you what Google said — the usual
   culprits:
   - *"developer token ... not approved"* → Step 1 still pending.
   - *"invalid_client" / "unauthorized"* → double-check Client ID/secret and
     refresh token.
   - *"user doesn't have permission" / "customer not found"* → check the
     Customer ID, and set `GOOGLE_ADS_LOGIN_CUSTOMER_ID` if the account is under
     a manager.

---

## How it runs

- A scheduled job runs **daily at 08:00 UTC** (`vercel.json → crons`) and
  refreshes every month's spend automatically.
- **Sync now** does the same on demand.
- It writes spend into the same place manual entry used, so the whole dashboard
  (cost per lead, cost per job, return on ad spend, monthly net profit) updates
  with no other changes.
- Until the token is approved, you can keep typing spend by hand; the card
  switches to automatic the moment the credentials are live.
