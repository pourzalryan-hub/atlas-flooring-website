import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTABanner from "@/components/CTABanner";
import { projects, getProject } from "@/lib/projects";
import { getLocation } from "@/lib/locations";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const description = `${project.type} project in ${project.area}, Toronto: ${project.product}, ${project.scope}. See how Atlas Rug & Design Centre completed it.`;
  return {
    title: `${project.title} | Atlas Rug & Design Centre`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Atlas Rug & Design Centre`,
      description,
      url: `https://atlasrugflooring.com/projects/${project.slug}`,
      siteName: "Atlas Rug & Design Centre",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const location = getLocation(project.locationSlug);
  const otherProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <main className="font-lato">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-charcoal opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${project.imageSrc}')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <nav className="mb-6">
            <ol className="flex items-center gap-2 font-lato text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30">›</li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-gold transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li className="text-white/30">›</li>
              <li className="text-gold">{project.area}</li>
            </ol>
          </nav>
          <span className="inline-block bg-gold text-white text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4">
            {project.type} · {project.area}
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl text-white max-w-3xl leading-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Overview card */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Area", value: project.area },
              { label: "Type", value: project.type },
              { label: "Product", value: project.product },
              { label: "Scope", value: project.scope },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-2 font-lato">
                  {item.label}
                </p>
                <p className="font-lato text-charcoal font-semibold">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-100 bg-stone-200">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Challenge / Solution / Results */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              The Challenge
            </p>
            <h2 className="font-playfair text-3xl text-charcoal mb-4">
              What the Project Called For
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Solution
            </p>
            <h2 className="font-playfair text-3xl text-charcoal mb-4">
              How We Approached It
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Our Process
          </p>
          <h2 className="font-playfair text-3xl text-charcoal mb-8">
            Step by Step
          </h2>
          <ol className="space-y-5">
            {project.process.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gold flex items-center justify-center font-playfair text-white font-bold">
                  {i + 1}
                </span>
                <p className="text-warm-grey text-lg leading-relaxed pt-1">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Results */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            The Results
          </p>
          <h2 className="font-playfair text-3xl text-charcoal mb-4">
            The Finished Floor
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed">
            {project.results}
          </p>
        </div>
      </section>

      {/* Related links */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl text-charcoal mb-8 text-center">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href={project.relatedService}
              className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-semibold uppercase text-gold mb-2 tracking-wide">
                Service
              </p>
              <p className="font-playfair text-lg text-charcoal">
                {project.type} →
              </p>
            </Link>
            {location && (
              <Link
                href={project.relatedLocation}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-semibold uppercase text-gold mb-2 tracking-wide">
                  Location
                </p>
                <p className="font-playfair text-lg text-charcoal">
                  Flooring in {location.name} →
                </p>
              </Link>
            )}
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-semibold uppercase text-gold mb-2 tracking-wide">
                  Project
                </p>
                <p className="font-playfair text-lg text-charcoal">
                  {p.title} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Start Your Own Project?"
        subtitle="Visit our showroom or book a free in-home consultation. Toronto's trusted flooring experts since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
