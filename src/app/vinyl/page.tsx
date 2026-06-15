import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Luxury Vinyl Flooring Toronto | LVP & LVT | Atlas Rug & Design Centre",
  description:
    "Luxury vinyl plank and tile (LVP & LVT) supply and installation in Toronto. 100% waterproof, pet-friendly, and beautifully realistic. Atlas Rug & Design Centre — Toronto's flooring experts since 1959.",
};

const keyFeatures = [
  {
    icon: "💧",
    title: "100% Waterproof",
    description:
      "Unlike hardwood or laminate, luxury vinyl is completely impervious to water. Spills, splashes, and even flooding won't damage it — making it the only sensible choice for bathrooms and basements.",
  },
  {
    icon: "🦶",
    title: "Softer Underfoot",
    description:
      "The resilient construction of LVP absorbs impact and feels more comfortable underfoot than ceramic tile or stone — especially important in kitchens where you stand for extended periods.",
  },
  {
    icon: "🐾",
    title: "Pet & Kid Friendly",
    description:
      "The wear layer on premium LVP resists scratches from pet nails and stands up to the demands of busy households. Easy to wipe clean — no grout lines to trap mess.",
  },
  {
    icon: "🪟",
    title: "Realistic Aesthetics",
    description:
      "Advanced digital printing and textured embossing create vinyl planks that genuinely look and feel like real wood or stone. Many guests won't know the difference.",
  },
  {
    icon: "🧹",
    title: "Easy Maintenance",
    description:
      "Sweep, vacuum, and damp-mop. No refinishing, no waxing, no sealing. LVP is one of the lowest-maintenance floors available for busy homes.",
  },
  {
    icon: "🌡️",
    title: "Radiant Heat Compatible",
    description:
      "Most LVP and LVT products are approved for use with in-floor radiant heating systems — check manufacturer specs, which we'll confirm for your specific product.",
  },
];

const wearLayerRows = [
  {
    thickness: "6 mil",
    durability: "Light residential",
    bestFor: "Bedrooms, low-traffic areas",
  },
  {
    thickness: "8 mil",
    durability: "Standard residential",
    bestFor: "Living rooms, bedrooms",
  },
  {
    thickness: "12 mil",
    durability: "Heavy residential",
    bestFor: "Kitchens, hallways, families with pets",
  },
  {
    thickness: "20 mil",
    durability: "Commercial-grade",
    bestFor: "High-traffic residential, small commercial spaces",
  },
];

const bestRooms = [
  {
    room: "Kitchen",
    reason: "100% waterproof and easy underfoot during long cooking sessions. Stands up to spills, dropped items, and heavy foot traffic.",
    icon: "🍳",
  },
  {
    room: "Bathroom",
    reason: "The only floating floor we comfortably recommend for full bathrooms. No moisture concerns, no warping, no swelling.",
    icon: "🚿",
  },
  {
    room: "Basement",
    reason: "Basements are prone to humidity and occasional moisture. LVP handles both with ease — and adds warmth that cold tile can't match.",
    icon: "🏠",
  },
];

const faqItems = [
  {
    q: "What's the difference between LVP and LVT?",
    a: "LVP (Luxury Vinyl Plank) mimics the look of wood planks and is installed in long, narrow planks — typically 48 to 72 inches long. LVT (Luxury Vinyl Tile) mimics stone or ceramic tile and is installed in square or rectangular tile formats. Both are the same core product; the difference is purely the visual format. LVP is by far the more popular choice in Toronto homes right now.",
  },
  {
    q: "Is luxury vinyl really waterproof?",
    a: "Yes — the core, wear layer, and surface of LVP and LVT are all 100% waterproof. Water cannot penetrate the plank. However, water that seeps under the flooring through gaps at walls or transitions can still cause issues with the subfloor underneath, which is why proper installation with appropriate transitions and sealing at wet areas matters.",
  },
  {
    q: "Can luxury vinyl be installed over existing tile or hardwood?",
    a: "In many cases, yes. LVP is thin enough to float over most existing hard floors as long as the surface is flat, smooth, and structurally sound. We inspect the existing floor and confirm whether direct installation is suitable or whether removal is needed. Installing over existing flooring can save significant time and money.",
  },
  {
    q: "How thick should luxury vinyl be?",
    a: "Overall plank thickness (typically 5mm–8mm) determines how well the floor bridges minor subfloor imperfections. Wear layer thickness (6–20 mil) determines scratch and dent resistance. For most families with pets and kids, we recommend at least 12 mil wear layer and 6mm+ total thickness. We'll match you to the right product based on your rooms and household.",
  },
  {
    q: "Does luxury vinyl fade in sunlight?",
    a: "Premium LVP products have UV-resistant wear layers that resist fading well, but direct, prolonged sunlight through south or west-facing windows can cause gradual colour shift in any floor over many years. We recommend UV-filtering window films or blinds in very sunny rooms for any flooring type.",
  },
];

export default function VinylPage() {
  return (
    <main className="font-lato">
      {/* 1. Hero */}
      <PageHero
        title="Luxury Vinyl Flooring Toronto"
        subtitle="LVP and LVT flooring that's 100% waterproof, beautifully realistic, and built for real life — supplied and installed by Toronto's flooring experts."
        breadcrumb="Luxury Vinyl"
        imageSrc="/images/placeholder.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            The Modern Floor
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            The Floor That Can Handle Anything
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Luxury vinyl has become the fastest-growing flooring category in
            North America — and for good reason. It combines the visual warmth
            of wood or stone with a level of practical durability that genuine
            hardwood and tile simply can't match. It's 100% waterproof, scratch-
            resistant, softer underfoot than tile, and available in hundreds of
            realistic wood and stone designs.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            At Atlas Rug &amp; Design Centre, we've been advising Toronto
            homeowners on luxury vinyl since it first entered the market — and
            we've seen the technology improve dramatically. Our showroom at 978
            Bathurst Street carries a curated selection of LVP and LVT from
            leading manufacturers, with products at every price point and
            performance level. Come in and compare them side by side.
          </p>
        </div>
      </section>

      {/* 3. LVP vs LVT */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Know the Difference
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              LVP vs LVT
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LVP */}
            <div className="rounded-2xl border-2 border-gold bg-white p-8 shadow-sm">
              <div className="bg-stone-200 aspect-video w-full relative rounded-xl mb-6 overflow-hidden">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Luxury Vinyl Plank (LVP)"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4 bg-gold text-white">
                Most Popular
              </span>
              <h3 className="font-playfair text-2xl text-charcoal mb-4">
                LVP — Luxury Vinyl Plank
              </h3>
              <ul className="space-y-2 text-sm text-warm-grey">
                <li className="flex gap-2"><span className="text-gold font-bold">→</span> Mimics the look of real wood planks</li>
                <li className="flex gap-2"><span className="text-gold font-bold">→</span> Long, narrow format (typically 4–7" wide, 48–72" long)</li>
                <li className="flex gap-2"><span className="text-gold font-bold">→</span> Installed in staggered rows like hardwood</li>
                <li className="flex gap-2"><span className="text-gold font-bold">→</span> Ideal for open-plan spaces, bedrooms, basements</li>
                <li className="flex gap-2"><span className="text-gold font-bold">→</span> The dominant choice in Toronto residential interiors</li>
              </ul>
            </div>

            {/* LVT */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
              <div className="bg-stone-200 aspect-video w-full relative rounded-xl mb-6 overflow-hidden">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Luxury Vinyl Tile (LVT)"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4 bg-charcoal text-white">
                Stone & Tile Look
              </span>
              <h3 className="font-playfair text-2xl text-charcoal mb-4">
                LVT — Luxury Vinyl Tile
              </h3>
              <ul className="space-y-2 text-sm text-warm-grey">
                <li className="flex gap-2"><span className="text-charcoal font-bold">→</span> Mimics ceramic, porcelain, or natural stone</li>
                <li className="flex gap-2"><span className="text-charcoal font-bold">→</span> Square or rectangular tile format</li>
                <li className="flex gap-2"><span className="text-charcoal font-bold">→</span> Warmer and softer underfoot than real tile</li>
                <li className="flex gap-2"><span className="text-charcoal font-bold">→</span> No grout required (or optional thin grout joints)</li>
                <li className="flex gap-2"><span className="text-charcoal font-bold">→</span> Popular in bathrooms, laundry rooms, and mudrooms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Technology */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Under the Surface
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Core Technology
            </h2>
            <p className="text-warm-grey mt-4 max-w-2xl mx-auto">
              What's inside the plank matters. The core determines rigidity,
              sound performance, and how well the floor tolerates temperature
              swings.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "SPC Core",
                tag: "Most Popular",
                tagColor: "bg-gold",
                longName: "Stone Plastic Composite",
                description:
                  "SPC combines limestone powder with PVC to create an extremely rigid, dense core. This rigidity means SPC is the most dimensionally stable luxury vinyl — it doesn't expand and contract significantly with temperature changes. It also feels more solid underfoot than other vinyl constructions and is highly resistant to denting.",
                traits: ["Most rigid & stable", "Best for temperature extremes", "Handles radiant heat well"],
              },
              {
                name: "WPC Core",
                tag: "Softer Feel",
                tagColor: "bg-charcoal",
                longName: "Wood Plastic Composite",
                description:
                  "WPC incorporates a foamed wood-composite core that is slightly softer and warmer underfoot than SPC. It provides excellent acoustic performance and a more cushioned feel — often preferred in above-grade living rooms and bedrooms where comfort takes priority over maximum rigidity.",
                traits: ["Softer & warmer underfoot", "Better acoustic performance", "Comfortable for standing"],
              },
              {
                name: "Standard Vinyl",
                tag: "Budget Option",
                tagColor: "bg-stone-400",
                longName: "Traditional Vinyl Composite",
                description:
                  "Older-generation vinyl with a thinner, more flexible construction. Standard vinyl is the most affordable option and performs adequately in low-traffic areas. However, it shows subfloor imperfections more readily and lacks the acoustic and thermal performance of SPC and WPC. We typically recommend upgrading to SPC for most applications.",
                traits: ["Most affordable", "Flexible & easy to cut", "Lower acoustic performance"],
              },
            ].map((core) => (
              <div
                key={core.name}
                className="rounded-2xl shadow-sm border border-stone-100 bg-white flex flex-col overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${core.tagColor} text-white`}
                  >
                    {core.tag}
                  </span>
                  <h3 className="font-playfair text-xl text-charcoal mb-1">
                    {core.name}
                  </h3>
                  <p className="text-warm-grey text-xs mb-3 font-medium uppercase tracking-wide">
                    {core.longName}
                  </p>
                  <p className="text-warm-grey text-sm leading-relaxed mb-4 flex-1">
                    {core.description}
                  </p>
                  <ul className="space-y-1">
                    {core.traits.map((trait) => (
                      <li key={trait} className="flex items-center gap-2 text-sm text-charcoal">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Key Features — dark section */}
      <section className="bg-charcoal py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Why LVP?
            </p>
            <h2 className="font-playfair text-4xl text-white">
              Built for Real Life
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-7"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-playfair text-lg text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Wear Layer Guide */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              The Number That Matters Most
            </p>
            <h2 className="font-playfair text-4xl text-charcoal mb-6">
              Don't Overlook This Number
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed max-w-2xl mx-auto">
              The wear layer is the clear protective coating on top of the vinyl
              plank. It's the only thing standing between your floor's printed
              design and daily foot traffic, pet nails, furniture movement, and
              spills. Measured in thousandths of an inch (mil), the wear layer
              thickness is the single most important specification to check when
              comparing LVP products.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-5 py-4 font-lato font-semibold">Wear Layer</th>
                  <th className="text-left px-5 py-4 font-lato font-semibold">Durability</th>
                  <th className="text-left px-5 py-4 font-lato font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {wearLayerRows.map((row, i) => (
                  <tr key={row.thickness} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-5 py-3 font-semibold text-gold">{row.thickness}</td>
                    <td className="px-5 py-3 text-charcoal">{row.durability}</td>
                    <td className="px-5 py-3 text-warm-grey">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-sm mt-5 text-center">
            We recommend a minimum of <span className="font-semibold text-charcoal">12 mil</span> for households with pets, children, or high foot traffic.
          </p>
        </div>
      </section>

      {/* 7. Best Rooms */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Where It Shines
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Best Rooms for Luxury Vinyl
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestRooms.map((room) => (
              <div
                key={room.room}
                className="rounded-2xl bg-white border border-stone-100 shadow-sm overflow-hidden flex flex-col"
              >
                <div className="bg-stone-200 aspect-video w-full relative">
                  <Image
                    src="/images/placeholder.jpg"
                    alt={room.room}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                    <span className="text-4xl">{room.icon}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-playfair text-lg text-charcoal mb-2">
                    {room.room}
                  </h3>
                  <p className="text-warm-grey text-sm leading-relaxed flex-1">
                    {room.reason}
                  </p>
                </div>
              </div>
            ))}
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
              Luxury Vinyl FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 9. CTA Banner */}
      <CTABanner
        title="Ready for a Floor That Can Handle Real Life?"
        subtitle="Visit our Bathurst Street showroom to see and feel our LVP and LVT range in person. Free quotes and in-home consultations available across Toronto."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
