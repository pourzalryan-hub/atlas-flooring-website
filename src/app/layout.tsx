import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TelClickTracker from "@/components/TelClickTracker";
import Link from "next/link";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atlasrugflooring.com"),
  title: {
    default: "Atlas Rug & Design Centre | Premium Flooring Toronto",
    template: "%s | Atlas Rug & Design Centre",
  },
  description:
    "Premium hardwood, carpet, luxury vinyl, laminate & stair runners in Toronto. Expert installation across the GTA by Atlas Rug & Design Centre since 1959. Visit our showroom at 978 Bathurst St or book a free consultation.",
  keywords: [
    "flooring Toronto",
    "hardwood floor installation Toronto",
    "carpet Toronto",
    "luxury vinyl Toronto",
    "flooring store Toronto",
    "GTA flooring",
    "stair runners Toronto",
    "Atlas flooring Toronto",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://atlasrugflooring.com",
    siteName: "Atlas Rug & Design Centre",
    title: "Atlas Rug & Design Centre | Premium Flooring Toronto",
    description:
      "Premium flooring in Toronto since 1959. Hardwood, carpet, vinyl, laminate & stair runners. Expert installation across the GTA.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Rug & Design Centre — Premium Flooring Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Rug & Design Centre | Premium Flooring Toronto",
    description:
      "Premium flooring in Toronto since 1959. Hardwood, carpet, vinyl, laminate & stair runners. Expert installation across the GTA.",
    images: ["/images/hero.jpg"],
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Toronto",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FlooringContractor", "CarpetStore", "HomeGoodsStore"],
  name: "Atlas Rug & Design Centre",
  image: "https://atlasrugflooring.com/images/hero.jpg",
  url: "https://atlasrugflooring.com",
  telephone: "+1-416-533-3366",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "978 Bathurst St",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5R 3G6",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6677,
    longitude: -79.4115,
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=978+Bathurst+St+Toronto+ON+M5R+3G6",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "16:00",
    },
  ],
  openingHours: "Mo-Sa 10:00-16:00",
  foundingDate: "1959",
  areaServed: [
    "Toronto",
    "North York",
    "Etobicoke",
    "Scarborough",
    "East York",
    "York",
    "Midtown Toronto",
    "The Annex",
    "Forest Hill",
    "Leaside",
    "Rosedale",
    "High Park",
    "The Beaches",
    "Leslieville",
    "Riverdale",
    "Downtown Toronto",
  ].map((name) => ({ "@type": "City", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Flooring Services",
    itemListElement: [
      "Hardwood Flooring",
      "Engineered Hardwood Flooring",
      "Carpet & Broadloom",
      "Luxury Vinyl Flooring",
      "Laminate Flooring",
      "Stair Runners",
      "Floor Refinishing",
      "Custom Area Rugs",
      "Commercial Flooring",
      "Condo Flooring",
      "Basement Flooring",
    ].map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Atlas Rug & Design Centre",
  alternateName: "Atlas Rugs",
  url: "https://atlasrugflooring.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <TelClickTracker />
        <Navigation />
        <main>{children}</main>
        <Footer />
        {/* Spacer so the fixed mobile CTA bar doesn't cover footer content */}
        <div className="lg:hidden h-20" aria-hidden="true" />
        {/* Mobile sticky CTA bar */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-charcoal border-t border-white/10 px-3 pt-2 flex gap-2"
          style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        >
          <a
            href="tel:4165333366"
            className="flex-[1.4] inline-flex items-center justify-center gap-2 bg-gold text-white font-lato font-semibold py-3 rounded text-sm whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
            </svg>
            Call (416) 533-3366
          </a>
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center border border-white/40 text-white font-lato font-semibold py-3 rounded text-sm"
          >
            Free Quote
          </Link>
        </div>
      </body>
    </html>
  );
}
