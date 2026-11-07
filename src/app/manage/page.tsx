'use client'

import { useEffect, useMemo, useState } from 'react'

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
}

const STAGES = ['New', 'Appointment', 'Booked', 'Completed', 'Lost'] as const
type Stage = (typeof STAGES)[number]

// Map older / free-text statuses onto the current stages so nothing is lost.
const STAGE_ALIASES: Record<string, Stage> = {
  '': 'New', lead: 'New', new: 'New',
  contacted: 'Appointment', quoted: 'Appointment', quote: 'Appointment',
  appt: 'Appointment', appointment: 'Appointment', measure: 'Appointment', consult: 'Appointment',
  booked: 'Booked', won: 'Booked', sold: 'Booked', deposit: 'Booked',
  completed: 'Completed', complete: 'Completed', done: 'Completed', installed: 'Completed', paid: 'Completed',
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

const monthKey = (d: string) => (/\d{4}-\d{2}/.test(String(d)) ? String(d).slice(0, 7) : 'other')
const monthLabel = (k: string) => {
  if (k === 'other') return 'Older / undated'
  const dt = new Date(k + '-01T00:00:00')
  return isNaN(dt.getTime()) ? k : dt.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

const isRealLead = (l: Lead) => {
  const validDate = /\d{4}/.test(String(l.date)) && !isNaN(new Date(l.date).getTime())
  return validDate || /\d/.test(String(l.phone ?? '')) || /@/.test(String(l.email ?? ''))
}

const STAGE_STYLE: Record<Stage, string> = {
  New: 'bg-blue-100 text-blue-800',
  Appointment: 'bg-amber-100 text-amber-800',
  Booked: 'bg-emerald-100 text-emerald-800',
  Completed: 'bg-stone-200 text-stone-700',
  Lost: 'bg-red-100 text-red-700',
}

const fieldCls = 'border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold'

export default function ManagePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'All' | Stage>('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [month, setMonth] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/manage/api/leads', { cache: 'no-store' })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Could not load')
      const all: Lead[] = Array.isArray(json.leads) ? json.leads : []
      setLeads(all.filter(isRealLead))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load leads')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    load()
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

  // Short label for the period the stat cards describe (follows the Month filter).
  const periodShort = !month || month === 'all' ? 'all time' : monthLabel(month).replace(/ \d{4}$/, '')

  const stats = useMemo(() => {
    const inStage = (s: Stage) => monthLeads.filter((l) => normalize(l.status) === s).length
    const revenue = monthLeads
      .filter((l) => ['Booked', 'Completed'].includes(normalize(l.status)))
      .reduce((sum, l) => sum + num(l.value), 0)
    return {
      revenue,
      newCount: inStage('New'),
      appointments: inStage('Appointment'),
      booked: inStage('Booked'),
    }
  }, [monthLeads])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return monthLeads
      .filter((l) => filter === 'All' || normalize(l.status) === filter)
      .filter((l) => !q || `${l.name} ${l.phone} ${l.email} ${l.product} ${l.address}`.toLowerCase().includes(q))
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [monthLeads, filter, search])

  const onSaved = (row: number, patch: Partial<Lead>) => {
    setLeads((ls) => ls.map((l) => (l.row === row ? { ...l, ...patch } : l)))
    setSelected((s) => (s && s.row === row ? { ...s, ...patch } : s))
  }

  return (
    <main className="min-h-screen bg-off-white font-lato">
      <header className="bg-charcoal text-white px-4 py-4 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-playfair text-xl">Lead Manager</h1>
            <p className="text-white/60 text-[11px]">Atlas Rug &amp; Design Centre</p>
          </div>
          <button onClick={load} className="text-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded transition-colors">
            ↻ Refresh
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          <Stat label={`Revenue · ${periodShort}`} value={dollars(stats.revenue)} highlight />
          <Stat label="New leads" value={String(stats.newCount)} />
          <Stat label="Appointments" value={String(stats.appointments)} />
          <Stat label="Booked" value={String(stats.booked)} />
        </div>

        {/* Month filter */}
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

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 -mx-1 px-1">
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
            <Row key={l.row} lead={l} onOpen={() => setSelected(l)} />
          ))}
        </div>
      </div>

      {selected && <Detail lead={selected} onClose={() => setSelected(null)} onSaved={onSaved} />}
    </main>
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

function Row({ lead, onOpen }: { lead: Lead; onOpen: () => void }) {
  const stage = normalize(lead.status)
  const sub = [
    lead.product || null,
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
        <p className="text-warm-grey text-xs mt-0.5 truncate">{sub || lead.date}</p>
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
  const [status, setStatus] = useState<Stage>(normalize(lead.status))
  const [followUp, setFollowUp] = useState(lead.followUp ?? '')
  const [bookedDate, setBookedDate] = useState(lead.bookedDate ?? '')
  const [value, setValue] = useState(String(lead.value ?? ''))
  const [material, setMaterial] = useState(String(lead.material ?? ''))
  const [install, setInstall] = useState(String(lead.install ?? ''))
  const [deposit, setDeposit] = useState(String(lead.deposit ?? ''))
  const [payment, setPayment] = useState(lead.payment ?? '')
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const grossProfit = num(value) - num(material) - num(install)
  const balanceDue = num(value) - num(deposit)
  const hasValue = num(value) > 0
  const hasCosts = num(material) > 0 || num(install) > 0
  const phone = String(lead.phone ?? '')
  const hasPhone = /\d/.test(phone)

  const save = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/manage/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: lead.row, status, followUp, bookedDate, value, material, install, deposit, payment, notes }),
      })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Save failed')
      onSaved(lead.row, { status, followUp, bookedDate, value, material, install, deposit, payment, notes })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      alert('Could not save — check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-off-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 bg-charcoal text-white px-4 py-3 flex items-center gap-3 z-10">
          <button onClick={onClose} aria-label="Close" className="text-2xl leading-none">×</button>
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
            {lead.address && <p>📍 {lead.address}</p>}
          </div>

          {/* Pipeline */}
          <div className="bg-white rounded-xl border border-stone-100 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-warm-grey">Pipeline</p>
            <label className="block text-xs text-warm-grey">Stage
              <select value={status} onChange={(e) => setStatus(e.target.value as Stage)} className={`${fieldCls} w-full mt-1`}>
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-warm-grey">Next follow-up
                <input value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="e.g. Nov 20" className={`${fieldCls} w-full mt-1`} />
              </label>
              <label className="block text-xs text-warm-grey">Job booked date
                <input value={bookedDate} onChange={(e) => setBookedDate(e.target.value)} placeholder="e.g. Nov 23" className={`${fieldCls} w-full mt-1`} />
              </label>
            </div>
            <label className="block text-xs text-warm-grey">Notes
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Notes…" className={`${fieldCls} w-full mt-1`} />
            </label>
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
        </div>

        {/* Sticky save */}
        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3">
          {saved ? <span className="text-emerald-600 text-sm">Saved ✓</span> : <span className="text-warm-grey text-xs">Edits save to your sheet</span>}
          <button onClick={save} disabled={saving}
            className="bg-gold text-white font-semibold px-6 py-2.5 rounded hover:bg-gold-dark transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
