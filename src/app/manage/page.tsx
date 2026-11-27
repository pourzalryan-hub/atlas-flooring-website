'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type QuoteItem = { desc: string; qty: string; unit: string; price: string }
type QuoteData = { items: QuoteItem[]; taxRate: string }

type Lead = {
  row: number
  date: string
  name: string
  address: string
  phone: string
  email: string
  product: string
  status: string
  bookedDate: string
  value: string | number
  material: string | number
  install: string | number
  deposit: string | number
  payment: string
  followUp: string
  notes: string
  source?: string
  installDate?: string
  tasks?: string
  quote?: QuoteData
  lostReason?: string
  reviewAsked?: string      // ISO date the review was first requested
  reviewLastAsked?: string  // ISO date of the most recent nudge
  reviewDone?: string       // ISO date we confirmed they left a review
  reviewStop?: string       // ISO date we stopped asking (declined / not interested)
  deleted?: boolean         // soft-deleted (hidden everywhere; can be undone)
}

// Objection / follow-up scripts (from the old Command Center).
const FOLLOWUP_SCRIPTS: { when: string; text: string }[] = [
  { when: 'No response to quote', text: "Hi [Name], it's Ryan at Atlas Rug & Design Centre. Just checking you got the quote for your [product] — happy to answer questions or tweak anything. When works for a quick call?" },
  { when: '"Need to think about it"', text: "Totally fair — big decision. Can I ask what's giving you pause, the budget or the product? I'd rather help you get it right than rush you." },
  { when: '"Getting other quotes"', text: "Smart — you should compare. One tip: make sure each quote is itemized so you're comparing apples to apples. Ours spells out carpet, underpad, labour and removal separately. Happy to walk through ours." },
  { when: '"It\'s too expensive"', text: "I hear you. We can look at a different grade or do just the main rooms to hit your budget — or I can show you what each line buys. What number were you hoping to land near?" },
  { when: 'Went silent after measure', text: "Hi [Name], Ryan at Atlas. Don't want to pester you — if timing changed, no problem. If you're still deciding, I'm here. Want me to hold the quote as-is for now?" },
  { when: 'After the job — get the review', text: "Hi [Name], hope you're loving the new floors! If you have 30 seconds, a quick Google review really helps our family business: https://www.atlasrugflooring.com/review. Thank you!" },
]

const LOST_REASONS = [
  'Too expensive',
  'Timing / not ready',
  'Went with competitor',
  'Too far / distance',
  "Didn't like the products",
  "We didn't carry it",
  'Difficult customer',
  'No response / ghosted',
  'Changed their mind',
  'Other',
]

// Post-sale operational to-dos — independent of the pipeline stage. A job can
// need several at once (ordered + binding + unpaid). Stored comma-separated.
const JOB_TASKS = [
  { key: 'sendquote', label: 'Send quote', short: 'Send quote', icon: 'doc' },
  { key: 'schedule', label: 'Schedule install', short: 'Schedule', icon: 'calendar' },
  { key: 'order', label: 'Order carpet', short: 'To order', icon: 'box' },
  { key: 'pickup', label: 'Pick up carpet', short: 'Pick up', icon: 'truck' },
  { key: 'binding', label: 'Send to binding', short: 'Binding', icon: 'scissors' },
  { key: 'unpaid', label: 'Awaiting payment', short: 'Unpaid', icon: 'card' },
] as const
const taskSet = (l: Lead): Set<string> =>
  new Set(String(l.tasks || '').split(',').map((s) => s.trim()).filter(Boolean))

const STAGES = ['New', 'Appointment', 'Quoted', 'Sold', 'Booked', 'Completed', 'Paid', 'Lost'] as const
type Stage = (typeof STAGES)[number]

// Map older / free-text statuses onto the current stages so nothing is lost.
const STAGE_ALIASES: Record<string, Stage> = {
  '': 'New', lead: 'New', new: 'New',
  contacted: 'Appointment', appt: 'Appointment', appointment: 'Appointment', measure: 'Appointment', consult: 'Appointment',
  quoted: 'Quoted', quote: 'Quoted', estimate: 'Quoted', estimated: 'Quoted',
  sold: 'Sold', won: 'Sold', deposit: 'Sold', closed: 'Sold',
  booked: 'Booked', scheduled: 'Booked', install: 'Booked', installdate: 'Booked',
  completed: 'Completed', complete: 'Completed', done: 'Completed', installed: 'Completed',
  paid: 'Paid', settled: 'Paid',
  lost: 'Lost', dead: 'Lost', cancelled: 'Lost', canceled: 'Lost',
}
const normalize = (s: string): Stage => {
  const v = (s || '').trim().toLowerCase()
  return STAGE_ALIASES[v] || STAGES.find((x) => x.toLowerCase() === v) || 'New'
}
const num = (v: string | number) => {
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}
const dollars = (n: number) => (n ? '$' + Math.round(n).toLocaleString('en-US') : '—')
const money2 = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// --- App settings (targets + monthly ad spend / overhead / reviews) --------
type MonthCfg = { adSpend?: number; overhead?: number; reviews?: number }
type Settings = { targets?: Record<string, number>; months?: Record<string, MonthCfg>; lastAdSync?: string; defaultOverhead?: number }
type ReviewState = { total: number; rating: number; syncedAt: string; baselines: Record<string, number> }
// Targets carried over from the old Command Center; each is editable in the app.
const DEFAULT_TARGETS: Record<string, number> = { bookingRate: 0.4, closeRate: 0.45, avgTicket: 3000, netProfit: 0.18, reviews: 5 }

// --- Quote builder --------------------------------------------------------
const DEFAULT_TAX = '13' // Ontario HST
const QUOTE_PRESETS: { desc: string; unit: string }[] = [
  { desc: 'Carpet', unit: 'sq ft' },
  { desc: 'Underpad', unit: 'sq ft' },
  { desc: 'Installation', unit: 'sq ft' },
  { desc: 'Stairs', unit: 'step' },
  { desc: 'Landing', unit: 'each' },
  { desc: 'Removal / disposal', unit: 'sq ft' },
  { desc: 'Binding', unit: 'each' },
  { desc: 'Item', unit: '' },
]
// Ideal measure slots — 2 bookings/day; the Schedule view shows which are open.
const IDEAL_SLOTS = ['9–10 AM', '4–5 PM']
const firstName = (n: string) => String(n || '').trim().split(/\s+/)[0] || '(lead)'

const emptyQuote = (): QuoteData => ({ items: [], taxRate: DEFAULT_TAX })
const quoteItemAmount = (it: QuoteItem) => num(it.qty || '0') * num(it.price || '0')
const quoteTotals = (q: QuoteData) => {
  const subtotal = q.items.reduce((s, it) => s + quoteItemAmount(it), 0)
  const tax = subtotal * (num(q.taxRate) / 100)
  return { subtotal, tax, total: subtotal + tax }
}
const escHtml = (s: string) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const monthKey = (d: string) => (/\d{4}-\d{2}/.test(String(d)) ? String(d).slice(0, 7) : 'other')
const monthLabel = (k: string) => {
  if (k === 'other') return 'Older / undated'
  const dt = new Date(k + '-01T00:00:00')
  return isNaN(dt.getTime()) ? k : dt.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

// --- Appointments ---------------------------------------------------------
// Stored in the existing "booked date" sheet column as "YYYY-MM-DD <window>"
// (e.g. "2026-11-10 9–10 AM"), so no new columns / Apps Script redeploy needed.
const APPT_WINDOWS = [
  '8–9 AM', '9–10 AM', '10–11 AM', '11 AM–12 PM', '12–1 PM', '1–2 PM',
  '2–3 PM', '3–4 PM', '4–5 PM', '5–6 PM', 'Morning (9–12)', 'Afternoon (12–4)',
]
const pad2 = (n: number) => String(n).padStart(2, '0')
const toISO = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
const parseAppt = (s: string) => {
  const m = /^(\d{4}-\d{2}-\d{2})(?:[ T]+(.*))?$/.exec(String(s || '').trim())
  return m ? { date: m[1], window: (m[2] || '').trim() } : { date: '', window: '' }
}
const joinAppt = (date: string, win: string) => (date ? (win ? `${date} ${win}` : date) : win)
const fmtApptDate = (iso: string) => {
  const d = new Date(iso + 'T00:00:00')
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}
const apptSort = (w: string) => {
  const i = APPT_WINDOWS.indexOf(w)
  return i === -1 ? 99 : i
}

// Scheduled calendar items for a lead — the measure appointment and the
// install date. Never filtered by stage, so completed/paid jobs still show.
type SchedEvent = { lead: Lead; date: string; kind: 'measure' | 'install'; badge: string; sort: number }
const leadEvents = (l: Lead): SchedEvent[] => {
  const out: SchedEvent[] = []
  const appt = parseAppt(String(l.bookedDate || ''))
  if (appt.date) out.push({ lead: l, date: appt.date, kind: 'measure', badge: appt.window || 'Time TBD', sort: apptSort(appt.window) })
  const inst = String(l.installDate || '').slice(0, 10)
  if (/^\d{4}-\d{2}-\d{2}$/.test(inst)) out.push({ lead: l, date: inst, kind: 'install', badge: 'Install', sort: 500 })
  return out
}

// Google Maps directions link for an address.
const mapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

// Monday (local) of the week containing `base`, shifted by `offset` weeks.
const startOfWeek = (base: Date, offset: number) => {
  const d = new Date(base)
  const dow = (d.getDay() + 6) % 7 // Monday = 0
  d.setDate(d.getDate() - dow + offset * 7)
  d.setHours(0, 0, 0, 0)
  return d
}

const segCls = (active: boolean) =>
  `flex-1 px-2 py-2 rounded-full text-[13px] font-semibold border transition-colors whitespace-nowrap ${
    active ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-stone-200 hover:border-gold'
  }`

// Whole days since a date (0 if unparseable).
const daysSince = (d: string) => {
  const t = new Date(d).getTime()
  return isNaN(t) ? 0 : Math.floor((Date.now() - t) / 864e5)
}

// Short "time ago" label for a timestamp (e.g. "3h ago"); '' if unparseable.
const relTime = (iso?: string) => {
  if (!iso) return ''
  const t = new Date(iso).getTime()
  if (isNaN(t)) return ''
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000))
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

// Does this lead need a follow-up nudge, and why?
const followUpInfo = (l: Lead): { flag: boolean; reason: string; urgency: number } => {
  const stage = normalize(l.status)
  if (['Sold', 'Booked', 'Completed', 'Paid', 'Lost'].includes(stage)) return { flag: false, reason: '', urgency: 0 }
  const age = daysSince(String(l.date))
  const appt = parseAppt(String(l.bookedDate || ''))
  const todayIso = toISO(new Date())
  if (stage === 'Appointment' && appt.date && appt.date < todayIso) return { flag: true, reason: `Appointment was ${fmtApptDate(appt.date)}`, urgency: 4 }
  if (stage === 'Quoted' && age >= 2) return { flag: true, reason: 'Quote sent · follow up', urgency: 3 }
  if (stage === 'New' && age >= 1) return { flag: true, reason: `New lead · ${age}d old`, urgency: age >= 3 ? 3 : 2 }
  if (stage === 'Appointment' && !appt.date && age >= 2) return { flag: true, reason: 'No appointment booked yet', urgency: 2 }
  if (age >= 7) return { flag: true, reason: `No update in ${age}d`, urgency: 1 }
  return { flag: false, reason: '', urgency: 0 }
}

// Group a free-text product into a reporting category.
const productBucket = (p: string): string => {
  const s = (p || '').toLowerCase()
  if (/stair|runner/.test(s)) return 'Stairs & Runners'
  if (/laminate/.test(s)) return 'Laminate'
  if (/carpet|broadloom/.test(s)) return 'Carpet'
  if (/vinyl|lvp|lvt/.test(s)) return 'Vinyl'
  if (/hardwood|engineered/.test(s)) return 'Hardwood'
  if (/rug/.test(s)) return 'Area Rugs'
  if (/refinish/.test(s)) return 'Refinishing'
  return 'Other'
}

const WON = ['Sold', 'Booked', 'Completed', 'Paid']

// Review request (texts the branded /review link).
const REVIEW_URL = 'https://www.atlasrugflooring.com/review'
const reviewMessage = (name: string) => {
  const first = (name || '').trim().split(/\s+/)[0]
  return `Hi${first ? ' ' + first : ''}, thanks again for choosing Atlas Rug & Design Centre! If you have 30 seconds, we'd really appreciate a quick review — it means a lot to our family business: ${REVIEW_URL}`
}
const smsHref = (phone: string, body: string) => `sms:${phone}?&body=${encodeURIComponent(body)}`
const mailtoHref = (email: string, subject: string, body: string) =>
  // CRLF line breaks so phone mail apps keep the paragraphs instead of collapsing them.
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\r?\n/g, '\r\n'))}`

// First-reply email — opens the mail app pre-filled with Ryan's template.
const REPLY_SUBJECT = 'Thanks for reaching out — Atlas Rug & Design Centre'
const replyMessage = (name: string, product: string) => {
  const first = String(name || '').trim().split(/\s+/)[0]
  const about = String(product || '').trim() ? ` about ${String(product).trim()}` : ''
  return `Hi ${first || 'there'},

Thanks for reaching out to Atlas Rug & Design Centre${about}.

I'd be glad to help. What's a good time for a quick call?

Talk soon,
Ryan Atlas Rug & Design Centre
Cell: 647 895 9393
Off: 416 533 3366`
}

// Remember which leads we've asked for a review (per-device).
const REVIEW_KEY = 'atlas_reviews_asked'
const readAsked = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(REVIEW_KEY) || '{}')
  } catch {
    return {}
  }
}
const markAsked = (row: number) => {
  try {
    const m = readAsked()
    m[String(row)] = toISO(new Date())
    localStorage.setItem(REVIEW_KEY, JSON.stringify(m))
  } catch {
    /* ignore */
  }
}

// Review follow-up queue. A finished job (Completed/Paid) that hasn't left a
// review yet moves To ask → Waiting → Follow up as the days pass.
const REVIEW_FOLLOWUP_DAYS = 4
const reviewBuckets = (leads: Lead[]) => {
  const toAsk: Lead[] = []
  const waiting: Lead[] = []
  const followUp: Lead[] = []
  const got = leads.filter((l) => !!l.reviewDone)
  leads
    .filter((l) => ['Completed', 'Paid'].includes(normalize(l.status)) && !l.reviewDone && !l.reviewStop)
    .forEach((l) => {
      if (!l.reviewAsked) { toAsk.push(l); return }
      const since = daysSince(String(l.reviewLastAsked || l.reviewAsked))
      ;(since >= REVIEW_FOLLOWUP_DAYS ? followUp : waiting).push(l)
    })
  return { toAsk, waiting, followUp, got }
}

const isRealLead = (l: Lead) => {
  const validDate = /\d{4}/.test(String(l.date)) && !isNaN(new Date(l.date).getTime())
  return validDate || /\d/.test(String(l.phone ?? '')) || /@/.test(String(l.email ?? ''))
}

// Ways to order the Leads list. The choice is remembered on this device.
const SORT_OPTIONS = [
  { key: 'newest', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'value', label: 'Highest value' },
  { key: 'name', label: 'Name A–Z' },
  { key: 'appt', label: 'Next appointment' },
  { key: 'stage', label: 'Stage' },
  { key: 'owed', label: 'Most owed' },
] as const
type SortKey = (typeof SORT_OPTIONS)[number]['key']
const sortLeads = (list: Lead[], sort: SortKey): Lead[] => {
  const byDateDesc = (a: Lead, b: Lead) => String(b.date).localeCompare(String(a.date))
  const out = [...list]
  switch (sort) {
    case 'oldest':
      return out.sort((a, b) => String(a.date).localeCompare(String(b.date)))
    case 'value':
      return out.sort((a, b) => num(b.value) - num(a.value) || byDateDesc(a, b))
    case 'name':
      return out.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), undefined, { sensitivity: 'base' }))
    case 'appt': {
      // Soonest upcoming measure or install first; no date goes to the bottom.
      const today = toISO(new Date())
      const next = (l: Lead) => leadEvents(l).map((e) => e.date).filter((d) => d >= today).sort()[0] || '9999'
      return out.sort((a, b) => next(a).localeCompare(next(b)) || byDateDesc(a, b))
    }
    case 'stage':
      return out.sort((a, b) => STAGES.indexOf(normalize(a.status)) - STAGES.indexOf(normalize(b.status)) || byDateDesc(a, b))
    case 'owed': {
      const owed = (l: Lead) => (['Sold', 'Booked', 'Completed'].includes(normalize(l.status)) ? Math.max(0, num(l.value) - num(l.deposit)) : 0)
      return out.sort((a, b) => owed(b) - owed(a) || byDateDesc(a, b))
    }
    default:
      return out.sort(byDateDesc)
  }
}

// Same person entered twice? Match on phone digits (last 10) or email.
const phoneKey = (p: unknown) => String(p ?? '').replace(/\D/g, '').slice(-10)
const findDuplicates = (leads: Lead[]): Record<number, Lead[]> => {
  const groups: Record<string, Lead[]> = {}
  leads.forEach((l) => {
    const keys = new Set<string>()
    const ph = phoneKey(l.phone)
    if (ph.length >= 7) keys.add('p:' + ph)
    const em = String(l.email ?? '').trim().toLowerCase()
    if (/@/.test(em)) keys.add('e:' + em)
    keys.forEach((k) => (groups[k] = groups[k] || []).push(l))
  })
  const out: Record<number, Lead[]> = {}
  Object.values(groups).forEach((g) => {
    if (g.length < 2) return
    g.forEach((l) => {
      const others = g.filter((o) => o.row !== l.row)
      const cur = out[l.row] || []
      others.forEach((o) => { if (!cur.some((c) => c.row === o.row)) cur.push(o) })
      out[l.row] = cur
    })
  })
  return out
}

const STAGE_STYLE: Record<Stage, string> = {
  New: 'bg-blue-100 text-blue-800',
  Appointment: 'bg-amber-100 text-amber-800',
  Quoted: 'bg-purple-100 text-purple-800',
  Sold: 'bg-indigo-100 text-indigo-800',
  Booked: 'bg-emerald-100 text-emerald-800',
  Completed: 'bg-stone-200 text-stone-700',
  Paid: 'bg-teal-100 text-teal-800',
  Lost: 'bg-red-100 text-red-700',
}

const fieldCls = 'bg-white border border-stone-300 rounded-lg px-3 py-2.5 min-h-[2.75rem] text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold'
// Shared surfaces, so every card and section label looks the same.
const sectionLabel = 'text-[11px] font-bold uppercase tracking-[0.08em] text-warm-grey'

// --- Icons ------------------------------------------------------------------
// One small line-icon set (24px grid) so the app has a consistent visual voice
// instead of leaning on emoji, which render differently on every device.
const ICONS: Record<string, ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  users: (<><circle cx="9" cy="7.5" r="3.5" /><path d="M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1" /><path d="M16 4.3a3.5 3.5 0 0 1 0 6.4M18.5 14.4a5 5 0 0 1 3 4.6v1" /></>),
  calendar: (<><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /></>),
  dollar: (<><circle cx="12" cy="12" r="9" /><path d="M14.8 9.3c-.5-.9-1.5-1.4-2.8-1.4-1.6 0-2.8.8-2.8 2 0 2.8 5.8 1.3 5.8 4.2 0 1.3-1.3 2.1-3 2.1-1.4 0-2.5-.5-3.1-1.5M12 6v12" /></>),
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" />,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  message: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7.5 8.5 6 8.5-6" /></>),
  pin: (<><path d="M19.5 10c0 5.5-7.5 11.5-7.5 11.5S4.5 15.5 4.5 10a7.5 7.5 0 0 1 15 0z" /><circle cx="12" cy="10" r="2.7" /></>),
  link: (<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>),
  plus: <path d="M12 5v14M5 12h14" />,
  refresh: (<><path d="M22 4v6h-6" /><path d="M19.7 15a8.5 8.5 0 1 1-2-8.84L22 10" /></>),
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: (<><path d="M12 4.5 2.8 19.5h18.4z" /><path d="M12 10.5v4M12 17.3v.2" /></>),
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></>),
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z" />,
  doc: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>),
  box: (<><path d="m21 8-9-5-9 5v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></>),
  truck: (<><path d="M2 6h11v10H2zM13 9.5h4l4 3.5v3h-8z" /><circle cx="6.5" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" /></>),
  scissors: (<><circle cx="6" cy="6.5" r="2.5" /><circle cx="6" cy="17.5" r="2.5" /><path d="M8.1 8.2 20 18M8.1 15.8 20 6" /></>),
  card: (<><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 10h19M6.5 14.5h4" /></>),
}
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
      className={`shrink-0 ${className}`} aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

// Round one-tap contact button used on rows (call / text).
function RoundAction({ href, label, icon, tone = 'gold' }: { href: string; label: string; icon: string; tone?: 'gold' | 'plain' }) {
  return (
    <a href={href} onClick={(e) => e.stopPropagation()} aria-label={label}
      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
        tone === 'gold' ? 'bg-gold/15 text-gold-dark hover:bg-gold/25' : 'bg-stone-100 text-charcoal hover:bg-stone-200'
      }`}>
      <Icon name={icon} className="w-4 h-4" />
    </a>
  )
}

const VIEW_TITLE = { today: 'Today', leads: 'Leads', schedule: 'Schedule', reports: 'Money', reviews: 'Reviews' } as const

export default function ManagePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<string>('All') // 'All' | Stage | 'Needs follow-up' | `task:<key>`
  const [search, setSearch] = useState('')
  const [sort, setSortState] = useState<SortKey>('newest')
  useEffect(() => {
    try {
      const s = localStorage.getItem('atlas_sort') as SortKey | null
      if (s && SORT_OPTIONS.some((o) => o.key === s)) setSortState(s)
    } catch { /* ignore */ }
  }, [])
  const setSort = (s: SortKey) => {
    setSortState(s)
    try { localStorage.setItem('atlas_sort', s) } catch { /* ignore */ }
  }
  const [selected, setSelected] = useState<Lead | null>(null)
  const [month, setMonth] = useState('')
  const [adding, setAdding] = useState(false)
  const [view, setView] = useState<'today' | 'leads' | 'schedule' | 'reports' | 'reviews'>('today')
  const [canImport, setCanImport] = useState(false)
  const [importing, setImporting] = useState(false)
  const [paying, setPaying] = useState<Lead | null>(null)

  const load = async (silent = false) => {
    if (!silent) setLoading(true)
    setError('')
    try {
      const res = await fetch('/manage/api/leads', { cache: 'no-store' })
      if (res.status === 401) {
        window.location.href = '/manage/login?next=/manage'
        return
      }
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Could not load')
      const all: Lead[] = Array.isArray(json.leads) ? json.leads : []
      // Auto-categorize fully-collected won jobs as "Paid".
      const fixRows: number[] = []
      const swept = all.filter((l) => isRealLead(l) && !l.deleted).map((l) => {
        const st = normalize(l.status)
        if ((st === 'Booked' || st === 'Completed') && num(l.value) > 0 && num(l.value) - num(l.deposit) < 0.01) {
          fixRows.push(l.row)
          return { ...l, status: 'Paid' }
        }
        return l
      })
      setLeads(swept)
      setCanImport(!!json.canImport)
      fixRows.forEach((row) => {
        fetch('/manage/api/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ row, status: 'Paid' }),
        }).catch(() => {})
      })
    } catch (e) {
      if (!silent) setError(e instanceof Error ? e.message : 'Could not load leads')
    } finally {
      if (!silent) setLoading(false)
    }
  }
  useEffect(() => {
    load()
  }, [])

  // Keep the data fresh: silently refetch when you return to the app and on a
  // light interval, so the schedule never shows stale info. Skip while a lead
  // panel is open so an in-progress edit isn't disturbed.
  const editingRef = useRef(false)
  editingRef.current = selected !== null || adding
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible' && !editingRef.current) load(true)
    }
    document.addEventListener('visibilitychange', refresh)
    window.addEventListener('focus', refresh)
    const id = setInterval(refresh, 60000)
    return () => {
      document.removeEventListener('visibilitychange', refresh)
      window.removeEventListener('focus', refresh)
      clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const monthLeads = useMemo(
    () => leads.filter((l) => month === 'all' || !month || monthKey(l.date) === month),
    [leads, month]
  )

  const monthOptions = useMemo(() => {
    const c: Record<string, number> = {}
    leads.forEach((l) => {
      const k = monthKey(l.date)
      c[k] = (c[k] || 0) + 1
    })
    const keys = Object.keys(c).filter((k) => k !== 'other').sort().reverse()
    if (c['other']) keys.push('other')
    return keys.map((k) => ({ key: k, label: monthLabel(k), count: c[k] }))
  }, [leads])

  // Default to the most recent month so old leads don't clutter the view.
  useEffect(() => {
    if (!month && monthOptions.length) setMonth(monthOptions[0].key)
  }, [monthOptions, month])

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: monthLeads.length }
    STAGES.forEach((s) => (c[s] = 0))
    monthLeads.forEach((l) => (c[normalize(l.status)] += 1))
    return c
  }, [monthLeads])

  // Operational dashboard KPIs — current state, across all leads (not month-filtered).
  const kpis = useMemo(() => {
    const todayIso = toISO(new Date())
    const active = leads.filter((l) => !['Completed', 'Lost'].includes(normalize(l.status))).length
    const quotesPending = leads.filter((l) => normalize(l.status) === 'Quoted').length
    const upcomingInstalls = leads.filter((l) => {
      const d = String(l.installDate || '').slice(0, 10)
      return /^\d{4}-\d{2}-\d{2}$/.test(d) && d >= todayIso
    }).length
    const outstanding = leads
      .filter((l) => ['Sold', 'Booked', 'Completed'].includes(normalize(l.status)))
      .reduce((s, l) => s + Math.max(0, num(l.value) - num(l.deposit)), 0)
    return { active, quotesPending, upcomingInstalls, outstanding }
  }, [leads])

  // Leads needing a nudge — computed across ALL leads (not month-filtered),
  // sorted most-urgent first, so time-sensitive follow-ups are never hidden.
  const followUpLeads = useMemo(
    () =>
      leads
        .map((l) => ({ l, info: followUpInfo(l) }))
        .filter((x) => x.info.flag)
        .sort((a, b) => b.info.urgency - a.info.urgency)
        .map((x) => x.l),
    [leads]
  )

  // Leads that share a phone or email with another lead.
  const dupMap = useMemo(() => findDuplicates(leads), [leads])
  const dupCount = Object.keys(dupMap).length
  // Once the last duplicate is cleaned up, leave the (now empty) Duplicates view.
  useEffect(() => {
    if (filter === 'Duplicates' && dupCount === 0) setFilter('All')
  }, [filter, dupCount])

  // Job to-do rollup (across all leads).
  const todoChips = useMemo(() => {
    const counts: Record<string, number> = {}
    leads.forEach((l) => taskSet(l).forEach((k) => (counts[k] = (counts[k] || 0) + 1)))
    return JOB_TASKS.filter((t) => counts[t.key]).map((t) => ({ ...t, count: counts[t.key] }))
  }, [leads])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    const bySearch = (l: Lead) =>
      !q || `${l.name} ${l.phone} ${l.email} ${l.product} ${l.address}`.toLowerCase().includes(q)
    let list: Lead[]
    if (filter === 'Needs follow-up') list = followUpLeads.filter(bySearch)
    else if (filter === 'Duplicates') {
      // Keep each duplicate group together: sort by phone/email key, then date.
      const key = (l: Lead) => phoneKey(l.phone) || String(l.email ?? '').toLowerCase()
      return leads.filter((l) => dupMap[l.row]).filter(bySearch)
        .sort((a, b) => key(a).localeCompare(key(b)) || String(b.date).localeCompare(String(a.date)))
    } else if (filter.startsWith('task:')) {
      const key = filter.slice(5)
      list = leads.filter((l) => taskSet(l).has(key)).filter(bySearch)
    } else {
      list = monthLeads.filter((l) => filter === 'All' || normalize(l.status) === filter).filter(bySearch)
    }
    return sortLeads(list, sort)
  }, [monthLeads, leads, followUpLeads, filter, search, sort, dupMap])

  const onSaved = (row: number, patch: Partial<Lead>) => {
    setLeads((ls) => ls.map((l) => (l.row === row ? { ...l, ...patch } : l)))
    setSelected((s) => (s && s.row === row ? { ...s, ...patch } : s))
  }

  // Delete = hide the lead everywhere (soft delete), with a short Undo window.
  const [undoLead, setUndoLead] = useState<Lead | null>(null)
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const persist = (row: number, patch: Partial<Lead>) =>
    fetch('/manage/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ row, ...patch }),
    }).catch(() => {})
  const deleteLead = (lead: Lead) => {
    setSelected(null)
    setLeads((ls) => ls.filter((l) => l.row !== lead.row))
    persist(lead.row, { deleted: true })
    setUndoLead(lead)
    if (undoTimer.current) clearTimeout(undoTimer.current)
    undoTimer.current = setTimeout(() => setUndoLead(null), 8000)
  }
  const undoDelete = () => {
    if (!undoLead) return
    const l = undoLead
    setUndoLead(null)
    setLeads((ls) => (ls.some((x) => x.row === l.row) ? ls : [...ls, { ...l, deleted: false }]))
    persist(l.row, { deleted: false })
  }

  // Optimistically patch a lead and persist it (used by the review queue).
  const saveLead = async (lead: Lead, patch: Partial<Lead>) => {
    onSaved(lead.row, patch)
    try {
      await fetch('/manage/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: lead.row, ...patch }),
      })
    } catch {
      /* optimistic; a refresh reconciles */
    }
  }

  // Record a payment on a lead (bumps collected, may mark Paid).
  const recordPayment = async (lead: Lead, patch: Partial<Lead>) => {
    onSaved(lead.row, patch) // optimistic
    try {
      await fetch('/manage/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: lead.row, ...patch }),
      })
    } catch {
      /* optimistic; a refresh reconciles */
    }
  }

  // Book a lead's measure into an open slot from the Schedule availability grid.
  const bookSlot = async (lead: Lead, dateISO: string, slot: string) => {
    const bookedDate = `${dateISO} ${slot}`
    onSaved(lead.row, { bookedDate }) // optimistic
    try {
      await fetch('/manage/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: lead.row, bookedDate }),
      })
    } catch {
      /* optimistic; a refresh reconciles */
    }
  }

  const reviewQ = useMemo(() => reviewBuckets(leads), [leads])

  const runImport = async () => {
    setImporting(true)
    try {
      const res = await fetch('/manage/api/migrate', { method: 'POST' })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Import failed')
      await load()
    } catch (e) {
      alert('Import failed: ' + (e instanceof Error ? e.message : 'unknown error'))
    } finally {
      setImporting(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/manage/api/logout', { method: 'POST' })
    } catch {
      /* ignore */
    }
    window.location.href = '/manage/login'
  }

  // Today's appointments — always "today", independent of the Month filter.
  const today = toISO(new Date())
  const todaysAppts = useMemo(
    () =>
      leads
        .flatMap((l) => leadEvents(l))
        .filter((e) => e.date === today)
        .sort((a, b) => a.sort - b.sort),
    [leads, today]
  )

  // Leads that came in today and haven't been contacted yet — call now.
  const newToday = useMemo(
    () => leads.filter((l) => String(l.date) === today && normalize(l.status) === 'New'),
    [leads, today]
  )

  // How many ideal measure slots are still open today.
  const openToday = useMemo(() => {
    const measuresToday = leads.flatMap((l) => leadEvents(l)).filter((e) => e.kind === 'measure' && e.date === today)
    return IDEAL_SLOTS.filter((slot) => !measuresToday.some((e) => e.badge === slot)).length
  }, [leads, today])

  return (
    <main className="min-h-screen bg-off-white font-lato">
      <header className="bg-charcoal text-white sticky top-0 z-20" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold leading-none">Atlas Rug &amp; Design Centre</p>
            <h1 className="font-playfair text-[22px] leading-tight mt-1 truncate">{VIEW_TITLE[view]}</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => load()} aria-label="Refresh"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Icon name="refresh" className={`w-[18px] h-[18px] ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={() => setAdding(true)}
              className="h-9 pl-2.5 pr-3.5 rounded-full bg-gold hover:bg-gold-dark text-white text-sm font-semibold flex items-center gap-1 transition-colors">
              <Icon name="plus" className="w-4 h-4" />
              Add lead
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-5 pb-28">
        {/* One-time import from the old Google Sheet */}
        {canImport && (
          <div className="bg-gold/10 border border-gold/40 rounded-xl p-4 mb-4">
            <p className="text-sm text-charcoal font-semibold mb-1">Import your existing leads</p>
            <p className="text-xs text-warm-grey mb-3">Your database is empty. Bring over everything from your old Google Sheet — one time, nothing is deleted from the sheet.</p>
            <button
              onClick={runImport}
              disabled={importing}
              className="bg-gold text-white font-semibold px-4 py-2 rounded-full hover:bg-gold-dark transition-colors disabled:opacity-50 text-sm"
            >
              {importing ? 'Importing…' : 'Import from Google Sheet'}
            </button>
          </div>
        )}

        {view === 'today' ? (
          <TodayView
            date={today}
            todaysAppts={todaysAppts}
            newToday={newToday}
            followUpLeads={followUpLeads}
            todoChips={todoChips}
            kpis={kpis}
            openToday={openToday}
            onOpen={(l) => setSelected(l)}
            goToFilter={(f) => { setMonth('all'); setFilter(f); setView('leads') }}
            goToReports={() => setView('reports')}
            goToSchedule={() => setView('schedule')}
            goToReviews={() => setView('reviews')}
            reviewPending={reviewQ.toAsk.length + reviewQ.followUp.length}
          />
        ) : view === 'schedule' ? (
          <ScheduleView leads={leads} onOpen={(l) => setSelected(l)} onBook={bookSlot} />
        ) : view === 'reports' ? (
          <ReportsView leads={leads} onOpen={(l) => setSelected(l)} onPay={(l) => setPaying(l)} />
        ) : view === 'reviews' ? (
          <ReviewsView leads={leads} onOpen={(l) => setSelected(l)} saveLead={saveLead} />
        ) : (
        <>
        {/* Search first (find a lead fast), month beside it */}
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1 min-w-0">
            <Icon name="search" className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads…"
              aria-label="Search name, phone, email or address"
              className={`${fieldCls} w-full pl-9`}
            />
          </div>
          {filter !== 'Needs follow-up' && filter !== 'Duplicates' && !filter.startsWith('task:') && (
            <select value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Month"
              className={`${fieldCls} crm-select shrink-0 w-[9.5rem]`}>
              <option value="all">All months</option>
              {monthOptions.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label} ({m.count})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Active task filter banner */}
        {filter.startsWith('task:') && (
          <button onClick={() => setFilter('All')}
            className="w-full mb-3 flex items-center justify-between rounded-xl bg-charcoal text-white px-3.5 py-2.5 text-sm">
            <span>Showing: {JOB_TASKS.find((t) => t.key === filter.slice(5))?.label ?? 'Tasks'}</span>
            <span className="flex items-center gap-1 opacity-70">Clear <Icon name="x" className="w-3.5 h-3.5" /></span>
          </button>
        )}

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {followUpLeads.length > 0 && (
            <button
              onClick={() => setFilter('Needs follow-up')}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border font-semibold transition-colors ${
                filter === 'Needs follow-up' ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              <Icon name="alert" className="w-3.5 h-3.5" />
              Follow-ups <span className="text-xs opacity-80">{followUpLeads.length}</span>
            </button>
          )}
          {dupCount > 0 && (
            <button
              onClick={() => setFilter('Duplicates')}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border font-semibold transition-colors ${
                filter === 'Duplicates' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              <Icon name="users" className="w-3.5 h-3.5" />
              Duplicates <span className="text-xs opacity-80">{dupCount}</span>
            </button>
          )}
          {(['All', ...STAGES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                filter === s ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-stone-200'
              }`}
            >
              {s} <span className="text-xs opacity-60">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>

        {/* Count + sort */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-xs text-warm-grey">
            <span className="font-semibold text-charcoal">{visible.length}</span> lead{visible.length === 1 ? '' : 's'}
          </p>
          <label className="flex items-center gap-2 text-xs text-warm-grey">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
              className={`${fieldCls} crm-select !min-h-0 !py-1.5 w-[11rem]`}>
              {SORT_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </label>
        </div>

        {loading && <p className="text-warm-grey text-sm py-10 text-center">Loading…</p>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>}
        {!loading && !error && visible.length === 0 && (
          <p className="text-warm-grey text-sm py-10 text-center">No leads here.</p>
        )}

        {/* Compact list */}
        <div className="space-y-2">
          {visible.map((l) => (
            <Row
              key={l.row}
              lead={l}
              onOpen={() => setSelected(l)}
              reason={filter === 'Needs follow-up' ? followUpInfo(l).reason : ''}
              stat={
                sort === 'value' ? (num(l.value) > 0 ? dollars(num(l.value)) : undefined)
                : sort === 'owed' && ['Sold', 'Booked', 'Completed'].includes(normalize(l.status)) && num(l.value) - num(l.deposit) >= 0.01
                  ? `${money2(num(l.value) - num(l.deposit))} owed` : undefined
              }
            />
          ))}
        </div>
        </>
        )}

        <div className="text-center pt-6 pb-2">
          <button onClick={logout} className="text-xs text-warm-grey underline hover:text-charcoal">
            Log out
          </button>
        </div>
      </div>

      {/* Bottom navigation — every screen one tap */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="max-w-3xl mx-auto grid grid-cols-5">
          {([
            { key: 'today', icon: 'home', label: 'Today', badge: 0, badgeTone: '' },
            { key: 'leads', icon: 'users', label: 'Leads', badge: followUpLeads.length, badgeTone: 'bg-red-500' },
            { key: 'schedule', icon: 'calendar', label: 'Schedule', badge: 0, badgeTone: '' },
            { key: 'reports', icon: 'dollar', label: 'Money', badge: 0, badgeTone: '' },
            { key: 'reviews', icon: 'star', label: 'Reviews', badge: reviewQ.toAsk.length + reviewQ.followUp.length, badgeTone: 'bg-gold-dark' },
          ] as const).map((n) => {
            const on = view === n.key
            return (
              <button
                key={n.key}
                onClick={() => { setView(n.key); window.scrollTo({ top: 0 }) }}
                aria-current={on ? 'page' : undefined}
                className={`relative flex flex-col items-center gap-1 pt-2.5 pb-2 text-[10.5px] font-semibold transition-colors ${on ? 'text-charcoal' : 'text-stone-400 hover:text-charcoal'}`}
              >
                {on && <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-b-full bg-gold" />}
                <span className="relative">
                  <Icon name={n.icon} className={`w-[22px] h-[22px] ${on ? 'text-gold-dark' : ''}`} />
                  {n.badge > 0 && (
                    <span className={`absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full text-white text-[9px] font-bold leading-none flex items-center justify-center ${n.badgeTone}`}>
                      {n.badge}
                    </span>
                  )}
                </span>
                {n.label}
              </button>
            )
          })}
        </div>
      </nav>

      {selected && (
        <Detail
          key={selected.row}
          lead={selected}
          onClose={() => setSelected(null)}
          onSaved={onSaved}
          duplicates={dupMap[selected.row] || []}
          onOpenLead={(l) => setSelected(l)}
          onDelete={deleteLead}
        />
      )}
      {undoLead && (
        <div className="fixed left-1/2 -translate-x-1/2 z-[80] bottom-24 w-[calc(100%-2rem)] max-w-sm bg-charcoal text-white rounded-xl shadow-xl px-4 py-3 flex items-center justify-between gap-3"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <span className="text-sm truncate">Deleted {undoLead.name || 'lead'}</span>
          <button onClick={undoDelete} className="shrink-0 text-sm font-bold text-gold">Undo</button>
        </div>
      )}
      {adding && <AddLead onClose={() => setAdding(false)} onAdded={load} />}
      {paying && (
        <PaymentDialog
          lead={paying}
          onClose={() => setPaying(null)}
          onRecorded={(patch) => recordPayment(paying, patch)}
        />
      )}
    </main>
  )
}

function MapLink({ address, className = '' }: { address: string; className?: string }) {
  if (!address) return null
  return (
    <a
      href={mapsHref(address)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={className}
    >
      <Icon name="pin" className="inline w-3.5 h-3.5 -mt-0.5 mr-0.5" />
      {address}
    </a>
  )
}

function ApptRow({ lead, badge, kind, onOpen }: { lead: Lead; badge: string; kind?: 'measure' | 'install'; onOpen: () => void }) {
  const phone = String(lead.phone ?? '')
  const hasPhone = /\d/.test(phone)
  const chip = kind === 'install' ? 'text-emerald-800 bg-emerald-100' : 'text-gold-dark bg-gold/15'
  return (
    <div
      onClick={onOpen}
      className="flex items-center gap-3 rounded-xl bg-off-white border border-stone-100 p-2.5 cursor-pointer hover:border-gold transition-colors"
    >
      <span className={`shrink-0 text-[11px] font-bold rounded-lg px-2 py-1.5 min-w-[74px] text-center ${chip}`}>
        {badge}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[15px] text-charcoal truncate">{lead.name || '(no name)'}</p>
        {lead.product && <p className="text-warm-grey text-xs truncate">{lead.product}</p>}
        {lead.address && <MapLink address={lead.address} className="text-gold-dark text-xs underline underline-offset-2 truncate inline-block max-w-full" />}
      </div>
      {hasPhone && <RoundAction href={`tel:${phone}`} label="Call" icon="phone" />}
    </div>
  )
}

function ScheduleView({ leads, onOpen, onBook }: { leads: Lead[]; onOpen: (l: Lead) => void; onBook: (lead: Lead, dateISO: string, slot: string) => void }) {
  const [offset, setOffset] = useState(0)
  const [booking, setBooking] = useState<{ date: string; slot: string } | null>(null)
  const [mode, setMode] = useState<'week' | 'month'>('week')
  const todayISO = toISO(new Date())
  const start = startOfWeek(new Date(), offset)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const startISO = toISO(start)
  const endISO = toISO(end)
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const shortDay = (iso: string) => {
    const d = new Date(iso + 'T00:00:00')
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
  }

  // Left: sold deals not yet booked (need an install scheduled).
  const sold = leads.filter((l) => normalize(l.status) === 'Sold').sort((a, b) => (a.date < b.date ? -1 : 1))
  const soldSub = (l: Lead) => (l.installDate ? `Install ${fmtApptDate(String(l.installDate))}` : 'Needs an install date')

  // Right: everything scheduled this week (measures + installs), any stage.
  const events = leads
    .flatMap((l) => leadEvents(l))
    .filter((e) => e.date >= startISO && e.date <= endISO)
    .sort((a, b) => (a.date !== b.date ? (a.date < b.date ? -1 : 1) : a.sort - b.sort))
  // Today-and-upcoming first; already-passed days drop to the bottom.
  const upcoming = events.filter((e) => e.date >= todayISO)
  const past = events.filter((e) => e.date < todayISO)

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('week')} className={segCls(mode === 'week')}>Week</button>
        <button onClick={() => setMode('month')} className={segCls(mode === 'month')}>Month</button>
      </div>

      {mode === 'month' ? <MonthCalendar leads={leads} onOpen={onOpen} /> : (<>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setOffset((o) => o - 1)} aria-label="Previous week"
          className="w-10 h-10 rounded-full bg-white border border-stone-200 text-charcoal flex items-center justify-center hover:border-gold"><Icon name="chevron-left" className="w-4 h-4" /></button>
        <div className="text-center">
          <p className="font-playfair text-lg text-charcoal">{fmt(start)} – {fmt(end)}</p>
          {offset !== 0 && <button onClick={() => setOffset(0)} className="text-[11px] text-warm-grey underline">This week</button>}
        </div>
        <button onClick={() => setOffset((o) => o + 1)} aria-label="Next week"
          className="w-10 h-10 rounded-full bg-white border border-stone-200 text-charcoal flex items-center justify-center hover:border-gold"><Icon name="chevron-right" className="w-4 h-4" /></button>
      </div>

      {/* Open slots — ideal 2-a-day windows + any other booked times, Mon–Sat */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">Open slots</p>
        <div className="grid grid-cols-[3.2rem_1fr_1fr] gap-x-2 mb-1">
          <span />
          {IDEAL_SLOTS.map((s) => (
            <span key={s} className="text-[11px] text-warm-grey text-center">{s}</span>
          ))}
        </div>
        <div className="space-y-1.5">
          {Array.from({ length: 6 }, (_, i) => {
            const d = new Date(start)
            d.setDate(start.getDate() + i)
            const diso = toISO(d)
            const label = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
            const dayMeasures = events.filter((e) => e.kind === 'measure' && e.date === diso)
            const extra = dayMeasures.filter((e) => !IDEAL_SLOTS.includes(e.badge))
            return (
              <div key={diso}>
                <div className="grid grid-cols-[3.2rem_1fr_1fr] gap-x-2 items-center">
                  <span className={`text-xs ${diso === todayISO ? 'text-gold font-semibold' : 'text-charcoal'}`}>{label}</span>
                  {IDEAL_SLOTS.map((slot) => {
                    const taken = dayMeasures.find((e) => e.badge === slot)
                    return taken ? (
                      <button key={slot} onClick={() => onOpen(taken.lead)}
                        className="text-[11px] rounded-md bg-stone-100 text-charcoal px-2 py-1 truncate text-center hover:bg-stone-200">
                        {firstName(taken.lead.name)}
                      </button>
                    ) : (
                      <button key={slot} onClick={() => setBooking({ date: diso, slot })}
                        className="text-[11px] rounded-md bg-emerald-50 text-emerald-700 px-2 py-1 text-center font-semibold hover:bg-emerald-100">
                        Open +
                      </button>
                    )
                  })}
                </div>
                {extra.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1 pl-[3.7rem]">
                    {extra.map((e, idx) => (
                      <button key={idx} onClick={() => onOpen(e.lead)}
                        className="text-[10px] font-semibold rounded px-2 py-0.5 bg-amber-100 text-amber-800 hover:bg-amber-200">
                        {e.badge} · {firstName(e.lead.name)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-[11px] text-stone-400 mt-2">Tap <span className="text-emerald-700 font-semibold">Open +</span> to book a lead in, or a name to open it. Other booked times show in amber.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <p className="text-xs font-semibold text-charcoal">To schedule <span className="text-warm-grey">({sold.length})</span></p>
          </div>
          <div className="space-y-2">
            {sold.length === 0 ? (
              <p className="text-stone-300 text-xs">Nothing waiting</p>
            ) : (
              sold.map((l) => <BoardCard key={l.row} lead={l} sub={soldSub(l)} tone="indigo" onOpen={() => onOpen(l)} />)
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-semibold text-charcoal">This week <span className="text-warm-grey">({events.length})</span></p>
          </div>
          <div className="space-y-2">
            {events.length === 0 ? (
              <p className="text-stone-300 text-xs">Nothing scheduled</p>
            ) : (
              <>
                {upcoming.map((e) => (
                  <BoardCard key={`${e.lead.row}-${e.kind}`} lead={e.lead} tone={e.kind === 'install' ? 'emerald' : 'amber'} onOpen={() => onOpen(e.lead)}
                    sub={`${e.kind === 'install' ? 'Install' : e.badge} · ${shortDay(e.date)}${e.date === todayISO ? ' · Today' : ''}`} />
                ))}
                {past.length > 0 && (
                  <>
                    <p className="text-[11px] text-stone-400 pt-2 border-t border-stone-100">Earlier this week</p>
                    {past.map((e) => (
                      <div key={`${e.lead.row}-${e.kind}`} className="opacity-60">
                        <BoardCard lead={e.lead} tone={e.kind === 'install' ? 'emerald' : 'amber'} onOpen={() => onOpen(e.lead)}
                          sub={`${e.kind === 'install' ? 'Install' : e.badge} · ${shortDay(e.date)}`} />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex gap-3 mt-2 text-[11px] text-warm-grey">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400" /> Measure</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-600" /> Install</span>
          </div>
        </div>
      </div>
      </>)}

      {booking && (
        <SlotBooker
          leads={leads}
          date={booking.date}
          slot={booking.slot}
          onPick={(l) => { onBook(l, booking.date, booking.slot); setBooking(null) }}
          onClose={() => setBooking(null)}
        />
      )}
    </div>
  )
}

// Month at a glance: every measure, install and new lead on one calendar.
// Tap a day to see its full list underneath.
function MonthCalendar({ leads, onOpen }: { leads: Lead[]; onOpen: (l: Lead) => void }) {
  const todayISO = toISO(new Date())
  const [offset, setOffset] = useState(0)
  const [picked, setPicked] = useState(todayISO)

  const base = new Date()
  const first = new Date(base.getFullYear(), base.getMonth() + offset, 1)
  const monthPrefix = toISO(first).slice(0, 7)
  const gridStart = startOfWeek(first, 0)
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0)
  const weeks = Math.ceil(((lastDay.getTime() - gridStart.getTime()) / 864e5 + 1) / 7)
  const days = Array.from({ length: weeks * 7 }, (_, i) => {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    return d
  })

  const { byDay, newByDay } = useMemo(() => {
    const byDay: Record<string, SchedEvent[]> = {}
    const newByDay: Record<string, Lead[]> = {}
    leads.forEach((l) => {
      leadEvents(l).forEach((e) => { (byDay[e.date] = byDay[e.date] || []).push(e) })
      const d = String(l.date || '').slice(0, 10)
      if (/^\d{4}-\d{2}-\d{2}$/.test(d)) (newByDay[d] = newByDay[d] || []).push(l)
    })
    Object.values(byDay).forEach((list) => list.sort((a, b) => a.sort - b.sort))
    return { byDay, newByDay }
  }, [leads])

  const inMonth = (iso: string) => iso.startsWith(monthPrefix)
  const monthKeys = (m: Record<string, unknown[]>) => Object.keys(m).filter(inMonth)
  const measures = monthKeys(byDay).reduce((s, k) => s + byDay[k].filter((e) => e.kind === 'measure').length, 0)
  const installs = monthKeys(byDay).reduce((s, k) => s + byDay[k].filter((e) => e.kind === 'install').length, 0)
  const newCount = monthKeys(newByDay).reduce((s, k) => s + newByDay[k].length, 0)

  const pickedEvents = byDay[picked] || []
  const pickedNew = newByDay[picked] || []
  const pickedLabel = (() => {
    const d = new Date(picked + 'T00:00:00')
    return isNaN(d.getTime()) ? picked : d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  })()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setOffset((o) => o - 1)} aria-label="Previous month"
          className="w-10 h-10 rounded-full bg-white border border-stone-200 text-charcoal flex items-center justify-center hover:border-gold"><Icon name="chevron-left" className="w-4 h-4" /></button>
        <div className="text-center">
          <p className="font-playfair text-lg text-charcoal">{first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          {offset !== 0 && <button onClick={() => { setOffset(0); setPicked(todayISO) }} className="text-[11px] text-warm-grey underline">Back to this month</button>}
        </div>
        <button onClick={() => setOffset((o) => o + 1)} aria-label="Next month"
          className="w-10 h-10 rounded-full bg-white border border-stone-200 text-charcoal flex items-center justify-center hover:border-gold"><Icon name="chevron-right" className="w-4 h-4" /></button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-stone-100">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <span key={d} className="py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-warm-grey">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((d, i) => {
            const iso = toISO(d)
            const evs = byDay[iso] || []
            const fresh = (newByDay[iso] || []).length
            const chips = [
              ...evs.map((e) => ({
                key: `${e.lead.row}-${e.kind}`,
                cls: e.kind === 'install' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800',
                text: firstName(e.lead.name),
              })),
              ...(fresh > 0 ? [{ key: 'new', cls: 'bg-blue-100 text-blue-800', text: `${fresh} new` }] : []),
            ]
            const shown = chips.slice(0, 2)
            const isToday = iso === todayISO
            const isPicked = iso === picked
            return (
              <button key={iso} onClick={() => setPicked(iso)}
                className={`min-h-[4.6rem] sm:min-h-[6.5rem] p-1 text-left align-top flex flex-col gap-0.5 border-stone-100 transition-colors ${
                  i % 7 !== 6 ? 'border-r' : ''} ${i < days.length - 7 ? 'border-b' : ''} ${
                  isPicked ? 'bg-gold/10 ring-1 ring-inset ring-gold' : 'hover:bg-off-white'} ${inMonth(iso) ? '' : 'opacity-40'}`}>
                <span className={`self-start text-[11px] font-semibold tabular-nums w-5 h-5 flex items-center justify-center rounded-full ${
                  isToday ? 'bg-charcoal text-white' : 'text-charcoal'}`}>{d.getDate()}</span>
                {shown.map((c) => (
                  <span key={c.key} className={`block w-full truncate rounded px-1 py-px text-[9px] sm:text-[11px] font-semibold leading-tight ${c.cls}`}>{c.text}</span>
                ))}
                {chips.length > shown.length && <span className="text-[9px] text-warm-grey px-1">+{chips.length - shown.length} more</span>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-[11px] text-warm-grey">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400" /> {measures} measure{measures === 1 ? '' : 's'}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-600" /> {installs} install{installs === 1 ? '' : 's'}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500" /> {newCount} new lead{newCount === 1 ? '' : 's'}</span>
      </div>

      {/* The picked day, in full */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4 mt-4">
        <p className={`${sectionLabel} mb-3`}>{pickedLabel}{picked === todayISO ? ' · Today' : ''}</p>
        {pickedEvents.length === 0 && pickedNew.length === 0 ? (
          <p className="text-warm-grey text-sm">Nothing on this day.</p>
        ) : (
          <div className="space-y-2">
            {pickedEvents.map((e) => (
              <ApptRow key={`${e.lead.row}-${e.kind}`} lead={e.lead} badge={e.badge} kind={e.kind} onOpen={() => onOpen(e.lead)} />
            ))}
            {pickedNew.length > 0 && (
              <div className={pickedEvents.length > 0 ? 'pt-2' : ''}>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-blue-700 mb-1">New leads that day</p>
                <div className="divide-y divide-stone-100">
                  {pickedNew.map((l) => (
                    <button key={l.row} onClick={() => onOpen(l)} className="w-full flex items-center justify-between gap-2 py-2 text-left">
                      <span className="min-w-0">
                        <span className="font-semibold text-sm text-charcoal">{l.name || '(no name)'}</span>
                        <span className="block text-[11px] text-warm-grey truncate">{l.product || 'New inquiry'}</span>
                      </span>
                      <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${STAGE_STYLE[normalize(l.status)]}`}>{normalize(l.status)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const CARD_TONE: Record<string, { bar: string; text: string }> = {
  indigo: { bar: 'border-l-indigo-400', text: 'text-gold' }, // to schedule
  amber: { bar: 'border-l-amber-400', text: 'text-amber-700' }, // measure appointment
  emerald: { bar: 'border-l-emerald-600', text: 'text-emerald-700' }, // install
}
function BoardCard({ lead, sub, tone, onOpen }: { lead: Lead; sub: string; tone: 'indigo' | 'amber' | 'emerald'; onOpen: () => void }) {
  const t = CARD_TONE[tone]
  return (
    <div
      onClick={onOpen}
      className={`bg-white rounded-lg border border-stone-100 border-l-4 ${t.bar} p-2.5 cursor-pointer hover:border-gold transition-colors`}
    >
      <p className="font-semibold text-sm text-charcoal truncate">{lead.name || '(no name)'}</p>
      {lead.product && <p className="text-warm-grey text-[11px] truncate">{lead.product}</p>}
      {sub && <p className={`text-[11px] mt-0.5 truncate ${t.text}`}>{sub}</p>}
      {num(lead.value) > 0 && <p className="text-[11px] font-semibold text-charcoal mt-0.5">{dollars(num(lead.value))}</p>}
    </div>
  )
}

function SlotBooker({ leads, date, slot, onPick, onClose }: {
  leads: Lead[]
  date: string
  slot: string
  onPick: (l: Lead) => void
  onClose: () => void
}) {
  const [q, setQ] = useState('')
  const niceDay = (() => {
    const d = new Date(date + 'T00:00:00')
    return isNaN(d.getTime()) ? date : d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
  })()
  const list = leads
    .filter((l) => !['Completed', 'Paid', 'Lost'].includes(normalize(l.status)))
    .filter((l) => {
      const s = q.trim().toLowerCase()
      return !s || `${l.name} ${l.phone} ${l.product} ${l.address}`.toLowerCase().includes(s)
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-off-white w-full sm:max-w-md max-h-[82vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-charcoal text-white px-4 py-3 flex items-center gap-3">
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 -ml-1 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="x" className="w-5 h-5" /></button>
          <div>
            <p className="font-semibold">Book {slot}</p>
            <p className="text-white/60 text-[11px]">{niceDay} · pick a lead</p>
          </div>
        </div>
        <div className="p-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="Search leads…" className={`${fieldCls} w-full`} />
        </div>
        <div className="overflow-y-auto px-3 pb-3 space-y-1.5">
          {list.length === 0 ? (
            <p className="text-warm-grey text-sm text-center py-6">No leads to book.</p>
          ) : (
            list.map((l) => {
              const appt = parseAppt(String(l.bookedDate || ''))
              const cur = appt.date ? `now ${fmtApptDate(appt.date)}${appt.window ? ` · ${appt.window}` : ''}` : null
              return (
                <button key={l.row} onClick={() => onPick(l)}
                  className="w-full text-left bg-white rounded-lg border border-stone-100 p-2.5 hover:border-gold flex items-center justify-between gap-2">
                  <span className="min-w-0">
                    <span className="font-semibold text-sm text-charcoal">{l.name || '(no name)'}</span>
                    <span className="block text-[11px] text-warm-grey truncate">{[l.product, cur].filter(Boolean).join(' · ')}</span>
                  </span>
                  <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STAGE_STYLE[normalize(l.status)]}`}>{normalize(l.status)}</span>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

function TodayView({
  date, todaysAppts, newToday, followUpLeads, todoChips, kpis, openToday, onOpen, goToFilter, goToReports, goToSchedule, goToReviews, reviewPending,
}: {
  date: string
  todaysAppts: SchedEvent[]
  newToday: Lead[]
  followUpLeads: Lead[]
  todoChips: { key: string; label: string; short: string; icon: string; count: number }[]
  kpis: { active: number; quotesPending: number; upcomingInstalls: number; outstanding: number }
  openToday: number
  onOpen: (l: Lead) => void
  goToFilter: (f: string) => void
  goToReports: () => void
  goToSchedule: () => void
  goToReviews: () => void
  reviewPending: number
}) {
  const niceDate = (() => {
    const d = new Date(date + 'T00:00:00')
    return isNaN(d.getTime()) ? date : d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  })()
  // Launcher tile: the number leads, the label and caption support it.
  const tile = (onClick: () => void, icon: string, label: string, value: ReactNode, caption: string, dark = false) => (
    <button onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition-colors ${
        dark ? 'bg-charcoal border-charcoal hover:bg-black' : 'bg-white border-stone-200/70 hover:border-gold'
      }`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[11px] font-bold uppercase tracking-[0.08em] ${dark ? 'text-white/60' : 'text-warm-grey'}`}>{label}</span>
        <Icon name={icon} className="w-[18px] h-[18px] text-gold" />
      </div>
      <p className={`font-playfair text-[26px] leading-none mt-3 tabular-nums truncate ${dark ? 'text-gold' : 'text-charcoal'}`}>{value}</p>
      <p className={`text-[11px] mt-1.5 truncate ${dark ? 'text-white/60' : 'text-warm-grey'}`}>{caption}</p>
    </button>
  )
  const [owedDollars, owedCents] = money2(kpis.outstanding).split('.')
  return (
    <div className="space-y-4">
      <p className="text-sm text-warm-grey">{niceDate}</p>

      {/* Launcher — the four numbers that matter, each one tap from its screen */}
      <div className="grid grid-cols-2 gap-3">
        {tile(() => goToFilter('All'), 'users', 'Leads', kpis.active,
          followUpLeads.length > 0 ? `${followUpLeads.length} need follow-up` : 'Active in your pipeline')}
        {tile(goToSchedule, 'calendar', 'Schedule', todaysAppts.length,
          `Today · ${openToday > 0 ? `${openToday} slot${openToday === 1 ? '' : 's'} open` : 'fully booked'}`)}
        {tile(goToReports, 'dollar', 'Money',
          <>{owedDollars}<span className="text-base opacity-70">.{owedCents}</span></>, 'Owed to you', true)}
        {tile(goToReviews, 'star', 'Reviews', reviewPending, reviewPending > 0 ? 'To ask or follow up' : 'All caught up')}
      </div>

      {/* Today's schedule */}
      <section className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className={sectionLabel}>Today&apos;s schedule</p>
          {openToday > 0 && (
            <button onClick={goToSchedule} className="flex items-center gap-0.5 text-[11px] text-emerald-700 font-semibold">
              {openToday} ideal slot{openToday === 1 ? '' : 's'} open
              <Icon name="chevron-right" className="w-3 h-3" />
            </button>
          )}
        </div>
        {todaysAppts.length === 0 ? (
          <p className="text-warm-grey text-sm">Nothing scheduled today.</p>
        ) : (
          <div className="space-y-2">
            {todaysAppts.map((a) => (
              <ApptRow key={`${a.lead.row}-${a.kind}`} lead={a.lead} badge={a.badge} kind={a.kind} onOpen={() => onOpen(a.lead)} />
            ))}
          </div>
        )}
      </section>

      {/* New today — call now (speed to lead) */}
      {newToday.length > 0 && (
        <section className="bg-white rounded-2xl border border-blue-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-blue-700">New today · call now</p>
            <span className="ml-auto text-[11px] font-bold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5">{newToday.length}</span>
          </div>
          <div>
            {newToday.map((l) => {
              const phone = String(l.phone ?? '')
              const hasPhone = /\d/.test(phone)
              return (
                <div key={l.row} className="flex items-center gap-2 py-1.5 border-t border-stone-100 first:border-0">
                  <button onClick={() => onOpen(l)} className="min-w-0 flex-1 text-left">
                    <span className="font-semibold text-sm text-charcoal">{l.name || '(no name)'}</span>
                    <span className="block text-[11px] text-warm-grey truncate">{[l.product, l.source].filter(Boolean).join(' · ') || 'New inquiry'}</span>
                  </button>
                  {hasPhone && (
                    <>
                      <RoundAction href={`tel:${phone}`} label="Call" icon="phone" />
                      <RoundAction href={`sms:${phone}`} label="Text" icon="message" tone="plain" />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Needs follow-up */}
      {followUpLeads.length > 0 && (
        <section className="bg-white rounded-2xl border border-red-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="alert" className="w-4 h-4 text-red-600" />
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-red-700">Needs follow-up</p>
            <span className="text-[11px] font-bold text-red-700 bg-red-50 rounded-full px-2 py-0.5">{followUpLeads.length}</span>
            {followUpLeads.length > 4 && <button onClick={() => goToFilter('Needs follow-up')} className="ml-auto text-[11px] text-warm-grey underline">See all</button>}
          </div>
          <div className="divide-y divide-stone-100">
            {followUpLeads.slice(0, 4).map((l) => (
              <button key={l.row} onClick={() => onOpen(l)} className="w-full text-left flex items-center justify-between gap-2 py-2.5 last:pb-0.5">
                <span className="min-w-0">
                  <span className="font-semibold text-sm text-charcoal">{l.name || '(no name)'}</span>
                  <span className="block text-[11px] text-red-600 truncate">{followUpInfo(l).reason}</span>
                </span>
                <Icon name="chevron-right" className="w-4 h-4 text-stone-300" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Jobs to-do */}
      {todoChips.length > 0 && (
        <section className="bg-white rounded-2xl border border-stone-200/70 p-4">
          <p className={`${sectionLabel} mb-3`}>Jobs to-do</p>
          <div className="flex flex-wrap gap-2">
            {todoChips.map((t) => (
              <button key={t.key} onClick={() => goToFilter(`task:${t.key}`)}
                className="flex items-center gap-1.5 text-sm text-charcoal border border-stone-200 rounded-full pl-2.5 pr-1.5 py-1.5 hover:border-gold transition-colors">
                <Icon name={t.icon} className="w-4 h-4 text-gold-dark" />
                {t.short}
                <span className="text-[11px] font-bold bg-stone-100 rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">{t.count}</span>
              </button>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-3.5 ${highlight ? 'bg-charcoal border-charcoal' : 'bg-white border-stone-200/70'}`}>
      <p className={`text-[11px] font-bold uppercase tracking-[0.08em] leading-tight ${highlight ? 'text-white/60' : 'text-warm-grey'}`}>{label}</p>
      <p className={`font-playfair text-[22px] leading-none mt-2 tabular-nums ${highlight ? 'text-gold' : 'text-charcoal'}`}>{value}</p>
    </div>
  )
}

function Row({ lead, onOpen, reason, stat }: { lead: Lead; onOpen: () => void; reason?: string; stat?: string }) {
  const stage = normalize(lead.status)
  const appt = parseAppt(String(lead.bookedDate || ''))
  const apptText = appt.date ? `${fmtApptDate(appt.date)}${appt.window ? ` · ${appt.window}` : ''}` : null
  const installText = lead.installDate ? `Install ${fmtApptDate(String(lead.installDate))}` : null
  const sub = [
    lead.product || null,
    apptText,
    installText,
    lead.followUp ? `Next: ${lead.followUp}` : null,
    num(lead.value) > 0 ? dollars(num(lead.value)) : null,
  ]
    .filter(Boolean)
    .join(' · ')
  const phone = String(lead.phone ?? '')
  const hasPhone = /\d/.test(phone)
  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl border border-stone-200/70 pl-3.5 pr-2 py-3 flex items-center gap-2 cursor-pointer hover:border-gold transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[15px] text-charcoal truncate">{lead.name || '(no name)'}</span>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${STAGE_STYLE[stage]}`}>{stage}</span>
          {stat && <span className="ml-auto shrink-0 text-sm font-bold text-charcoal tabular-nums">{stat}</span>}
        </div>
        {reason && (
          <p className="flex items-center gap-1 text-red-600 text-xs mt-0.5">
            <Icon name="alert" className="w-3 h-3" />
            <span className="truncate">{reason}</span>
          </p>
        )}
        <p className="text-warm-grey text-xs mt-0.5 truncate">{sub || lead.date}</p>
        {(() => {
          const ts = JOB_TASKS.filter((t) => taskSet(lead).has(t.key))
          return ts.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {ts.map((t) => (
                <span key={t.key} className="inline-flex items-center gap-1 text-[10px] font-semibold bg-stone-100 text-charcoal rounded-full px-2 py-0.5">
                  <Icon name={t.icon} className="w-3 h-3 text-warm-grey" />
                  {t.short}
                </span>
              ))}
            </div>
          ) : null
        })()}
      </div>
      {hasPhone && (
        <>
          <RoundAction href={`tel:${phone}`} label="Call" icon="phone" />
          <RoundAction href={`sms:${phone}`} label="Text" icon="message" tone="plain" />
        </>
      )}
      <Icon name="chevron-right" className="w-4 h-4 text-stone-300" />
    </div>
  )
}

function Detail({ lead, onClose, onSaved, duplicates = [], onOpenLead, onDelete }: {
  lead: Lead
  onClose: () => void
  onSaved: (row: number, patch: Partial<Lead>) => void
  duplicates?: Lead[]
  onOpenLead?: (l: Lead) => void
  onDelete?: (l: Lead) => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const appt0 = parseAppt(String(lead.bookedDate ?? ''))
  const [status, setStatus] = useState<Stage>(normalize(lead.status))
  const [name, setName] = useState(lead.name ?? '')
  const [phone, setPhone] = useState(String(lead.phone ?? ''))
  const [email, setEmail] = useState(lead.email ?? '')
  const [product, setProduct] = useState(lead.product ?? '')
  const [source, setSource] = useState(lead.source ?? '')
  const hasPhone = /\d/.test(phone)
  const [followUp, setFollowUp] = useState(lead.followUp ?? '')
  const [address, setAddress] = useState(lead.address ?? '')
  const [lostReason, setLostReason] = useState(lead.lostReason ?? '')
  const [apptDate, setApptDate] = useState(appt0.date)
  const [apptWindow, setApptWindow] = useState(appt0.window)
  const [installDate, setInstallDate] = useState(String(lead.installDate ?? ''))
  const [value, setValue] = useState(String(lead.value ?? ''))
  const [material, setMaterial] = useState(String(lead.material ?? ''))
  const [install, setInstall] = useState(String(lead.install ?? ''))
  const [deposit, setDeposit] = useState(String(lead.deposit ?? ''))
  const [payment, setPayment] = useState(lead.payment ?? '')
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [tasks, setTasks] = useState<string[]>(() => Array.from(taskSet(lead)))
  const toggleTask = (k: string) => setTasks((ts) => (ts.includes(k) ? ts.filter((x) => x !== k) : [...ts, k]))
  const [quote, setQuote] = useState<QuoteData>(() => {
    const q = lead.quote
    return q && Array.isArray(q.items) ? { items: q.items.map((it) => ({ ...it })), taxRate: q.taxRate ?? DEFAULT_TAX } : emptyQuote()
  })
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [todoOpen, setTodoOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const qTotals = quoteTotals(quote)
  const addQuoteItem = (preset: { desc: string; unit: string }) =>
    setQuote((q) => ({ ...q, items: [...q.items, { desc: preset.desc, qty: '', unit: preset.unit, price: '' }] }))
  const setQuoteItem = (i: number, field: keyof QuoteItem, val: string) =>
    setQuote((q) => ({ ...q, items: q.items.map((it, idx) => (idx === i ? { ...it, [field]: val } : it)) }))
  const removeQuoteItem = (i: number) => setQuote((q) => ({ ...q, items: q.items.filter((_, idx) => idx !== i) }))

  const printQuote = () => {
    const t = quoteTotals(quote)
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const rows = quote.items
      .map(
        (it) => `<tr><td>${escHtml(it.desc)}</td><td style="text-align:center">${escHtml(it.qty)} ${escHtml(it.unit)}</td><td style="text-align:right">${money2(num(it.price))}</td><td style="text-align:right">${money2(quoteItemAmount(it))}</td></tr>`
      )
      .join('')
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Quote — ${escHtml(lead.name)}</title>
<style>body{font-family:Georgia,serif;color:#1C1C1C;max-width:720px;margin:24px auto;padding:0 16px}.gold{color:#C9A84C}h1{margin:0;font-size:24px}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{padding:8px;border-bottom:1px solid #eee;font-size:14px}th{text-align:left;color:#6B6B6B;font-size:11px;text-transform:uppercase;letter-spacing:.04em}.tot{display:flex;justify-content:flex-end;gap:40px;padding:3px 8px;font-size:14px}.total{font-weight:bold;font-size:18px;border-top:2px solid #1C1C1C;margin-top:4px;padding-top:8px}.muted{color:#6B6B6B;font-size:13px}@media print{button{display:none}}</style></head><body>
<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #C9A84C;padding-bottom:12px">
<div><h1>Atlas Rug <span class="gold">&amp;</span> Design Centre</h1><div class="muted">978 Bathurst St, Toronto, ON &middot; (416) 533-3366 &middot; atlasrugflooring.com</div></div>
<div style="text-align:right"><div style="font-size:22px;font-weight:bold">QUOTE</div><div class="muted">${today}</div></div></div>
<div style="margin-top:16px"><div class="muted">Prepared for</div><div style="font-size:16px;font-weight:bold">${escHtml(lead.name || '')}</div>
<div class="muted">${escHtml(String(lead.address || ''))}${lead.phone ? ' &middot; ' + escHtml(String(lead.phone)) : ''}</div>
${lead.product ? `<div class="muted">${escHtml(String(lead.product))}</div>` : ''}</div>
<table><thead><tr><th>Description</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit price</th><th style="text-align:right">Amount</th></tr></thead><tbody>${rows}</tbody></table>
<div style="margin-top:12px"><div class="tot"><span class="muted">Subtotal</span><span>${money2(t.subtotal)}</span></div>
<div class="tot"><span class="muted">HST (${escHtml(quote.taxRate)}%)</span><span>${money2(t.tax)}</span></div>
<div class="tot total"><span>Total</span><span>${money2(t.total)}</span></div></div>
<p class="muted" style="margin-top:24px">Thank you for choosing Atlas Rug &amp; Design Centre — family-owned in Toronto since 1959. This quote is valid for 30 days.</p>
<button onclick="window.print()" style="margin-top:16px;padding:10px 20px;background:#C9A84C;color:#fff;border:none;border-radius:6px;font-size:15px;cursor:pointer">Print / Save as PDF</button>
</body></html>`
    const w = window.open('', '_blank')
    if (w) {
      w.document.write(html)
      w.document.close()
    } else {
      alert('Please allow pop-ups to print the quote.')
    }
  }

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [reviewAsked, setReviewAsked] = useState<string | null>(null)
  useEffect(() => {
    setReviewAsked(lead.reviewAsked || readAsked()[String(lead.row)] || null)
  }, [lead.row, lead.reviewAsked])
  const onAskReview = () => {
    const now = toISO(new Date())
    markAsked(lead.row)
    setReviewAsked(now)
    const patch: Partial<Lead> = { reviewAsked: lead.reviewAsked || now, reviewLastAsked: now }
    onSaved(lead.row, patch)
    fetch('/manage/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ row: lead.row, ...patch }),
    }).catch(() => {})
  }

  const grossProfit = num(value) - num(material) - num(install)
  const balanceDue = num(value) - num(deposit)
  const hasValue = num(value) > 0
  const hasCosts = num(material) > 0 || num(install) > 0

  const save = async (): Promise<boolean> => {
    setSaving(true)
    setSaved(false)
    const bookedDate = joinAppt(apptDate, apptWindow)
    try {
      const res = await fetch('/manage/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: lead.row, name, phone, email, product, source, status, followUp, address, lostReason, bookedDate, installDate, value, material, install, deposit, payment, notes, tasks: tasks.join(','), quote }),
      })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Save failed')
      onSaved(lead.row, { name, phone, email, product, source, status, followUp, address, lostReason, bookedDate, installDate, value, material, install, deposit, payment, notes, tasks: tasks.join(','), quote })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
      return true
    } catch {
      alert('Could not save — check your connection and try again.')
      return false
    } finally {
      setSaving(false)
    }
  }

  // Have any fields been edited since the lead was opened?
  const dirty =
    status !== normalize(lead.status) ||
    name !== (lead.name ?? '') ||
    phone !== String(lead.phone ?? '') ||
    email !== (lead.email ?? '') ||
    product !== (lead.product ?? '') ||
    source !== (lead.source ?? '') ||
    followUp !== (lead.followUp ?? '') ||
    address !== (lead.address ?? '') ||
    lostReason !== (lead.lostReason ?? '') ||
    joinAppt(apptDate, apptWindow) !== String(lead.bookedDate ?? '') ||
    installDate !== String(lead.installDate ?? '') ||
    value !== String(lead.value ?? '') ||
    material !== String(lead.material ?? '') ||
    install !== String(lead.install ?? '') ||
    deposit !== String(lead.deposit ?? '') ||
    payment !== (lead.payment ?? '') ||
    notes !== (lead.notes ?? '') ||
    [...tasks].sort().join(',') !== Array.from(taskSet(lead)).sort().join(',') ||
    JSON.stringify(quote) !== JSON.stringify(lead.quote ?? emptyQuote())

  // Clicking away (backdrop or ×) auto-saves pending edits, then closes.
  // On a save failure we keep the panel open so nothing is lost.
  const handleClose = async () => {
    if (dirty && !saving) {
      const ok = await save()
      if (!ok) return
    }
    onClose()
  }

  // Auto-save: ~0.9s after you stop changing something, save it.
  useEffect(() => {
    if (!dirty) return
    const t = setTimeout(() => { void save() }, 900)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, name, phone, email, product, source, status, followUp, address, lostReason, apptDate, apptWindow, installDate, value, material, install, deposit, payment, notes, tasks, quote])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div className="relative bg-off-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 bg-charcoal text-white px-4 py-3 flex items-center gap-3 z-10">
          <button onClick={handleClose} aria-label="Close" className="w-8 h-8 -ml-1 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="x" className="w-5 h-5" /></button>
          <div className="min-w-0 flex-1">
            <p className="font-playfair text-lg leading-tight truncate">{name || '(no name)'}</p>
            <p className="text-white/60 text-[11px] truncate">{[lead.date, product].filter(Boolean).join(' · ')}</p>
          </div>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${STAGE_STYLE[status]}`}>
            {status}
          </span>
        </div>

        <div className="p-4 space-y-4 flex-1">
          {/* Quick contact */}
          <div className="grid grid-cols-3 gap-2">
            <a href={hasPhone ? `tel:${phone}` : undefined}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-colors ${hasPhone ? 'bg-gold text-white hover:bg-gold-dark' : 'bg-stone-100 text-stone-400 pointer-events-none'}`}>
              <Icon name="phone" className="w-4 h-4" /> Call
            </a>
            <a href={hasPhone ? `sms:${phone}` : undefined}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-colors ${hasPhone ? 'bg-white border border-stone-300 text-charcoal hover:border-gold' : 'bg-stone-100 text-stone-400 pointer-events-none'}`}>
              <Icon name="message" className="w-4 h-4" /> Text
            </a>
            <a href={email ? mailtoHref(email, REPLY_SUBJECT, replyMessage(name, product)) : undefined}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-colors ${email ? 'bg-white border border-stone-300 text-charcoal hover:border-gold' : 'bg-stone-100 text-stone-400 pointer-events-none'}`}>
              <Icon name="mail" className="w-4 h-4" /> Email
            </a>
          </div>
          {/* Possible duplicates — same phone or email as another lead */}
          {duplicates.length > 0 && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-amber-800 mb-2">
                <Icon name="users" className="w-4 h-4" />
                Possible duplicate
              </p>
              <p className="text-xs text-amber-900 mb-2">Same phone or email as:</p>
              <div className="space-y-1.5">
                {duplicates.map((d) => (
                  <button key={d.row} onClick={() => onOpenLead?.(d)}
                    className="w-full flex items-center justify-between gap-2 rounded-xl bg-white border border-amber-200 px-3 py-2 text-left hover:border-amber-400">
                    <span className="min-w-0">
                      <span className="font-semibold text-sm text-charcoal">{d.name || '(no name)'}</span>
                      <span className="block text-[11px] text-warm-grey truncate">{[d.date, d.product].filter(Boolean).join(' · ')}</span>
                    </span>
                    <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${STAGE_STYLE[normalize(d.status)]}`}>{normalize(d.status)}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-amber-900 mt-2">Keep the one with the most info and delete the extra copy (bottom of its panel).</p>
            </div>
          )}

          {/* Contact — editable */}
          <div className="bg-white rounded-2xl border border-stone-200/70 p-4 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Contact</p>
            <label className="block text-xs text-warm-grey">Name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={`${fieldCls} w-full mt-1`} />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-xs text-warm-grey">Phone
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" placeholder="(416) …" className={`${fieldCls} w-full mt-1`} />
              </label>
              <label className="block text-xs text-warm-grey">Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" placeholder="name@…" className={`${fieldCls} w-full mt-1`} />
              </label>
            </div>
            <label className="block text-xs text-warm-grey">Product / interest
              <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Carpet & Broadloom" className={`${fieldCls} w-full mt-1`} />
            </label>
            <label className="block text-xs text-warm-grey">Address
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city" className={`${fieldCls} w-full mt-1`} />
            </label>
            {address && (
              <p className="text-xs">
                <MapLink address={address} className="text-gold-dark underline underline-offset-2" />
                <span className="text-warm-grey"> — tap for directions</span>
              </p>
            )}
            <label className="block text-xs text-warm-grey">How did they find us?
              <select value={source} onChange={(e) => setSource(e.target.value)} className={`${fieldCls} crm-select w-full mt-1`}>
                <option value="">Not recorded</option>
                {SOURCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                {source && !SOURCE_OPTIONS.includes(source) && <option value={source}>{source}</option>}
              </select>
            </label>
          </div>

          {/* Pipeline */}
          <div className="bg-white rounded-2xl border border-stone-200/70 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Pipeline</p>
            <label className="block text-xs text-warm-grey">Stage
              <select value={status} onChange={(e) => setStatus(e.target.value as Stage)} className={`${fieldCls} crm-select w-full mt-1`}>
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>

            {status === 'Lost' && (
              <label className="block text-xs text-warm-grey">Why did we lose it?
                <select value={lostReason} onChange={(e) => setLostReason(e.target.value)} className={`${fieldCls} crm-select w-full mt-1`}>
                  <option value="">Pick a reason…</option>
                  {LOST_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  {lostReason && !LOST_REASONS.includes(lostReason) && <option value={lostReason}>{lostReason}</option>}
                </select>
              </label>
            )}

            {/* Appointment: day first, then time window */}
            <div>
              <p className="text-xs text-warm-grey mb-1">Appointment</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={apptDate}
                  onChange={(e) => setApptDate(e.target.value)}
                  className={`${fieldCls} w-full`}
                />
                <select value={apptWindow} onChange={(e) => setApptWindow(e.target.value)} className={`${fieldCls} crm-select w-full`}>
                  <option value="">Time window…</option>
                  {APPT_WINDOWS.map((w) => <option key={w} value={w}>{w}</option>)}
                  {apptWindow && !APPT_WINDOWS.includes(apptWindow) && <option value={apptWindow}>{apptWindow}</option>}
                </select>
              </div>
              {apptDate && (
                <div className="flex items-center justify-between mt-1.5">
                  <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <Icon name="check" className="w-3 h-3" />
                    {fmtApptDate(apptDate)}{apptWindow ? ` · ${apptWindow}` : ''}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setApptDate(''); setApptWindow('') }}
                    className="text-[11px] text-warm-grey underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <label className="block text-xs text-warm-grey">Next follow-up
              <input value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="e.g. Nov 20" className={`${fieldCls} w-full mt-1`} />
            </label>
            <label className="block text-xs text-warm-grey">Notes
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Notes…" className={`${fieldCls} w-full mt-1`} />
            </label>
          </div>

          {/* Job to-do — parallel operational steps, independent of stage */}
          <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
            <button type="button" onClick={() => setTodoOpen((o) => !o)} className="w-full flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-warm-grey">To-do</span>
              <span className="flex items-center gap-1.5 text-sm text-charcoal">
                {tasks.length ? `${tasks.length} active` : 'None'}
                {installDate ? ` · Install ${fmtApptDate(installDate)}` : ''}
                <Icon name="chevron-down" className={`w-4 h-4 text-stone-400 transition-transform ${todoOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {todoOpen && (
              <div className="mt-3 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {JOB_TASKS.map((t) => {
                    const on = tasks.includes(t.key)
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => toggleTask(t.key)}
                        className={`flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-sm border transition-colors ${
                          on ? 'bg-gold text-white border-gold' : 'bg-white text-charcoal border-stone-200 hover:border-gold'
                        }`}
                      >
                        <Icon name={on ? 'check' : t.icon} className={`w-4 h-4 ${on ? '' : 'text-gold-dark'}`} />
                        {t.label}
                      </button>
                    )
                  })}
                </div>
                <label className="block text-xs text-warm-grey">Install / job date
                  <input
                    type="date"
                    value={installDate}
                    onChange={(e) => setInstallDate(e.target.value)}
                    className={`${fieldCls} w-full mt-1`}
                  />
                </label>
                {installDate && (
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <Icon name="wrench" className="w-3 h-3" />
                      Install {fmtApptDate(installDate)}
                    </p>
                    <button type="button" onClick={() => setInstallDate('')} className="text-[11px] text-warm-grey underline">
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quote builder */}
          <div className="bg-white rounded-2xl border border-stone-200/70 p-4 space-y-3">
            <button type="button" onClick={() => setQuoteOpen((o) => !o)} className="w-full flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Quote</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-charcoal">
                {quote.items.length ? dollars(qTotals.total) : 'Build a quote'}
                <Icon name="chevron-down" className={`w-4 h-4 text-stone-400 transition-transform ${quoteOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>

            {quoteOpen && (
              <>
                <div className="flex flex-wrap gap-1.5">
                  {QUOTE_PRESETS.map((p) => (
                    <button key={p.desc} type="button" onClick={() => addQuoteItem(p)}
                      className="text-xs border border-stone-200 rounded-full px-2.5 py-1 hover:border-gold transition-colors">
                      + {p.desc}
                    </button>
                  ))}
                </div>

                {quote.items.length === 0 ? (
                  <p className="text-warm-grey text-sm">Tap a button above to add a line.</p>
                ) : (
                  <div className="space-y-2">
                    {quote.items.map((it, i) => (
                      <div key={i} className="border border-stone-200 rounded-lg p-2 space-y-2">
                        <div className="flex gap-2">
                          <input value={it.desc} onChange={(e) => setQuoteItem(i, 'desc', e.target.value)} placeholder="Description" className={`${fieldCls} flex-1`} />
                          <button type="button" onClick={() => removeQuoteItem(i)} aria-label="Remove" className="shrink-0 w-9 flex items-center justify-center text-stone-400 hover:text-red-600"><Icon name="x" className="w-4 h-4" /></button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input value={it.qty} onChange={(e) => setQuoteItem(i, 'qty', e.target.value)} inputMode="decimal" placeholder="Qty" className={fieldCls} />
                          <input value={it.unit} onChange={(e) => setQuoteItem(i, 'unit', e.target.value)} placeholder="unit" className={fieldCls} />
                          <input value={it.price} onChange={(e) => setQuoteItem(i, 'price', e.target.value)} inputMode="decimal" placeholder="$ each" className={fieldCls} />
                        </div>
                        <div className="text-right text-sm font-semibold text-charcoal">{dollars(quoteItemAmount(it))}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-stone-100 pt-2 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-warm-grey">Subtotal</span><span>{money2(qTotals.subtotal)}</span></div>
                  <div className="flex justify-between items-center">
                    <span className="text-warm-grey flex items-center gap-1">
                      HST
                      <input value={quote.taxRate} onChange={(e) => setQuote((q) => ({ ...q, taxRate: e.target.value }))} inputMode="decimal"
                        className="w-10 border border-stone-300 rounded px-1 py-0.5 text-xs text-center" />%
                    </span>
                    <span>{money2(qTotals.tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-charcoal text-base"><span>Total</span><span>{money2(qTotals.total)}</span></div>
                </div>

                <div className="flex gap-2">
                  <button type="button" onClick={() => setValue(String(Math.round(qTotals.total)))}
                    className="flex-1 text-sm bg-white border border-stone-300 rounded-lg py-2 font-semibold hover:border-gold transition-colors">
                    Use as job value
                  </button>
                  <button type="button" onClick={printQuote} disabled={quote.items.length === 0}
                    className="flex-1 text-sm bg-charcoal text-white rounded-lg py-2 font-semibold disabled:opacity-50">
                    Print / send
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Money — revenue -> costs -> gross profit; deposit -> balance due */}
          <div className="bg-white rounded-2xl border border-stone-200/70 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Job &amp; money</p>

            <label className="block text-xs text-warm-grey">Job value <span className="text-stone-400">(quote total)</span>
              <input value={value} onChange={(e) => setValue(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-warm-grey">Material cost
                <input value={material} onChange={(e) => setMaterial(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
              </label>
              <label className="block text-xs text-warm-grey">Install / labour
                <input value={install} onChange={(e) => setInstall(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
              </label>
            </div>
            {hasValue && hasCosts && (
              <div className="flex justify-between items-center rounded-lg bg-emerald-50 text-emerald-800 px-3 py-2 text-sm">
                <span>Gross profit <span className="opacity-70">(value − costs)</span></span>
                <strong>{money2(grossProfit)}</strong>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <label className="block text-xs text-warm-grey">Deposit paid
                <input value={deposit} onChange={(e) => setDeposit(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
              </label>
              <label className="block text-xs text-warm-grey">Payment method
                <input value={payment} onChange={(e) => setPayment(e.target.value)} placeholder="e-transfer…" className={`${fieldCls} w-full mt-1`} />
              </label>
            </div>
            {hasValue && (
              <div className="flex justify-between items-center rounded-lg bg-off-white border border-stone-100 px-3 py-2 text-sm">
                <span className="text-warm-grey">Balance due <span className="opacity-70">(value − deposit)</span></span>
                <strong className="text-charcoal">{money2(balanceDue)}</strong>
              </div>
            )}
            {hasValue && balanceDue > 0 && (
              <button
                type="button"
                onClick={() => { setDeposit(String(num(value))); if (status !== 'Paid') setStatus('Paid') }}
                className="w-full text-sm bg-emerald-600 text-white rounded-lg py-2 font-semibold hover:bg-emerald-700 transition-colors"
              >
                Mark paid in full ({money2(balanceDue)} received)
              </button>
            )}
          </div>

          {/* Reviews */}
          <div className={`rounded-xl border p-4 ${status === 'Completed' && !reviewAsked ? 'bg-gold/5 border-gold/40' : 'bg-white border-stone-100'}`}>
            <button type="button" onClick={() => setReviewOpen((o) => !o)} className="w-full flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Review</span>
              <span className="flex items-center gap-1.5 text-sm text-charcoal">
                {reviewAsked ? 'Requested' : 'Request'}
                <Icon name="chevron-down" className={`w-4 h-4 text-stone-400 transition-transform ${reviewOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {reviewOpen && (
            <div className="mt-3 space-y-2">
            {reviewAsked ? (
              <p className="flex items-center gap-1 text-sm text-emerald-700"><Icon name="check" className="w-4 h-4" />Review requested · {fmtApptDate(reviewAsked)}</p>
            ) : status === 'Completed' ? (
              <p className="text-sm text-charcoal">Job&apos;s done — ask for a Google review in one tap.</p>
            ) : (
              <p className="text-sm text-warm-grey">Once the job&apos;s complete, request a Google review here.</p>
            )}
            {hasPhone || lead.email ? (
              <div className="flex gap-2">
                {hasPhone && (
                  <a
                    href={smsHref(phone, reviewMessage(lead.name))}
                    onClick={onAskReview}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold bg-gold text-white hover:bg-gold-dark transition-colors"
                  >
                    <Icon name="star" className="w-4 h-4" />
                    Text review link
                  </a>
                )}
                {lead.email && (
                  <a
                    href={mailtoHref(lead.email, 'A quick review for Atlas Rug & Design Centre?', reviewMessage(lead.name))}
                    onClick={onAskReview}
                    className={`${hasPhone ? 'flex-none px-4' : 'flex-1'} flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold bg-white border border-stone-300 text-charcoal hover:border-gold transition-colors`}
                  >
                    <Icon name="mail" className="w-4 h-4" />
                    Email
                  </a>
                )}
              </div>
            ) : (
              <p className="text-xs text-stone-400">Add a phone or email to send a request.</p>
            )}
            </div>
            )}
          </div>
        </div>

        {/* Delete */}
        {onDelete && (
          <div className="px-4 pb-6">
            {confirmDelete ? (
              <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="rounded-2xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800 font-semibold">Delete {name || 'this lead'}?</p>
                <p className="text-xs text-red-700 mt-0.5">It disappears from every screen and report. You&apos;ll get a few seconds to undo.</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => onDelete(lead)} className="flex-1 bg-red-600 text-white text-sm font-semibold rounded-full py-2.5 hover:bg-red-700">Delete lead</button>
                  <button onClick={() => setConfirmDelete(false)} className="flex-1 bg-white border border-stone-300 text-charcoal text-sm font-semibold rounded-full py-2.5">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(true)} className="w-full text-sm text-red-600 font-semibold py-2 hover:text-red-700">
                Delete this lead
              </button>
            )}
          </div>
        )}

        {/* Sticky save */}
        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3">
          {saving ? (
            <span className="text-warm-grey text-xs">Saving…</span>
          ) : saved ? (
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-semibold"><Icon name="check" className="w-4 h-4" />Saved</span>
          ) : dirty ? (
            <span className="text-warm-grey text-xs">Autosaving…</span>
          ) : (
            <span className="flex items-center gap-1 text-warm-grey text-xs"><Icon name="check" className="w-3.5 h-3.5 text-emerald-600" />All changes saved</span>
          )}
          <button onClick={save} disabled={saving}
            className="bg-gold text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gold-dark transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

type GroupRows = [string, { leads: number; booked: number; revenue: number }][]
function GroupTable({ title, col, rows }: { title: string; col: string; rows: GroupRows }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">{title}</p>
      {rows.length === 0 ? (
        <p className="text-warm-grey text-sm">No leads in this period.</p>
      ) : (
        <div className="divide-y divide-stone-100">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 pb-2 text-[11px] text-warm-grey">
            <span>{col}</span>
            <span className="text-right">Leads / Booked</span>
            <span className="text-right">Revenue</span>
          </div>
          {rows.map(([name, e]) => (
            <div key={name} className="grid grid-cols-[1fr_auto_auto] gap-3 py-2 items-center">
              <span className="text-sm text-charcoal truncate">{name}</span>
              <span className="text-sm text-right tabular-nums text-warm-grey">{e.leads} / {e.booked}</span>
              <span className="text-sm text-right font-semibold text-charcoal tabular-nums">{dollars(e.revenue)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const PAY_METHODS = ['e-transfer', 'Cash', 'Credit', 'Debit', 'Cheque']
function PaymentDialog({ lead, onClose, onRecorded }: { lead: Lead; onClose: () => void; onRecorded: (patch: Partial<Lead>) => void }) {
  const value = num(lead.value)
  const already = num(lead.deposit)
  const balance = Math.max(0, value - already)
  const [amount, setAmount] = useState(balance > 0 ? balance.toFixed(2) : '')
  const [method, setMethod] = useState(lead.payment || PAY_METHODS[0])

  const amt = num(amount)
  const newCollected = already + amt
  const willBePaid = value > 0 && newCollected >= value

  const save = () => {
    if (amt <= 0) return
    const patch: Partial<Lead> = { deposit: String(newCollected), payment: method }
    if (willBePaid) patch.status = 'Paid'
    onRecorded(patch)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-off-white w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-charcoal text-white px-4 py-3 flex items-center gap-3">
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 -ml-1 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="x" className="w-5 h-5" /></button>
          <div className="min-w-0">
            <p className="font-semibold truncate">{lead.name || '(no name)'}</p>
            <p className="text-white/60 text-[11px]">{balance > 0 ? `Balance ${money2(balance)}` : value > 0 ? 'Fully collected' : 'No job value set'}</p>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <label className="block text-xs text-warm-grey">Amount received
            <div className="flex items-center gap-2 mt-1">
              <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="$" autoFocus className={`${fieldCls} flex-1`} />
              {balance > 0 && (
                <button type="button" onClick={() => setAmount(balance.toFixed(2))} className="shrink-0 text-xs text-gold font-semibold underline">
                  Full ({money2(balance)})
                </button>
              )}
            </div>
          </label>
          <div>
            <p className="text-xs text-warm-grey mb-1">How</p>
            <div className="flex flex-wrap gap-2">
              {PAY_METHODS.map((m) => (
                <button key={m} type="button" onClick={() => setMethod(m)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${method === m ? 'bg-gold text-white border-gold' : 'bg-white text-charcoal border-stone-200'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          {willBePaid && <p className="text-[11px] text-emerald-700">✓ Covers the balance — job will be marked Paid.</p>}
          <button onClick={save} disabled={amt <= 0}
            className="w-full bg-gold text-white font-semibold py-3 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50">
            Record {amt > 0 ? money2(amt) : 'payment'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ReportsView({ leads, onOpen, onPay }: { leads: Lead[]; onOpen: (l: Lead) => void; onPay: (l: Lead) => void }) {
  const [period, setPeriod] = useState<'month' | 'all'>('month')
  const [scriptsOpen, setScriptsOpen] = useState(false)
  const [copied, setCopied] = useState('')
  const [settings, setSettings] = useState<Settings>({})
  const [editTargets, setEditTargets] = useState(false)
  const [editMonth, setEditMonth] = useState('') // which month row is expanded for editing
  const [adSyncOn, setAdSyncOn] = useState(false) // Google Ads credentials present on the server
  const [syncing, setSyncing] = useState(false)
  const [syncNote, setSyncNote] = useState('')
  const dirty = useRef(false)
  const loadSettings = () =>
    fetch('/manage/api/settings')
      .then((r) => r.json())
      .then((j) => { if (j?.ok) { if (j.settings) setSettings(j.settings); setAdSyncOn(!!j.adSyncConfigured) } })
      .catch(() => {})
  useEffect(() => {
    loadSettings()
  }, [])
  const syncNow = async () => {
    setSyncing(true)
    setSyncNote('')
    try {
      const res = await fetch('/manage/api/adspend/sync', { method: 'POST' })
      const j = await res.json()
      if (j?.ok) { await loadSettings(); setSyncNote('Synced ✓') }
      else setSyncNote(String(j?.error || 'Sync failed').slice(0, 160))
    } catch {
      setSyncNote('Sync failed')
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncNote(''), 4000)
    }
  }
  // Persist settings a beat after they change (only once the user has edited).
  useEffect(() => {
    if (!dirty.current) return
    const t = setTimeout(() => {
      fetch('/manage/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      }).catch(() => {})
    }, 700)
    return () => clearTimeout(t)
  }, [settings])
  const setTarget = (key: string, v: number) => {
    dirty.current = true
    setSettings((s) => ({ ...s, targets: { ...(s.targets || {}), [key]: v } }))
  }
  const setDefaultOverhead = (v: number) => {
    dirty.current = true
    setSettings((s) => ({ ...s, defaultOverhead: v }))
  }
  const setMonthCfg = (mk: string, key: keyof MonthCfg, v: number) => {
    dirty.current = true
    setSettings((s) => ({ ...s, months: { ...(s.months || {}), [mk]: { ...(s.months?.[mk] || {}), [key]: v } } }))
  }
  const copyScript = (when: string, text: string) => {
    try { navigator.clipboard?.writeText(text) } catch { /* clipboard may be blocked */ }
    setCopied(when)
    setTimeout(() => setCopied(''), 1500)
  }

  const thisMonth = toISO(new Date()).slice(0, 7)
  const T = useMemo(() => ({ ...DEFAULT_TARGETS, ...(settings.targets || {}) }), [settings.targets])
  const scoped = useMemo(
    () => (period === 'all' ? leads : leads.filter((l) => monthKey(l.date) === thisMonth)),
    [leads, period, thisMonth]
  )

  // Money collected (period): full value for Paid jobs, deposit for the rest.
  const collected = useMemo(() => {
    const rows = scoped
      .map((l) => ({ l, amt: normalize(l.status) === 'Paid' ? num(l.value) : num(l.deposit) }))
      .filter((x) => x.amt > 0)
      .sort((a, b) => b.amt - a.amt)
    return { rows, total: rows.reduce((s, x) => s + x.amt, 0) }
  }, [scoped])

  // Money owed (all open won jobs, any month): value minus deposit, if positive.
  const owed = useMemo(() => {
    const rows = leads
      .filter((l) => ['Sold', 'Booked', 'Completed'].includes(normalize(l.status)))
      .map((l) => ({ l, amt: Math.max(0, num(l.value) - num(l.deposit)) }))
      .filter((x) => x.amt >= 0.01) // hide sub-penny leftovers, keep real cents
      .sort((a, b) => b.amt - a.amt)
    return { rows, total: rows.reduce((s, x) => s + x.amt, 0) }
  }, [leads])

  const stats = useMemo(() => {
    const won = scoped.filter((l) => WON.includes(normalize(l.status)))
    const lost = scoped.filter((l) => normalize(l.status) === 'Lost').length
    const revenue = won.reduce((s, l) => s + num(l.value), 0)
    const decided = won.length + lost
    const winRate = decided ? Math.round((won.length / decided) * 100) : 0
    return { leads: scoped.length, booked: won.length, revenue, winRate }
  }, [scoped])

  const group = (keyOf: (l: Lead) => string) => {
    const m: Record<string, { leads: number; booked: number; revenue: number }> = {}
    scoped.forEach((l) => {
      const k = keyOf(l)
      const e = (m[k] = m[k] || { leads: 0, booked: 0, revenue: 0 })
      e.leads += 1
      if (WON.includes(normalize(l.status))) {
        e.booked += 1
        e.revenue += num(l.value)
      }
    })
    return Object.entries(m).sort((a, b) => b[1].revenue - a[1].revenue || b[1].leads - a[1].leads)
  }
  const bySource = useMemo(() => group((l) => (l.source && String(l.source).trim()) || 'Unknown'), [scoped]) // eslint-disable-line react-hooks/exhaustive-deps
  const byProduct = useMemo(() => group((l) => productBucket(String(l.product))), [scoped]) // eslint-disable-line react-hooks/exhaustive-deps

  const lostReasons = useMemo(() => {
    const m: Record<string, number> = {}
    scoped.filter((l) => normalize(l.status) === 'Lost').forEach((l) => {
      const r = (l.lostReason && String(l.lostReason).trim()) || 'Not noted'
      m[r] = (m[r] || 0) + 1
    })
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [scoped])
  const lostTotal = lostReasons.reduce((s, [, n]) => s + n, 0)

  const reviewGot = leads.filter((l) => l.reviewDone).length
  const reviewReq = leads.filter((l) => l.reviewAsked || l.reviewDone).length

  // Month keys covered by the current period (this month, or all configured months).
  const monthsCfg = settings.months || {}
  const scopeKeys = useMemo(
    () => (period === 'month' ? [thisMonth] : Array.from(new Set(leads.map((l) => monthKey(l.date)).filter((k) => k !== 'other')))),
    [period, thisMonth, leads]
  )
  const defaultOverhead = settings.defaultOverhead || 0
  // A month with no overhead entered inherits the default; an explicit 0 stays 0.
  const effOverhead = (k: string) => monthsCfg[k]?.overhead ?? defaultOverhead
  const periodSpend = scopeKeys.reduce((s, k) => s + (monthsCfg[k]?.adSpend || 0), 0)
  const periodOverhead = scopeKeys.reduce((s, k) => s + effOverhead(k), 0)
  const periodReviews = scopeKeys.reduce((s, k) => s + (monthsCfg[k]?.reviews || 0), 0)

  // Ad spend & return on ad spend for the period.
  const adStats = useMemo(() => {
    const won = scoped.filter((l) => WON.includes(normalize(l.status)))
    const revenue = won.reduce((s, l) => s + num(l.value), 0)
    return {
      spend: periodSpend,
      costPerLead: scoped.length ? periodSpend / scoped.length : 0,
      costPerJob: won.length ? periodSpend / won.length : 0,
      roas: periodSpend ? revenue / periodSpend : 0,
      leads: scoped.length,
      jobs: won.length,
    }
  }, [scoped, periodSpend])

  // Scorecard — key metrics for the period vs editable targets.
  const scorecard = useMemo(() => {
    const won = scoped.filter((l) => WON.includes(normalize(l.status)))
    const revenue = won.reduce((s, l) => s + num(l.value), 0)
    const material = won.reduce((s, l) => s + num(l.material), 0)
    const install = won.reduce((s, l) => s + num(l.install), 0)
    const netProfit = revenue - material - install - periodOverhead
    // "Quotes" = leads that got a number on them or moved past the appointment stage.
    const quoted = scoped.filter(
      (l) => num(l.value) > 0 || ['Quoted', 'Sold', 'Booked', 'Completed', 'Paid'].includes(normalize(l.status))
    ).length
    return [
      { key: 'bookingRate', label: 'Booking rate', help: 'jobs ÷ leads', value: scoped.length ? won.length / scoped.length : 0, kind: 'pct' as const },
      { key: 'closeRate', label: 'Close rate', help: 'jobs ÷ quotes', value: quoted ? won.length / quoted : 0, kind: 'pct' as const },
      { key: 'avgTicket', label: 'Avg ticket', help: 'revenue ÷ jobs', value: won.length ? revenue / won.length : 0, kind: 'money' as const },
      { key: 'netProfit', label: 'Net profit', help: 'after material, install & overhead', value: revenue ? netProfit / revenue : 0, kind: 'pct' as const },
      { key: 'reviews', label: 'Reviews', help: 'new this period', value: periodReviews, kind: 'count' as const },
    ]
  }, [scoped, periodOverhead, periodReviews])

  // Monthly trends — every month with activity, newest first.
  const monthly = useMemo(() => {
    const m: Record<string, { leads: number; jobs: number; revenue: number; material: number; install: number }> = {}
    leads.forEach((l) => {
      const k = monthKey(l.date)
      if (k === 'other') return
      const e = (m[k] = m[k] || { leads: 0, jobs: 0, revenue: 0, material: 0, install: 0 })
      e.leads += 1
      if (WON.includes(normalize(l.status))) {
        e.jobs += 1
        e.revenue += num(l.value)
        e.material += num(l.material)
        e.install += num(l.install)
      }
    })
    return Object.entries(m).sort((a, b) => (a[0] < b[0] ? 1 : -1)).slice(0, 12)
  }, [leads])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setPeriod('month')} className={segCls(period === 'month')}>This month</button>
        <button onClick={() => setPeriod('all')} className={segCls(period === 'all')}>All time</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <Stat label="Revenue" value={dollars(stats.revenue)} highlight />
        <Stat label="Leads" value={String(stats.leads)} />
        <Stat label="Booked" value={String(stats.booked)} />
        <Stat label="Win rate" value={stats.winRate ? `${stats.winRate}%` : '—'} />
      </div>

      {/* Scorecard — ratios vs targets */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Scorecard · vs targets</p>
          <button onClick={() => setEditTargets((v) => !v)} className="text-[11px] font-semibold text-gold hover:text-gold-dark">
            {editTargets ? 'Done' : 'Edit targets'}
          </button>
        </div>
        <div className="divide-y divide-stone-100">
          {scorecard.map((m) => {
            const target = T[m.key] ?? 0
            const ok = m.value >= target
            const show = m.kind === 'pct' ? `${Math.round(m.value * 100)}%` : m.kind === 'money' ? dollars(m.value) : String(Math.round(m.value))
            const tgt = m.kind === 'pct' ? `${Math.round(target * 100)}%` : m.kind === 'money' ? dollars(target) : String(Math.round(target))
            return (
              <div key={m.key} className="flex items-center justify-between gap-2 py-2">
                <span className="min-w-0">
                  <span className="text-sm text-charcoal">{m.label}</span>
                  <span className="text-[11px] text-stone-400"> · {m.help}</span>
                </span>
                {editTargets ? (
                  <span className="flex items-center gap-1 shrink-0">
                    <span className="text-[11px] text-stone-400">target</span>
                    {m.kind === 'money' && <span className="text-xs text-warm-grey">$</span>}
                    <input
                      type="number" inputMode="decimal"
                      value={m.kind === 'pct' ? Math.round(target * 100) : target}
                      onChange={(e) => setTarget(m.key, m.kind === 'pct' ? (Number(e.target.value) || 0) / 100 : Number(e.target.value) || 0)}
                      className="w-16 text-right text-sm border border-stone-200 rounded px-2 py-1"
                    />
                    {m.kind === 'pct' && <span className="text-xs text-warm-grey">%</span>}
                  </span>
                ) : (
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-charcoal tabular-nums">{show}</span>
                    <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${ok ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {ok ? '✓' : '↓'} {tgt}
                    </span>
                  </span>
                )}
              </div>
            )
          })}
        </div>
        {editTargets && (
          <div className="flex items-center justify-between gap-2 py-2 mt-1 border-t border-stone-100">
            <span className="min-w-0">
              <span className="text-sm text-charcoal">Monthly overhead</span>
              <span className="text-[11px] text-stone-400"> · applies to every month</span>
            </span>
            <span className="flex items-center gap-1 shrink-0">
              <span className="text-xs text-warm-grey">$</span>
              <input
                type="number" inputMode="decimal" placeholder="0"
                value={settings.defaultOverhead ?? ''}
                onChange={(e) => setDefaultOverhead(Number(e.target.value) || 0)}
                className="w-20 text-right text-sm border border-stone-200 rounded px-2 py-1"
              />
            </span>
          </div>
        )}
        <p className="text-[11px] text-stone-400 mt-2">{editTargets ? 'Set your targets & overhead — saved automatically.' : `Showing ${period === 'all' ? 'all time' : 'this month'}.`}</p>
      </div>

      {/* Ad spend */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Ad spend · {period === 'all' ? 'all time' : 'this month'}</p>
          <p className="font-playfair text-lg text-charcoal">{money2(adStats.spend)}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className="rounded-lg bg-off-white p-2 text-center">
            <p className="text-sm font-semibold text-charcoal tabular-nums">{adStats.spend ? dollars(adStats.costPerLead) : '—'}</p>
            <p className="text-[11px] text-warm-grey">per lead</p>
          </div>
          <div className="rounded-lg bg-off-white p-2 text-center">
            <p className="text-sm font-semibold text-charcoal tabular-nums">{adStats.spend ? dollars(adStats.costPerJob) : '—'}</p>
            <p className="text-[11px] text-warm-grey">per job</p>
          </div>
          <div className="rounded-lg bg-off-white p-2 text-center">
            <p className={`text-sm font-semibold tabular-nums ${adStats.roas >= 1 ? 'text-emerald-700' : 'text-charcoal'}`}>{adStats.spend ? `${adStats.roas.toFixed(1)}×` : '—'}</p>
            <p className="text-[11px] text-warm-grey">return</p>
          </div>
        </div>
        {adSyncOn ? (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-emerald-50 px-3 py-2">
            <span className="min-w-0">
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-800"><Icon name="bolt" className="w-3.5 h-3.5" />Auto-synced from Google Ads</span>
              <span className="block text-[11px] text-emerald-700/80">
                {syncNote || (settings.lastAdSync ? `Last synced ${relTime(settings.lastAdSync)}` : 'Updates daily')}
              </span>
            </span>
            <button onClick={syncNow} disabled={syncing} className="shrink-0 text-xs font-semibold bg-emerald-700 text-white rounded-full px-3 py-1 hover:bg-emerald-800 disabled:opacity-60">
              {syncing ? 'Syncing…' : 'Sync now'}
            </button>
          </div>
        ) : (
          <>
            <label className="block text-xs text-warm-grey mt-3">
              {monthLabel(thisMonth)} ad spend
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm text-warm-grey">$</span>
                <input
                  type="number" inputMode="decimal" placeholder="0.00"
                  value={monthsCfg[thisMonth]?.adSpend ?? ''}
                  onChange={(e) => setMonthCfg(thisMonth, 'adSpend', Number(e.target.value) || 0)}
                  className="w-full text-sm border border-stone-200 rounded px-2 py-1.5"
                />
              </div>
            </label>
            <p className="text-[11px] text-stone-400 mt-2">Enter spend by hand for now — it switches to automatic Google Ads sync once your API access is connected.</p>
          </>
        )}
        {adSyncOn && <p className="text-[11px] text-stone-400 mt-2">Return = revenue ÷ ad spend. Pulled from Google Ads daily.</p>}
      </div>

      <GroupTable title="Where leads come from" col="Source" rows={bySource} />

      {/* Collected */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Collected · {period === 'all' ? 'all time' : 'this month'}</p>
          <p className="font-playfair text-lg text-emerald-700">{money2(collected.total)}</p>
        </div>
        {collected.rows.length === 0 ? (
          <p className="text-warm-grey text-sm">Nothing collected yet.</p>
        ) : (
          <div className="divide-y divide-stone-100">
            {collected.rows.map((x) => (
              <button key={x.l.row} onClick={() => onOpen(x.l)} className="w-full flex items-center justify-between gap-2 py-2 text-left hover:bg-off-white rounded">
                <span className="min-w-0">
                  <span className="text-sm text-charcoal">{x.l.name || '(no name)'}</span>
                  {x.l.payment && <span className="text-[11px] text-warm-grey"> · {x.l.payment}</span>}
                  {normalize(x.l.status) === 'Paid' && <span className="text-[11px] text-emerald-700"> · paid in full</span>}
                </span>
                <span className="text-sm font-semibold text-charcoal tabular-nums">{money2(x.amt)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Owed */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Owed to you <span className="text-stone-400 normal-case font-normal">(all open jobs)</span></p>
          <p className="font-playfair text-lg text-charcoal">{money2(owed.total)}</p>
        </div>
        {owed.rows.length === 0 ? (
          <p className="text-warm-grey text-sm">Nothing outstanding — everyone&apos;s paid up.</p>
        ) : (
          <div className="divide-y divide-stone-100">
            {owed.rows.map((x) => (
              <div key={x.l.row} className="flex items-center justify-between gap-2 py-2">
                <button onClick={() => onOpen(x.l)} className="min-w-0 text-left flex-1">
                  <span className="text-sm text-charcoal">{x.l.name || '(no name)'}</span>
                  <span className="text-[11px] text-warm-grey"> · {normalize(x.l.status)}</span>
                </button>
                <span className="text-sm font-semibold text-red-600 tabular-nums">{money2(x.amt)}</span>
                <button onClick={() => onPay(x.l)} className="shrink-0 text-xs font-semibold bg-gold text-white rounded-full px-3 py-1 hover:bg-gold-dark">
                  Record
                </button>
              </div>
            ))}
          </div>
        )}
        {owed.rows.length > 0 && <p className="text-[11px] text-stone-400 mt-2">Tap a name to open the lead, or <span className="text-gold font-semibold">Record</span> to log a payment.</p>}
      </div>

      <GroupTable title="By product" col="Product" rows={byProduct} />

      {/* Monthly trends — tap a month to log ad spend, overhead & reviews */}
      {monthly.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">Monthly trends</p>
          <div className="divide-y divide-stone-100">
            {monthly.map(([k, v]) => {
              const cfg = monthsCfg[k] || {}
              const spend = cfg.adSpend || 0
              const netProfit = v.revenue - v.material - v.install - effOverhead(k)
              const open = editMonth === k
              return (
                <div key={k} className="py-1">
                  <button onClick={() => setEditMonth(open ? '' : k)} className="w-full flex items-center justify-between gap-2 py-1.5 text-sm text-left hover:bg-off-white rounded">
                    <span className="flex items-center gap-1 text-charcoal w-24 shrink-0">{monthLabel(k)}<Icon name="chevron-down" className={`w-3.5 h-3.5 text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`} /></span>
                    <span className="text-xs text-warm-grey flex-1 text-center tabular-nums">
                      {v.leads} {v.leads === 1 ? 'lead' : 'leads'} · {v.jobs} {v.jobs === 1 ? 'job' : 'jobs'}
                      {spend > 0 && <span className="text-stone-400"> · ad {dollars(spend)}</span>}
                    </span>
                    <span className="font-semibold text-charcoal tabular-nums shrink-0">{dollars(v.revenue)}</span>
                  </button>
                  {open && (
                    <div className="mt-1 mb-2 rounded-lg bg-off-white p-3 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        {([['adSpend', 'Ad spend'], ['overhead', 'Overhead'], ['reviews', 'New reviews']] as [keyof MonthCfg, string][]).map(([field, label]) => (
                          <label key={field} className="block text-[11px] text-warm-grey">
                            {field === 'adSpend' && adSyncOn ? 'Ad spend (auto)' : label}
                            {field === 'adSpend' && adSyncOn ? (
                              <div className="w-full text-sm border border-stone-200 bg-stone-50 text-charcoal rounded px-2 py-1.5 mt-0.5 tabular-nums">{cfg.adSpend ? dollars(cfg.adSpend) : '—'}</div>
                            ) : (
                              <input
                                type="number" inputMode="decimal"
                                placeholder={field === 'overhead' && defaultOverhead ? String(defaultOverhead) : '0'}
                                value={cfg[field] ?? ''}
                                onChange={(e) => setMonthCfg(k, field, Number(e.target.value) || 0)}
                                className="w-full text-sm border border-stone-200 rounded px-2 py-1.5 mt-0.5"
                              />
                            )}
                          </label>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-warm-grey">
                        <span>Cost / lead: <span className="font-semibold text-charcoal">{spend && v.leads ? dollars(spend / v.leads) : '—'}</span></span>
                        <span>Net profit: <span className="font-semibold text-charcoal">{v.revenue ? `${dollars(netProfit)} (${Math.round((netProfit / v.revenue) * 100)}%)` : '—'}</span></span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <p className="text-[11px] text-stone-400 mt-2">Tap a month to enter {adSyncOn ? 'overhead and new reviews' : 'ad spend, overhead and new reviews'} — they feed the scorecard.{adSyncOn ? ' Ad spend syncs from Google Ads.' : ''}</p>
        </div>
      )}

      {lostTotal > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Why we lose</p>
            <p className="text-sm text-warm-grey">{lostTotal} lost</p>
          </div>
          <div className="divide-y divide-stone-100">
            {lostReasons.map(([r, n]) => (
              <div key={r} className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-charcoal">{r}</span>
                <span className="font-semibold text-charcoal tabular-nums">{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-1">Reviews</p>
        <p className="text-sm text-charcoal">
          {periodReviews} new {periodReviews === 1 ? 'review' : 'reviews'} logged · {reviewGot} received · {reviewReq} requested
        </p>
        <p className="text-[11px] text-warm-grey mt-1">
          Manage the full ask &amp; follow-up queue under Reviews in the bottom bar.
        </p>
      </div>

      {/* Follow-up scripts */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <button onClick={() => setScriptsOpen((v) => !v)} className="w-full flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Follow-up scripts</span>
          <Icon name="chevron-down" className={`w-4 h-4 text-stone-400 transition-transform ${scriptsOpen ? 'rotate-180' : ''}`} />
        </button>
        {scriptsOpen && (
          <div className="mt-3 space-y-2.5">
            {FOLLOWUP_SCRIPTS.map((s) => (
              <div key={s.when} className="rounded-lg bg-off-white border border-stone-100 p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-charcoal">{s.when}</p>
                  <button onClick={() => copyScript(s.when, s.text)} className="shrink-0 text-[11px] font-semibold text-gold hover:text-gold-dark">
                    {copied === s.when ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-warm-grey leading-snug">{s.text}</p>
              </div>
            ))}
            <p className="text-[11px] text-stone-400">Swap in the lead&rsquo;s name and product before sending.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ReviewsView({ leads, onOpen, saveLead }: { leads: Lead[]; onOpen: (l: Lead) => void; saveLead: (l: Lead, p: Partial<Lead>) => void }) {
  const [rs, setRs] = useState<ReviewState | null>(null)
  const [configured, setConfigured] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [note, setNote] = useState('')
  const loadReview = () =>
    fetch('/manage/api/settings')
      .then((r) => r.json())
      .then((j) => { if (j?.ok) { setRs((j.settings?.reviewState as ReviewState) || null); setConfigured(!!j.reviewSyncConfigured) } })
      .catch(() => {})
  useEffect(() => { loadReview() }, [])
  const syncNow = async () => {
    setSyncing(true); setNote('')
    try {
      const res = await fetch('/manage/api/reviews/sync', { method: 'POST' })
      const j = await res.json()
      if (j?.ok) { await loadReview(); setNote('Synced ✓') } else setNote(String(j?.error || 'Sync failed').slice(0, 160))
    } catch { setNote('Sync failed') } finally { setSyncing(false); setTimeout(() => setNote(''), 4000) }
  }

  const { toAsk, waiting, followUp, got } = reviewBuckets(leads)
  const now = toISO(new Date())
  const ask = (l: Lead) => saveLead(l, { reviewAsked: l.reviewAsked || now, reviewLastAsked: now })
  const gotIt = (l: Lead) => saveLead(l, { reviewDone: now })
  const stop = (l: Lead) => saveLead(l, { reviewStop: now })

  const mk = now.slice(0, 7)
  const newThis = rs?.baselines && rs.baselines[mk] != null ? Math.max(0, rs.total - rs.baselines[mk]) : undefined

  return (
    <div className="space-y-4">
      {/* Live rating + sync */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        {configured ? (
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-playfair text-2xl text-charcoal leading-none">{rs?.rating ? rs.rating.toFixed(1) : '—'} <span className="text-gold">★</span></p>
                <p className="text-[11px] text-warm-grey mt-1">{rs ? `${rs.total} Google review${rs.total === 1 ? '' : 's'}${newThis != null ? ` · ${newThis} new this month` : ''}` : 'Tap Sync now to pull your live rating.'}</p>
              </div>
              <button onClick={syncNow} disabled={syncing} className="shrink-0 text-xs font-semibold bg-emerald-700 text-white rounded-full px-3 py-1 hover:bg-emerald-800 disabled:opacity-60">{syncing ? 'Syncing…' : 'Sync now'}</button>
            </div>
            <p className="text-[11px] text-warm-grey mt-2 break-words">{note || (rs?.syncedAt ? `Synced ${relTime(rs.syncedAt)}` : 'Updates daily')}</p>
          </div>
        ) : (
          <p className="text-xs text-warm-grey">Connect Google reviews to show your live star rating and count here (see <span className="font-semibold">REVIEWS_SETUP.md</span>). The follow-up queue below works either way.</p>
        )}
      </div>

      {/* Ask for a review */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">Ask for a review · {toAsk.length}</p>
        {toAsk.length === 0 ? (
          <p className="text-warm-grey text-sm">No finished jobs waiting to be asked.</p>
        ) : (
          <div className="space-y-2">
            {toAsk.map((l) => (
              <div key={l.row} className="bg-white rounded-xl border border-gold/40 p-3">
                <button onClick={() => onOpen(l)} className="w-full min-w-0 text-left">
                  <span className="text-sm font-semibold text-charcoal">{l.name || '(no name)'}</span>
                  <span className="block text-[11px] text-warm-grey truncate">{[String(l.product || ''), normalize(l.status)].filter(Boolean).join(' · ')}</span>
                </button>
                <div className="flex items-center gap-2 mt-2">
                  <a href={smsHref(String(l.phone || ''), reviewMessage(l.name))} onClick={() => ask(l)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-gold text-white rounded-full px-3 py-2 hover:bg-gold-dark"><Icon name="star" className="w-3.5 h-3.5" />Text review link</a>
                  {/@/.test(String(l.email || '')) && (
                    <a href={mailtoHref(String(l.email), 'A quick review for Atlas Rug & Design Centre?', reviewMessage(l.name))} onClick={() => ask(l)} className="text-xs font-semibold border border-stone-200 rounded-full px-3 py-2 hover:border-gold">Email</a>
                  )}
                  <button onClick={() => stop(l)} className="text-xs text-warm-grey px-1 hover:text-charcoal">Skip</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Follow up */}
      {followUp.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">Follow up · {followUp.length}</p>
          <div className="space-y-2">
            {followUp.map((l) => {
              const since = daysSince(String(l.reviewLastAsked || l.reviewAsked))
              return (
                <div key={l.row} className="bg-white rounded-xl border border-amber-300 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <button onClick={() => onOpen(l)} className="min-w-0 text-left">
                      <span className="text-sm font-semibold text-charcoal">{l.name || '(no name)'}</span>
                      <span className="block text-[11px] text-amber-700">Asked {since}d ago · no review yet</span>
                    </button>
                    <button onClick={() => gotIt(l)} className="shrink-0 text-xs font-semibold text-emerald-700 hover:text-emerald-800">✓ Got it</button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <a href={smsHref(String(l.phone || ''), reviewMessage(l.name))} onClick={() => ask(l)} className="flex-1 text-center text-xs font-semibold bg-amber-500 text-white rounded-full px-3 py-2 hover:bg-amber-600">Text again</a>
                    <button onClick={() => stop(l)} className="text-xs text-warm-grey px-1 hover:text-charcoal">Stop asking</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Waiting to hear back */}
      {waiting.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">Waiting to hear back · {waiting.length}</p>
          <div className="bg-white rounded-2xl border border-stone-200/70 divide-y divide-stone-100">
            {waiting.map((l) => {
              const since = daysSince(String(l.reviewLastAsked || l.reviewAsked))
              return (
                <div key={l.row} className="flex items-center justify-between gap-2 p-3">
                  <button onClick={() => onOpen(l)} className="min-w-0 text-left">
                    <span className="text-sm text-charcoal">{l.name || '(no name)'}</span>
                    <span className="text-[11px] text-warm-grey"> · asked {since === 0 ? 'today' : `${since}d ago`}</span>
                  </button>
                  <button onClick={() => gotIt(l)} className="shrink-0 text-xs font-semibold text-emerald-700 hover:text-emerald-800">✓ Got it</button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Got reviews */}
      <div className="bg-white rounded-2xl border border-stone-200/70 p-4">
        <p className="text-sm text-charcoal"><span className="font-semibold">{got.length}</span> {got.length === 1 ? 'customer has' : 'customers have'} left a review</p>
        <p className="text-[11px] text-warm-grey mt-1">Jobs show up here once they&apos;re Completed or Paid. We flag a follow-up after {REVIEW_FOLLOWUP_DAYS} days with no review.</p>
      </div>
    </div>
  )
}

// "How did they find us?" — for leads added by hand (mostly phone calls), so
// they count under the right source in Money → Where leads come from.
const SOURCE_OPTIONS = [
  'Google Ads – Carpet (call)',
  'Google (not sure if ad)',
  'Google Maps / Business Profile',
  'Referral – past customer',
  'Repeat customer',
  'Walk-in / drove by',
  'HomeStars',
  'Facebook / Instagram',
  'Realtor / designer / contractor',
  'Other',
]

const PRODUCT_OPTIONS = [
  'Carpet & Broadloom', 'Stair Runners', 'Hardwood', 'Engineered Hardwood',
  'Laminate', 'Luxury Vinyl', 'Area Rugs', 'Refinishing', 'Commercial',
]

function AddLead({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [product, setProduct] = useState('')
  const [notes, setNotes] = useState('')
  const [source, setSource] = useState('')
  const [apptDate, setApptDate] = useState('')
  const [apptWindow, setApptWindow] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const canSave = name.trim() !== '' || /\d/.test(phone) || /@/.test(email)

  const save = async () => {
    if (!canSave) {
      setError('Add at least a name, phone, or email.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/manage/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, address, product, message: notes, source, bookedDate: apptDate ? joinAppt(apptDate, apptWindow) : '' }),
      })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Could not add')
      onAdded()
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not add lead')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-off-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
        <div className="sticky top-0 bg-charcoal text-white px-4 py-3 flex items-center gap-3 z-10">
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 -ml-1 rounded-full hover:bg-white/10 flex items-center justify-center"><Icon name="x" className="w-5 h-5" /></button>
          <p className="font-semibold flex-1">Add a lead</p>
        </div>

        <div className="p-4 space-y-3 flex-1">
          <label className="block text-xs text-warm-grey">Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoFocus className={`${fieldCls} w-full mt-1`} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-warm-grey">Phone
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" placeholder="(416) …" className={`${fieldCls} w-full mt-1`} />
            </label>
            <label className="block text-xs text-warm-grey">Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" placeholder="name@…" className={`${fieldCls} w-full mt-1`} />
            </label>
          </div>
          <label className="block text-xs text-warm-grey">Address
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Neighbourhood / address" className={`${fieldCls} w-full mt-1`} />
          </label>
          <label className="block text-xs text-warm-grey">Product
            <input list="add-products" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Carpet, Stair runners" className={`${fieldCls} w-full mt-1`} />
            <datalist id="add-products">
              {PRODUCT_OPTIONS.map((p) => <option key={p} value={p} />)}
            </datalist>
          </label>
          <label className="block text-xs text-warm-grey">Notes
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="What do they need?" className={`${fieldCls} w-full mt-1`} />
          </label>
          <div>
            <p className="text-xs text-warm-grey mb-1.5">How did they find us?</p>
            <div className="flex flex-wrap gap-1.5">
              {SOURCE_OPTIONS.map((o) => (
                <button key={o} type="button" onClick={() => setSource(source === o ? '' : o)}
                  className={`px-3 py-1.5 rounded-full text-[13px] border transition-colors ${
                    source === o ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-stone-200 hover:border-gold'
                  }`}>
                  {o}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-400 mt-1">Ask on the phone — it&apos;s how you&apos;ll know if your ads pay off.</p>
          </div>
          <div>
            <p className="text-xs text-warm-grey mb-1">Book their measure <span className="text-stone-400">(optional)</span></p>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={apptDate} onChange={(e) => setApptDate(e.target.value)} aria-label="Appointment date" className={`${fieldCls} w-full`} />
              <select value={apptWindow} onChange={(e) => setApptWindow(e.target.value)} aria-label="Time window" className={`${fieldCls} crm-select w-full`}>
                <option value="">Time window…</option>
                {APPT_WINDOWS.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <p className="text-[11px] text-warm-grey">
            {apptDate ? <>Saves as an <strong>Appointment</strong> on {fmtApptDate(apptDate)}{apptWindow ? ` · ${apptWindow}` : ''}.</> : <>Starts as a <strong>New</strong> lead.</>}
          </p>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-end gap-3">
          <button onClick={onClose} className="text-sm text-warm-grey px-3 py-2.5">Cancel</button>
          <button onClick={save} disabled={saving || !canSave}
            className="bg-gold text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gold-dark transition-colors disabled:opacity-50">
            {saving ? 'Adding…' : 'Add lead'}
          </button>
        </div>
      </div>
    </div>
  )
}
