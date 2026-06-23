import Link from "next/link";

interface Review {
  quote: string;
  name: string;
  serviceLabel: string;
}

const GOOGLE_REVIEWS_URL = "https://share.google/VTLAVBzwnQtKItd0E";

// Real Google reviews for Atlas Rug & Design Centre.
// First name + last initial only, no photos — as they appear on Google.
const r: Record<string, Review> = {
  esra: {
    quote:
      "Ryan and David at Atlas were a pleasure to work with. After reaching out to several providers, they quickly stood out through their clear communication, transparency, and honest point of view. They were consistently responsive and easy to deal with. The quality of the work was excellent, and their follow-up reflected a strong commitment to getting everything completed to a high standard. A very professional and reliable team — I would highly recommend them.",
    name: "Esra T.",
    serviceLabel: "Google Review",
  },
  noba: {
    quote:
      "We recently got carpet installed on our stairs and the whole process was smooth from start to finish. The stairs look so much better now and the carpet feels great. Definitely happy with the service.",
    name: "Noba",
    serviceLabel: "Carpet — Stairs",
  },
  nick: {
    quote:
      "Very positive experience. We were exploring options and came across Atlas. They were extremely professional, fair and personable. We will be using them again for our next flooring project.",
    name: "Nick D.",
    serviceLabel: "Google Review",
  },
  nergis: {
    quote:
      "I have used this company for two different carpet installations. They did an excellent job and the work was done in a timely and professional manner.",
    name: "Nergis K.",
    serviceLabel: "Carpet Installation",
  },
  danielle: {
    quote:
      "Ryan helped me with a custom sized area rug. It only took a few days to arrive. Price was reasonable and I'm very happy with it!",
    name: "Danielle",
    serviceLabel: "Custom Area Rug",
  },
  adriano: {
    quote:
      "Big shout out to Ryan and the Atlas team for the installation of wall-to-wall carpet in our home. Installation was done efficiently and expertly. Really appreciate what you have done.",
    name: "Adriano",
    serviceLabel: "Wall-to-Wall Carpet",
  },
  zoe: {
    quote:
      "We have used this business multiple times and most recently Ryan helped me buy the correct mat for my dog so he won't slip when getting off the bed. Highly recommend.",
    name: "Zoe J.",
    serviceLabel: "Area Rugs",
  },
  bob: {
    quote:
      "We originally engaged David at Atlas to look at replacing a basement carpet. When he visited he advised that it wasn't necessary — which impressed us. We then asked about our second floor of our almost 120-year-old house. The original hardwood was in rough shape with lots of squeaks. With David's help we sourced a lovely wool carpet and they installed it, doing a great job securing the old floor to get rid of most of the squeaks. The new carpet looks great! Very happy with David and his team and strongly recommend them.",
    name: "Bob G.",
    serviceLabel: "Wool Carpet",
  },
  mauricio: {
    quote:
      "The team was friendly and showed up on time every day. They worked quickly but carefully, and the floors look amazing now. What I really appreciated was how clean they kept everything and how they explained the process along the way. It made the whole experience easy and stress-free. Definitely recommend them if you're looking to upgrade your floors!",
    name: "Mauricio A.",
    serviceLabel: "Google Review",
  },
  rebecca: {
    quote:
      "We needed new flooring for our office on a tight deadline and Atlas delivered! They had a wide variety of vinyl options in stock and managed to complete the installation ahead of schedule. The workmanship is excellent, and the space looks completely transformed. Very professional and efficient team — we're extremely satisfied!",
    name: "Rebecca P.",
    serviceLabel: "Office — Vinyl",
  },
};

const reviews: Record<string, Review[]> = {
  hardwood: [r.mauricio, r.esra, r.nick],
  carpet: [r.nergis, r.adriano, r.bob],
  vinyl: [r.rebecca, r.mauricio, r.nick],
  laminate: [r.mauricio, r.nick, r.esra],
  "stair-runners": [r.noba, r.esra, r.nick],
  refinishing: [r.esra, r.mauricio, r.bob],
  commercial: [r.rebecca, r.mauricio, r.nick],
  "area-rugs": [r.danielle, r.zoe, r.nick],
  general: [r.esra, r.nick, r.mauricio, r.nergis, r.danielle, r.rebecca],
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
              key={review.name + review.serviceLabel}
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
                <p className="text-warm-grey text-sm">{review.serviceLabel}</p>
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
