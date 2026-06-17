import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Flooring Comparison Guides Toronto | Atlas Rug & Design Centre",
  description:
    "Honest flooring comparison guides for Toronto homeowners — carpet vs hardwood, vinyl vs laminate, engineered vs solid, and refinishing vs replacement. Real pricing and contractor advice since 1959.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Flooring Comparison Guides Toronto | Atlas Rug & Design Centre",
    description:
      "Side-by-side flooring comparison guides for Toronto homes, with real installed pricing and honest contractor advice.",
    url: "https://atlasrugflooring.com/compare",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

const guides = [
  {
    href: "/compare/carpet-vs-hardwood",
    title: "Carpet vs Hardwood",
    description:
      "Cost, lifespan, resale and comfort — and which floor belongs in which room.",
  },
  {
    href: "/compare/vinyl-vs-laminate",
    title: "Vinyl vs Laminate",
    description:
      "Why the core material decides it, and where each one outperforms the other.",
  },
  {
    href: "/compare/engineered-vs-solid-hardwood",
    title: "Engineered vs Solid Hardwood",
    description:
      "Stability versus longevity — the right wood for condos, basements and main floors.",
  },
  {
    href: "/compare/refinishing-vs-replacement",
    title: "Refinishing vs Replacement",
    description:
      "How to tell if your floor can be saved, and what each route really costs.",
  },
];

export default function CompareIndexPage() {
  return (
    <main className="font-lato">
      <PageHero
        title="Flooring Comparison Guides"
        subtitle="Straight answers from a Toronto flooring contractor — real pricing, real trade-offs, no sales spin."
        breadcrumb="Compare"
      />

      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Choose With Confidence
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Which Floor Is Right for You?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-8 flex flex-col transition-shadow hover:shadow-md"
              >
                <h3 className="font-playfair text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">
                  {guide.title}
                </h3>
                <p className="text-warm-grey text-base leading-relaxed flex-1">
                  {guide.description}
                </p>
                <span className="mt-6 font-lato font-semibold text-charcoal underline decoration-gold decoration-2 underline-offset-4 group-hover:text-gold transition-colors">
                  Read the guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Still Have Questions?"
        subtitle="Book a free in-home consultation or visit our Bathurst Street showroom. We'll help you pick the right floor for every room — same honest advice we'd give family."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
