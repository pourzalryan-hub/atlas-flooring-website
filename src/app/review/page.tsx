import type { Metadata } from "next";

// Update these if your review links change.
const GOOGLE_REVIEW_URL = "https://share.google/VTLAVBzwnQtKItd0E";
const HOMESTARS_URL =
  "https://homestars.com/companies/2850940-atlas-rug-design-centre-inc";

export const metadata: Metadata = {
  title: "Leave Us a Review | Atlas Rug & Design Centre",
  description:
    "Enjoyed working with Atlas Rug & Design Centre? Leave us a quick review — it means the world to our family business.",
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  return (
    <main className="font-lato bg-off-white">
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-gold text-3xl tracking-[0.3em] mb-4">★★★★★</div>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            Thank You for Choosing Atlas
          </h1>
          <p className="font-lato text-lg text-stone-300 max-w-xl mx-auto">
            We&apos;re a family business that&apos;s been serving Toronto since
            1959 — and reviews from customers like you are what keep us going.
            If you were happy with your flooring, we&apos;d be so grateful if
            you&apos;d share a few words.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-14 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-lato text-warm-grey text-lg mb-8">
            It takes about <span className="font-semibold text-charcoal">30 seconds</span> —
            just tap the button below and leave a star rating (a sentence or
            two is a bonus!).
          </p>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-gold text-white font-lato font-semibold text-xl rounded-lg hover:bg-opacity-90 transition-colors shadow-sm"
          >
            Leave a Google Review →
          </a>

          <p className="font-lato text-sm text-warm-grey mt-10 mb-4">
            Prefer another platform? We&apos;d appreciate a review there too:
          </p>
          <a
            href={HOMESTARS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-stone-300 text-charcoal font-lato font-semibold rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            Review us on HomeStars
          </a>
        </div>
      </section>

      {/* Reassurance / thanks */}
      <section className="bg-white border-t border-stone-100 py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-playfair text-2xl text-charcoal mb-3">
            Not Quite Satisfied?
          </h2>
          <p className="font-lato text-warm-grey mb-5">
            If something wasn&apos;t perfect, we want to make it right — please
            call us first so we can fix it. Your satisfaction matters more than
            a star rating.
          </p>
          <a
            href="tel:4165333366"
            className="font-lato text-gold font-semibold hover:underline"
          >
            Call us at (416) 533-3366
          </a>
        </div>
      </section>
    </main>
  );
}
