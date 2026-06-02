import Link from "next/link";

const productLinks = [
  { label: "Hardwood Flooring", href: "/hardwood" },
  { label: "Carpet & Broadloom", href: "/carpet" },
  { label: "Stair Runners", href: "/stair-runners" },
  { label: "Luxury Vinyl", href: "/vinyl" },
  { label: "Laminate Flooring", href: "/laminate" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Free Quote", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 — Brand */}
          <div>
            <Link href="/">
              <span className="font-playfair text-xl text-white">
                Atlas Rug <span className="text-gold">&amp;</span> Design Centre
              </span>
            </Link>
            <p className="mt-4 font-lato text-sm text-white/60 leading-relaxed">
              Toronto&apos;s destination for premium flooring &amp; custom rugs. Serving
              the GTA since 1959.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              {["Instagram", "Facebook", "Houzz", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-colors text-xs font-lato"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-playfair text-base text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-lato text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <h4 className="font-playfair text-base text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-lato text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-playfair text-base text-white mb-4">Visit Us</h4>
            <address className="not-italic space-y-3">
              <p className="font-lato text-sm text-white/60 leading-relaxed">
                978 Bathurst St<br />
                Toronto, ON M5R 3G6
              </p>
              <p>
                <a
                  href="tel:4165333366"
                  className="font-lato text-sm text-white/60 hover:text-gold transition-colors"
                >
                  (416) 533-3366
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@atlasrugflooring.com"
                  className="font-lato text-sm text-white/60 hover:text-gold transition-colors"
                >
                  info@atlasrugflooring.com
                </a>
              </p>
              <div className="font-lato text-sm text-white/60 space-y-1">
                <p>Mon–Fri: 9am – 6pm</p>
                <p>Sat: 10am – 5pm</p>
                <p>Sun: Closed</p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-lato text-xs text-white/40">
            © {new Date().getFullYear()} Atlas Rug &amp; Design Centre. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-lato text-xs text-white/40 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-lato text-xs text-white/40 hover:text-gold transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
