import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import FaqSchema from "@/components/FaqSchema";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Carpet vs Hardwood Flooring Toronto | Which Is Right for You?",
  description:
    "Carpet vs hardwood flooring in Toronto: real installed pricing, lifespan, maintenance, resale value, comfort and noise — an honest breakdown from a flooring contractor serving Toronto since 1959.",
  alternates: { canonical: "/compare/carpet-vs-hardwood" },
  openGraph: {
    title: "Carpet vs Hardwood Flooring Toronto | Which Is Right for You?",
    description:
      "An honest, contractor's comparison of carpet and hardwood flooring for Toronto homes — cost, lifespan, resale, comfort and the best rooms for each.",
    url: "https://atlasrugflooring.com/compare/carpet-vs-hardwood",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

const comparisonRows = [
  {
    factor: "Installed cost (per sq ft)",
    carpet: "$3.50–$9 (broadloom + pad)",
    hardwood: "$9–$18 (engineered & solid)",
  },
  {
    factor: "Typical lifespan",
    carpet: "8–15 years before replacement",
    hardwood: "30–100 years (refinishable)",
  },
  {
    factor: "Maintenance",
    carpet: "Vacuum often, steam clean yearly",
    hardwood: "Sweep, damp mop, occasional recoat",
  },
  {
    factor: "Resale value",
    carpet: "Neutral to slight negative on main floors",
    hardwood: "Strong positive — buyers expect it",
  },
  {
    factor: "Comfort underfoot",
    carpet: "Soft, warm, forgiving",
    hardwood: "Firm — needs rugs for warmth",
  },
  {
    factor: "Allergies / air quality",
    carpet: "Traps dust, dander, pollen",
    hardwood: "Wipes clean, nothing to trap",
  },
  {
    factor: "Sound",
    carpet: "Absorbs footsteps and echo",
    hardwood: "Reflects sound — louder rooms",
  },
  {
    factor: "Best rooms",
    carpet: "Bedrooms, stairs, basements, playrooms",
    hardwood: "Living, dining, hall, kitchen, main floor",
  },
];

const faqItems = [
  {
    q: "Is hardwood always more expensive than carpet?",
    a: "Upfront, yes — expect $9–$18 a square foot installed for hardwood in Toronto versus $3.50–$9 for good broadloom and pad. But carpet gets replaced two or three times in the lifespan of one hardwood floor, so over 25 years hardwood usually costs less per year and adds resale value carpet never will.",
  },
  {
    q: "Does carpet really hurt my home's resale value?",
    a: "On main-floor living and dining areas in Toronto, yes — buyers in neighbourhoods like Forest Hill and Leaside expect hardwood and mentally subtract the cost of installing it. In bedrooms, carpet is neutral and often preferred. We tell clients to keep hardwood downstairs and use carpet upstairs if budget is tight.",
  },
  {
    q: "Is hardwood a bad idea if someone in the house has allergies?",
    a: "It's usually the better choice. Carpet fibres trap dust, dander and pollen that re-circulate every time someone walks across the room. Hardwood has nothing to hold allergens — a quick sweep or damp mop clears them. If you want softness underfoot, use washable area rugs you can launder.",
  },
  {
    q: "Can I put hardwood on stairs and in bedrooms?",
    a: "You can, and plenty of clients do. But stairs are where carpet earns its keep — it's quieter, safer underfoot and warmer for bare feet first thing in the morning. A common Toronto compromise is hardwood stairs with a wool runner, which gives you the look and the grip.",
  },
  {
    q: "How loud is hardwood compared to carpet?",
    a: "Noticeably louder. Hardwood reflects footsteps and voices, while carpet and its pad absorb both. In condos and second floors this matters — area rugs and quality underlayment help, but if a quiet room is the priority, carpet wins on sound every time.",
  },
  {
    q: "Which lasts longer, carpet or hardwood?",
    a: "Hardwood, by a wide margin. Carpet wears out in 8–15 years depending on traffic and quality. Solid hardwood can be sanded and refinished several times and last the life of the house — we still refinish floors in Toronto homes that were laid in the 1940s.",
  },
];

export default function CarpetVsHardwoodPage() {
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
            Carpet vs Hardwood Flooring: An Honest Answer from a Toronto Flooring Contractor
          </h1>
          <p className="text-stone-300 text-lg leading-relaxed">
            We&apos;ve installed both in Toronto homes since 1959, so we don&apos;t have a dog in
            this fight — we sell and lay carpet and hardwood every week. Here&apos;s the
            advice we actually give clients standing in their living rooms, with real
            installed pricing and no sales spin.
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
              Hardwood downstairs. Carpet in the bedrooms.
            </h2>
            <p className="text-stone-200 text-lg leading-relaxed">
              For main-floor living and dining areas, put in hardwood — it lasts decades,
              cleans up in seconds and is the single flooring upgrade Toronto buyers reward
              at resale. For bedrooms, stairs and basement rec rooms, carpet wins on warmth,
              quiet and cost. The smartest Toronto homes we work in use both, room by room,
              instead of forcing one material everywhere.
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
              Carpet vs Hardwood at a Glance
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Factor</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Carpet</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Hardwood</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.factor}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.carpet}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.hardwood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The real cost story */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            The Money
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            What Each Really Costs Over Time
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Carpet looks cheaper on day one and it is. A decent nylon broadloom with a good
            8–10 lb pad runs about $3.50 to $6 a square foot installed in Toronto, and wool
            or designer lines climb to $9 and up. Hardwood starts around $9 a square foot for
            engineered and runs to $16–$18 for wide-plank solid white oak installed. So on a
            300 square foot living room you&apos;re comparing roughly $1,500 in carpet against
            $3,500–$5,000 in hardwood.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            The catch is what happens after. That carpet is worn flat in the traffic lanes in
            8 to 12 years and you&apos;re paying to do it again. The hardwood gets a light
            sand-and-recoat once a decade for a few hundred dollars a room and keeps going.
            We refinish 1940s and 1950s oak floors across Midtown that have already outlived
            four or five carpets. Spread across 25 years, hardwood is the cheaper floor — it
            just asks for the money up front.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            Resale tips the math further. In houses we work on in{" "}
            <Link href="/locations/forest-hill" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              Forest Hill
            </Link>{" "}
            and Leaside, hardwood on the main floor is simply expected; carpet there reads as
            something the buyer will rip out. Bedrooms are the opposite — nobody discounts a
            house for carpeted bedrooms, and many families prefer it.
          </p>
        </div>
      </section>

      {/* When to choose hardwood */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Choose Hardwood When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Choose Hardwood
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">It&apos;s a main-floor living space.</strong> Living
              rooms, dining rooms, hallways and open-concept kitchens are where hardwood
              looks its best and takes the abuse. See our full{" "}
              <Link href="/hardwood" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
                hardwood flooring options
              </Link>.
            </li>
            <li>
              <strong className="text-charcoal">You&apos;re thinking about resale.</strong> Hardwood is
              the upgrade Toronto buyers pay for. It photographs well and signals a quality
              home.
            </li>
            <li>
              <strong className="text-charcoal">Someone has allergies or asthma.</strong> Nothing to
              trap dust or dander — a damp mop clears the room.
            </li>
            <li>
              <strong className="text-charcoal">You want one floor for decades.</strong> With the
              occasional{" "}
              <Link href="/refinishing" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
                refinishing
              </Link>, a solid floor outlasts the rest of the renovation. Our{" "}
              <Link href="/projects/hardwood-leaside" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
                Leaside hardwood project
              </Link>{" "}
              shows what that looks like done right.
            </li>
          </ul>
        </div>
      </section>

      {/* When to choose carpet */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Choose Carpet When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Choose Carpet
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">It&apos;s a bedroom.</strong> Warm and quiet underfoot
              first thing in the morning, and resale-neutral. Browse our{" "}
              <Link href="/carpet" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
                carpet selection
              </Link>.
            </li>
            <li>
              <strong className="text-charcoal">You have stairs or a young family.</strong> Carpet is
              safer on stairs and forgiving when kids and toys hit the floor.
            </li>
            <li>
              <strong className="text-charcoal">Noise is the enemy.</strong> Carpet and pad absorb
              footsteps and echo better than any hard surface — a real advantage on second
              floors and in condos.
            </li>
            <li>
              <strong className="text-charcoal">The budget is tight right now.</strong> Carpet gets a
              room finished for a third of the cost and buys you time to do hardwood later.
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
              Carpet vs Hardwood FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <ReviewsSection service="general" />

      <CTABanner
        title="Not Sure Which Floor Fits Your Home?"
        subtitle="Book a free in-home consultation. We'll walk your rooms, talk budget, and tell you honestly where hardwood and carpet each make sense — same advice we'd give family."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
