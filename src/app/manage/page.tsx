'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

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
}

// Post-sale operational to-dos — independent of the pipeline stage. A job can
// need several at once (ordered + binding + unpaid). Stored comma-separated.
const JOB_TASKS = [
  { key: 'sendquote', label: 'Send quote', short: 'Send quote', icon: '📝' },
  { key: 'schedule', label: 'Schedule install', short: 'Schedule', icon: '📅' },
  { key: 'order', label: 'Order carpet', short: 'To order', icon: '📦' },
  { key: 'pickup', label: 'Pick up carpet', short: 'Pick up', icon: '🚚' },
  { key: 'binding', label: 'Send to binding', short: 'Binding', icon: '🧵' },
  { key: 'unpaid', label: 'Awaiting payment', short: 'Unpaid', icon: '💰' },
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
  `flex-1 px-2 py-2 rounded-lg text-[13px] font-semibold border transition-colors whitespace-nowrap ${
    active ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-stone-200'
  }`

// Whole days since a date (0 if unparseable).
const daysSince = (d: string) => {
  const t = new Date(d).getTime()
  return isNaN(t) ? 0 : Math.floor((Date.now() - t) / 864e5)
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
const REVIEW_URL = 'https://atlasrugflooring.com/review'
const reviewMessage = (name: string) => {
  const first = (name || '').trim().split(/\s+/)[0]
  return `Hi${first ? ' ' + first : ''}, thanks again for choosing Atlas Rug & Design Centre! If you have 30 seconds, we'd really appreciate a quick review — it means a lot to our family business: ${REVIEW_URL}`
}
const smsHref = (phone: string, body: string) => `sms:${phone}?&body=${encodeURIComponent(body)}`
const mailtoHref = (email: string, subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

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

const isRealLead = (l: Lead) => {
  const validDate = /\d{4}/.test(String(l.date)) && !isNaN(new Date(l.date).getTime())
  return validDate || /\d/.test(String(l.phone ?? '')) || /@/.test(String(l.email ?? ''))
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

const fieldCls = 'border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold'

export default function ManagePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<string>('All') // 'All' | Stage | 'Needs follow-up' | `task:<key>`
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [month, setMonth] = useState('')
  const [adding, setAdding] = useState(false)
  const [view, setView] = useState<'today' | 'leads' | 'schedule' | 'reports'>('today')
  const [canImport, setCanImport] = useState(false)
  const [importing, setImporting] = useState(false)

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
      setLeads(all.filter(isRealLead))
      setCanImport(!!json.canImport)
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
    if (filter === 'Needs follow-up') return followUpLeads.filter(bySearch)
    if (filter.startsWith('task:')) {
      const key = filter.slice(5)
      return leads.filter((l) => taskSet(l).has(key)).filter(bySearch).sort((a, b) => (a.date < b.date ? 1 : -1))
    }
    return monthLeads
      .filter((l) => filter === 'All' || normalize(l.status) === filter)
      .filter(bySearch)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [monthLeads, leads, followUpLeads, filter, search])

  const onSaved = (row: number, patch: Partial<Lead>) => {
    setLeads((ls) => ls.map((l) => (l.row === row ? { ...l, ...patch } : l)))
    setSelected((s) => (s && s.row === row ? { ...s, ...patch } : s))
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

  // How many ideal measure slots are still open today.
  const openToday = useMemo(() => {
    const measuresToday = leads.flatMap((l) => leadEvents(l)).filter((e) => e.kind === 'measure' && e.date === today)
    return IDEAL_SLOTS.filter((slot) => !measuresToday.some((e) => e.badge === slot)).length
  }, [leads, today])

  return (
    <main className="min-h-screen bg-off-white font-lato">
      <header className="bg-charcoal text-white px-4 py-4 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-playfair text-xl">Lead Manager</h1>
            <p className="text-white/60 text-[11px]">Atlas Rug &amp; Design Centre</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setAdding(true)}
              className="text-sm bg-gold hover:bg-gold-dark text-white font-semibold px-3 py-2 rounded transition-colors"
            >
              + Add lead
            </button>
            <button onClick={() => load()} aria-label="Refresh" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded transition-colors">
              ↻
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-5">
        {/* One-time import from the old Google Sheet */}
        {canImport && (
          <div className="bg-gold/10 border border-gold/40 rounded-xl p-4 mb-4">
            <p className="text-sm text-charcoal font-semibold mb-1">Import your existing leads</p>
            <p className="text-xs text-warm-grey mb-3">Your database is empty. Bring over everything from your old Google Sheet — one time, nothing is deleted from the sheet.</p>
            <button
              onClick={runImport}
              disabled={importing}
              className="bg-gold text-white font-semibold px-4 py-2 rounded hover:bg-gold-dark transition-colors disabled:opacity-50 text-sm"
            >
              {importing ? 'Importing…' : 'Import from Google Sheet'}
            </button>
          </div>
        )}

        {/* View switch */}
        <div className="flex gap-1.5 mb-4">
          <button onClick={() => setView('today')} className={segCls(view === 'today')}>🏠 Today</button>
          <button onClick={() => setView('leads')} className={segCls(view === 'leads')}>📋 Leads</button>
          <button onClick={() => setView('schedule')} className={segCls(view === 'schedule')}>📅 Schedule</button>
        </div>

        {view === 'today' ? (
          <TodayView
            date={today}
            todaysAppts={todaysAppts}
            followUpLeads={followUpLeads}
            todoChips={todoChips}
            kpis={kpis}
            openToday={openToday}
            onOpen={(l) => setSelected(l)}
            goToFilter={(f) => { setMonth('all'); setFilter(f); setView('leads') }}
            goToReports={() => setView('reports')}
            goToSchedule={() => setView('schedule')}
          />
        ) : view === 'schedule' ? (
          <ScheduleView leads={leads} onOpen={(l) => setSelected(l)} onBook={bookSlot} />
        ) : view === 'reports' ? (
          <>
            <button onClick={() => setView('today')} className="text-sm text-warm-grey mb-3 hover:text-charcoal">‹ Back to Today</button>
            <ReportsView leads={leads} />
          </>
        ) : (
        <>
        {/* Month filter */}
        {filter !== 'Needs follow-up' && !filter.startsWith('task:') && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-warm-grey shrink-0">Month</span>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className={`${fieldCls} flex-1`}>
              <option value="all">All months</option>
              {monthOptions.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label} ({m.count})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Active task filter banner */}
        {filter.startsWith('task:') && (
          <button onClick={() => setFilter('All')}
            className="w-full mb-3 flex items-center justify-between rounded-lg bg-charcoal text-white px-3 py-2 text-sm">
            <span>Showing: {JOB_TASKS.find((t) => t.key === filter.slice(5))?.label ?? 'Tasks'}</span>
            <span className="opacity-70">Clear ✕</span>
          </button>
        )}

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 -mx-1 px-1">
          {followUpLeads.length > 0 && (
            <button
              onClick={() => setFilter('Needs follow-up')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm border font-semibold transition-colors ${
                filter === 'Needs follow-up' ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              ⚠ Follow-ups <span className="text-xs opacity-80">{followUpLeads.length}</span>
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

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, email, address…"
          className={`${fieldCls} w-full mb-4`}
        />

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

      {selected && <Detail lead={selected} onClose={() => setSelected(null)} onSaved={onSaved} />}
      {adding && <AddLead onClose={() => setAdding(false)} onAdded={load} />}
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
      📍 {address}
    </a>
  )
}

function ApptRow({ lead, badge, kind, onOpen }: { lead: Lead; badge: string; kind?: 'measure' | 'install'; onOpen: () => void }) {
  const phone = String(lead.phone ?? '')
  const hasPhone = /\d/.test(phone)
  const chip = kind === 'install' ? 'text-emerald-700 bg-emerald-100' : 'text-gold bg-gold/10'
  return (
    <div
      onClick={onOpen}
      className="flex items-center gap-3 rounded-lg bg-off-white border border-stone-100 p-2.5 cursor-pointer hover:border-gold transition-colors"
    >
      <span className={`shrink-0 text-xs font-semibold rounded px-2 py-1 min-w-[72px] text-center ${chip}`}>
        {badge}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-charcoal truncate">{lead.name || '(no name)'}</p>
        {lead.product && <p className="text-warm-grey text-xs truncate">{lead.product}</p>}
        {lead.address && <MapLink address={lead.address} className="text-gold text-xs underline truncate inline-block max-w-full" />}
      </div>
      {hasPhone && (
        <a href={`tel:${phone}`} onClick={(e) => e.stopPropagation()} aria-label="Call"
          className="shrink-0 w-9 h-9 rounded-full bg-gold/10 text-gold flex items-center justify-center hover:bg-gold/20">📞</a>
      )}
    </div>
  )
}

function ScheduleView({ leads, onOpen, onBook }: { leads: Lead[]; onOpen: (l: Lead) => void; onBook: (lead: Lead, dateISO: string, slot: string) => void }) {
  const [offset, setOffset] = useState(0)
  const [booking, setBooking] = useState<{ date: string; slot: string } | null>(null)
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
  const soldSub = (l: Lead) => (l.installDate ? `📅 ${fmtApptDate(String(l.installDate))}` : '📅 Needs date')

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
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setOffset((o) => o - 1)} aria-label="Previous week"
          className="w-10 h-10 rounded-full bg-white border border-stone-200 text-charcoal text-xl leading-none hover:border-gold">‹</button>
        <div className="text-center">
          <p className="font-playfair text-lg text-charcoal">{fmt(start)} – {fmt(end)}</p>
          {offset !== 0 && <button onClick={() => setOffset(0)} className="text-[11px] text-warm-grey underline">This week</button>}
        </div>
        <button onClick={() => setOffset((o) => o + 1)} aria-label="Next week"
          className="w-10 h-10 rounded-full bg-white border border-stone-200 text-charcoal text-xl leading-none hover:border-gold">›</button>
      </div>

      {/* Open slots — ideal 2-a-day windows, Mon–Sat */}
      <div className="bg-white rounded-xl border border-stone-100 p-4 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">Open slots</p>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-x-2 gap-y-1.5 items-center">
          <span />
          {IDEAL_SLOTS.map((s) => (
            <span key={s} className="text-[11px] text-warm-grey text-center">{s}</span>
          ))}
          {Array.from({ length: 6 }, (_, i) => {
            const d = new Date(start)
            d.setDate(start.getDate() + i)
            const diso = toISO(d)
            const label = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
            return (
              <div key={diso} className="contents">
                <span className={`text-xs ${diso === todayISO ? 'text-gold font-semibold' : 'text-charcoal'}`}>{label}</span>
                {IDEAL_SLOTS.map((slot) => {
                  const taken = events.find((e) => e.kind === 'measure' && e.date === diso && e.badge === slot)
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
            )
          })}
        </div>
        <p className="text-[11px] text-stone-400 mt-2">Tap <span className="text-emerald-700 font-semibold">Open +</span> to book a lead into that slot, or a name to open that lead.</p>
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
                    sub={`${e.kind === 'install' ? '🔧 Install' : `📅 ${e.badge}`} · ${shortDay(e.date)}${e.date === todayISO ? ' · Today' : ''}`} />
                ))}
                {past.length > 0 && (
                  <>
                    <p className="text-[11px] text-stone-400 pt-2 border-t border-stone-100">Earlier this week</p>
                    {past.map((e) => (
                      <div key={`${e.lead.row}-${e.kind}`} className="opacity-60">
                        <BoardCard lead={e.lead} tone={e.kind === 'install' ? 'emerald' : 'amber'} onOpen={() => onOpen(e.lead)}
                          sub={`${e.kind === 'install' ? '🔧 Install' : `📅 ${e.badge}`} · ${shortDay(e.date)}`} />
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
          <button onClick={onClose} aria-label="Close" className="text-2xl leading-none">×</button>
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
  date, todaysAppts, followUpLeads, todoChips, kpis, openToday, onOpen, goToFilter, goToReports, goToSchedule,
}: {
  date: string
  todaysAppts: SchedEvent[]
  followUpLeads: Lead[]
  todoChips: { key: string; label: string; short: string; icon: string; count: number }[]
  kpis: { active: number; quotesPending: number; upcomingInstalls: number; outstanding: number }
  openToday: number
  onOpen: (l: Lead) => void
  goToFilter: (f: string) => void
  goToReports: () => void
  goToSchedule: () => void
}) {
  const niceDate = (() => {
    const d = new Date(date + 'T00:00:00')
    return isNaN(d.getTime()) ? date : d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  })()
  return (
    <div className="space-y-4">
      <p className="text-sm text-warm-grey -mt-1">{niceDate}</p>

      {/* Today's schedule */}
      <section className="bg-white rounded-xl border border-gold/40 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">📅 Today&apos;s schedule</p>
          {openToday > 0 && (
            <button onClick={goToSchedule} className="text-[11px] text-emerald-700 font-semibold hover:underline">
              {openToday} ideal slot{openToday === 1 ? '' : 's'} open ›
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

      {/* Needs follow-up */}
      {followUpLeads.length > 0 && (
        <section className="bg-white rounded-xl border border-red-200 p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">⚠ Needs follow-up ({followUpLeads.length})</p>
            {followUpLeads.length > 4 && <button onClick={() => goToFilter('Needs follow-up')} className="text-[11px] text-warm-grey underline">See all</button>}
          </div>
          <div>
            {followUpLeads.slice(0, 4).map((l) => (
              <button key={l.row} onClick={() => onOpen(l)} className="w-full text-left flex items-center justify-between gap-2 rounded-lg hover:bg-off-white px-2 py-1.5">
                <span className="min-w-0">
                  <span className="font-semibold text-sm text-charcoal">{l.name || '(no name)'}</span>
                  <span className="block text-[11px] text-red-600 truncate">{followUpInfo(l).reason}</span>
                </span>
                <span className="text-stone-300">›</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Jobs to-do */}
      {todoChips.length > 0 && (
        <section className="bg-white rounded-xl border border-stone-100 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-2">🧰 Jobs to-do</p>
          <div className="flex flex-wrap gap-2">
            {todoChips.map((t) => (
              <button key={t.key} onClick={() => goToFilter(`task:${t.key}`)}
                className="text-sm border border-stone-200 rounded-full px-3 py-1.5 hover:border-gold transition-colors">
                {t.icon} {t.short} <span className="text-xs text-warm-grey">{t.count}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Money glance */}
      <button onClick={goToReports} className="w-full bg-charcoal rounded-xl p-4 flex items-center justify-between text-left">
        <div>
          <p className="text-gold font-playfair text-2xl leading-none">{dollars(kpis.outstanding)}</p>
          <p className="text-white/70 text-[11px] mt-1">Outstanding · {kpis.upcomingInstalls} upcoming install{kpis.upcomingInstalls === 1 ? '' : 's'}</p>
        </div>
        <span className="text-white/60 text-sm">Reports ›</span>
      </button>
    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${highlight ? 'bg-charcoal border-charcoal' : 'bg-white border-stone-100'}`}>
      <p className={`text-[11px] leading-tight ${highlight ? 'text-white/70' : 'text-warm-grey'}`}>{label}</p>
      <p className={`font-playfair text-xl mt-0.5 ${highlight ? 'text-gold' : 'text-charcoal'}`}>{value}</p>
    </div>
  )
}

function Row({ lead, onOpen, reason }: { lead: Lead; onOpen: () => void; reason?: string }) {
  const stage = normalize(lead.status)
  const appt = parseAppt(String(lead.bookedDate || ''))
  const apptText = appt.date ? `📅 ${fmtApptDate(appt.date)}${appt.window ? ` · ${appt.window}` : ''}` : null
  const installText = lead.installDate ? `🔧 Install ${fmtApptDate(String(lead.installDate))}` : null
  const sub = [
    lead.product || null,
    apptText,
    installText,
    lead.followUp ? `⏰ ${lead.followUp}` : null,
    num(lead.value) > 0 ? dollars(num(lead.value)) : null,
  ]
    .filter(Boolean)
    .join('  ·  ')
  const phone = String(lead.phone ?? '')
  const hasPhone = /\d/.test(phone)
  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-xl border border-stone-100 p-3 flex items-center gap-2 cursor-pointer hover:border-gold transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-charcoal truncate">{lead.name || '(no name)'}</span>
          <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STAGE_STYLE[stage]}`}>{stage}</span>
        </div>
        {reason && <p className="text-red-600 text-xs mt-0.5 truncate">⚠ {reason}</p>}
        <p className="text-warm-grey text-xs mt-0.5 truncate">{sub || lead.date}</p>
        {(() => {
          const ts = JOB_TASKS.filter((t) => taskSet(lead).has(t.key))
          return ts.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {ts.map((t) => (
                <span key={t.key} className="text-[10px] bg-stone-100 text-charcoal rounded px-1.5 py-0.5">{t.icon} {t.short}</span>
              ))}
            </div>
          ) : null
        })()}
      </div>
      {hasPhone && (
        <>
          <a href={`tel:${phone}`} onClick={(e) => e.stopPropagation()} aria-label="Call"
            className="shrink-0 w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center hover:bg-gold/20">📞</a>
          <a href={`sms:${phone}`} onClick={(e) => e.stopPropagation()} aria-label="Text"
            className="shrink-0 w-10 h-10 rounded-full bg-stone-100 text-charcoal flex items-center justify-center hover:bg-stone-200">💬</a>
        </>
      )}
      <span className="shrink-0 text-stone-300 text-xl leading-none pr-1">›</span>
    </div>
  )
}

function Detail({ lead, onClose, onSaved }: { lead: Lead; onClose: () => void; onSaved: (row: number, patch: Partial<Lead>) => void }) {
  const appt0 = parseAppt(String(lead.bookedDate ?? ''))
  const [status, setStatus] = useState<Stage>(normalize(lead.status))
  const [followUp, setFollowUp] = useState(lead.followUp ?? '')
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
    setReviewAsked(readAsked()[String(lead.row)] || null)
  }, [lead.row])
  const onAskReview = () => {
    markAsked(lead.row)
    setReviewAsked(toISO(new Date()))
  }

  const grossProfit = num(value) - num(material) - num(install)
  const balanceDue = num(value) - num(deposit)
  const hasValue = num(value) > 0
  const hasCosts = num(material) > 0 || num(install) > 0
  const phone = String(lead.phone ?? '')
  const hasPhone = /\d/.test(phone)

  const save = async (): Promise<boolean> => {
    setSaving(true)
    setSaved(false)
    const bookedDate = joinAppt(apptDate, apptWindow)
    try {
      const res = await fetch('/manage/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: lead.row, status, followUp, bookedDate, installDate, value, material, install, deposit, payment, notes, tasks: tasks.join(','), quote }),
      })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Save failed')
      onSaved(lead.row, { status, followUp, bookedDate, installDate, value, material, install, deposit, payment, notes, tasks: tasks.join(','), quote })
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
    followUp !== (lead.followUp ?? '') ||
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
  }, [dirty, status, followUp, apptDate, apptWindow, installDate, value, material, install, deposit, payment, notes, tasks, quote])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div className="relative bg-off-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 bg-charcoal text-white px-4 py-3 flex items-center gap-3 z-10">
          <button onClick={handleClose} aria-label="Close" className="text-2xl leading-none">×</button>
          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{lead.name || '(no name)'}</p>
            <p className="text-white/60 text-[11px] truncate">{[lead.date, lead.product].filter(Boolean).join(' · ')}</p>
          </div>
          <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STAGE_STYLE[normalize(lead.status)]}`}>
            {normalize(lead.status)}
          </span>
        </div>

        <div className="p-4 space-y-4 flex-1">
          {/* Quick contact */}
          <div className="grid grid-cols-3 gap-2">
            <a href={hasPhone ? `tel:${phone}` : undefined}
              className={`text-center rounded-lg py-2.5 text-sm font-semibold ${hasPhone ? 'bg-gold text-white' : 'bg-stone-100 text-stone-400 pointer-events-none'}`}>📞 Call</a>
            <a href={hasPhone ? `sms:${phone}` : undefined}
              className={`text-center rounded-lg py-2.5 text-sm font-semibold ${hasPhone ? 'bg-white border border-stone-300 text-charcoal' : 'bg-stone-100 text-stone-400 pointer-events-none'}`}>💬 Text</a>
            <a href={lead.email ? `mailto:${lead.email}` : undefined}
              className={`text-center rounded-lg py-2.5 text-sm font-semibold ${lead.email ? 'bg-white border border-stone-300 text-charcoal' : 'bg-stone-100 text-stone-400 pointer-events-none'}`}>✉️ Email</a>
          </div>
          <div className="text-sm text-warm-grey space-y-0.5">
            {hasPhone && <p>📞 {phone}</p>}
            {lead.email && <p className="break-all">✉️ {lead.email}</p>}
            {lead.address && (
              <p>
                <MapLink address={lead.address} className="text-gold underline" />
                <span className="text-warm-grey"> — tap for directions</span>
              </p>
            )}
            {lead.source && (
              <p className="pt-1">
                <span className="inline-block text-[11px] font-semibold text-charcoal bg-stone-100 rounded-full px-2 py-0.5">
                  🔗 {lead.source}
                </span>
              </p>
            )}
          </div>

          {/* Pipeline */}
          <div className="bg-white rounded-xl border border-stone-100 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Pipeline</p>
            <label className="block text-xs text-warm-grey">Stage
              <select value={status} onChange={(e) => setStatus(e.target.value as Stage)} className={`${fieldCls} w-full mt-1`}>
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>

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
                <select value={apptWindow} onChange={(e) => setApptWindow(e.target.value)} className={`${fieldCls} w-full`}>
                  <option value="">Time window…</option>
                  {APPT_WINDOWS.map((w) => <option key={w} value={w}>{w}</option>)}
                  {apptWindow && !APPT_WINDOWS.includes(apptWindow) && <option value={apptWindow}>{apptWindow}</option>}
                </select>
              </div>
              {apptDate && (
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-[11px] text-emerald-700">📅 {fmtApptDate(apptDate)}{apptWindow ? ` · ${apptWindow}` : ''}</p>
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
          <div className="bg-white rounded-xl border border-stone-100 p-4">
            <button type="button" onClick={() => setTodoOpen((o) => !o)} className="w-full flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-warm-grey">To-do</span>
              <span className="text-sm text-charcoal">
                {tasks.length ? `${tasks.length} active` : 'None'}
                {installDate ? ` · 🔧 ${fmtApptDate(installDate)}` : ''}
                <span className="text-stone-400 ml-1">{todoOpen ? '▲' : '▼'}</span>
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
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          on ? 'bg-gold text-white border-gold' : 'bg-white text-charcoal border-stone-200'
                        }`}
                      >
                        {on ? '✓ ' : ''}{t.icon} {t.label}
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
                    <p className="text-[11px] text-emerald-700">🔧 Install {fmtApptDate(installDate)}</p>
                    <button type="button" onClick={() => setInstallDate('')} className="text-[11px] text-warm-grey underline">
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quote builder */}
          <div className="bg-white rounded-xl border border-stone-100 p-4 space-y-3">
            <button type="button" onClick={() => setQuoteOpen((o) => !o)} className="w-full flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Quote</span>
              <span className="text-sm font-semibold text-charcoal">
                {quote.items.length ? dollars(qTotals.total) : 'Build a quote'}
                <span className="text-stone-400 ml-1">{quoteOpen ? '▲' : '▼'}</span>
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
                          <button type="button" onClick={() => removeQuoteItem(i)} aria-label="Remove" className="shrink-0 w-9 text-stone-400 hover:text-red-600 text-lg">✕</button>
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
          <div className="bg-white rounded-xl border border-stone-100 p-4 space-y-3">
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
                <strong>{dollars(grossProfit)}</strong>
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
                <strong className="text-charcoal">{dollars(balanceDue)}</strong>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className={`rounded-xl border p-4 ${status === 'Completed' && !reviewAsked ? 'bg-gold/5 border-gold/40' : 'bg-white border-stone-100'}`}>
            <button type="button" onClick={() => setReviewOpen((o) => !o)} className="w-full flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Review</span>
              <span className="text-sm text-charcoal">
                {reviewAsked ? '✓ Requested' : 'Request'}
                <span className="text-stone-400 ml-1">{reviewOpen ? '▲' : '▼'}</span>
              </span>
            </button>
            {reviewOpen && (
            <div className="mt-3 space-y-2">
            {reviewAsked ? (
              <p className="text-sm text-emerald-700">✓ Review requested · {fmtApptDate(reviewAsked)}</p>
            ) : status === 'Completed' ? (
              <p className="text-sm text-charcoal">Job&apos;s done — ask for a Google review in one tap. ⭐</p>
            ) : (
              <p className="text-sm text-warm-grey">Once the job&apos;s complete, request a Google review here.</p>
            )}
            {hasPhone || lead.email ? (
              <div className="flex gap-2">
                {hasPhone && (
                  <a
                    href={smsHref(phone, reviewMessage(lead.name))}
                    onClick={onAskReview}
                    className="flex-1 text-center rounded-lg py-2.5 text-sm font-semibold bg-gold text-white"
                  >
                    ⭐ Text review link
                  </a>
                )}
                {lead.email && (
                  <a
                    href={mailtoHref(lead.email, 'A quick review for Atlas Rug & Design Centre?', reviewMessage(lead.name))}
                    onClick={onAskReview}
                    className={`${hasPhone ? 'flex-none px-4' : 'flex-1'} text-center rounded-lg py-2.5 text-sm font-semibold bg-white border border-stone-300 text-charcoal`}
                  >
                    ✉️ Email
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

        {/* Sticky save */}
        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3">
          {saving ? (
            <span className="text-warm-grey text-xs">Saving…</span>
          ) : saved ? (
            <span className="text-emerald-600 text-sm">Saved ✓</span>
          ) : (
            <span className="text-warm-grey text-xs">{dirty ? 'Autosaving…' : 'All changes saved'}</span>
          )}
          <button onClick={save} disabled={saving}
            className="bg-gold text-white font-semibold px-6 py-2.5 rounded hover:bg-gold-dark transition-colors disabled:opacity-50">
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
    <div className="bg-white rounded-xl border border-stone-100 p-4">
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

function ReportsView({ leads }: { leads: Lead[] }) {
  const [period, setPeriod] = useState<'month' | 'all'>('month')
  const [askedCount, setAskedCount] = useState(0)
  useEffect(() => {
    setAskedCount(Object.keys(readAsked()).length)
  }, [])

  const thisMonth = toISO(new Date()).slice(0, 7)
  const scoped = useMemo(
    () => (period === 'all' ? leads : leads.filter((l) => monthKey(l.date) === thisMonth)),
    [leads, period, thisMonth]
  )

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

  const completed = scoped.filter((l) => normalize(l.status) === 'Completed').length

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

      <GroupTable title="By source" col="Source" rows={bySource} />
      <GroupTable title="By product" col="Product" rows={byProduct} />

      <div className="bg-white rounded-xl border border-stone-100 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey mb-1">Reviews</p>
        <p className="text-sm text-charcoal">
          {completed} completed {completed === 1 ? 'job' : 'jobs'} this period · {askedCount} review {askedCount === 1 ? 'request' : 'requests'} sent
        </p>
        <p className="text-[11px] text-warm-grey mt-1">
          Open a completed job to text its Google review link. (Counted on this device.)
        </p>
      </div>
    </div>
  )
}

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
        body: JSON.stringify({ name, phone, email, address, product, message: notes }),
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
          <button onClick={onClose} aria-label="Close" className="text-2xl leading-none">×</button>
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
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <p className="text-[11px] text-warm-grey">Starts as a <strong>New</strong> lead. Open it to book an appointment.</p>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-end gap-3">
          <button onClick={onClose} className="text-sm text-warm-grey px-3 py-2.5">Cancel</button>
          <button onClick={save} disabled={saving || !canSave}
            className="bg-gold text-white font-semibold px-6 py-2.5 rounded hover:bg-gold-dark transition-colors disabled:opacity-50">
            {saving ? 'Adding…' : 'Add lead'}
          </button>
        </div>
      </div>
    </div>
  )
}
