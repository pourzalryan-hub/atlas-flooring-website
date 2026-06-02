import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title: "Hardwood Flooring Toronto | Atlas Rug & Design Centre",
  description:
    "Premium hardwood flooring supply and installation in Toronto. Solid, engineered, and wide-plank hardwood from Atlas Rug & Design Centre — serving Toronto since 1959. Get a free in-home quote today.",
};

const productTypes = [
  {
    label: "Solid Hardwood",
    tag: "Most Popular",
    tagColor: "bg-gold",
    description:
      "Milled from a single piece of wood, solid hardwood is the gold standard of flooring. It can be sanded and refinished multiple times over decades, making it a true lifetime investment. Best for above-grade living areas.",
  },
  {
    label: "Engineered Hardwood",
    tag: "Best for Basements & Radiant Heat",
    tagColor: "bg-charcoal",
    description:
      "A real hardwood veneer over a dimensionally-stable plywood core. Engineered hardwood handles humidity swings and radiant heat systems far better than solid wood, opening up rooms and climates that were previously off-limits.",
  },
  {
    label: "Wide Plank",
    tag: "Contemporary Favourite",
    tagColor: "bg-gold",
    description:
      "Planks 5 inches and wider deliver a dramatic, open feel that has become the defining look of modern Toronto interiors. Wide plank is available in both solid and engineered constructions and showcases the natural grain of each species beautifully.",
  },
];

const speciesRows = [
  {
    species: "White Oak",
    character: "Subtle grain, warm beige to brown",
    bestFor: "Modern & transitional homes",
  },
  {
    species: "Red Oak",
    character: "Prominent grain, reddish tones",
    bestFor: "Traditional & classic interiors",
  },
  {
    species: "Maple",
    character: "Fine, consistent grain",
    bestFor: "Contemporary & Scandinavian styles",
  },
  {
    species: "Walnut",
    character: "Rich chocolate tones, wavy grain",
    bestFor: "Luxury & statement rooms",
  },
  {
    species: "Hickory",
    character: "Bold contrast, very hard",
    bestFor: "Rustic & high-traffic areas",
  },
  {
    species: "Ash",
    character: "Light blonde, open grain",
    bestFor: "Bright, airy modern spaces",
  },
];

const finishRows = [
  {
    finish: "Matte",
    look: "No sheen, natural appearance",
    durability: "Hides scratches & dust well",
  },
  {
    finish: "Satin",
    look: "Low to mid sheen, versatile",
    durability: "Good everyday resilience",
  },
  {
    finish: "Semi-Gloss",
    look: "Noticeable shine, traditional",
    durability: "Shows wear more over time",
  },
  {
    finish: "Hand-Scraped",
    look: "Artisan texture, rustic character",
    durability: "Excellent — hides dents & marks",
  },
  {
    finish: "Wire-Brushed",
    look: "Open grain, lightly textured",
    durability: "Very good — tactile & durable",
  },
  {
    finish: "UV Oil",
    look: "Deep, close-to-the-wood appearance",
    durability: "Spot-repairable, long-lasting",
  },
];

const installationSteps = [
  {
    title: "Consultation",
    description:
      "We visit your home or welcome you to our Bathurst Street showroom to discuss your vision, lifestyle, and budget. We bring samples so you can see options in your own light.",
  },
  {
    title: "Measure & Quote",
    description:
      "Our team measures every room precisely and provides a detailed, written quote with no hidden charges — materials, labour, and removal of existing flooring all clearly itemised.",
  },
  {
    title: "Product Selection",
    description:
      "Choose from hundreds of hardwood options. Our experienced design consultants help you narrow down species, plank width, and finish to something you'll love for decades.",
  },
  {
    title: "Installation Day",
    description:
      "Our certified installers arrive on time, protect your home, and complete the installation with precision — including expansion gaps, transitions, and thresholds done properly.",
  },
  {
    title: "Final Walkthrough",
    description:
      "We do a room-by-room walkthrough with you before we leave. Any concerns are addressed on the spot, and we leave you with care instructions for your new floors.",
  },
];

const faqItems = [
  {
    q: "How long does hardwood floor installation take?",
    a: "Most residential installations take one to three days depending on the square footage and complexity. We'll give you a realistic timeline during your quote so you can plan accordingly. Engineered hardwood with a floating install is generally faster than nailed solid hardwood.",
  },
  {
    q: "Can hardwood be installed over radiant heating?",
    a: "Engineered hardwood is the recommended choice for radiant heat systems. Solid hardwood can expand and contract significantly with temperature changes, whereas the cross-ply core of engineered hardwood remains stable. We'll confirm compatibility with your specific system before installation.",
  },
  {
    q: "How soon can I walk on newly installed hardwood?",
    a: "For oil- or water-based polyurethane finishes applied on-site, we typically recommend 24–48 hours before light foot traffic and 5–7 days before replacing furniture. Pre-finished hardwood can often be walked on immediately after installation.",
  },
  {
    q: "What's the difference between solid and engineered hardwood?",
    a: "Solid hardwood is a single plank of real wood throughout — it can be sanded many more times over its life. Engineered hardwood has a real hardwood top layer (veneer) bonded to multiple plywood layers for dimensional stability. Both are genuine hardwood; the difference is construction and application.",
  },
  {
    q: "How do I maintain my hardwood floors?",
    a: "Sweep or vacuum with a soft-bristle attachment regularly. Clean spills immediately with a slightly damp cloth. Use a pH-neutral hardwood cleaner — never steam mops or excess water. Place felt pads under furniture legs and keep pet nails trimmed to avoid scratching.",
  },
  {
    q: "Can I install hardwood in a basement?",
    a: "Solid hardwood is not recommended below grade because of moisture. Engineered hardwood, however, can be installed in basements with proper subfloor moisture testing and preparation. We test moisture levels as part of every installation assessment.",
  },
];

export default function HardwoodPage() {
  return (
    <main className="font-lato">
      {/* 1. Hero */}
      <PageHero
        title="Hardwood Flooring Toronto"
        subtitle="Solid, engineered & wide-plank hardwood — supplied and installed by Toronto's flooring experts."
        breadcrumb="Hardwood"
        imageSrc="/images/placeholder.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            65+ Years of Expertise
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            The Floor That Defines a Home
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Since 1959, Atlas Rug &amp; Design Centre has been helping Toronto
            homeowners choose and install hardwood floors they'll be proud of for
            generations. From a classic red oak strip floor to a dramatic
            wide-plank white oak in a custom stain, we've seen — and delivered —
            every combination imaginable. Our showroom at 978 Bathurst Street
            carries hundreds of hardwood options across species, grades, widths,
            and finishes.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            What sets us apart is that we handle everything: consultation,
            product supply, subfloor preparation, and expert installation — all
            under one roof. No subcontractors, no surprises. Just beautiful
            floors, installed right the first time.
          </p>
        </div>
      </section>

      {/* 3. Product Types */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Find Your Style
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Hardwood Types We Carry
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productTypes.map((product) => (
              <div
                key={product.label}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 flex flex-col"
              >
                <div className="bg-stone-200 aspect-square w-full relative">
                  <Image
                    src="/images/placeholder.jpg"
                    alt={product.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${product.tagColor} text-white`}
                  >
                    {product.tag}
                  </span>
                  <h3 className="font-playfair text-xl text-charcoal mb-2">
                    {product.label}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed flex-1">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Species & Finishes */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Wood & Finish Selection
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Species &amp; Finishes Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Species Table */}
            <div>
              <h3 className="font-playfair text-2xl text-charcoal mb-4">
                Species
              </h3>
              <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
                <table className="w-full text-sm">
                  <thead className="bg-charcoal text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Species
                      </th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Character
                      </th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {speciesRows.map((row, i) => (
                      <tr
                        key={row.species}
                        className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                      >
                        <td className="px-4 py-3 font-semibold text-charcoal">
                          {row.species}
                        </td>
                        <td className="px-4 py-3 text-warm-grey">
                          {row.character}
                        </td>
                        <td className="px-4 py-3 text-warm-grey">
                          {row.bestFor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Finishes Table */}
            <div>
              <h3 className="font-playfair text-2xl text-charcoal mb-4">
                Finishes
              </h3>
              <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
                <table className="w-full text-sm">
                  <thead className="bg-charcoal text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Finish
                      </th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Look
                      </th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Durability
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {finishRows.map((row, i) => (
                      <tr
                        key={row.finish}
                        className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                      >
                        <td className="px-4 py-3 font-semibold text-charcoal">
                          {row.finish}
                        </td>
                        <td className="px-4 py-3 text-warm-grey">{row.look}</td>
                        <td className="px-4 py-3 text-warm-grey">
                          {row.durability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Installation Process */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How Hardwood Installation Works
            </h2>
          </div>
          <ProcessSteps steps={installationSteps} />
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
              Hardwood Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 7. CTA Banner */}
      <CTABanner
        title="Ready for Beautiful Hardwood Floors?"
        subtitle="Visit our Bathurst Street showroom or book a free in-home consultation. Toronto's most trusted flooring experts since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
