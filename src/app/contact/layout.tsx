import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Atlas Rug & Design Centre Toronto",
  description:
    "Get in touch with Atlas Rug & Design Centre. Visit our showroom at 978 Bathurst St, Toronto, call (416) 533-3366, or fill out our form to book a free in-home flooring consultation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Atlas Rug & Design Centre Toronto",
    description:
      "Book a free flooring consultation with Atlas Rug & Design Centre. Showroom at 978 Bathurst St, Toronto. Call (416) 533-3366 or fill out our form.",
    url: "https://atlasrugflooring.com/contact",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Atlas Rug & Design Centre Toronto",
    description:
      "Book a free flooring consultation with Atlas Rug & Design Centre. Showroom at 978 Bathurst St, Toronto.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
