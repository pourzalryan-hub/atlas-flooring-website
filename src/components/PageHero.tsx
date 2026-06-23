import Link from "next/link";

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  breadcrumbHref?: string;
  imageSrc?: string;
}

export default function PageHero({ title, subtitle, breadcrumb, breadcrumbHref, imageSrc }: PageHeroProps) {
  const bg = imageSrc ?? '/images/placeholder.jpg';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://atlasrugflooring.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumb,
        item: breadcrumbHref
          ? `https://atlasrugflooring.com${breadcrumbHref}`
          : undefined,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <section className="relative min-h-[520px] md:h-[60vh] md:min-h-[420px] flex items-center bg-charcoal overflow-hidden pt-32 pb-12 md:pt-20 md:pb-0">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-charcoal opacity-90" />
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${bg}')` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 font-lato text-sm text-white/50">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li className="text-white/30">›</li>
            <li className="text-gold">{breadcrumb}</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6 max-w-3xl leading-tight">
          {title}
        </h1>
        <p className="font-lato text-xl text-white/75 max-w-2xl leading-relaxed mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="btn-gold">
            Get a Free Quote
          </Link>
          <a href="#content" className="btn-outline-white">
            Browse Options ↓
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
