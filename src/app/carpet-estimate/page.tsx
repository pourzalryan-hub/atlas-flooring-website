import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Book a Free Carpet Measure Toronto | Atlas Rug & Design Centre",
  description:
    "Get your exact carpet price the right way — a free in-home measure in Toronto. We bring samples, measure your rooms and stairs, and give you a detailed written quote. Atlas Rug & Design Centre, family-run since 1959.",
  alternates: { canonical: "/carpet-estimate" },
  openGraph: {
    title: "Book a Free Carpet Measure | Atlas Rug & Design Centre",
    description:
      "Free in-home carpet & stairs measure in Toronto. Samples brought to you, exact written quote, no obligation.",
    url: "https://atlasrugflooring.com/carpet-estimate",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

export default function CarpetEstimatePage() {
  return (
    <main className="font-lato">
      <section className="bg-charcoal pt-28 md:pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Free In-Home Measure
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Get Your Exact Carpet Price
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Every room and staircase is different, so we give you a precise price
            the right way — a free in-home measure. We bring the samples, measure
            your space, and hand you a detailed written quote. No obligation.
          </p>
        </div>
      </section>

      <section className="bg-off-white pt-14 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-100 p-5 sm:p-8">
          <LeadForm
            product="Carpet"
            source="Carpet Measure Page"
            heading="Book your free measure"
            subheading="We bring the samples and your exact price to you. No obligation."
            ctaLabel="Book My Free Measure →"
          />
        </div>
      </section>

      <section className="bg-off-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-lato text-warm-grey">
            Prefer to talk it through? Call{" "}
            <a href="tel:4165333366" className="text-gold font-semibold hover:underline">(416) 533-3366</a>{" "}
            or explore our{" "}
            <Link href="/carpet" className="text-gold font-semibold hover:underline">carpet &amp; broadloom</Link>{" "}
            range. Family-run in Toronto since 1959.
          </p>
        </div>
      </section>
    </main>
  );
}
