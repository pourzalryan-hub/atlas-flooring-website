import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carpet Samples | Atlas Rug & Design Centre Toronto",
  description:
    "Browse our in-stock carpet samples at Atlas Rug & Design Centre. Visit our Toronto showroom at 978 Bathurst St to feel them in person.",
  alternates: { canonical: "/carpet/samples" },
};

export default function CarpetSamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
