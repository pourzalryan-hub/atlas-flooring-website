import type { Metadata } from "next";
import Link from "next/link";
import CarpetEstimator from "@/components/CarpetEstimator";

export const metadata: Metadata = {
  title: "Carpet Cost Calculator Toronto | Instant Estimate",
  description:
    "Get an instant ballpark price for carpet, broadloom, and stairs in Toronto — rooms and stairs, three quality options, installed. Then book a free in-home measure to confirm. Atlas Rug & Design Centre, family-run since 1959.",
  alternates: { canonical: "/carpet-estimate" },
  openGraph: {
    title: "Carpet Cost Calculator Toronto | Atlas Rug & Design Centre",
    description:
      "Instant carpet & stairs estimate in Toronto. Three price options, installed. Book a free in-home measure to confirm.",
    url: "https://atlasrugflooring.com/carpet-estimate",
    siteName: "Atlas Rug & Design Centre",
    type: "website",
  },
};

export default function CarpetEstimatePage() {
  return (
    <main className="font-lato">
      <section className="bg-charcoal pt-28 md:pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Instant Estimate
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Carpet Cost Estimator
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Get a ballpark price for carpet, broadloom, and stairs in seconds —
            then book a free in-home measure to confirm it.
          </p>
        </div>
      </section>

      <section className="bg-off-white pt-14 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-100 p-5 sm:p-8">
          <CarpetEstimator />
        </div>
      </section>

      <section className="bg-off-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-lato text-warm-grey">
            Prefer to talk it through? Call{" "}
            <a href="tel:4165333366" className="text-gold font-semibold hover:underline">(416) 533-3366</a>{" "}
            or explore our{" "}
            <Link href="/carpet" className="text-gold font-semibold hover:underline">carpet &amp; broadloom</Link>{" "}
            range. Family-run in Toronto since 1959.
          </p>
        </div>
      </section>
    </main>
  );
}
