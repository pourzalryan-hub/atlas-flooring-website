import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Condo Flooring Toronto | Flooring for Condos & Apartments",
  description:
    "Condo flooring in Toronto done right — IIC-rated acoustic underlay, board-approved installations, and fast, low-disruption fitting. Luxury vinyl, engineered hardwood and carpet from Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/condo-flooring" },
  openGraph: {
    title: "Condo Flooring Toronto | Flooring for Condos & Apartments",
    description:
      "Sound-rated, board-approved condo flooring in Toronto. Luxury vinyl plank, engineered hardwood and carpet installed with proper acoustic underlay by Atlas Rug & Design Centre.",
    url: "https://atlasrugflooring.com/condo-flooring",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Condo Flooring Toronto | Flooring for Condos & Apartments",
    description:
      "Sound-rated, board-approved condo flooring in Toronto from Atlas Rug & Design Centre — installed since 1959.",
  },
};

const materials = [
  {
    label: "Laminate",
    tag: "Most Popular for Condos",
    tagColor: "bg-gold",
    description:
      "Laminate is the most popular flooring choice for Toronto condos. It installs quickly as a floating floor over an acoustic underlay, handles the humidity swings of high-rise living without gapping or cupping, and delivers a hardwood look at a fraction of the cost. Paired with the right pad it easily meets most building sound requirements.",
  },
  {
    label: "Engineered Hardwood",
    tag: "Real Wood, Stable Core",
    tagColor: "bg-charcoal",
    description:
      "For owners who want genuine wood underfoot, engineered hardwood is the condo-friendly choice. Its dimensionally-stable plywood core tolerates the dry winter heat and concrete subfloors of a high-rise far better than solid wood, and it can float over a rated acoustic membrane to satisfy board sound specs.",
  },
  {
    label: "Carpet & Broadloom",
    tag: "Best Sound Absorption",
    tagColor: "bg-charcoal",
    description:
      "Nothing beats carpet for quieting a bedroom or den. Plush broadloom over a quality cushion is the easiest way to hit a high impact-sound rating, soften footsteps for the unit below, and add warmth — which is why many declarations specifically encourage it in sleeping areas.",
  },
];

const soundRows = [
  {
    material: "Carpet over cushion",
    performance: "Excellent — highest IIC",
    notes: "Best impact-noise absorption; often exempt from underlay rules",
  },
  {
    material: "Luxury vinyl + acoustic underlay",
    performance: "Very good — typically IIC 50–60+",
    notes: "Waterproof, fast floating install; verify pad rating against board spec",
  },
  {
    material: "Engineered hardwood + rated membrane",
    performance: "Good — IIC 50–55+ with proper pad",
    notes: "Real wood look; requires a board-approved acoustic membrane",
  },
  {
    material: "Hard floor with no underlay",
    performance: "Poor — usually fails board minimum",
    notes: "Transmits footsteps to the unit below; rarely permitted in condos",
  },
  {
    material: "Tile (bonded to slab)",
    performance: "Variable — needs uncoupling/acoustic mat",
    notes: "Common in wet areas; sound rating depends on the membrane used",
  },
];

const steps = [
  {
    title: "Consultation & Board Review",
    description:
      "We start by reviewing your building's flooring rules — the required IIC/STC rating, approved underlay list, and any restrictions in your declaration. We bring samples to your unit so you can see materials in your own light.",
  },
  {
    title: "Measure & Approval Package",
    description:
      "We measure precisely and prepare the documentation your board or property manager needs: product spec sheets, the acoustic underlay's lab-tested sound rating, and our certificate of insurance — so you get approval without back-and-forth.",
  },
  {
    title: "Schedule Building Logistics",
    description:
      "We coordinate the move-in elevator booking, confirm permitted work hours and noise windows, and arrange protection for common areas and lobbies so the install stays on the right side of building rules.",
  },
  {
    title: "Efficient Installation",
    description:
      "Our installers work cleanly and quickly to minimize disruption to you and your neighbours — most condo floors are completed in one to two days, with the rated acoustic underlay installed exactly to spec.",
  },
  {
    title: "Final Walkthrough & Documentation",
    description:
      "We do a room-by-room walkthrough, leave the common areas as we found them, and provide you with the product and underlay paperwork to keep on file for the corporation — closing out the approval cleanly.",
  },
];

const faqItems = [
  {
    q: "What sound rating does my condo require?",
    a: "Most Toronto condo corporations require hard-surface flooring to meet a minimum Impact Insulation Class (IIC) rating — commonly IIC 50 or higher — measured with a qualifying acoustic underlay. The exact number, and any Sound Transmission Class (STC) requirement, is set out in your building's declaration, rules, or a separate flooring policy. We review these documents with you before you choose a product so there are no surprises at approval.",
  },
  {
    q: "What is IIC and why does it matter in a condo?",
    a: "Impact Insulation Class (IIC) measures how well a floor assembly blocks impact noise — footsteps, dropped objects, chair scrapes — from reaching the unit below. A higher IIC means quieter neighbours and fewer complaints. Because the concrete slab in a high-rise transmits impact sound efficiently, the acoustic underlay beneath your finished floor does most of the work, which is why boards regulate it so closely.",
  },
  {
    q: "Do I need condo board approval before installing flooring?",
    a: "Almost always, yes. Most corporations require written approval before any hard-surface flooring is installed. The approval package typically includes the product specification, the lab-tested sound rating of the underlay, the installer's certificate of insurance, and sometimes a signed acknowledgement of the rules. We prepare this documentation as a standard part of every condo job so the process is smooth.",
  },
  {
    q: "Which flooring is best for a condo?",
    a: "Laminate over an acoustic underlay is the most popular condo choice — it delivers a hardwood look at an accessible price, installs quickly as a floating floor, and easily meets most building sound requirements. Engineered hardwood is the choice for those who want real wood, and carpet remains the quietest option for bedrooms. The right pick depends on your building's rules and how you use each room.",
  },
  {
    q: "How long does a condo flooring installation take?",
    a: "Most condo units are completed in one to two days. Floating floors like LVP and engineered hardwood install quickly because there's no nailing into the slab. We schedule the work within your building's permitted hours and around your elevator booking to keep disruption to a minimum for you and your neighbours.",
  },
  {
    q: "Will you handle the elevator booking and insurance for my building?",
    a: "Yes. We're experienced with high-rise logistics: we'll help coordinate the service elevator booking, work within posted noise and work-hour windows, protect lobbies and corridors, and provide a certificate of insurance naming the corporation if required. Handling these details is part of doing condo work properly.",
  },
];

export default function CondoFlooringPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Condo Flooring Toronto"
        subtitle="Sound-rated, board-approved flooring for condos and apartments — installed cleanly and quickly by Toronto's flooring experts."
        breadcrumb="Condo Flooring"
        imageSrc="/images/vinyl-lvp.jpg"
      />

      {/* 2. Intro */}
      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            65+ Years of Expertise
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Flooring Built for High-Rise Living
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Flooring a condo is not the same as flooring a house. In a high-rise,
            your floor sits on a concrete slab shared with the neighbours below,
            your building has rules about what you can install, and your
            installers have to work around elevators, insurance certificates, and
            posted work hours. Since 1959, Atlas Rug &amp; Design Centre has
            helped Toronto residents navigate exactly this — from downtown
            towers to midtown mid-rises — and our showroom at 978 Bathurst Street
            stocks the materials and acoustic underlays that condo boards
            actually approve.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            The single most important difference in a condo is sound. Footsteps,
            dropped keys, and a chair pushed back from the dining table all travel
            through the slab to the unit below, which is why nearly every Toronto
            condo corporation regulates hard-surface flooring through an Impact
            Insulation Class (IIC) requirement and an approved acoustic underlay.
            Get the assembly right and you have a quiet, durable, beautiful floor
            and a happy downstairs neighbour. Get it wrong and you risk a noise
            complaint, a board order to remove the floor, or both. Our job is to
            get it right the first time — material, underlay, paperwork, and all.
          </p>
        </div>
      </section>

      {/* 3. Material Options */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Condo-Friendly Options
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Materials That Suit a Condo
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {materials.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 p-6 flex flex-col"
              >
                <span
                  className={`inline-block self-start text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 ${m.tagColor} text-white`}
                >
                  {m.tag}
                </span>
                <h3 className="font-playfair text-xl text-charcoal mb-2">
                  {m.label}
                </h3>
                <p className="text-warm-grey text-sm leading-relaxed flex-1">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-warm-grey mt-8 max-w-3xl mx-auto leading-relaxed">
            Explore each option in depth:{" "}
            <Link href="/vinyl" className="text-gold font-semibold hover:underline">
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
            <Link href="/carpet" className="text-gold font-semibold hover:underline">
              carpet &amp; broadloom
            </Link>
            . Whichever you choose, the acoustic underlay beneath it is what makes
            it condo-ready.
          </p>
        </div>
      </section>

      {/* 4. Sound Performance Table */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Acoustics & IIC Ratings
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How Each Floor Handles Sound
            </h2>
            <p className="text-warm-grey text-lg leading-relaxed mt-5">
              IIC ratings depend on the full assembly — the finished floor plus
              the underlay plus the slab. These are typical results; always
              confirm the specific lab-tested rating of your chosen underlay
              against your building&apos;s minimum before you buy.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Material
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Sound Performance
                  </th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {soundRows.map((row, i) => (
                  <tr
                    key={row.material}
                    className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-charcoal">
                      {row.material}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">
                      {row.performance}
                    </td>
                    <td className="px-4 py-3 text-warm-grey">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mt-8">
            Most Toronto condo declarations set a minimum IIC of around 50, and
            some newer or higher-end buildings require more. The number on a
            product&apos;s box is only meaningful when it comes from a recognized
            lab test of the same assembly your board specifies — the same plank,
            the same underlay, and a concrete slab. We keep the documentation for
            our underlays on hand precisely so the rating you submit for approval
            is the rating that was actually tested.
          </p>
        </div>
      </section>

      {/* 5. Board Approval & Logistics */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Getting It Approved
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Board Approval &amp; Building Logistics
            </h2>
          </div>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            The paperwork side of a condo floor trips up more renovations than the
            installation itself. Before a single plank is laid, most corporations
            require written approval from the board or property manager. A
            complete approval package usually includes the product specification
            sheet, the lab-tested IIC/STC rating of the acoustic underlay, the
            installer&apos;s certificate of insurance, and a signed
            acknowledgement that the work will follow building rules. Submitting
            all of this at once — rather than piecemeal — is the fastest route to
            a green light, and it is exactly how we package every condo job.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Once you&apos;re approved, building logistics take over. Almost every
            tower requires a service-elevator booking for moving materials and
            debris, and many charge a refundable deposit against damage to the
            cab and common areas. Work is generally confined to posted hours —
            often weekdays only, with no early-morning or evening noise — and
            corridors, lobbies, and elevators must be protected with proper floor
            covering. We plan around all of it: booking the elevator, scheduling
            within the permitted noise window, and protecting the common spaces so
            management has no reason to halt the job.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            Because we handle consultation, supply, and installation under one
            roof, we can move quickly once approval lands — most condo floors are
            finished in one to two days. That speed matters in a high-rise, where
            every extra day means another elevator booking, more disruption to
            your neighbours, and more time living around an unfinished floor. A
            tidy, fast, well-documented install keeps you, your board, and the
            unit below you on good terms.
          </p>
        </div>
      </section>

      {/* 6. Process */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How a Condo Floor Gets Done
            </h2>
          </div>
          <ProcessSteps steps={steps} />
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
              Condo Flooring FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving condos across{" "}
            <Link
              href="/locations/downtown-toronto"
              className="text-gold font-semibold hover:underline"
            >
              Downtown Toronto
            </Link>
            ,{" "}
            <Link
              href="/locations/midtown-toronto"
              className="text-gold font-semibold hover:underline"
            >
              Midtown Toronto
            </Link>
            ,{" "}
            <Link
              href="/locations/etobicoke"
              className="text-gold font-semibold hover:underline"
            >
              Etobicoke
            </Link>{" "}
            and all of the GTA.
          </p>
        </div>
      </section>

      <ReviewsSection service="general" />

      {/* 8. CTA Banner */}
      <CTABanner
        title="Ready for Board-Approved Condo Flooring?"
        subtitle="Visit our Bathurst Street showroom or book a free consultation. Sound-rated, properly documented condo floors installed across Toronto since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
