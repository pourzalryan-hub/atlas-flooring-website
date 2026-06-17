import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import FaqSchema from "@/components/FaqSchema";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Vinyl vs Laminate Flooring Toronto | Which Should You Choose?",
  description:
    "Vinyl (LVP) vs laminate flooring in Toronto: waterproofing, durability, cost per sq ft installed, feel underfoot and the best rooms for each — straight from a flooring contractor since 1959.",
  alternates: { canonical: "/compare/vinyl-vs-laminate" },
  openGraph: {
    title: "Vinyl vs Laminate Flooring Toronto | Which Should You Choose?",
    description:
      "A contractor's comparison of luxury vinyl plank and laminate for Toronto homes — water resistance, cost, durability and where each belongs.",
    url: "https://atlasrugflooring.com/compare/vinyl-vs-laminate",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

const comparisonRows = [
  {
    factor: "Water resistance",
    vinyl: "Fully waterproof core",
    laminate: "Water-resistant at best — swells if soaked",
  },
  {
    factor: "Installed cost (per sq ft)",
    vinyl: "$5–$11 (LVP / SPC)",
    laminate: "$4–$8 (8–12mm)",
  },
  {
    factor: "Durability",
    vinyl: "Dent-prone but scratch-tough; great wear layer",
    laminate: "Very hard surface, top-tier scratch resistance",
  },
  {
    factor: "Feel & sound",
    vinyl: "Softer, warmer, quieter underfoot",
    laminate: "Harder, can sound hollow without good pad",
  },
  {
    factor: "Best rooms",
    vinyl: "Bathrooms, basements, kitchens, condos",
    laminate: "Living rooms, bedrooms, halls (dry areas)",
  },
  {
    factor: "Refinishing",
    vinyl: "No — replace planks if damaged",
    laminate: "No — replace planks if damaged",
  },
];

const faqItems = [
  {
    q: "What's the actual difference between vinyl and laminate?",
    a: "Laminate is a high-density fibreboard (wood) core with a printed photo layer under a tough wear coat. Vinyl plank (LVP/SPC) is built on a plastic or stone-composite core. The core is the whole story: wood swells when it gets wet, plastic doesn't. That's why vinyl is waterproof and laminate isn't.",
  },
  {
    q: "Is vinyl really waterproof or just water-resistant?",
    a: "Quality LVP and SPC are genuinely waterproof — the plank itself won't swell if water sits on it. That said, water can still get under floating floors at the edges, so in a full bathroom we still seal the perimeter. Laminate is only water-resistant; standing water works into the seams and the core puffs up permanently.",
  },
  {
    q: "Which is cheaper, vinyl or laminate?",
    a: "Laminate is usually a touch cheaper — $4–$8 a square foot installed in Toronto versus $5–$11 for vinyl. But the gap is small, and choosing on price alone is how people end up with swollen laminate in a basement. Match the product to the room first, then compare price within that.",
  },
  {
    q: "Which one feels better to walk on?",
    a: "Vinyl. It's slightly softer and warmer underfoot and tends to sound quieter. Laminate is harder and can sound hollow if it's installed over a cheap pad or an uneven subfloor. A good underlayment narrows the difference but vinyl still has the edge on comfort.",
  },
  {
    q: "Can I put laminate in a basement?",
    a: "We don't recommend it. Toronto basements deal with humidity and the occasional water event, and laminate's wood core can't take that. Use vinyl below grade — see our basement flooring page. Laminate is the right call upstairs in dry living areas.",
  },
  {
    q: "Which is better for a condo?",
    a: "Usually vinyl, because it's quieter and most condo boards have strict sound-transmission rules that vinyl with the right acoustic underlay passes more easily. We handle the board paperwork and underlay specs as part of condo installs.",
  },
];

export default function VinylVsLaminatePage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />

      {/* Hero / Intro */}
      <section className="bg-charcoal py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4 font-lato">
            Comparison Guide
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-6 leading-tight">
            Vinyl vs Laminate Flooring: What Toronto Homeowners Need to Know
          </h1>
          <p className="text-stone-300 text-lg leading-relaxed">
            These two get mixed up constantly, and the wrong pick shows up fast — usually as
            a swollen laminate plank in a basement that should have been vinyl. Here&apos;s how
            we decide between them on Toronto jobs, room by room.
          </p>
        </div>
      </section>

      {/* Verdict */}
      <section className="bg-charcoal py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-gold/40 rounded-2xl p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              The Verdict
            </p>
            <h2 className="font-playfair text-3xl text-gold mb-4">
              Vinyl anywhere water lives. Laminate for dry rooms on a budget.
            </h2>
            <p className="text-stone-200 text-lg leading-relaxed">
              Put luxury vinyl plank in bathrooms, basements and kitchens — anywhere a spill,
              a leak or humidity is on the table — because its core is waterproof and laminate&apos;s
              isn&apos;t. For dry living areas, bedrooms and hallways where you want a hard-wearing
              wood look for less money, laminate is an excellent, slightly cheaper choice. The
              core material decides it, not the picture printed on top.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Side by Side
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Vinyl vs Laminate at a Glance
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Factor</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Vinyl (LVP/SPC)</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Laminate</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.factor}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.vinyl}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.laminate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            The Core Is Everything
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            Why the Material Underneath Decides It
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Both floors look like wood from above — the difference is what&apos;s holding the
            picture up. Laminate&apos;s core is compressed wood fibre, so it&apos;s rock-hard and
            extremely scratch-resistant, but it drinks water. One forgotten dishwasher leak
            and the seams swell into permanent ridges you can feel through your socks.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Vinyl&apos;s core is plastic or stone-composite, so water does nothing to it. It&apos;s a
            little softer underfoot, a little quieter, and a little more dent-prone under heavy
            point loads like a fridge leg — but in a Toronto{" "}
            <Link href="/basement-flooring" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              basement
            </Link>{" "}
            or bathroom that trade-off is a no-brainer.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            Price is close enough that it shouldn&apos;t drive the decision. Pick the room first.
            Browse our{" "}
            <Link href="/vinyl" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              luxury vinyl
            </Link>{" "}
            and{" "}
            <Link href="/laminate" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              laminate
            </Link>{" "}
            ranges to see the looks available in each.
          </p>
        </div>
      </section>

      {/* When to choose vinyl */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Choose Vinyl When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Choose Vinyl (LVP)
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">Water is in play.</strong> Bathrooms, kitchens,
              laundry rooms, mudrooms — the waterproof core is the whole point.
            </li>
            <li>
              <strong className="text-charcoal">It&apos;s a basement.</strong> Below-grade humidity and
              the odd water event call for vinyl every time. See our{" "}
              <Link href="/basement-flooring" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
                basement flooring
              </Link>{" "}
              guidance.
            </li>
            <li>
              <strong className="text-charcoal">You&apos;re in a condo.</strong> Quieter underfoot and
              easier to pass board sound rules. See our{" "}
              <Link href="/condo-flooring" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
                condo flooring
              </Link>{" "}
              page.
            </li>
            <li>
              <strong className="text-charcoal">Comfort matters.</strong> Softer and warmer underfoot
              than laminate, with less hollow sound.
            </li>
          </ul>
        </div>
      </section>

      {/* When to choose laminate */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Choose Laminate When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Choose Laminate
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">The room stays dry.</strong> Living rooms, bedrooms
              and hallways above grade are laminate&apos;s home turf.
            </li>
            <li>
              <strong className="text-charcoal">Scratch resistance is the priority.</strong> Dogs,
              kids and heavy furniture — a good AC4/AC5 laminate shrugs them off.
            </li>
            <li>
              <strong className="text-charcoal">You want a wood look for less.</strong> A thicker
              12mm laminate looks and feels convincingly like hardwood at a lower cost.
            </li>
            <li>
              <strong className="text-charcoal">Budget is the deciding factor.</strong> Laminate
              typically lands a dollar or two a square foot under comparable vinyl.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Vinyl vs Laminate FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <ReviewsSection service="general" />

      <CTABanner
        title="Picking Between Vinyl and Laminate?"
        subtitle="Bring your floor plan to our Bathurst Street showroom or book a free in-home quote. We'll match the right product to each room — no upselling, just what works."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
