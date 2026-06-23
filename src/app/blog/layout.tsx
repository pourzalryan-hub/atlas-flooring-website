import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flooring Tips, Trends & Advice | Atlas Rug & Design Centre",
  description:
    "Expert flooring guides from Toronto's Atlas Rug & Design Centre. Tips on hardwood, carpet, luxury vinyl, laminate, stair runners, and refinishing — helping you make confident decisions for your home.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Flooring Tips, Trends & Advice | Atlas Rug & Design Centre",
    description:
      "Expert flooring guides from Toronto's Atlas Rug & Design Centre — hardwood, carpet, vinyl, laminate, stair runners, and more.",
    url: "https://atlasrugflooring.com/blog",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flooring Tips, Trends & Advice | Atlas Rug & Design Centre",
    description:
      "Expert flooring guides from Toronto's Atlas Rug & Design Centre.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
