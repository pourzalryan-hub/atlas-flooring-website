import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title:
    "Basement Flooring Toronto | Waterproof & Moisture-Resistant Options",
  description:
    "Expert basement flooring in Toronto. Waterproof luxury vinyl plank, engineered hardwood and moisture-managed carpet — chosen and installed right for below-grade concrete. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/basement-flooring" },
  openGraph: {
    title:
      "Basement Flooring Toronto | Waterproof & Moisture-Resistant Options",
    description:
      "Waterproof and moisture-resistant basement flooring in Toronto — LVP, engineered hardwood and properly underpadded carpet, installed over a tested, prepared slab. Atlas Rug & Design Centre since 1959.",
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
    label: "Engineered Hardwood",
    tag: "Real Wood Option",
    tagColor: "bg-charcoal",
    description:
      "If you want genuine wood below grade, engineered hardwood is the only sensible way to get it. Its cross-ply core resists the expansion and contraction that destroys solid wood in a basement. Installed as a floating floor over a quality vapour barrier and a tested slab, it brings real warmth that veneers can't fully replicate.",
  },
  {
    label: "Carpet with Moisture-Barrier Pad",
    tag: "Cosiest Underfoot",
    tagColor: "bg-charcoal",
    description:
      "For a finished family room or playroom, carpet adds comfort, warmth, and sound dampening. The key below grade is a moisture-barrier or rubber-backed underpad that keeps the carpet up off the cold slab. We only recommend carpet once the slab has tested dry and the moisture management is sorted.",
  },
];

const materialRows = [
  {
    material: "Luxury Vinyl Plank (LVP)",
    suitability: "Excellent — fully waterproof",
    notes: "Best all-round basement floor; floats over a flat, dry slab",
  },
  {
    material: "Engineered Hardwood",
    suitability: "Good — with vapour barrier",
    notes: "Real wood; needs moisture testing and a stable slab below 65% RH",
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
    material: "Standard Laminate (fibreboard core)",
    suitability: "Avoid in damp areas",
    notes: "Swells permanently if the HDF core gets wet — even once",
  },
  {
    material: "Carpet directly on slab",
    suitability: "Avoid",
    notes: "Traps moisture, invites mould and a musty smell",
  },
];

const steps = [
  {
    title: "Moisture Test the Slab",
    description:
      "Before anything is ordered, we test the concrete for moisture using calcium chloride and relative-humidity probes. This single step prevents the vast majority of failed basement floors — no product is installed until the numbers are right.",
  },
  {
    title: "Prep & Level",
    description:
      "We grind high spots, fill low spots, and bring the slab flat within tolerance. Cracks are addressed and the floor is cleaned, because every finished material relies on a sound, even base underneath it.",
  },
  {
    title: "Vapour Barrier & Subfloor Membrane",
    description:
      "We install the right moisture defence for your floor — a vapour barrier and, where it makes sense, a dimpled or insulated subfloor membrane that lifts the floor off the cold, occasionally damp concrete and adds warmth.",
  },
  {
    title: "Install the Finished Floor",
    description:
      "LVP, engineered hardwood, or carpet is installed by our own team — never subcontracted — with proper expansion gaps, transitions, and seams done correctly for a below-grade environment.",
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
    a: "For most Toronto basements, luxury vinyl plank (LVP) is the best all-round choice because its core is 100% waterproof — it can handle humidity swings and minor moisture without warping. If you want real wood, engineered hardwood over a vapour barrier is the right way to do it. Carpet works well in finished rec rooms as long as it sits on a moisture-barrier underpad over a slab that has tested dry.",
  },
  {
    q: "Why do you test the concrete slab before installing?",
    a: "Concrete below grade is constantly in contact with the ground and releases moisture vapour, often invisibly. Even a slab that looks bone dry can read high. We use calcium chloride and relative-humidity tests to measure it. Skipping this step is the number-one cause of failed basement floors — adhesives let go, planks cup, and mould can grow underneath. Testing first means your floor is matched to the actual conditions.",
  },
  {
    q: "Can I install regular laminate or solid hardwood in my basement?",
    a: "We strongly advise against both below grade. Standard laminate has a fibreboard (HDF) core that swells permanently the first time it gets wet — and basements are exactly where that happens. Solid hardwood expands and contracts with the slab's natural moisture, leading to cupping, gapping, and warping. Engineered hardwood or LVP are the proper alternatives.",
  },
  {
    q: "What is a subfloor membrane and do I need one?",
    a: "A dimpled or insulated subfloor membrane is a panel that sits between the slab and your finished floor. The dimples create an air gap that lets any minor moisture dissipate and keeps the floor warmer and more comfortable underfoot. We don't always need one, but in cold, occasionally damp Toronto basements it's often the difference between a floor that feels like a basement and one that feels like a room.",
  },
  {
    q: "Is carpet a bad idea in a basement?",
    a: "Carpet laid directly on a damp slab is a bad idea — it traps moisture and can develop mould and a musty odour. Carpet installed correctly, over a moisture-barrier or rubber-backed underpad and a slab that has tested dry, is perfectly comfortable and a popular choice for family rooms. The pad and the moisture test are what make the difference.",
  },
  {
    q: "Will my basement floor be warm?",
    a: "Concrete is cold, but the finished floor doesn't have to be. Floating LVP with a thermal underlay, engineered hardwood over a membrane, or carpet with a quality pad all feel dramatically warmer than bare slab. An insulated subfloor membrane adds the most warmth and is worth considering if comfort is a priority.",
  },
];

export default function BasementFlooringPage() {
  return (
    <main className="font-lato">
      <PageHero
        title="Basement Flooring Toronto"
        subtitle="Waterproof and moisture-smart floors for below-grade spaces — chosen, tested, and installed right."
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
            slab that is in permanent contact with the earth — and that slab is
            always moving moisture, even when it looks and feels completely dry.
            Choose a product that can't handle that, and you'll be tearing it up
            within a couple of seasons. Choose correctly, and your basement
            becomes one of the most comfortable, hard-wearing rooms in the house.
            Since 1959, Atlas Rug &amp; Design Centre has been helping Toronto
            families get this decision right.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            The single most important step happens before any flooring is even
            ordered: moisture testing the slab. Everything else — which material
            you pick, whether you need a vapour barrier, whether a subfloor
            membrane makes sense — flows from what the concrete is actually
            telling us. We test first, then recommend. That is why our basement
            floors hold up while so many others fail.
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
              href="/engineered-hardwood"
              className="text-gold font-semibold hover:underline"
            >
              engineered hardwood
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
              Why Moisture Testing Comes First
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed mb-5">
              Concrete is porous. A below-grade slab draws moisture from the soil
              and releases it upward as vapour, a process that never really
              stops. The amount varies with the season, the grade of your lot,
              your drainage, and how the slab was originally poured. Because you
              can't see vapour, the only honest way to know what a slab is doing
              is to measure it. We use calcium chloride dome tests to gauge how
              much moisture is leaving the surface, and in-situ relative-humidity
              probes that read conditions deeper in the slab. Those numbers tell
              us whether we can glue down, whether we need a floating install,
              and what kind of barrier the floor requires.
            </p>
            <p className="text-warm-grey text-lg leading-relaxed">
              This is not a formality. The overwhelming majority of failed
              basement floors we are called to replace failed for one reason:
              someone installed over an untested slab. Test first, and the rest
              of the project becomes predictable.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-4xl text-charcoal mb-4">
              The Subfloor Membrane That Makes the Difference
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed">
              In many Toronto basements we install a dimpled or insulated
              subfloor membrane between the slab and the finished floor. The
              dimples create a small air gap so any minor moisture can dissipate
              rather than getting trapped against your flooring, and the panel
              breaks the thermal bridge to the cold concrete. The result is a
              floor that is warmer, quieter, and far less prone to the clammy
              feeling people associate with basements. Paired with the right
              vapour barrier, it's one of the best upgrades you can make to a
              below-grade space — and it's why engineered hardwood and even
              carpet can succeed down there.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-4xl text-charcoal mb-4">
              What Not to Use in a Basement
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed mb-5">
              Just as important as choosing the right floor is avoiding the wrong
              one. Three materials cause the lion's share of basement flooring
              regret, and we will steer you away from all of them:
            </p>
            <ul className="text-warm-grey text-lg leading-relaxed space-y-4 list-disc pl-6">
              <li>
                <span className="font-semibold text-charcoal">
                  Solid hardwood below grade.
                </span>{" "}
                Solid wood is a living material that swells and shrinks with
                moisture. On a slab that's always giving off vapour, it cups,
                gaps, and warps — often within the first year. If you want real
                wood, choose{" "}
                <Link
                  href="/engineered-hardwood"
                  className="text-gold font-semibold hover:underline"
                >
                  engineered hardwood
                </Link>{" "}
                instead.
              </li>
              <li>
                <span className="font-semibold text-charcoal">
                  Standard laminate with a fibreboard core.
                </span>{" "}
                Ordinary{" "}
                <Link
                  href="/laminate"
                  className="text-gold font-semibold hover:underline"
                >
                  laminate
                </Link>{" "}
                is built on an HDF (high-density fibreboard) core that acts like
                a sponge. The first time it meets standing water — a burst
                washer hose, a backed-up drain, seepage after a storm — it swells
                permanently and can't be saved. A waterproof LVP avoids this
                entirely.
              </li>
              <li>
                <span className="font-semibold text-charcoal">
                  Carpet laid directly on a damp slab.
                </span>{" "}
                Carpet on bare concrete traps moisture underneath, which leads to
                mould and a persistent musty smell. Carpet can absolutely work in
                a basement, but only over a moisture-barrier underpad and a slab
                that has tested dry.
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

      <CTABanner
        title="Ready to Finish Your Basement the Right Way?"
        subtitle="Visit our Bathurst Street showroom or book a free in-home consultation. We test, recommend, and install — Toronto's flooring experts since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
