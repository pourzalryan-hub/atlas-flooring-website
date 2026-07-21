// Carpet-specific neighbourhood landing pages at /carpet/[area].
// Each area has UNIQUE copy so Google doesn't treat them as thin duplicates.
// Compliance: only wool/nylon/polyester fibres, own-stock advantage, no brand
// names, no rating claims, no "own crew"/insured claims, 1-2 week install.

export interface CarpetAreaFAQ {
  q: string;
  a: string;
}

export interface CarpetArea {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** 2-3 unique paragraphs about carpet in this specific neighbourhood. */
  intro: string[];
  /** A distinct local angle — what carpet needs are common here. */
  localAngle: string;
  nearbyAreas: string[];
  faq: CarpetAreaFAQ[];
}

export const carpetAreas: CarpetArea[] = [
  {
    slug: "north-york",
    name: "North York",
    metaTitle: "Carpet Store North York | Carpet & Installation",
    metaDescription:
      "Carpet supply and installation in North York. In-stock nylon, wool & polyester carpet from our own stock, professionally installed. Free in-home measure. Since 1959.",
    h1: "Carpet in North York",
    intro: [
      "North York's mix of established family homes and newer condos means carpet is still one of the most-requested floors we install here — soft, warm, and quiet where it counts. From bungalow bedrooms near Willowdale to condo dens along Yonge, we help North York homeowners choose the right carpet for how they actually live.",
      "Because we stock our own carpet, there's no waiting weeks for a special order to arrive from a supplier. You choose from carpet that's ready now, we measure your rooms precisely, and we install it — usually within one to two weeks of your quote. One written, itemized price covers the carpet, underpad, and installation.",
    ],
    localAngle:
      "Basements and bedrooms are the most common carpet jobs we see in North York — durable nylon for busy family rec rooms, and plush comfort underfoot in bedrooms.",
    nearbyAreas: ["Willowdale", "York", "Leaside", "Midtown Toronto"],
    faq: [
      { q: "Do you install carpet across all of North York?", a: "Yes — from Willowdale and Bayview Village to the family neighbourhoods around Sheppard and Finch, we supply and install carpet throughout North York. We bring samples to your home so you can see colours in your own light." },
      { q: "What carpet is best for a North York basement?", a: "For basement rec rooms we usually recommend a solution-dyed nylon over a moisture-resistant underpad — it stands up to traffic, resists stains, and stays comfortable underfoot. We assess your space during the free in-home measure." },
    ],
  },
  {
    slug: "etobicoke",
    name: "Etobicoke",
    metaTitle: "Carpet Store Etobicoke | Carpet & Installation",
    metaDescription:
      "Carpet supply and installation in Etobicoke. In-stock wool, nylon & polyester carpet, professionally installed with a free in-home measure. Family-run since 1959.",
    h1: "Carpet in Etobicoke",
    intro: [
      "Etobicoke's postwar bungalows, sprawling suburban homes, and lakeside condos each call for something different underfoot. We've been helping Etobicoke families carpet bedrooms, stairs, and finished basements for decades — matching the right fibre and pile to each room and budget.",
      "Our own in-stock carpet means no long supplier delays: pick from carpet that's ready to go, get a precise in-home measure, and have it professionally installed, typically within one to two weeks. Everything is quoted up front — carpet, underpad, and labour — with no surprise costs.",
    ],
    localAngle:
      "Finished basements are big in Etobicoke — we fit durable, comfortable carpet over the right underpad to keep lower levels warm and quiet.",
    nearbyAreas: ["Mimico", "The Kingsway", "Islington", "Long Branch"],
    faq: [
      { q: "Can you carpet a whole Etobicoke home?", a: "Absolutely — from single bedrooms to whole-home broadloom, we handle jobs of every size across Etobicoke. Because we stock our own carpet, larger jobs don't mean longer waits." },
      { q: "Do you remove the old carpet?", a: "Yes. Removal and disposal of your old carpet and underpad is included in our standard installation quote across Etobicoke." },
    ],
  },
  {
    slug: "scarborough",
    name: "Scarborough",
    metaTitle: "Carpet Store Scarborough | Carpet & Installation",
    metaDescription:
      "Carpet supply and installation in Scarborough. In-stock nylon, wool & polyester carpet, professionally installed. Free in-home measure and written quotes. Since 1959.",
    h1: "Carpet in Scarborough",
    intro: [
      "Scarborough's family homes, townhouses, and rental units keep our installers busy with carpet year-round — bedrooms, stairs, hallways, and basement rec rooms. We help homeowners and landlords across Scarborough choose durable, good-value carpet that holds up to real family life.",
      "We stock our own carpet, so you're never waiting on a supplier's timeline. Choose from what's in stock, we measure precisely, and install — usually within one to two weeks. One itemized price covers carpet, underpad, and installation, so you know exactly what you're paying.",
    ],
    localAngle:
      "Value and durability matter most to the Scarborough families we work with — quality nylon that looks good for years without a premium price.",
    nearbyAreas: ["Agincourt", "West Hill", "Guildwood", "Malvern"],
    faq: [
      { q: "Do you serve landlords with rental units in Scarborough?", a: "Yes — fast, in-stock carpet with volume pricing is ideal for unit turnovers. Many Scarborough landlords use us for consistent carpet across multiple units." },
      { q: "What's the most durable carpet for stairs and hallways?", a: "A textured or loop-style nylon holds up best in high-traffic Scarborough homes — it resists crushing and hides wear far better than a plush pile." },
    ],
  },
  {
    slug: "forest-hill",
    name: "Forest Hill",
    metaTitle: "Carpet Store Forest Hill | Carpet & Stair Runners",
    metaDescription:
      "Premium carpet and stair runner installation in Forest Hill. In-stock wool and nylon, professionally fitted with custom binding. Free in-home measure. Since 1959.",
    h1: "Carpet in Forest Hill",
    intro: [
      "Forest Hill's gracious heritage homes deserve carpet and stair runners that match their character. We've fitted wool runners on grand staircases and plush broadloom in bedrooms throughout the neighbourhood — always with the precise, tailored finish these homes call for.",
      "From luxurious wool to hard-wearing nylon, we carry carpet in a wide range of styles and colours, much of it in our own stock and ready to install. After a free in-home measure, we install with care — typically within one to two weeks — for one clear, itemized price.",
    ],
    localAngle:
      "Wool stair runners with custom binding are a Forest Hill signature — resilient, elegant, and built to last on the busy staircases of heritage homes.",
    nearbyAreas: ["Casa Loma", "Cedarvale", "The Annex", "Rosedale"],
    faq: [
      { q: "Do you install wool stair runners in Forest Hill?", a: "Yes — wool runners with custom binding are one of our specialties, and they suit Forest Hill's heritage staircases beautifully. We measure each tread individually for a precise fit." },
      { q: "Can you match carpet to an existing interior?", a: "We bring samples to your Forest Hill home so you can compare colours and textures against your own furnishings and lighting before deciding." },
    ],
  },
  {
    slug: "rosedale",
    name: "Rosedale",
    metaTitle: "Carpet Store Rosedale | Carpet & Stair Runners",
    metaDescription:
      "Premium carpet and stair runner installation in Rosedale. In-stock wool and nylon, precisely fitted with custom binding. Free in-home measure. Family-run since 1959.",
    h1: "Carpet in Rosedale",
    intro: [
      "Rosedale's stately homes and winding staircases are exactly the kind of project we love. For generations we've fitted wool stair runners and installed fine broadloom in Rosedale bedrooms and dens — work that rewards precision and quality materials.",
      "We carry premium wool alongside durable nylon, much of it in our own stock. That means less waiting: after a free in-home measure, most Rosedale carpet and runner projects are installed within one to two weeks, for one written, itemized price with no surprises.",
    ],
    localAngle:
      "Curved and pie-step staircases are common in Rosedale — each tread measured and cut individually for a runner that follows the stairs perfectly.",
    nearbyAreas: ["Moore Park", "Yorkville", "Cabbagetown", "Forest Hill"],
    faq: [
      { q: "Can you fit a runner on a curved Rosedale staircase?", a: "Yes — curved and winding staircases are our specialty. Each step is measured and the runner cut and fitted individually so the pattern stays true from top to bottom." },
      { q: "What carpet lasts longest in a heritage home?", a: "Wool is the classic choice for longevity and looks — naturally resilient and elegant. Quality nylon is an excellent, more budget-friendly alternative that still wears extremely well." },
    ],
  },
  {
    slug: "leaside",
    name: "Leaside",
    metaTitle: "Carpet Store Leaside | Carpet & Installation",
    metaDescription:
      "Carpet supply and installation in Leaside. In-stock nylon, wool & polyester carpet, professionally installed with a free in-home measure. Family-run since 1959.",
    h1: "Carpet in Leaside",
    intro: [
      "Leaside's family homes see a lot of carpet — cozy bedrooms, comfortable stairs, and warm basement playrooms. We help Leaside families choose carpet that's soft where they want comfort and tough where they need durability.",
      "Because we stock our own carpet, Leaside projects don't wait on supplier timelines. Choose from in-stock carpet, get a free precise measure, and we install — usually within one to two weeks — for a single itemized price covering carpet, underpad, and labour.",
    ],
    localAngle:
      "Kid-friendly durability is the priority for most Leaside homes — stain-resistant nylon in bedrooms, stairs, and playrooms that stands up to family life.",
    nearbyAreas: ["Bennington Heights", "Thorncliffe", "Davisville", "North York"],
    faq: [
      { q: "What's the best carpet for a family home in Leaside?", a: "For busy family homes we usually recommend a solution-dyed nylon — soft underfoot but highly stain- and wear-resistant, so it looks good through years of family use." },
      { q: "How soon can you install carpet in Leaside?", a: "Because our carpet is in stock, most Leaside jobs are installed within one to two weeks of your free in-home measure and quote." },
    ],
  },
  {
    slug: "the-annex",
    name: "The Annex",
    metaTitle: "Carpet Store The Annex | Carpet & Stair Runners",
    metaDescription:
      "Carpet and stair runner installation in The Annex. In-stock wool, nylon & polyester, professionally fitted. Free in-home measure and written quotes. Since 1959.",
    h1: "Carpet in The Annex",
    intro: [
      "The Annex's grand Victorian and Edwardian homes — many with original staircases — are perfect candidates for carpet and stair runners. We've fitted runners on Annex staircases and carpeted bedrooms just steps from our own Bathurst Street showroom for decades.",
      "From wool runners to comfortable bedroom broadloom, we carry a wide selection in our own stock. After a free in-home measure, most Annex projects are installed within one to two weeks — one clear price, carpet and underpad and installation included.",
    ],
    localAngle:
      "Original hardwood staircases in Annex homes pair beautifully with a fitted wool or nylon runner — warmth and grip underfoot without hiding the wood.",
    nearbyAreas: ["Seaton Village", "Yorkville", "Casa Loma", "Harbord Village"],
    faq: [
      { q: "You're right in The Annex — can I visit the showroom?", a: "Yes — our showroom is at 978 Bathurst Street, in the heart of the neighbourhood. Annex residents are welcome to drop by Monday to Saturday to browse samples in person." },
      { q: "Can a runner be added over my existing stairs?", a: "In most cases, yes. A fitted runner adds warmth, quiet, and grip to an existing hardwood staircase while still showing off the wood. We assess your stairs during the free measure." },
    ],
  },
  {
    slug: "midtown-toronto",
    name: "Midtown Toronto",
    metaTitle: "Carpet Store Midtown Toronto | Carpet & Installation",
    metaDescription:
      "Carpet supply and installation in Midtown Toronto. In-stock nylon, wool & polyester carpet, professionally installed. Free in-home measure. Family-run since 1959.",
    h1: "Carpet in Midtown Toronto",
    intro: [
      "Midtown Toronto blends established homes around Davisville and Yonge-Eglinton with a growing number of condos — and both keep us busy with carpet. Whether it's a bedroom, a staircase, or a quiet condo den, we help Midtown residents choose carpet that fits their space and lifestyle.",
      "Our own in-stock carpet means no long waits. Choose from what's ready, get a free in-home measure, and we install — typically within one to two weeks — for one itemized price with no surprise add-ons.",
    ],
    localAngle:
      "Condo owners in Midtown often need carpet that meets building sound requirements — we pair the right carpet with an acoustic underpad to keep things quiet for the unit below.",
    nearbyAreas: ["Davisville", "Yonge-Eglinton", "Forest Hill", "Leaside"],
    faq: [
      { q: "Can you install carpet in a Midtown condo?", a: "Yes — we install carpet in condos across Midtown, and can pair it with an acoustic underpad to help meet your building's sound-rating requirements. Just let us know your condo's specs." },
      { q: "Do you offer a free measure in Midtown?", a: "Always. We bring samples to your Midtown home or condo, measure precisely, and provide a written itemized quote at no cost or obligation." },
    ],
  },
  {
    slug: "vaughan",
    name: "Vaughan",
    metaTitle: "Carpet Store Vaughan | Carpet & Installation",
    metaDescription:
      "Carpet supply and installation in Vaughan. In-stock nylon, wool & polyester carpet, professionally installed with a free in-home measure. Family-run since 1959.",
    h1: "Carpet in Vaughan",
    intro: [
      "Vaughan's newer, larger homes often mean bigger carpet projects — multiple bedrooms, upstairs hallways, and finished basements. We help Vaughan families carpet whole upper floors and lower levels with durable, comfortable carpet that suits a busy household.",
      "Because we stock our own carpet, even larger Vaughan jobs don't mean long supplier waits. Choose from in-stock carpet, get a free measure, and we install — usually within one to two weeks — for one clear, itemized price.",
    ],
    localAngle:
      "Whole upper-floor carpet is common in Vaughan's newer homes — consistent colour and quality across every bedroom and hallway, installed in one project.",
    nearbyAreas: ["Woodbridge", "Maple", "Thornhill", "Concord"],
    faq: [
      { q: "Do you cover carpet for larger Vaughan homes?", a: "Yes — multi-bedroom and whole-floor carpet is one of our most common Vaughan jobs. Our own stock means large orders don't add weeks of waiting." },
      { q: "Can I get consistent carpet across the whole upstairs?", a: "Absolutely. We match the same carpet across every bedroom and hallway for a seamless look, all measured and installed in a single project." },
    ],
  },
  {
    slug: "markham",
    name: "Markham",
    metaTitle: "Carpet Store Markham | Carpet & Installation",
    metaDescription:
      "Carpet supply and installation in Markham. In-stock nylon, wool & polyester carpet, professionally installed. Free in-home measure and written quotes. Since 1959.",
    h1: "Carpet in Markham",
    intro: [
      "Markham's family homes and newer subdivisions keep carpet in steady demand — bedrooms, stairs, and basement rec rooms where comfort and quiet matter most. We help Markham homeowners choose carpet that balances softness, durability, and value.",
      "We stock our own carpet, so Markham projects aren't held up by supplier timelines. Pick from in-stock carpet, get a free in-home measure, and we install — typically within one to two weeks — for one itemized price covering carpet, underpad, and labour.",
    ],
    localAngle:
      "Comfortable, stain-resistant bedroom carpet is the most-requested job in Markham's family homes — soft underfoot and easy to keep looking new.",
    nearbyAreas: ["Unionville", "Thornhill", "Richmond Hill", "Vaughan"],
    faq: [
      { q: "Do you install carpet throughout Markham?", a: "Yes — from Unionville to Cornell, we supply and install carpet across Markham, bringing samples to your home for a free in-home measure and quote." },
      { q: "What carpet is easiest to keep clean?", a: "Polyester and solution-dyed nylon both resist stains well — spills tend to sit on the surface rather than soaking in, making them easy to blot clean in a busy Markham home." },
    ],
  },
];

export function getCarpetArea(slug: string): CarpetArea | undefined {
  return carpetAreas.find((a) => a.slug === slug);
}
