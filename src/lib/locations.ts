export interface LocationService {
  label: string;
  href: string;
}

export interface LocationFAQ {
  q: string;
  a: string;
}

export interface Location {
  slug: string;
  name: string;
  description: string;
  services: LocationService[];
  nearbyAreas: string[];
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faq: LocationFAQ[];
}

const ALL_SERVICES: LocationService[] = [
  { label: "Hardwood Flooring", href: "/hardwood" },
  { label: "Carpet & Broadloom", href: "/carpet" },
  { label: "Luxury Vinyl", href: "/vinyl" },
  { label: "Laminate Flooring", href: "/laminate" },
  { label: "Stair Runners", href: "/stair-runners" },
  { label: "Floor Refinishing", href: "/refinishing" },
  { label: "Engineered Hardwood", href: "/engineered-hardwood" },
  { label: "Area Rugs", href: "/area-rugs" },
  { label: "Condo Flooring", href: "/condo-flooring" },
  { label: "Basement Flooring", href: "/basement-flooring" },
  { label: "Commercial Flooring", href: "/commercial" },
];

function pick(...labels: string[]): LocationService[] {
  return labels
    .map((l) => ALL_SERVICES.find((s) => s.label === l))
    .filter((s): s is LocationService => Boolean(s));
}

export const locations: Location[] = [
  {
    slug: "toronto",
    name: "Toronto",
    description:
      "As Toronto's flooring specialists since 1959, Atlas serves the entire city from our Bathurst Street showroom. From century homes to brand-new condos, we install every flooring type across the core.",
    services: pick("Hardwood Flooring", "Carpet & Broadloom", "Luxury Vinyl", "Stair Runners", "Floor Refinishing", "Commercial Flooring"),
    nearbyAreas: ["Midtown Toronto", "Downtown Toronto", "The Annex"],
    seoTitle: "Flooring Toronto | Hardwood, Carpet & Vinyl Installation | Atlas",
    metaDescription:
      "Toronto's trusted flooring store since 1959. Hardwood, carpet, luxury vinyl, laminate and stair runners installed across the city. Free in-home quotes.",
    h1: "Flooring in Toronto",
    intro:
      "Atlas Rug & Design Centre has been Toronto's go-to flooring destination for more than six decades. Our showroom at 978 Bathurst Street sits in the heart of the city, making it easy for homeowners from every corner of Toronto to visit, browse hundreds of samples, and meet the design consultants who will guide their project. We understand Toronto homes intimately — the heritage hardwood of the Annex, the high-rise condos downtown, the family bungalows of the inner suburbs. Whatever your space demands, we supply and install it with our own certified crews, never subcontractors. From a single stair runner to a full-home hardwood replacement, every Toronto project receives the same attention, honest pricing, and craftsmanship that has kept families coming back for generations.",
    faq: [
      { q: "Do you serve all of Toronto?", a: "Yes. We install flooring across the entire City of Toronto, from the downtown core to North York, Etobicoke, Scarborough and everywhere in between. Our showroom is centrally located at 978 Bathurst Street." },
      { q: "Can someone come to my Toronto home to measure?", a: "Absolutely. We offer free in-home consultations anywhere in Toronto. Our consultant brings samples so you can see options in your own light and we measure precisely for an accurate quote." },
      { q: "How long has Atlas served Toronto?", a: "Atlas Rug & Design Centre has been a family-owned Toronto business since 1959 — more than 65 years of helping local homeowners choose and install the right floors." },
    ],
  },
  {
    slug: "north-york",
    name: "North York",
    description:
      "North York's mix of established family homes and modern condos keeps our installers busy with everything from broadloom bedrooms to wide-plank hardwood main floors.",
    services: pick("Carpet & Broadloom", "Hardwood Flooring", "Luxury Vinyl", "Laminate Flooring", "Basement Flooring"),
    nearbyAreas: ["York", "Midtown Toronto", "Leaside"],
    seoTitle: "Flooring North York | Hardwood & Carpet Installation | Atlas",
    metaDescription:
      "Flooring installation in North York. Hardwood, carpet, vinyl and laminate supplied and installed by Atlas Rug & Design Centre. Free in-home estimates.",
    h1: "Flooring in North York",
    intro:
      "North York is one of our busiest service areas, and for good reason — its blend of post-war family homes, sprawling bungalows, and newer condo towers means homeowners need every kind of flooring imaginable. Atlas has been installing floors in North York neighbourhoods like Willowdale, Bayview Village, and Don Mills for decades. We see a lot of full-home carpet refreshes in the bedroom-heavy layouts here, plenty of hardwood on main floors, and an increasing amount of durable luxury vinyl in finished basements. Because North York is just a short drive from our Bathurst Street showroom, scheduling a free in-home consultation is effortless. Our consultant arrives with samples, measures every room, and provides a clear written quote — no pressure and no surprises. When installation day comes, our own crews handle the job from start to finish.",
    faq: [
      { q: "Do you install flooring throughout North York?", a: "Yes — we cover all of North York including Willowdale, Bayview Village, Don Mills, Downsview and surrounding neighbourhoods. Free in-home consultations are available throughout the area." },
      { q: "What's the most popular flooring in North York homes?", a: "We install a lot of hardwood on main floors and plush or textured carpet in bedrooms. In finished basements, waterproof luxury vinyl plank has become the top choice for North York families." },
      { q: "How far is your showroom from North York?", a: "Our showroom at 978 Bathurst Street is a short drive south of North York. You're welcome to visit, or we can bring samples directly to your home." },
    ],
  },
  {
    slug: "etobicoke",
    name: "Etobicoke",
    description:
      "From lakeside condos to established Etobicoke family homes, Atlas delivers durable, beautiful flooring with installation crews who treat your home with care.",
    services: pick("Hardwood Flooring", "Carpet & Broadloom", "Luxury Vinyl", "Laminate Flooring", "Stair Runners"),
    nearbyAreas: ["York", "Toronto", "Downtown Toronto"],
    seoTitle: "Flooring Etobicoke | Hardwood, Carpet & Vinyl | Atlas",
    metaDescription:
      "Flooring installation in Etobicoke. Hardwood, carpet, luxury vinyl and laminate from Atlas Rug & Design Centre. Free in-home quotes across Etobicoke.",
    h1: "Flooring in Etobicoke",
    intro:
      "Etobicoke spans everything from the high-rise condos along the lakeshore to the leafy family streets of The Kingsway and Markland Wood. Atlas has served Etobicoke homeowners for generations, and we know the range of needs here well. Waterfront condo owners often want quiet, low-profile luxury vinyl or engineered hardwood that meets building requirements, while families in detached homes lean toward solid hardwood, cozy bedroom carpet, and stair runners that soften busy staircases. Whatever the project, our team brings samples to your Etobicoke home, measures carefully, and provides a transparent written quote. Our installers are our own employees — certified, tidy, and accountable — so the floor you choose is installed exactly the way it should be. We've built our reputation on doing the job right the first time, and Etobicoke homeowners reward us with referrals.",
    faq: [
      { q: "Does Atlas serve all of Etobicoke?", a: "Yes — we install flooring throughout Etobicoke, including The Kingsway, Markland Wood, Mimico, New Toronto and the lakeshore condo communities. Free consultations are available across the area." },
      { q: "Can you install flooring in Etobicoke condos?", a: "Definitely. We're experienced with condo board requirements and acoustic underlay specifications, and we install quiet luxury vinyl and engineered hardwood that meet most building rules." },
      { q: "Do you offer free quotes in Etobicoke?", a: "Yes. We provide free in-home consultations anywhere in Etobicoke, complete with samples and precise measurements for an accurate, no-obligation quote." },
    ],
  },
  {
    slug: "scarborough",
    name: "Scarborough",
    description:
      "Scarborough's diverse mix of homes calls for practical, hard-wearing flooring — and Atlas delivers laminate, vinyl, carpet and hardwood built for real family life.",
    services: pick("Laminate Flooring", "Luxury Vinyl", "Carpet & Broadloom", "Hardwood Flooring", "Basement Flooring"),
    nearbyAreas: ["East York", "Toronto", "North York"],
    seoTitle: "Flooring Scarborough | Laminate, Vinyl & Carpet | Atlas",
    metaDescription:
      "Flooring installation in Scarborough. Durable laminate, luxury vinyl, carpet and hardwood from Atlas Rug & Design Centre. Free in-home estimates.",
    h1: "Flooring in Scarborough",
    intro:
      "Scarborough is one of Toronto's most diverse and family-focused communities, and the flooring needs here reflect that. Atlas installs a great deal of durable, value-driven flooring across Scarborough — high-grade laminate and waterproof luxury vinyl that stand up to busy households, plush carpet for bedrooms, and classic hardwood for those who want a long-term investment. From the lakeside Bluffs to the established neighbourhoods around Agincourt and Malvern, our team brings the showroom to you with an in-home consultation, samples in hand. We measure every room precisely and put everything in writing so you know exactly what you're paying for. Our own installation crews handle each Scarborough project, protecting your home and finishing with care. Decades of repeat business and neighbour referrals across Scarborough tell us we're getting it right.",
    faq: [
      { q: "Do you install flooring in Scarborough?", a: "Yes — we serve all of Scarborough, including Agincourt, Malvern, the Bluffs, Guildwood and surrounding neighbourhoods, with free in-home consultations." },
      { q: "What flooring is best for a busy Scarborough family home?", a: "For high-traffic family homes, we often recommend AC4-rated laminate or waterproof luxury vinyl plank. Both are extremely durable, easy to clean, and budget-friendly while still looking great." },
      { q: "Do you provide free quotes in Scarborough?", a: "We do. A consultant will visit your Scarborough home with samples, take precise measurements, and give you a clear, no-obligation written quote." },
    ],
  },
  {
    slug: "east-york",
    name: "East York",
    description:
      "East York's charming older homes pair beautifully with refinished hardwood, new stair runners, and warm broadloom — all installed by Atlas's own crews.",
    services: pick("Floor Refinishing", "Hardwood Flooring", "Stair Runners", "Carpet & Broadloom", "Laminate Flooring"),
    nearbyAreas: ["Leaside", "Riverdale", "Leslieville"],
    seoTitle: "Flooring East York | Hardwood Refinishing & Stair Runners | Atlas",
    metaDescription:
      "Flooring in East York. Hardwood refinishing, new hardwood, stair runners and carpet from Atlas Rug & Design Centre. Free in-home estimates.",
    h1: "Flooring in East York",
    intro:
      "East York is full of well-built older homes — many with original hardwood hiding beneath decades of wear. Atlas does a lot of floor refinishing here, bringing tired fir and oak floors back to life with dust-controlled sanding and modern, durable finishes. We also install new hardwood, warm bedroom carpet, and stair runners that bring comfort and quiet to the steep staircases common in East York's older houses. Because these homes have so much character, our consultants take extra care to match new work to existing details. We bring samples to your East York home, measure precisely, and provide a clear written quote with no hidden costs. Every project is completed by our own certified installers, who respect your home and your time. Generations of East York families have trusted Atlas with their floors.",
    faq: [
      { q: "Can you refinish the original hardwood in my East York home?", a: "Very often, yes. Many East York homes have solid hardwood or fir floors with plenty of life left. We assess thickness and condition, then sand and refinish with low-odour, durable finishes." },
      { q: "Do you install stair runners in East York?", a: "Yes — stair runners are popular in East York's older homes for both style and safety. We offer wool, nylon and patterned runners with custom binding and professional installation." },
      { q: "Is a free consultation available in East York?", a: "Absolutely. We come to your East York home with samples, measure your space, and provide an honest written quote at no charge." },
    ],
  },
  {
    slug: "york",
    name: "York",
    description:
      "The established neighbourhoods of York call for dependable, attractive flooring — hardwood, laminate, vinyl and carpet installed by a team you can trust.",
    services: pick("Hardwood Flooring", "Laminate Flooring", "Luxury Vinyl", "Carpet & Broadloom", "Floor Refinishing"),
    nearbyAreas: ["Forest Hill", "The Annex", "North York"],
    seoTitle: "Flooring York Toronto | Hardwood, Laminate & Vinyl | Atlas",
    metaDescription:
      "Flooring installation in York, Toronto. Hardwood, laminate, luxury vinyl and carpet from Atlas Rug & Design Centre. Free in-home quotes.",
    h1: "Flooring in York",
    intro:
      "The former City of York — including neighbourhoods like Mount Dennis, Weston, and the area around Eglinton West — is home to a great mix of solid older houses and growing young families. Atlas serves York homeowners with the full range of flooring, from classic hardwood and easy-care laminate to waterproof luxury vinyl and comfortable carpet. Many York homes have good bones and original floors worth refinishing, while others are ready for a complete refresh. Whatever your project, our consultant comes to your York home with samples so you can compare options in your own space, measures every room accurately, and provides a detailed written quote. Our own installers complete the work — no subcontractors — leaving your home tidy and your new floors flawless. Honest advice and lasting craftsmanship keep York families coming back.",
    faq: [
      { q: "Do you serve the York area of Toronto?", a: "Yes — we install flooring throughout York, including Mount Dennis, Weston, Silverthorn and the Eglinton West corridor, with free in-home consultations." },
      { q: "What flooring works best for older York homes?", a: "It depends on the home. Many York houses have original hardwood worth refinishing, while others benefit from durable laminate or luxury vinyl. We'll recommend what fits your space and budget." },
      { q: "Are quotes free in York?", a: "Yes. We offer free, no-obligation in-home consultations across York, complete with samples and precise measurements." },
    ],
  },
  {
    slug: "midtown-toronto",
    name: "Midtown Toronto",
    description:
      "Midtown's blend of detached homes and condos suits hardwood main floors, quiet engineered floors, and elegant stair runners — all installed by Atlas.",
    services: pick("Hardwood Flooring", "Engineered Hardwood", "Stair Runners", "Carpet & Broadloom", "Condo Flooring"),
    nearbyAreas: ["Leaside", "Forest Hill", "North York"],
    seoTitle: "Flooring Midtown Toronto | Hardwood & Stair Runners | Atlas",
    metaDescription:
      "Flooring in Midtown Toronto. Hardwood, engineered hardwood, stair runners and carpet from Atlas Rug & Design Centre. Free in-home estimates.",
    h1: "Flooring in Midtown Toronto",
    intro:
      "Midtown Toronto — the area around Yonge and Eglinton, Davisville, and the streets sweeping toward Mount Pleasant — combines handsome detached homes with a wave of new mid-rise condos. Atlas serves both worlds. In Midtown's family homes we install solid and engineered hardwood, refinish original floors, and add wool stair runners that bring warmth and quiet underfoot. In the area's condos we install acoustic-rated engineered hardwood and luxury vinyl that satisfy building requirements while looking beautiful. Because Midtown is just minutes from our Bathurst Street showroom, an in-home consultation is easy to arrange. Our consultant brings samples to your space, measures carefully, and provides a clear written quote. Every Midtown project is completed by our own crews, who take pride in protecting your home and finishing each detail properly.",
    faq: [
      { q: "Do you install flooring in Midtown Toronto condos?", a: "Yes — we're well versed in condo board acoustic requirements and install engineered hardwood and luxury vinyl with the proper underlay to meet most building specifications." },
      { q: "Can you add a stair runner to my Midtown home?", a: "Absolutely. Stair runners are a Midtown favourite for both elegance and safety. We offer wool and patterned options with custom binding and expert installation." },
      { q: "How quickly can you visit a Midtown home?", a: "Midtown is just minutes from our showroom, so scheduling a free in-home consultation is usually quick and convenient." },
    ],
  },
  {
    slug: "the-annex",
    name: "The Annex",
    description:
      "The Annex's grand Victorian and Edwardian homes are a refinishing specialty — plus new hardwood, stair runners, and area rugs that honour their character.",
    services: pick("Floor Refinishing", "Hardwood Flooring", "Stair Runners", "Area Rugs", "Engineered Hardwood"),
    nearbyAreas: ["Forest Hill", "Midtown Toronto", "Downtown Toronto"],
    seoTitle: "Flooring The Annex Toronto | Hardwood Refinishing | Atlas",
    metaDescription:
      "Flooring in The Annex, Toronto. Expert hardwood refinishing, new hardwood, stair runners and area rugs from Atlas Rug & Design Centre. Free quotes.",
    h1: "Flooring in The Annex",
    intro:
      "The Annex is one of Toronto's most beautiful historic neighbourhoods, filled with grand Victorian and Edwardian homes — and Atlas is right around the corner on Bathurst Street. We know these houses well. Beneath decades of finish, Annex homes often hide stunning original hardwood and fir floors, and our dust-controlled refinishing brings them back to their full glory. We also install new hardwood, custom stair runners for the dramatic staircases these homes are known for, and custom-sized area rugs that anchor large rooms. Because period homes deserve a careful hand, our consultants take time to match new work to existing character. We bring samples to your Annex home, measure precisely, and provide a transparent written quote. Our own installers complete every project with the craftsmanship these heritage homes deserve. As your neighbours, we treat each Annex project as if it were our own.",
    faq: [
      { q: "Do you refinish original floors in Annex homes?", a: "Yes — refinishing heritage hardwood and fir floors is one of our specialties. We use dust-controlled sanding and durable, low-odour finishes that respect the home's character." },
      { q: "Are you located near The Annex?", a: "Very close — our showroom at 978 Bathurst Street sits right at the edge of The Annex, so we're effectively your neighbourhood flooring store." },
      { q: "Can you make a custom area rug for my Annex home?", a: "Definitely. We create custom-sized area rugs with your choice of material and binding — ideal for the large, well-proportioned rooms found in Annex homes." },
    ],
  },
  {
    slug: "forest-hill",
    name: "Forest Hill",
    description:
      "Forest Hill's distinguished homes deserve premium hardwood, hand-bound wool stair runners, and custom area rugs — installed to the highest standard by Atlas.",
    services: pick("Hardwood Flooring", "Stair Runners", "Area Rugs", "Floor Refinishing", "Carpet & Broadloom"),
    nearbyAreas: ["The Annex", "Midtown Toronto", "York"],
    seoTitle: "Flooring Forest Hill Toronto | Premium Hardwood & Stair Runners | Atlas",
    metaDescription:
      "Premium flooring in Forest Hill, Toronto. Hardwood, wool stair runners, custom area rugs and refinishing from Atlas Rug & Design Centre. Free quotes.",
    h1: "Flooring in Forest Hill",
    intro:
      "Forest Hill is synonymous with elegant, well-appointed homes, and the flooring we install here reflects that standard. Atlas has outfitted Forest Hill residences for generations with premium hardwood, hand-bound wool stair runners, and custom area rugs sized exactly to each room. Many of these homes feature beautiful original hardwood that we expertly refinish, plus grand staircases that call for a runner with the right pattern, pile, and border. Our design consultants understand the level of finish Forest Hill homeowners expect, and we bring curated samples directly to your home so you can make confident choices. We measure with precision, quote transparently, and complete every project with our own certified installers — never subcontractors. The result is flooring that complements the architecture and craftsmanship of one of Toronto's finest neighbourhoods. Discretion, quality, and reliability define every Forest Hill project we take on.",
    faq: [
      { q: "Do you offer premium flooring for Forest Hill homes?", a: "Yes — we carry premium hardwood, fine wool carpet and stair runners, and custom area rugs suited to the standard Forest Hill homeowners expect, with installation by our own expert crews." },
      { q: "Can you install a custom wool stair runner in Forest Hill?", a: "Absolutely. Hand-bound wool stair runners are a Forest Hill favourite. We help you select pattern, pile and border, then install with precision on straight or curved staircases." },
      { q: "Do you refinish hardwood in Forest Hill?", a: "Yes. We refinish original and existing hardwood floors with dust-controlled sanding and premium finishes that restore their depth and beauty." },
    ],
  },
  {
    slug: "leaside",
    name: "Leaside",
    description:
      "Leaside families love warm hardwood, durable broadloom, and well-fitted stair runners — and Atlas delivers all three with reliable, in-house installation.",
    services: pick("Hardwood Flooring", "Carpet & Broadloom", "Stair Runners", "Engineered Hardwood", "Floor Refinishing"),
    nearbyAreas: ["Midtown Toronto", "East York", "North York"],
    seoTitle: "Flooring Leaside Toronto | Hardwood & Carpet Installation | Atlas",
    metaDescription:
      "Flooring in Leaside, Toronto. Hardwood, engineered hardwood, carpet and stair runners from Atlas Rug & Design Centre. Free in-home estimates.",
    h1: "Flooring in Leaside",
    intro:
      "Leaside is a beloved family neighbourhood of solid brick homes, tree-lined streets, and proud homeowners — and Atlas has been a trusted name here for decades. We install a lot of warm white oak and walnut hardwood on Leaside main floors, refinish the original hardwood many of these homes still have, and fit cozy broadloom in bedrooms. Stair runners are popular here too, adding comfort and safety to busy family staircases. Because Leaside homes are well loved and carefully maintained, our consultants take care to recommend flooring that suits both the architecture and the way families actually live. We bring samples to your Leaside home, measure precisely, and provide a clear written quote with no surprises. Our own installation crews complete each project with the tidiness and craftsmanship that keep Leaside neighbours referring us to one another.",
    faq: [
      { q: "What hardwood is popular in Leaside homes?", a: "Wide-plank white oak and rich walnut are favourites in Leaside, often in engineered construction for stability. We help you choose the species, width and finish that suit your home." },
      { q: "Do you install stair runners in Leaside?", a: "Yes — stair runners are very popular in Leaside's family homes. We offer wool, nylon and patterned options with custom binding and professional installation." },
      { q: "Is a free in-home quote available in Leaside?", a: "Yes. We visit your Leaside home with samples, measure each room, and provide an honest, no-obligation written quote." },
    ],
  },
  {
    slug: "rosedale",
    name: "Rosedale",
    description:
      "Rosedale's stately homes call for the finest hardwood, bespoke wool stair runners, and custom area rugs — installed with precision by Atlas.",
    services: pick("Hardwood Flooring", "Stair Runners", "Area Rugs", "Floor Refinishing", "Engineered Hardwood"),
    nearbyAreas: ["The Annex", "Downtown Toronto", "Midtown Toronto"],
    seoTitle: "Flooring Rosedale Toronto | Premium Hardwood & Stair Runners | Atlas",
    metaDescription:
      "Premium flooring in Rosedale, Toronto. Fine hardwood, custom wool stair runners, area rugs and refinishing from Atlas Rug & Design Centre.",
    h1: "Flooring in Rosedale",
    intro:
      "Rosedale is among Toronto's grandest neighbourhoods, with stately period homes set along winding, tree-canopied streets. The flooring we install here meets that standard. Atlas provides Rosedale homeowners with premium hardwood, custom-bound wool stair runners for sweeping staircases, and bespoke area rugs sized perfectly to formal rooms. Many Rosedale homes have magnificent original hardwood that our refinishing experts restore with meticulous, dust-controlled sanding. Our consultants understand the discretion and quality these projects demand, bringing carefully chosen samples to your home and offering honest guidance. We measure with precision and provide transparent written quotes. Every Rosedale project is completed by our own certified installers, who protect your home throughout and deliver a flawless finish. For more than six decades, Toronto's most discerning homeowners have trusted Atlas to treat their floors — and their homes — with the care they deserve.",
    faq: [
      { q: "Do you handle high-end flooring projects in Rosedale?", a: "Yes — we regularly install premium hardwood, fine wool stair runners and custom area rugs in Rosedale's distinguished homes, all completed by our own expert installers." },
      { q: "Can you install a runner on a curved Rosedale staircase?", a: "Absolutely. Curved and winding staircases are common in Rosedale, and our installers are highly experienced at fitting runners to them cleanly and precisely." },
      { q: "Do you refinish original hardwood in Rosedale homes?", a: "Yes. We restore original hardwood with careful, dust-controlled sanding and premium finishes that bring back the wood's natural depth and character." },
    ],
  },
  {
    slug: "high-park",
    name: "High Park",
    description:
      "Around High Park, character homes and young families call for refinished hardwood, new wood floors, stair runners, and durable everyday flooring from Atlas.",
    services: pick("Floor Refinishing", "Hardwood Flooring", "Stair Runners", "Luxury Vinyl", "Carpet & Broadloom"),
    nearbyAreas: ["The Annex", "Toronto", "York"],
    seoTitle: "Flooring High Park Toronto | Hardwood & Refinishing | Atlas",
    metaDescription:
      "Flooring in High Park, Toronto. Hardwood, refinishing, stair runners and luxury vinyl from Atlas Rug & Design Centre. Free in-home estimates.",
    h1: "Flooring in High Park",
    intro:
      "The neighbourhoods surrounding High Park — Roncesvalles, Swansea, and the streets bordering the city's most beloved green space — are full of charming century homes and a thriving community of young families. Atlas serves them all. Many High Park homes feature original hardwood worth refinishing, and we restore these floors with dust-controlled sanding and durable modern finishes. We also install new hardwood, fit stair runners to the steep staircases common in older homes, and put down hard-wearing luxury vinyl and carpet where busy family life demands practicality. Our consultants bring samples to your High Park home, measure precisely, and provide a clear written quote with no hidden costs. Every project is handled by our own installers, who respect both your home and its character. Doing right by High Park families — and earning their referrals — is what has kept Atlas thriving since 1959.",
    faq: [
      { q: "Can you refinish the original floors in my High Park home?", a: "Often, yes. Many homes near High Park have original hardwood with plenty of life left. We assess condition and thickness, then refinish with dust-controlled sanding and durable finishes." },
      { q: "Do you serve Roncesvalles and Swansea?", a: "Yes — we install flooring throughout the High Park area, including Roncesvalles, Swansea and the surrounding streets, with free in-home consultations." },
      { q: "What flooring is best for a young family near High Park?", a: "For active households we often suggest waterproof luxury vinyl or durable hardwood downstairs and comfortable carpet in bedrooms. We'll tailor the recommendation to your home." },
    ],
  },
  {
    slug: "the-beaches",
    name: "The Beaches",
    description:
      "In The Beaches, lakeside character homes pair perfectly with refinished hardwood, moisture-smart vinyl, and cozy carpet — all installed by Atlas.",
    services: pick("Floor Refinishing", "Hardwood Flooring", "Luxury Vinyl", "Carpet & Broadloom", "Stair Runners"),
    nearbyAreas: ["Leslieville", "Riverdale", "East York"],
    seoTitle: "Flooring The Beaches Toronto | Hardwood & Vinyl | Atlas",
    metaDescription:
      "Flooring in The Beaches, Toronto. Hardwood, refinishing, luxury vinyl and carpet from Atlas Rug & Design Centre. Free in-home estimates.",
    h1: "Flooring in The Beaches",
    intro:
      "The Beaches is one of Toronto's most distinctive neighbourhoods — lakeside, relaxed, and full of charming older homes with loads of character. Atlas knows these houses well. Many feature original hardwood that benefits from a careful refinishing, while their proximity to the lake makes moisture-smart choices like quality luxury vinyl a practical option in basements and entryways. We also install new hardwood, cozy bedroom carpet, and stair runners suited to the steep staircases common in The Beaches' older homes. Our consultants bring samples to your home so you can see how they look against the neighbourhood's bright, lake-influenced light, then measure precisely and provide a transparent written quote. Our own certified installers complete every project with care and tidiness. From Queen Street East to the boardwalk, The Beaches families have trusted Atlas with their floors for generations.",
    faq: [
      { q: "Do you serve The Beaches?", a: "Yes — we install flooring throughout The Beaches, from Queen Street East to the lakeshore, with free in-home consultations and samples brought to you." },
      { q: "What flooring handles moisture well near the lake?", a: "For entryways, basements and moisture-prone areas, we often recommend 100% waterproof luxury vinyl plank. It's durable, attractive and ideal for homes near the water." },
      { q: "Can you refinish the hardwood in my Beaches home?", a: "Very often, yes. Many Beaches homes have original hardwood worth restoring. We refinish with dust-controlled sanding and durable finishes that bring the wood back to life." },
    ],
  },
  {
    slug: "leslieville",
    name: "Leslieville",
    description:
      "Leslieville's revitalized homes and young families love refinished hardwood, new wood floors, and durable luxury vinyl — installed expertly by Atlas.",
    services: pick("Floor Refinishing", "Hardwood Flooring", "Luxury Vinyl", "Engineered Hardwood", "Carpet & Broadloom"),
    nearbyAreas: ["Riverdale", "The Beaches", "East York"],
    seoTitle: "Flooring Leslieville Toronto | Hardwood & Luxury Vinyl | Atlas",
    metaDescription:
      "Flooring in Leslieville, Toronto. Hardwood, refinishing, luxury vinyl and engineered hardwood from Atlas Rug & Design Centre. Free quotes.",
    h1: "Flooring in Leslieville",
    intro:
      "Leslieville has transformed into one of Toronto's most sought-after east-end neighbourhoods, where renovated Victorian row houses and semis are home to a wave of young families and design-conscious owners. Atlas fits right in. We refinish the original hardwood these older homes often hide, install new wide-plank hardwood and engineered floors during renovations, and lay durable luxury vinyl where modern, low-maintenance living is the priority. Stair runners and bedroom carpet round out our work in many Leslieville homes. Because so many projects here happen during renovations, our consultants are happy to coordinate timing and bring samples that match your design direction. We measure precisely and quote transparently, and our own installers complete each project cleanly. Leslieville homeowners appreciate working with a long-established local company that delivers contemporary results — and we appreciate their referrals.",
    faq: [
      { q: "Do you work on Leslieville renovations?", a: "Yes — we frequently install hardwood and luxury vinyl during Leslieville renovations. We can coordinate timing with your project and bring samples that suit your design." },
      { q: "Can you refinish original hardwood in a Leslieville home?", a: "Often, yes. Many Leslieville row houses and semis have original hardwood worth restoring. We refinish with dust-controlled sanding and durable, modern finishes." },
      { q: "What flooring suits a modern Leslieville home?", a: "Wide-plank engineered hardwood and high-quality luxury vinyl are popular for their contemporary look and easy upkeep. We'll help you choose what fits your space and lifestyle." },
    ],
  },
  {
    slug: "riverdale",
    name: "Riverdale",
    description:
      "Riverdale's classic homes shine with refinished hardwood, new wood floors, and elegant stair runners — installed with care by Atlas's own crews.",
    services: pick("Floor Refinishing", "Hardwood Flooring", "Stair Runners", "Engineered Hardwood", "Carpet & Broadloom"),
    nearbyAreas: ["Leslieville", "East York", "Downtown Toronto"],
    seoTitle: "Flooring Riverdale Toronto | Hardwood & Stair Runners | Atlas",
    metaDescription:
      "Flooring in Riverdale, Toronto. Hardwood, refinishing, stair runners and engineered hardwood from Atlas Rug & Design Centre. Free in-home quotes.",
    h1: "Flooring in Riverdale",
    intro:
      "Riverdale is a classic Toronto neighbourhood of handsome Victorian and Edwardian homes, leafy streets, and proud homeowners who value craftsmanship. Atlas has served Riverdale for decades. These older homes frequently feature original hardwood that we restore with careful, dust-controlled refinishing, and their characteristic staircases are perfect candidates for a well-fitted stair runner. We also install new hardwood and engineered floors during renovations and lay comfortable carpet in bedrooms. Because Riverdale homes have so much architectural character, our consultants take time to recommend flooring that complements existing details. We bring samples to your Riverdale home, measure precisely, and provide a clear written quote with no surprises. Our own certified installers handle every project, protecting your home and delivering the kind of finish these fine houses deserve. Generations of Riverdale families have trusted Atlas to get their floors right.",
    faq: [
      { q: "Do you refinish hardwood in Riverdale homes?", a: "Yes — refinishing original hardwood is one of our specialties, and many Riverdale homes have floors worth restoring. We use dust-controlled sanding and durable finishes." },
      { q: "Can you install a stair runner in my Riverdale home?", a: "Absolutely. Riverdale's older staircases are ideal for runners, which add comfort, safety and style. We offer wool and patterned options with custom binding." },
      { q: "Is a free quote available in Riverdale?", a: "Yes. We provide free in-home consultations across Riverdale, with samples brought to you and precise measurements for an accurate quote." },
    ],
  },
  {
    slug: "downtown-toronto",
    name: "Downtown Toronto",
    description:
      "Downtown condos and lofts need quiet, building-approved flooring — Atlas installs engineered hardwood and luxury vinyl that meet acoustic requirements.",
    services: pick("Condo Flooring", "Luxury Vinyl", "Engineered Hardwood", "Hardwood Flooring", "Commercial Flooring"),
    nearbyAreas: ["The Annex", "Rosedale", "Toronto"],
    seoTitle: "Flooring Downtown Toronto | Condo Flooring & Luxury Vinyl | Atlas",
    metaDescription:
      "Flooring in Downtown Toronto. Condo-approved engineered hardwood, luxury vinyl and commercial flooring from Atlas Rug & Design Centre. Free quotes.",
    h1: "Flooring in Downtown Toronto",
    intro:
      "Downtown Toronto is condo and loft territory, and flooring here comes with a unique set of requirements. Atlas is experienced with the acoustic underlay specifications and condo board approvals that downtown buildings demand. We install quiet, building-approved engineered hardwood and luxury vinyl that meet IIC sound ratings while still looking beautiful — essential when you have neighbours below. In converted lofts and heritage conversions, we can also lay solid hardwood where the structure allows. Because downtown installations often involve elevator bookings and building access rules, our crews are practiced at working efficiently within those constraints, completing most condo floors quickly to minimize disruption. Our consultant comes to your unit with samples, measures precisely, and provides a clear written quote. We also handle commercial flooring for downtown offices and retail. Whether it's a single condo or a whole floor, Atlas delivers the quality and professionalism downtown Toronto expects.",
    faq: [
      { q: "Do you install flooring in downtown Toronto condos?", a: "Yes — it's one of our specialties. We install engineered hardwood and luxury vinyl with the acoustic underlay needed to meet condo board and IIC sound requirements." },
      { q: "Can you handle building access rules and elevator bookings?", a: "Definitely. Our crews are experienced with downtown building protocols, including certificates of insurance, elevator reservations and scheduled access windows." },
      { q: "Do you offer commercial flooring downtown?", a: "Yes — we install commercial-grade flooring for downtown offices, retail spaces and restaurants, including durable commercial luxury vinyl and carpet tile." },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
