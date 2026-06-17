import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import { locations, getLocation } from "@/lib/locations";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return locations.map((loc) => ({ location: loc.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { location: string };
}): Metadata {
  const loc = getLocation(params.location);
  if (!loc) return {};
  return {
    title: loc.seoTitle,
    description: loc.metaDescription,
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: {
      title: loc.seoTitle,
      description: loc.metaDescription,
      url: `https://atlasrugflooring.com/locations/${loc.slug}`,
      siteName: "Atlas Rug & Design Centre",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: loc.seoTitle,
      description: loc.metaDescription,
    },
  };
}

const trustSignals = [
  {
    title: "Family-Owned Since 1959",
    description:
      "More than 65 years serving Toronto homeowners — and still family run, with the accountability that comes with it.",
  },
  {
    title: "Our Own Installers",
    description:
      "Every project is completed by experienced, vetted flooring installers. We oversee every job and stand behind the results.",
  },
  {
    title: "Free In-Home Consultations",
    description:
      "We bring samples to your home, measure precisely, and provide a clear written quote with no pressure.",
  },
  {
    title: "Satisfaction Guaranteed",
    description:
      "We stand behind every installation. If something isn't right, we make it right — full stop.",
  },
];

export default function LocationPage({
  params,
}: {
  params: { location: string };
}) {
  const loc = getLocation(params.location);
  if (!loc) notFound();

  // Nearest project pages — prefer projects in this location, then fill from the list.
  const localProjects = projects.filter((p) => p.locationSlug === loc.slug);
  const otherProjects = projects.filter((p) => p.locationSlug !== loc.slug);
  const featuredProjects = [...localProjects, ...otherProjects].slice(0, 3);

  return (
    <main className="font-lato">
      <PageHero
        title={loc.h1}
        subtitle={loc.description}
        breadcrumb={loc.name}
        imageSrc="/images/hardwood-hero.jpg"
      />

      {/* Intro */}
      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Serving {loc.name}
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Your Local Flooring Experts in {loc.name}
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed">{loc.intro}</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              What We Offer
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Flooring Services in {loc.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loc.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 p-6 bg-off-white hover:shadow-md transition-shadow flex flex-col"
              >
                <h3 className="font-playfair text-xl text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {service.label}
                </h3>
                <p className="text-warm-grey text-sm leading-relaxed flex-1">
                  Professional {service.label.toLowerCase()} supply and
                  installation for {loc.name} homes.
                </p>
                <span className="mt-4 text-gold font-semibold text-sm">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Atlas serves [Location] */}
      <section className="bg-charcoal py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Why Atlas
            </p>
            <h2 className="font-playfair text-4xl text-white">
              Why {loc.name} Homeowners Choose Atlas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trustSignals.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-gold text-lg mt-0.5 flex-shrink-0">◆</span>
                <div>
                  <h3 className="font-lato font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="font-lato text-sm text-white/65 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {loc.nearbyAreas.length > 0 && (
            <p className="text-center text-white/60 text-sm mt-12">
              We also serve nearby{" "}
              {loc.nearbyAreas.map((area, i) => {
                const match = locations.find((l) => l.name === area);
                return (
                  <span key={area}>
                    {match ? (
                      <Link
                        href={`/locations/${match.slug}`}
                        className="text-gold hover:underline"
                      >
                        {area}
                      </Link>
                    ) : (
                      area
                    )}
                    {i < loc.nearbyAreas.length - 1 ? ", " : "."}
                  </span>
                );
              })}
            </p>
          )}
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Work
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Recent Projects Near {loc.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-stone-200" />
                <div className="p-6">
                  <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                    {p.type} · {p.area}
                  </span>
                  <h3 className="font-playfair text-lg text-charcoal mt-2 group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              {loc.name} Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={loc.faq} />
        </div>
      </section>

      <CTABanner
        title={`Ready for New Floors in ${loc.name}?`}
        subtitle="Visit our Bathurst Street showroom or book a free in-home consultation. Toronto's most trusted flooring experts since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
