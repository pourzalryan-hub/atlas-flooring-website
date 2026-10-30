import Link from 'next/link'
import LeadForm from './LeadForm'

interface LandingHeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  /** Short trust points shown as a checklist under the subtitle. */
  trust?: string[]
  imageSrc?: string
  breadcrumb: string
  /** Passed through to the on-page form. */
  product?: string
  source?: string
  formHeading?: string
}

export default function LandingHero({
  eyebrow,
  title,
  subtitle,
  trust = [
    'Free in-home measure',
    'Written, itemized quote',
    'Family-run in Toronto since 1959',
  ],
  imageSrc = '/images/placeholder.jpg',
  breadcrumb,
  product,
  source = 'Website',
  formHeading = 'Get Your Free Quote',
}: LandingHeroProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://atlasrugflooring.com' },
      { '@type': 'ListItem', position: 2, name: breadcrumb },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="relative bg-charcoal overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-charcoal opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT — message + trust + call */}
            <div>
              {eyebrow && (
                <p className="font-lato text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                  {eyebrow}
                </p>
              )}
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
                {title}
              </h1>
              <p className="font-lato text-lg md:text-xl text-white/75 leading-relaxed mb-6 max-w-xl">
                {subtitle}
              </p>

              <ul className="space-y-2 mb-8">
                {trust.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-lato text-white/90">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:4165333366"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gold text-white font-lato font-semibold rounded hover:bg-gold-dark transition-colors text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
                  </svg>
                  Call (416) 533-3366
                </a>
                <a
                  href="#lead-form"
                  className="lg:hidden inline-flex items-center justify-center px-7 py-4 border border-white/40 text-white font-lato font-semibold rounded hover:border-gold hover:text-gold transition-colors"
                >
                  Get a Free Quote ↓
                </a>
              </div>
            </div>

            {/* RIGHT — on-page lead form */}
            <div id="lead-form" className="scroll-mt-28">
              <LeadForm product={product} source={source} heading={formHeading} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
