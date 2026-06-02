# Atlas Rug & Design Centre — Homepage Redesign Blueprint

**Brand:** Atlas Rug & Design Centre, Toronto  
**Platform:** Wix Studio  
**Color Palette:** Gold (#C9A84C / #B8962E), Off-White (#FAF8F3), Charcoal (#1C1C1C), Warm Grey (#6B6B6B)  
**Inspiration:** safewayflooring.com (clean sections, strong CTAs, trust-heavy, service-grid layout)

---

## What's Working on Your Current Site (Keep These)
- Gold + white color identity — premium feel, keep it
- The Atlas name/logo placement
- Service categories (hardwood, carpet, vinyl, etc.)
- Toronto/local focus

## What's Not Working (Fix These)
- Hero section lacks punch — no strong headline or CTA above the fold
- Too much text, not enough visual breathing room
- Trust signals buried or missing (reviews, years in business, projects completed)
- No clear conversion path — visitors don't know what to do next
- Mobile layout likely cramped
- No testimonials section
- Footer is thin / underutilized for SEO

---

## Section-by-Section Redesign

---

### SECTION 1 — Sticky Navigation Bar

**Layout:** Full-width sticky header, transparent on hero → solid on scroll  
**Left:** Atlas logo (existing gold logo on white/dark bg)  
**Center:** Nav links — `Home | Products | Services | Gallery | About | Blog`  
**Right:** Phone number (clickable) + `Get a Free Quote` gold button  

**Wix Studio instructions:**
1. Add a Header section → enable "Sticky" in Position settings
2. Set background to transparent, add scroll trigger to switch to `#1C1C1C` with 95% opacity after 80px scroll (use Wix Animations or Velo `window.onScroll`)
3. CTA button: background `#C9A84C`, text white, border-radius 4px, hover darken 10%
4. Mobile: collapse nav to hamburger menu, keep phone + CTA button visible

**Copy:** `(416) XXX-XXXX` | `Get a Free Quote →`

---

### SECTION 2 — Hero (Full-Screen)

**Goal:** Immediately communicate premium flooring + Toronto + action  
**Layout:** Full-viewport height, high-quality background image or video, dark overlay (~40% opacity), centered text

**Headline (H1):**
> Toronto's Trusted Source for Premium Flooring & Area Rugs

**Subheadline:**
> Hardwood, Carpet, Luxury Vinyl, Tile & Custom Rugs — expert installation across the GTA since [year]

**CTAs (two side by side):**
- Primary: `Explore Our Products` (gold button, solid)
- Secondary: `Book a Free Consultation` (outlined white button)

**Trust bar below CTAs (small icons + text, horizontal row):**
- ⭐ 4.9 Google Rating
- 🏆 25+ Years in Business
- 🏠 5,000+ Homes Installed
- 📍 Toronto & GTA

**Image recommendation:**  
Wide-angle shot of a stunning hardwood floor in a bright Toronto home — warm tones, natural light. Use a full-bleed photo. If no professional photo, use Unsplash (search "luxury hardwood floor interior"). Overlay: linear-gradient from `rgba(28,28,28,0.5)` to `rgba(28,28,28,0.2)`.

**Wix Studio instructions:**
1. Add a Strip section → set height to 100vh
2. Background: image with dark overlay (use Color Overlay in Wix background settings, black at 40%)
3. Add text box for H1: font Playfair Display or Cormorant Garamond, 58–68px, white, centered
4. Subheadline: font Lato or Open Sans, 20px, off-white (#E8E4DC), centered
5. Two buttons side by side in a Row element
6. Trust bar: add a Row with 4 columns, each with an icon (from Wix icon library) + text, white, 14px
7. Mobile: Stack H1 to 36px, subheadline 16px, buttons stack vertically, trust bar wraps to 2x2 grid

---

### SECTION 3 — Products/Services Grid

**Headline:** `What We Offer`  
**Subheadline:** `Every floor, every style — we carry and install it all`

**Grid layout:** 3 columns × 2 rows = 6 cards (or 3 columns × 1 row for top 3, then "View All" link)

| Card | Image | Label |
|------|-------|-------|
| 1 | Hardwood floor close-up | Hardwood Flooring |
| 2 | Plush carpet texture | Carpet & Broadloom |
| 3 | Vinyl plank in kitchen | Luxury Vinyl Plank |
| 4 | Large-format tile | Tile & Stone |
| 5 | Woven area rug | Area Rugs |
| 6 | Staircase with runner | Stair Runners |

**Card design:**  
Square image (1:1 ratio) → on hover: gold border appears + label lifts → card links to product category page

**CTA below grid:**  
`Browse Full Product Catalogue →` (text link in gold)

**Wix Studio instructions:**
1. Add a new section with white (`#FAF8F3`) background
2. Use a Grid element (3 columns, 2 rows) or repeater
3. Each cell: image (fill/cover), text overlay at bottom with semi-transparent dark gradient
4. Hover animation: "Scale Up" 1.03× + gold border (use Wix Interactions → Hover state)
5. Mobile: 2-column grid, cards stack

---

### SECTION 4 — Why Choose Atlas (Trust / Value Prop)

**Layout:** Two-column — left is a lifestyle image, right is value prop list  
**Background:** Charcoal (`#1C1C1C`) — makes gold pop

**Headline (white):**
> Why Toronto Homeowners Choose Atlas

**Four bullet points with gold icons:**
- **Expert Consultations** — Our design team helps you find the perfect flooring for your space, lifestyle, and budget
- **Premium Brands** — We carry Shaw, Mohawk, Mirage, Karndean, and other industry-leading brands
- **Professional Installation** — In-house certified installers — no subcontracting, no surprises
- **After-Sale Support** — We stand behind every install with our satisfaction guarantee

**CTA:** `Meet Our Team →` (gold outlined button)

**Image recommendation:**  
A design consultant showing samples to a couple in a showroom — warm, welcoming, professional.

**Wix Studio instructions:**
1. Two-column strip: 50% image / 50% content
2. Background color: `#1C1C1C`
3. Headline: Playfair Display, 40px, white
4. List items: use icon + text rows; icons from Wix icon library in gold (`#C9A84C`)
5. Mobile: image stacks on top of content, both full-width

---

### SECTION 5 — Featured Projects / Gallery Showcase

**Headline:** `Our Work Speaks for Itself`  
**Subheadline:** `Before & after transformations from real Toronto homes`

**Layout:** Masonry or 3-column photo grid with lightbox  
- 6–9 high-quality before/after or completed project photos
- Mix of hardwood, carpet, tile, and rug installs

**Below grid CTA:** `View Full Gallery →` (links to gallery page)

**Wix Studio instructions:**
1. Use Wix Pro Gallery → set layout to "Grid" or "Masonry"
2. Enable lightbox on click
3. Add hover overlay with project name (e.g., "Leaside Home — White Oak Hardwood")
4. Mobile: auto-adjusts to single column in masonry mode

---

### SECTION 6 — Testimonials / Social Proof

**Background:** Off-white (`#FAF8F3`)  
**Headline:** `What Our Customers Are Saying`

**Layout:** 3-card carousel or static 3-column grid

**Sample testimonial cards (replace with real Google reviews):**

> "Atlas completely transformed our home. The hardwood floors are stunning and the team was professional from start to finish. Highly recommend!"
> — **Sarah M., North York**  ⭐⭐⭐⭐⭐

> "We had carpet installed throughout our second floor. The price was fair, the installation was spotless, and they cleaned up everything. Amazing service."
> — **David & Lisa K., Etobicoke**  ⭐⭐⭐⭐⭐

> "Came in looking for an area rug and left with the perfect custom piece. The team really knows their products. We'll be back for the hardwood next year!"
> — **Jennifer R., Midtown Toronto**  ⭐⭐⭐⭐⭐

**Below testimonials:**  
Google logo + "See all X reviews on Google" link (links to your Google Business profile)

**Wix Studio instructions:**
1. Add a Wix Testimonials element or build cards manually with a Repeater
2. Card design: white card, subtle box-shadow, gold stars, name in bold, grey location text
3. Add a Slider/Carousel wrapper for mobile
4. Import real reviews from Google via Wix Reviews app (or paste manually)

---

### SECTION 7 — Brands We Carry

**Headline:** `Trusted Brands, Trusted Results`  
**Layout:** Horizontal logo strip — scrolling marquee or static row of 6–8 logos

**Brands to feature (add your actual suppliers):**
Shaw | Mohawk | Mirage | Karndean | Beaulieu | Armstrong | Preverco | Lauzon

**Wix Studio instructions:**
1. White background section
2. Use a Slideshow or manually place logos in a row (PNG with transparent background)
3. Set logos to grayscale by default → full color on hover (use CSS filter via Wix Custom CSS or Velo)
4. Mobile: logos wrap or scroll horizontally

---

### SECTION 8 — Contact / Free Consultation CTA Banner

**Background:** Full-width gold (`#C9A84C`) — bold, attention-grabbing  
**Layout:** Centered, single column

**Headline (dark charcoal, large):**
> Ready to Transform Your Space?

**Subheadline:**
> Visit our Toronto showroom or book a free in-home consultation — we come to you.

**Two CTAs:**
- `Book a Free Consultation` (dark/charcoal button)
- `Call Us: (416) XXX-XXXX` (outlined dark button)

**Supporting info (small text below buttons):**
📍 [Your Address], Toronto, ON | ⏰ Mon–Sat 9am–6pm | 🚗 Free parking

**Wix Studio instructions:**
1. Full-width strip, background color `#C9A84C`
2. All text in `#1C1C1C` (charcoal)
3. Buttons: charcoal fill with white text / outlined charcoal
4. Mobile: buttons stack vertically, text centers

---

### SECTION 9 — Footer

**Background:** Charcoal (`#1C1C1C`)  
**Layout:** 4 columns

| Column 1 | Column 2 | Column 3 | Column 4 |
|-----------|-----------|-----------|-----------|
| Logo + tagline + social icons | Quick Links | Products | Contact Info |
| "Toronto's Premium Flooring & Rug Destination" | Home, About, Gallery, Blog, Contact, Careers | Hardwood, Carpet, LVP, Tile, Area Rugs, Stair Runners | Address, Phone, Email, Hours |

**Bottom bar:**  
`© 2025 Atlas Rug & Design Centre. All rights reserved. | Privacy Policy | Sitemap`

**Social icons:** Instagram, Facebook, Houzz, Pinterest (all gold on hover)

**Wix Studio instructions:**
1. Add a Footer element (Wix Studio → Pages → Footer)
2. 4-column layout using columns element
3. Logo: white version of your logo (or gold on dark)
4. Links: Warm Grey (`#9A9A9A`) text → white on hover
5. Social icons from Wix icon library

---

## SEO Structure

### On-Page SEO for Homepage

| Element | Recommended Value |
|---------|-------------------|
| **Page Title** | Atlas Rug & Design Centre \| Flooring & Area Rugs Toronto |
| **Meta Description** | Premium hardwood, carpet, luxury vinyl, tile & custom area rugs in Toronto. Expert installation by Atlas Rug & Design Centre. Book a free consultation today. |
| **H1** | Toronto's Trusted Source for Premium Flooring & Area Rugs |
| **H2s** | What We Offer / Why Toronto Homeowners Choose Atlas / Our Work / What Our Customers Say |
| **Alt Text Pattern** | "hardwood floor installation Toronto", "area rug Toronto showroom", etc. |
| **Schema Markup** | LocalBusiness schema with address, phone, hours, rating |
| **URL** | atlasrugflooring.com (keep as-is) |

### Local SEO Tips
- Add your full address to the footer (exact match with Google Business Profile)
- Use "Toronto", "North York", "Etobicoke", "Scarborough", "Mississauga" naturally throughout copy
- Embed a Google Map in the contact section or footer
- Link to your Google Business Profile from the testimonials section

---

## Mobile Layout Summary

| Section | Mobile Treatment |
|---------|-----------------|
| Nav | Hamburger menu, keep phone + CTA button |
| Hero | Font scales to 34px H1, 16px sub, buttons stack |
| Products Grid | 2 columns |
| Why Choose Atlas | Image above content, single column |
| Gallery | Single column masonry |
| Testimonials | Swipeable carousel |
| Brands | Horizontally scrollable |
| CTA Banner | Centered, buttons stack |
| Footer | Single column stack |

---

## Wix Studio Implementation — Step-by-Step

### Phase 1: Setup (Day 1)
1. In Wix Studio, open your site editor
2. Go to **Pages** → duplicate your current homepage as a backup
3. Set up your **Color Palette** in **Design** → **Theme Colors**:
   - Primary: `#C9A84C` (Gold)
   - Secondary: `#1C1C1C` (Charcoal)
   - Background: `#FAF8F3` (Off-White)
   - Accent: `#6B6B6B` (Warm Grey)
4. Set up **Typography** in Theme:
   - Heading font: Playfair Display (or Cormorant Garamond)
   - Body font: Lato (or Open Sans)

### Phase 2: Hero Section (Day 1–2)
1. Delete existing hero content
2. Add a Strip → set to 100vh height
3. Upload hero image, set as background with dark overlay
4. Add H1 text box, subheadline, two buttons, trust bar row

### Phase 3: Products Grid (Day 2)
1. New section below hero
2. Add Wix Repeater → 3 columns, configure card design
3. Upload product category images (use high-quality stock if needed)
4. Link each card to its product page

### Phase 4: Content Sections (Day 3)
1. Build "Why Choose Atlas" two-column section
2. Add Pro Gallery for project showcase
3. Build testimonials with cards or Wix Testimonials widget

### Phase 5: Brands + CTA + Footer (Day 4)
1. Brand logo strip with grayscale logos
2. Gold CTA banner section
3. Rebuild footer with 4-column layout

### Phase 6: SEO + Mobile (Day 5)
1. Set page title and meta description (Page → SEO → Basic SEO)
2. Add alt text to all images
3. Switch to mobile editor → fix any stacking/font issues
4. Test all buttons and links

### Phase 7: Launch
1. Preview on desktop and mobile
2. Share preview link with team/family for feedback
3. Publish when satisfied

---

## Image Recommendations

All images should be **high-resolution (min 2000px wide)** and show **real spaces**, not samples.

| Section | What to Use |
|---------|-------------|
| Hero | Bright hardwood or LVP floor in a modern Toronto home — natural light, wide shot |
| Hardwood card | Close-up of natural oak planks with visible grain |
| Carpet card | Plush neutral carpet in a bedroom setting |
| LVP card | Grey/beige vinyl plank in an open kitchen/living area |
| Tile card | Large-format porcelain tile in a bathroom or kitchen |
| Area Rug card | Patterned rug in a living room with furniture |
| Stair Runner card | Patterned runner on white oak stairs |
| Why Choose Atlas | Design consultant with samples or couple in showroom |
| Gallery | Your own before/after install photos (most impactful) |

**Free image sources if needed:**
- Unsplash.com → search "hardwood floor interior", "luxury carpet bedroom", etc.
- Pexels.com → same searches
- Your own showroom/install photos (strongly preferred for authenticity)

---

## Copy Tone Guide

- **Professional but warm** — not corporate, not casual
- **Toronto-specific** — mention GTA, neighbourhoods when relevant
- **Benefit-first** — lead with what the customer gets, not what you do
- **Action-oriented** — every section ends with a next step

**Phrases to use:**
- "Transform your space"
- "Trusted by Toronto homeowners"
- "Expert installation, guaranteed"
- "From our showroom to your home"
- "The right floor for your life"

**Phrases to avoid:**
- "We are proud to offer..."
- "Our company has been..."
- "Click here"
- Generic filler like "quality products at competitive prices"

---

## Quick Wins You Can Do Today

1. **Update your H1** on the current site to include "Toronto" and your main service
2. **Add a sticky "Get a Free Quote" button** — huge conversion lift
3. **Add your Google review count** and star rating visibly above the fold
4. **Add real install photos** to your gallery (even iPhone photos beat stock)
5. **Make your phone number clickable** (`tel:` link) — critical for mobile visitors
