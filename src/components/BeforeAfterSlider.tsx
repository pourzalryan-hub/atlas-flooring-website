'use client'

import { useRef, useState, useCallback } from 'react'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  caption?: string
  /** CSS aspect-ratio for the frame, e.g. "3 / 4" (default) or "4 / 3". */
  aspectRatio?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
  aspectRatio = '3 / 4',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [pos, setPos] = useState(50)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      /* no-op */
    }
    setFromClientX(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }

  const endDrag = (e: React.PointerEvent) => {
    dragging.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* no-op */
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(0, p - 4))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(100, p + 4))
    }
  }

  return (
    <figure className="w-full m-0">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative w-full overflow-hidden rounded-2xl shadow-lg select-none touch-pan-y cursor-ew-resize bg-stone-200"
        style={{ aspectRatio }}
      >
        {/* After image — the base layer (revealed on the right) */}
        <img
          src={afterSrc}
          alt={afterAlt}
          draggable={false}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover"
        />

        {/* Before image — clipped to the left portion */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        {/* Corner labels */}
        <span className="pointer-events-none absolute top-3 left-3 bg-charcoal/80 text-white text-xs font-lato font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 bg-gold text-white text-xs font-lato font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
          {afterLabel}
        </span>

        {/* Divider + grab handle */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_4px_rgba(0,0,0,0.4)]" />
          <div
            role="slider"
            aria-label="Drag to compare the carpet before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-charcoal">
              <path d="M11 7l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {caption && (
        <figcaption className="text-center text-sm text-warm-grey mt-3 font-lato">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
