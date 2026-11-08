'use client'

import { useEffect } from 'react'

// Captures how a visitor arrived (ad / organic / referral / direct) and stores
// it in a first/last-touch cookie, so the lead form can attach it on submit —
// even if the visitor browses several pages before filling it out.
//
// Google Ads auto-tagging adds ?gclid=... on every ad click, so paid traffic is
// detected with no UTM setup. Which campaign is inferred from the landing page
// (/carpet -> Carpet, /laminate -> Laminate); explicit utm_campaign wins if set.

const COOKIE = 'atlas_src'
const DAYS = 90

function setCookie(name: string, value: string, days: number) {
  try {
    const exp = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`
  } catch {
    /* ignore */
  }
}
function getCookie(name: string): string {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
    return m ? decodeURIComponent(m[1]) : ''
  } catch {
    return ''
  }
}
function titleCase(s: string) {
  return s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim()
}
function campaignFromPath(path: string): string {
  const p = path.toLowerCase()
  if (p.includes('laminate')) return 'Laminate'
  if (p.includes('carpet')) return 'Carpet'
  if (p.includes('stair') || p.includes('runner')) return 'Stair Runners'
  if (p.includes('hardwood')) return 'Hardwood'
  if (p.includes('vinyl')) return 'Vinyl'
  return 'Site'
}

function deriveSource(): string | null {
  const url = new URL(window.location.href)
  const q = (k: string) => url.searchParams.get(k) || ''
  const gclid = q('gclid') || q('gbraid') || q('wbraid')
  const utmSource = q('utm_source')
  const utmMedium = q('utm_medium')
  const utmCampaign = q('utm_campaign')

  const paid = !!gclid || /cpc|ppc|paid/i.test(utmMedium)
  if (paid) {
    const provider = utmSource ? titleCase(utmSource) : 'Google'
    const camp = utmCampaign ? titleCase(utmCampaign) : campaignFromPath(url.pathname)
    return `${provider} Ads – ${camp}`
  }
  if (utmSource) {
    return titleCase(utmSource) + (utmCampaign ? ` – ${titleCase(utmCampaign)}` : '')
  }

  const ref = document.referrer
  if (ref) {
    let host = ''
    try {
      host = new URL(ref).hostname.replace(/^www\./, '')
    } catch {
      /* ignore */
    }
    if (!host) return 'Direct'
    if (host === window.location.hostname.replace(/^www\./, '')) return null // internal nav
    if (/google\./.test(host)) return 'Organic – Google'
    if (/bing\./.test(host)) return 'Organic – Bing'
    if (/duckduckgo\./.test(host)) return 'Organic – DuckDuckGo'
    if (/yahoo\./.test(host)) return 'Organic – Yahoo'
    if (/facebook\.|instagram\.|fb\./.test(host)) return 'Social – Facebook/IG'
    if (/t\.co|twitter\.|x\.com/.test(host)) return 'Social – X/Twitter'
    return `Referral – ${host}`
  }
  return 'Direct'
}

export default function AttributionTracker() {
  useEffect(() => {
    const derived = deriveSource()
    if (derived === null) return // internal navigation — keep what we have
    const existing = getCookie(COOKIE)
    const url = new URL(window.location.href)
    const isStrong = !!(
      url.searchParams.get('gclid') ||
      url.searchParams.get('gbraid') ||
      url.searchParams.get('wbraid') ||
      url.searchParams.get('utm_source')
    )
    // New campaign click always wins (last-touch paid). Otherwise fill in a
    // missing value, or upgrade a plain "Direct" to a real source.
    if (!existing || isStrong || existing === 'Direct') {
      setCookie(COOKIE, derived, DAYS)
    }
  }, [])
  return null
}
