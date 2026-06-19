'use client'

import { useState } from 'react'
import Image from 'next/image'
import CTABanner from '@/components/CTABanner'

type Category = 'All' | 'Hardwood' | 'Carpet' | 'Luxury Vinyl' | 'Laminate' | 'Stair Runners' | 'Refinishing'

const TABS: Category[] = ['All', 'Hardwood', 'Carpet', 'Luxury Vinyl', 'Laminate', 'Stair Runners', 'Refinishing']

interface GalleryItem {
  id: number
  category: Exclude<Category, 'All'>
  label: string
  image: string
}

const galleryItems: GalleryItem[] = [
  // Stair Runners
  { id: 1,  category: 'Stair Runners', label: 'Patterned Runner — Forest Hill',       image: '/images/project-stair-runner-forest-hill.jpg' },
  { id: 2,  category: 'Stair Runners', label: 'Classic Runner — Rosedale',             image: '/images/project-stair-runner-rosedale.jpeg' },
  { id: 3,  category: 'Stair Runners', label: 'Herringbone Wool — Yorkville',          image: '/images/project-stair-runner-yorkville.jpg' },
  { id: 4,  category: 'Stair Runners', label: 'Striped Wool — High Park',              image: '/images/project-stair-runner-high-park.png' },
  { id: 5,  category: 'Stair Runners', label: 'Geometric Pattern — The Annex',         image: '/images/project-stair-runner-annex.jpg' },
  { id: 6,  category: 'Stair Runners', label: 'Solid Nylon — Etobicoke',               image: '/images/project-stair-runner-etobicoke.jpg' },
  { id: 7,  category: 'Stair Runners', label: 'Persian-Inspired — Midtown',            image: '/images/project-stair-runner-midtown.jpg' },
  { id: 8,  category: 'Stair Runners', label: 'Natural Sisal — The Beaches',           image: '/images/project-stair-runner-beaches.jpg' },
  { id: 9,  category: 'Stair Runners', label: 'Cut Pile Carpet Stairs — Leslieville',  image: '/images/project-stair-runner-leslieville.jpeg' },
  { id: 10, category: 'Stair Runners', label: 'Bordered Wool — Riverdale',             image: '/images/project-stair-runner-riverdale.jpg' },
  { id: 11, category: 'Stair Runners', label: 'Berber Stair Runner — East York',       image: '/images/project-stair-runner-east-york.jpg' },
  { id: 12, category: 'Stair Runners', label: 'Semi-Detached Runner — North York',     image: '/images/project-stair-runner-north-york-semi.jpg' },
  // Hardwood
  { id: 13, category: 'Hardwood', label: 'White Oak — Leaside',                        image: '/images/project-hardwood-leaside.jpg' },
  { id: 14, category: 'Hardwood', label: 'Dark Walnut — North York',                   image: '/images/project-hardwood-north-york.jpg' },
  { id: 15, category: 'Hardwood', label: 'Engineered Oak — Yorkville Condo',           image: '/images/project-hardwood-yorkville-condo.png' },
  { id: 16, category: 'Hardwood', label: 'Full Home White Oak — Forest Hill',          image: '/images/project-hardwood-forest-hill-full-home.png' },
  { id: 17, category: 'Hardwood', label: 'Original Fir Restore — The Annex',           image: '/images/project-hardwood-annex-refinish-new.jpg' },
  { id: 18, category: 'Hardwood', label: 'Herringbone Pattern — Midtown',              image: '/images/project-hardwood-midtown-herringbone.jpg' },
  { id: 19, category: 'Hardwood', label: 'Engineered Hardwood — Etobicoke',            image: '/images/project-hardwood-etobicoke-basement.png' },
  { id: 20, category: 'Hardwood', label: 'Light Maple — The Beaches',                  image: '/images/project-hardwood-beaches-maple.png' },
  { id: 21, category: 'Hardwood', label: 'Dark Walnut Living Room — High Park',        image: '/images/project-hardwood-high-park-walnut.png' },
  { id: 22, category: 'Hardwood', label: 'Wide-Plank Ash — Rosedale',                  image: '/images/project-hardwood-rosedale-full.png' },
  { id: 23, category: 'Hardwood', label: 'Red Oak Restain — East York',                image: '/images/project-hardwood-east-york-oak.jpeg' },
  { id: 24, category: 'Hardwood', label: 'Engineered Oak Throughout — Scarborough',    image: '/images/project-hardwood-scarborough-engineered.jpeg' },
  // Luxury Vinyl
  { id: 25, category: 'Luxury Vinyl', label: 'LVP Throughout — Downtown Condo',        image: '/images/project-vinyl-condo-downtown.png' },
  { id: 26, category: 'Luxury Vinyl', label: 'Waterproof LVP Basement — North York',   image: '/images/project-vinyl-north-york-basement.png' },
  { id: 27, category: 'Luxury Vinyl', label: 'LVP Kitchen & Bath — Etobicoke',         image: '/images/project-vinyl-etobicoke-kitchen.jpeg' },
  { id: 28, category: 'Luxury Vinyl', label: 'LVP Full Home — Scarborough',            image: '/images/project-vinyl-scarborough-full-home.jpg' },
  { id: 29, category: 'Luxury Vinyl', label: 'LVP Condo Upgrade — Midtown',            image: '/images/project-vinyl-midtown-condo.png' },
  { id: 30, category: 'Luxury Vinyl', label: 'LVP Rental Property — Leslieville',      image: '/images/project-vinyl-leslieville-rental.jpeg' },
  { id: 31, category: 'Luxury Vinyl', label: 'LVP Heritage Home — The Annex',          image: '/images/project-vinyl-annex-heritage.jpg' },
  { id: 32, category: 'Luxury Vinyl', label: 'LVP Main Floor — Riverdale',             image: '/images/project-vinyl-riverdale-semi.jpg' },
  { id: 33, category: 'Luxury Vinyl', label: 'Waterproof LVP — The Beaches',           image: '/images/project-vinyl-beaches-cottage.jpg' },
  // Laminate
  { id: 34, category: 'Laminate', label: 'Wide-Plank Laminate — Scarborough',          image: '/images/project-laminate-scarborough.png' },
  { id: 35, category: 'Laminate', label: 'Laminate Basement Rec Room — North York',    image: '/images/project-laminate-north-york-basement.jpeg' },
  { id: 36, category: 'Laminate', label: 'Laminate Bedroom Suite — Etobicoke',         image: '/images/project-laminate-etobicoke-bedroom.png' },
  { id: 37, category: 'Laminate', label: 'Laminate Rental Suite — Scarborough',        image: '/images/project-laminate-scarborough-rental.png' },
  { id: 38, category: 'Laminate', label: 'Laminate Open Concept — East York',          image: '/images/project-laminate-east-york-open-plan.png' },
  { id: 39, category: 'Laminate', label: 'Laminate Playroom & Office — High Park',     image: '/images/project-laminate-high-park-playroom.png' },
  // Carpet
  { id: 40, category: 'Carpet', label: 'Plush Broadloom — North York',                 image: '/images/project-carpet-north-york.jpeg' },
  { id: 41, category: 'Carpet', label: 'Wool Carpet — Forest Hill',                    image: '/images/project-carpet-forest-hill.jpeg' },
  { id: 42, category: 'Carpet', label: 'Wool Carpet Master Suite — Rosedale',          image: '/images/project-carpet-rosedale-wool.jpeg' },
  { id: 43, category: 'Carpet', label: 'Plush Carpet Penthouse — Yorkville',           image: '/images/project-carpet-yorkville-penthouse.jpeg' },
  { id: 44, category: 'Carpet', label: 'Carpet Stairs & Hallway — Forest Hill',        image: '/images/project-carpet-forest-hill-stairs-hall.jpeg' },
  { id: 45, category: 'Carpet', label: 'Soft Nylon Bedroom — The Beaches',             image: '/images/project-carpet-beaches-bedroom.jpeg' },
  { id: 46, category: 'Carpet', label: 'Condo Corridor Carpet — Midtown',              image: '/images/project-carpet-midtown-condo-hall.jpeg' },
  { id: 47, category: 'Carpet', label: 'Basement Recreation Room — Etobicoke',         image: '/images/project-carpet-etobicoke-basement.jpeg' },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Category>('All')

  const filtered = activeTab === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeTab)

  return (
    <main>
      {/* Hero */}
      <section className="flex items-center justify-center bg-charcoal" style={{ minHeight: '40vh' }}>
        <div className="text-center px-4">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">Our Portfolio</p>
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-4">Our Work, Your Inspiration</h1>
          <p className="font-lato text-lg text-stone-300 max-w-xl mx-auto">
            Real installs from real Toronto homes — since 1959.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
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

      {/* Gallery Grid */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="aspect-square relative bg-stone-200">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
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

      <CTABanner
        title="Like What You See?"
        subtitle="Visit our showroom at 978 Bathurst St or book a free in-home consultation."
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCta={{ label: 'Call (416) 533-3366', href: 'tel:4165333366' }}
      />
    </main>
  )
}
