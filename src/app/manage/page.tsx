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
  notes: string
}

const STAGES = ['New', 'Contacted', 'Quoted', 'Booked', 'Completed', 'Lost'] as const
type Stage = (typeof STAGES)[number]

// Treat blank / legacy "Lead" status as "New".
const normalize = (s: string): Stage => {
  const v = (s || '').trim().toLowerCase()
  if (!v || v === 'lead' || v === 'new') return 'New'
  const hit = STAGES.find((x) => x.toLowerCase() === v)
  return (hit as Stage) || 'New'
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
      setLeads(Array.isArray(json.leads) ? json.leads : [])
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
    const thisMonth = leads.filter((l) => {
      const d = new Date(l.date)
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    }).length
    const open = leads.filter((l) => ['Quoted', 'Booked'].includes(normalize(l.status)))
    const pipelineValue = open.reduce((sum, l) => {
      const n = parseFloat(String(l.value).replace(/[^0-9.]/g, ''))
      return sum + (Number.isFinite(n) ? n : 0)
    }, 0)
    return { total: leads.length, thisMonth, openCount: open.length, pipelineValue }
  }, [leads])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return leads
      .filter((l) => filter === 'All' || normalize(l.status) === filter)
      .filter(
        (l) =>
          !q ||
          `${l.name} ${l.phone} ${l.email} ${l.product}`.toLowerCase().includes(q)
      )
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
          <button
            onClick={load}
            className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Stat label="Total leads" value={String(stats.total)} />
          <Stat label="New this month" value={String(stats.thisMonth)} />
          <Stat label="Quoted + booked" value={String(stats.openCount)} />
          <Stat label="Pipeline value" value={stats.pipelineValue > 0 ? '$' + stats.pipelineValue.toLocaleString('en-US') : '—'} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(['All', ...STAGES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                filter === s
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'bg-white text-charcoal border-stone-200 hover:border-gold'
              }`}
            >
              {s} <span className="text-xs opacity-60">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, email…"
          className="w-full mb-5 border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />

        {loading && <p className="text-warm-grey text-sm py-10 text-center">Loading…</p>}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 p-4">
      <p className="text-warm-grey text-xs">{label}</p>
      <p className="font-playfair text-2xl text-charcoal mt-1">{value}</p>
    </div>
  )
}

function LeadCard({ lead, onSaved }: { lead: Lead; onSaved: (row: number, patch: Partial<Lead>) => void }) {
  const [status, setStatus] = useState<Stage>(normalize(lead.status))
  const [value, setValue] = useState(String(lead.value ?? ''))
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const dirty = status !== normalize(lead.status) || value !== String(lead.value ?? '') || notes !== (lead.notes ?? '')

  const save = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/manage/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ row: lead.row, status, value, notes }),
      })
      const json = await res.json()
      if (!json?.ok) throw new Error(json?.error || 'Save failed')
      onSaved(lead.row, { status, value, notes })
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

      <div className="grid sm:grid-cols-[auto_1fr] gap-3 mt-4 items-start">
        <div className="flex gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Stage)}
            className="border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="decimal"
            placeholder="Job $"
            className="w-24 border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Notes…"
          className="w-full border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

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
