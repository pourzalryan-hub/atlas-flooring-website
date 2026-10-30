# Atlas Rug & Design Centre — working notes for Claude

## Model / mode recommendations (standing request from Ryan)
Whenever a **different Claude model or mode would likely give meaningfully better
results** for the task at hand, proactively say so *before* doing the work — don't
just silently proceed on the current model. Name the mode, why it would help, and
how to switch. Rules of thumb:
- Heavy **visual / creative design** or long-form **creative writing** → consider **Fable** (switch with `/model`).
- Want the **same Opus intelligence but faster output** → **Fast mode** (`/fast`).
- Simple, mechanical, or high-volume work where speed/cost matter → a lighter model (Haiku / Sonnet) may be plenty.
- Hard reasoning, strategy, careful coding → stay on **Opus** (the default here).

Claude cannot change the main-chat model itself — recommend it and let Ryan switch.
For delegated background sub-agents, pick the best-fit model automatically.

## Quick business facts
- Atlas Rug & Design Centre — family-owned Toronto flooring store, est. 1959.
- 978 Bathurst St, Toronto · (416) 533-3366 · atlasrugflooring.com
- Owner: Ryan (pourzalryan@gmail.com)
- Stack: Next.js 14 App Router + TypeScript, Tailwind, deploys from `main` on Vercel.
- Brand colours: gold `#C9A84C`, charcoal `#1C1C1C`, off-white `#FAF8F3`, warm-grey `#6B6B6B`. Fonts: Playfair (headings), Lato (body).
- Strategy focus: lead generation (close rate is already ~92%). Carpet is the primary paid channel; a separate laminate campaign runs at ~$50/day.
