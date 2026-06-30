import type { Metadata } from "next";
import { carpetSamples } from "@/lib/carpet-samples";

export const metadata: Metadata = {
  title: "Carpet Samples Toronto | In-Stock Broadloom",
  description:
    "Browse 63+ in-stock carpet samples at Atlas Rug & Design Centre — Toronto's carpet store since 1959. Nylon, wool & polyester in every colour family. Visit 978 Bathurst St or call (416) 533-3366.",
  alternates: { canonical: "/carpet/samples" },
  openGraph: {
    title: "Carpet Samples Toronto | In-Stock Broadloom",
    description:
      "Browse 63+ in-stock carpet samples — nylon, wool & polyester in every colour family. Visit our Toronto showroom at 978 Bathurst St.",
    url: "https://atlasrugflooring.com/carpet/samples",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "In-Stock Carpet Samples — Atlas Rug & Design Centre Toronto",
  description:
    "63+ carpet and broadloom samples available in-store at 978 Bathurst St, Toronto.",
  numberOfItems: carpetSamples.length,
  itemListElement: carpetSamples.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `Carpet Sample ${s.code} — ${s.family}`,
    url: `https://atlasrugflooring.com/carpet/samples`,
  })),
};

export default function CarpetSamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
