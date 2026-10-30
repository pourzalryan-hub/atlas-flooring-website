import type { Metadata } from "next";
import CarpetEstimator from "@/components/CarpetEstimator";

// PREVIEW ONLY — not linked in nav/sitemap and set to noindex while we test it.
// Once approved, we'll embed <CarpetEstimator /> on the carpet page.
export const metadata: Metadata = {
  title: { absolute: "Carpet Estimate (preview)" },
  robots: { index: false, follow: false },
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

      <section className="bg-off-white py-14 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-100 p-5 sm:p-8">
          <CarpetEstimator />
        </div>
      </section>
    </main>
  );
}
