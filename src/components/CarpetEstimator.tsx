'use client'

import { useState, useRef } from 'react'
import LeadForm from './LeadForm'

/*
 * Carpet Instant Estimate — pricing engine (numbers provided by Atlas).
 * Written to be understood by a first-time visitor: plain words, best-guess
 * inputs, and "we confirm free at the measure" reassurance throughout.
 *
 * MATERIAL:  Basic $4–5.50 (12ft roll) · Nylon/Poly $5–9 (12ft) · Wool $9–13 (13ft)
 * ROOMS: ordered by the roll (lower-waste drop method), summed per area.
 * STAIRS: pick one style for the steps + how many; optional angled steps / landings.
 *   Straight/Runner/Open = roll-cut (20" each, N across by width). Wrapped = 8 sq ft each.
 *   Angled (pie) = 12 sq ft + $75/step · Landing = 16 sq ft + $100/step. 10% waste.
 * SHARED: pad $1–2/sf · removal $1/sf (if existing) · install $2/sf + per-step labour,
 *   $500 labour floor · runner binding max($200, steps×$200/12). Prices before HST.
 */

const MATERIALS = {
  stock: { label: 'Stock', sub: 'In-stock — budget-friendly', low: 4, high: 5.5, roll: 12 },
  nylon: { label: 'Nylon / Polyester', sub: 'Most popular — tough & family-friendly', low: 5, high: 9, roll: 12 },
  wool: { label: 'Wool', sub: 'Premium — natural & luxurious', low: 9, high: 13, roll: 13 },
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
const SIZE_OPTIONS: { key: SizeKey; label: string }[] = [
  { key: 'small', label: 'Narrow' },
  { key: 'medium', label: 'Standard' },
  { key: 'large', label: 'Wide' },
]

// One style for the whole staircase. "fixedSqft" steps are cut individually;
// the rest are cut from the roll by width.
const MAIN_STYLES = [
  { key: 'box', label: 'Straight stairs', hint: 'The usual kind — carpet covers the whole step', labour: 20 },
  { key: 'runner', label: 'Runner', hint: 'A carpet strip down the middle, wood showing on the sides', labour: 25 },
  { key: 'capping', label: 'Wrapped', hint: 'Carpet wraps around and under each step edge', labour: 50, fixedSqft: 8 },
  { key: 'floating', label: 'Open steps', hint: 'Floating stairs with gaps you can see through', labour: 60 },
] as const
type StyleKey = (typeof MAIN_STYLES)[number]['key']

const BINDING_MIN = 200
const BINDING_PER = 200 / 12

type RoomItem = { id: number; name: string; length: string; width: string }

const ROOM_PRESETS = [
  { label: 'Bedroom', l: 10, w: 12 },
  { label: 'Living room', l: 15, w: 20 },
  { label: 'Basement', l: 20, w: 30 },
]

function fmt(n: number) {
  return '$' + (Math.round(n / 10) * 10).toLocaleString('en-US')
}
const toInt = (s: string) => {
  const n = parseInt(s, 10)
  return Number.isNaN(n) ? 0 : Math.max(0, n)
}

export default function CarpetEstimator() {
  const [material, setMaterial] = useState<MaterialKey>('nylon')

  const [includeRoom, setIncludeRoom] = useState(true)
  const roomId = useRef(1)
  const [rooms, setRooms] = useState<RoomItem[]>([{ id: 0, name: '', length: '', width: '' }])
  const [roomExisting, setRoomExisting] = useState(true)

  const [includeStairs, setIncludeStairs] = useState(false)
  const [stairStyle, setStairStyle] = useState<StyleKey>('box')
  const [stepCount, setStepCount] = useState('')
  const [stairSize, setStairSize] = useState<SizeKey>('medium')
  const [hasSpecial, setHasSpecial] = useState(false)
  const [pieCount, setPieCount] = useState('')
  const [landingCount, setLandingCount] = useState('')
  const [stairsExisting, setStairsExisting] = useState(true)

  const [showForm, setShowForm] = useState(false)

  const mat = MATERIALS[material]
  const style = MAIN_STYLES.find((s) => s.key === stairStyle)!

  // ---- Rooms / areas ----
  let roomSqft = 0
  let roomOrdered = 0
  if (includeRoom) {
    for (const r of rooms) {
      const L = parseFloat(r.length) || 0
      const W = parseFloat(r.width) || 0
      if (L > 0 && W > 0) {
        roomSqft += L * W
        const a = Math.ceil(W / mat.roll) * mat.roll * L
        const b = Math.ceil(L / mat.roll) * mat.roll * W
        roomOrdered += Math.min(a, b) // each area cut separately, own waste
      }
    }
  }
  const roomCarpetLow = roomOrdered * mat.low
  const roomCarpetHigh = roomOrdered * mat.high
  const roomPadLow = roomSqft * PAD_LOW
  const roomPadHigh = roomSqft * PAD_HIGH
  const roomRemoval = includeRoom && roomExisting ? roomSqft * REMOVAL : 0
  const roomInstall = roomSqft * INSTALL

  // ---- Stairs ----
  const nSteps = includeStairs ? toInt(stepCount) : 0
  const nPie = includeStairs && hasSpecial ? toInt(pieCount) : 0
  const nLanding = includeStairs && hasSpecial ? toInt(landingCount) : 0

  let stairRaw = 0
  if (nSteps > 0) {
    if ('fixedSqft' in style && style.fixedSqft) {
      stairRaw += nSteps * style.fixedSqft
    } else {
      const rows = Math.ceil(nSteps / ACROSS[stairSize])
      stairRaw += mat.roll * (STEP_LEN_IN / 12) * rows
    }
  }
  stairRaw += nPie * 12 + nLanding * 16
  const stairSqft = stairRaw * STAIR_WASTE

  const stairCarpetLow = stairSqft * mat.low
  const stairCarpetHigh = stairSqft * mat.high
  const stairPadLow = stairSqft * PAD_LOW
  const stairPadHigh = stairSqft * PAD_HIGH
  const stairDispose = includeStairs && stairsExisting ? stairSqft * REMOVAL : 0
  const stairPerStep = nSteps * style.labour + nPie * 75 + nLanding * 100
  const stairInstall = stairSqft * INSTALL
  const binding = stairStyle === 'runner' && nSteps > 0 ? Math.max(BINDING_MIN, nSteps * BINDING_PER) : 0

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

  const stairsHave = nSteps > 0 || nPie > 0 || nLanding > 0
  const hasEstimate = (includeRoom && roomSqft > 0) || (includeStairs && stairsHave)

  const addRoom = (name = '', length = '', width = '') =>
    setRooms((r) => [...r, { id: roomId.current++, name, length, width }])
  const updateRoom = (id: number, field: 'name' | 'length' | 'width', value: string) =>
    setRooms((r) => r.map((x) => (x.id === id ? { ...x, [field]: value } : x)))
  const removeRoom = (id: number) =>
    setRooms((r) => (r.length === 1 ? r : r.filter((x) => x.id !== id)))

  const estimateSummary = (() => {
    const parts: string[] = [`Carpet: ${mat.label}`]
    if (includeRoom) {
      const list = rooms
        .filter((x) => (parseFloat(x.length) || 0) > 0 && (parseFloat(x.width) || 0) > 0)
        .map((x) => `${x.name || 'Area'} ${x.length}×${x.width}`)
      if (list.length)
        parts.push(`Rooms: ${list.join(', ')} (${roomSqft} sq ft total)${roomExisting ? ', remove existing' : ''}`)
    }
    if (includeStairs && stairsHave) {
      const bits: string[] = []
      if (nSteps > 0) bits.push(`${nSteps} ${style.label}`)
      if (nPie > 0) bits.push(`${nPie} angled`)
      if (nLanding > 0) bits.push(`${nLanding} landing`)
      parts.push(`Stairs: ${bits.join(', ')}${stairsExisting ? ', remove existing' : ''}`)
    }
    parts.push(`Estimated: ${fmt(totalLow)} – ${fmt(totalHigh)} (before HST)`)
    return parts.join('\n')
  })()

  const chip = (active: boolean) =>
    `rounded-xl border p-4 text-left transition-colors ${
      active ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-stone-200 hover:border-gold/50'
    }`

  const numInput =
    'w-full border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold'

  return (
    <div className="font-lato">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* ---- Inputs ---- */}
        <div className="lg:col-span-3 space-y-8">
          {/* Material */}
          <div>
            <h3 className="font-playfair text-xl text-charcoal mb-3">1. Pick your carpet</h3>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(MATERIALS) as MaterialKey[]).map((k) => (
                <button key={k} type="button" onClick={() => setMaterial(k)} className={chip(material === k)}>
                  <p className="font-semibold text-charcoal text-sm">{MATERIALS[k].label}</p>
                  <p className="text-warm-grey text-xs mt-0.5 leading-snug">{MATERIALS[k].sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* What are you carpeting */}
          <div>
            <h3 className="font-playfair text-xl text-charcoal mb-3">2. What needs carpet?</h3>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setIncludeRoom((v) => !v)} className={chip(includeRoom)}>
                <p className="font-semibold text-charcoal text-sm">🏠 A room</p>
                <p className="text-warm-grey text-xs mt-0.5">Wall-to-wall carpet</p>
              </button>
              <button type="button" onClick={() => setIncludeStairs((v) => !v)} className={chip(includeStairs)}>
                <p className="font-semibold text-charcoal text-sm">🪜 Stairs</p>
                <p className="text-warm-grey text-xs mt-0.5">Any staircase</p>
              </button>
            </div>
            <p className="text-warm-grey text-xs mt-2">Tap one or both. You can change it anytime.</p>
          </div>

          {/* Rooms */}
          {includeRoom && (
            <div className="rounded-2xl border border-stone-200 p-5">
              <h4 className="font-semibold text-charcoal mb-1">Your rooms</h4>
              <p className="text-warm-grey text-xs mb-3">
                Add each room. Don&apos;t know the exact size? A rough guess is fine — we measure for real,
                free.
              </p>
              <div className="space-y-2">
                {rooms.map((r, i) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <input
                      value={r.name}
                      onChange={(e) => updateRoom(r.id, 'name', e.target.value)}
                      placeholder={`Room ${i + 1}`}
                      aria-label={`Area ${i + 1} name`}
                      className="w-24 sm:w-32 border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      inputMode="decimal"
                      value={r.length}
                      onChange={(e) => updateRoom(r.id, 'length', e.target.value)}
                      placeholder="Length (ft)"
                      aria-label={`Area ${i + 1} length`}
                      className="flex-1 min-w-0 border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <span className="text-warm-grey">×</span>
                    <input
                      inputMode="decimal"
                      value={r.width}
                      onChange={(e) => updateRoom(r.id, 'width', e.target.value)}
                      placeholder="Width (ft)"
                      aria-label={`Area ${i + 1} width`}
                      className="flex-1 min-w-0 border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <button
                      type="button"
                      aria-label="Remove room"
                      onClick={() => removeRoom(r.id)}
                      disabled={rooms.length === 1}
                      className="text-warm-grey hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed text-xl leading-none px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {ROOM_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => addRoom(p.label, String(p.l), String(p.w))}
                    className="px-3 py-1.5 rounded-full border border-stone-200 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors"
                  >
                    + {p.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => addRoom()}
                  className="px-3 py-1.5 rounded-full border border-dashed border-stone-300 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors"
                >
                  + Add another room
                </button>
              </div>
              <label className="flex items-center gap-2 mt-4 text-sm text-charcoal cursor-pointer">
                <input type="checkbox" checked={roomExisting} onChange={(e) => setRoomExisting(e.target.checked)} className="accent-gold w-4 h-4" />
                There&apos;s old carpet to take away
              </label>
            </div>
          )}

          {/* Stairs */}
          {includeStairs && (
            <div className="rounded-2xl border border-stone-200 p-5">
              <h4 className="font-semibold text-charcoal mb-1">Your stairs</h4>
              <p className="text-warm-grey text-xs mb-4">
                Not sure about these? Take your best guess — we confirm everything free when we measure.
              </p>

              {/* How many steps */}
              <label className="block mb-4">
                <span className="block text-sm font-semibold text-charcoal mb-1">How many steps?</span>
                <input
                  inputMode="numeric"
                  value={stepCount}
                  onChange={(e) => setStepCount(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 13"
                  aria-label="Number of steps"
                  className={`${numInput} max-w-[8rem]`}
                />
              </label>

              {/* Style */}
              <p className="text-sm font-semibold text-charcoal mb-2">What do your stairs look like?</p>
              <div className="space-y-2 mb-4">
                {MAIN_STYLES.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStairStyle(s.key)}
                    className={`w-full text-left rounded-lg border p-3 transition-colors ${
                      stairStyle === s.key ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-stone-200 hover:border-gold/50'
                    }`}
                  >
                    <span className="font-semibold text-charcoal text-sm">{s.label}</span>
                    <span className="block text-warm-grey text-xs mt-0.5">{s.hint}</span>
                  </button>
                ))}
              </div>

              {/* Width — only matters when cut from the roll */}
              {stairStyle !== 'capping' && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-charcoal mb-1">How wide are the stairs?</p>
                  <p className="text-warm-grey text-xs mb-2">Most homes are &quot;Standard.&quot; Not sure? Leave it.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZE_OPTIONS.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setStairSize(s.key)}
                        className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${
                          stairSize === s.key ? 'border-gold bg-gold/5 text-charcoal ring-1 ring-gold' : 'border-stone-200 text-warm-grey hover:border-gold/50'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special steps (optional) */}
              <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer mb-2">
                <input type="checkbox" checked={hasSpecial} onChange={(e) => setHasSpecial(e.target.checked)} className="accent-gold w-4 h-4" />
                My stairs have angled steps or a flat landing
              </label>
              {hasSpecial && (
                <div className="space-y-3 pl-6 mb-2">
                  <div>
                    <label className="block text-sm text-charcoal mb-1">
                      Angled steps <span className="text-warm-grey text-xs">(wedge-shaped, on a turn)</span>
                    </label>
                    <input inputMode="numeric" value={pieCount} onChange={(e) => setPieCount(e.target.value.replace(/\D/g, ''))}
                      placeholder="0" aria-label="Angled steps" className={`${numInput} max-w-[6rem]`} />
                  </div>
                  <div>
                    <label className="block text-sm text-charcoal mb-1">
                      Landings <span className="text-warm-grey text-xs">(flat platform between stairs)</span>
                    </label>
                    <input inputMode="numeric" value={landingCount} onChange={(e) => setLandingCount(e.target.value.replace(/\D/g, ''))}
                      placeholder="0" aria-label="Landings" className={`${numInput} max-w-[6rem]`} />
                  </div>
                </div>
              )}

              <label className="flex items-center gap-2 mt-3 text-sm text-charcoal cursor-pointer">
                <input type="checkbox" checked={stairsExisting} onChange={(e) => setStairsExisting(e.target.checked)} className="accent-gold w-4 h-4" />
                There&apos;s old carpet to take away
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
                    {removal > 0 && <li className="flex items-center gap-2"><span className="text-gold">✓</span>Taking away your old carpet</li>}
                    {binding > 0 && <li className="flex items-center gap-2"><span className="text-gold">✓</span>Runner edge binding</li>}
                  </ul>
                </div>

                <p className="text-white/50 text-xs mt-4 leading-relaxed">
                  This is a ballpark. We give you the exact price at your free in-home measure — no pressure.
                </p>

                {!showForm && (
                  <button type="button" onClick={() => setShowForm(true)}
                    className="w-full mt-5 bg-gold text-white font-semibold py-3.5 rounded hover:bg-gold-dark transition-colors">
                    Book my free measure →
                  </button>
                )}
              </>
            ) : (
              <p className="text-white/70 text-sm py-8 text-center">
                Pick a carpet and tell us about your room or stairs to see your price.
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
            subheading="We'll confirm this price at your home. No obligation."
            details={estimateSummary}
          />
        </div>
      )}
    </div>
  )
}
