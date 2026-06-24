"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { carpetSamples } from "@/lib/carpet-samples";

export default function CarpetSamplesPage() {
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return carpetSamples;
    return carpetSamples.filter((s) => s.code.toLowerCase().includes(q));
  }, [search]);

  return (
    <main className="font-lato">
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
            Carpet Collection
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Our Carpet Samples
          </h1>
          <p className="font-lato text-lg text-stone-300 max-w-2xl mx-auto mb-6">
            Browse our in-stock carpet samples. Visit our showroom at 978 Bathurst St
            to feel the difference in person — texture, weight, and colour all look
            different under natural light.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-gold text-white font-semibold rounded hover:bg-opacity-90 transition-colors"
            >
              Book a Consultation
            </Link>
            <a
              href="tel:4165333366"
              className="inline-block px-8 py-3 border border-white/30 text-white font-semibold rounded hover:border-gold hover:text-gold transition-colors"
            >
              Call (416) 533-3366
            </a>
          </div>
        </div>
      </section>

      {/* Search + count */}
      <section className="bg-white border-b border-stone-100 sticky top-20 z-20 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search by sample code (e.g. CS57)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-sm border border-stone-200 rounded px-4 py-2 font-lato text-sm text-charcoal focus:outline-none focus:border-gold"
          />
          <span className="font-lato text-sm text-warm-grey">
            {visible.length} sample{visible.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-off-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {visible.length === 0 ? (
            <p className="text-center text-warm-grey py-20 font-lato">
              No samples match &ldquo;{search}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {visible.map((sample) => (
                <div
                  key={sample.slug}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-100 hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square relative bg-stone-100">
                    <Image
                      src={sample.imageSrc}
                      alt={`Carpet sample ${sample.code}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {/* Placeholder shown while image missing */}
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-xs font-lato select-none pointer-events-none">
                      <span className="opacity-0 group-[&:not(:has(img[src]))]:opacity-100">
                        Photo coming
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-2 text-center">
                    <p className="font-lato font-semibold text-charcoal text-sm">
                      {sample.code}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16 px-4 text-center">
        <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">
          See Them In Person
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">
          Come Feel the Difference
        </h2>
        <p className="font-lato text-stone-300 text-lg max-w-xl mx-auto mb-8">
          Photos don&apos;t do carpet justice. Visit our Bathurst Street showroom and
          walk on the samples yourself — Mon–Sat, 10am to 4pm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gold text-white font-lato font-semibold rounded hover:bg-opacity-90 transition-colors"
          >
            Get a Free Quote
          </Link>
          <a
            href="https://www.google.com/maps/search/?api=1&query=978+Bathurst+St+Toronto+ON+M5R+3G6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-white/30 text-white font-lato font-semibold rounded hover:border-gold hover:text-gold transition-colors"
          >
            Get Directions
          </a>
        </div>
      </section>
    </main>
  );
}
