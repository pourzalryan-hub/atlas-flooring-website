import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Property Management Flooring Toronto | Multi-Unit Specialists",
  description:
    "Flooring for Toronto property managers and multi-unit buildings — volume pricing, fast suite turns, consistent product sourcing and tenant-friendly scheduling. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/commercial/property-management" },
  openGraph: {
    title: "Property Management Flooring Toronto | Multi-Unit Specialists",
    description:
      "Volume pricing, fast suite turns and consistent sourcing for Toronto property managers and multi-unit buildings.",
    url: "https://atlasrugflooring.com/commercial/property-management",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management Flooring Toronto | Multi-Unit Specialists",
    description:
      "Volume pricing and fast suite turns for Toronto property managers from Atlas Rug & Design Centre.",
  },
};

const valueRows = [
  {
    benefit: "Volume Pricing",
    detail: "Building-wide rates instead of one-off retail pricing",
  },
  {
    benefit: "Fast Suite Turns",
    detail: "Quick scheduling so units re-lease without sitting empty",
  },
  {
    benefit: "Consistent Sourcing",
    detail: "Same products and specs across every unit and phase",
  },
  {
    benefit: "Tenant-Aware Scheduling",
    detail: "Work planned around occupancy, notices, and quiet hours",
  },
  {
    benefit: "Documented Warranty",
    detail: "Paperwork on file for your records and future repairs",
  },
];

const steps = [
  {
    title: "Portfolio Review",
    description:
      "We sit down with your team to understand the buildings, unit types, and turn volume, then set a standard product list and pricing you can apply across the portfolio.",
  },
  {
    title: "Standard Spec",
    description:
      "We lock in consistent products, colours, and grades so every suite turn and common-area refresh matches — no guessing, no patchwork between units.",
  },
  {
    title: "On-Call Scheduling",
    description:
      "When a unit comes available you call, we slot it in. We work around tenants in occupied buildings with proper notice and respect quiet hours.",
  },
  {
    title: "Install & Turn",
    description:
      "Our own crews prep and install quickly so the unit is rent-ready fast, and we keep common areas protected during the work.",
  },
  {
    title: "Documentation",
    description:
      "We hand over warranty and product records for each job so your team has everything on file for accounting, audits, and future repairs.",
  },
];

const faqItems = [
  {
    q: "Do you offer volume pricing for property managers?",
    a: "Yes. When you are flooring suites and common areas across one or more buildings, we set building-wide pricing rather than quoting each unit at retail. Predictable per-unit costs make it far easier to budget turns and capital projects, and the more consistent your spec, the sharper we can sharpen the number. We are happy to put a standing rate sheet in place for your portfolio.",
  },
  {
    q: "How fast can you turn a vacant suite?",
    a: "Quickly — an empty unit is lost rent, and we schedule turns with that in mind. Once you have a standard spec on file we can move fast because there is no product decision to make each time: you call, we slot it in, prep, and install so the suite is rent-ready on a tight timeline. We will give you a realistic per-unit turnaround based on the products you have standardised on.",
  },
  {
    q: "Can you keep flooring consistent across all our units?",
    a: "That is one of the biggest reasons managers work with us. We record the exact products, colours, and grades in your standard spec so every suite turn matches the last and common areas stay uniform across phases. We track dye lots and flag discontinuations early, recommending the closest current equivalent before your portfolio drifts into a mismatch.",
  },
  {
    q: "How do you schedule around tenants in occupied buildings?",
    a: "Carefully. For occupied buildings we plan the work around occupancy, coordinate the notice periods your tenancies require, book service elevators and loading docks, and respect quiet hours. We keep common areas protected and passable throughout. Having worked with Toronto buildings since 1959, we know the logistics that keep a project from turning into a tenant complaint.",
  },
  {
    q: "What products work best for rental turns?",
    a: "For most rental suites we recommend commercial-grade luxury vinyl plank: it is waterproof, scratch-resistant, fast to install, and wipes clean between tenants without refinishing — which keeps per-turn cost and downtime low. Where a softer feel is wanted we use durable, easy-clean carpet. We match the product to your wear expectations and budget, not the other way around.",
  },
  {
    q: "Do you provide warranty documentation for our records?",
    a: "Always. Every job comes with warranty and product documentation handed to your team for the building's records, so you have what you need for accounting, audits, and any future repair or claim. Consistent records across the portfolio also make it simple to source a matching repair years later.",
  },
];

export default function PropertyManagementPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Flooring for Property Managers & Multi-Unit Buildings in Toronto"
        subtitle="Volume pricing, fast suite turns, and consistent sourcing — flooring built around how you actually run a portfolio."
        breadcrumb="Property Management"
        imageSrc="/images/placeholder.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Multi-Unit Specialists
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            A Flooring Partner Built for Portfolios
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Property managers do not need a one-off quote — they need a flooring
            partner who answers the phone, prices predictably, turns suites fast,
            and keeps every unit consistent across the portfolio. Since 1959,
            Atlas Rug &amp; Design Centre has been that partner for Toronto
            buildings, from individual suite turns to full corridor and amenity
            refreshes.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We set a standard spec and volume pricing up front so there are no
            decisions to relitigate every time a unit comes available. You call,
            we schedule, our own crews turn the suite, and you get warranty
            documentation for your records. When the goal is rent-ready units
            with no surprises, that is the whole job.
          </p>
        </div>
      </section>

      {/* 3. Value */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Why Managers Work With Us
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              What a Portfolio Partner Should Deliver
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Benefit
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    What It Means for You
                  </th>
                </tr>
              </thead>
              <tbody>
                {valueRows.map((row, i) => (
                  <tr
                    key={row.benefit}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.benefit}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mt-8 max-w-4xl mx-auto text-center">
            Need corridor and common-area work too? See our{" "}
            <Link href="/commercial/condo-corridors" className="text-gold font-semibold hover:underline">
              condo corridor flooring
            </Link>{" "}
            services for acoustic-rated, board-ready specifications.
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
              How We Work With Your Team
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
              Property Management Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving property managers across{" "}
            <Link href="/locations/toronto" className="text-gold font-semibold hover:underline">
              Toronto
            </Link>{" "}
            and the GTA. See our full{" "}
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
        title="Managing Suite Turns or a Building Refresh?"
        subtitle="Let's set up volume pricing and a standard spec for your portfolio. Trusted by Toronto property managers since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
