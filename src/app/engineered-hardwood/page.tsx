import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title: "Engineered Hardwood Flooring Toronto | Atlas Rug & Design Centre",
  description:
    "Engineered hardwood flooring supply and installation in Toronto. Real wood over a stable core — perfect for basements, condos, and radiant heat. Atlas Rug & Design Centre, serving Toronto since 1959. Book a free in-home quote.",
  alternates: { canonical: "/engineered-hardwood" },
  openGraph: {
    title: "Engineered Hardwood Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Engineered hardwood flooring in Toronto — real wood over a dimensionally stable core, ideal for basements, condos, and radiant heat. Supplied and installed by Atlas Rug & Design Centre.",
    url: "https://atlasrugflooring.com/engineered-hardwood",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineered Hardwood Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Engineered hardwood flooring in Toronto — real wood over a stable core, ideal for basements, condos, and radiant heat. From Atlas Rug & Design Centre.",
  },
};

const comparisonCards = [
  {
    label: "Engineered Hardwood",
    tag: "Best for Basements, Condos & Radiant Heat",
    tagColor: "bg-gold",
    image: "/images/hardwood-engineered.jpg",
    description:
      "A genuine hardwood wear layer bonded to a cross-laminated plywood core. The layered construction resists the expansion and contraction that affects solid wood, so it performs in below-grade rooms, humid spaces, and over radiant heating where solid hardwood cannot go.",
  },
  {
    label: "Solid Hardwood",
    tag: "Best for Above-Grade Living Areas",
    tagColor: "bg-charcoal",
    image: "/images/hardwood-solid.jpg",
    description:
      "Milled from a single piece of wood, solid hardwood can be sanded and refinished many times over its life. It is the classic choice for above-grade living spaces with stable humidity, where its full thickness becomes a true lifetime floor.",
  },
];

const speciesRows = [
  {
    species: "White Oak",
    character: "Subtle grain, warm beige to brown; very hard",
    bestFor: "Modern & transitional homes, wide planks",
  },
  {
    species: "European Oak",
    character: "Long, calm grain; takes stains beautifully",
    bestFor: "Custom colours & contemporary interiors",
  },
  {
    species: "Walnut",
    character: "Rich chocolate tones, soft wavy grain",
    bestFor: "Luxury condos & statement rooms",
  },
  {
    species: "Maple",
    character: "Fine, consistent grain; light tone",
    bestFor: "Scandinavian & minimalist spaces",
  },
  {
    species: "Hickory",
    character: "Bold colour variation, extremely hard",
    bestFor: "High-traffic homes & rustic looks",
  },
  {
    species: "Ash",
    character: "Light blonde, open grain",
    bestFor: "Bright, airy modern rooms",
  },
];

const installRows = [
  {
    method: "Floating / Click",
    how: "Planks lock together edge-to-edge over an underlay; not fastened to the subfloor",
    bestFor: "Condos, basements, and quick installs over concrete",
  },
  {
    method: "Glue-Down",
    how: "Planks adhered directly to the subfloor with flooring adhesive",
    bestFor: "Concrete slabs and radiant heat where a solid feel underfoot matters",
  },
  {
    method: "Nail / Staple",
    how: "Planks fastened to a wood subfloor with cleats or staples",
    bestFor: "Above-grade rooms with plywood subfloors (thicker engineered planks)",
  },
];

const installationSteps = [
  {
    title: "Consultation",
    description:
      "We visit your home or welcome you to our Bathurst Street showroom to discuss the room, your subfloor, and how the space is used. We bring engineered samples so you can see species, widths, and finishes in your own light.",
  },
  {
    title: "Subfloor & Moisture Testing",
    description:
      "Engineered hardwood is forgiving, but a sound subfloor still matters. We test concrete and below-grade slabs for moisture, check for flatness, and recommend the right underlay, vapour barrier, or self-levelling prep before anything is installed.",
  },
  {
    title: "Measure & Quote",
    description:
      "We measure every room precisely and provide a detailed written quote with no hidden charges — materials, underlay, labour, and removal of existing flooring all clearly itemised.",
  },
  {
    title: "Installation Day",
    description:
      "Our certified installers choose the right method — floating, glue-down, or nail-down — for your subfloor and product. We acclimate the wood, set proper expansion gaps, and finish transitions and thresholds correctly.",
  },
  {
    title: "Final Walkthrough",
    description:
      "We walk the job room by room with you before we leave, address any concerns on the spot, and provide care instructions so your engineered floors look their best for decades.",
  },
];

const faqItems = [
  {
    q: "Is engineered hardwood real wood?",
    a: "Yes. The visible wear layer is a slice of genuine hardwood — the same white oak, walnut, or maple you would find on a solid floor. What differs is the core: instead of being solid wood all the way down, that real-wood top is bonded to several cross-laid plywood plies that give the plank its dimensional stability.",
  },
  {
    q: "Can engineered hardwood be installed in a basement?",
    a: "Yes, and this is one of its biggest advantages. Solid hardwood is not recommended below grade because of moisture, but engineered hardwood's cross-ply core handles the humidity swings of a basement far better. We always test the slab for moisture and use the correct vapour barrier or underlay as part of the install.",
  },
  {
    q: "Does engineered hardwood work over radiant heating?",
    a: "Engineered hardwood is the recommended wood floor for radiant heat. Its layered construction stays stable as the floor warms and cools, whereas solid hardwood can gap or cup with temperature changes. We confirm compatibility with your specific radiant system and follow the manufacturer's temperature guidelines.",
  },
  {
    q: "Can engineered hardwood be refinished?",
    a: "It depends on the thickness of the wear layer. Many quality engineered floors have a 3–6 mm top layer that can be sanded and refinished once or twice. Thinner wear layers are best refreshed with a light screen-and-recoat rather than a full sanding. We'll tell you exactly what a given product can take.",
  },
  {
    q: "What's the difference between engineered and solid hardwood?",
    a: "Both are genuine hardwood. Solid hardwood is one piece of wood throughout and can be sanded many times, making it ideal for stable above-grade rooms. Engineered hardwood has a real-wood top bonded to a stable plywood core, so it performs in basements, condos, and over radiant heat where solid wood would move too much.",
  },
  {
    q: "How do I maintain engineered hardwood floors?",
    a: "Care is the same as any wood floor: sweep or vacuum with a soft attachment, wipe spills promptly, and clean with a pH-neutral hardwood cleaner — never a steam mop or excess water. Felt pads under furniture and trimmed pet nails keep the wear layer looking new.",
  },
];

export default function EngineeredHardwoodPage() {
  return (
    <main className="font-lato">
      {/* 1. Hero */}
      <PageHero
        title="Engineered Hardwood Flooring Toronto"
        subtitle="Real wood over a stable core — beautiful floors for basements, condos, and radiant heat."
        breadcrumb="Engineered Hardwood"
        imageSrc="/images/hardwood-engineered.jpg"
      />

      {/* 2. Intro */}
      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            65+ Years of Expertise
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Real Wood That Goes Where Solid Can&apos;t
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Engineered hardwood gives you the look and feel of a genuine wood
            floor with a construction built for the realities of Toronto homes —
            humid summers, dry heated winters, concrete condo slabs, and finished
            basements. The secret is in how it&apos;s made. A slice of real
            hardwood, the wear layer, is bonded to a core of cross-laminated
            plywood plies that run in alternating directions. That cross-ply
            structure pulls against itself as humidity changes, so the plank stays
            flat and stable instead of cupping, gapping, or swelling the way a
            solid board can. The surface is true white oak, walnut, or maple; the
            engineering underneath is simply what makes it behave.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Since 1959, Atlas Rug &amp; Design Centre has helped Toronto
            homeowners pick the right floor for the right room. For a main-floor
            living and dining area, traditional{" "}
            <Link href="/hardwood" className="text-gold font-semibold hover:underline">
              solid hardwood
            </Link>{" "}
            may still be the ideal choice. But the moment you move below grade,
            over a concrete slab, or onto a radiant-heat system, engineered
            hardwood becomes the smarter — and often the only sensible — way to
            have real wood underfoot. That&apos;s why it has become the default
            for{" "}
            <Link href="/condo-flooring" className="text-gold font-semibold hover:underline">
              condo flooring
            </Link>{" "}
            and{" "}
            <Link href="/basement-flooring" className="text-gold font-semibold hover:underline">
              basement flooring
            </Link>{" "}
            across the city.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We handle everything under one roof — consultation, product supply,
            subfloor and moisture preparation, and expert installation. No
            subcontractors, no surprises. Just a real wood floor, installed right
            the first time.
          </p>
        </div>
      </section>

      {/* 3. Engineered vs Solid */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Choose the Right Construction
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Engineered vs. Solid Hardwood
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {comparisonCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 flex flex-col"
              >
                <div className="bg-stone-200 aspect-square w-full relative">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${card.tagColor} text-white`}
                  >
                    {card.tag}
                  </span>
                  <h3 className="font-playfair text-xl text-charcoal mb-2">
                    {card.label}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed flex-1">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto mt-12 space-y-5">
            <p className="text-warm-grey text-lg leading-relaxed">
              The most important spec to understand when shopping for engineered
              hardwood is the <strong>wear layer</strong> — the thickness of the
              real wood on top. A thicker wear layer (3 to 6 mm) means the floor
              can be sanded and refinished one or more times, behaving much like a
              solid floor over its lifetime. A thinner wear layer is more
              affordable and still durable for everyday wear, but is best
              refreshed with a screen-and-recoat rather than a full sanding. When
              you visit our showroom we&apos;ll show you the cross-section of each
              product so you can see exactly what you&apos;re buying. If you ever
              do want a full restoration on a thick-veneer engineered floor, our{" "}
              <Link href="/refinishing" className="text-gold font-semibold hover:underline">
                refinishing service
              </Link>{" "}
              can bring it back to life.
            </p>
            <p className="text-warm-grey text-lg leading-relaxed">
              Stability is the other reason engineered hardwood wins in so many
              Toronto homes. Wood naturally takes on and releases moisture with
              the seasons; a solid board expands across its width in a humid July
              and shrinks in a bone-dry February when the furnace runs. In a
              condo over concrete, or a basement that sits against the ground,
              those swings are amplified. The alternating plies in engineered
              hardwood resist that movement, which is why it can be installed in
              wider planks, over more subfloor types, and in rooms that solid wood
              simply cannot handle.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Species */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Wood Selection
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Species We Carry
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

            {/* Install Methods Table */}
            <div>
              <h3 className="font-playfair text-2xl text-charcoal mb-4">
                Installation Methods
              </h3>
              <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
                <table className="w-full text-sm">
                  <thead className="bg-charcoal text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Method
                      </th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        How It Works
                      </th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {installRows.map((row, i) => (
                      <tr
                        key={row.method}
                        className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                      >
                        <td className="px-4 py-3 font-semibold text-charcoal">
                          {row.method}
                        </td>
                        <td className="px-4 py-3 text-warm-grey">{row.how}</td>
                        <td className="px-4 py-3 text-warm-grey">
                          {row.bestFor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12 space-y-5">
            <p className="text-warm-grey text-lg leading-relaxed">
              White and European oak remain the most requested species in Toronto
              by a wide margin. Oak takes stain predictably and works in
              everything from light, wire-brushed Scandinavian looks to deep,
              dramatic custom colours — which is why you&apos;ll see it in nearly
              every new condo and renovated home around{" "}
              <Link href="/locations/midtown-toronto" className="text-gold font-semibold hover:underline">
                Midtown Toronto
              </Link>{" "}
              and{" "}
              <Link href="/locations/downtown-toronto" className="text-gold font-semibold hover:underline">
                Downtown Toronto
              </Link>
              . Walnut brings warmth and a softer, more luxurious feel; maple and
              ash suit bright, minimalist interiors; and hickory delivers bold
              character and exceptional hardness for busy households.
            </p>
            <p className="text-warm-grey text-lg leading-relaxed">
              Matching the installation method to your subfloor is just as
              important as choosing the species. A floating click floor is fast,
              clean, and forgiving over a concrete slab — ideal for a condo or
              basement. A glue-down install gives the most solid, quiet feel
              underfoot and is the preferred approach over radiant heat. A
              nail-down install suits thicker engineered planks over a plywood
              subfloor in above-grade rooms. We&apos;ll recommend the right method
              once we&apos;ve seen your space and tested the subfloor — homeowners
              in{" "}
              <Link href="/locations/leaside" className="text-gold font-semibold hover:underline">
                Leaside
              </Link>{" "}
              and across the city rely on us to get this detail right.
            </p>
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
              How Engineered Hardwood Installation Works
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
              Engineered Hardwood FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving{" "}
            <Link href="/locations/leaside" className="text-gold font-semibold hover:underline">Leaside</Link>,{" "}
            <Link href="/locations/midtown-toronto" className="text-gold font-semibold hover:underline">Midtown Toronto</Link>,{" "}
            <Link href="/locations/downtown-toronto" className="text-gold font-semibold hover:underline">Downtown Toronto</Link>{" "}
            and all of Toronto.
          </p>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <CTABanner
        title="Ready for Real Wood Floors That Last?"
        subtitle="Visit our Bathurst Street showroom or book a free in-home consultation. Toronto's most trusted flooring experts since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
