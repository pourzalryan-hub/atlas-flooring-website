import Link from "next/link";

interface CTABannerProps {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function CTABanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: CTABannerProps) {
  return (
    <section className="bg-gold py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-4">
          {title}
        </h2>
        <p className="font-lato text-xl text-charcoal/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryCta.href} className="btn-charcoal">
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href} className="btn-outline-charcoal">
              {secondaryCta.label}
            </Link>
          )}
        </div>
        <p className="mt-6 font-lato text-sm text-charcoal/60">
          📍 978 Bathurst St, Toronto, ON &nbsp;·&nbsp; ⏰ Mon–Fri 9–6, Sat 10–5 &nbsp;·&nbsp; ✅ Free In-Home Estimates
        </p>
      </div>
    </section>
  );
}
