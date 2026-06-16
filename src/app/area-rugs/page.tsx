import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import FAQAccordion from "@/components/FAQAccordion";
import ProcessSteps from "@/components/ProcessSteps";

export const metadata: Metadata = {
  title: "Custom Area Rugs Toronto | Atlas Rug & Design Centre",
  description:
    "Custom area rugs in Toronto — any size, any shape, expertly bound. Choose from wool, nylon and natural fibres. Atlas Rug & Design Centre, serving Toronto since 1959.",
  alternates: { canonical: "/area-rugs" },
  openGraph: {
    title: "Custom Area Rugs Toronto | Atlas Rug & Design Centre",
    description:
      "Custom-sized, custom-bound area rugs in Toronto. Wool, nylon and natural fibres from Atlas Rug & Design Centre.",
    url: "https://atlasrugflooring.com/area-rugs",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Area Rugs Toronto | Atlas Rug & Design Centre",
    description:
      "Custom-sized, custom-bound area rugs in Toronto from Atlas Rug & Design Centre.",
  },
};

const materials = [
  {
    label: "Wool",
    tag: "Most Popular",
    tagColor: "bg-gold",
    description:
      "Naturally resilient, soft, and stain resistant, wool is the premium choice for area rugs. It holds colour beautifully, resists crushing, and ages gracefully — ideal for living rooms and bedrooms that see daily use.",
  },
  {
    label: "Nylon & Synthetics",
    tag: "Best Value",
    tagColor: "bg-charcoal",
    description:
      "Solution-dyed nylon offers excellent durability and stain resistance at a friendlier price than wool. It's a smart choice for high-traffic spaces, families with kids, and pet-owning households that need an easy-care rug.",
  },
];

const sizingRows = [
  { room: "Living Room", guide: "Front legs of all furniture on the rug; 8x10 or 9x12 for larger rooms" },
  { room: "Dining Room", guide: "Rug should extend 60cm (24in) beyond the table on all sides so chairs stay on it" },
  { room: "Bedroom", guide: "Extend 45–75cm (18–30in) past the sides and foot of the bed for a soft landing" },
  { room: "Hallway / Runner", guide: "Leave 10–15cm (4–6in) of floor visible on each side; custom length to fit" },
  { room: "Entryway", guide: "Sized to the space; durable, low-pile material that handles foot traffic and moisture" },
];

const steps = [
  { title: "Consultation", description: "We discuss the room, your furniture layout, and the look you want — and bring samples so you can see materials and colours in your own light." },
  { title: "Measure & Size", description: "We help you choose the perfect dimensions using proven room-sizing guidelines, then measure precisely for a rug that fits the space." },
  { title: "Select Material", description: "Choose from wool, nylon, and natural fibres in a wide range of colours, patterns, and textures to suit your décor." },
  { title: "Custom Binding", description: "We finish the edges with serged, cotton-tape, or custom border binding for a clean, durable, tailored result." },
  { title: "Delivery", description: "Your finished custom rug is ready to bring your room together — sized and bound exactly to your specifications." },
];

const faqItems = [
  { q: "Can you make a rug in any size?", a: "Yes. That's the advantage of a custom area rug — we cut and bind broadloom to virtually any dimension, so your rug fits the room perfectly rather than forcing you to settle for a standard size." },
  { q: "What does rug binding mean?", a: "Binding is the finished edge applied to a cut piece of carpet to turn it into an area rug. Options include serging, cotton or synthetic tape, and decorative borders. Binding prevents fraying and gives the rug a polished, custom look." },
  { q: "How do I choose the right rug size?", a: "It depends on the room. In a living room, the front legs of your furniture should sit on the rug; in a dining room, the rug should extend far enough that chairs stay on it when pulled out. We'll guide you through sizing during your consultation." },
  { q: "Are wool rugs worth the extra cost?", a: "For many homeowners, yes. Wool is naturally resilient, stain resistant, and longer lasting than most synthetics, and it has a luxurious feel. For high-traffic or pet-heavy spaces, a quality nylon can be a great value alternative." },
  { q: "Can a custom rug match my new flooring?", a: "Absolutely. Many clients add a custom area rug when installing new hardwood or vinyl to add warmth and define a space. We can coordinate the rug with your floor and décor." },
];

export default function AreaRugsPage() {
  return (
    <main className="font-lato">
      <PageHero
        title="Custom Area Rugs Toronto"
        subtitle="Any size, any shape, expertly bound — custom area rugs made to fit your space and style."
        breadcrumb="Area Rugs"
        imageSrc="/images/placeholder.jpg"
      />

      <section id="content" className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            65+ Years of Expertise
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
            A Rug That Fits Like It Was Meant To
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-5">
            Store-bought rugs come in a handful of standard sizes that rarely
            suit a room perfectly. At Atlas Rug &amp; Design Centre, we've been
            crafting custom area rugs for Toronto homes since 1959 — sized,
            shaped, and bound exactly to your space. Whether you need an oversized
            rug to anchor a Forest Hill living room, a perfectly proportioned
            piece for a dining table, or a soft landing for a bedroom, we make a
            rug that fits the way standard sizes simply can't.
          </p>
          <p className="text-warm-grey text-lg leading-relaxed">
            Choose from premium wool, durable nylon, and beautiful natural
            fibres, then finish the edges with the binding style that suits your
            look. The result is a rug that adds warmth, defines a space, and ties
            your room together — built to last and made just for you.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Rug Materials
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Materials We Work With
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
          <p className="text-center text-warm-grey mt-8">
            Looking for wall-to-wall instead? Explore our{" "}
            <Link href="/carpet" className="text-gold font-semibold hover:underline">
              carpet &amp; broadloom
            </Link>{" "}
            options.
          </p>
        </div>
      </section>

      <section className="bg-off-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Get It Right
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Room Sizing Guide
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-stone-100">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Room</th>
                  <th className="text-left px-4 py-3 font-lato font-semibold">Sizing Guideline</th>
                </tr>
              </thead>
              <tbody>
                {sizingRows.map((row, i) => (
                  <tr key={row.room} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.room}</td>
                    <td className="px-4 py-3 text-warm-grey">{row.guide}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Our Process
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              How a Custom Rug Is Made
            </h2>
          </div>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <section className="bg-off-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
              Common Questions
            </p>
            <h2 className="font-playfair text-4xl text-charcoal">
              Custom Area Rug FAQs
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <p className="text-center text-warm-grey mt-10">
            Serving{" "}
            <Link href="/locations/forest-hill" className="text-gold font-semibold hover:underline">Forest Hill</Link>,{" "}
            <Link href="/locations/rosedale" className="text-gold font-semibold hover:underline">Rosedale</Link>,{" "}
            <Link href="/locations/the-annex" className="text-gold font-semibold hover:underline">The Annex</Link>{" "}
            and all of Toronto.
          </p>
        </div>
      </section>

      <CTABanner
        title="Ready for a Rug That Fits Perfectly?"
        subtitle="Visit our Bathurst Street showroom or book a free consultation. Custom area rugs made in Toronto since 1959."
        primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </main>
  );
}
