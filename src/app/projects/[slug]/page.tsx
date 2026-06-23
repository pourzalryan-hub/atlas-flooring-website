import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTABanner from "@/components/CTABanner";
import { projects, getProject } from "@/lib/projects";
import { getLocation } from "@/lib/locations";

// Honest, general copy keyed by flooring type. Each project shows the copy for
// its type alongside its photo — no fabricated metrics or invented client stories.
interface TypeContent {
  summary: string;
  approach: string;
  process: string[];
  result: string;
}

const typeContent: Record<string, TypeContent> = {
  "Stair Runners": {
    summary:
      "A well-fitted stair runner adds warmth, softens sound, and makes stairs safer underfoot — all while showing off the staircase rather than hiding it.",
    approach:
      "We help you choose a runner material and width that suits your stairs and how you live, then measure and fit it carefully so the pattern stays straight and the edges sit clean from top to bottom.",
    process: [
      "In-home or in-showroom consultation with runner samples.",
      "Careful measurement of every tread, riser and nosing.",
      "Custom binding to your chosen width and edge finish.",
      "Professional installation with a clean, secure fit.",
    ],
    result:
      "A safer, quieter staircase with a tailored finish that holds up for years.",
  },
  Hardwood: {
    summary:
      "Hardwood brings lasting warmth and value to a home. Whether solid or engineered, the right choice depends on your subfloor, lifestyle and the look you're after.",
    approach:
      "We walk you through species, finish and plank options in the showroom, check your space and subfloor, and arrange professional installation so the floor lays flat, tight and squeak-free.",
    process: [
      "Consultation to choose species, colour and finish.",
      "Assessment of the room and subfloor conditions.",
      "Acclimation of the wood and preparation of the subfloor.",
      "Professional installation and finishing.",
    ],
    result:
      "A beautiful, durable hardwood floor that's built to last and easy to live with.",
  },
  "Luxury Vinyl": {
    summary:
      "Luxury vinyl gives you the look of wood or stone with excellent water resistance and everyday durability — a practical choice for busy homes, basements and rentals.",
    approach:
      "We help you pick the right plank thickness and wear layer for your space, prepare the subfloor properly, and install it for a flat, seamless finish.",
    process: [
      "Consultation to match style and durability to your space.",
      "Subfloor preparation and moisture check.",
      "Precise cutting and layout planning.",
      "Clean, professional installation.",
    ],
    result:
      "A tough, water-resistant floor that looks great and stands up to daily life.",
  },
  Carpet: {
    summary:
      "Carpet adds comfort, warmth and quiet to bedrooms, stairs and living spaces. We carry wool, nylon and polyester options to suit different needs and budgets.",
    approach:
      "We bring samples so you can see colours and textures in your own light, recommend the right underpad, and install with proper stretching so the carpet stays smooth and seams stay hidden.",
    process: [
      "Consultation with carpet and underpad samples.",
      "Measurement and material selection.",
      "Removal of old flooring if needed.",
      "Professional installation with power-stretching.",
    ],
    result:
      "A soft, comfortable floor that feels great underfoot and wears well over time.",
  },
  Laminate: {
    summary:
      "Laminate offers the look of hardwood at a friendlier price, with a hard-wearing surface that handles kids, pets and high-traffic areas well.",
    approach:
      "We help you choose a thickness and wear rating suited to the room, prepare the subfloor, and install it as a clean, continuous floor with proper transitions.",
    process: [
      "Consultation to choose style and durability.",
      "Subfloor preparation and underlay.",
      "Layout planning for a natural look.",
      "Professional click-lock installation.",
    ],
    result:
      "A practical, great-looking floor that's easy to maintain and built for daily use.",
  },
  Refinishing: {
    summary:
      "Refinishing brings tired hardwood back to life — often a smarter, more affordable choice than replacing floors that still have plenty of life left.",
    approach:
      "We assess the condition of your existing wood, then sand, repair and refinish it in the colour and sheen you want, keeping dust and disruption to a minimum.",
    process: [
      "Assessment of the existing hardwood.",
      "Sanding and any necessary board repairs.",
      "Staining to your chosen colour.",
      "Sealing with a durable protective finish.",
    ],
    result:
      "Restored floors that look fresh again — without the cost of a full replacement.",
  },
  Commercial: {
    summary:
      "Commercial spaces need flooring that looks professional and holds up to heavy traffic. We work with businesses and property managers on durable, low-maintenance solutions.",
    approach:
      "We help specify the right product for your space and budget, then schedule installation around your operating hours to keep disruption to a minimum.",
    process: [
      "Site consultation and product specification.",
      "Scheduling around your business hours.",
      "Subfloor preparation.",
      "Efficient, professional installation.",
    ],
    result:
      "A hard-wearing, professional finish installed with minimal downtime.",
  },
};

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
  const description = `${project.type} flooring in ${project.area}, Toronto. Premium flooring supply and installation by Atlas Rug & Design Centre since 1959.`;
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
  const content = typeContent[project.type] ?? typeContent.Hardwood;
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
          <div className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Area", value: project.area },
              { label: "Type", value: project.type },
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

      {/* About this type of work */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              About This Work
            </p>
            <h2 className="font-playfair text-3xl text-charcoal mb-4">
              {project.type} by Atlas
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed">
              {content.summary}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Approach
            </p>
            <h2 className="font-playfair text-3xl text-charcoal mb-4">
              How We Work
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed">
              {content.approach}
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
            {content.process.map((step, i) => (
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
            {content.result}
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
