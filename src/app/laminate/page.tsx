import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title: "Laminate Flooring Toronto | Atlas Rug & Design Centre",
  description:
    "Premium laminate flooring supply and installation in Toronto. Scratch-resistant, budget-friendly, and beautiful — supplied and installed by Atlas Rug & Design Centre since 1959. Free quotes available.",
};

const whyLaminateItems = [
  {
    icon: "🛡️",
    title: "Scratch Resistant",
    description:
      "The wear layer in quality laminate is tested to withstand scratches, scuffs, and dents from everyday household use.",
  },
  {
    icon: "💰",
    title: "Budget-Friendly",
    description:
      "Laminate delivers the visual warmth of hardwood at a fraction of the cost — ideal for larger spaces or rental properties.",
  },
  {
    icon: "⚡",
    title: "Easy Installation",
    description:
      "Click-lock laminate planks install faster than nailed hardwood, meaning less disruption to your home during the job.",
  },
  {
    icon: "✨",
    title: "Low Maintenance",
    description:
      "Sweep, vacuum, and damp-mop. No refinishing required. Laminate holds its look for years with minimal upkeep.",
  },
  {
    icon: "🎨",
    title: "Wide Style Range",
    description:
      "From light Nordic oak to dark walnut and stone-look porcelain, laminate covers virtually every aesthetic trend.",
  },
  {
    icon: "📐",
    title: "Consistent Look",
    description:
      "Unlike hardwood, laminate planks are perfectly consistent in tone and grain — ideal for open-plan spaces and minimalist designs.",
  },
];

const acRatingRows = [
  {
    rating: "AC3",
    use: "Residential — Light to Moderate",
    bestFor: "Bedrooms, living rooms",
  },
  {
    rating: "AC4",
    use: "Residential — Heavy / Light Commercial",
    bestFor: "Hallways, kitchens, family rooms",
  },
  {
    rating: "AC5",
    use: "Commercial",
    bestFor: "Retail, offices, high-traffic residential",
  },
];

const thicknessRows = [
  { thickness: "8mm", notes: "Entry-level, suitable for bedrooms with flat subfloors" },
  { thickness: "12mm", notes: "Most popular — better underfoot feel, hides minor subfloor imperfections" },
  { thickness: "14–15mm", notes: "Premium — closest feel to hardwood, maximum sound dampening" },
];


const installationSteps = [
  {
    title: "Subfloor Inspection",
    description:
      "We inspect your subfloor for levelness, moisture, and structural integrity. Laminate requires a flat subfloor within 3/16\" over 10 feet — we repair any high spots or low areas before we begin.",
  },
  {
    title: "Underpad Installation",
    description:
      "A quality underpad is rolled out over the subfloor to provide cushioning, thermal insulation, and sound dampening. Some premium laminate comes with pre-attached underpad — we confirm before quoting.",
  },
  {
    title: "Plank Installation",
    description:
      "Click-lock planks are installed with proper staggering, expansion gaps at all walls (critical to prevent buckling), and careful attention to transitions between rooms.",
  },
  {
    title: "Trim & Finishing",
    description:
      "Quarter-round or flat moulding is installed to cover expansion gaps at walls. Transition strips at doorways, stairs, and flooring changes are cut, fitted, and secured for a clean, complete finish.",
  },
];

const comparisonRows = [
  {
    attribute: "Cost",
    laminate: "$ Budget-friendly",
    hardwood: "$$$ Premium",
    vinyl: "$$ Mid-range",
  },
  {
    attribute: "Waterproof",
    laminate: "No (water-resistant only)",
    hardwood: "No",
    vinyl: "Yes (100%)",
  },
  {
    attribute: "Durability",
    laminate: "Very good",
    hardwood: "Excellent",
    vinyl: "Very good",
  },
  {
    attribute: "Refinishable",
    laminate: "No",
    hardwood: "Yes (multiple times)",
    vinyl: "No",
  },
  {
    attribute: "Best For",
    laminate: "Living areas, bedrooms, rentals",
    hardwood: "Whole-home investment floors",
    vinyl: "Wet areas, basements, pets",
  },
];

const faqItems = [
  {
    q: "Can laminate flooring be installed in a kitchen or bathroom?",
    a: "Laminate is water-resistant but not waterproof — it can handle minor spills if wiped up quickly, but standing water or high humidity will cause the core to swell and warp over time. For kitchens with high spill risk, or any bathroom, we typically recommend luxury vinyl (LVP/LVT) instead, which is fully waterproof.",
  },
  {
    q: "How does laminate flooring compare to hardwood?",
    a: "Laminate looks very similar to hardwood and costs significantly less. The main differences: hardwood is real wood that can be refinished repeatedly; laminate has a photographic layer that cannot be refinished and must be replaced. Hardwood also adds more resale value. For budget-conscious projects or rental properties, laminate is an excellent choice.",
  },
  {
    q: "What thickness of laminate should I choose?",
    a: "For most residential applications, 12mm is the sweet spot — it has a satisfying underfoot feel, good sound dampening, and is tolerant of minor subfloor imperfections. We only recommend 8mm for bedrooms with very flat subfloors. In areas where feel and acoustics matter most, 14–15mm is a noticeable upgrade.",
  },
  {
    q: "Does laminate need to acclimatise before installation?",
    a: "Yes. We recommend letting laminate planks acclimatise in the room where they'll be installed for at least 48 hours before we begin. This allows the planks to adjust to the room's temperature and humidity, reducing the risk of post-installation expansion or gapping.",
  },
  {
    q: "How long does laminate flooring last?",
    a: "Quality laminate with an AC4 rating in a residential setting typically lasts 15–25 years with proper care. Avoid excessive moisture, use furniture pads to prevent scratching, and clean with a dry or slightly damp mop. Avoid steam mops entirely — moisture infiltration is the number one cause of premature laminate failure.",
  },
];

export default function LaminatePage() {
  return (
    <main className="font-lato">
      {/* 1. Hero */}
      <PageHero
        title="Laminate Flooring Toronto"
        subtitle="Beautiful, durable, and budget-smart — laminate flooring installed by Toronto's most trusted flooring experts."
        breadcrumb="Laminate"
        imageSrc="/images/laminate-hero.png"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Smart Flooring
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Looks Like Wood. Performs Like a Champion.
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Today's laminate flooring is a world away from the thin, hollow-
            sounding product of the 1990s. Modern laminate delivers incredibly
            realistic wood and stone visuals with a dense, rigid core and a
            scratch-resistant wear layer that holds up to family life. It's the
            ideal flooring for homeowners who want the warmth and character of
            hardwood without the price tag.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            At Atlas Rug &amp; Design Centre, we carry a carefully curated
            selection of laminate from leading manufacturers — focusing on quality
            construction, realistic embossing, and finishes that actually look
            convincing in person. Come to our Bathurst Street showroom and feel
            the difference between a 12mm premium laminate and a budget 7mm
            product. The gap is enormous.
          </p>
        </div>
      </section>

      {/* 3. Why Laminate — dark section */}
      <section className="bg-charcoal py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              The Case for Laminate
            </p>
            <h2 className="font-playfair text-4xl text-white">
              Why Choose Laminate?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyLaminateItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-7"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-playfair text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Product Features */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Buyer's Guide
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              What to Look For in Laminate
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* AC Rating */}
            <div>
              <h3 className="font-playfair text-2xl text-charcoal mb-4">
                AC Rating (Wear Layer)
              </h3>
              <p className="text-warm-grey text-sm mb-5 leading-relaxed">
                The AC (Abrasion Class) rating measures how much wear a laminate
                can handle. The higher the number, the more durable the floor.
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
                <table className="w-full text-sm">
                  <thead className="bg-charcoal text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-lato font-semibold">Rating</th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">Use Classification</th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acRatingRows.map((row, i) => (
                      <tr key={row.rating} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="px-4 py-3 font-semibold text-gold">{row.rating}</td>
                        <td className="px-4 py-3 text-charcoal">{row.use}</td>
                        <td className="px-4 py-3 text-warm-grey">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Thickness */}
            <div>
              <h3 className="font-playfair text-2xl text-charcoal mb-4">
                Thickness
              </h3>
              <p className="text-warm-grey text-sm mb-5 leading-relaxed">
                Thickness determines how solid the floor feels underfoot, how
                well it bridges minor subfloor imperfections, and how much sound
                it dampens.
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
                <table className="w-full text-sm">
                  <thead className="bg-charcoal text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-lato font-semibold">Thickness</th>
                      <th className="text-left px-4 py-3 font-lato font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thicknessRows.map((row, i) => (
                      <tr key={row.thickness} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="px-4 py-3 font-semibold text-gold">{row.thickness}</td>
                        <td className="px-4 py-3 text-warm-grey">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 rounded-2xl bg-off-white border border-stone-200 p-5">
                <p className="text-warm-grey text-sm leading-relaxed">
                  <span className="font-semibold text-charcoal">Core Type:</span>{" "}
                  Look for HDF (High-Density Fibreboard) cores — they're denser,
                  more stable, and more moisture-resistant than standard MDF cores.
                  Textured embossing (EIR — Emboss in Register) aligns the texture
                  with the printed grain for the most realistic wood appearance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Is Laminate Right For You */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Quick Guide
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Is Laminate Right For You?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-8">
              <h3 className="font-playfair text-2xl text-charcoal mb-5">
                ✅ Laminate is a great fit if…
              </h3>
              <ul className="space-y-3">
                {[
                  "You want the look of hardwood on a tighter budget",
                  "You're renovating a rental property or investment unit",
                  "You need a fast, low-disruption installation",
                  "The room gets moderate foot traffic (living room, bedroom, home office)",
                  "You want a consistent, uniform look across a large open area",
                  "You'll be replacing floors again in 15–20 years",
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-warm-grey">
                    <span className="text-gold font-bold flex-shrink-0">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-stone-100 shadow-sm p-8">
              <h3 className="font-playfair text-2xl text-charcoal mb-5">
                ⚠️ Consider another option if…
              </h3>
              <ul className="space-y-3">
                {[
                  "The room has moisture — bathrooms, laundry rooms, or wet basements (choose LVP instead)",
                  "You want a floor you can refinish and keep for 50+ years (choose solid hardwood)",
                  "You have pets that track in a lot of water or have accidents (choose LVP or triexta carpet)",
                  "You're installing over radiant in-floor heating (laminate and heat don't mix well)",
                  "Resale value is a top priority — hardwood adds more to a home's appraisal",
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-warm-grey">
                    <span className="text-charcoal font-bold flex-shrink-0">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Installation Process */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How Laminate Installation Works
            </h2>
          </div>
          <ProcessSteps steps={installationSteps} />
        </div>
      </section>

      {/* 7. Comparison Table */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Side by Side
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Laminate vs Hardwood vs Luxury Vinyl
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-5 py-4 font-lato font-semibold">Feature</th>
                  <th className="text-left px-5 py-4 font-lato font-semibold text-gold">Laminate</th>
                  <th className="text-left px-5 py-4 font-lato font-semibold">Hardwood</th>
                  <th className="text-left px-5 py-4 font-lato font-semibold">Luxury Vinyl</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.attribute} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-5 py-3 font-semibold text-charcoal">{row.attribute}</td>
                    <td className="px-5 py-3 text-charcoal font-medium">{row.laminate}</td>
                    <td className="px-5 py-3 text-warm-grey">{row.hardwood}</td>
                    <td className="px-5 py-3 text-warm-grey">{row.vinyl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Laminate Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 9. CTA Banner */}
      <CTABanner
        title="See Our Laminate Collection in Person"
        subtitle="Visit our Bathurst Street showroom to touch, feel, and compare our laminate range side by side. Free quotes and in-home consultations available."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
