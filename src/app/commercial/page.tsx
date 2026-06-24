import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Commercial Flooring Toronto | Atlas Rug & Design Centre",
  description:
    "Commercial flooring in Toronto for offices, retail, restaurants, condos and healthcare. Commercial-grade LVP, carpet tile, hardwood and sheet vinyl, installed with minimal downtime. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/commercial" },
  openGraph: {
    title: "Commercial Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Durable commercial flooring for Toronto offices, retail, restaurants and condos. Commercial-grade LVP, carpet tile, hardwood and sheet vinyl from Atlas Rug & Design Centre.",
    url: "https://atlasrugflooring.com/commercial",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Flooring Toronto | Atlas Rug & Design Centre",
    description:
      "Durable, low-maintenance commercial flooring for Toronto businesses from Atlas Rug & Design Centre.",
  },
};

const spaces = [
  {
    label: "Offices & Workspaces",
    tag: "Most Requested",
    tagColor: "bg-gold",
    description:
      "Carpet tile and luxury vinyl plank dominate the modern office for good reason — they handle rolling chairs, foot traffic, and constant rearrangement while keeping acoustics in check. Carpet tile lets you swap a single damaged square instead of recarpeting a floor, which is invaluable in a working space.",
  },
  {
    label: "Retail Stores",
    tag: "High Traffic",
    tagColor: "bg-charcoal",
    description:
      "Retail floors take a beating from carts, heels, and constant traffic, so we lean toward wear-rated commercial LVP and polished concrete-look finishes that read as premium but clean up in minutes. The floor should flatter the merchandise, not compete with it.",
  },
  {
    label: "Restaurants & Hospitality",
    tag: "Spill-Ready",
    tagColor: "bg-charcoal",
    description:
      "Kitchens and dining rooms need slip resistance and easy sanitation. Sheet vinyl with heat-welded seams creates a near-seamless, water-tight surface for back-of-house, while wood-look LVP brings warmth to the dining room without the maintenance headache of real hardwood.",
  },
  {
    label: "Condos & Common Areas",
    tag: "Property Managers",
    tagColor: "bg-charcoal",
    description:
      "Lobbies, corridors, amenity rooms, and party rooms demand finishes that look upscale and survive years of resident traffic. We work with property managers and condo boards on durable, on-budget specifications that hold up between renovation cycles.",
  },
  {
    label: "Healthcare & Clinics",
    tag: "Hygienic",
    tagColor: "bg-charcoal",
    description:
      "Clinics, dental offices, and medical suites need flooring that is seamless, non-porous, and easy to disinfect. Sheet vinyl and homogeneous resilient flooring meet infection-control standards while staying comfortable underfoot for staff on long shifts.",
  },
  {
    label: "Showrooms & Light Industrial",
    tag: "Durable",
    tagColor: "bg-charcoal",
    description:
      "Whether it is a car showroom, a gym, or a warehouse office, we match the product to the load. Thick-wear-layer LVP and high-performance sheet goods stand up to point loads, rolling equipment, and the kind of abuse that destroys residential-grade product.",
  },
];

const productRows = [
  {
    product: "Commercial LVP",
    bestFor: "Offices, retail, restaurant dining",
    durability: "Excellent — thick wear layer, waterproof",
    maintenance: "Damp mop; no refinishing required",
  },
  {
    product: "Carpet Tile",
    bestFor: "Offices, condos, meeting rooms",
    durability: "Very good — replace tiles individually",
    maintenance: "Vacuum; spot-clean or swap tiles",
  },
  {
    product: "Commercial Hardwood",
    bestFor: "Showrooms, boutiques, executive suites",
    durability: "Good — refinishable, premium look",
    maintenance: "Periodic recoat; pH-neutral cleaning",
  },
  {
    product: "Sheet Vinyl",
    bestFor: "Healthcare, kitchens, wet areas",
    durability: "Excellent — seamless, water-tight",
    maintenance: "Disinfect easily; minimal upkeep",
  },
  {
    product: "Polished / Concrete-Look",
    bestFor: "Retail, industrial, modern lobbies",
    durability: "Excellent — handles heavy loads",
    maintenance: "Dust mop; very low maintenance",
  },
];

const steps = [
  {
    title: "Site Assessment",
    description:
      "We visit your space to evaluate traffic patterns, subfloor condition, moisture levels, and accessibility. Understanding how the space is actually used drives every product recommendation that follows.",
  },
  {
    title: "Specification & Quote",
    description:
      "We recommend products matched to your wear requirements, budget, and timeline, then provide a detailed written quote — materials, labour, subfloor prep, and removal all itemized with no hidden charges.",
  },
  {
    title: "Phased Scheduling",
    description:
      "For occupied buildings we plan the work in phases, after hours, or over weekends so your business keeps running. We coordinate with property management, security, and your team to minimize disruption.",
  },
  {
    title: "Professional Installation",
    description:
      "Our installers prep the subfloor properly, control dust and noise, and install to manufacturer specification — including transitions, moisture barriers, and heat-welded seams where required.",
  },
  {
    title: "Walkthrough & Warranty",
    description:
      "We complete a final walkthrough, confirm the work meets spec, and hand over care guidance plus warranty documentation so your maintenance team knows exactly how to protect the investment.",
  },
];

const faqItems = [
  {
    q: "Can you install while our business stays open?",
    a: "Yes. Most of our commercial projects happen in occupied buildings, so we schedule phased installs, after-hours work, and weekend shifts to keep your operation running. We map out the sequence in advance so you always have a usable space and clear access during business hours.",
  },
  {
    q: "What is the most durable flooring for high-traffic commercial spaces?",
    a: "It depends on the use, but commercial-grade luxury vinyl plank with a thick wear layer (typically 20 mil or higher) is our go-to for offices, retail, and restaurants because it is waterproof, scratch-resistant, and needs no refinishing. For wet or clinical environments, heat-welded sheet vinyl is hard to beat. We rate products by commercial wear class, not residential ratings.",
  },
  {
    q: "Why choose carpet tile over broadloom for an office?",
    a: "Carpet tile lets you replace a single damaged square instead of recarpeting an entire floor, which dramatically lowers lifetime cost in a working office. It is faster to install around furniture, easier to access under-floor cabling, and the modular design helps with acoustics and zoning. Explore our broadloom options on the carpet page if a continuous look is preferred.",
  },
  {
    q: "How do you handle subfloor moisture in commercial buildings?",
    a: "Moisture is the number one cause of commercial flooring failure, especially on concrete slabs and below grade. We test moisture levels before installation and, where needed, install moisture-mitigation barriers or specify products engineered for damp conditions. Skipping this step is how floors lift and warp a year later — we never do.",
  },
  {
    q: "Do you work with property managers and condo boards?",
    a: "Regularly. We provide specifications, samples, and budgets suited to common areas, corridors, and amenity rooms, and we are comfortable working within building rules, elevator bookings, and resident-notice requirements. We can quote a single suite or a full corridor refresh.",
  },
  {
    q: "Can commercial hardwood hold up in a busy space?",
    a: "In the right setting, yes. Commercial hardwood works beautifully in showrooms, boutiques, and executive suites where you want a premium look and are willing to recoat periodically. For the busiest, wettest spaces we usually recommend wood-look LVP instead, which delivers the aesthetic with far less maintenance.",
  },
];

export default function CommercialPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Commercial Flooring Toronto"
        subtitle="Durable, low-maintenance flooring for offices, retail, restaurants, condos and healthcare — installed with minimal downtime."
        breadcrumb="Commercial"
        imageSrc="/images/commercial-hero.png"
      />

      {/* 2. Intro */}
      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            65+ Years of Expertise
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Flooring That Works as Hard as You Do
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            A commercial floor has a different job than a residential one. It has
            to absorb hundreds or thousands of footsteps a day, shrug off rolling
            chairs and equipment carts, survive spills and cleaning chemicals,
            and still look professional years down the line. Since 1959, Atlas
            Rug &amp; Design Centre has helped Toronto businesses choose and
            install flooring built for exactly that — from a single office suite
            to a full retail fit-out. The difference between a floor that lasts
            and one that fails almost always comes down to specifying the right
            product for the way the space is actually used, and installing it
            properly the first time.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            We work with business owners, designers, contractors, and property
            managers across the city, and we are honest about trade-offs. A
            beautiful hardwood might be wrong for a busy restaurant; a budget
            carpet might cost you more over five years than the durable option.
            Our job is to match wear ratings, maintenance realities, and your
            budget to a floor that earns its keep — then get it installed with
            as little disruption to your operation as possible.
          </p>
        </div>
      </section>

      {/* 3. Spaces We Serve */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Spaces We Serve
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Commercial Spaces We Floor
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaces.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 p-6 flex flex-col"
              >
                <span
                  className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${s.tagColor} text-white`}
                >
                  {s.tag}
                </span>
                <h3 className="font-playfair text-xl text-charcoal mb-2">
                  {s.label}
                </h3>
                <p className="text-warm-grey text-sm leading-relaxed flex-1">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-warm-grey mt-10">
            Many projects combine several products — durable{" "}
            <Link href="/vinyl" className="text-gold font-semibold hover:underline">
              luxury vinyl
            </Link>
            ,{" "}
            <Link href="/carpet" className="text-gold font-semibold hover:underline">
              carpet tile
            </Link>
            , and{" "}
            <Link href="/hardwood" className="text-gold font-semibold hover:underline">
              commercial hardwood
            </Link>{" "}
            — zoned to how each area is used.
          </p>
        </div>
      </section>

      {/* 4. Product Comparison */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Choose the Right Product
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Commercial Flooring Comparison
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
                    Durability
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Maintenance
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
                    <td className="px-4 py-3 text-warm-grey">
                      {row.durability}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">
                      {row.maintenance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mt-8 max-w-4xl mx-auto text-center">
            The biggest mistake we see is specifying a residential-grade product
            for a commercial load. Wear layers, traffic ratings, and warranty
            terms all differ, and a floor that is perfect for a living room can
            be worn through in a lobby within a year. We help you read past the
            marketing to the numbers that actually predict how a floor will hold
            up, and we factor lifetime cost — not just the install price — into
            every recommendation.
          </p>
        </div>
      </section>

      {/* 5. Process */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How a Commercial Project Works
            </h2>
          </div>
          <ProcessSteps steps={steps} />
          <p className="text-warm-grey text-lg leading-relaxed mt-10 max-w-3xl mx-auto text-center">
            Minimal downtime is the heart of every commercial job we take on. We
            sequence the work so that occupied buildings stay open, coordinate
            after-hours and weekend installs, and keep the site clean and safe
            throughout. Whether you are renovating a single floor or rolling out
            a multi-suite refresh, we plan around your operation — not the other
            way around.
          </p>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Commercial Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving businesses in{" "}
            <Link
              href="/locations/downtown-toronto"
              className="text-gold font-semibold hover:underline"
            >
              Downtown Toronto
            </Link>
            ,{" "}
            <Link
              href="/locations/toronto"
              className="text-gold font-semibold hover:underline"
            >
              Toronto
            </Link>
            ,{" "}
            <Link
              href="/locations/etobicoke"
              className="text-gold font-semibold hover:underline"
            >
              Etobicoke
            </Link>{" "}
            and across the GTA.
          </p>
        </div>
      </section>

      <ReviewsSection service="commercial" />

      {/* 7. CTA Banner */}
      <CTABanner
        title="Planning a Commercial Project?"
        subtitle="Visit our Bathurst Street showroom or book a free on-site assessment. Trusted by Toronto businesses since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
