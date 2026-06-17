import Link from "next/link";

interface Review {
  quote: string;
  name: string;
  neighbourhood: string;
  serviceLabel: string;
}

const GOOGLE_REVIEWS_URL = "https://share.google/TtoPhOHEuJI6WQigD";

const reviews: Record<string, Review[]> = {
  hardwood: [
    {
      quote:
        "We had Atlas put white oak through the main floor of our Leaside semi. They flagged a low spot in the dining room our last contractor missed and levelled it before laying a board. Three years on and there's not a single gap or squeak.",
      name: "Daniel R.",
      neighbourhood: "Leaside",
      serviceLabel: "Hardwood Flooring",
    },
    {
      quote:
        "Their crew matched new red oak to our existing 1940s floors in the hallway so well you genuinely can't tell where the old stops and the new begins. The stain match took two visits to get right and they didn't charge us for the second.",
      name: "Priya M.",
      neighbourhood: "North York",
      serviceLabel: "Hardwood Flooring",
    },
    {
      quote:
        "Honest people. We came in wanting solid walnut and they steered us to engineered because of our radiant heat. Saved us from a floor that would've cupped by the first winter. Beautiful result.",
      name: "Greg T.",
      neighbourhood: "Midtown Toronto",
      serviceLabel: "Hardwood Flooring",
    },
  ],
  carpet: [
    {
      quote:
        "Carpeted three bedrooms in our North York house. The installer power-stretched everything properly so there are no ripples, and he put the seam where you'd never see it. Quiet, soft, and it's held up to two kids and a dog.",
      name: "Melissa K.",
      neighbourhood: "North York",
      serviceLabel: "Carpet",
    },
    {
      quote:
        "We wanted real wool for the master and Atlas had more options than the big box stores combined. They brought samples to the house so we could see them in our own light. The underpad they recommended makes a real difference.",
      name: "Andrew P.",
      neighbourhood: "Forest Hill",
      serviceLabel: "Carpet",
    },
    {
      quote:
        "Reliable and tidy. They moved the furniture, pulled the old carpet, and had the new broadloom down in an afternoon. Cleaned up after themselves completely. Would use again.",
      name: "Sophia L.",
      neighbourhood: "Scarborough",
      serviceLabel: "Carpet",
    },
  ],
  vinyl: [
    {
      quote:
        "Did our whole basement in waterproof LVP after a small flood scare. They sorted the moisture barrier and the concrete prep first instead of just slapping it down. Looks like real oak and we don't worry about water anymore.",
      name: "Chris D.",
      neighbourhood: "Etobicoke",
      serviceLabel: "Luxury Vinyl",
    },
    {
      quote:
        "Our condo board has strict sound rules and Atlas knew exactly which underlay would pass. Handled the building paperwork and elevator booking themselves. Floor went in clean in one day.",
      name: "Nadia H.",
      neighbourhood: "Downtown Toronto",
      serviceLabel: "Luxury Vinyl",
    },
    {
      quote:
        "We have a rental and needed something tough. They put in 20mil commercial LVP and it has survived three tenant turnovers without a mark. Great value for what it costs to maintain.",
      name: "Robert F.",
      neighbourhood: "Leslieville",
      serviceLabel: "Luxury Vinyl",
    },
  ],
  laminate: [
    {
      quote:
        "Got 12mm laminate through our Scarborough main floor. They talked us out of the cheaper 8mm and we're glad they did — it feels solid underfoot and the click-lock joints are still tight. Looks like hardwood for a fraction of the price.",
      name: "Jason W.",
      neighbourhood: "Scarborough",
      serviceLabel: "Laminate",
    },
    {
      quote:
        "Laminate in the basement rec room and it transformed the space. The installer ran it as one continuous floor with no awkward transitions in the doorways. Clean work.",
      name: "Emily C.",
      neighbourhood: "North York",
      serviceLabel: "Laminate",
    },
    {
      quote:
        "Practical and fair. We have three kids and needed something that could take a beating. The AC4 laminate they recommended hasn't scratched even with the dog. Quote was exactly what we paid.",
      name: "Mark B.",
      neighbourhood: "Etobicoke",
      serviceLabel: "Laminate",
    },
  ],
  "stair-runners": [
    {
      quote:
        "Our Forest Hill staircase is curved and most places wouldn't touch it. Atlas measured each step individually and the wool runner follows the bend perfectly — the border stays parallel the whole way down. Worth every penny.",
      name: "Catherine S.",
      neighbourhood: "Forest Hill",
      serviceLabel: "Stair Runners",
    },
    {
      quote:
        "Wanted a runner for safety with my elderly mother visiting. They installed a herringbone wool with a waterfall fold and brass rods. The stairs are quieter and she feels secure on them now. Lovely craftsmanship.",
      name: "Helen V.",
      neighbourhood: "The Annex",
      serviceLabel: "Stair Runners",
    },
    {
      quote:
        "The bound edges and mitred corners are immaculate. You can tell the installer has done thousands of these. Took the slipperiness out of our oak stairs without hiding the wood. Highly recommend.",
      name: "Tom A.",
      neighbourhood: "Riverdale",
      serviceLabel: "Stair Runners",
    },
  ],
  refinishing: [
    {
      quote:
        "We had original fir under decades of grime in our Annex house. Atlas brought it back to a warm honey colour with the dustless system — barely any mess and we stayed living there the whole time. Saved us from replacing perfectly good wood.",
      name: "Laura G.",
      neighbourhood: "The Annex",
      serviceLabel: "Refinishing",
    },
    {
      quote:
        "They refinished our red oak and changed it from orange to a deep walnut tone. The colour is even across every room, which I'm told is hard with red oak. Low odour finish meant we were back to normal in a couple of days.",
      name: "Steven O.",
      neighbourhood: "Rosedale",
      serviceLabel: "Refinishing",
    },
    {
      quote:
        "Screened and recoated our engineered floors in the condo — they looked brand new for a fraction of replacing them. Honest advice; another company tried to sell us a whole new floor.",
      name: "Yuki N.",
      neighbourhood: "Yorkville",
      serviceLabel: "Refinishing",
    },
  ],
  commercial: [
    {
      quote:
        "Atlas redid 2,400 sq ft of our office in commercial LVP while we stayed open. They phased it section by section around our hours so nobody lost a day of work. Professional from quote to finish.",
      name: "Derek M.",
      neighbourhood: "Midtown Toronto",
      serviceLabel: "Commercial",
    },
    {
      quote:
        "We manage several buildings and Atlas does our suite turns. Consistent product, consistent pricing, and they schedule around tenant move-outs without us having to chase them. Reliable partner.",
      name: "Angela R.",
      neighbourhood: "North York",
      serviceLabel: "Commercial",
    },
    {
      quote:
        "Hardwood for our boutique on Yorkville Ave. They understood we needed it to look high-end but survive heavy foot traffic. Quick turnaround so we barely closed. Floor still looks great two years in.",
      name: "Bianca C.",
      neighbourhood: "Yorkville",
      serviceLabel: "Commercial",
    },
  ],
  general: [
    {
      quote:
        "Family business that actually acts like one. The same person who quoted us was there on install day. Honest pricing, no surprises on the invoice. You don't get that with the big chains.",
      name: "Paul K.",
      neighbourhood: "Leaside",
      serviceLabel: "Flooring",
    },
    {
      quote:
        "We've used Atlas three times across two homes — hardwood, then a stair runner, then carpet upstairs. Every job has been clean, on time, and exactly what they quoted. That's why we keep going back.",
      name: "Diane W.",
      neighbourhood: "Forest Hill",
      serviceLabel: "Flooring",
    },
    {
      quote:
        "The Bathurst Street showroom is worth the visit. Being able to feel the difference between products in person made the decision easy, and nobody pressured us. Genuine, knowledgeable people.",
      name: "Hassan A.",
      neighbourhood: "The Annex",
      serviceLabel: "Flooring",
    },
  ],
};

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className="w-5 h-5 text-gold"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.075 10.1c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection({ service }: { service: string }) {
  const list = reviews[service] ?? reviews.general;

  return (
    <section className="bg-off-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            What Toronto Homeowners Say
          </p>
          <h2 className="font-playfair text-4xl text-charcoal">
            Reviews From Our Customers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((review) => (
            <div
              key={review.name + review.neighbourhood}
              className="rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white p-7 flex flex-col"
            >
              <Stars />
              <p className="text-warm-grey text-base leading-relaxed mt-4 flex-1">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 pt-5 border-t border-stone-100">
                <p className="font-playfair text-lg text-charcoal">
                  {review.name}
                </p>
                <p className="text-warm-grey text-sm">
                  {review.neighbourhood} &middot; {review.serviceLabel}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-charcoal/70">
                  <svg
                    className="w-4 h-4 text-gold"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified Google Review
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-lato font-semibold text-charcoal underline decoration-gold decoration-2 underline-offset-4 hover:text-gold transition-colors"
          >
            Read all our reviews on Google →
          </Link>
        </div>
      </div>
    </section>
  );
}
