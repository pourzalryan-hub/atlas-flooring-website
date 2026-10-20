import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Medical & Healthcare Flooring Toronto",
  description:
    "Medical clinic and healthcare flooring in Toronto. Commercial luxury vinyl tile (LVT), low-seam and easy-clean surfaces for infection control. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/commercial/medical-clinics" },
  openGraph: {
    title: "Medical & Healthcare Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Infection-control flooring for Toronto clinics, dental and medical suites. Commercial LVT and durable, easy-clean surfaces.",
    url: "https://atlasrugflooring.com/commercial/medical-clinics",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical & Healthcare Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Infection-control flooring for Toronto clinics and medical suites from Atlas Rug & Design Centre.",
  },
};

const productRows = [
  {
    product: "Commercial LVT",
    bestFor: "Exam rooms, treatment areas, corridors",
    why: "Waterproof, non-porous surface that wipes clean",
  },
  {
    product: "Rigid-Core (SPC) Vinyl",
    bestFor: "Wet areas, labs, high-moisture rooms",
    why: "Dimensionally stable and fully waterproof underfoot",
  },
  {
    product: "Coved Vinyl Wall Base",
    bestFor: "Perimeters, washrooms, sterile-adjacent",
    why: "Curves the floor-to-wall joint so mops reach every edge",
  },
  {
    product: "Anti-Fatigue Resilient",
    bestFor: "Standing stations, dental, pharmacy benches",
    why: "Eases strain on staff who stand through long shifts",
  },
];

const steps = [
  {
    title: "Needs Review",
    description:
      "We walk the clinic room by room, separating sterile and wet zones from waiting and office areas so each space gets the right surface.",
  },
  {
    title: "Specification",
    description:
      "We spec commercial-grade luxury vinyl tile and coved vinyl base to match your infection-control needs, then itemize materials, prep, and installation in a written quote.",
  },
  {
    title: "Subfloor Prep",
    description:
      "Clean, flat, dry subfloors are non-negotiable in healthcare. We moisture-test and level so the tiles sit tight and the floor stays watertight for years.",
  },
  {
    title: "Off-Hours Install",
    description:
      "We schedule around patient hours, evenings, and weekends to keep the clinic running, and we contain dust and odour throughout the work.",
  },
  {
    title: "Walkthrough & Care Plan",
    description:
      "We confirm the floor and coved base meet spec, then hand cleaning staff a maintenance plan matched to the product so the surface keeps performing.",
  },
];

const faqItems = [
  {
    q: "What flooring do you recommend for a medical clinic?",
    a: "For most clinic spaces we recommend commercial-grade luxury vinyl tile (LVT). It is waterproof, non-porous, and stands up to constant disinfecting, so it stays easy to keep clean in exam rooms, treatment areas, and corridors. We choose products with a reinforced wear layer rated for healthcare traffic, lay them with tight seams, and finish the perimeter with a coved vinyl base so the floor-to-wall joint is easy to wipe down.",
  },
  {
    q: "How do you keep the floor easy to clean at the edges?",
    a: "We finish the perimeter with a coved vinyl wall base that curves the floor-to-wall joint instead of leaving a hard 90-degree corner where dirt and moisture collect. That softens the edge so a mop reaches cleanly along every wall — which matters most in washrooms, labs, and wet areas.",
  },
  {
    q: "Can you keep seams tight to limit infection risk?",
    a: "Yes, and it is one of the things we plan for carefully. We lay out the tile to keep seams tight and well-placed, choose products built for cleanability and constant disinfecting, and finish the perimeter with a coved base so the floor reads as one easy-clean surface from wall to wall.",
  },
  {
    q: "Do you offer anti-fatigue flooring for clinical staff?",
    a: "We do. Staff at standing stations — dental operatories, pharmacy benches, lab counters, reception — spend hours on their feet, and the wrong floor punishes them for it. We can specify resilient products and underlayments with anti-fatigue properties in those zones while keeping the easy-clean performance the room still needs.",
  },
  {
    q: "What regulatory considerations affect medical flooring?",
    a: "Healthcare flooring decisions touch infection prevention and control practices, slip resistance for patient and staff safety, fire and smoke ratings for the assembly, and the cleaning chemicals your protocols require. We are not a substitute for your IPAC lead or facility consultant, but we specify products with the documentation — slip ratings, chemical resistance, fire performance — that those reviews ask for, so approvals go smoothly.",
  },
  {
    q: "Can you install without shutting the clinic down?",
    a: "Almost always. Most of our healthcare work happens in operating clinics, so we phase the job room by room, work evenings and weekends, and contain each active area so the rest of the practice keeps seeing patients. We plan the sequence with your office manager up front so there is always a clean, usable path for patients and staff.",
  },
];

export default function MedicalClinicsPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Medical Clinic & Healthcare Flooring Toronto"
        subtitle="Durable, easy-clean flooring built for infection control — installed around your patient hours."
        breadcrumb="Medical & Healthcare"
        imageSrc="/images/commercial-medical-clinics-hero.jpeg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Healthcare Flooring Specialists
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Flooring That Cleans Up After a Hard Day
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            In a clinic, the floor is part of your infection-control program. It
            has to be non-porous, easy to disinfect, and durable enough for
            constant cleaning — while still being comfortable for staff who stand
            on it through twelve-hour shifts. Since 1959, Atlas Rug &amp; Design
            Centre has supplied and installed healthcare flooring across Toronto:
            dental offices, family medical suites, physio and rehab spaces,
            specialist clinics, and labs.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We zone every clinic before we quote it. Wet and high-traffic rooms
            get waterproof commercial luxury vinyl tile with a coved base at the
            walls; waiting rooms and offices can take a warmer wood-look vinyl;
            standing stations get anti-fatigue support. The result is a floor
            that meets your IPAC expectations without feeling like a hospital
            corridor.
          </p>
        </div>
      </section>

      {/* 3. Products */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Matched to the Room
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Healthcare Flooring Options
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Best For
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Why It Works
                  </th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((row, i) => (
                  <tr
                    key={row.product}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.product}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">{row.bestFor}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mt-8 max-w-4xl mx-auto text-center">
            Most clinics end up combining products — hard-wearing LVT in the
            clinical core, a warmer wood-look{" "}
            <Link href="/vinyl" className="text-gold font-semibold hover:underline">
              luxury vinyl
            </Link>{" "}
            in patient-facing rooms — so each space gets the right balance of
            hygiene and comfort.
          </p>
        </div>
      </section>

      {/* 4. Process */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How a Clinic Install Works
            </h2>
          </div>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Healthcare Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving clinics across Toronto and the GTA. See our full{" "}
            <Link href="/commercial" className="text-gold font-semibold hover:underline">
              commercial flooring
            </Link>{" "}
            services.
          </p>
        </div>
      </section>

      <ReviewsSection service="commercial" />

      {/* 6. CTA Banner */}
      <CTABanner
        title="Upgrading Your Clinic Floors?"
        subtitle="Book a free assessment and we'll zone your space and spec the right surface for each room. Trusted by Toronto businesses since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
