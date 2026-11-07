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

const STAGES = ['New', 'Contacted', 'Quoted', 'Booked', 'Completed', 'Lost'] as const
type Stage = (typeof STAGES)[number]

const normalize = (s: string): Stage => {
  const v = (s || '').trim().toLowerCase()
  if (!v || v === 'lead' || v === 'new') return 'New'
  const hit = STAGES.find((x) => x.toLowerCase() === v)
  return (hit as Stage) || 'New'
}

const num = (v: string | number) => {
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}
const dollars = (n: number) => (n ? '$' + Math.round(n).toLocaleString('en-US') : '—')

// Keep only real leads — skip legend/test/junk rows (e.g. a row where every
// cell says "WON"). A real lead has a real date, a phone with digits, or an email.
const isRealLead = (l: Lead) => {
  const validDate = /\d{4}/.test(String(l.date)) && !isNaN(new Date(l.date).getTime())
  const hasPhone = /\d/.test(String(l.phone ?? ''))
  const hasEmail = /@/.test(String(l.email ?? ''))
  return validDate || hasPhone || hasEmail
}

const STAGE_STYLE: Record<Stage, string> = {
  New: 'bg-blue-100 text-blue-800',
  Contacted: 'bg-purple-100 text-purple-800',
  Quoted: 'bg-amber-100 text-amber-800',
  Booked: 'bg-emerald-100 text-emerald-800',
  Completed: 'bg-stone-200 text-stone-700',
  Lost: 'bg-red-100 text-red-700',
}

export default function ManagePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'All' | Stage>('All')
  const [search, setSearch] = useState('')

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

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: leads.length }
    STAGES.forEach((s) => (c[s] = 0))
    leads.forEach((l) => (c[normalize(l.status)] += 1))
    return c
  }, [leads])

  const stats = useMemo(() => {
    const now = new Date()
    const isThisMonth = (d: string) => {
      const dt = new Date(d)
      return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth()
    }
    const newThisMonth = leads.filter((l) => normalize(l.status) === 'New' && isThisMonth(l.date)).length
    const toFollowUp = leads.filter((l) => normalize(l.status) === 'Quoted').length
    const booked = leads.filter((l) => ['Booked', 'Completed'].includes(normalize(l.status))).length
    const pipelineValue = leads
      .filter((l) => ['Quoted', 'Booked'].includes(normalize(l.status)))
      .reduce((s, l) => s + num(l.value), 0)
    return { newThisMonth, toFollowUp, booked, pipelineValue }
  }, [leads])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return leads
      .filter((l) => filter === 'All' || normalize(l.status) === filter)
      .filter((l) => !q || `${l.name} ${l.phone} ${l.email} ${l.product} ${l.address}`.toLowerCase().includes(q))
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [leads, filter, search])

  const onSaved = (row: number, patch: Partial<Lead>) =>
    setLeads((ls) => ls.map((l) => (l.row === row ? { ...l, ...patch } : l)))

  return (
    <main className="min-h-screen bg-off-white font-lato">
      <header className="bg-charcoal text-white px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-playfair text-2xl">Lead Manager</h1>
            <p className="text-white/60 text-xs">Atlas Rug &amp; Design Centre</p>
          </div>
          <button onClick={load} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors">
            ↻ Refresh
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Stat label="New this month" value={String(stats.newThisMonth)} />
          <Stat label="To follow up" value={String(stats.toFollowUp)} hint="Quoted" />
          <Stat label="Booked + done" value={String(stats.booked)} />
          <Stat label="Pipeline value" value={dollars(stats.pipelineValue)} hint="quoted + booked" />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {(['All', ...STAGES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                filter === s ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-stone-200 hover:border-gold'
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
          className="w-full mb-5 border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />

        {loading && <p className="text-warm-grey text-sm py-10 text-center">Loading…</p>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>}
        {!loading && !error && visible.length === 0 && (
          <p className="text-warm-grey text-sm py-10 text-center">No leads here yet.</p>
        )}

        <div className="space-y-3">
          {visible.map((l) => (
            <LeadCard key={l.row} lead={l} onSaved={onSaved} />
          ))}
        </div>
      </div>
    </main>
  )
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 p-4">
      <p className="text-warm-grey text-xs">{label}</p>
      <p className="font-playfair text-2xl text-charcoal mt-1">{value}</p>
      {hint && <p className="text-warm-grey text-[11px] mt-0.5">{hint}</p>}
    </div>
  )
}

const fieldCls = 'border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold'

function LeadCard({ lead, onSaved }: { lead: Lead; onSaved: (row: number, patch: Partial<Lead>) => void }) {
  const [status, setStatus] = useState<Stage>(normalize(lead.status))
  const [followUp, setFollowUp] = useState(lead.followUp ?? '')
  const [bookedDate, setBookedDate] = useState(lead.bookedDate ?? '')
  const [value, setValue] = useState(String(lead.value ?? ''))
  const [material, setMaterial] = useState(String(lead.material ?? ''))
  const [install, setInstall] = useState(String(lead.install ?? ''))
  const [deposit, setDeposit] = useState(String(lead.deposit ?? ''))
  const [payment, setPayment] = useState(lead.payment ?? '')
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const grossProfit = num(value) - num(material) - num(install)
  const balanceDue = num(value) - num(deposit)

  const dirty =
    status !== normalize(lead.status) ||
    followUp !== (lead.followUp ?? '') ||
    bookedDate !== (lead.bookedDate ?? '') ||
    value !== String(lead.value ?? '') ||
    material !== String(lead.material ?? '') ||
    install !== String(lead.install ?? '') ||
    deposit !== String(lead.deposit ?? '') ||
    payment !== (lead.payment ?? '') ||
    notes !== (lead.notes ?? '')

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
    <div className="bg-white rounded-xl border border-stone-100 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-charcoal">{lead.name || '(no name)'}</p>
          <p className="text-warm-grey text-xs">
            {lead.date}
            {lead.product ? ` · ${lead.product}` : ''}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="text-gold font-medium hover:underline">
                📞 {lead.phone}
              </a>
            )}
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="text-gold font-medium hover:underline break-all">
                ✉️ {lead.email}
              </a>
            )}
          </div>
          {lead.address && <p className="text-warm-grey text-xs mt-1">📍 {lead.address}</p>}
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${STAGE_STYLE[normalize(lead.status)]}`}>
          {normalize(lead.status)}
        </span>
      </div>

      {/* Pipeline + follow-up (the daily stuff) */}
      <div className="grid sm:grid-cols-3 gap-2 mt-4">
        <label className="text-xs text-warm-grey">
          Stage
          <select value={status} onChange={(e) => setStatus(e.target.value as Stage)} className={`${fieldCls} w-full mt-1`}>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-warm-grey">
          Next follow-up
          <input value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="e.g. Nov 20" className={`${fieldCls} w-full mt-1`} />
        </label>
        <label className="text-xs text-warm-grey">
          Job value
          <input value={value} onChange={(e) => setValue(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
        </label>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="Notes…"
        className={`${fieldCls} w-full mt-2`}
      />

      {/* Job money (tucked away) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm text-gold font-medium mt-3 hover:underline"
      >
        {open ? '− Hide job costs' : '+ Job costs & payment'}
      </button>
      {open && (
        <div className="mt-3 rounded-lg bg-off-white border border-stone-100 p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <label className="text-xs text-warm-grey">
              Material cost
              <input value={material} onChange={(e) => setMaterial(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
            </label>
            <label className="text-xs text-warm-grey">
              Install / labour
              <input value={install} onChange={(e) => setInstall(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
            </label>
            <label className="text-xs text-warm-grey">
              Deposit
              <input value={deposit} onChange={(e) => setDeposit(e.target.value)} inputMode="decimal" placeholder="$" className={`${fieldCls} w-full mt-1`} />
            </label>
            <label className="text-xs text-warm-grey">
              Payment method
              <input value={payment} onChange={(e) => setPayment(e.target.value)} placeholder="e.g. e-transfer" className={`${fieldCls} w-full mt-1`} />
            </label>
            <label className="text-xs text-warm-grey">
              Job booked date
              <input value={bookedDate} onChange={(e) => setBookedDate(e.target.value)} placeholder="e.g. Nov 23" className={`${fieldCls} w-full mt-1`} />
            </label>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm">
            <span className="text-warm-grey">
              Gross profit: <strong className="text-charcoal">{dollars(grossProfit)}</strong>
            </span>
            <span className="text-warm-grey">
              Balance due: <strong className="text-charcoal">{dollars(balanceDue)}</strong>
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 mt-3">
        {saved && <span className="text-emerald-600 text-sm">Saved ✓</span>}
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="bg-gold text-white text-sm font-semibold px-5 py-2 rounded hover:bg-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}
