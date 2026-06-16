import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Stair Runners Toronto | Atlas Rug & Design Centre",
  description:
    "Custom stair runners designed and installed in Toronto. Patterned, solid, and natural fibre runners professionally fitted for beauty and safety. Atlas Rug & Design Centre — since 1959.",
  alternates: { canonical: "/stair-runners" },
  openGraph: {
    title: "Stair Runners Toronto | Atlas Rug & Design Centre",
    description:
      "Custom stair runners designed and installed in Toronto for beauty and safety.",
    url: "https://atlasrugflooring.com/stair-runners",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stair Runners Toronto | Atlas Rug & Design Centre",
    description:
      "Custom stair runners designed and installed in Toronto.",
  },
};

const runnerStyles = [
  {
    label: "Patterned Runners",
    tag: "Most Popular",
    tagColor: "bg-gold",
    image: "/images/runner-patterned.jpg",
    description:
      "A patterned stair runner transforms your staircase into a design feature. From classic Persian-inspired motifs to bold geometric prints and subtle stripes, patterned runners add personality and draw the eye upward. They're the number one request in our showroom — and with good reason.",
  },
  {
    label: "Solid & Textured",
    tag: "Clean & Timeless",
    tagColor: "bg-charcoal",
    image: "/images/runner-solid.jpg",
    description:
      "A solid-colour runner in a rich tone — deep navy, warm charcoal, sage green, or cream — delivers a refined, architectural look that never goes out of style. Textured weaves like herringbone or ribbed loops add tactile interest while remaining understated. Pairs beautifully with hardwood and natural wood stairs.",
  },
  {
    label: "Fully Carpeted Stairs",
    tag: "Best for Families",
    tagColor: "bg-gold",
    image: "/images/runner-fully-carpeted.jpg",
    description:
      "For households with young children or elderly family members, fully carpeted stairs — wall to wall — provide maximum grip, comfort, and noise reduction. We install broadloom stair carpet with the same care as a runner, using proper tack strips and professional stretching for a smooth, wrinkle-free finish.",
  },
];

const materials = [
  {
    label: "Wool",
    description:
      "The traditional choice for premium stair runners. Wool is naturally resilient, bouncing back under foot traffic. It's flame-retardant, doesn't generate static, and develops a beautiful patina over time. Available in an extraordinary range of patterns and colours.",
    traits: ["Naturally durable & resilient", "Flame retardant", "Luxurious feel"],
  },
  {
    label: "Nylon",
    description:
      "The most practical synthetic fibre for stairs. Nylon's resilience means it springs back under heavy daily foot traffic, resists abrasion, and holds vibrant colour well. An excellent choice for high-traffic stairs where durability is the priority without sacrificing style.",
    traits: ["Outstanding durability", "Wide style range", "Excellent colour retention"],
  },
  {
    label: "Polypropylene",
    description:
      "A budget-friendly, inherently stain-resistant fibre that performs well in lower-traffic stair applications. Polypropylene doesn't absorb liquid, making it a practical choice for mudroom stairs or basement steps. Limited in softness compared to nylon or wool.",
    traits: ["Stain & moisture resistant", "Budget-friendly", "Easy to clean"],
  },
  {
    label: "Natural Fibres",
    description:
      "Sisal, jute, and seagrass runners bring warmth, texture, and an organic aesthetic that suits coastal, Scandinavian, and transitional interiors beautifully. These natural fibres are more textured underfoot and require more careful maintenance — best in lower-traffic or drier environments.",
    traits: ["Organic, earthy aesthetic", "Eco-friendly materials", "Unique texture"],
  },
];

const installationMethods = [
  {
    name: "Waterfall",
    tag: "Most Common",
    description:
      "The carpet drops straight over the nose (front edge) of each tread and falls vertically down the riser. The waterfall method is clean, modern-looking, and the fastest to install. It works beautifully with most runner styles and is the method we recommend most often.",
  },
  {
    name: "Hollywood / Wrapped",
    tag: "Premium Look",
    description:
      "The runner is pulled tightly around the tread nose and tucked under each riser. This method uses more carpet but creates a seamlessly tailored appearance with no exposed nose — a hallmark of high-end stair installations. Ideal for shaped or bullnose treads.",
  },
  {
    name: "Stair Rod Finish",
    tag: "Classic Detail",
    description:
      "Decorative brass, iron, or nickel rods are placed at the back of each tread where the carpet meets the riser. The rods hold the runner in place and add a traditional, polished detail. This is a heritage installation technique that remains popular in formal interiors.",
  },
];

const faqItems = [
  {
    q: "How wide should a stair runner be?",
    a: "The most common stair runner widths are 27 inches, 32 inches, and 36 inches. Leaving 2 to 4 inches of exposed tread on each side is the traditional standard — it frames the runner and showcases the wood beneath. We'll recommend the best width for your specific stair tread dimensions during your consultation.",
  },
  {
    q: "Can you install a runner on curved or winder stairs?",
    a: "Yes, with expert cutting and fitting. Curved staircases and winder stairs (where treads are wedge-shaped) require precise on-site cutting and mitering. Our installers have extensive experience with non-standard stair configurations. We always measure curved stairs in person before providing a quote.",
  },
  {
    q: "Do stair runners need to be professionally installed?",
    a: "We strongly recommend professional installation. Poorly fitted stair runners — whether stretched incorrectly, inadequately secured, or with improperly placed tack strips — are a safety hazard. Our installers ensure every runner is firmly secured, smooth, and flat from top to bottom.",
  },
  {
    q: "How long does stair runner installation take?",
    a: "A standard straight staircase of 12–16 steps typically takes 3–5 hours. Curved stairs, winders, or more complex configurations take longer. We'll give you a realistic time estimate with your quote. Most jobs are completed in a single visit.",
  },
  {
    q: "Can a stair runner be removed and replaced without damaging the stairs?",
    a: "Yes. Tack strips are nailed into the subfloor at the back of each tread, not into the tread face itself. When a runner is removed, the tack strips come out cleanly and any small nail holes are easily filled and sanded. The hardwood beneath your runner will be in excellent condition.",
  },
  {
    q: "What's the best material for stair runners in a home with pets?",
    a: "Nylon and SmartStrand (triexta) are our top recommendations for pet-friendly stair runners. They resist staining, clean up easily, and are durable enough to handle claws and heavy daily traffic. We'd steer away from natural fibres like sisal or jute in pet households — they absorb moisture and are harder to clean.",
  },
];

const crossSellItems = [
  {
    label: "Carpet & Broadloom",
    description:
      "Extend the warmth of your stair runner throughout your home. We carry a wide range of carpet styles, textures, and colours for every room.",
    href: "/carpet",
    image: "/images/runner-cross-sell-carpet.jpg",
  },
  {
    label: "Hardwood Flooring",
    description:
      "A stair runner pairs beautifully with new hardwood. Explore our full range of solid, engineered, and wide-plank hardwood options.",
    href: "/hardwood",
    image: "/images/runner-cross-sell-hardwood.jpg",
  },
];

export default function StairRunnersPage() {
  return (
    <main className="font-lato">
      {/* 1. Hero */}
      <PageHero
        title="Custom Stair Runners Toronto"
        subtitle="The perfect finishing touch for your staircase — custom-measured, expertly installed stair runners in hundreds of styles."
        breadcrumb="Stair Runners"
        imageSrc="/images/stair-runners-hero.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            The Detail That Elevates Everything
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Your Staircase Deserves More Than an Afterthought
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            The staircase is one of the most viewed areas in any home — yet it's
            one of the most commonly overlooked when it comes to design. A
            custom-fitted stair runner instantly changes that. It adds warmth,
            pattern, colour, and texture to a space that otherwise sits bare. It
            reduces noise. It protects your treads. And it quietly signals that
            the rest of the home was designed with care.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            At Atlas Rug &amp; Design Centre, we've been fitting stair runners
            on Toronto staircases since 1959. We measure on-site, help you
            select the right width, pattern, and material, and install everything
            to a standard you'd expect from a 65-year-old company that still cares
            deeply about its craft.
          </p>
        </div>
      </section>

      {/* 3. Runner Styles */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Explore the Options
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Runner Styles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {runnerStyles.map((style) => (
              <div
                key={style.label}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 flex flex-col"
              >
                <div className="bg-stone-200 aspect-square w-full relative">
                  <Image
                    src={style.image}
                    alt={style.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${style.tagColor} text-white`}
                  >
                    {style.tag}
                  </span>
                  <h3 className="font-playfair text-xl text-charcoal mb-2">
                    {style.label}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed flex-1">
                    {style.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Materials */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Material Guide
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Runner Materials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((mat) => (
              <div
                key={mat.label}
                className="rounded-2xl shadow-sm border border-stone-100 bg-white p-8 flex flex-col"
              >
                <h3 className="font-playfair text-2xl text-charcoal mb-3">
                  {mat.label}
                </h3>
                <p className="text-warm-grey text-sm leading-relaxed mb-4 flex-1">
                  {mat.description}
                </p>
                <ul className="space-y-1">
                  {mat.traits.map((trait) => (
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

      {/* 5. Installation Methods */}
      <section className="bg-charcoal py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Professional Installation
            </p>
            <h2 className="font-playfair text-4xl text-white">
              How We Install Stair Runners
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {installationMethods.map((method) => (
              <div
                key={method.name}
                className="rounded-2xl bg-white/5 border border-white/10 p-8"
              >
                <span className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4 bg-gold text-white">
                  {method.tag}
                </span>
                <h3 className="font-playfair text-xl text-white mb-3">
                  {method.name}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-gold/10 border border-gold/30 p-6 text-center">
            <p className="text-stone-200 text-sm">
              <span className="font-semibold text-gold">Safety Note:</span>{" "}
              All our stair runner installations use properly placed and nailed tack
              strips, ensuring the runner stays firmly in place under daily use.
              We never use adhesive-only methods that can fail over time.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Sizing Guide */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Getting It Right
            </p>
            <h2 className="font-playfair text-4xl text-charcoal mb-6">
              Stair Runner Sizing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { width: '27"', note: "Narrow or powder room stairs" },
              { width: '32"', note: "Standard residential stairs" },
              { width: '36"', note: "Wide or grand staircases" },
            ].map((item) => (
              <div
                key={item.width}
                className="rounded-2xl border border-stone-200 p-6 text-center"
              >
                <p className="font-playfair text-5xl text-gold mb-2">{item.width}</p>
                <p className="text-warm-grey text-sm">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mb-4">
            Standard stair runners come in 27-inch, 32-inch, and 36-inch widths.
            The traditional rule is to leave 2–4 inches of bare tread exposed on
            each side of the runner, which frames it and shows off the wood
            beneath. For a standard 36-inch-wide stair, a 27-inch runner leaves
            approximately 4.5 inches on each side — a clean, classic proportion.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We always measure your stairs in person before cutting any carpet. Tread
            depth, riser height, and the installation method (waterfall vs.
            Hollywood) all affect how much carpet you'll need. Our measurements
            are exact — you won't pay for more carpet than necessary.
          </p>
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
              Stair Runner FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 8. Cross-sell */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Complete Your Home
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Explore More Flooring
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {crossSellItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="bg-stone-200 aspect-video w-full relative">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-charcoal mb-2 group-hover:text-gold transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA Banner */}
      <CTABanner
        title="Let's Find the Perfect Runner for Your Staircase"
        subtitle="Bring us your stair dimensions or book an in-home visit. We'll measure, advise, and install — all with the care of a 65-year-old family business."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
