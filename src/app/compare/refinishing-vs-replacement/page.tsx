import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import FaqSchema from "@/components/FaqSchema";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Floor Refinishing vs Replacement Toronto | Cost & Value Guide",
  description:
    "Refinishing vs replacing hardwood floors in Toronto: cost per sq ft, how to tell if your wood is thick enough to sand, timelines and resale value — honest guidance from a contractor since 1959.",
  alternates: { canonical: "/compare/refinishing-vs-replacement" },
  openGraph: {
    title: "Floor Refinishing vs Replacement Toronto | Cost & Value Guide",
    description:
      "When to refinish and when to replace your floors in Toronto — cost, condition checks, timelines and resale value from a flooring contractor.",
    url: "https://atlasrugflooring.com/compare/refinishing-vs-replacement",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

const comparisonRows = [
  {
    factor: "Cost (per sq ft)",
    refinish: "$3–$6",
    replace: "$9–$18+ (material + install + removal)",
  },
  {
    factor: "Timeline",
    refinish: "2–4 days per main floor",
    replace: "3–7 days plus removal & prep",
  },
  {
    factor: "Requires solid wood?",
    refinish: "Yes — 3mm+ above tongue",
    replace: "No — any condition",
  },
  {
    factor: "Change floor type / colour",
    refinish: "Colour yes, type no",
    replace: "Anything you want",
  },
  {
    factor: "Disruption",
    refinish: "Low with dustless system",
    replace: "Higher — tear-out and dust",
  },
  {
    factor: "Best when",
    refinish: "Wood is solid, thick & structurally sound",
    replace: "Damage, thinning, or you want a new look",
  },
];

const faqItems = [
  {
    q: "How do I know if my floor can be refinished?",
    a: "Two things: it has to be solid wood (or thick-veneer engineered) and there has to be enough material left to sand. We check the depth above the tongue at a vent or doorway — if there's 3mm or more, you've usually got at least one more sand in it. If it's already been sanded paper-thin or the nail heads are showing, it's time to replace.",
  },
  {
    q: "Is refinishing always cheaper than replacing?",
    a: "Almost always — roughly $3–$6 a square foot to refinish versus $9–$18 to replace once you add material, labour and tear-out. If your wood is sound, refinishing is the obvious value play. The only time replacement wins on cost is when the existing floor needs so much board repair that you're halfway to a new floor anyway.",
  },
  {
    q: "Can refinishing change the colour of my floors?",
    a: "Yes — that's one of the best reasons to do it. We routinely take orange-toned 1980s red oak to a deep walnut or a modern matte natural. What refinishing can't do is change the wood species or plank width; for that you need to replace.",
  },
  {
    q: "When should I just replace instead of refinishing?",
    a: "Replace when there's structural damage like rot or water-buckled boards, when the wood is sanded too thin to take another pass, or when you want a different floor entirely — wider planks, a new species, or switching a damp area to vinyl. Throwing money at refinishing a failing floor only delays the inevitable.",
  },
  {
    q: "How long does refinishing take and can I stay home?",
    a: "A typical main floor is 2–4 days including dry time between coats. With a dustless sanding system the mess is minimal and many clients stay in the home, just off the floors being coated. Replacement runs longer because of tear-out, subfloor prep and acclimation.",
  },
  {
    q: "Does refinishing add resale value?",
    a: "Strongly, for the money. Freshly sanded and recoated hardwood photographs beautifully and reads as 'move-in ready' to Toronto buyers, at a fraction of replacement cost. It's one of the highest-return updates we do before a sale.",
  },
];

export default function RefinishingVsReplacementPage() {
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
            Floor Refinishing vs Replacement: When to Refinish and When to Replace
          </h1>
          <p className="text-stone-300 text-lg leading-relaxed">
            Plenty of Toronto homeowners are told to rip out floors that just needed a sand.
            Others spend on refinishing wood that was past saving. Here&apos;s how we tell the
            difference on site — and what each route really costs.
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
              Refinish if the wood is solid and 3mm+ thick. Replace if it&apos;s damaged, too thin, or you want something different.
            </h2>
            <p className="text-stone-200 text-lg leading-relaxed">
              If your floor is real wood, structurally sound and still has 3mm or more of
              sandable material, refinishing gets you a brand-new-looking floor for a third of
              the cost. Replace when there&apos;s structural or water damage, when the boards are
              sanded too thin to take another pass, or when you genuinely want a different
              floor — a new species, wider planks, or switching a wet room to vinyl. Don&apos;t
              pay to refinish a floor that&apos;s already done.
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
              Refinish vs Replace at a Glance
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Factor</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Refinish</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Replace</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.factor}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.refinish}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.replace}</td>
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
            The On-Site Test
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            How We Decide on Your Floor
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            First we pull a floor vent or check at a doorway threshold to read the thickness of
            wood above the tongue. Three millimetres or more and the floor can almost always
            take another sand. We also look for the deal-breakers: water-buckled or cupped
            boards, rot, springy spots that mean subfloor trouble, and floors so thin the nail
            heads are surfacing. Surface scratches, dullness, dated stain and worn traffic
            lanes are all refinishing problems, not replacement problems.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            When the wood passes, refinishing is the clear winner on cost and disruption — our{" "}
            <Link href="/projects/refinishing-annex" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              Annex refinishing project
            </Link>{" "}
            took grimy old fir back to a warm honey tone in a few days without the family
            moving out. See the full process on our{" "}
            <Link href="/refinishing" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              floor refinishing
            </Link>{" "}
            page.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            When it fails — or when you simply want a different look — replacement opens up
            every option. Lay new{" "}
            <Link href="/hardwood" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              hardwood
            </Link>{" "}
            in a fresh species and width, or switch a kitchen or basement to waterproof{" "}
            <Link href="/vinyl" className="text-charcoal underline decoration-gold decoration-2 underline-offset-2 hover:text-gold">
              vinyl
            </Link>{" "}
            where wood never belonged.
          </p>
        </div>
      </section>

      {/* When to refinish */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Refinish When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Refinish
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">The wood is solid and thick enough.</strong> 3mm or
              more above the tongue means at least one more sand.
            </li>
            <li>
              <strong className="text-charcoal">The damage is surface-level.</strong> Scratches, dull
              finish, worn lanes and dated stain all sand away.
            </li>
            <li>
              <strong className="text-charcoal">You want a new colour, not a new floor.</strong>{" "}
              Refinishing can completely change the tone of the same boards.
            </li>
            <li>
              <strong className="text-charcoal">You&apos;re prepping to sell.</strong> High-return,
              move-in-ready look for a fraction of replacement cost.
            </li>
          </ul>
        </div>
      </section>

      {/* When to replace */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Replace When
          </p>
          <h2 className="font-playfair text-4xl text-charcoal mb-6">
            When to Replace
          </h2>
          <ul className="space-y-4 text-warm-grey text-lg leading-relaxed">
            <li>
              <strong className="text-charcoal">There&apos;s structural or water damage.</strong> Rot,
              buckling and springy subfloors need real repair, not a sand.
            </li>
            <li>
              <strong className="text-charcoal">The wood is too thin.</strong> If it&apos;s been sanded
              to the nails, there&apos;s nothing left to work with.
            </li>
            <li>
              <strong className="text-charcoal">You want a different floor.</strong> New species, wider
              planks or a switch to vinyl in a wet room.
            </li>
            <li>
              <strong className="text-charcoal">It&apos;s laminate or thin engineered.</strong> These
              can&apos;t be sanded — damaged planks get replaced, not refinished.
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
              Refinishing vs Replacement FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <ReviewsSection service="general" />

      <CTABanner
        title="Not Sure If Your Floors Can Be Saved?"
        subtitle="We'll check the thickness and condition on site and give you a straight answer — refinish or replace. Free in-home assessment across Toronto."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
