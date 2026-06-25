"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  carpetSamples,
  carpetFamilies,
  type CarpetFamily,
  type CarpetSample,
} from "@/lib/carpet-samples";

type Filter = "All" | CarpetFamily;

export default function CarpetSamplesPage() {
  const [search, setSearch] = useState("");
  const [activeFamily, setActiveFamily] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<CarpetSample | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return carpetSamples.filter((s) => {
      const matchesFamily =
        activeFamily === "All" || s.family === activeFamily;
      const matchesSearch = !q || s.code.toLowerCase().includes(q);
      return matchesFamily && matchesSearch;
    });
  }, [search, activeFamily]);

  // Group the filtered results by family, preserving family order.
  const grouped = useMemo(() => {
    return carpetFamilies
      .map((family) => ({
        family,
        items: filtered.filter((s) => s.family === family),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const filters: Filter[] = ["All", ...carpetFamilies];

  return (
    <main className="font-lato">
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="aspect-square relative w-full bg-stone-100">
              <Image
                src={lightbox.imageSrc}
                alt={`Carpet sample ${lightbox.code} — ${lightbox.family}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="px-6 py-4">
              <p className="font-playfair text-xl text-charcoal">{lightbox.code}</p>
              <p className="font-lato text-sm text-warm-grey mt-1">{lightbox.family}</p>
              <Link
                href={`/contact?sample=${encodeURIComponent(lightbox.code)}`}
                className="mt-4 inline-block w-full text-center px-6 py-3 bg-gold text-white font-lato font-semibold rounded hover:bg-opacity-90 transition-colors"
                onClick={() => setLightbox(null)}
              >
                Ask About This Sample
              </Link>
            </div>
          </div>
        </div>
      )}

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
            Browse our in-stock carpet samples by colour. Visit our showroom at 978
            Bathurst St to feel the difference in person — texture, weight, and
            colour all look different under natural light.
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

      {/* Filter tabs + search */}
      <section className="bg-white border-b border-stone-100 sticky top-20 z-20 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFamily(f)}
                className={`px-4 py-2 rounded-full font-lato text-sm font-semibold transition-colors border ${
                  activeFamily === f
                    ? "bg-gold text-white border-gold"
                    : "bg-white text-charcoal border-stone-200 hover:border-gold hover:text-gold"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="text"
              placeholder="Search by sample code (e.g. CS57)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-sm border border-stone-200 rounded px-4 py-2 font-lato text-sm text-charcoal focus:outline-none focus:border-gold"
            />
            <span className="font-lato text-sm text-warm-grey whitespace-nowrap">
              {filtered.length} sample{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Grouped grid */}
      <section className="bg-off-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {grouped.length === 0 ? (
            <p className="text-center text-warm-grey py-20 font-lato">
              No samples match your filters.
            </p>
          ) : (
            grouped.map(({ family, items }) => (
              <div key={family} className="mb-12 last:mb-0">
                <h2 className="font-playfair text-2xl text-charcoal mb-1">
                  {family}
                </h2>
                <p className="font-lato text-sm text-warm-grey mb-5">
                  {items.length} sample{items.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {items.map((sample) => (
                    <button
                      key={sample.slug}
                      onClick={() => setLightbox(sample)}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-100 hover:shadow-md transition-shadow group text-left cursor-pointer"
                    >
                      <div className="aspect-square relative bg-stone-100">
                        <Image
                          src={sample.imageSrc}
                          alt={`Carpet sample ${sample.code} — ${sample.family}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-charcoal text-xs font-lato font-semibold px-3 py-1 rounded-full">
                            View
                          </span>
                        </div>
                      </div>
                      <div className="px-3 py-2 text-center">
                        <p className="font-lato font-semibold text-charcoal text-sm">
                          {sample.code}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
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
