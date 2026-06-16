export interface Project {
  slug: string;
  title: string;
  area: string;
  locationSlug: string;
  type: string;
  product: string;
  scope: string;
  challenge: string;
  solution: string;
  process: string[];
  results: string;
  imageSrc: string;
  relatedService: string;
  relatedLocation: string;
}

export const projects: Project[] = [
  {
    slug: "stair-runner-forest-hill",
    title: "Patterned Stair Runner — Forest Hill",
    area: "Forest Hill",
    locationSlug: "forest-hill",
    type: "Stair Runners",
    product: "Wool herringbone runner",
    scope: "12-step staircase",
    challenge:
      "The homeowners had a beautiful but slippery hardwood staircase that had become a hazard for both their young children and aging parents. They wanted a runner that added safety and warmth without hiding the character of the original oak treads, and the pattern had to complement an existing collection of antique furnishings.",
    solution:
      "We selected a durable wool herringbone runner in a warm neutral tone that grounded the space while letting the oak borders show. Wool was the natural choice for its resilience, stain resistance, and timeless look. We custom-bound the edges in a tonal cotton tape for a clean, tailored finish.",
    process: [
      "In-home consultation with multiple wool samples viewed in the home's natural light.",
      "Precise measurement of all 12 steps, including nosing depth and tread width.",
      "Custom binding of the runner to the exact width with mitred corners.",
      "Professional installation using a waterfall fold and concealed staple line for a crisp result.",
    ],
    results:
      "The finished staircase is safer underfoot, noticeably quieter, and visually warmer. The herringbone pattern ties the front hall together, and the exposed oak borders preserve the home's heritage character. The clients have since asked us to look at a second-floor hallway runner.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/forest-hill",
  },
  {
    slug: "stair-runner-rosedale",
    title: "Classic Stair Runner — Rosedale",
    area: "Rosedale",
    locationSlug: "rosedale",
    type: "Stair Runners",
    product: "Navy bordered wool runner",
    scope: "16-step curved staircase",
    challenge:
      "A grand Rosedale home featured a sweeping curved staircase — one of the most technically demanding surfaces for a runner. The homeowners wanted a classic, bordered look that suited the home's traditional architecture, with no puckering or misaligned pattern around the curves.",
    solution:
      "We chose a premium wool runner with a tailored navy border that echoed the home's colour palette. Curved staircases require each step to be measured and cut individually, so our most experienced installer handled the fitting to keep the border perfectly parallel through every bend.",
    process: [
      "Detailed assessment of the curved staircase and discussion of border colour options.",
      "Step-by-step measurement, accounting for the changing width on each winding tread.",
      "Custom binding with a navy border applied to follow the runner's contour.",
      "Meticulous hand-fitting around the curve so the pattern and border stay aligned.",
    ],
    results:
      "The runner flows seamlessly around the curve with a crisp, continuous border — a result that only careful measurement and skilled installation can achieve. The staircase now reads as a polished focal point of the front hall.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/rosedale",
  },
  {
    slug: "hardwood-leaside",
    title: "White Oak Hardwood — Leaside",
    area: "Leaside",
    locationSlug: "leaside",
    type: "Hardwood",
    product: "Engineered white oak, wide plank",
    scope: "Main floor, 900 sq ft",
    challenge:
      "A Leaside family wanted to replace dated, scratched flooring across their main floor with a bright, modern wide-plank look. The home had a radiant heat zone in the kitchen, which ruled out solid hardwood for that area, and they needed a consistent appearance throughout the open-concept space.",
    solution:
      "We recommended engineered white oak in a wide plank with a matte, wire-brushed finish. The engineered construction is dimensionally stable over radiant heat and humidity swings, and the wide planks gave the open floor plan a contemporary, expansive feel.",
    process: [
      "Moisture and subfloor assessment, including radiant heat compatibility check.",
      "Selection of plank width and finish with samples placed in the actual space.",
      "Removal of old flooring and careful subfloor preparation and levelling.",
      "Installation with proper expansion gaps, transitions, and threshold details.",
    ],
    results:
      "The main floor now feels brighter, larger, and thoroughly modern. The matte finish hides everyday wear from a busy family, and the engineered planks perform beautifully over the radiant-heated kitchen.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/engineered-hardwood",
    relatedLocation: "/locations/leaside",
  },
  {
    slug: "hardwood-north-york",
    title: "Dark Walnut Hardwood — North York",
    area: "North York",
    locationSlug: "north-york",
    type: "Hardwood",
    product: "Solid red oak, custom dark stain",
    scope: "Full home, 1,800 sq ft",
    challenge:
      "The owners of a North York home wanted a rich, dramatic dark walnut tone throughout, but their budget pointed toward red oak rather than true walnut. Achieving an even, deep stain across 1,800 square feet of solid red oak — which can absorb stain unevenly — was the key challenge.",
    solution:
      "We installed solid red oak and applied a custom dark walnut-tone stain using a careful conditioning and multi-pass process to ensure even colour absorption. A durable satin polyurethane sealed the floor for long-term wear.",
    process: [
      "Consultation on species, stain colour, and sheen, with sample boards stained on site.",
      "Installation of solid red oak across the full home with attention to layout direction.",
      "Sanding, wood conditioning, and multi-pass staining for even, deep colour.",
      "Application of protective satin polyurethane and a final walkthrough.",
    ],
    results:
      "The home now has a cohesive, luxurious dark floor that looks far more expensive than its red oak base. The even stain and satin finish give it depth and warmth across every room.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/hardwood",
    relatedLocation: "/locations/north-york",
  },
  {
    slug: "vinyl-condo-downtown",
    title: "LVP Throughout — Downtown Condo",
    area: "Downtown Toronto",
    locationSlug: "downtown-toronto",
    type: "Luxury Vinyl",
    product: "12mil LVP, light oak look",
    scope: "850 sq ft condo, full replacement",
    challenge:
      "A downtown condo owner needed to replace worn builder-grade flooring, but the building had strict acoustic requirements (a minimum IIC sound rating) and tight rules around elevator access and work hours. The new floor had to be quiet for the neighbours below and installed within a single approved access window.",
    solution:
      "We specified a quality 12mil luxury vinyl plank in a light oak look over an acoustic underlay that satisfied the building's sound requirements. LVP is quick to install, 100% waterproof, and gave the unit a bright, modern feel that appeals to downtown buyers and renters alike.",
    process: [
      "Review of the condo's acoustic specification and selection of compliant underlay.",
      "Coordination of building access, certificate of insurance, and elevator booking.",
      "Removal of old flooring and levelling of the concrete subfloor.",
      "Efficient single-day installation of the LVP within the approved window.",
    ],
    results:
      "The condo now has a quiet, waterproof, designer-look floor that meets every building requirement. The fast installation minimized disruption, and the light oak tone makes the compact unit feel more open.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/condo-flooring",
    relatedLocation: "/locations/downtown-toronto",
  },
  {
    slug: "carpet-north-york",
    title: "Plush Broadloom — North York",
    area: "North York",
    locationSlug: "north-york",
    type: "Carpet",
    product: "Nylon plush, light grey",
    scope: "Three bedrooms + hallway",
    challenge:
      "A North York family wanted soft, comfortable carpet for their three bedrooms and upstairs hallway, but with two kids and a dog, durability and stain resistance were just as important as comfort. They also wanted a seamless look across the connected spaces.",
    solution:
      "We selected a solution-dyed nylon plush in a light grey tone — soft underfoot but highly resilient and stain resistant. A quality underpad added comfort and extended the carpet's life. We planned seam placement carefully to keep them out of sight lines and high-traffic paths.",
    process: [
      "In-home consultation comparing nylon options and pile heights.",
      "Precise measurement and seam planning across the bedrooms and hallway.",
      "Removal of old carpet and installation of a premium underpad.",
      "Professional installation with power-stretching for a tight, lasting fit.",
    ],
    results:
      "The upstairs now feels warm and quiet, and the durable nylon stands up easily to kids and pets. The light grey colour brightens the bedrooms and ties the floor together seamlessly.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/carpet",
    relatedLocation: "/locations/north-york",
  },
  {
    slug: "carpet-forest-hill",
    title: "Wool Carpet — Forest Hill",
    area: "Forest Hill",
    locationSlug: "forest-hill",
    type: "Carpet",
    product: "100% wool loop, warm beige",
    scope: "Master bedroom + sitting room",
    challenge:
      "A Forest Hill homeowner wanted a luxurious, natural-fibre carpet for their master suite that felt soft and looked refined, while standing up to daily use. They specifically wanted a natural material over synthetic, with a subtle texture rather than a flat finish.",
    solution:
      "We installed a 100% wool loop carpet in a warm beige with a subtle textured pattern. Wool is naturally resilient, flame resistant, and ages gracefully, making it ideal for a high-end bedroom suite. A premium underpad enhanced the plush, quiet feel.",
    process: [
      "Consultation focused on natural-fibre options and texture preferences.",
      "Measurement of the connected bedroom and sitting room for a continuous run.",
      "Installation of a high-density underpad for comfort and longevity.",
      "Careful seaming and power-stretching for a flawless, durable finish.",
    ],
    results:
      "The master suite now feels genuinely luxurious — soft, quiet, and naturally beautiful. The wool's subtle texture adds depth, and its natural resilience means it will look excellent for years.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/carpet",
    relatedLocation: "/locations/forest-hill",
  },
  {
    slug: "refinishing-annex",
    title: "Floor Refinishing — The Annex",
    area: "The Annex",
    locationSlug: "the-annex",
    type: "Refinishing",
    product: "Waterborne poly, natural finish",
    scope: "Original fir floors, 1,200 sq ft",
    challenge:
      "An Annex homeowner had beautiful original fir floors hidden under decades of darkened varnish, scuffs, and a few paint spills. They wanted to restore the natural wood without staining it dark, and they were concerned about dust and odour because they would remain living in the home during the work.",
    solution:
      "We used a dust-controlled sanding system and a clear, low-odour waterborne polyurethane to bring out the fir's natural honey tone. Waterborne poly dries fast and has minimal smell, allowing the family to stay in the home with limited disruption.",
    process: [
      "Assessment of board thickness and condition to confirm refinishing was viable.",
      "Dust-controlled sanding to remove old finish and surface damage.",
      "Spot repairs and careful handling of paint-affected areas.",
      "Application of multiple coats of clear waterborne polyurethane.",
    ],
    results:
      "The original fir floors were revived to a warm, natural glow that suits the heritage home perfectly. The low-odour finish let the family stay put, and the restored floors saved them the cost of replacement.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/the-annex",
  },
  {
    slug: "laminate-scarborough",
    title: "Wide-Plank Laminate — Scarborough",
    area: "Scarborough",
    locationSlug: "scarborough",
    type: "Laminate",
    product: "12mm AC4 laminate, warm oak",
    scope: "Open-plan main floor, 1,100 sq ft",
    challenge:
      "A Scarborough family with kids and pets wanted the look of wide-plank hardwood across their open main floor, but needed something that could survive heavy daily traffic, the occasional spill, and pet claws — all within a sensible budget.",
    solution:
      "We recommended a 12mm AC4-rated laminate in a warm oak finish with realistic embossed texture. AC4 laminate is built for high residential and light commercial traffic, resisting scratches and dents far better than softer options, while the thick core feels solid underfoot.",
    process: [
      "Consultation comparing laminate AC ratings and oak finishes with samples on site.",
      "Subfloor levelling and moisture check before installation.",
      "Installation of a quality underlay for sound and comfort.",
      "Click-lock laminate installation with proper expansion gaps and transitions.",
    ],
    results:
      "The main floor looks like genuine wide-plank hardwood but shrugs off the wear of a busy household. The family got the high-end look they wanted at a budget-friendly price, with durability to match their lifestyle.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/laminate",
    relatedLocation: "/locations/scarborough",
  },
  {
    slug: "commercial-toronto",
    title: "Commercial LVP — Toronto Office",
    area: "Toronto",
    locationSlug: "toronto",
    type: "Commercial",
    product: "20mil commercial LVP",
    scope: "2,400 sq ft office, occupied building",
    challenge:
      "A Toronto business needed to replace tired carpet tile across a 2,400 square foot office, but the space was occupied during business hours and the company couldn't afford extended downtime. The new floor had to be extremely durable, easy to clean, and installed with minimal disruption to staff.",
    solution:
      "We specified a 20mil commercial-grade luxury vinyl plank built for heavy traffic and easy maintenance. We phased the installation in sections and scheduled work around the office's hours so the business could keep operating throughout the project.",
    process: [
      "Site assessment, traffic analysis, and selection of a commercial-grade LVP.",
      "Phased project plan to keep the office operational during installation.",
      "Removal of old carpet tile and preparation of the subfloor in stages.",
      "Section-by-section LVP installation completed around business hours.",
    ],
    results:
      "The office now has a clean, professional, hard-wearing floor that is far easier to maintain than the old carpet tile. The phased approach meant the business stayed open throughout, with no lost productivity.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/commercial",
    relatedLocation: "/locations/toronto",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectTypes: string[] = Array.from(
  new Set(projects.map((p) => p.type))
);
