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
    imageSrc: "/images/project-stair-runner-forest-hill.jpg",
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
    imageSrc: "/images/project-stair-runner-rosedale.jpeg",
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
    imageSrc: "/images/project-hardwood-leaside.jpg",
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
    imageSrc: "/images/project-hardwood-north-york.jpg",
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
    imageSrc: "/images/project-vinyl-condo-downtown.png",
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
    imageSrc: "/images/project-carpet-north-york.jpeg",
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
    imageSrc: "/images/project-carpet-forest-hill.jpeg",
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
    imageSrc: "/images/project-refinishing-annex.jpeg",
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
    imageSrc: "/images/project-laminate-scarborough.png",
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
  {
    slug: "stair-runner-yorkville",
    title: "Herringbone Wool Runner — Yorkville",
    area: "Yorkville",
    locationSlug: "yorkville",
    type: "Stair Runners",
    product: "Custom wool herringbone, charcoal border",
    scope: "14-step straight staircase",
    challenge:
      "The owners of a Yorkville townhouse had glossy maple stairs that two small dogs treated like a slide. They wanted something with grip and a tailored, almost menswear look to match the renovated entry, but the stairwell was narrow and dim so the pattern couldn't read as busy.",
    solution:
      "We went with a custom wool herringbone in a mid-grey and wrapped it with a thin charcoal border to give it a crisp frame. Herringbone hides paw traffic between cleanings, and the tight weave gives the dogs traction without being rough underfoot.",
    process: [
      "Sampled three herringbone weaves in the actual stairwell light: Grey-on-grey reads flat in fluorescent light, so we tested at night too.",
      "Measured all 14 treads and the nosing depth: Confirmed the runner width left an even reveal of maple on both sides.",
      "Custom-bound the runner with a charcoal cotton border: Mitred corners so the border turns cleanly at the landing.",
      "Installed waterfall-style with a concealed staple line: Kept the herringbone marching straight down the full run.",
    ],
    results:
      "The stairs are quiet now and the dogs stopped slipping the day it went in. The charcoal border ties into the home's dark window frames, and the grey hides everyday dirt between cleanings.",
    imageSrc: "/images/project-stair-runner-yorkville.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "stair-runner-high-park",
    title: "Striped Wool Runner — High Park",
    area: "High Park",
    locationSlug: "high-park",
    type: "Stair Runners",
    product: "Navy and cream striped wool runner",
    scope: "13-step staircase with a winder",
    challenge:
      "A young family near High Park wanted a cheerful, cottage-y stripe for the stairs of their 1912 home, but the staircase had two winder steps at the bottom that complicate any striped pattern. Get it wrong and the stripes fan out and look crooked on the turns.",
    solution:
      "We chose a navy and cream wool stripe and cut the winders individually so the stripes stayed square to the front edge of each tread. On a winder the only honest way to do it is one piece per step, hand-fitted.",
    process: [
      "Reviewed the winder layout and explained how stripes behave on a turn.",
      "Measured each winder separately as its own template.",
      "Bound the runner in cream to keep the edges clean.",
      "Hand-fitted the winders so every stripe sits parallel to the tread nosing.",
    ],
    results:
      "The stripes run dead straight all the way down, even across the two winders, which is the part most people get wrong. The navy grounds it and the cream keeps the narrow stairwell feeling bright.",
    imageSrc: "/images/project-stair-runner-high-park.png",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/high-park",
  },
  {
    slug: "stair-runner-annex",
    title: "Geometric Pattern Runner — The Annex",
    area: "The Annex",
    locationSlug: "the-annex",
    type: "Stair Runners",
    product: "Bold geometric wool runner, navy",
    scope: "15-step staircase",
    challenge:
      "An Annex Victorian had a dramatic front staircase that the owners wanted to make a statement piece, not hide. They were drawn to a bold geometric but worried it would clash with the home's original newel post and dark trim.",
    solution:
      "We picked a navy wool geometric with enough scale to register from the front hall but a repeat that lined up cleanly step to step. We dry-laid the full runner first so they could see the pattern centred before a single staple went in.",
    process: [
      "Pulled several large-scale geometrics and laid them on the stairs to judge scale.",
      "Centred the pattern repeat on the tread width and confirmed alignment.",
      "Custom-bound in a tonal navy tape.",
      "Installed with a waterfall fold, keeping the motif centred down the flight.",
    ],
    results:
      "The runner became exactly the focal point they wanted. Visitors notice it immediately, and the navy sits comfortably against the original dark woodwork instead of fighting it.",
    imageSrc: "/images/project-stair-runner-annex.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/the-annex",
  },
  {
    slug: "stair-runner-etobicoke",
    title: "Solid Nylon Runner — Etobicoke",
    area: "Etobicoke",
    locationSlug: "etobicoke",
    type: "Stair Runners",
    product: "Charcoal nylon runner, waterfall install",
    scope: "12-step staircase",
    challenge:
      "A busy Etobicoke household with three teenagers needed a runner that could take a pounding and clean up easily. Wool was over budget and frankly more than they needed for a back staircase that gets heavy daily traffic.",
    solution:
      "We recommended a solid charcoal solution-dyed nylon — tough, stain-resistant, and a fraction of the wool price. Solution-dyed nylon takes spills and foot traffic without showing wear, which suits a high-use staircase far better than a delicate fibre.",
    process: [
      "Talked through nylon vs wool honestly given the budget and traffic.",
      "Measured the 12 straight treads.",
      "Serged the edges for a durable, low-profile finish.",
      "Installed waterfall-style for a clean look that handles heavy use.",
    ],
    results:
      "The family got a hard-wearing runner that hides scuffs and wipes clean, at a price that made sense for a secondary staircase. Two years of teenager traffic later it still looks sharp.",
    imageSrc: "/images/project-stair-runner-etobicoke.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/etobicoke",
  },
  {
    slug: "stair-runner-midtown",
    title: "Persian-Inspired Runner — Midtown Toronto",
    area: "Midtown Toronto",
    locationSlug: "midtown-toronto",
    type: "Stair Runners",
    product: "Traditional patterned wool runner",
    scope: "16-step staircase",
    challenge:
      "A Midtown couple were furnishing a traditional home with antique rugs and wanted the staircase to feel like part of that collection rather than an afterthought. They needed a patterned wool runner whose colours pulled from the rugs already in the hall and living room.",
    solution:
      "We sourced a Persian-inspired wool runner in deep reds and indigo that echoed their existing pieces, then matched the binding to one of the rug borders. Pulling the runner colours from rugs already in the home is what makes a staircase feel collected instead of catalogue.",
    process: [
      "Brought runner samples to sit beside their existing antique rugs.",
      "Measured all 16 treads including a slightly deeper bottom step.",
      "Bound the runner to echo an existing rug border.",
      "Installed with careful pattern placement so the medallion centres on each tread.",
    ],
    results:
      "The staircase now reads as a continuation of their rug collection, which is exactly what they were after. The traditional pattern also does a good job hiding the realities of a well-used family stair.",
    imageSrc: "/images/project-stair-runner-midtown.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "stair-runner-beaches",
    title: "Natural Sisal Runner — The Beaches",
    area: "The Beaches",
    locationSlug: "the-beaches",
    type: "Stair Runners",
    product: "Sisal runner, brass stair rods",
    scope: "11-step staircase",
    challenge:
      "A Beaches homeowner wanted the relaxed, coastal look of natural fibre on the stairs and loved the idea of brass stair rods. The challenge with sisal on stairs is that it's stiff and unforgiving on the nosing, and it shows installation flaws more than a softer wool.",
    solution:
      "We used a quality sisal with a latex backing for a bit more give and paired it with polished brass rods at each riser. Sisal demands a very precise install because it won't stretch to hide a mistake, so our most experienced installer handled the fitting.",
    process: [
      "Confirmed sisal was the right call for a moderate-traffic front stair.",
      "Measured for the runner plus the brass rod brackets at each step.",
      "Bound the sisal edges with a coordinating cotton tape.",
      "Fitted tightly over each nosing and set the brass rods level.",
    ],
    results:
      "The sisal gives the entry the breezy, natural feel they wanted, and the brass rods add a touch of polish that suits the house. It's held its shape well, which is the real test with a stiff natural fibre.",
    imageSrc: "/images/project-stair-runner-beaches.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/the-beaches",
  },
  {
    slug: "stair-runner-leslieville",
    title: "Cut Pile Carpet Stairs — Leslieville",
    area: "Leslieville",
    locationSlug: "leslieville",
    type: "Stair Runners",
    product: "Fully carpeted stairs, warm grey nylon",
    scope: "14 fully carpeted steps",
    challenge:
      "A Leslieville semi had a steep, narrow staircase down to a converted basement suite, and the owners wanted it fully carpeted rather than a runner — partly for warmth and partly to quiet the footsteps for the tenant below.",
    solution:
      "We fully upholstered the stairs in a warm grey cut-pile nylon over a dense underpad, which deadens sound noticeably better than a runner on bare treads. Wall-to-wall on a stair also makes a narrow flight feel less precarious underfoot.",
    process: [
      "Discussed full carpet vs runner for sound and safety.",
      "Measured the full tread and riser wrap on all 14 steps.",
      "Installed a dense underpad rated for stairs.",
      "Upholstered each step with tight, hand-tucked corners.",
    ],
    results:
      "The staircase is warmer and dramatically quieter, which kept the peace with the basement tenant. The cut pile feels secure on a steep flight and the grey hides traffic on the way down.",
    imageSrc: "/images/project-stair-runner-leslieville.jpeg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/leslieville",
  },
  {
    slug: "stair-runner-riverdale",
    title: "Bordered Wool Runner — Riverdale",
    area: "Riverdale",
    locationSlug: "riverdale",
    type: "Stair Runners",
    product: "Cream with charcoal border, wool",
    scope: "15-step staircase",
    challenge:
      "A Riverdale family had refinished their original oak stairs and didn't want to cover too much of the wood, but the bare treads were loud and slippery for the kids. They wanted a light runner that kept the oak borders on show.",
    solution:
      "We chose a cream wool with a slim charcoal border, sized to leave a generous reveal of the freshly refinished oak on either side. A light runner with a defined border keeps the staircase feeling open while the border does the work of framing the wood.",
    process: [
      "Sized the runner to show an even band of oak on both sides.",
      "Measured all 15 treads and the nosing depth.",
      "Bound the cream wool with a tailored charcoal border.",
      "Waterfall install with a concealed staple line.",
    ],
    results:
      "The kids have grip and the stairs are quieter, but the refinished oak still gets to be the star. The charcoal border keeps the light cream from looking precious in a busy household.",
    imageSrc: "/images/project-stair-runner-riverdale.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/riverdale",
  },
  {
    slug: "stair-runner-east-york",
    title: "Berber Stair Runner — East York",
    area: "East York",
    locationSlug: "east-york",
    type: "Stair Runners",
    product: "Loop pile berber, oatmeal colour",
    scope: "13-step staircase",
    challenge:
      "An East York bungalow owner wanted a practical, no-fuss runner for the stairs to a finished basement. Their main concern was a fibre that wouldn't show every footprint and could handle a vacuum without fraying.",
    solution:
      "We fitted an oatmeal loop-pile berber, which is forgiving on traffic marks and very durable. Loop pile on stairs needs careful tucking on the nosing so the loops don't pull, so we took our time on the fold of each step.",
    process: [
      "Recommended a tight loop berber for a low-maintenance basement stair.",
      "Measured the 13 treads and riser depth.",
      "Serged the edges in a matching oatmeal.",
      "Tucked each nosing carefully to protect the loops.",
    ],
    results:
      "The berber shrugs off the daily trips up and down to the basement and doesn't show footprints, which was the whole point. The neutral oatmeal works with whatever the owners change downstairs.",
    imageSrc: "/images/project-stair-runner-east-york.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/east-york",
  },
  {
    slug: "stair-runner-north-york-semi",
    title: "Semi-Detached Stair Runner — North York",
    area: "North York",
    locationSlug: "north-york",
    type: "Stair Runners",
    product: "Quality nylon runner, taupe",
    scope: "14-step staircase",
    challenge:
      "A North York semi with a dog that sheds heavily needed a runner that could survive both claws and constant vacuuming, and ideally hide hair between cleanings. The owners had been burned by a previous runner that matted within a year.",
    solution:
      "We specified a taupe nylon runner, which is stain resistant and resists crushing far better than the cheaper polyester they'd had before. Quality nylon holds up to pets and frequent vacuuming without matting down on the high-traffic centre of each step.",
    process: [
      "Diagnosed why the old runner matted and recommended quality nylon instead.",
      "Measured all 14 treads.",
      "Serged the edges in a matching taupe.",
      "Installed waterfall-style over a firm pad.",
    ],
    results:
      "A year of dog traffic in and the runner still springs back instead of matting like the last one. The taupe hides hair between vacuums, and stains wipe up before they set.",
    imageSrc: "/images/project-stair-runner-north-york-semi.jpg",
    relatedService: "/stair-runners",
    relatedLocation: "/locations/north-york",
  },
  {
    slug: "hardwood-yorkville-condo",
    title: "Engineered Oak — Yorkville Condo",
    area: "Yorkville",
    locationSlug: "yorkville",
    type: "Hardwood",
    product: "Engineered white oak, 5\" plank, matte finish",
    scope: "720 sq ft condo",
    challenge:
      "A Yorkville condo owner wanted real wood underfoot instead of the builder laminate, but the building had a firm acoustic spec and only allowed work between 9 and 4 on weekdays. The concrete slab also had a noticeable slope toward the balcony door.",
    solution:
      "We used 5-inch engineered white oak with a matte finish over an acoustic underlay that cleared the building's IIC requirement. Engineered over a self-levelled slab is the right answer in a high-rise — it stays flat and meets the sound rules solid wood can't.",
    process: [
      "Pulled the building's acoustic spec and chose a compliant underlay.",
      "Self-levelled the sloped slab before any flooring went down.",
      "Floated the engineered oak with tight plank-to-plank alignment.",
      "Completed within the building's 9-to-4 work window.",
    ],
    results:
      "The unit went from generic laminate to a warm, flat oak floor that meets every building rule. The matte finish hides the dust that a downtown condo collects, and the neighbour below has had no complaints.",
    imageSrc: "/images/project-hardwood-yorkville-condo.png",
    relatedService: "/engineered-hardwood",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "hardwood-forest-hill-full-home",
    title: "Full Home White Oak — Forest Hill",
    area: "Forest Hill",
    locationSlug: "forest-hill",
    type: "Hardwood",
    product: "Solid white oak, 4\" plank, custom grey stain",
    scope: "Full home, 2,600 sq ft",
    challenge:
      "A Forest Hill family gutting their home wanted a custom soft-grey stain on white oak throughout — a notoriously tricky colour because grey can go blue or muddy depending on the wood and the light. Across 2,600 square feet, any inconsistency would be glaring.",
    solution:
      "We installed 4-inch solid white oak and developed the grey on sample boards in the actual rooms before committing. Getting a grey right on oak is all in the reactive base coat and the topcoat sheen, so we dialled it in on site rather than trusting a sample chip.",
    process: [
      "Stained multiple boards on site and reviewed them morning and evening.",
      "Installed solid white oak across the full home in a consistent direction.",
      "Sanded, applied the reactive base, then the custom grey.",
      "Sealed with a matte waterborne poly to keep the grey true.",
    ],
    results:
      "The grey came out even and warm across every room, with none of the blue cast that ruins a lot of grey floors. The matte finish keeps it looking like raw, weathered oak rather than painted.",
    imageSrc: "/images/project-hardwood-forest-hill-full-home.png",
    relatedService: "/hardwood",
    relatedLocation: "/locations/forest-hill",
  },
  {
    slug: "hardwood-annex-refinish-new",
    title: "Original Fir Restore & Stain — The Annex",
    area: "The Annex",
    locationSlug: "the-annex",
    type: "Hardwood",
    product: "Refinished original Douglas fir, Jacobean stain",
    scope: "Second floor, 800 sq ft",
    challenge:
      "An Annex homeowner had original Douglas fir on the second floor that previous owners had painted in two bedrooms and carpeted in a third. They wanted it all restored and stained a deep Jacobean to match the main floor.",
    solution:
      "We stripped the paint, patched where old heating grates had been, and stained the fir Jacobean — carefully, because fir is soft and drinks stain unevenly if you rush the conditioning. The conditioner step is what stops blotchy fir, and on a deep stain like Jacobean you can't skip it.",
    process: [
      "Tested board thickness to confirm there was enough fir to sand.",
      "Stripped paint and patched old grate cut-outs with matched fir.",
      "Conditioned the soft fir, then applied Jacobean in even passes.",
      "Finished with satin oil-based poly for depth.",
    ],
    results:
      "The fir went from a patchwork of paint and carpet to a rich, even Jacobean that now flows with the main floor. The patched grate areas are invisible, and the deep colour suits the home's age.",
    imageSrc: "/images/project-hardwood-annex-refinish-new.jpg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/the-annex",
  },
  {
    slug: "hardwood-midtown-herringbone",
    title: "Herringbone Pattern Hardwood — Midtown",
    area: "Midtown Toronto",
    locationSlug: "midtown-toronto",
    type: "Hardwood",
    product: "Engineered oak, herringbone pattern, natural finish",
    scope: "Living and dining, 520 sq ft",
    challenge:
      "A Midtown couple wanted a classic herringbone in their living and dining room, but the existing subfloor was an old, slightly uneven plywood that would telegraph through any tight pattern. Herringbone is unforgiving — small subfloor flaws show as lippage between points.",
    solution:
      "We re-flattened the subfloor and laid an engineered oak herringbone in a natural finish, setting out from a centreline so the pattern stayed symmetrical to the room. With herringbone the layout is everything; a few millimetres of drift at the start becomes a crooked seam at the wall.",
    process: [
      "Skim-levelled the plywood subfloor to remove dips.",
      "Snapped a centreline and dry-laid the herringbone first.",
      "Glued each piece for a tight, quiet pattern.",
      "Finished natural to let the oak grain carry the look.",
    ],
    results:
      "The herringbone runs true to the room with crisp, even points and no lippage underfoot. The natural finish keeps it timeless, and the pattern makes the modest-sized rooms feel considered and high-end.",
    imageSrc: "/images/project-hardwood-midtown-herringbone.jpg",
    relatedService: "/engineered-hardwood",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "hardwood-etobicoke-basement",
    title: "Engineered Hardwood Basement — Etobicoke",
    area: "Etobicoke",
    locationSlug: "etobicoke",
    type: "Hardwood",
    product: "Engineered hickory, floating install",
    scope: "Basement, 950 sq ft",
    challenge:
      "An Etobicoke family wanted real wood in their finished basement, which most people will tell you is a bad idea below grade. Their concern was the occasional damp they'd noticed against one foundation wall after heavy rain.",
    solution:
      "We moisture-tested the slab, addressed the damp wall, then floated an engineered hickory over a vapour-barrier underlay. Engineered wood floated over a proper moisture barrier is the only sensible way to get real hardwood into a Toronto basement.",
    process: [
      "Ran a calcium chloride moisture test on the slab.",
      "Sealed the slab and added a vapour-barrier underlay.",
      "Floated the engineered hickory with proper perimeter gaps.",
      "Left expansion room behind the baseboards for seasonal movement.",
    ],
    results:
      "The basement got the warm, real-wood feel the family wanted, and the moisture barrier has handled the seasonal damp without a single buckled board. Hickory's hardness shrugs off the kids' toys and chairs.",
    imageSrc: "/images/project-hardwood-etobicoke-basement.png",
    relatedService: "/engineered-hardwood",
    relatedLocation: "/locations/etobicoke",
  },
  {
    slug: "hardwood-beaches-maple",
    title: "Light Maple Hardwood — The Beaches",
    area: "The Beaches",
    locationSlug: "the-beaches",
    type: "Hardwood",
    product: "Solid maple, 3.25\" strip, natural finish",
    scope: "Main floor, 680 sq ft",
    challenge:
      "A Beaches homeowner wanted bright, clean maple to lighten a small main floor that never got much sun. Maple is hard but fussy to finish — it can yellow under the wrong topcoat, which would defeat the whole point of going light.",
    solution:
      "We installed 3.25-inch solid maple and finished it with a non-yellowing waterborne poly to keep the wood as pale as possible. On maple the topcoat choice matters more than the species; an oil-based poly would have turned it amber within a year.",
    process: [
      "Selected select-grade maple for a clean, consistent look.",
      "Installed the strip flooring across the small main floor.",
      "Sanded fine and finished with non-yellowing waterborne poly.",
      "Confirmed colour stability on a sample before topcoating.",
    ],
    results:
      "The maple stayed bright and pale instead of yellowing, which genuinely lifts the small, low-light main floor. The narrow strip suits the age of the house and the natural finish keeps it feeling airy.",
    imageSrc: "/images/project-hardwood-beaches-maple.png",
    relatedService: "/hardwood",
    relatedLocation: "/locations/the-beaches",
  },
  {
    slug: "hardwood-high-park-walnut",
    title: "Dark Walnut Living Room — High Park",
    area: "High Park",
    locationSlug: "high-park",
    type: "Hardwood",
    product: "Engineered walnut, 6\" plank, wire-brushed",
    scope: "Living room, 360 sq ft",
    challenge:
      "A High Park homeowner wanted a rich walnut feature floor in the living room only, which meant it had to transition cleanly into the existing oak in the adjoining hall without looking like an accident. They also have a large dog and worried walnut would scratch.",
    solution:
      "We used a 6-inch wire-brushed engineered walnut, whose texture hides scratches far better than a smooth finish, and built a clean transition at the room threshold. Wire-brushing is the trick for walnut with a dog — the open grain disguises the dings that a glassy finish would show.",
    process: [
      "Planned the threshold transition between walnut and existing oak.",
      "Installed the wide engineered walnut planks.",
      "Kept the wire-brushed texture intact through finishing.",
      "Set a low-profile transition strip at the hall.",
    ],
    results:
      "The living room got the dramatic, dark floor they wanted, and the wire-brushed texture has hidden the dog's claw marks completely. The threshold reads as intentional rather than a patch.",
    imageSrc: "/images/project-hardwood-high-park-walnut.png",
    relatedService: "/engineered-hardwood",
    relatedLocation: "/locations/high-park",
  },
  {
    slug: "hardwood-rosedale-full",
    title: "Wide-Plank Ash — Rosedale",
    area: "Rosedale",
    locationSlug: "rosedale",
    type: "Hardwood",
    product: "Engineered ash, 7\" wide plank, satin finish",
    scope: "Main and second floor, 1,900 sq ft",
    challenge:
      "A Rosedale renovation called for very wide 7-inch ash planks across two floors, which is a stability gamble in a house with old, drafty rooms and big seasonal humidity swings. Wide solid planks would cup and gap badly in that environment.",
    solution:
      "We specified a quality engineered ash in a satin finish, glued and nailed for a rock-solid feel without the seasonal movement wide solid boards suffer. At 7 inches wide, engineered is the only honest recommendation in a heritage house with big humidity swings.",
    process: [
      "Explained why engineered beats solid at 7-inch widths in an old house.",
      "Acclimated the ash on site before installation.",
      "Glued and nailed across both floors for stability.",
      "Finished satin to balance sheen and scratch resistance.",
    ],
    results:
      "Two winters in, the wide ash planks have stayed flat with no cupping or gapping — exactly why we steered them off solid. The blonde ash brightens the formal rooms and the satin finish reads refined without glare.",
    imageSrc: "/images/project-hardwood-rosedale-full.png",
    relatedService: "/engineered-hardwood",
    relatedLocation: "/locations/rosedale",
  },
  {
    slug: "hardwood-east-york-oak",
    title: "Red Oak Refinish & Restain — East York",
    area: "East York",
    locationSlug: "east-york",
    type: "Hardwood",
    product: "Original red oak, sanded, Early American stain",
    scope: "Main floor, 740 sq ft",
    challenge:
      "An East York homeowner had original red oak buried under an orange-toned old finish they hated. They wanted a warm, classic Early American without going dark, but red oak's pink undertone fights warm stains and can look muddy.",
    solution:
      "We sanded back to raw wood and used a conditioner before applying Early American, which tames red oak's pink and lets the warm brown come through clean. Skipping the conditioner on red oak is how you end up with a blotchy, salmon-tinged floor.",
    process: [
      "Sanded off the old orange finish to bare oak.",
      "Conditioned the wood to even out red oak's pink undertone.",
      "Applied Early American in controlled passes.",
      "Sealed with satin poly for everyday durability.",
    ],
    results:
      "The floor lost its dated orange cast and reads as a warm, even Early American with no blotching. The owners got the classic look they wanted out of the oak they already had, for a fraction of replacement cost.",
    imageSrc: "/images/project-hardwood-east-york-oak.jpeg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/east-york",
  },
  {
    slug: "hardwood-scarborough-engineered",
    title: "Engineered Oak Throughout — Scarborough",
    area: "Scarborough",
    locationSlug: "scarborough",
    type: "Hardwood",
    product: "Engineered oak, glue-down, radiant heat",
    scope: "Main floor, 1,250 sq ft",
    challenge:
      "A Scarborough family built radiant in-floor heat into their main-floor renovation and wanted real wood over it. Solid hardwood over radiant is a recipe for gapping and squeaks as the heat cycles the boards.",
    solution:
      "We glued down engineered oak directly to the heated slab, which keeps it stable through the heating cycles and transfers warmth efficiently. Glue-down engineered over radiant is the proven method — a floating floor would insulate the heat and a solid floor would move too much.",
    process: [
      "Confirmed the radiant system specs and max surface temperature.",
      "Ran a controlled warm-up of the slab before installing.",
      "Glued the engineered oak directly to the heated slab.",
      "Kept perimeter expansion gaps for the heat cycles.",
    ],
    results:
      "The floor warms up evenly and has stayed tight and quiet through full heating seasons. The family gets the comfort of radiant heat with the look of real oak, and no gapping where solid wood would have failed.",
    imageSrc: "/images/project-hardwood-scarborough-engineered.jpeg",
    relatedService: "/engineered-hardwood",
    relatedLocation: "/locations/scarborough",
  },
  {
    slug: "vinyl-north-york-basement",
    title: "Waterproof LVP Basement — North York",
    area: "North York",
    locationSlug: "north-york",
    type: "Luxury Vinyl",
    product: "12mil LVP, grey oak look, floating install",
    scope: "Basement, 1,000 sq ft",
    challenge:
      "A North York family finishing their basement had a previous water incident from a backed-up floor drain and refused to risk wood or carpet. They wanted something that could get wet and survive, but still look like a real floor and not a utility space.",
    solution:
      "We floated a 12mil grey-oak LVP over a vapour underlay, leaving the floor drain accessible and the perimeter free to move. Waterproof LVP is the obvious call for a basement with a drain history — if it floods again, you dry it and carry on.",
    process: [
      "Inspected the floor drain and slab for moisture.",
      "Levelled low spots in the slab.",
      "Floated 12mil LVP over a vapour-barrier underlay.",
      "Kept the drain accessible and the perimeter gapped.",
    ],
    results:
      "The basement looks like a proper living space instead of a concrete box, and the family stopped worrying about the drain. The 12mil wear layer takes the kids and the treadmill without denting.",
    imageSrc: "/images/project-vinyl-north-york-basement.png",
    relatedService: "/basement-flooring",
    relatedLocation: "/locations/north-york",
  },
  {
    slug: "vinyl-etobicoke-kitchen",
    title: "LVP Kitchen & Bath — Etobicoke",
    area: "Etobicoke",
    locationSlug: "etobicoke",
    type: "Luxury Vinyl",
    product: "Stone-look LVT bathroom, wood-look LVP kitchen",
    scope: "Kitchen and bath, 420 sq ft",
    challenge:
      "An Etobicoke homeowner wanted the warmth of wood in the kitchen but the look of stone in the adjoining powder room, with a clean transition between the two and zero worry about water in either.",
    solution:
      "We ran a wood-look LVP through the kitchen and a stone-look LVT in the bath, both waterproof, meeting at a tight grout-line transition. Mixing LVP and LVT lets you get two materials' looks with one material's worry-free performance around plumbing.",
    process: [
      "Selected coordinating wood-look and stone-look products.",
      "Prepped and levelled both floors.",
      "Installed LVP in the kitchen and LVT in the bath.",
      "Set a clean transition where the two patterns meet.",
    ],
    results:
      "The kitchen feels warm and the powder room feels crisp, but both will laugh off a dishwasher leak or an overflowing sink. The transition between the two reads as a deliberate design line.",
    imageSrc: "/images/project-vinyl-etobicoke-kitchen.jpeg",
    relatedService: "/vinyl",
    relatedLocation: "/locations/etobicoke",
  },
  {
    slug: "vinyl-scarborough-full-home",
    title: "LVP Full Home Renovation — Scarborough",
    area: "Scarborough",
    locationSlug: "scarborough",
    type: "Luxury Vinyl",
    product: "20mil LVP throughout, warm blonde oak",
    scope: "Full home, 1,700 sq ft",
    challenge:
      "A Scarborough family renovating a rental-turned-residence wanted one durable floor through the entire house — main floor, stairs landing, and bedrooms — that could take heavy use and be cleaned easily. Different rooms had three different existing floor heights.",
    solution:
      "We used a 20mil warm-blonde LVP throughout and levelled the height differences so the whole house flows as one continuous floor. Running one product everywhere makes a modest house feel bigger and removes the transition strips that collect dirt.",
    process: [
      "Surveyed the three existing floor heights across the house.",
      "Levelled and feathered the transitions to one plane.",
      "Installed 20mil LVP continuously through every room.",
      "Minimised transition strips for a seamless flow.",
    ],
    results:
      "The house reads as one bright, continuous space, which makes the modest square footage feel generous. The 20mil wear layer is built for the heavy use the family throws at it and wipes clean in minutes.",
    imageSrc: "/images/project-vinyl-scarborough-full-home.jpg",
    relatedService: "/vinyl",
    relatedLocation: "/locations/scarborough",
  },
  {
    slug: "vinyl-midtown-condo",
    title: "LVP Condo Upgrade — Midtown",
    area: "Midtown Toronto",
    locationSlug: "midtown-toronto",
    type: "Luxury Vinyl",
    product: "8mil LVP, light oak, floated over existing tile",
    scope: "650 sq ft condo",
    challenge:
      "A Midtown condo owner wanted to update dated ceramic tile but couldn't face the cost, mess, and slab damage of ripping it out in a high-rise. The tile was sound but ugly, and the grout lines were the worry for floating over top.",
    solution:
      "We floated a light-oak 8mil LVP directly over the existing tile after skim-filling the grout lines so they wouldn't telegraph through. Floating over sound tile saves a fortune and a week of demolition dust — you just have to fill the grout joints first.",
    process: [
      "Confirmed the tile was well-bonded and flat enough to float over.",
      "Skim-filled the grout lines so they wouldn't show through.",
      "Floated 8mil LVP over the prepared tile.",
      "Trimmed door undercuts to keep the height transition clean.",
    ],
    results:
      "The dated tile disappeared under a clean light-oak floor with no demolition, no dust, and a fraction of the cost. The filled grout lines stayed invisible, and the height bump at the door is barely noticeable.",
    imageSrc: "/images/project-vinyl-midtown-condo.png",
    relatedService: "/condo-flooring",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "vinyl-leslieville-rental",
    title: "LVP Rental Property — Leslieville",
    area: "Leslieville",
    locationSlug: "leslieville",
    type: "Luxury Vinyl",
    product: "Commercial-grade LVP, 20mil, grey tone",
    scope: "Two-unit property, 1,400 sq ft",
    challenge:
      "A Leslieville landlord was tired of replacing cheap laminate between tenants every couple of years. They wanted one tough, neutral floor across both units that could survive turnovers and be repaired plank-by-plank if a tenant damaged a spot.",
    solution:
      "We installed a grey 20mil commercial-grade LVP in both units, chosen specifically because individual planks can be swapped out without redoing the whole floor. For a rental, repairability matters as much as durability — you fix the one damaged board, not the room.",
    process: [
      "Recommended commercial LVP for repairability between tenants.",
      "Prepped both units' subfloors.",
      "Installed 20mil LVP in a neutral grey across both.",
      "Left attic stock of planks for future spot repairs.",
    ],
    results:
      "The landlord now has a floor built for the rental cycle — neutral enough for any tenant, tough enough to last, and repairable one plank at a time. The leftover stock means a damaged board is a ten-minute fix, not a re-floor.",
    imageSrc: "/images/project-vinyl-leslieville-rental.jpeg",
    relatedService: "/vinyl",
    relatedLocation: "/locations/leslieville",
  },
  {
    slug: "vinyl-annex-heritage",
    title: "LVP Heritage Home — The Annex",
    area: "The Annex",
    locationSlug: "the-annex",
    type: "Luxury Vinyl",
    product: "Wide-plank LVP, classic oak look, matte",
    scope: "Kitchen and mudroom, 380 sq ft",
    challenge:
      "An Annex heritage home needed a hard-wearing floor in the kitchen and mudroom that could handle wet boots and a dog, but the owners didn't want a modern-looking plank to clash with the home's period character.",
    solution:
      "We chose a wide-plank, matte, classic-oak LVP whose subtle grain reads convincingly like aged wood next to the home's original floors. A matte, low-gloss LVP with a restrained grain is the only kind that doesn't shout 'vinyl' beside heritage hardwood.",
    process: [
      "Selected a matte, period-appropriate oak look to suit the house.",
      "Levelled the old, slightly sloped kitchen subfloor.",
      "Installed wide-plank LVP in the kitchen and mudroom.",
      "Transitioned cleanly to the original hardwood at the doorways.",
    ],
    results:
      "The new floor takes wet boots and dog traffic without complaint, yet sits comfortably beside the home's original wood instead of fighting it. Guests assume it's just another wood floor.",
    imageSrc: "/images/project-vinyl-annex-heritage.jpg",
    relatedService: "/vinyl",
    relatedLocation: "/locations/the-annex",
  },
  {
    slug: "vinyl-riverdale-semi",
    title: "LVP Main Floor — Riverdale",
    area: "Riverdale",
    locationSlug: "riverdale",
    type: "Luxury Vinyl",
    product: "12mil LVP, herringbone-look plank",
    scope: "Main floor, 600 sq ft",
    challenge:
      "A Riverdale semi owner wanted the look of a herringbone floor but at a realistic budget and with the practicality of vinyl for a household with young kids. True wood herringbone was well out of range.",
    solution:
      "We installed a 12mil herringbone-look LVP, which gives the pattern's visual interest with the waterproof, kid-proof performance of vinyl. Herringbone-look LVP needs as careful a layout as real herringbone — the pattern punishes a lazy starting line.",
    process: [
      "Centred the herringbone pattern on the room.",
      "Levelled the old semi's wavy subfloor.",
      "Installed the 12mil herringbone-look LVP off a snapped centreline.",
      "Cut clean borders against the walls.",
    ],
    results:
      "The main floor got the upscale herringbone look the owners wanted at a fraction of real-wood cost, and it survives juice spills and toy cars without a thought. The centred layout keeps the pattern looking intentional.",
    imageSrc: "/images/project-vinyl-riverdale-semi.jpg",
    relatedService: "/vinyl",
    relatedLocation: "/locations/riverdale",
  },
  {
    slug: "vinyl-beaches-cottage",
    title: "Waterproof LVP — The Beaches Cottage",
    area: "The Beaches",
    locationSlug: "the-beaches",
    type: "Luxury Vinyl",
    product: "Waterproof LVP throughout, sandy oak tone",
    scope: "Cottage, 900 sq ft",
    challenge:
      "A small Beaches cottage near the lake had chronic humidity that had warped its previous laminate. The owners wanted one easygoing, sandy-toned floor throughout that wouldn't react to the damp lake air or the occasional sandy foot from the boardwalk.",
    solution:
      "We ran a fully waterproof, sandy-oak LVP through the whole cottage, immune to the humidity that destroyed the laminate. Near the lake, anything with a wood or paper core is living on borrowed time — waterproof vinyl is the only floor that ignores the damp.",
    process: [
      "Diagnosed the humidity that warped the old laminate.",
      "Levelled the cottage's uneven original subfloor.",
      "Installed waterproof LVP throughout in a sandy oak tone.",
      "Left proper expansion gaps for the humid conditions.",
    ],
    results:
      "The new floor has ignored a full humid summer that would have buckled the old laminate. The sandy tone suits the cottage's lakeside feel, and tracked-in sand sweeps up without scratching the wear layer.",
    imageSrc: "/images/project-vinyl-beaches-cottage.jpg",
    relatedService: "/vinyl",
    relatedLocation: "/locations/the-beaches",
  },
  {
    slug: "laminate-north-york-basement",
    title: "Laminate Basement Rec Room — North York",
    area: "North York",
    locationSlug: "north-york",
    type: "Laminate",
    product: "12mm AC4, light oak, attached underpad",
    scope: "Basement rec room, 800 sq ft",
    challenge:
      "A North York family wanted a warm, wood-look floor for a basement rec room on a tight budget, but the slab was cold and a bit uneven. Laminate over a cold slab can feel hollow and hard underfoot if you skimp on the underlay.",
    solution:
      "We used a 12mm AC4 laminate with an attached underpad and added a foam underlay over the levelled slab for warmth and a solid feel. The attached pad plus a separate underlay is what makes basement laminate feel like a floor and not a drum.",
    process: [
      "Levelled the uneven slab.",
      "Laid a foam underlay for warmth over the cold concrete.",
      "Installed 12mm AC4 laminate with its attached pad.",
      "Left perimeter expansion gaps under the baseboard.",
    ],
    results:
      "The rec room feels warm and solid underfoot rather than cold and hollow, which is the usual basement-laminate complaint. The 12mm thickness and AC4 rating take the kids' play without showing it, all within the budget.",
    imageSrc: "/images/project-laminate-north-york-basement.jpeg",
    relatedService: "/laminate",
    relatedLocation: "/locations/north-york",
  },
  {
    slug: "laminate-etobicoke-bedroom",
    title: "Laminate Bedroom Suite — Etobicoke",
    area: "Etobicoke",
    locationSlug: "etobicoke",
    type: "Laminate",
    product: "14mm premium laminate, warm walnut",
    scope: "Primary suite, 380 sq ft",
    challenge:
      "An Etobicoke couple replacing old bedroom carpet wanted the quiet and solid feel of a premium floor without the cost of engineered walnut. Standard laminate felt and sounded cheap to them when they walked the showroom samples.",
    solution:
      "We stepped them up to a 14mm premium laminate in a warm walnut, whose extra core thickness gives it a quiet, substantial feel underfoot. The jump from 12mm to 14mm is the difference between laminate that clicks and laminate that thuds reassuringly.",
    process: [
      "Walked them across 12mm and 14mm samples to feel the difference.",
      "Removed the old carpet and levelled the subfloor.",
      "Installed a quality acoustic underlay.",
      "Laid the 14mm walnut laminate with tight joints.",
    ],
    results:
      "The bedroom got the warm, quiet, solid floor they wanted at well under the cost of real walnut. The 14mm core means it doesn't have the hollow click that put them off laminate in the first place.",
    imageSrc: "/images/project-laminate-etobicoke-bedroom.png",
    relatedService: "/laminate",
    relatedLocation: "/locations/etobicoke",
  },
  {
    slug: "laminate-scarborough-rental",
    title: "Laminate Rental Suite — Scarborough",
    area: "Scarborough",
    locationSlug: "scarborough",
    type: "Laminate",
    product: "12mm AC4, grey tone, 3 units",
    scope: "Three units, 1,650 sq ft",
    challenge:
      "A Scarborough investor needed durable, neutral flooring across three rental units, installed quickly and priced to keep the project viable. The units were occupied on a staggered schedule, so all three couldn't be done at once.",
    solution:
      "We installed a grey 12mm AC4 laminate in all three units, scheduling around each tenant's move-out so we did them one at a time. AC4 is the right durability tier for rentals — tough enough to survive tenants, cheap enough to replace eventually without pain.",
    process: [
      "Quoted all three units with consistent product and pricing.",
      "Scheduled each unit around its tenant turnover.",
      "Prepped and levelled each subfloor.",
      "Installed 12mm AC4 grey laminate in each suite.",
    ],
    results:
      "All three units got a clean, neutral, hard-wearing floor that shows well to prospective tenants and survives the ones who move in. Doing them one at a time kept the building earning while the work rolled through.",
    imageSrc: "/images/project-laminate-scarborough-rental.png",
    relatedService: "/laminate",
    relatedLocation: "/locations/scarborough",
  },
  {
    slug: "laminate-york-family-room",
    title: "Laminate Family Room — York",
    area: "York",
    locationSlug: "york",
    type: "Laminate",
    product: "12mm AC4, hand-scraped oak look",
    scope: "Family room, 340 sq ft",
    challenge:
      "A York family wanted character in a family room that took a beating from kids, a dog, and a wood stove that dropped the occasional ember spark. A smooth, glossy floor would show every scratch and scuff in that environment.",
    solution:
      "We installed a 12mm AC4 hand-scraped oak-look laminate, whose textured, rustic surface hides scratches and the realities of family life. A hand-scraped texture is the smartest choice for a busy room — the floor is designed to look lived-in, so daily wear just blends in.",
    process: [
      "Recommended a hand-scraped texture to disguise wear.",
      "Confirmed clearances around the wood stove hearth.",
      "Levelled the subfloor and added underlay.",
      "Installed the 12mm hand-scraped laminate with tight seams.",
    ],
    results:
      "The floor looks rustic and warm and, crucially, hides the daily abuse of kids and a dog. Scuffs that would scream on a smooth floor simply disappear into the hand-scraped texture.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/laminate",
    relatedLocation: "/locations/york",
  },
  {
    slug: "laminate-east-york-open-plan",
    title: "Laminate Open Concept — East York",
    area: "East York",
    locationSlug: "east-york",
    type: "Laminate",
    product: "12mm, continuous run, no transitions",
    scope: "Open main floor, 720 sq ft",
    challenge:
      "An East York bungalow opened up to one big main-floor space and the owners wanted the new floor to read as one continuous plane, with no transition strips chopping it up at the old doorway locations.",
    solution:
      "We ran a 12mm laminate as one continuous floor across the whole open plan, using the building's allowable run length so no expansion breaks were needed mid-floor. A truly continuous run on an open floor makes the space feel as big as it actually is.",
    process: [
      "Confirmed the laminate's maximum allowable run length.",
      "Levelled the full open floor to one plane.",
      "Installed continuously with no mid-floor transitions.",
      "Hid expansion gaps under the perimeter baseboards only.",
    ],
    results:
      "The main floor flows as one uninterrupted surface, with no transition strips to break the sightline or collect dirt. The open concept finally feels as open underfoot as it looks.",
    imageSrc: "/images/project-laminate-east-york-open-plan.png",
    relatedService: "/laminate",
    relatedLocation: "/locations/east-york",
  },
  {
    slug: "laminate-high-park-playroom",
    title: "Laminate Playroom & Office — High Park",
    area: "High Park",
    locationSlug: "high-park",
    type: "Laminate",
    product: "12mm AC4, light nordic oak",
    scope: "Playroom and office, 460 sq ft",
    challenge:
      "A High Park family converting two upstairs rooms into a playroom and home office wanted a bright, calm light-oak floor that tied the two rooms together and could take Lego, office chairs, and a rolling desk.",
    solution:
      "We installed a light nordic-oak 12mm AC4 laminate across both rooms, running it through the connecting hall so the spaces feel linked. AC4 handles a rolling office chair far better than people expect — the wear layer is rated for exactly that kind of point traffic.",
    process: [
      "Selected a bright nordic-oak tone for the two rooms.",
      "Levelled both subfloors and the connecting hall.",
      "Installed 12mm AC4 laminate continuously between the rooms.",
      "Added a chair-mat recommendation for the desk area.",
    ],
    results:
      "The two rooms now read as one calm, bright workspace-and-play zone. The light oak keeps both rooms feeling airy, and the AC4 surface has shrugged off the office chair and a daily avalanche of toys.",
    imageSrc: "/images/project-laminate-high-park-playroom.png",
    relatedService: "/laminate",
    relatedLocation: "/locations/high-park",
  },
  {
    slug: "carpet-rosedale-wool",
    title: "Wool Carpet Master Suite — Rosedale",
    area: "Rosedale",
    locationSlug: "rosedale",
    type: "Carpet",
    product: "100% wool loop, soft ivory, premium underpad",
    scope: "Primary suite, 480 sq ft",
    challenge:
      "A Rosedale homeowner wanted the quiet luxury of pure wool in a primary suite, in a soft ivory that's beautiful but shows everything. They were nervous about an off-white carpet in a room they actually live in.",
    solution:
      "We installed a 100% wool loop in soft ivory over a premium underpad, and were straight about its care — wool's natural lanolin resists soiling better than synthetics, but ivory still needs prompt attention to spills. Honest expectations up front beat a disappointed client later.",
    process: [
      "Explained wool's soil resistance and the realities of an ivory carpet.",
      "Measured the suite for a seamless single piece where possible.",
      "Installed a premium high-density underpad.",
      "Power-stretched the wool for a taut, lasting fit.",
    ],
    results:
      "The suite feels genuinely luxurious — soft, quiet, and naturally beautiful. The wool's lanolin has handled day-to-day life better than the owners feared, and the premium pad makes it plush underfoot.",
    imageSrc: "/images/project-carpet-rosedale-wool.jpeg",
    relatedService: "/carpet",
    relatedLocation: "/locations/rosedale",
  },
  {
    slug: "carpet-yorkville-penthouse",
    title: "Plush Carpet Penthouse — Yorkville",
    area: "Yorkville",
    locationSlug: "yorkville",
    type: "Carpet",
    product: "Nylon plush, warm taupe, 4 rooms",
    scope: "Penthouse, four rooms, 1,100 sq ft",
    challenge:
      "A Yorkville penthouse owner wanted a consistent warm-taupe plush across four rooms and connecting halls, with seams that wouldn't show in the strong natural light a top-floor unit gets. Raking light is the enemy of a hidden seam.",
    solution:
      "We selected a warm-taupe nylon plush and planned every seam to run with the light, not across it, so they disappear under the penthouse's big windows. Seam placement under raking light is the whole game in a bright unit — get it wrong and every seam glows.",
    process: [
      "Mapped the natural light to plan seam directions.",
      "Measured all four rooms and halls for minimal seams.",
      "Installed a quality underpad throughout.",
      "Power-stretched and seamed to run with the light.",
    ],
    results:
      "The taupe plush flows through all four rooms with seams you genuinely can't find, even under the penthouse's strong light. The result is the calm, continuous, hotel-quality feel the owner wanted.",
    imageSrc: "/images/project-carpet-yorkville-penthouse.jpeg",
    relatedService: "/carpet",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "carpet-forest-hill-stairs-hall",
    title: "Carpet Stairs & Hallway — Forest Hill",
    area: "Forest Hill",
    locationSlug: "forest-hill",
    type: "Carpet",
    product: "Berber loop, natural, high-traffic install",
    scope: "Stairs and upper hall, 320 sq ft",
    challenge:
      "A Forest Hill family wanted a hard-wearing berber to fully carpet a main staircase and the upper hall, the busiest path in the house. Loop berber on stairs is durable but can snag and run if the nosing isn't tucked perfectly.",
    solution:
      "We fully upholstered the stairs and hall in a natural-toned berber loop, taking particular care on the stair nosings where loops are most vulnerable. On a high-traffic stair, the quality of the nosing tuck decides whether a berber lasts five years or twenty.",
    process: [
      "Chose a tight, durable loop berber for the high-traffic run.",
      "Measured the full stair wrap and the connecting hall.",
      "Installed a firm stair-rated underpad.",
      "Hand-tucked each nosing to protect the loops.",
    ],
    results:
      "The busiest path in the house now has a tough, neutral floor that resists the daily traffic without snagging. The careful nosing work means the loops have stayed intact where cheaper installs fail first.",
    imageSrc: "/images/project-carpet-forest-hill-stairs-hall.jpeg",
    relatedService: "/carpet",
    relatedLocation: "/locations/forest-hill",
  },
  {
    slug: "carpet-beaches-bedroom",
    title: "Soft Nylon Bedroom — The Beaches",
    area: "The Beaches",
    locationSlug: "the-beaches",
    type: "Carpet",
    product: "Quality nylon carpet, light grey, 2 bedrooms",
    scope: "Two bedrooms, 360 sq ft",
    challenge:
      "A Beaches family wanted soft, kid-friendly carpet in two children's bedrooms that could handle juice, markers, and the general chaos of young kids. They'd had a synthetic carpet stain permanently in their last place.",
    solution:
      "We installed a light-grey nylon carpet in both rooms, chosen for its excellent stain resistance that handles exactly the spills kids produce. Quality nylon holds up well to family life, maintaining its appearance through years of heavy use.",
    process: [
      "Recommended quality nylon for its excellent stain resistance.",
      "Measured both bedrooms.",
      "Installed a comfortable mid-density underpad.",
      "Power-stretched for a tight, durable fit.",
    ],
    results:
      "Both bedrooms got a soft, light floor that has already survived the kind of spills that ruined the family's last carpet. The stain resistance is part of the fibre, so it'll keep working for the life of the carpet.",
    imageSrc: "/images/project-carpet-beaches-bedroom.jpeg",
    relatedService: "/carpet",
    relatedLocation: "/locations/the-beaches",
  },
  {
    slug: "carpet-midtown-condo-hall",
    title: "Condo Corridor Carpet — Midtown",
    area: "Midtown Toronto",
    locationSlug: "midtown-toronto",
    type: "Carpet",
    product: "Commercial loop, charcoal, 3 floors",
    scope: "Three corridor floors, 2,100 sq ft",
    challenge:
      "A Midtown condo board needed to recarpet three corridor floors that were looking tired, with minimal disruption to residents and a product that would survive years of constant foot traffic. The corridors also had to stay passable during the work.",
    solution:
      "We installed a charcoal commercial loop rated for heavy traffic, working floor by floor and keeping a walkable path open throughout. Commercial loop in a dark, multi-tone colour is the standard for corridors because it hides traffic lanes and lasts.",
    process: [
      "Specified a heavy-traffic commercial loop for the corridors.",
      "Scheduled the work floor by floor to limit disruption.",
      "Kept a walkable path open for residents during install.",
      "Installed over a contract-grade pad with tight seams.",
    ],
    results:
      "The three corridors look sharp again with a tough charcoal loop that hides the traffic lanes that plagued the old carpet. Doing it floor by floor meant residents always had a way through.",
    imageSrc: "/images/project-carpet-midtown-condo-hall.jpeg",
    relatedService: "/commercial",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "carpet-etobicoke-basement",
    title: "Basement Recreation Room — Etobicoke",
    area: "Etobicoke",
    locationSlug: "etobicoke",
    type: "Carpet",
    product: "Berber loop, oatmeal, moisture barrier",
    scope: "Basement, 700 sq ft",
    challenge:
      "An Etobicoke family wanted cozy carpet in a basement rec room, but basements and carpet are a risky pairing if there's any chance of slab moisture. They'd seen carpet go mouldy in a neighbour's flooded basement.",
    solution:
      "We installed an oatmeal berber loop over a moisture-barrier pad designed for below-grade use, after confirming the slab was dry. A proper moisture-barrier pad is the difference between basement carpet that's cozy and basement carpet that turns into a science experiment.",
    process: [
      "Moisture-tested the slab before recommending carpet.",
      "Installed a below-grade moisture-barrier underpad.",
      "Laid the oatmeal berber loop over the barrier.",
      "Sealed the perimeter and set tack strips clear of the walls.",
    ],
    results:
      "The basement got the warm, cozy rec room the family wanted, with a moisture barrier that protects against the slab dampness that worried them. The oatmeal berber hides traffic and feels soft underfoot.",
    imageSrc: "/images/project-carpet-etobicoke-basement.jpeg",
    relatedService: "/carpet",
    relatedLocation: "/locations/etobicoke",
  },
  {
    slug: "refinishing-forest-hill",
    title: "Pine Floor Restore — Forest Hill",
    area: "Forest Hill",
    locationSlug: "forest-hill",
    type: "Refinishing",
    product: "Original pine, dustless sand, whitewash stain",
    scope: "Second floor, 900 sq ft",
    challenge:
      "A Forest Hill homeowner had wide old-growth pine on the second floor, full of character, nail holes, and a century of patina. They wanted it lightened to a soft whitewash but were terrified a heavy sand would erase the patina that made it special.",
    solution:
      "We did a light dustless sand to clean the surface without flattening the character, then applied a whitewash that brightened the pine while letting its age show. Soft old pine should be sanded with a gentle hand — you're cleaning it, not erasing a hundred years of story.",
    process: [
      "Assessed the pine's thickness and character to plan a light sand.",
      "Dustless sanded just enough to take the old finish.",
      "Applied a whitewash to lighten while preserving patina.",
      "Sealed with a matte waterborne poly.",
    ],
    results:
      "The pine brightened beautifully without losing the nail holes, knots, and patina that give it soul. The whitewash modernised the rooms while keeping the floor unmistakably old, which is exactly the balance they wanted.",
    imageSrc: "/images/project-refinishing-forest-hill.jpeg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/forest-hill",
  },
  {
    slug: "refinishing-rosedale",
    title: "Dark Stain Transformation — Rosedale",
    area: "Rosedale",
    locationSlug: "rosedale",
    type: "Refinishing",
    product: "Red oak, Ebony stain, satin poly",
    scope: "Main floor, 1,100 sq ft",
    challenge:
      "A Rosedale homeowner wanted to take their orange-toned red oak to a dramatic near-black Ebony. Very dark stains are merciless — they show every sanding scratch, swirl, and dust speck that a mid-tone would hide.",
    solution:
      "We sanded to a fine grit and water-popped the grain for even uptake, because Ebony on red oak punishes any shortcut in the prep. Going this dark, the floor is only as good as the sanding underneath — there's nowhere for a flaw to hide.",
    process: [
      "Sanded progressively to a fine grit to remove all swirl.",
      "Water-popped the grain for even, deep Ebony uptake.",
      "Applied Ebony in controlled passes.",
      "Sealed with satin poly to avoid a mirror-like glare.",
    ],
    results:
      "The floor transformed from dated orange oak to a rich, even near-black with no visible scratches or swirl. The satin finish keeps the dark floor from becoming a glare-and-dust magnet, which is the usual trap with ebony.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/rosedale",
  },
  {
    slug: "refinishing-yorkville-condo",
    title: "Condo Hardwood Refresh — Yorkville",
    area: "Yorkville",
    locationSlug: "yorkville",
    type: "Refinishing",
    product: "Engineered oak, screen and recoat, matte finish",
    scope: "Condo, 800 sq ft",
    challenge:
      "A Yorkville condo owner had engineered oak that looked dull and scuffed but was structurally fine. Another company had quoted a full replacement; the owner suspected that was overkill but didn't know the alternative.",
    solution:
      "We screened and recoated the existing finish rather than sanding or replacing, since the wear layer was untouched and only the topcoat was tired. On engineered wood with a thin veneer, a screen-and-recoat is almost always smarter than aggressive sanding — and far cheaper than replacement.",
    process: [
      "Confirmed the finish was worn but the veneer was intact.",
      "Lightly abraded (screened) the existing topcoat.",
      "Applied a fresh matte waterborne topcoat.",
      "Completed in a single day with low odour.",
    ],
    results:
      "The floor looks new again for a small fraction of the replacement quote the owner had been given. The screen-and-recoat protected the thin veneer and was done in a day, with the owner back to normal that evening.",
    imageSrc: "/images/project-refinishing-yorkville-condo.jpeg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "refinishing-high-park",
    title: "Natural Finish Restore — High Park",
    area: "High Park",
    locationSlug: "high-park",
    type: "Refinishing",
    product: "Maple floors, natural unstained, waterborne poly",
    scope: "Main floor, 850 sq ft",
    challenge:
      "A High Park homeowner had honey-coloured maple that an earlier owner had coated in an amber oil poly, deepening it to an orange they disliked. They wanted it back to its natural, pale, unstained look.",
    solution:
      "We sanded off the amber finish and sealed the raw maple with a non-yellowing waterborne poly, which keeps the wood as pale as the day it was milled. On maple, an oil poly is what turned it orange in the first place — waterborne is the only way to keep it true.",
    process: [
      "Sanded off the amber oil finish to bare maple.",
      "Confirmed the natural colour on a test patch.",
      "Sealed with non-yellowing waterborne poly.",
      "Applied multiple thin coats for durability.",
    ],
    results:
      "The maple returned to its bright, natural tone, free of the orange cast the old oil finish gave it. The waterborne topcoat will keep it pale for years instead of slowly ambering again.",
    imageSrc: "/images/project-refinishing-high-park.jpeg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/high-park",
  },
  {
    slug: "refinishing-leaside",
    title: "Red Oak Colour Change — Leaside",
    area: "Leaside",
    locationSlug: "leaside",
    type: "Refinishing",
    product: "Red oak, Early American to Special Walnut restain",
    scope: "Main floor, 950 sq ft",
    challenge:
      "A Leaside family had inherited an Early American stain from the previous owners and wanted to deepen it to a richer Special Walnut without replacing perfectly good red oak. The worry was getting even colour over a floor that already had a stain in it.",
    solution:
      "We sanded fully back to raw wood — you can't reliably go darker over an existing stain — then conditioned and applied Special Walnut for an even, richer tone. A colour change has to start from bare wood, or the old stain ghosts through the new one.",
    process: [
      "Sanded completely back to raw oak to remove the old stain.",
      "Conditioned the red oak to even out its undertone.",
      "Applied Special Walnut in controlled passes.",
      "Sealed with satin poly.",
    ],
    results:
      "The floor deepened to a warm, even Special Walnut with no ghosting from the old colour underneath. The family got a noticeably richer floor out of the oak they already had, for far less than replacement.",
    imageSrc: "/images/project-refinishing-leaside.jpeg",
    relatedService: "/refinishing",
    relatedLocation: "/locations/leaside",
  },
  {
    slug: "commercial-medical-clinic",
    title: "Medical Clinic Flooring — Midtown Toronto",
    area: "Midtown Toronto",
    locationSlug: "midtown-toronto",
    type: "Commercial",
    product: "Commercial LVT, stone look, 3,200 sq ft",
    scope: "Medical clinic, 3,200 sq ft",
    challenge:
      "A Midtown medical clinic needed new flooring that met infection-control expectations — easy to disinfect, minimal seams, no grout to harbour bacteria — and had to be installed without shutting the practice for more than a weekend.",
    solution:
      "We installed a stone-look commercial LVT with tight, sealed seams across the clinic, working over a weekend so the practice opened Monday as normal. For a clinic, the priority is a cleanable, low-seam surface — LVT gives the look of stone without grout lines to scrub.",
    process: [
      "Specified a low-seam commercial LVT suited to infection control.",
      "Planned a weekend install around the clinic's hours.",
      "Prepped and levelled the 3,200 sq ft slab.",
      "Installed LVT with tight, sealed seams throughout.",
    ],
    results:
      "The clinic reopened Monday on a clean, professional, easy-to-disinfect floor with no grout lines to worry about. The weekend schedule meant zero lost appointment days.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/commercial",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "commercial-retail-yorkville",
    title: "Retail Boutique — Yorkville",
    area: "Yorkville",
    locationSlug: "yorkville",
    type: "Commercial",
    product: "Hardwood, engineered white oak, 1,800 sq ft",
    scope: "Retail boutique, 1,800 sq ft",
    challenge:
      "A Yorkville boutique wanted real white oak to signal quality to high-end shoppers, but the floor had to survive constant foot traffic, stiletto heels, and rolling stock carts — and be installed fast to minimise closed days on a premium retail strip.",
    solution:
      "We installed engineered white oak with a tough commercial-grade finish, completed on an accelerated schedule to keep the store dark for as few days as possible. Real oak in retail works when you pair it with a hardened commercial topcoat that takes heels and carts.",
    process: [
      "Selected engineered white oak with a commercial wear finish.",
      "Compressed the schedule to minimise closed retail days.",
      "Prepped the slab and installed glue-down for stability.",
      "Protected the finished floor through fixture installation.",
    ],
    results:
      "The boutique got the high-end look real oak conveys, on a floor that's holding up to heels, carts, and heavy traffic two years on. The fast install kept the store's closure to a few days.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/commercial",
    relatedLocation: "/locations/midtown-toronto",
  },
  {
    slug: "commercial-property-management",
    title: "Multi-Unit Property — North York",
    area: "North York",
    locationSlug: "north-york",
    type: "Commercial",
    product: "LVP throughout 12 suites, commercial grade",
    scope: "12 suites, 8,400 sq ft",
    challenge:
      "A North York property manager needed all 12 suites in a building re-floored on a rolling schedule as units turned over, with one consistent product so the building looked uniform and stock could be reordered for years.",
    solution:
      "We standardised on a single commercial-grade LVP and worked suite by suite as they vacated, keeping the same product through the whole rollout. For a portfolio, product consistency is everything — one floor across all suites means simple reorders and a uniform look.",
    process: [
      "Standardised on one commercial LVP for the whole building.",
      "Scheduled installs suite by suite around tenant turnovers.",
      "Prepped each suite's subfloor as it came available.",
      "Kept reserve stock for ongoing turns and repairs.",
    ],
    results:
      "All 12 suites now share one durable, uniform floor, which makes the building show better and reorders trivial. Working around turnovers meant the manager never had to hold a unit empty just for flooring.",
    imageSrc: "/images/placeholder.jpg",
    relatedService: "/commercial",
    relatedLocation: "/locations/north-york",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectTypes: string[] = Array.from(
  new Set(projects.map((p) => p.type))
);
