# PAGE: Blog
**URL:** atlasrugflooring.com/blog  
**Page Title:** Flooring Tips & Advice Toronto | Atlas Rug & Design Centre Blog  
**Meta Description:** Expert flooring tips, care guides, trends, and advice from Atlas Rug & Design Centre — Toronto's flooring specialists since 1959.  

---

## STATUS: FUTURE FEATURE — AI AUTO-PUBLISHING

You mentioned wanting AI to write and post blog articles automatically. This is a future phase. The blog page structure is specced below so it can be built now as a placeholder — content automation can be layered on later.

---

## BLOG PAGE LAYOUT

### SECTION 1 — HERO (Compact)

**Layout:** 35vh strip, dark overlay, centered  
**H1:** Flooring Tips, Trends & Advice  
**Subheadline:** Guides and insights from Toronto's flooring experts — helping you make the best decisions for your home.

---

### SECTION 2 — FEATURED POST

**Layout:** Full-width card, large image left (60%) + content right (40%)  
**Tag:** FEATURED (gold badge)  
**Category tag** · Date · 5 min read  
**H2:** [Post title]  
**Excerpt:** 2-sentence preview  
**CTA:** `Read More →`

---

### SECTION 3 — POST GRID

**Layout:** 3-column grid of post cards  
**Card:** Image thumbnail + category tag + title + excerpt (2 lines) + date + "Read More →"  
**Pagination:** Load 9 posts, then "Load More" button

---

### SECTION 4 — CATEGORY FILTER

**Filter tabs:** All · Hardwood · Carpet · Vinyl & Laminate · Stair Runners · Care & Maintenance · Design Tips · Toronto Home Trends

---

## INDIVIDUAL POST TEMPLATE

**URL pattern:** atlasrugflooring.com/blog/[post-slug]  
**Layout:**
- Hero image (full-width, 50vh)
- Category + Date + Est. read time
- H1 (post title)
- Author: "Atlas Rug & Design Centre Team"
- Body content (H2s, body paragraphs, images, lists)
- CTA box mid-article: "Ready to upgrade your floors? [Book a Free Consultation →]"
- Related posts (3 cards at bottom)
- Tags

---

## AI AUTO-PUBLISHING PLAN (Future Phase)

### Recommended Tool Stack
**Option A — Wix + Make.com (No-code, easiest)**
1. Set up Make.com (formerly Integromat) with a scheduled trigger (e.g. every Monday 9am)
2. Trigger sends a prompt to Claude API (claude-sonnet-4-6) to write a blog post
3. Claude returns: title, meta description, H1, body (with H2s), tags, category
4. Make.com pushes the post to Wix CMS via Wix REST API
5. Post status = "Draft" — you review and publish, OR set to auto-publish

**Option B — Wix Velo + Claude API (More control)**
1. Write a Wix Velo backend function that calls the Claude API
2. Schedule it via a Wix cron job (Wix Scheduled Jobs)
3. Post is written and inserted into Wix CMS collection automatically
4. Can be set to auto-publish or draft

### Blog Post Prompt Template (for Claude API)
```
Write a 700-word blog post for Atlas Rug & Design Centre, a Toronto flooring
store at 978 Bathurst St established in 1959. 

Topic: [TOPIC]
Target keyword: [KEYWORD]
Audience: Toronto homeowners planning a flooring renovation
Tone: Professional, warm, knowledgeable — like advice from a trusted expert
Format: H1 title, intro paragraph, 3-4 H2 sections, conclusion with CTA

Include:
- The target keyword naturally in H1, first paragraph, and one H2
- At least one mention of "Toronto" or a Toronto neighbourhood
- A CTA at the end inviting readers to visit the showroom or book a consultation
- Internal link suggestions to relevant product pages

Do NOT include: generic filler phrases, made-up statistics, competitor mentions
```

### Suggested Post Topics (first 12 months)

| Month | Topic | Target Keyword |
|-------|-------|----------------|
| 1 | Hardwood vs. Engineered Hardwood: Which is Right for Your Toronto Home? | hardwood vs engineered Toronto |
| 1 | 5 Signs It's Time to Replace Your Carpet | when to replace carpet Toronto |
| 2 | The Complete Guide to Luxury Vinyl Plank Flooring | luxury vinyl plank guide |
| 2 | How to Choose a Stair Runner: Width, Pattern & Installation | stair runner guide Toronto |
| 3 | Basement Flooring Toronto: Your Best Options for Below Grade | basement flooring Toronto |
| 3 | How to Care for Hardwood Floors: A Seasonal Guide | hardwood floor care Toronto |
| 4 | The Best Flooring for Kitchens (That Isn't Tile) | kitchen flooring Toronto |
| 5 | Flooring Trends in Toronto Homes for 2026 | flooring trends Toronto 2026 |
| 5 | Laminate vs. Luxury Vinyl: Which Should You Choose? | laminate vs luxury vinyl |
| 6 | Pet-Friendly Flooring: The Best Options for Dog & Cat Owners | pet friendly flooring Toronto |
| 6 | How Much Does Hardwood Floor Installation Cost in Toronto? | hardwood floor cost Toronto |

### SEO Value of the Blog
- Each post targets a long-tail keyword that your homepage can't rank for
- Internal linking builds authority for product pages
- "Cost" and "how-to" posts capture high-intent searchers ready to buy
- Toronto-specific content builds local search relevance

---

## ACTION ITEMS TO LAUNCH THE BLOG

**Phase 1 — Build the blog page (now):**
- [ ] Enable Wix Blog app in Wix Studio (Apps → Add Apps → Blog)
- [ ] Set blog URL to /blog
- [ ] Customize post template to match site design (gold accents, Playfair Display headings)
- [ ] Write and publish first 2–3 posts manually to populate the page

**Phase 2 — AI automation (later):**
- [ ] Set up Claude API account (console.anthropic.com)
- [ ] Choose automation tool: Make.com (easiest) or Wix Velo (most control)
- [ ] Build the automation workflow using the prompt template above
- [ ] Test with 2–3 draft posts before enabling auto-publish
- [ ] Set up a review step (email notification when post is drafted) before it goes live
