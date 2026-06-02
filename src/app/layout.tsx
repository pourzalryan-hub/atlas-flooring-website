import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    default: "Atlas Rug & Design Centre | Flooring & Area Rugs Toronto",
    template: "%s | Atlas Rug & Design Centre",
  },
  description:
    "Premium hardwood, carpet, luxury vinyl, laminate & custom area rugs in Toronto. Expert installation across the GTA by Atlas Rug & Design Centre since 1959. Visit our showroom at 978 Bathurst St or book a free consultation.",
  keywords: [
    "flooring Toronto",
    "hardwood floor installation Toronto",
    "carpet Toronto",
    "luxury vinyl Toronto",
    "flooring store Toronto",
    "GTA flooring",
    "area rugs Toronto",
    "Atlas Rug Design Centre",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.atlasrugflooring.com",
    siteName: "Atlas Rug & Design Centre",
    title: "Atlas Rug & Design Centre | Flooring & Area Rugs Toronto",
    description:
      "Premium flooring and area rugs in Toronto since 1959. Hardwood, carpet, vinyl, laminate & custom rugs. Expert installation across the GTA.",
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
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
