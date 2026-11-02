'use client'

import { useState, useRef } from 'react'
import LeadForm from './LeadForm'

/*
 * Carpet Instant Estimate — a short guided quiz that ends by showing all three
 * price tiers at once (no upfront material choice). Plain language throughout.
 *
 * MATERIAL:  Stock $4–5.50 (12ft roll) · Nylon/Poly $5–9 (12ft) · Wool $9–13 (13ft)
 * ROOMS: ordered by the roll (lower-waste drop method), summed per area.
 * STAIRS: one style for the steps + how many; optional angled steps / landings.
 *   Straight/Runner/Open = roll-cut (20" each, N across by width). Wrapped = 8 sq ft each.
 *   Angled = 12 sq ft + $75/step · Landing = 16 sq ft + $100/step. 10% waste.
 * SHARED: pad $1–2/sf · removal $1/sf (if existing) · install $2/sf + per-step labour,
 *   $500 labour floor · runner binding max($200, steps×$200/12). Prices before HST.
 */

const MATERIALS = {
  stock: { label: 'Stock', sub: 'In-stock — great value', low: 4, high: 5.5, roll: 12, lead: 'Shortest wait' },
  nylon: { label: 'Nylon / Polyester', sub: 'Tough & family-friendly', low: 5, high: 9, roll: 12, lead: '2–4 week lead time' },
  wool: { label: 'Wool', sub: 'Premium — natural & luxurious', low: 9, high: 13, roll: 13, lead: '2–4 week lead time' },
} as const
type MaterialKey = keyof typeof MATERIALS
const MATERIAL_KEYS = Object.keys(MATERIALS) as MaterialKey[]

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

type Mode = 'room' | 'stairs' | 'both' | null

export default function CarpetEstimator() {
  const [mode, setMode] = useState<Mode>(null)
  const [stepIndex, setStepIndex] = useState(0)

  const roomId = useRef(1)
  const [rooms, setRooms] = useState<RoomItem[]>([{ id: 0, name: '', length: '', width: '' }])
  const [roomExisting, setRoomExisting] = useState(true)

  const [stairStyle, setStairStyle] = useState<StyleKey>('box')
  const [stepCount, setStepCount] = useState('')
  const [stairSize, setStairSize] = useState<SizeKey>('medium')
  const [hasSpecial, setHasSpecial] = useState(false)
  const [pieCount, setPieCount] = useState('')
  const [landingCount, setLandingCount] = useState('')
  const [stairsExisting, setStairsExisting] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [selectedTier, setSelectedTier] = useState<MaterialKey | null>(null)

  const includeRoom = mode === 'room' || mode === 'both'
  const includeStairs = mode === 'stairs' || mode === 'both'
  const style = MAIN_STYLES.find((s) => s.key === stairStyle)!

  const flow: string[] = [
    'what',
    ...(includeRoom ? ['rooms'] : []),
    ...(includeStairs ? ['stairs'] : []),
    'result',
  ]
  const current = flow[Math.min(stepIndex, flow.length - 1)]

  // ---- inputs that don't depend on material ----
  const nSteps = includeStairs ? toInt(stepCount) : 0
  const nPie = includeStairs && hasSpecial ? toInt(pieCount) : 0
  const nLanding = includeStairs && hasSpecial ? toInt(landingCount) : 0
  const validRooms = rooms.filter((x) => (parseFloat(x.length) || 0) > 0 && (parseFloat(x.width) || 0) > 0)
  const stairsHave = nSteps > 0 || nPie > 0 || nLanding > 0

  // ---- estimate for one material tier ----
  function estimateFor(matKey: MaterialKey) {
    const mat = MATERIALS[matKey]

    let roomSqft = 0
    let roomOrdered = 0
    if (includeRoom) {
      for (const r of validRooms) {
        const L = parseFloat(r.length) || 0
        const W = parseFloat(r.width) || 0
        roomSqft += L * W
        const a = Math.ceil(W / mat.roll) * mat.roll * L
        const b = Math.ceil(L / mat.roll) * mat.roll * W
        roomOrdered += Math.min(a, b)
      }
    }

    let stairRaw = 0
    if (nSteps > 0) {
      if ('fixedSqft' in style && style.fixedSqft) stairRaw += nSteps * style.fixedSqft
      else stairRaw += mat.roll * (STEP_LEN_IN / 12) * Math.ceil(nSteps / ACROSS[stairSize])
    }
    stairRaw += nPie * 12 + nLanding * 16
    const stairSqft = stairRaw * STAIR_WASTE

    const carpetLow = (roomOrdered + stairSqft) * mat.low
    const carpetHigh = (roomOrdered + stairSqft) * mat.high
    const padLow = (roomSqft + stairSqft) * PAD_LOW
    const padHigh = (roomSqft + stairSqft) * PAD_HIGH
    const removal =
      (includeRoom && roomExisting ? roomSqft * REMOVAL : 0) +
      (includeStairs && stairsExisting ? stairSqft * REMOVAL : 0)
    const perStep = nSteps * style.labour + nPie * 75 + nLanding * 100
    const labourCore = (roomSqft + stairSqft) * INSTALL + perStep
    const labour = labourCore > 0 ? Math.max(LABOUR_MIN, labourCore) : 0
    const binding = stairStyle === 'runner' && nSteps > 0 ? Math.max(BINDING_MIN, nSteps * BINDING_PER) : 0

    return {
      low: carpetLow + padLow + removal + labour + binding,
      high: carpetHigh + padHigh + removal + labour + binding,
      hasRemoval: removal > 0,
      hasBinding: binding > 0,
    }
  }

  const results = current === 'result' ? MATERIAL_KEYS.map((k) => ({ key: k, ...estimateFor(k) })) : []

  // ---- navigation ----
  const canAdvance =
    (current === 'what' && mode !== null) ||
    (current === 'rooms' && validRooms.length > 0) ||
    (current === 'stairs' && stairsHave) ||
    current === 'result'
  const nextIsResult = flow[stepIndex + 1] === 'result'
  const back = () => setStepIndex((i) => Math.max(0, i - 1))
  const next = () => setStepIndex((i) => Math.min(flow.length - 1, i + 1))

  // ---- room helpers ----
  const addRoom = (name = '', length = '', width = '') =>
    setRooms((r) => [...r, { id: roomId.current++, name, length, width }])
  const updateRoom = (id: number, field: 'name' | 'length' | 'width', value: string) =>
    setRooms((r) => r.map((x) => (x.id === id ? { ...x, [field]: value } : x)))
  const removeRoom = (id: number) =>
    setRooms((r) => (r.length === 1 ? r : r.filter((x) => x.id !== id)))

  const book = (tier: MaterialKey) => {
    setSelectedTier(tier)
    setShowForm(true)
  }

  const estimateSummary = (() => {
    const parts: string[] = []
    if (includeRoom && validRooms.length)
      parts.push(`Rooms: ${validRooms.map((x) => `${x.name || 'Area'} ${x.length}×${x.width}`).join(', ')}${roomExisting ? ' (remove existing)' : ''}`)
    if (includeStairs && stairsHave) {
      const bits: string[] = []
      if (nSteps > 0) bits.push(`${nSteps} ${style.label}`)
      if (nPie > 0) bits.push(`${nPie} angled`)
      if (nLanding > 0) bits.push(`${nLanding} landing`)
      parts.push(`Stairs: ${bits.join(', ')}${stairsExisting ? ' (remove existing)' : ''}`)
    }
    if (results.length)
      parts.push(
        'Prices +HST — ' +
          results.map((r) => `${MATERIALS[r.key].label}: ${fmt(r.low)}–${fmt(r.high)}`).join(' · ')
      )
    if (selectedTier) parts.push(`Leaning toward: ${MATERIALS[selectedTier].label}`)
    return parts.join('\n')
  })()

  const numInput =
    'w-full border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold'
  const bigOption = (active: boolean) =>
    `rounded-2xl border-2 p-5 text-center transition-colors ${
      active ? 'border-gold bg-gold/5' : 'border-stone-200 hover:border-gold/50'
    }`

  const progress = Math.round(((stepIndex + 1) / flow.length) * 100)

  return (
    <div className="font-lato max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-warm-grey mb-1.5">
          <span>Step {stepIndex + 1} of {flow.length}</span>
          <span>{current === 'result' ? 'Your prices' : 'Quick & free'}</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* ---- Step: what ---- */}
      {current === 'what' && (
        <div>
          <h3 className="font-playfair text-2xl text-charcoal mb-1 text-center">What needs carpet?</h3>
          <p className="text-warm-grey text-sm text-center mb-6">Pick one to get started.</p>
          <div className="grid grid-cols-3 gap-3">
            <button type="button" onClick={() => setMode('room')} className={bigOption(mode === 'room')}>
              <div className="text-3xl mb-2">🏠</div>
              <p className="font-semibold text-charcoal text-sm">A room</p>
            </button>
            <button type="button" onClick={() => setMode('stairs')} className={bigOption(mode === 'stairs')}>
              <div className="text-3xl mb-2">🪜</div>
              <p className="font-semibold text-charcoal text-sm">Stairs</p>
            </button>
            <button type="button" onClick={() => setMode('both')} className={bigOption(mode === 'both')}>
              <div className="text-3xl mb-2">🏠🪜</div>
              <p className="font-semibold text-charcoal text-sm">Both</p>
            </button>
          </div>
        </div>
      )}

      {/* ---- Step: rooms ---- */}
      {current === 'rooms' && (
        <div>
          <h3 className="font-playfair text-2xl text-charcoal mb-1">Tell us about your rooms</h3>
          <p className="text-warm-grey text-sm mb-5">
            Add each room. Don&apos;t know the exact size? A rough guess is fine — we measure for real, free.
          </p>
          <div className="space-y-2">
            {rooms.map((r, i) => (
              <div key={r.id} className="flex items-center gap-2">
                <input value={r.name} onChange={(e) => updateRoom(r.id, 'name', e.target.value)}
                  placeholder={`Room ${i + 1}`} aria-label={`Area ${i + 1} name`}
                  className="w-24 sm:w-32 border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                <input inputMode="decimal" value={r.length} onChange={(e) => updateRoom(r.id, 'length', e.target.value)}
                  placeholder="Length (ft)" aria-label={`Area ${i + 1} length`}
                  className="flex-1 min-w-0 border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                <span className="text-warm-grey">×</span>
                <input inputMode="decimal" value={r.width} onChange={(e) => updateRoom(r.id, 'width', e.target.value)}
                  placeholder="Width (ft)" aria-label={`Area ${i + 1} width`}
                  className="flex-1 min-w-0 border border-stone-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                <button type="button" aria-label="Remove room" onClick={() => removeRoom(r.id)} disabled={rooms.length === 1}
                  className="text-warm-grey hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed text-xl leading-none px-1">×</button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {ROOM_PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => addRoom(p.label, String(p.l), String(p.w))}
                className="px-3 py-1.5 rounded-full border border-stone-200 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors">
                + {p.label}
              </button>
            ))}
            <button type="button" onClick={() => addRoom()}
              className="px-3 py-1.5 rounded-full border border-dashed border-stone-300 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors">
              + Add another room
            </button>
          </div>
          <label className="flex items-center gap-2 mt-4 text-sm text-charcoal cursor-pointer">
            <input type="checkbox" checked={roomExisting} onChange={(e) => setRoomExisting(e.target.checked)} className="accent-gold w-4 h-4" />
            There&apos;s old carpet to take away
          </label>
        </div>
      )}

      {/* ---- Step: stairs ---- */}
      {current === 'stairs' && (
        <div>
          <h3 className="font-playfair text-2xl text-charcoal mb-1">Tell us about your stairs</h3>
          <p className="text-warm-grey text-sm mb-5">
            Not sure? Take your best guess — we confirm everything free when we measure.
          </p>

          <label className="block mb-4">
            <span className="block text-sm font-semibold text-charcoal mb-1">How many steps?</span>
            <input inputMode="numeric" value={stepCount} onChange={(e) => setStepCount(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 13" aria-label="Number of steps" className={`${numInput} max-w-[8rem]`} />
          </label>

          <p className="text-sm font-semibold text-charcoal mb-2">What do your stairs look like?</p>
          <div className="space-y-2 mb-4">
            {MAIN_STYLES.map((s) => (
              <button key={s.key} type="button" onClick={() => setStairStyle(s.key)}
                className={`w-full text-left rounded-lg border p-3 transition-colors ${
                  stairStyle === s.key ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-stone-200 hover:border-gold/50'
                }`}>
                <span className="font-semibold text-charcoal text-sm">{s.label}</span>
                <span className="block text-warm-grey text-xs mt-0.5">{s.hint}</span>
              </button>
            ))}
          </div>

          {stairStyle !== 'capping' && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-charcoal mb-1">How wide are the stairs?</p>
              <p className="text-warm-grey text-xs mb-2">Most homes are &quot;Standard.&quot; Not sure? Leave it.</p>
              <div className="grid grid-cols-3 gap-2">
                {SIZE_OPTIONS.map((s) => (
                  <button key={s.key} type="button" onClick={() => setStairSize(s.key)}
                    className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${
                      stairSize === s.key ? 'border-gold bg-gold/5 text-charcoal ring-1 ring-gold' : 'border-stone-200 text-warm-grey hover:border-gold/50'
                    }`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer mb-2">
            <input type="checkbox" checked={hasSpecial} onChange={(e) => setHasSpecial(e.target.checked)} className="accent-gold w-4 h-4" />
            My stairs have angled steps or a flat landing
          </label>
          {hasSpecial && (
            <div className="space-y-3 pl-6 mb-2">
              <div>
                <label className="block text-sm text-charcoal mb-1">Angled steps <span className="text-warm-grey text-xs">(wedge-shaped, on a turn)</span></label>
                <input inputMode="numeric" value={pieCount} onChange={(e) => setPieCount(e.target.value.replace(/\D/g, ''))}
                  placeholder="0" aria-label="Angled steps" className={`${numInput} max-w-[6rem]`} />
              </div>
              <div>
                <label className="block text-sm text-charcoal mb-1">Landings <span className="text-warm-grey text-xs">(flat platform between stairs)</span></label>
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

      {/* ---- Step: result ---- */}
      {current === 'result' && (
        <div>
          <h3 className="font-playfair text-2xl text-charcoal mb-1 text-center">Your estimate</h3>
          <p className="text-warm-grey text-sm text-center mb-6">
            Three ways to do it. Pick the one that fits — we confirm the exact price at your free measure.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {results.map((r) => {
              const popular = r.key === 'stock'
              return (
                <div key={r.key}
                  className={`relative rounded-2xl border p-5 flex flex-col ${popular ? 'border-gold ring-1 ring-gold shadow-sm' : 'border-stone-200'}`}>
                  {popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
                      Most popular
                    </span>
                  )}
                  <p className="font-playfair text-lg text-charcoal">{MATERIALS[r.key].label}</p>
                  <p className="text-warm-grey text-xs mb-3 leading-snug min-h-[2.4em]">{MATERIALS[r.key].sub}</p>
                  <p className="font-playfair text-2xl text-charcoal leading-tight">{fmt(r.low)}</p>
                  <p className="text-warm-grey text-xs">to {fmt(r.high)} · +HST</p>
                  <p className={`text-xs mt-1 mb-3 ${r.key === 'stock' ? 'text-gold font-semibold' : 'text-warm-grey'}`}>⏱ {MATERIALS[r.key].lead}</p>
                  <button type="button" onClick={() => book(r.key)}
                    className={`mt-auto w-full font-semibold py-2.5 rounded text-sm transition-colors ${
                      popular ? 'bg-gold text-white hover:bg-gold-dark' : 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                    }`}>
                    Book free measure
                  </button>
                </div>
              )
            })}
          </div>

          {/* Includes */}
          <div className="mt-6 rounded-2xl bg-off-white border border-stone-100 p-5">
            <p className="text-charcoal text-xs font-semibold uppercase tracking-wide mb-2">Every option includes</p>
            <ul className="grid sm:grid-cols-2 gap-1.5 text-sm">
              <li className="flex items-center gap-2 text-gold font-semibold"><span>🛡️</span>Lifetime labour warranty</li>
              <li className="flex items-center gap-2 text-charcoal"><span className="text-gold">✓</span>Underpad</li>
              <li className="flex items-center gap-2 text-charcoal"><span className="text-gold">✓</span>Professional installation</li>
              {results[0]?.hasRemoval && <li className="flex items-center gap-2 text-charcoal"><span className="text-gold">✓</span>Taking away your old carpet</li>}
              {results[0]?.hasBinding && <li className="flex items-center gap-2 text-charcoal"><span className="text-gold">✓</span>Runner edge binding</li>}
            </ul>
            <p className="text-warm-grey text-xs mt-3">This is a ballpark. We give you the exact price at your free in-home measure — no pressure.</p>
          </div>

          {showForm && (
            <div className="mt-6">
              <div className="rounded-xl bg-white border border-stone-200 p-4 mb-4 text-sm text-charcoal whitespace-pre-line">
                {estimateSummary}
              </div>
              <LeadForm
                product="Carpet — Instant Estimate"
                source="Carpet Estimator"
                heading="Book your free measure"
                subheading="We'll confirm your price at home. No obligation."
                details={estimateSummary}
              />
            </div>
          )}
        </div>
      )}

      {/* ---- Nav ---- */}
      <div className="flex items-center justify-between mt-8">
        {stepIndex > 0 ? (
          <button type="button" onClick={back} className="text-warm-grey hover:text-charcoal text-sm font-semibold">
            ← Back
          </button>
        ) : <span />}
        {current !== 'result' && (
          <button type="button" onClick={next} disabled={!canAdvance}
            className="bg-gold text-white font-semibold px-7 py-3 rounded hover:bg-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {nextIsResult ? 'See my prices →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}
