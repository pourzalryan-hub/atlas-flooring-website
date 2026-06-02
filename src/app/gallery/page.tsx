// Replace placeholder items with real photos — see pages/gallery.md for image sourcing instructions

'use client'

import { useState } from 'react'
import CTABanner from '@/components/CTABanner'

// SEO metadata: title "Flooring Gallery Toronto | Our Work | Atlas Rug & Design Centre"
// (Add to a server layout.tsx since this is a client component)

type Category = 'All' | 'Hardwood' | 'Carpet' | 'Luxury Vinyl' | 'Laminate' | 'Stair Runners' | 'Before & After'

const TABS: Category[] = ['All', 'Hardwood', 'Carpet', 'Luxury Vinyl', 'Laminate', 'Stair Runners', 'Before & After']

interface GalleryItem {
  id: number
  category: Exclude<Category, 'All' | 'Before & After'>
  label: string
  color: string
}

const galleryItems: GalleryItem[] = [
  { id: 1,  category: 'Hardwood',     label: 'Forest Hill — White Oak Hardwood',         color: 'bg-amber-100' },
  { id: 2,  category: 'Hardwood',     label: 'Rosedale — Dark Walnut Hardwood',           color: 'bg-stone-300' },
  { id: 3,  category: 'Hardwood',     label: 'Lawrence Park — Natural Maple',             color: 'bg-amber-200' },
  { id: 4,  category: 'Carpet',       label: 'North York — Plush Broadloom Living Room',  color: 'bg-neutral-300' },
  { id: 5,  category: 'Carpet',       label: 'Etobicoke — Berber Carpet Basement',        color: 'bg-stone-200' },
  { id: 6,  category: 'Carpet',       label: 'Mississauga — Cut Pile Bedroom Suite',      color: 'bg-zinc-300' },
  { id: 7,  category: 'Luxury Vinyl', label: 'The Annex — LVP Open-Plan Kitchen',         color: 'bg-stone-300' },
  { id: 8,  category: 'Luxury Vinyl', label: 'Scarborough — Waterproof LVP Basement',     color: 'bg-amber-100' },
  { id: 9,  category: 'Luxury Vinyl', label: 'Vaughan — LVP Throughout Main Floor',       color: 'bg-neutral-200' },
  { id: 10, category: 'Laminate',     label: 'Markham — Wide-Plank Laminate',             color: 'bg-stone-200' },
  { id: 11, category: 'Laminate',     label: 'Richmond Hill — Laminate Family Room',      color: 'bg-amber-200' },
  { id: 12, category: 'Laminate',     label: 'Thornhill — Light Laminate Open Concept',   color: 'bg-zinc-200' },
  { id: 13, category: 'Stair Runners',label: 'Midtown Toronto — Herringbone Wool Runner', color: 'bg-neutral-300' },
  { id: 14, category: 'Stair Runners',label: 'Leaside — Classic Pattern Stair Runner',    color: 'bg-stone-300' },
  { id: 15, category: 'Stair Runners',label: 'Forest Hill — Navy Bordered Runner',        color: 'bg-amber-100' },
  { id: 16, category: 'Hardwood',     label: 'East York — Chevron White Oak',             color: 'bg-stone-200' },
  { id: 17, category: 'Carpet',       label: 'Oakville — Luxury Carpet Master Bedroom',   color: 'bg-zinc-300' },
  { id: 18, category: 'Luxury Vinyl', label: 'Brampton — Commercial-Grade LVP Office',    color: 'bg-amber-200' },
]

const beforeAfterItems = [
  {
    caption: 'Dated carpet replaced with engineered white oak — Midtown Toronto',
    beforeLabel: 'Before: 1990s Carpet',
    afterLabel: 'After: White Oak Hardwood',
  },
  {
    caption: 'Vinyl tile upgraded to LVP throughout — Etobicoke bungalow',
    beforeLabel: 'Before: Vinyl Tile',
    afterLabel: 'After: Luxury Vinyl Plank',
  },
  {
    caption: 'Pine stairs transformed with a custom wool stair runner — Rosedale',
    beforeLabel: 'Before: Bare Pine Stairs',
    afterLabel: 'After: Wool Stair Runner',
  },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Category>('All')

  const filtered =
    activeTab === 'All' || activeTab === 'Before & After'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab)

  const showBeforeAfter = activeTab === 'All' || activeTab === 'Before & After'
  const showGrid = activeTab !== 'Before & After'

  return (
    <main>
      {/* 1. Hero */}
      <section className="flex items-center justify-center bg-charcoal" style={{ minHeight: '40vh' }}>
        <div className="text-center px-4">
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-4">Our Work, Your Inspiration</h1>
          <p className="font-lato text-lg text-stone-300 max-w-xl mx-auto">
            Real installs from real Toronto homes.
          </p>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="bg-white border-b border-stone-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-4 font-lato font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-gold text-gold'
                    : 'border-transparent text-warm-grey hover:text-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Gallery Grid */}
      {showGrid && (
        <section className="py-20 bg-off-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square relative">
                    <div className={`w-full h-full ${item.color} flex items-end`}>
                      <span className="text-stone-500 text-xs font-lato p-2">Image: {item.label}</span>
                    </div>
                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-charcoal/80 text-white font-lato text-xs px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="font-lato font-semibold text-charcoal text-sm">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Before & After Section */}
      {showBeforeAfter && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">BEFORE & AFTER</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-charcoal">
                Transformations That Speak for Themselves
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {beforeAfterItems.map((item) => (
                <div key={item.caption} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Before / After halves */}
                  <div className="flex h-56">
                    <div className="w-1/2 bg-stone-400 flex flex-col items-center justify-end pb-3">
                      <span className="bg-black/50 text-white font-lato text-xs px-2 py-1 rounded">
                        {item.beforeLabel}
                      </span>
                    </div>
                    <div className="w-1/2 bg-amber-100 flex flex-col items-center justify-end pb-3">
                      <span className="bg-gold/80 text-white font-lato text-xs px-2 py-1 rounded">
                        {item.afterLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-lato text-sm text-warm-grey">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA Banner */}
      <CTABanner
        title="Like What You See?"
        subtitle="Visit our showroom at 978 Bathurst St or book a free in-home consultation."
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCta={{ label: 'Get Directions', href: 'https://www.google.com/maps/search/?api=1&query=978+Bathurst+St+Toronto+ON+M5R+3G6' }}
      />
    </main>
  )
}
