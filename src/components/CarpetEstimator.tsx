'use client'

import { useState } from 'react'
import LeadForm from './LeadForm'

/*
 * Carpet Instant Estimate — pricing engine (all numbers provided by Atlas).
 *
 * MATERIAL (installed estimate is built from these):
 *   Stock  $4–5.50 /sq ft   (12 ft roll)
 *   Nylon  $5–12   /sq ft   (12 ft roll)
 *   Wool   $9–13   /sq ft   (13 ft roll)
 *
 * ROOMS (broadloom): ordered by the roll, not raw sq ft. We lay full-width
 *   "drops" and pick the lower-waste orientation:
 *     ordered = min( ceil(W/roll)*roll*L , ceil(L/roll)*roll*W )
 *   Carpet is charged on `ordered`; pad / removal / install labour on the
 *   actual room sq ft (L*W).
 *
 * STAIRS:
 *   Regular steps (box/runner/floating/live-edge) are cut from a 12 ft roll,
 *   20" of length each, N across by width size (small≤24"=6, med≤36"=4,
 *   large≤48"=3):  rows = ceil(count / across);  sqft = 20 * rows.
 *   Special steps carry a fixed footprint: capping 8, pie 12, landing 16 sq ft.
 *   Everything gets a 10% waste buffer. Carpet/pad/dispose charged on that area.
 *
 * SHARED:
 *   Pad $1–2/sq ft · Lift & dispose $1/sq ft (if existing carpet, separate) ·
 *   Install labour $2/sq ft PLUS per-step prices, with a $500 labour floor for
 *   the whole job (dispose + binding are separate from the floor) ·
 *   Runner binding max($200, runnerSteps * $200/12).
 */

const MATERIALS = {
  stock: { label: 'Stock', sub: 'Budget-friendly', low: 4, high: 5.5, roll: 12 },
  nylon: { label: 'Nylon / Polyester', sub: 'Most popular', low: 5, high: 9, roll: 12 },
  wool: { label: 'Wool', sub: 'Premium', low: 9, high: 13, roll: 13 },
} as const
type MaterialKey = keyof typeof MATERIALS

const PAD_LOW = 1
const PAD_HIGH = 2
const REMOVAL = 1
const INSTALL = 2
const LABOUR_MIN = 500
const STAIR_WASTE = 1.1
const STEP_LEN_IN = 20

const ACROSS = { small: 6, medium: 4, large: 3 } as const
type SizeKey = keyof typeof ACROSS
const SIZE_LABEL: Record<SizeKey, string> = {
  small: 'Small (≤24″ wide)',
  medium: 'Medium (24–36″)',
  large: 'Large (36–48″)',
}

// Regular steps = roll-cut by size. Special steps = fixed footprint (sq ft).
const STEP_TYPES = [
  { key: 'box', label: 'Straight box', labour: 20, special: 0 },
  { key: 'runner', label: 'Runner', labour: 25, special: 0 },
  { key: 'floating', label: 'Floating', labour: 60, special: 0 },
  { key: 'capping', label: 'Capping', labour: 50, special: 8 },
  { key: 'pie', label: 'Pie / winder', labour: 75, special: 12 },
  { key: 'landing', label: 'Landing', labour: 100, special: 16 },
] as const
type StepKey = (typeof STEP_TYPES)[number]['key']

const BINDING_MIN = 200
const BINDING_PER = 200 / 12

const ROOM_PRESETS = [
  { label: 'Bedroom', l: 10, w: 12 },
  { label: 'Living room', l: 15, w: 20 },
  { label: 'Basement', l: 20, w: 30 },
]

const emptyCounts: Record<StepKey, number> = {
  box: 0, runner: 0, floating: 0, capping: 0, pie: 0, landing: 0,
}

function fmt(n: number) {
  return '$' + (Math.round(n / 10) * 10).toLocaleString('en-US')
}

export default function CarpetEstimator() {
  const [material, setMaterial] = useState<MaterialKey>('nylon')

  const [includeRoom, setIncludeRoom] = useState(true)
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [roomExisting, setRoomExisting] = useState(true)

  const [includeStairs, setIncludeStairs] = useState(false)
  const [stairSize, setStairSize] = useState<SizeKey>('medium')
  const [counts, setCounts] = useState<Record<StepKey, number>>(emptyCounts)
  const [stairsExisting, setStairsExisting] = useState(true)

  const [showForm, setShowForm] = useState(false)

  const mat = MATERIALS[material]

  // ---- Room ----
  const L = parseFloat(length) || 0
  const W = parseFloat(width) || 0
  const roomSqft = includeRoom ? L * W : 0
  let roomOrdered = 0
  if (roomSqft > 0) {
    const a = Math.ceil(W / mat.roll) * mat.roll * L
    const b = Math.ceil(L / mat.roll) * mat.roll * W
    roomOrdered = Math.min(a, b)
  }
  const roomCarpetLow = roomOrdered * mat.low
  const roomCarpetHigh = roomOrdered * mat.high
  const roomPadLow = roomSqft * PAD_LOW
  const roomPadHigh = roomSqft * PAD_HIGH
  const roomRemoval = includeRoom && roomExisting ? roomSqft * REMOVAL : 0
  const roomInstall = roomSqft * INSTALL

  // ---- Stairs ----
  const regularCount = includeStairs
    ? STEP_TYPES.filter((s) => s.special === 0).reduce((n, s) => n + counts[s.key], 0)
    : 0
  const regularRows = regularCount > 0 ? Math.ceil(regularCount / ACROSS[stairSize]) : 0
  const regularSqft = mat.roll * (STEP_LEN_IN / 12) * regularRows // roll width (12 nylon/stock, 13 wool) × rows × 20″
  const specialSqft = includeStairs
    ? STEP_TYPES.reduce((sf, s) => sf + s.special * counts[s.key], 0)
    : 0
  const stairSqft = (regularSqft + specialSqft) * STAIR_WASTE

  const stairCarpetLow = stairSqft * mat.low
  const stairCarpetHigh = stairSqft * mat.high
  const stairPadLow = stairSqft * PAD_LOW
  const stairPadHigh = stairSqft * PAD_HIGH
  const stairDispose = includeStairs && stairsExisting ? stairSqft * REMOVAL : 0
  const stairPerStep = includeStairs
    ? STEP_TYPES.reduce((l, s) => l + s.labour * counts[s.key], 0)
    : 0
  const stairInstall = stairSqft * INSTALL
  const binding = includeStairs && counts.runner > 0
    ? Math.max(BINDING_MIN, counts.runner * BINDING_PER)
    : 0

  // ---- Combine ----
  const labourCore = roomInstall + stairInstall + stairPerStep
  const labour = labourCore > 0 ? Math.max(LABOUR_MIN, labourCore) : 0
  const removal = roomRemoval + stairDispose
  const carpetLow = roomCarpetLow + stairCarpetLow
  const carpetHigh = roomCarpetHigh + stairCarpetHigh
  const padLow = roomPadLow + stairPadLow
  const padHigh = roomPadHigh + stairPadHigh

  const totalLow = carpetLow + padLow + removal + labour + binding
  const totalHigh = carpetHigh + padHigh + removal + labour + binding

  const hasEstimate =
    (includeRoom && roomSqft > 0) ||
    (includeStairs && regularCount + specialSqft > 0)

  const setCount = (key: StepKey, v: number) =>
    setCounts((c) => ({ ...c, [key]: Math.max(0, v) }))

  const estimateSummary = (() => {
    const parts: string[] = []
    parts.push(`Material: ${mat.label}`)
    if (includeRoom && roomSqft > 0)
      parts.push(`Room: ${L}×${W} ft (${roomSqft} sq ft, ${Math.round(roomOrdered)} sq ft ordered)${roomExisting ? ', remove existing' : ''}`)
    if (includeStairs) {
      const steps = STEP_TYPES.filter((s) => counts[s.key] > 0).map((s) => `${counts[s.key]} ${s.label}`)
      if (steps.length) parts.push(`Stairs (${SIZE_LABEL[stairSize]}): ${steps.join(', ')}${stairsExisting ? ', remove existing' : ''}`)
    }
    parts.push(`Estimated: ${fmt(totalLow)} – ${fmt(totalHigh)}`)
    return parts.join('\n')
  })()

  const chip = (active: boolean) =>
    `rounded-xl border p-4 text-left transition-colors ${
      active ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-stone-200 hover:border-gold/50'
    }`

  return (
    <div className="font-lato">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* ---- Inputs ---- */}
        <div className="lg:col-span-3 space-y-8">
          {/* Material */}
          <div>
            <h3 className="font-playfair text-xl text-charcoal mb-3">1. Choose your carpet</h3>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(MATERIALS) as MaterialKey[]).map((k) => (
                <button key={k} type="button" onClick={() => setMaterial(k)} className={chip(material === k)}>
                  <p className="font-semibold text-charcoal text-sm">{MATERIALS[k].label}</p>
                  <p className="text-warm-grey text-xs mt-0.5">{MATERIALS[k].sub}</p>
                  <p className="text-gold text-xs font-semibold mt-1">${MATERIALS[k].low}–{MATERIALS[k].high}/sq ft</p>
                </button>
              ))}
            </div>
          </div>

          {/* What are you carpeting */}
          <div>
            <h3 className="font-playfair text-xl text-charcoal mb-3">2. What are you carpeting?</h3>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setIncludeRoom((v) => !v)} className={chip(includeRoom)}>
                <p className="font-semibold text-charcoal text-sm">🏠 A room / area</p>
                <p className="text-warm-grey text-xs mt-0.5">Broadloom, wall-to-wall</p>
              </button>
              <button type="button" onClick={() => setIncludeStairs((v) => !v)} className={chip(includeStairs)}>
                <p className="font-semibold text-charcoal text-sm">🪜 Stairs</p>
                <p className="text-warm-grey text-xs mt-0.5">Box, runner, capping…</p>
              </button>
            </div>
          </div>

          {/* Room inputs */}
          {includeRoom && (
            <div className="rounded-2xl border border-stone-200 p-5">
              <h4 className="font-semibold text-charcoal mb-3">Room size</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {ROOM_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => { setLength(String(p.l)); setWidth(String(p.w)) }}
                    className="px-3 py-1.5 rounded-full border border-stone-200 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors"
                  >
                    {p.label} ({p.l}×{p.w})
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-3">
                <label className="flex-1">
                  <span className="block text-sm font-semibold text-charcoal mb-1">Length (ft)</span>
                  <input inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="15" />
                </label>
                <span className="pb-3 text-warm-grey">×</span>
                <label className="flex-1">
                  <span className="block text-sm font-semibold text-charcoal mb-1">Width (ft)</span>
                  <input inputMode="decimal" value={width} onChange={(e) => setWidth(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="20" />
                </label>
              </div>
              <label className="flex items-center gap-2 mt-4 text-sm text-charcoal cursor-pointer">
                <input type="checkbox" checked={roomExisting} onChange={(e) => setRoomExisting(e.target.checked)} className="accent-gold w-4 h-4" />
                Remove &amp; dispose existing carpet
              </label>
            </div>
          )}

          {/* Stairs inputs */}
          {includeStairs && (
            <div className="rounded-2xl border border-stone-200 p-5">
              <h4 className="font-semibold text-charcoal mb-3">Stairs</h4>
              <p className="text-sm font-semibold text-charcoal mb-2">Step width</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(Object.keys(ACROSS) as SizeKey[]).map((s) => (
                  <button key={s} type="button" onClick={() => setStairSize(s)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${stairSize === s ? 'border-gold bg-gold/5 text-charcoal ring-1 ring-gold' : 'border-stone-200 text-warm-grey hover:border-gold/50'}`}>
                    {SIZE_LABEL[s]}
                  </button>
                ))}
              </div>
              <p className="text-sm font-semibold text-charcoal mb-2">How many of each?</p>
              <div className="space-y-2">
                {STEP_TYPES.map((s) => (
                  <div key={s.key} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-charcoal">{s.label}{s.key === 'runner' && <span className="text-warm-grey text-xs"> (incl. edge binding)</span>}</span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setCount(s.key, counts[s.key] - 1)}
                        className="w-7 h-7 rounded-full border border-stone-300 text-charcoal leading-none hover:border-gold">−</button>
                      <span className="w-6 text-center text-sm font-semibold">{counts[s.key]}</span>
                      <button type="button" onClick={() => setCount(s.key, counts[s.key] + 1)}
                        className="w-7 h-7 rounded-full border border-stone-300 text-charcoal leading-none hover:border-gold">+</button>
                    </div>
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 mt-4 text-sm text-charcoal cursor-pointer">
                <input type="checkbox" checked={stairsExisting} onChange={(e) => setStairsExisting(e.target.checked)} className="accent-gold w-4 h-4" />
                Remove &amp; dispose existing stair carpet
              </label>
            </div>
          )}
        </div>

        {/* ---- Estimate ---- */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-charcoal text-white p-6 lg:sticky lg:top-24">
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.15em] mb-2">Your estimate</p>
            {hasEstimate ? (
              <>
                <p className="font-playfair text-3xl md:text-4xl mb-1">{fmt(totalLow)} – {fmt(totalHigh)}</p>
                <p className="text-white/60 text-sm mb-5">installed · before HST</p>

                <div className="border-t border-white/15 pt-4">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-2">Includes</p>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center gap-2 text-gold font-semibold"><span>🛡️</span>Lifetime labour warranty</li>
                    <li className="flex items-center gap-2"><span className="text-gold">✓</span>{mat.label} carpet</li>
                    <li className="flex items-center gap-2"><span className="text-gold">✓</span>Underpad</li>
                    <li className="flex items-center gap-2"><span className="text-gold">✓</span>Professional installation</li>
                    {removal > 0 && <li className="flex items-center gap-2"><span className="text-gold">✓</span>Old carpet removal &amp; disposal</li>}
                    {binding > 0 && <li className="flex items-center gap-2"><span className="text-gold">✓</span>Runner edge binding</li>}
                  </ul>
                </div>

                <p className="text-white/50 text-xs mt-4 leading-relaxed">
                  Ballpark only — your exact price is confirmed at your free in-home measure.
                </p>

                {!showForm ? (
                  <button type="button" onClick={() => setShowForm(true)}
                    className="w-full mt-5 bg-gold text-white font-semibold py-3.5 rounded hover:bg-gold-dark transition-colors">
                    Lock in this estimate — book your free measure →
                  </button>
                ) : null}
              </>
            ) : (
              <p className="text-white/70 text-sm py-8 text-center">
                Pick a carpet and add a room or stairs to see your instant estimate.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lead capture */}
      {showForm && hasEstimate && (
        <div className="mt-8 max-w-xl mx-auto">
          <div className="rounded-xl bg-off-white border border-stone-200 p-4 mb-4 text-sm text-charcoal whitespace-pre-line">
            {estimateSummary}
          </div>
          <LeadForm
            product="Carpet — Instant Estimate"
            source="Carpet Estimator"
            heading="Book your free measure"
            subheading="We'll confirm this estimate on-site. No obligation."
            details={estimateSummary}
          />
        </div>
      )}
    </div>
  )
}