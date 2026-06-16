const points = [
  {
    title: "65 Years of Toronto Flooring",
    body: "We've been fitting floors in this city since 1959. That's four generations of Toronto homeowners who've trusted us with their homes — and we've never forgotten what earned that trust.",
  },
  {
    title: "Family-Owned, Not Franchised",
    body: "Atlas is not a chain or a franchise. The Porzal family has owned and operated this showroom on Bathurst Street for over six decades. When you call us, you talk to us.",
  },
  {
    title: "Our Own Install Crews",
    body: "We don't subcontract. Every installation is done by our own trained crews — the same people we'd trust to floor our own homes. You get consistent quality and direct accountability.",
  },
  {
    title: "978 Bathurst St Showroom",
    body: "Come in and touch the samples. See the difference between a 12mm premium laminate and a budget 7mm product in person. Our showroom is open Monday through Saturday.",
  },
  {
    title: "Free In-Home Measurements",
    body: "We come to you. Our team measures every room, checks your subfloor, and gives you a written quote with no hidden charges before any work begins.",
  },
  {
    title: "Honest Advice",
    body: "If refinishing will get you another 15 years out of your floors, we'll tell you that instead of selling you new ones. We'd rather lose a sale than lose your trust.",
  },
];

export default function WhyAtlas() {
  return (
    <section className="bg-charcoal py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 font-lato">
            Why Choose Atlas
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white">
            Six Decades on Bathurst Street
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {points.map((point) => (
            <div key={point.title} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-7 h-7 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-playfair text-xl text-gold mb-2">
                  {point.title}
                </h3>
                <p className="text-stone-300 text-base leading-relaxed font-lato">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
