import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Medical & Healthcare Flooring Toronto | Atlas Rug & Design Centre",
  description:
    "Medical clinic and healthcare flooring in Toronto. Homogeneous sheet vinyl, LVT, low-seam and easy-clean surfaces for infection control. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/commercial/medical-clinics" },
  openGraph: {
    title: "Medical & Healthcare Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Infection-control flooring for Toronto clinics, dental and medical suites. Homogeneous sheet vinyl, LVT and seamless, easy-clean surfaces.",
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
    product: "Homogeneous Sheet Vinyl",
    bestFor: "Exam rooms, procedure areas, corridors",
    why: "Heat-welded seams create a near-seamless, non-porous surface",
  },
  {
    product: "Sheet Vinyl with Flash Cove",
    bestFor: "Wet areas, sterile rooms, labs",
    why: "Floor turns up the wall — no dirt-trapping corner to scrub",
  },
  {
    product: "Commercial LVT",
    bestFor: "Waiting rooms, reception, offices",
    why: "Warmer, residential look with tight seams and easy cleaning",
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
      "We walk the clinic room by room, separating sterile and wet zones from waiting and office areas so each space gets the right surface and seam strategy.",
  },
  {
    title: "Specification",
    description:
      "We spec homogeneous sheet vinyl, flash-cove detailing, or LVT to match infection-control needs, then itemize materials, prep, and welding in a written quote.",
  },
  {
    title: "Subfloor Prep",
    description:
      "Clean, flat, dry subfloors are non-negotiable in healthcare. We moisture-test and level so seams weld tight and stay watertight for years.",
  },
  {
    title: "Off-Hours Install",
    description:
      "We schedule around patient hours, evenings, and weekends to keep the clinic running, and we contain dust and odour throughout the work.",
  },
  {
    title: "Walkthrough & Care Plan",
    description:
      "We confirm seams and coving meet spec, then hand cleaning staff a maintenance plan matched to the product so the surface keeps performing.",
  },
];

const faqItems = [
  {
    q: "Why is homogeneous sheet vinyl the standard for medical flooring?",
    a: "Homogeneous sheet vinyl is a single, consistent material the full thickness of the floor, installed in large sheets with heat-welded seams. That gives you a near-seamless, non-porous surface with almost nowhere for bacteria, fluids, or dirt to lodge — which is exactly what infection control demands in exam and procedure rooms. The colour runs all the way through, so it wears evenly and hides minor scuffs better than a printed product.",
  },
  {
    q: "What is flash coving and why does a clinic need it?",
    a: "Flash coving carries the sheet flooring up the wall a few inches in a smooth, curved transition instead of stopping at a hard 90-degree corner. That eliminates the floor-to-wall joint where dirt and moisture normally collect and where a mop never quite reaches. In sterile rooms, labs, and wet areas it makes the whole surface wipeable in one pass, which is why it is so common in Toronto healthcare fit-outs.",
  },
  {
    q: "Can you reduce seams to limit infection risk?",
    a: "Yes, and it is one of the most important things we plan for. We lay sheet goods in the widest practical runs to minimize the number of seams, then heat-weld every seam that remains so it becomes a continuous, sealed surface rather than a gap. In high-risk rooms we combine wide-sheet layouts with flash coving so the finished floor reads as one cleanable plane.",
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
        subtitle="Seamless, easy-clean flooring built for infection control — installed around your patient hours."
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
            has to be non-porous, easy to disinfect, and as close to seamless as
            the room allows — while still being comfortable for staff who stand
            on it through twelve-hour shifts. Since 1959, Atlas Rug &amp; Design
            Centre has supplied and installed healthcare flooring across Toronto:
            dental offices, family medical suites, physio and rehab spaces,
            specialist clinics, and labs.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We zone every clinic before we quote it. Sterile and wet rooms get
            homogeneous sheet vinyl with heat-welded seams and flash coving;
            waiting rooms and offices can take a warmer LVT; standing stations get
            anti-fatigue support. The result is a floor that meets your IPAC
            expectations without feeling like a hospital corridor.
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
            Most clinics end up combining products — seamless sheet in the
            clinical core, a warmer{" "}
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
