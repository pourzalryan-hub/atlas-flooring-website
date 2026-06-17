import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Condo Corridor Flooring Toronto | Atlas Rug & Design Centre",
  description:
    "Condo corridor and common area flooring in Toronto. Commercial-grade carpet and LVP with IIC/STC sound ratings, board-approval support and low-disruption installs. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/commercial/condo-corridors" },
  openGraph: {
    title: "Condo Corridor Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Acoustic-rated corridor and common area flooring for Toronto condos. Commercial carpet and LVP, board-approval support, minimal resident disruption.",
    url: "https://atlasrugflooring.com/commercial/condo-corridors",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Condo Corridor Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Acoustic-rated corridor and common area flooring for Toronto condos from Atlas Rug & Design Centre.",
  },
};

const acousticRows = [
  {
    metric: "IIC (Impact Insulation Class)",
    measures: "Footstep and impact noise through the floor structure",
    target: "Most Toronto condo declarations require IIC 50+ on slab",
  },
  {
    metric: "STC (Sound Transmission Class)",
    measures: "Airborne sound — voices, TVs — between assemblies",
    target: "STC 50+ is the common benchmark for shared assemblies",
  },
  {
    metric: "Underlay / Acoustic Pad",
    measures: "The single biggest lever on both IIC and delta values",
    target: "Spec'd to the assembly, not bought on price alone",
  },
];

const steps = [
  {
    title: "Board Briefing",
    description:
      "We meet with the property manager or board, review the declaration's sound requirements, and confirm what the building actually permits before a single sample is ordered.",
  },
  {
    title: "Spec & Samples",
    description:
      "We bring corridor-grade carpet and LVP samples with documented IIC/STC ratings, then prepare a written specification the board can vote on with confidence.",
  },
  {
    title: "Resident Notice Plan",
    description:
      "We map the work floor by floor and supply notice timelines so management can post advisories. Residents always keep a clear, safe path to elevators and exits.",
  },
  {
    title: "Phased Install",
    description:
      "We work in sections, control dust and odour, and keep corridors usable throughout. We coordinate elevator bookings and loading-dock access in advance.",
  },
  {
    title: "Walkthrough & Documents",
    description:
      "We complete a corridor-by-corridor walkthrough with management and hand over warranty and maintenance documentation for the building's records.",
  },
];

const faqItems = [
  {
    q: "What IIC and STC ratings do Toronto condos require for corridors?",
    a: "Most Toronto condo declarations and many newer building rules call for IIC 50 and STC 50 on suite-adjacent assemblies, and corridors often have their own acoustic expectations because they sit above occupied suites. The rating is a property of the whole floor assembly — flooring, underlay, and slab together — not the surface alone. We pull the relevant requirement from your declaration and spec an underlay and product combination that meets it on paper before we install.",
  },
  {
    q: "How do you get a corridor flooring project approved by the board?",
    a: "Boards approve what they can defend. We provide a written specification with documented IIC/STC ratings, manufacturer warranty terms, samples the board can handle, and a clear budget broken into materials, labour, prep, and removal. Because we have worked with Toronto property managers since 1959, we are comfortable presenting at a board meeting or supplying the package management needs to circulate before a vote.",
  },
  {
    q: "Should corridors use commercial carpet or luxury vinyl plank?",
    a: "Both work, and the right answer depends on the building. Commercial carpet tile dampens footstep noise naturally, hides soiling in long runs, and lets you replace a single damaged square instead of a whole hallway. Commercial LVP reads as more modern, wipes clean, and suits buildings updating to a contemporary look — paired with the correct acoustic underlay it can hit the same ratings. We often zone the two: carpet in residential corridors, LVP in lobbies and amenity rooms.",
  },
  {
    q: "How disruptive is a corridor replacement for residents?",
    a: "Far less than most boards expect. We work in phases so only a short section is ever under way, keep a protected walking path to elevators and stairs at all times, and schedule loud or dusty stages around quiet hours where the declaration requires it. With advance resident notices posted by management, most people barely notice the project moving through the building.",
  },
  {
    q: "Do you work within strata rules and elevator bookings?",
    a: "Yes. Multi-unit work lives or dies on logistics. We book service elevators, coordinate loading-dock windows, pad and protect common surfaces, and respect any contractor hours and insurance requirements the building sets. Handling those details is exactly why property managers bring us back.",
  },
  {
    q: "Can you match flooring across multiple floors and phases?",
    a: "We can, and consistent sourcing matters in a building you will refresh over years. We record the exact product, colour, and dye lot so a future phase or a repair matches what is already down. If a product is discontinued, we flag it early and recommend the closest current equivalent rather than letting the building drift into a patchwork.",
  },
];

export default function CondoCorridorsPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Condo Corridor & Common Area Flooring Toronto"
        subtitle="Acoustic-rated corridor and common area flooring for Toronto condos — board-approved, installed with minimal resident disruption."
        breadcrumb="Condo Corridors"
        imageSrc="/images/placeholder.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Condo & Strata Specialists
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Corridors That Pass the Board and Keep the Peace
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            A condo corridor is one of the hardest floors in the building to get
            right. It runs above occupied suites, so it has to meet the sound
            ratings written into the declaration. It carries every resident,
            mover, and delivery in the building, so it has to survive years of
            traffic between renovation cycles. And the work has to happen without
            cutting off residents from their own front doors. Since 1959, Atlas
            Rug &amp; Design Centre has helped Toronto property managers and
            condo boards specify corridor and common area flooring that clears
            all three hurdles.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We are not a sales desk that drops off a sample book and disappears.
            We read your declaration, document the acoustic ratings, present a
            spec the board can vote on, and then coordinate the installation
            in phases — keeping corridors open and residents informed the whole
            way through.
          </p>
        </div>
      </section>

      {/* 3. Acoustics */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Sound Ratings That Matter
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Getting IIC &amp; STC Right
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Metric
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    What It Measures
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Toronto Benchmark
                  </th>
                </tr>
              </thead>
              <tbody>
                {acousticRows.map((row, i) => (
                  <tr
                    key={row.metric}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.metric}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">{row.measures}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mt-8 max-w-4xl mx-auto text-center">
            The ratings live in the assembly, not just the surface. The same
            plank can pass or fail depending on the underlay beneath it, which is
            why we never quote corridor flooring without specifying the acoustic
            layer to match your declaration's requirement.
          </p>
        </div>
      </section>

      {/* 4. Products */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Corridor-Grade Product
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Commercial Carpet &amp; LVP
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col bg-white">
              <h3 className="font-playfair text-xl text-charcoal mb-2">
                Commercial Carpet Tile
              </h3>
              <p className="text-warm-grey text-sm leading-relaxed flex-1">
                Naturally absorbs footstep noise, hides soiling in long runs, and
                lets management replace a single damaged tile instead of a whole
                corridor. Our go-to for residential floors where quiet matters
                most. Browse the full range on our{" "}
                <Link href="/carpet" className="text-gold font-semibold hover:underline">
                  carpet page
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col bg-white">
              <h3 className="font-playfair text-xl text-charcoal mb-2">
                Commercial LVP
              </h3>
              <p className="text-warm-grey text-sm leading-relaxed flex-1">
                A modern, wipe-clean look for lobbies, amenity rooms, and
                buildings updating their image. Paired with the right acoustic
                underlay it meets the same ratings as carpet. See options on our{" "}
                <Link href="/vinyl" className="text-gold font-semibold hover:underline">
                  vinyl page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              From Board Vote to Walkthrough
            </h2>
          </div>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Condo Corridor Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Working with property managers across{" "}
            <Link href="/locations/downtown-toronto" className="text-gold font-semibold hover:underline">
              Downtown Toronto
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

      {/* 7. CTA Banner */}
      <CTABanner
        title="Planning a Corridor Refresh?"
        subtitle="Book a free assessment and we'll review your declaration's sound requirements and prepare a board-ready spec. Trusted by Toronto buildings since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
