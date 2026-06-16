import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Flooring Service Areas Across Toronto | Atlas Rug & Design Centre",
  description:
    "Atlas Rug & Design Centre installs flooring across Toronto and the GTA — from North York and Etobicoke to Forest Hill, Rosedale, Leaside and beyond.",
  alternates: { canonical: "/locations" },
};

export default function LocationsIndexPage() {
  return (
    <main className="font-lato">
      <PageHero
        title="Flooring Service Areas"
        subtitle="Proudly serving homeowners across Toronto and the GTA since 1959. Find your neighbourhood below."
        breadcrumb="Locations"
        imageSrc="/images/hardwood-hero.jpg"
      />

      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Where We Work
            </p>
            <h2 className="font-playfair text-4xl text-charcoal mb-4">
              Toronto Neighbourhoods We Serve
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed max-w-2xl mx-auto">
              From our showroom at 978 Bathurst Street, we install hardwood,
              carpet, vinyl, laminate and stair runners across every corner of
              Toronto. Choose your area to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <h3 className="font-playfair text-xl text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {loc.name}
                </h3>
                <p className="text-warm-grey text-sm leading-relaxed flex-1">
                  {loc.description}
                </p>
                <span className="mt-4 text-gold font-semibold text-sm">
                  Flooring in {loc.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Don't See Your Neighbourhood?"
        subtitle="We serve all of Toronto and the GTA. Book a free in-home consultation and we'll come to you."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
