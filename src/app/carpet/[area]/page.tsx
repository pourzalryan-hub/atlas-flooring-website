import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import FaqSchema from "@/components/FaqSchema";
import { carpetAreas, getCarpetArea } from "@/lib/carpet-areas";

export function generateStaticParams() {
  return carpetAreas.map((a) => ({ area: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { area: string };
}): Metadata {
  const area = getCarpetArea(params.area);
  if (!area) return {};
  return {
    title: { absolute: `${area.metaTitle} | Atlas Rug & Design Centre` },
    description: area.metaDescription,
    alternates: { canonical: `/carpet/${area.slug}` },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `https://atlasrugflooring.com/carpet/${area.slug}`,
      siteName: "Atlas Rug & Design Centre",
      type: "website",
    },
  };
}

export default function CarpetAreaPage({
  params,
}: {
  params: { area: string };
}) {
  const area = getCarpetArea(params.area);
  if (!area) notFound();

  return (
    <main className="font-lato">
      <FaqSchema items={area.faq} />

      {/* Hero */}
      <PageHero
        title={`Carpet in ${area.name}`}
        subtitle={`In-stock carpet from our own stock — no supplier delays. Supplied and professionally installed across ${area.name} since 1959.`}
        breadcrumb={`Carpet in ${area.name}`}
        breadcrumbHref={`/carpet/${area.slug}`}
        imageSrc="/images/carpet-hero.jpg"
      />

      {/* Conversion band */}
      <section className="bg-charcoal border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <p className="text-gold font-semibold text-xs uppercase tracking-[0.15em] mb-2">
              Carpet Store &amp; Installation · {area.name}
            </p>
            <h2 className="font-playfair text-2xl md:text-3xl text-white mb-2">
              Carpet From Our Own Stock, Professionally Installed
            </h2>
            <p className="text-stone-300 text-sm">
              Free in-home measure · written, itemized quotes · family-run since 1959.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href="tel:4165333366"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-white font-semibold rounded hover:bg-opacity-90 transition-colors text-lg"
            >
              Call (416) 533-3366
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold rounded hover:border-gold hover:text-gold transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato text-center">
            Serving {area.name} Since 1959
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-charcoal mb-6 text-center">
            Your Local Carpet Store in {area.name}
          </h2>
          {area.intro.map((p, i) => (
            <p key={i} className="text-warm-grey text-lg leading-relaxed mb-5">
              {p}
            </p>
          ))}
          <div className="bg-white border-l-4 border-gold rounded-r-lg p-6 mt-8">
            <p className="text-charcoal font-lato leading-relaxed">
              <span className="font-semibold">In {area.name}:</span> {area.localAngle}
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl text-charcoal mb-8 text-center">
            Carpet Supply &amp; Installation in {area.name}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "Every Fibre & Style", b: "Nylon for durability, wool for premium comfort, polyester for stain resistance — in plush, textured, and loop styles to suit any room." },
              { t: "From Our Own Stock", b: "Because we warehouse our own carpet, there are no long supplier delays. Choose what's in stock and have it installed, typically within one to two weeks." },
              { t: "One Honest Price", b: "Your written, itemized quote covers carpet, underpad, installation, and removal of the old carpet — no vague estimates or surprise add-ons." },
            ].map((c) => (
              <div key={c.t} className="bg-off-white rounded-2xl p-6 border border-stone-100">
                <h3 className="font-playfair text-xl text-charcoal mb-2">{c.t}</h3>
                <p className="text-warm-grey text-sm leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/carpet" className="text-gold font-semibold hover:underline">
              Explore our carpet range →
            </Link>
            <Link href="/carpet/samples" className="text-gold font-semibold hover:underline">
              Browse carpet samples →
            </Link>
            <Link href="/stair-runners" className="text-gold font-semibold hover:underline">
              Stair runners →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl text-charcoal mb-8 text-center">
            Carpet in {area.name} — Common Questions
          </h2>
          <FAQAccordion items={area.faq} />

          <p className="text-center text-warm-grey mt-10">
            Also serving{" "}
            {area.nearbyAreas.map((n, i) => (
              <span key={n}>
                {n}
                {i < area.nearbyAreas.length - 1 ? ", " : ""}
              </span>
            ))}{" "}
            and the wider GTA.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title={`Ready for New Carpet in ${area.name}?`}
        subtitle="Book a free in-home measure or visit our Bathurst Street showroom. In-stock carpet, professionally installed, one honest price."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
