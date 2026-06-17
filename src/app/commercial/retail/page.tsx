import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Retail Store Flooring Toronto | Atlas Rug & Design Centre",
  description:
    "Retail store flooring in Toronto — hardwood for boutiques, LVP for high-traffic floors, tile for entrances. Brand-right looks, fast turnaround. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/commercial/retail" },
  openGraph: {
    title: "Retail Store Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Durable, on-brand retail flooring for Toronto stores. Hardwood for boutiques, LVP for high traffic, tile for entrances — installed fast.",
    url: "https://atlasrugflooring.com/commercial/retail",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Store Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Durable, on-brand retail flooring for Toronto stores from Atlas Rug & Design Centre.",
  },
};

const zoneRows = [
  {
    zone: "Entrance & Vestibule",
    product: "Porcelain / stone tile",
    why: "Takes grit, slush, and salt; protects the floor beyond it",
  },
  {
    zone: "Main Sales Floor",
    product: "Commercial LVP",
    why: "Wear-rated, waterproof, wipes clean, looks premium",
  },
  {
    zone: "Boutique / Feature Areas",
    product: "Hardwood",
    why: "Warmth and prestige that flatters higher-end merchandise",
  },
  {
    zone: "Back of House",
    product: "Sheet vinyl / sealed concrete",
    why: "Tough, low-cost, easy to clean where customers never look",
  },
];

const steps = [
  {
    title: "Brand & Traffic Review",
    description:
      "We look at your brand, fixtures, and traffic flow, then map which zones need a premium look and which simply need to survive carts and crowds.",
  },
  {
    title: "Spec & Samples",
    description:
      "We bring hardwood, LVP, and tile samples so you can see them against your fixtures and lighting, then quote materials, prep, and labour in writing.",
  },
  {
    title: "Turnaround Plan",
    description:
      "Retail revenue stops when the doors close, so we build the tightest realistic schedule — often overnight or between fit-out trades — to reopen fast.",
  },
  {
    title: "Installation",
    description:
      "Our own crews prep the subfloor, control dust, and install entrances, sales floor, and feature zones to spec with clean transitions between them.",
  },
  {
    title: "Walkthrough & Care",
    description:
      "We confirm the finish reads right under your lighting and hand over a care plan so the floor still looks like opening day a year in.",
  },
];

const faqItems = [
  {
    q: "What flooring stands up to retail foot traffic?",
    a: "Commercial-grade luxury vinyl plank with a thick wear layer is our workhorse for retail sales floors. It is waterproof, scratch- and scuff-resistant, wipes clean in minutes, and never needs refinishing — and modern wood- and stone-look planks read as genuinely premium. For the busiest, grittiest spots, like entrances, we step up to porcelain or stone tile, which simply does not wear out.",
  },
  {
    q: "Can I use real hardwood in a store?",
    a: "Yes, in the right place. Hardwood brings a warmth and prestige that flatters higher-end merchandise, so it works beautifully in boutiques and feature areas where you want the floor to signal quality. The trade-off is maintenance — it scratches and needs periodic recoating — so we usually reserve it for lower-traffic feature zones and run durable LVP across the main sales floor. Browse species and finishes on our hardwood page.",
  },
  {
    q: "Why put tile at the entrance specifically?",
    a: "The entrance takes the worst abuse in the store: grit, rain, slush, and road salt tracked straight off a Toronto sidewalk. Porcelain or stone tile shrugs that off and acts as a buffer that keeps moisture and debris from reaching the softer flooring on the main floor. A well-designed entrance zone protects the whole store and cuts down on slip risk in winter.",
  },
  {
    q: "How fast can you turn around a retail floor?",
    a: "Faster than most owners expect, because we plan around your closed hours. Where the layout allows, we work overnight or schedule the install between other fit-out trades so the store loses as little selling time as possible. We will give you an honest, specific timeline at quote stage rather than a vague promise.",
  },
  {
    q: "Can the floor match our brand look?",
    a: "That is half the job. We bring samples to view against your fixtures, signage, and lighting because a plank that looks perfect in our showroom can read completely differently under retail spotlights. Between wood-look, stone-look, and true hardwood and tile options, we can dial the floor to feel on-brand without sacrificing the durability the space needs.",
  },
  {
    q: "Do you handle multi-location retail rollouts?",
    a: "We do. For chains and franchises we record the exact products and specs so every location matches, and we coordinate scheduling store by store. Consistent sourcing keeps your brand looking uniform and makes future repairs simple. See our commercial flooring overview for the full picture.",
  },
];

export default function RetailPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Retail Store Flooring Toronto"
        subtitle="On-brand, hard-wearing flooring for Toronto stores — hardwood for boutiques, LVP for traffic, tile for entrances, turned around fast."
        breadcrumb="Retail"
        imageSrc="/images/placeholder.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Retail Flooring Specialists
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            A Floor That Sells With You
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            A retail floor has two bosses. It has to flatter the merchandise and
            carry your brand, and it has to survive carts, heels, weather, and
            constant traffic without looking tired by season two. Since 1959,
            Atlas Rug &amp; Design Centre has helped Toronto retailers — from
            single boutiques to multi-location chains — get both, zone by zone.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We rarely cover a store in one product. Tile takes the punishment at
            the entrance, durable LVP runs the main sales floor, and real
            hardwood lifts the feature areas where it earns its keep. And because
            every closed hour costs you sales, we plan the tightest realistic
            turnaround to get you reopened fast.
          </p>
        </div>
      </section>

      {/* 3. Zones */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Zone by Zone
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              The Right Floor for Each Area
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Zone
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Recommended
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {zoneRows.map((row, i) => (
                  <tr
                    key={row.zone}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.zone}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">{row.product}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mt-8 max-w-4xl mx-auto text-center">
            Mix and match from our{" "}
            <Link href="/hardwood" className="text-gold font-semibold hover:underline">
              hardwood
            </Link>
            ,{" "}
            <Link href="/vinyl" className="text-gold font-semibold hover:underline">
              luxury vinyl
            </Link>
            , and durable tile to suit each part of the store.
          </p>
        </div>
      </section>

      {/* 4. Process */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Fast Turnaround, Done Right
            </h2>
          </div>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Retail Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving retailers across Toronto and the GTA. See our full{" "}
            <Link href="/commercial" className="text-gold font-semibold hover:underline">
              commercial flooring
            </Link>{" "}
            services.
          </p>
        </div>
      </section>

      <ReviewsSection service="commercial" />

      {/* 6. CTA Banner */}
      <CTABanner
        title="Opening or Refitting a Store?"
        subtitle="Book a free assessment and we'll zone your store and plan a fast, low-downtime install. Trusted by Toronto businesses since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
