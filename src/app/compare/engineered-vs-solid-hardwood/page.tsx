import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import FaqSchema from "@/components/FaqSchema";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Engineered vs Solid Hardwood Toronto | Which Is Better?",
  description:
    "Engineered vs solid hardwood in Toronto: stability, radiant-heat and basement compatibility, refinishing, cost per sq ft and resale — an honest contractor's breakdown since 1959.",
  alternates: { canonical: "/compare/engineered-vs-solid-hardwood" },
  openGraph: {
    title: "Engineered vs Solid Hardwood Toronto | Which Is Better?",
    description:
      "A contractor's comparison of engineered and solid hardwood for Toronto homes, condos and basements — stability, refinishing, cost and where each belongs.",
    url: "https://atlasrugflooring.com/compare/engineered-vs-solid-hardwood",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

const comparisonRows = [
  {
    factor: "Construction",
    engineered: "Real wood veneer over plywood core",
    solid: "Single solid plank of wood throughout",
  },
  {
    factor: "Stability (humidity)",
    engineered: "Excellent — resists cupping & gapping",
    solid: "Moves with seasonal humidity",
  },
  {
    factor: "Radiant heat",
    engineered: "Compatible — recommended",
    solid: "Not recommended — expands & contracts",
  },
  {
    factor: "Below grade / basements",
    engineered: "Yes, with moisture testing",
    solid: "No — moisture risk",
  },
  {
    factor: "Refinishing",
    engineered: "1–3 times (depends on veneer)",
    solid: "Many times over decades",
  },
  {
    factor: "Installed cost (per sq ft)",
    engineered: "$9–$15",
    solid: "$12–$18+",
  },
  {
    factor: "Best for",
    engineered: "Condos, basements, radiant heat",
    solid: "Main floors, long-term family homes",
  },
];

const faqItems = [
  {
    q: "Is engineered hardwood real wood?",
    a: "Yes. The top layer you walk on and see is genuine hardwood — oak, maple, walnut, the same species as solid. The difference is what's underneath: instead of more of the same wood, engineered uses cross-layered plywood that keeps the plank dimensionally stable. It's real wood, just built smarter for tricky conditions.",
  },
  {
    q: "Can engineered hardwood be refinished?",
    a: "Usually once or twice, sometimes three times if it has a thick wear layer of 3mm or more. Thin-veneer engineered floors can only be screened and recoated, not fully sanded. Solid hardwood can be sanded many more times, which is its main long-term advantage.",
  },
  {
    q: "Which is better for a Toronto condo?",
    a: "Engineered, almost always. It's more stable against the dry winter and humid summer swings in condo HVAC, it works over radiant systems, and it floats nicely over concrete with the acoustic underlay condo boards require. See our condo flooring page for the specifics we handle.",
  },
  {
    q: "Can I put solid hardwood in my basement?",
    a: "No — solid wood and below-grade moisture don't mix, and it will cup or gap. Engineered hardwood can go in a basement after we moisture-test the slab and prep it properly. If you want real wood downstairs, engineered is the only safe route.",
  },
  {
    q: "Does engineered hardwood add the same resale value as solid?",
    a: "Close. Buyers see and feel real hardwood underfoot and value it. Solid carries a slight edge in homes where buyers expect to refinish for generations, but a quality engineered floor with a thick veneer is a genuine hardwood floor and is treated as one.",
  },
  {
    q: "Is solid hardwood worth the extra cost?",
    a: "On a main-floor, long-term family home where you'll refinish it a few times over 40 years, yes — the refinishing headroom pays off. In a condo, basement or over radiant heat, paying more for solid actually gets you a worse-performing floor, so engineered is both cheaper and better there.",
  },
];

export default function EngineeredVsSolidPage() {
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
            Engineered vs Solid Hardwood: The Real Differences (And Which to Choose)
          </h1>
          <p className="text-stone-300 text-lg leading-relaxed">
            Both are real hardwood — anyone telling you engineered is &quot;fake&quot; is wrong. The
            choice comes down to where the floor is going and how the wood needs to behave
            there. Here&apos;s how we steer Toronto clients between the two.
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
              Engineered for condos, basements and radiant heat. Solid where it&apos;ll live for generations.
            </h2>
            <p className="text-stone-200 text-lg leading-relaxed">
              If the floor is going in a condo, a basement, or over radiant heating, choose
              engineered — its stable plywood core handles humidity and heat that would cup
              solid wood. For a main-floor family home where longevity matters most and you
              want to refinish it again and again over the decades, solid hardwood is worth
              the premium. Same beautiful wood on top; the right core for the room.
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
              Engineered vs Solid at a Glance
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Factor</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Engineered</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Solid</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.factor}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.engineered}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.solid}</td>
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
            Stability vs Longevity
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            The Trade-Off in Plain Terms
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Solid hardwood is one piece of wood top to bottom, so it can be sanded and
            refinished many times — we still bring 70-year-old solid oak floors back to life
            in Toronto homes. The downside is that solid wood moves: it expands in humid
            summers and shrinks in dry winters, which is why it gaps over radiant heat and
            cups in basements.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Engineered hardwood pins a real wood veneer to a cross-layered plywood core. Those
            opposing layers cancel out most of the movement, so the floor stays flat where
            solid wouldn&apos;t — over{" "}
            <Link href="/condo-flooring" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              condo
            </Link>{" "}
            slabs, in{" "}
            <Link href="/basement-flooring" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              basements
            </Link>, and over radiant systems. You trade away some refinishing life: a thin
            veneer might only handle one recoat, while a 4mm wear layer can take a full sand
            or two.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            See the full range of both in our{" "}
            <Link href="/hardwood" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              hardwood flooring
            </Link>{" "}
            lineup, or read more about{" "}
            <Link href="/engineered-hardwood" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              engineered hardwood
            </Link>{" "}
            specifically.
          </p>
        </div>
      </section>

      {/* When to choose engineered */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Choose Engineered When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Choose Engineered Hardwood
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">You&apos;re in a condo.</strong> More stable against
              HVAC swings and easy to float over concrete with acoustic underlay.
            </li>
            <li>
              <strong className="text-charcoal">It&apos;s going below grade.</strong> The only real-wood
              option that survives basement moisture once the slab is tested.
            </li>
            <li>
              <strong className="text-charcoal">You have radiant heat.</strong> The stable core won&apos;t
              gap and cup the way solid does over warm floors.
            </li>
            <li>
              <strong className="text-charcoal">You want wide planks.</strong> Wide solid boards move a
              lot; engineered holds wide widths flat far better.
            </li>
          </ul>
        </div>
      </section>

      {/* When to choose solid */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Choose Solid When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Choose Solid Hardwood
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">It&apos;s a main-floor, long-term home.</strong> Above
              grade, no radiant heat, and you plan to stay for years.
            </li>
            <li>
              <strong className="text-charcoal">You want maximum refinishing life.</strong> Solid can
              be sanded back to new many times over its decades-long life.
            </li>
            <li>
              <strong className="text-charcoal">You&apos;re matching existing solid floors.</strong> In
              older Toronto homes, solid blends seamlessly with original wood.
            </li>
            <li>
              <strong className="text-charcoal">Resale longevity is the goal.</strong> A solid floor
              outlasts everything else in the renovation.
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
              Engineered vs Solid FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <ReviewsSection service="general" />

      <CTABanner
        title="Engineered or Solid for Your Space?"
        subtitle="Tell us where the floor's going and we'll tell you straight which one performs. Free in-home consultation across Toronto, or visit our Bathurst Street showroom."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
