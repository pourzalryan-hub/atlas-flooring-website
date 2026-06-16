import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import ProjectsGrid from "./ProjectsGrid";
import { projects, projectTypes } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Flooring Projects & Portfolio Toronto | Atlas Rug & Design Centre",
  description:
    "Browse real flooring projects by Atlas Rug & Design Centre across Toronto — hardwood, carpet, stair runners, luxury vinyl, laminate, refinishing and commercial.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndexPage() {
  return (
    <main className="font-lato">
      <PageHero
        title="Our Flooring Projects"
        subtitle="Real installations in real Toronto homes and businesses. Explore our work by flooring type."
        breadcrumb="Projects"
        imageSrc="/images/hardwood-hero.jpg"
      />

      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Portfolio
            </p>
            <h2 className="font-playfair text-4xl text-charcoal mb-4">
              A Selection of Our Work
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed max-w-2xl mx-auto">
              From wool stair runners in Forest Hill to commercial vinyl in
              downtown offices, here's a sample of the flooring projects we've
              completed across Toronto.
            </p>
          </div>

          <ProjectsGrid projects={projects} types={projectTypes} />
        </div>
      </section>

      <CTABanner
        title="Imagine What We Could Do for Your Space"
        subtitle="Visit our showroom or book a free in-home consultation. Toronto's trusted flooring experts since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
