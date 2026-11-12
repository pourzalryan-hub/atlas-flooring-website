# Connect Google reviews (live rating + count)

This shows your **live Google star rating and review count** in the Lead
Manager, and auto-calculates "new reviews this month." It's much simpler than
the Ads setup — **just one API key**, no approval wait.

> The review **follow-up queue** (ask / follow up / mark received) works without
> any of this. This step only adds the live rating number on top.

## What you'll add to Vercel

| Variable | What it is |
|---|---|
| `GOOGLE_PLACES_API_KEY` | A Google Maps Platform API key with **Places API (New)** enabled |
| `GOOGLE_PLACES_PLACE_ID` | Your business's Place ID |

## Step 1 — Create the API key

1. In the **[Google Cloud Console](https://console.cloud.google.com)** (you can
   reuse the project from the Ads setup), go to **APIs & Services → Library**.
2. Search **"Places API (New)" → Enable**.
3. **APIs & Services → Credentials → Create credentials → API key.** Copy it.
4. (Recommended) Click the key → **Restrict key → API restrictions →** allow only
   **Places API (New)**, so the key can't be misused.

## Step 2 — Find your Place ID

1. Open the **[Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)**.
2. Search **"Atlas Rug & Design Centre, 978 Bathurst St, Toronto"**.
3. Copy the **Place ID** (looks like `ChIJ...`).

## Step 3 — Add to Vercel & redeploy

1. Vercel → your project → **Settings → Environment Variables** → add both
   values (Production).
2. **Redeploy.**

## Step 4 — Confirm

- Open the Lead Manager → Today → **⭐ Reviews**. The top card should show your
  live **rating ★ and review count**. Tap **Sync now** to refresh.
- From then on it refreshes automatically every day (same daily job as ad spend),
  and fills "new reviews this month" into the scorecard.

### Note
"New reviews this month" counts upward from the first time it syncs in a given
month, so it's accurate from your first sync onward. The total count and rating
are always exact.
