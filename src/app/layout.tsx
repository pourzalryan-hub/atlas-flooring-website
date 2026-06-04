import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.atlasrugflooring.com",
    siteName: "Atlas Rug & Design Centre",
    title: "Atlas Rug & Design Centre | Premium Flooring Toronto",
    description:
      "Premium flooring in Toronto since 1959. Hardwood, carpet, vinyl, laminate & stair runners. Expert installation across the GTA.",
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Toronto",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <head>
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
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
