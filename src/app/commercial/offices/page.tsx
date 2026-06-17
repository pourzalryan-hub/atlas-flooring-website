import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title:
    "Office Flooring Toronto | Commercial Carpet & LVP | Atlas Rug & Design Centre",
  description:
    "Office flooring in Toronto — commercial carpet tile, broadloom and LVP with acoustic performance and phased installation in occupied workspaces. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/commercial/offices" },
  openGraph: {
    title:
      "Office Flooring Toronto | Commercial Carpet & LVP | Atlas Rug & Design Centre",
    description:
      "Commercial carpet tile, broadloom and LVP for Toronto offices. Acoustic performance and phased installs that keep your team working.",
    url: "https://atlasrugflooring.com/commercial/offices",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Office Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Commercial carpet tile, broadloom and LVP for Toronto offices from Atlas Rug & Design Centre.",
  },
};

const compareRows = [
  {
    product: "Carpet Tile",
    acoustics: "Very good — absorbs footstep and ambient noise",
    install: "Fast around furniture; lift tiles for under-floor cabling",
    maintenance: "Vacuum; replace a single damaged tile, not the floor",
  },
  {
    product: "Broadloom Carpet",
    acoustics: "Excellent — seamless, quietest underfoot",
    install: "Continuous look; full replacement if damaged",
    maintenance: "Vacuum and periodic deep clean",
  },
  {
    product: "Commercial LVP",
    acoustics: "Good with acoustic underlay; harder surface",
    install: "Durable, rolling-chair friendly, waterproof",
    maintenance: "Damp mop; no refinishing required",
  },
];

const steps = [
  {
    title: "Walk the Floor",
    description:
      "We assess traffic lanes, meeting rooms versus open plan, subfloor condition, and where cabling runs so the product fits how the office actually works.",
  },
  {
    title: "Spec & Quote",
    description:
      "We recommend carpet tile, broadloom, LVP, or a zoned mix, then itemise materials, prep, removal, and labour in a clear written quote.",
  },
  {
    title: "Phasing Plan",
    description:
      "We sequence the work floor by floor or zone by zone so staff keep a usable workspace, and we plan furniture lifts and moves with your facilities team.",
  },
  {
    title: "After-Hours Install",
    description:
      "Most office work happens evenings and weekends. Installers work to spec, control dust, and have the area ready before the team returns.",
  },
  {
    title: "Walkthrough & Care",
    description:
      "We confirm the work meets spec and hand your maintenance team a care plan so the floor keeps looking sharp between cleans.",
  },
];

const faqItems = [
  {
    q: "Carpet tile or broadloom — which is better for an office?",
    a: "For most working offices we recommend carpet tile. You can replace a single stained or worn square instead of recarpeting a floor, lift tiles to reach under-floor cabling, and install quickly around furniture — all of which lowers lifetime cost in a space that changes constantly. Broadloom still wins when you want the quietest, most seamless look, such as an executive floor or boardroom, where the floor rarely gets reconfigured.",
  },
  {
    q: "When does LVP make sense in an office?",
    a: "Luxury vinyl plank shines in reception areas, kitchens, breakout zones, and corridors where you want a hard, wipe-clean, rolling-chair-friendly surface that reads as modern. It is waterproof and never needs refinishing. The trade-off is acoustics — a hard floor carries more noise — so we pair it with an acoustic underlay and often zone it against carpet in the quieter work areas.",
  },
  {
    q: "How do you handle acoustics in an open-plan office?",
    a: "Sound is one of the biggest complaints in open-plan space, and flooring is part of the fix. Carpet tile and broadloom absorb footstep and ambient noise far better than hard surfaces, so we lean on them in dense work areas and meeting rooms. Where you want LVP for looks or durability, we specify an acoustic underlay and balance it with soft flooring elsewhere so the overall floor plate stays comfortable.",
  },
  {
    q: "Can you install while we keep working?",
    a: "Yes — that is the norm for our office projects. We phase the work zone by zone or floor by floor and run the bulk of it after hours and on weekends so your team always has a usable workspace. We coordinate furniture lifts and moves with your facilities crew up front so each area is cleared, installed, and back in service on schedule.",
  },
  {
    q: "What is the most durable, low-maintenance office floor?",
    a: "It depends on the zone. Commercial-grade LVP with a thick wear layer is the most forgiving hard surface — waterproof, scratch-resistant, and just needing a damp mop. Carpet tile is the most forgiving soft surface because you replace damaged squares one at a time. We rate products by commercial wear class, not residential ratings, and factor lifetime cost into the recommendation rather than just the install price.",
  },
  {
    q: "Do you work with designers and general contractors on fit-outs?",
    a: "Regularly. We are comfortable working from a designer's spec or helping develop one, coordinating with the GC's schedule, and supplying samples and submittals for sign-off. Having supplied Toronto offices since 1959, we know how to slot flooring into a larger fit-out without becoming the bottleneck.",
  },
];

export default function OfficesPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Office Flooring Toronto"
        subtitle="Commercial carpet tile, broadloom and LVP — specified for acoustics and installed without stopping your business."
        breadcrumb="Offices"
        imageSrc="/images/placeholder.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Office Flooring Specialists
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            A Floor That Keeps the Office Working
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            An office floor has to do three jobs at once: survive rolling chairs
            and constant foot traffic, keep noise under control in open-plan
            space, and adapt as desks, walls, and teams move around it. Since
            1959, Atlas Rug &amp; Design Centre has helped Toronto businesses
            choose flooring that does all three — from a single suite refresh to
            a full-floor fit-out.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We zone offices rather than blanket them. Carpet tile and broadloom
            where acoustics matter most, durable LVP in reception and breakout
            areas, all sequenced so your team keeps working while we install. The
            goal is a floor that lowers lifetime cost and still looks sharp years
            into the lease.
          </p>
        </div>
      </section>

      {/* 3. Comparison */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Choose the Right Product
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Carpet Tile vs Broadloom vs LVP
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Acoustics
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Install &amp; Use
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Maintenance
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.product}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.product}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">{row.acoustics}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.install}</td>
                    <td className="px-4 py-3 text-warm-grey">
                      {row.maintenance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mt-8 max-w-4xl mx-auto text-center">
            Most offices land on a mix. Explore{" "}
            <Link href="/carpet" className="text-gold font-semibold hover:underline">
              commercial carpet
            </Link>{" "}
            and{" "}
            <Link href="/vinyl" className="text-gold font-semibold hover:underline">
              luxury vinyl
            </Link>{" "}
            options, then we zone them to how each area is used.
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
              Installing in an Occupied Office
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
              Office Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving offices across Toronto and the GTA. See our full{" "}
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
        title="Refreshing Your Office Floors?"
        subtitle="Book a free assessment and we'll zone your space and plan a phased install around your team. Trusted by Toronto businesses since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
