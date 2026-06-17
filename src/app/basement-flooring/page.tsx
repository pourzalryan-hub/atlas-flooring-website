import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title:
    "Basement Flooring Toronto | Waterproof & Moisture-Resistant Options",
  description:
    "Expert basement flooring in Toronto. Waterproof luxury vinyl plank, laminate and moisture-managed carpet — chosen and installed right for below-grade concrete. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/basement-flooring" },
  openGraph: {
    title:
      "Basement Flooring Toronto | Waterproof & Moisture-Resistant Options",
    description:
      "Waterproof and moisture-resistant basement flooring in Toronto — LVP, laminate and properly underpadded carpet, installed over a prepared slab. Atlas Rug & Design Centre since 1959.",
    url: "https://atlasrugflooring.com/basement-flooring",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Basement Flooring Toronto | Waterproof & Moisture-Resistant Options",
    description:
      "Waterproof and moisture-resistant basement flooring in Toronto from Atlas Rug & Design Centre.",
  },
};

const bestOptions = [
  {
    label: "Luxury Vinyl Plank (LVP)",
    tag: "Top Choice",
    tagColor: "bg-gold",
    description:
      "A 100% waterproof core (SPC or WPC) means LVP can handle the occasional spill, a humid summer, or minor seepage without warping, swelling, or harbouring mould. It floats over the slab, looks convincingly like wood or stone, and is warm and quiet underfoot when paired with the right pad. For most Toronto basements, this is where we start.",
  },
  {
    label: "Laminate",
    tag: "Great Value Option",
    tagColor: "bg-charcoal",
    description:
      "Modern laminate has come a long way — today's quality options feature moisture-resistant cores that hold up well in finished basement spaces. Laminate delivers a realistic hardwood look at a very accessible price point and installs quickly as a floating floor. We'll guide you to the right product for your specific basement conditions.",
  },
  {
    label: "Carpet with Moisture-Barrier Pad",
    tag: "Cosiest Underfoot",
    tagColor: "bg-charcoal",
    description:
      "For a finished family room or playroom, carpet adds comfort, warmth, and sound dampening. The key below grade is a moisture-barrier or rubber-backed underpad that keeps the carpet up off the cold slab. A great option for rec rooms and bedrooms where comfort is the priority.",
  },
];

const materialRows = [
  {
    material: "Luxury Vinyl Plank (LVP)",
    suitability: "Excellent — fully waterproof",
    notes: "Best all-round basement floor; floats over a flat, dry slab",
  },
  {
    material: "Laminate",
    suitability: "Good — in finished spaces",
    notes: "Choose quality moisture-resistant options; not recommended in areas prone to water",
  },
  {
    material: "Carpet + Moisture-Barrier Pad",
    suitability: "Good — over a dry slab",
    notes: "Warm and quiet; the underpad must keep it off the concrete",
  },
  {
    material: "Sheet / Tile Vinyl",
    suitability: "Good — waterproof surface",
    notes: "Seams matter; glue-down needs a sound, dry, level slab",
  },
  {
    material: "Solid Hardwood",
    suitability: "Avoid below grade",
    notes: "Cups, gaps and warps with the slab's natural moisture",
  },
  {
    material: "Carpet directly on slab",
    suitability: "Avoid",
    notes: "Traps moisture, invites mould and a musty smell",
  },
];

const steps = [
  {
    title: "Prep & Level",
    description:
      "We grind high spots, fill low spots, and bring the slab flat within tolerance. Cracks are addressed and the floor is cleaned, because every finished material relies on a sound, even base underneath it.",
  },
  {
    title: "Underlay & Prep",
    description:
      "We select and install the right underlay for your floor and basement conditions. The right underlay adds comfort, warmth, and sound insulation — and makes a real difference in how the finished floor feels and performs over time.",
  },
  {
    title: "Install the Finished Floor",
    description:
      "LVP, laminate, or carpet is installed with proper expansion gaps, transitions, and seams done correctly for a below-grade environment.",
  },
  {
    title: "Walkthrough & Care",
    description:
      "We walk every room with you, address any concern on the spot, and leave you with care guidance tailored to a basement — including humidity tips that keep your new floor looking right for years.",
  },
];

const faqItems = [
  {
    q: "What is the best flooring for a basement in Toronto?",
    a: "For most Toronto basements, luxury vinyl plank (LVP) is the best all-round choice because its core is 100% waterproof — it handles humidity swings and minor moisture without warping. Laminate is a great value option for finished basement spaces. Carpet works well in finished rec rooms as long as it sits on a moisture-barrier underpad.",
  },
  {
    q: "Can I install regular laminate or solid hardwood in my basement?",
    a: "Solid hardwood is not recommended below grade — it expands and contracts with the slab's natural moisture, leading to cupping, gapping, and warping. For laminate, we recommend quality moisture-resistant options rather than standard entry-level products. LVP remains the safest and most durable choice for any basement with moisture concerns.",
  },
  {
    q: "Do I need a special underlay for a basement floor?",
    a: "Yes — the right underlay is important in a basement. It adds warmth, cushion, and sound insulation between your finished floor and the cold concrete slab. The specific product depends on the flooring type: LVP, laminate, and carpet each work best with different underlays. We'll recommend what's right for your job.",
  },
  {
    q: "Is carpet a bad idea in a basement?",
    a: "Carpet laid directly on a damp slab is a bad idea — it traps moisture and can develop mould and a musty odour. Carpet installed correctly, over a moisture-barrier or rubber-backed underpad, is perfectly comfortable and a popular choice for family rooms and bedrooms.",
  },
  {
    q: "Will my basement floor be warm?",
    a: "Concrete is cold, but the finished floor doesn't have to be. Floating LVP with a thermal underlay, laminate over a membrane, or carpet with a quality pad all feel dramatically warmer than bare slab. An insulated subfloor membrane adds the most warmth and is worth considering if comfort is a priority.",
  },
  {
    q: "How long does basement flooring installation take?",
    a: "A typical basement of 500–800 sq ft takes one to two days. Prep and levelling work is done first and may add time depending on the condition of the slab. We give you a realistic schedule in your quote so you can plan accordingly.",
  },
];

export default function BasementFlooringPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      <PageHero
        title="Basement Flooring Toronto"
        subtitle="Waterproof and moisture-smart floors for below-grade spaces — chosen and installed right."
        breadcrumb="Basement Flooring"
        imageSrc="/images/vinyl-basement.jpg"
      />

      {/* Intro */}
      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            65+ Years of Expertise
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            A Basement Floor That Lasts Below Grade
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            A basement is the one space in your home where the wrong floor will
            find you out. Below grade, your finished floor sits on a concrete
            slab that is in permanent contact with the earth — and that slab
            holds moisture, even when it looks and feels completely dry. Choose
            a product that can't handle that, and you'll be tearing it up
            within a couple of seasons. Choose correctly, and your basement
            becomes one of the most comfortable, hard-wearing rooms in the
            house. Since 1959, Atlas Rug &amp; Design Centre has been helping
            Toronto families get this decision right.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            The key is matching the right product to your specific basement
            conditions — whether that's a fully waterproof LVP, a quality
            laminate for a finished space, or carpet over a proper moisture
            barrier. We advise honestly and install to last.
          </p>
        </div>
      </section>

      {/* Best Options */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Built for Below Grade
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              The Best Basement Flooring Options
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {bestOptions.map((option) => (
              <div
                key={option.label}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 p-6 flex flex-col"
              >
                <span
                  className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${option.tagColor} text-white`}
                >
                  {option.tag}
                </span>
                <h3 className="font-playfair text-xl text-charcoal mb-2">
                  {option.label}
                </h3>
                <p className="text-warm-grey text-sm leading-relaxed flex-1">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-warm-grey mt-8">
            Compare the full range:{" "}
            <Link
              href="/vinyl"
              className="text-gold font-semibold hover:underline"
            >
              luxury vinyl
            </Link>
            ,{" "}
            <Link
              href="/laminate"
              className="text-gold font-semibold hover:underline"
            >
              laminate
            </Link>
            , and{" "}
            <Link
              href="/carpet"
              className="text-gold font-semibold hover:underline"
            >
              carpet &amp; broadloom
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Deep-dive content + What to avoid */}
      <section className="bg-white py-4 px-4">
        <div className="max-w-4xl mx-auto space-y-10 pb-16">
          <div>
            <h2 className="font-playfair text-4xl text-charcoal mb-4">
              The Right Underlay Makes All the Difference
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed">
              The underlay beneath your basement floor is one of the most
              important decisions in the job. A quality underlay adds cushion,
              warmth, and sound absorption — and in a basement where the concrete
              slab is naturally cold, it makes the finished floor feel like a
              proper room rather than a basement. We recommend the right product
              for your specific floor type and conditions, so you get the
              best result underfoot without paying for things you don't need.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-4xl text-charcoal mb-4">
              What Not to Use in a Basement
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed mb-5">
              Just as important as choosing the right floor is avoiding the wrong
              one. Two materials cause the lion&apos;s share of basement flooring
              regret:
            </p>
            <ul className="text-warm-grey text-lg leading-relaxed space-y-4 list-disc pl-6">
              <li>
                <span className="font-semibold text-charcoal">
                  Solid hardwood below grade.
                </span>{" "}
                Solid wood is a living material that swells and shrinks with
                moisture. On a slab that&apos;s always giving off vapour, it cups,
                gaps, and warps — often within the first year. LVP or a quality
                laminate are the proper alternatives.
              </li>
              <li>
                <span className="font-semibold text-charcoal">
                  Carpet laid directly on a damp slab.
                </span>{" "}
                Carpet on bare concrete traps moisture underneath, which leads to
                mould and a persistent musty smell. Carpet can absolutely work in
                a basement, but only over a moisture-barrier underpad.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Material Suitability Table */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Compare at a Glance
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Basement Suitability by Material
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Material
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Basement Suitability
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {materialRows.map((row, i) => (
                  <tr
                    key={row.material}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.material}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">
                      {row.suitability}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How We Install Basement Floors
            </h2>
          </div>
          <ProcessSteps steps={steps} />
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
              Basement Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving{" "}
            <Link
              href="/locations/scarborough"
              className="text-gold font-semibold hover:underline"
            >
              Scarborough
            </Link>
            ,{" "}
            <Link
              href="/locations/north-york"
              className="text-gold font-semibold hover:underline"
            >
              North York
            </Link>
            ,{" "}
            <Link
              href="/locations/etobicoke"
              className="text-gold font-semibold hover:underline"
            >
              Etobicoke
            </Link>{" "}
            and all of Toronto from our 978 Bathurst Street showroom.
          </p>
        </div>
      </section>

      <ReviewsSection service="general" />

      <CTABanner
        title="Ready to Finish Your Basement the Right Way?"
        subtitle="Visit our Bathurst Street showroom or book a free in-home consultation. We recommend and install — Toronto's flooring experts since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
