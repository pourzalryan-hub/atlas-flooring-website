import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import CTABanner from '@/components/CTABanner'
import WhyAtlas from '@/components/WhyAtlas'

export const metadata: Metadata = {
  title: 'About Atlas Rug & Design Centre | Toronto\'s Flooring Experts Since 1959',
}

const neighbourhoods = [
  'North York', 'Etobicoke', 'Scarborough', 'Midtown Toronto', 'The Annex',
  'Forest Hill', 'Rosedale', 'Lawrence Park', 'Leaside', 'East York',
  'Thornhill', 'Richmond Hill', 'Markham', 'Mississauga', 'Oakville', 'Vaughan',
]

const stats = [
  { value: '65+', label: 'Years in Business' },
  { value: '10,000+', label: 'Homes Transformed' },
  { value: '500+', label: 'Products in Showroom' },
  { value: '100%', label: 'Satisfaction Guaranteed' },
]

const values = [
  {
    icon: '✦',
    title: 'Honest Advice',
    body: 'We recommend the right product for your space and lifestyle — not the most expensive one. Our goal is a result you\'ll love for decades.',
  },
  {
    icon: '◈',
    title: 'Quality Without Compromise',
    body: 'We only carry brands and products we\'d install in our own homes. Every product on our floor has been vetted for performance and beauty.',
  },
  {
    icon: '⬡',
    title: 'In-House Installation',
    body: 'Every installation is carried out by experienced, vetted flooring installers. We oversee every job and stand behind the results.',
  },
]

const testimonials = [
  {
    quote:
      'I was nervous about the whole process — I had no idea where to start with flooring. The team at Atlas made it completely stress-free. They listened, showed me options in my budget, and the installation was flawless. These people genuinely care.',
    author: 'Michelle T.',
    location: 'Forest Hill',
  },
  {
    quote:
      "We've used Atlas twice now — once for our living room hardwood and again for carpet on the stairs. Both times the experience was excellent. Honest pricing, quality products, and a crew that treated our home with respect.",
    author: 'Robert & Anna D.',
    location: 'North York',
  },
]

export default function AboutPage() {
  return (
    <main>
      {/* 1. Hero */}
      <PageHero
        title="Toronto's Flooring Family Since 1959"
        subtitle="We're not just a flooring store. We're your design partners — from first visit to final walkthrough."
        breadcrumb="About"
        imageSrc="/images/about-hero.png"
      />

      {/* 2. Our Story */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden w-full relative">
              <Image src="/images/about-story-interior.png" alt="Atlas Rug & Design Centre showroom interior" fill className="object-cover" unoptimized />
            </div>
            {/* Copy */}
            <div>
              <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">OUR STORY</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">
                More Than Floors —<br />A Family Commitment to Your Home
              </h2>
              <p className="font-lato text-lg text-warm-grey leading-relaxed mb-5">
                Atlas was founded in 1959 with a simple but deeply held belief: every Toronto homeowner deserves
                access to premium flooring without the intimidating, impersonal experience of big-box retail.
                More than six decades later, that belief hasn't changed — only our collection has grown.
              </p>
              <p className="font-lato text-lg text-warm-grey leading-relaxed mb-5">
                We're a family-owned business, and that shows in everything we do. Our staff aren't sales
                associates hitting quotas — they're flooring professionals who genuinely love the work. Many of
                them have been with us for years, bringing deep product knowledge and a personal commitment to
                getting your project right.
              </p>
              <p className="font-lato text-lg text-warm-grey leading-relaxed">
                Whether you're renovating a single room or building from the ground up, the Atlas team welcomes
                you to 978 Bathurst St. Come in, take your time, and let us help you find the floor that feels
                like home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Bar */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-playfair text-4xl sm:text-5xl md:text-6xl text-gold mb-2">{stat.value}</p>
                <p className="font-lato text-sm text-white uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Values */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">WHAT WE STAND FOR</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow p-10">
                <div className="text-gold text-4xl mb-5">{v.icon}</div>
                <h3 className="font-playfair text-2xl text-charcoal mb-4">{v.title}</h3>
                <p className="font-lato text-warm-grey leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Showroom */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">COME SEE US</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-6">Visit Our Toronto Showroom</h2>
              <p className="font-lato text-lg text-warm-grey leading-relaxed mb-6">
                Our Bathurst Street showroom is designed to help you visualize possibilities — not just look at
                samples. We've built room vignettes so you can see flooring in context. Bring your paint swatches,
                photos of your space, and any inspiration you've been collecting. We'll take it from there.
              </p>
              <ul className="font-lato text-warm-grey space-y-2 mb-8 text-base">
                <li>📍 978 Bathurst St, Toronto, ON M5R 3G6</li>
                <li>
                  📞{' '}
                  <a href="tel:4165333366" className="hover:text-gold transition-colors">
                    (416) 533-3366
                  </a>
                </li>
                <li>🕐 Mon–Sat: 10am – 4pm</li>
                <li>🕐 Sun: Closed</li>
                <li>🕐 Other times by appointment</li>
                <li>✅ Free in-home estimates</li>
                <li>♿ Accessible entrance</li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=978+Bathurst+St+Toronto+ON+M5R+3G6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gold text-white font-lato font-semibold rounded hover:bg-gold-dark transition-colors"
                >
                  Get Directions
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-charcoal text-charcoal font-lato font-semibold rounded hover:bg-charcoal hover:text-white transition-colors"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
            {/* Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden w-full relative">
              <Image src="/images/about-story.png" alt="Atlas Rug & Design Centre Toronto showroom" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Proudly Serving Toronto */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">SERVICE AREA</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">Proudly Serving Toronto Since 1959</h2>
          <p className="font-lato text-lg text-stone-300 leading-relaxed max-w-3xl mx-auto mb-10">
            For 65+ years we've been the flooring partner of choice for Toronto homeowners and designers. We
            serve all of Toronto and the surrounding GTA, and we're committed to sustainable practices — including
            responsible sourcing and flooring material recycling where available.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {neighbourhoods.map((n) => (
              <span
                key={n}
                className="px-4 py-2 border border-stone-600 text-stone-300 font-lato text-sm rounded-full hover:border-gold hover:text-gold transition-colors"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-lato font-semibold tracking-widest text-gold uppercase mb-3">WHAT CUSTOMERS SAY</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-charcoal">Words From Our Clients</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow p-10">
                <div className="text-gold text-xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="font-lato text-warm-grey text-lg leading-relaxed mb-6 italic">"{t.quote}"</p>
                <p className="font-lato font-semibold text-charcoal">
                  — {t.author}, <span className="font-normal text-warm-grey">{t.location}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://share.google/VTLAVBzwnQtKItd0E"
              target="_blank"
              rel="noopener noreferrer"
              className="font-lato text-gold hover:underline text-base"
            >
              Read all our Google reviews →
            </a>
          </div>
        </div>
      </section>

      <WhyAtlas />

      {/* 8. CTA Banner */}
      <CTABanner
        title="Come Meet Us in Person"
        subtitle="Our showroom is open Monday through Saturday, 10am to 4pm. Other times available by appointment."
        primaryCta={{ label: 'Get Directions', href: 'https://www.google.com/maps/search/?api=1&query=978+Bathurst+St+Toronto+ON+M5R+3G6' }}
        secondaryCta={{ label: 'Book a Consultation', href: '/contact' }}
      />
    </main>
  )
}
