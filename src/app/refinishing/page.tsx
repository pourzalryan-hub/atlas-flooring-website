import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSchema from "@/components/FaqSchema";
import WhyAtlas from "@/components/WhyAtlas";

export const metadata: Metadata = {
  title: "Hardwood Floor Refinishing Toronto | Atlas Rug & Design Centre",
  description:
    "Professional hardwood floor refinishing and restoration in Toronto. Sand, stain, and refinish your existing floors to like-new condition. Atlas Rug & Design Centre — since 1959. Free quotes available.",
  alternates: { canonical: "/refinishing" },
  openGraph: {
    title: "Hardwood Floor Refinishing Toronto | Atlas Rug & Design Centre",
    description:
      "Professional hardwood floor refinishing and restoration in Toronto since 1959.",
    url: "https://atlasrugflooring.com/refinishing",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardwood Floor Refinishing Toronto | Atlas Rug & Design Centre",
    description:
      "Professional hardwood floor refinishing and restoration in Toronto.",
  },
};

const benefits = [
  {
    icon: "💰",
    title: "Fraction of the Cost of Replacement",
    description:
      "Refinishing your existing hardwood costs significantly less than tearing it out and installing new flooring. In most cases, you get a like-new result for 20–30% of the replacement cost.",
  },
  {
    icon: "♻️",
    title: "Sustainable Choice",
    description:
      "Refinishing extends the life of your existing wood rather than sending it to landfill. It's one of the most environmentally responsible decisions you can make as a homeowner.",
  },
  {
    icon: "🎨",
    title: "Change the Colour",
    description:
      "Refinishing is your opportunity to completely change the stain colour — go lighter, darker, or choose a trendy grey or natural finish. Your floors, your vision.",
  },
  {
    icon: "⏱️",
    title: "Fast Turnaround",
    description:
      "Most refinishing jobs are complete in 2–3 days. With waterborne finishes, light foot traffic is possible within 24 hours. Compare that to a full installation job.",
  },
  {
    icon: "🏡",
    title: "Adds Real Resale Value",
    description:
      "Refinished hardwood floors are one of the top ROI home improvements. Buyers notice floors immediately — beautiful hardwood sells homes faster and for more.",
  },
  {
    icon: "🔄",
    title: "Can Be Done Multiple Times",
    description:
      "Solid hardwood can typically be sanded and refinished 5–7 times over its lifetime, depending on the thickness. Most Toronto hardwood floors have plenty of life left in them.",
  },
];

const finishOptions = [
  {
    name: "Waterborne Polyurethane",
    tag: "Most Popular",
    description:
      "Clear, low-odour, and fast-drying. Waterborne finishes have largely replaced oil-based poly in residential refinishing. Excellent durability with a clean, natural look. Available in matte, satin, and semi-gloss.",
  },
  {
    name: "Oil-Based Polyurethane",
    tag: "Traditional",
    description:
      "The classic choice for decades. Oil-based poly adds a warm amber tone that deepens with age — beloved in traditional and heritage homes. Longer dry time but extremely durable.",
  },
  {
    name: "Hardwax Oil",
    tag: "Natural Look",
    description:
      "A penetrating oil finish that soaks into the wood rather than sitting on top. The result is a natural, close-to-the-wood appearance with a matte sheen. Spot-repairable without sanding the entire floor.",
  },
];

const stainColours = [
  { name: "Natural / Unstained", note: "Let the wood's true colour show" },
  { name: "Early American", note: "Warm honey-brown, the classic Toronto choice" },
  { name: "Jacobean", note: "Rich dark espresso" },
  { name: "Special Walnut", note: "Mid-brown with warm undertones" },
  { name: "Ebony", note: "Near-black for a dramatic statement" },
  { name: "Whitewash / Bleach", note: "Light, Scandinavian, airy" },
  { name: "Grey Tones", note: "Cool greige or warm taupe grey" },
  { name: "Custom Blend", note: "We mix to match your exact vision" },
];

const refinishingSteps = [
  {
    title: "Assessment",
    description:
      "We inspect your floors to confirm they have enough thickness for sanding, check for loose boards, protruding nails, or subfloor issues that need addressing first. We'll tell you honestly if your floors are good candidates.",
  },
  {
    title: "Furniture & Prep",
    description:
      "You remove furniture from the rooms. We protect adjacent areas with dust barriers and ensure good ventilation. We confirm your chosen stain colour and finish before we begin.",
  },
  {
    title: "Sanding",
    description:
      "We sand the floor in multiple passes — coarse to remove the old finish and level the surface, followed by medium and fine grits for a smooth, even result. Edges and corners are hand-sanded for a uniform look.",
  },
  {
    title: "Staining (if selected)",
    description:
      "If you've chosen a stain colour, it's applied evenly and allowed to penetrate before the first coat of finish. We provide a sample test area so you can approve the colour before we proceed.",
  },
  {
    title: "Finish Coats",
    description:
      "Two to three coats of your chosen finish are applied, with light screening between coats for adhesion. The result is a smooth, even, durable surface that protects the wood for years.",
  },
  {
    title: "Final Walkthrough",
    description:
      "We walk every room with you before we're done. We provide care and maintenance instructions for your specific finish, and advise on when to return furniture and resume normal use.",
  },
];

const faqItems = [
  {
    q: "How do I know if my floors can be refinished?",
    a: "Solid hardwood can typically be refinished if there's at least 3/32\" of wood above the tongue groove. Engineered hardwood can sometimes be refinished once, depending on the veneer thickness — we'll assess this in person. Tell-tale signs your floors need refinishing: deep scratches that catch your nail, grey or black discolouration, uneven sheen, or a worn finish that no longer protects the wood.",
  },
  {
    q: "How long does floor refinishing take?",
    a: "Most refinishing jobs take 2–3 days: one day for sanding, one for staining and first coat, one for final coats. With waterborne finishes, light foot traffic is possible in 24 hours. We recommend waiting 5–7 days before replacing furniture and 30 days before placing rugs.",
  },
  {
    q: "How dusty is floor sanding?",
    a: "We use dustless sanding equipment that captures the vast majority of dust at the source. Some fine dust is unavoidable, but our process is dramatically cleaner than old drum-sanding methods. We use dust barriers between rooms to protect the rest of your home.",
  },
  {
    q: "Can I change the colour of my hardwood when refinishing?",
    a: "Yes — refinishing is the perfect opportunity to completely change your stain colour. Going darker is always possible. Going lighter is achievable on most species, though some woods resist light stains. We do a test patch in an inconspicuous area to confirm the colour before proceeding.",
  },
  {
    q: "How often should hardwood floors be refinished?",
    a: "It depends on traffic and maintenance, but most hardwood floors benefit from refinishing every 10–15 years in a typical family home. You can tell it's time when the finish no longer beads water, scratches reach the raw wood, or the floor looks dull and worn despite cleaning.",
  },
  {
    q: "Do you refinish engineered hardwood?",
    a: "It depends on the engineered product. Thick-veneer engineered hardwood (3mm+) can often be lightly sanded and refinished once. Thin-veneer products (1–2mm) typically cannot. We'll assess your specific floor during our consultation and give you an honest recommendation.",
  },
];

export default function RefinishingPage() {
  return (
    <main className="font-lato">
      <FaqSchema items={faqItems} />
      {/* 1. Hero */}
      <PageHero
        title="Hardwood Floor Refinishing Toronto"
        subtitle="Restore your existing hardwood to like-new beauty — a fraction of the cost of replacement."
        breadcrumb="Floor Refinishing"
        imageSrc="/images/refinishing-hero.jpg"
      />

      {/* 2. Intro */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Before You Replace — Refinish
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            Your Old Floors Might Just Need a Second Life
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Thousands of Toronto homeowners replace hardwood floors that could
            have been beautifully restored for a fraction of the price. If your
            floors are solid hardwood — and most pre-1990s Toronto homes have
            them — there's a very good chance they can be sanded, stained, and
            finished to look better than new.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            At Atlas Rug &amp; Design Centre, we've been refinishing hardwood
            floors across Toronto since 1959. We use dustless sanding equipment,
            premium waterborne and oil finishes, and the kind of care and
            craftsmanship that comes from decades of experience.
          </p>
        </div>
      </section>

      {/* 3. Benefits */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Why Refinish
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Why Refinishing Makes Sense
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-off-white border border-stone-100 p-7">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-playfair text-lg text-charcoal mb-2">{b.title}</h3>
                <p className="text-warm-grey text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Finish Options */}
      <section className="bg-charcoal py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Finish Selection
            </p>
            <h2 className="font-playfair text-4xl text-white">
              Choose Your Finish
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finishOptions.map((f) => (
              <div key={f.name} className="rounded-2xl bg-white/5 border border-white/10 p-7">
                <span className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-4 bg-gold text-white">
                  {f.tag}
                </span>
                <h3 className="font-playfair text-xl text-white mb-3">{f.name}</h3>
                <p className="text-stone-300 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stain Colours */}
      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Change the Look
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Popular Stain Colours
            </h2>
            <p className="text-warm-grey mt-4 max-w-xl mx-auto">
              Refinishing is your chance to completely transform the tone of your
              floors. We carry a full range of Bona and RBM stains and can custom-blend to match your vision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stainColours.map((s) => (
              <div key={s.name} className="flex items-center gap-4 bg-white rounded-xl border border-stone-100 px-6 py-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                <div>
                  <p className="font-semibold text-charcoal text-sm">{s.name}</p>
                  <p className="text-warm-grey text-xs">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
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
              How Floor Refinishing Works
            </h2>
          </div>
          <ProcessSteps steps={refinishingSteps} />
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
              Refinishing FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <WhyAtlas />

      <ReviewsSection service="refinishing" />

      {/* 8. CTA */}
      <CTABanner
        title="Ready to Restore Your Floors?"
        subtitle="Book a free assessment and we'll tell you honestly whether refinishing is the right choice for your hardwood."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
