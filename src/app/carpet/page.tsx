import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Carpet Store Toronto | Carpet & Broadloom | Atlas Rug & Design Centre",
  description:
    "Toronto's carpet store since 1959. Hundreds of carpet and broadloom styles — nylon, wool, polyester — in stock at 978 Bathurst St. Free in-home consultations. Serving Midtown, North York, Forest Hill, Rosedale & all GTA.",
  alternates: { canonical: "/carpet" },
  openGraph: {
    title: "Carpet Store Toronto | Carpet & Broadloom | Atlas Rug & Design Centre",
    description:
      "Toronto's carpet store since 1959. Hundreds of carpet and broadloom styles in stock at 978 Bathurst St. Family-owned.",
    url: "https://atlasrugflooring.com/carpet",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carpet & Broadloom Toronto | Atlas Rug & Design Centre",
    description:
      "Premium carpet and broadloom supply and installation in Toronto.",
  },
};

const carpetTypes = [
  {
    label: "Cut Pile / Plush",
    tag: "Most Luxurious",
    tagColor: "bg-gold",
    image: "/images/carpet-cut-pile.jpg",
    description:
      "The classic carpet style — fibres are cut to an even height, creating a dense, velvety surface. Plush carpet feels incredible underfoot and adds warmth and elegance to master bedrooms, living rooms, and formal spaces. Best in lower-traffic rooms where that pristine look can be maintained.",
  },
  {
    label: "Berber & Loop",
    tag: "Best for High Traffic",
    tagColor: "bg-charcoal",
    image: "/images/carpet-berber.jpg",
    description:
      "Loops of fibre are left uncut, creating a firm, durable surface that stands up to heavy foot traffic. Berber (with its flecked pattern) and other loop styles are ideal for stairs, hallways, basements, and family rooms. They resist crushing and show less wear over time.",
  },
  {
    label: "Wool Carpet",
    tag: "Premium & Sustainable",
    tagColor: "bg-gold",
    image: "/images/carpet-wool.jpg",
    description:
      "Natural wool carpet is the pinnacle of quality — warm, resilient, naturally flame-retardant, and biodegradable. It regulates humidity, maintains its look for decades, and gets better with age. Available in luxurious textures and an array of natural tones. An investment that lasts a lifetime.",
  },
];

const fibreCards = [
  {
    label: "Nylon",
    tag: "Most Popular",
    highlight: true,
    description:
      "The gold standard of carpet fibres. Nylon offers the best combination of softness, durability, and resilience. It springs back under foot traffic, holds colour exceptionally well, and handles everyday family life with ease. Available in the widest range of styles and colours.",
    traits: ["Excellent durability", "Great colour retention", "Highly resilient"],
  },
  {
    label: "Polyester / PET",
    tag: "Best Stain Resistance",
    highlight: false,
    description:
      "Polyester is inherently stain-resistant because the fibre itself doesn't absorb most liquids — spills bead up and wipe away. It's also budget-friendly and available in vibrant colours. Great for bedrooms and lower-traffic areas where comfort and value are priorities.",
    traits: ["Inherently stain-resistant", "Budget-friendly", "Vibrant colour range"],
  },
  {
    label: "Wool",
    tag: "Premium & Sustainable",
    highlight: false,
    description:
      "Natural wool carpet is the pinnacle of quality — warm, resilient, naturally flame-retardant, and biodegradable. It regulates humidity, maintains its look for decades, and gets better with age. Available in luxurious textures and an array of natural tones. An investment that lasts a lifetime.",
    traits: ["Naturally durable", "Flame retardant", "Biodegradable & eco-friendly"],
  },
];

const underpadRows = [
  {
    tier: "Standard 8lb",
    thickness: "¼\" (6mm)",
    bestFor: "Low-traffic bedrooms, rental suites",
    benefit: "Good cushion, cost-effective",
  },
  {
    tier: "Premium 10lb",
    thickness: "⅜\" (10mm)",
    bestFor: "Living rooms, hallways, stairs",
    benefit: "Better comfort, longer carpet life",
  },
  {
    tier: "Memory Foam",
    thickness: "½\" (12mm)",
    bestFor: "Master bedrooms, home theatres",
    benefit: "Maximum luxury underfoot",
  },
];

const installationSteps = [
  {
    title: "Consultation",
    description:
      "We meet at your home or our showroom to understand your lifestyle, traffic levels, and design goals. Bring a swatch of your paint colour — we'll help you find a carpet that ties the whole room together.",
  },
  {
    title: "Measure & Quote",
    description:
      "Accurate measurement is critical for carpet — we account for pile direction, pattern matching, and seam placement. Your quote includes carpet, underpad, installation, tack strips, and old carpet removal.",
  },
  {
    title: "Product Selection",
    description:
      "We narrow down your options to a short-list of carpet styles, fibres, and colours that work for your rooms. We offer samples to take home so you can see how it looks in your actual lighting.",
  },
  {
    title: "Installation Day",
    description:
      "Our experienced installers prepare the subfloor, lay and fasten tack strips, install the underpad, and stretch the carpet professionally — ensuring no bubbles, wrinkles, or poorly placed seams.",
  },
  {
    title: "Final Walkthrough",
    description:
      "We walk every room with you before we're done. Seams, transitions, and edges are inspected together and you receive care and cleaning guidance for your specific carpet fibre.",
  },
];

const faqItems = [
  {
    q: "How long does carpet installation take?",
    a: "A typical residential installation of two to four rooms takes one day. Larger homes or jobs with complex seaming may take two days. We'll give you a realistic schedule in your quote so you can plan furniture moving and avoid disruption.",
  },
  {
    q: "How do I choose the right carpet for high-traffic areas?",
    a: "For stairs, hallways, and family rooms, choose a loop or textured pile style in a nylon fibre. Avoid light colours and plush (velvet) styles in these areas — they crush and show wear quickly. A heavier underpad also extends the life of your carpet significantly.",
  },
  {
    q: "How do I clean carpet stains?",
    a: "Act fast — blot (don't rub) the spill with a clean white cloth. Work from the outside of the stain inward. For most stains, a mix of warm water and a drop of dish soap works well. For pet stains, use an enzyme-based cleaner. Avoid over-wetting, which can cause mould under the carpet.",
  },
  {
    q: "How long should carpet last?",
    a: "A quality carpet in a lower-traffic room can last 15–20 years. In high-traffic areas, 8–12 years is realistic for most fibres. Wool and quality nylon tend to outlast polyester. Regular vacuuming and professional cleaning every 12–18 months significantly extends carpet life.",
  },
  {
    q: "Do you remove and dispose of old carpet?",
    a: "Yes — old carpet and underpad removal is included in our standard installation quotes. We take it with us when we leave. Just let us know in advance if there are any access issues or if you have hazardous materials like asbestos-backed tile that may need separate remediation.",
  },
];

export default function CarpetPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Carpet & Broadloom Toronto"
        subtitle="Premium carpet and broadloom for every room — supplied and professionally installed by Toronto's flooring experts."
        breadcrumb="Carpet & Broadloom"
        imageSrc="/images/carpet-hero.jpg"
      />

      {/* 2. Intro */}
      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Since 1959
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            The Warmth of Carpet, Done Right
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            For over 65 years, Atlas Rug &amp; Design Centre has been Toronto's
            destination for premium carpet and broadloom. Whether you're
            transforming a master bedroom into a plush retreat, carpeting a busy
            family room, or broadlooming an entire floor, we bring the expertise
            to match the right carpet to the right room — and install it
            beautifully.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            Our 978 Bathurst Street showroom carries hundreds of carpet options
            across every fibre type, pile style, colour, and pattern. From entry-
            level broadloom to heirloom-quality wool, we have something for every
            home and every budget — with honest advice to guide your decision.
          </p>
        </div>
      </section>

      {/* 3. Carpet Types */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Pile Styles
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Carpet Styles We Carry
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {carpetTypes.map((type) => (
              <div
                key={type.label}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 flex flex-col"
              >
                <div className="bg-stone-200 aspect-square w-full relative">
                  <Image
                    src={type.image}
                    alt={type.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${type.tagColor} text-white`}
                  >
                    {type.tag}
                  </span>
                  <h3 className="font-playfair text-xl text-charcoal mb-2">
                    {type.label}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed flex-1">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Fibre Guide */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Know Your Fibres
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Carpet Fibre Guide
            </h2>
            <p className="text-warm-grey mt-4 max-w-2xl mx-auto">
              The fibre your carpet is made from determines its durability,
              softness, stain resistance, and longevity. Here's what you need to
              know.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fibreCards.map((fibre) => (
              <div
                key={fibre.label}
                className={`rounded-2xl shadow-sm border p-8 flex flex-col ${
                  fibre.highlight
                    ? "border-gold bg-white"
                    : "border-stone-100 bg-white"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-playfair text-2xl text-charcoal">
                    {fibre.label}
                  </h3>
                  <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-gold text-white">
                    {fibre.tag}
                  </span>
                </div>
                <p className="text-warm-grey text-sm leading-relaxed mb-4 flex-1">
                  {fibre.description}
                </p>
                <ul className="space-y-1">
                  {fibre.traits.map((trait) => (
                    <li key={trait} className="flex items-center gap-2 text-sm text-charcoal">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Underpad Section */}
      <section className="bg-charcoal py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              The Invisible Upgrade
            </p>
            <h2 className="font-playfair text-4xl text-white mb-6">
              Don't Forget the Underpad
            </h2>
            <p className="text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
              The underpad beneath your carpet is responsible for how soft and
              cushioned it feels underfoot, how well it insulates sound and
              temperature, and — critically — how long your carpet lasts. A
              quality underpad absorbs the daily impact your carpet takes, so the
              fibres above don't wear out nearly as fast. It's one of the best
              investments you can make in your flooring.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gold text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-lato font-semibold">Tier</th>
                  <th className="text-left px-5 py-3 font-lato font-semibold">Thickness</th>
                  <th className="text-left px-5 py-3 font-lato font-semibold">Best For</th>
                  <th className="text-left px-5 py-3 font-lato font-semibold">Benefit</th>
                </tr>
              </thead>
              <tbody>
                {underpadRows.map((row, i) => (
                  <tr
                    key={row.tier}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-5 py-3 font-semibold text-charcoal">{row.tier}</td>
                    <td className="px-5 py-3 text-warm-grey">{row.thickness}</td>
                    <td className="px-5 py-3 text-warm-grey">{row.bestFor}</td>
                    <td className="px-5 py-3 text-warm-grey">{row.benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              How Carpet Installation Works
            </h2>
          </div>
          <ProcessSteps steps={installationSteps} />
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Carpet & Broadloom FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <ReviewsSection service="carpet" />

      {/* Neighbourhood Coverage */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-lato font-semibold tracking-[0.2em] uppercase text-gold mb-3">
            Serving All of Toronto & the GTA
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-charcoal mb-5">
            Your Local Carpet Store Since 1959
          </h2>
          <p className="font-lato text-warm-grey text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Atlas Rug &amp; Design Centre at 978 Bathurst Street has been
            Toronto&apos;s go-to carpet store for over 65 years. We supply and
            install carpet across Midtown Toronto, The Annex, Forest Hill,
            Rosedale, North York, Etobicoke, Lawrence Park, Leaside, East York,
            and throughout the GTA — including Thornhill, Richmond Hill,
            Markham, Mississauga, Oakville, and Vaughan.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Midtown Toronto", "The Annex", "Forest Hill", "Rosedale",
              "Lawrence Park", "Leaside", "North York", "Etobicoke",
              "East York", "Thornhill", "Richmond Hill", "Markham",
              "Mississauga", "Oakville", "Vaughan", "Scarborough",
            ].map((n) => (
              <span
                key={n}
                className="px-4 py-2 border border-stone-200 text-warm-grey font-lato text-sm rounded-full hover:border-gold hover:text-gold transition-colors"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <CTABanner
        title="Find the Perfect Carpet for Your Home"
        subtitle="Visit our Bathurst Street showroom and feel the difference in person. Free consultations and in-home visits available across Toronto."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
