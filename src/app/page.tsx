import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Atlas Rug & Design Centre | Premium Flooring Toronto",
  description:
    "Premium hardwood, carpet, luxury vinyl, laminate & stair runners in Toronto. Expert installation across the GTA since 1959. Visit our showroom at 978 Bathurst St or book a free consultation.",
};

const products = [
  {
    label: "Hardwood Flooring",
    hook: "Timeless beauty, built to last a lifetime",
    href: "/hardwood",
    image: "/images/hardwood-hero.jpg",
  },
  {
    label: "Carpet & Broadloom",
    hook: "Comfort underfoot in every room",
    href: "/carpet",
    image: "/images/carpet-hero.jpg",
  },
  {
    label: "Luxury Vinyl",
    hook: "100% waterproof, endlessly durable",
    href: "/vinyl",
    image: "/images/vinyl-hero.jpg",
  },
  {
    label: "Stair Runners",
    hook: "Complete the look, top to bottom",
    href: "/stair-runners",
    image: "/images/stair-runners-hero.jpg",
  },
  {
    label: "Laminate Flooring",
    hook: "Beautiful looks, real-world performance",
    href: "/laminate",
    image: "/images/laminate-hero.png",
  },
  {
    label: "Floor Refinishing",
    hook: "Restore your floors to like-new condition",
    href: "/refinishing",
    image: "/images/refinishing-hero.jpg",
  },
];

const whyUs = [
  {
    icon: "◆",
    title: "65 Years on Bathurst Street",
    description:
      "We opened in 1959 and we're still here. That kind of longevity doesn't happen by accident — it happens because Toronto homeowners keep coming back, and keep sending their neighbours.",
  },
  {
    icon: "◆",
    title: "We'll Tell You When Not to Replace",
    description:
      "If your existing hardwood can be refinished for a fraction of the cost of new flooring, we'll tell you that — even if it means a smaller job for us. We'd rather earn your trust than chase a bigger invoice.",
  },
  {
    icon: "◆",
    title: "Fast, Clean Installations",
    description:
      "We schedule around you. Installers work efficiently, protect your home during the job, and leave the space clean. Most residential installs are done in one to two days.",
  },
  {
    icon: "◆",
    title: "Written Quotes, No Surprises",
    description:
      "We measure your rooms, check your subfloor, and give you a written quote that itemises everything — materials, labour, removal, transitions. The number we quote is the number you pay.",
  },
];

const testimonials = [
  {
    quote:
      "Atlas completely transformed our home. The hardwood floors are absolutely stunning and the crew was professional, tidy, and fast. I've already referred three of my neighbours.",
    name: "Sarah M.",
    location: "North York",
  },
  {
    quote:
      "We had carpet installed on our entire second floor. Competitive pricing, zero mess left behind, and the team was genuinely kind. Five stars without hesitation.",
    name: "David & Lisa K.",
    location: "Etobicoke",
  },
  {
    quote:
      "We had our entire main floor done in hardwood and it turned out beautifully. The team was knowledgeable, professional, and the quality of the installation is outstanding. Highly recommend Atlas.",
    name: "Jennifer R.",
    location: "Midtown Toronto",
  },
];


export default function HomePage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center bg-charcoal overflow-hidden">
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-charcoal to-stone-800" />
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Toronto&apos;s Trusted Source for{" "}
            <span className="text-gold">Premium Flooring</span> &amp; Expert Installation
          </h1>
          <p className="font-lato text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hardwood, carpet, vinyl, laminate &amp; stair runners — expert installation
            across Toronto and the GTA since 1959.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/contact" className="btn-gold text-base px-10 py-5">
              Book a Free Consultation
            </Link>
            <Link href="#products" className="btn-outline-white text-base px-10 py-5">
              Explore Our Products
            </Link>
          </div>

          {/* Trust bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: "🏆", text: "65+ Years in Business" },
              { icon: "🏠", text: "10,000+ Homes Transformed" },
              { icon: "✓", text: "100% Satisfaction Guaranteed" },
              { icon: "📍", text: "Toronto & GTA" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 justify-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
              >
                <span className="text-lg">{icon}</span>
                <span className="font-lato text-xs text-white/90 font-semibold">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── PRODUCTS GRID ───────────────────────────────────────── */}
      <section id="products" className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">WHAT WE OFFER</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">
              Every Floor, Every Style
            </h2>
            <p className="font-lato text-lg text-warm-grey max-w-xl mx-auto">
              We carry and install the full range — from rustic hardwood to plush
              carpet, stair runners, and luxury vinyl.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center flex items-end justify-start p-6 group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                    <div className="relative z-10">
                      <h3 className="font-playfair text-2xl text-white mb-1">
                        {product.label}
                      </h3>
                      <p className="font-lato text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {product.hook}
                      </p>
                    </div>
                  </div>
                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="font-lato text-gold font-semibold hover:text-gold-dark transition-colors text-lg"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ATLAS ────────────────────────────────────── */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Showroom / team photo */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-700 order-2 lg:order-1"
              style={{ backgroundImage: "url('/images/about-showroom.png')", backgroundSize: "cover", backgroundPosition: "center" }}
            />

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="section-label-white">WHY ATLAS</span>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6 leading-tight">
                Why Toronto Homeowners Choose Us
              </h2>
              <p className="font-lato text-lg text-white/70 mb-10 leading-relaxed">
                We&apos;re not just a flooring store — we&apos;re your design partners. From
                the moment you walk into our showroom to the day your floor is
                complete, we make the process seamless, stress-free, and enjoyable.
              </p>

              <ul className="space-y-6">
                {whyUs.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="text-gold text-lg mt-0.5 flex-shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-lato font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="font-lato text-sm text-white/65 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link href="/about" className="btn-outline-white">
                  Learn About Atlas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">OUR WORK</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">
              Our Work Speaks for Itself
            </h2>
            <p className="font-lato text-lg text-warm-grey">
              Real installs, real Toronto homes — see what&apos;s possible.
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {[
              { src: "/images/project-hardwood-leaside.jpg",               label: "White Oak Hardwood — Leaside" },
              { src: "/images/project-stair-runner-forest-hill.jpg",       label: "Patterned Runner — Forest Hill" },
              { src: "/images/project-vinyl-condo-downtown.png",           label: "LVP Throughout — Downtown Condo" },
              { src: "/images/project-carpet-rosedale-wool.jpeg",          label: "Wool Carpet — Rosedale" },
              { src: "/images/project-refinishing-annex.jpeg",             label: "Floor Refinishing — The Annex" },
              { src: "/images/project-laminate-scarborough.png",           label: "Wide-Plank Laminate — Scarborough" },
            ].map(({ src, label }) => (
              <div
                key={label}
                className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer bg-stone-200"
              >
                <Image src={src} alt={label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-end p-4">
                  <p className="font-lato text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="font-lato text-gold font-semibold hover:text-gold-dark transition-colors text-lg"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">REVIEWS</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">
              What Our Customers Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-lato text-warm-grey leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-lato font-bold text-charcoal text-sm">{t.name}</p>
                  <p className="font-lato text-xs text-warm-grey">{t.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://share.google/TtoPhOHEuJI6WQigD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-lato text-gold font-semibold hover:text-gold-dark transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              See all our reviews on Google
            </a>
          </div>
        </div>
      </section>


      {/* ── RECENT PROJECTS ─────────────────────────────────────── */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">RECENT PROJECTS</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">
              Recently Completed Around Toronto
            </h2>
            <p className="font-lato text-lg text-warm-grey">
              A few of the floors we&apos;ve installed for Toronto homeowners and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Patterned Stair Runner — Forest Hill", type: "Stair Runners", href: "/gallery", img: "/images/project-stair-runner-forest-hill.jpg" },
              { title: "White Oak Hardwood — Leaside", type: "Hardwood", href: "/gallery", img: "/images/project-hardwood-leaside.jpg" },
              { title: "LVP Throughout — Downtown Condo", type: "Luxury Vinyl", href: "/gallery", img: "/images/project-vinyl-condo-downtown.png" },
              { title: "Floor Refinishing — The Annex", type: "Refinishing", href: "/gallery", img: "/images/project-refinishing-annex.jpeg" },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-video bg-stone-200 relative overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-5">
                  <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                    {p.type}
                  </span>
                  <h3 className="font-playfair text-lg text-charcoal mt-2 group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="font-lato text-gold font-semibold hover:text-gold-dark transition-colors text-lg"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">SERVICE AREAS</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">
              Proudly Serving Toronto &amp; the GTA
            </h2>
            <p className="font-lato text-lg text-warm-grey max-w-xl mx-auto">
              From our Bathurst Street showroom we install flooring across the
              city. Find your neighbourhood below.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Toronto", slug: "toronto" },
              { name: "North York", slug: "north-york" },
              { name: "Etobicoke", slug: "etobicoke" },
              { name: "Scarborough", slug: "scarborough" },
              { name: "Forest Hill", slug: "forest-hill" },
              { name: "Rosedale", slug: "rosedale" },
              { name: "Leaside", slug: "leaside" },
              { name: "The Annex", slug: "the-annex" },
            ].map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="rounded-xl border border-stone-100 shadow-sm bg-off-white px-4 py-5 text-center font-lato font-semibold text-charcoal hover:text-gold hover:shadow-md transition-all"
              >
                {loc.name}
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/locations"
              className="font-lato text-gold font-semibold hover:text-gold-dark transition-colors text-lg"
            >
              See All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <CTABanner
        title="Ready to Transform Your Space?"
        subtitle="Visit our Toronto showroom or book a free in-home consultation — we come to you anywhere in the GTA."
        primaryCta={{ label: "Book a Free Consultation", href: "/contact" }}
        secondaryCta={{ label: "Call (416) 533-3366", href: "tel:4165333366" }}
      />
    </>
  );
}
