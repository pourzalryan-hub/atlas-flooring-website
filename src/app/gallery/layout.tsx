import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse real flooring installations by Atlas Rug & Design Centre — hardwood, carpet, luxury vinyl, laminate, stair runners, and refinishing projects across Toronto and the GTA since 1959.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Project Gallery | Atlas Rug & Design Centre Toronto",
    description:
      "Real flooring installs from Toronto homes — hardwood, carpet, vinyl, laminate, stair runners, and refinishing by Atlas Rug & Design Centre.",
    url: "https://atlasrugflooring.com/gallery",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
    images: [
      {
        url: "/images/project-hardwood-leaside.jpg",
        width: 1200,
        height: 630,
        alt: "Atlas Rug & Design Centre — Toronto Flooring Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery | Atlas Rug & Design Centre Toronto",
    description:
      "Real flooring installations from Toronto homes by Atlas Rug & Design Centre.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
