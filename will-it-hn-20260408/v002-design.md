# Will It HN? — Product Spec & Visual Identity
**Venture 002 · Daily Ventures**
**Venture ID:** b3b5f21f-65d8-4275-976b-1552dda7a5e9
**URL:** will-it-hn.dailyventures.xyz
**Designer:** Caroline, Product Design @ Daily Ventures
**Date:** 2026-04-07

---

## 1. Product Overview

**Tagline:** Will your startup idea survive Hacker News?

A tool for founders, hackers, and indie builders who want a gut-check before posting to HN. You paste your idea, get a score out of 100, and find out whether the HN hive mind will love it, roast it, or quietly bury it.

**Free tier:** 3 validations/day (tracked via localStorage + IP fingerprint)
**Paid tier:** $9/month — unlimited validations, Show HN post draft, 6-criteria breakdown

---

## 2. Page Structure

### 2.1 Hero Section

```
┌─────────────────────────────────────────────┐
│  🟠  Will It HN?                            │
│                                             │
│  Will your startup idea survive             │
│  Hacker News?                               │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  Describe your startup idea...      │    │
│  │  (2–4 sentences is ideal)           │    │
│  │                                     │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [ Get Free Score → ]   3 free uses/day     │
└─────────────────────────────────────────────┘
```

- Full-viewport-height section, vertically centered
- Background: `#0a0a0b` — near black
- Headline: `H1` in white, heavy weight, ~48px desktop / 32px mobile
- Subheadline: gray `#888`, ~20px
- Textarea: monospace font, dark surface `#111`, 1px border `#2a2a2a`, focus border `#ff6600`
- CTA Button: `#ff6600` background, white text, no border radius > 4px, no shadows
- Counter: small gray text below button — "3 free uses/day · No signup required"

### 2.2 Score Display (conditionally rendered after submit)

```
┌─────────────────────────────────────────────┐
│                                             │
│         🟠  74 / 100                        │
│                                             │
│   "Solid technical idea but the landing     │
│    page will need to answer 'why not just   │
│    post directly?' before anyone pays."     │
│                                             │
│   [ Unlock Full Report  $9/mo → ]           │
│                                             │
└─────────────────────────────────────────────┘
```

- Score number: massive type — `~96px`, `#ff6600`, bold, monospace
- "/ 100" in gray `#555`, same line
- Teaser text: italic, white, `~18px`, max-width 600px, centered
- Separator line above UpsellCard: 1px `#1e1e1e`
- Smooth fade-in animation on reveal (no bounce, no confetti — this is HN)

### 2.3 UpsellCard (shown below score)

```
┌─────────────────────────────────────────────┐
│  Unlock the full breakdown                  │
│                                             │
│  ✓  6-criteria score breakdown              │
│  ✓  "Show HN:" post draft                  │
│  ✓  Unlimited validations                  │
│  ✓  What HN will love / roast              │
│                                             │
│  [ Start for $9/month → ]                  │
│                                             │
│  Cancel anytime. No dark patterns.          │
└─────────────────────────────────────────────┘
```

- Background: `#111111`, border `1px solid #1e1e1e`
- Checkmarks: `#ff6600`
- Headline: white, `~22px`, semi-bold
- Bullet text: `#ccc`, `~15px`
- CTA: full-width on mobile, inline on desktop — `#ff6600`, dark text
- Subtext: `#555`, `12px`, centered

### 2.4 FAQ Section

Five questions, rendered as plain `<details>` / `<summary>` accordion — no animations, no icons. HN-style minimal.

**Questions:**
1. How is the score calculated?
2. What are the 6 criteria?
3. Will HN actually vote on my idea?
4. Is this a joke?
5. What does the Show HN draft look like?

**Tone:** Honest, slightly dry, self-aware. Not corporate.

Example answer for Q4:
> "Partially. But a lot of founders post to HN without thinking it through. We made the tool we wished existed."

### 2.5 Footer

```
🟠 Will It HN?  ·  A Daily Ventures experiment
Made with spite and HN karma anxiety.
[daily.ventures]  ·  [Twitter/X]
```

- Single row on desktop, stacked on mobile
- All links: `#555`, hover `#ff6600`
- No cookie banners, no newsletter popups

---

## 3. Color Tokens & Typography

### 3.1 Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0a0a0b` | Page background |
| `--color-surface` | `#111111` | Cards, inputs |
| `--color-surface-alt` | `#161616` | Hover states, alternate rows |
| `--color-border` | `#1e1e1e` | Dividers, input borders |
| `--color-border-focus` | `#ff6600` | Input focus ring |
| `--color-accent` | `#ff6600` | Brand orange, CTAs, score number |
| `--color-accent-hover` | `#e55c00` | Darkened orange on button hover |
| `--color-text-primary` | `#f0f0f0` | Body text, headlines |
| `--color-text-secondary` | `#888888` | Subheadlines, metadata |
| `--color-text-muted` | `#555555` | Footnotes, helper text |
| `--color-text-teaser` | `#cccccc` | Teaser result text |

### 3.2 Typography

**Font stack (system fonts — no Google Fonts imports):**
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
--font-mono: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
```

| Role | Font | Size (desktop) | Size (mobile) | Weight |
|------|------|----------------|---------------|--------|
| H1 Hero | sans | 48px | 32px | 800 |
| H2 Section | sans | 28px | 22px | 700 |
| Score Number | mono | 96px | 72px | 800 |
| Body | sans | 16px | 15px | 400 |
| Teaser Text | sans | 18px | 16px | 400 italic |
| Button | sans | 16px | 15px | 600 |
| Footnote | sans | 12px | 12px | 400 |
| Textarea | mono | 15px | 14px | 400 |
| FAQ summary | sans | 15px | 15px | 600 |

**Line height:** 1.6 for body, 1.1 for headlines and score
**Letter spacing:** `-0.02em` on H1, normal everywhere else

---

## 4. Component Descriptions

### 4.1 `TeaserForm`

**Purpose:** Primary input component — captures the idea and triggers the score API call.

**Props/State:**
- `ideaText: string` — textarea value
- `isLoading: boolean` — disables button, shows spinner (inline, no overlay)
- `usesRemaining: number` — pulled from localStorage; displayed below button
- `onResult(score, teaser)` — callback to parent to render ScoreDisplay

**Behavior:**
- Textarea: min-height 120px, max-height 300px (auto-expands)
- Textarea placeholder: `"e.g. A CLI tool that scores your startup idea against HN's taste. Free tier, $9/month paid."`
- Submit: disabled if `ideaText.trim().length < 20`
- On submit: decrement `usesRemaining` in localStorage, POST to `/api/teaser`
- If `usesRemaining === 0`: button disabled, text changes to "Daily limit reached — unlock unlimited →" (links to Stripe)
- Loading state: button text → `"Scoring…"`, spinner SVG (22px, orange, no external dep)
- Error state: inline error below button in `#ff4444`, small text

**API contract:**
```
POST /api/teaser
Body: { idea: string }
Response: { score: number, teaser: string }
```

### 4.2 `ScoreDisplay`

**Purpose:** Renders the score + teaser result after API response. Animates in.

**Props:**
- `score: number` (0–100)
- `teaser: string`

**Behavior:**
- Fade in over 300ms (CSS `opacity` + `transform: translateY(8px)` → 0)
- Score number counts up from 0 to `score` over 800ms using `requestAnimationFrame`
- Color of score number:
  - 0–39: `#ff4444` (will get roasted)
  - 40–69: `#ff6600` (50/50)
  - 70–100: `#44cc44` (HN-worthy)
- Below teaser: grey divider line, then `UpsellCard`
- "Re-score another idea" link: bottom of section, `#ff6600`, underline

**Score labels (shown under the number):**
| Range | Label |
|-------|-------|
| 0–29 | "💀 They'll be merciless." |
| 30–49 | "🧐 Skeptics will show up." |
| 50–69 | "🤔 Could go either way." |
| 70–84 | "👍 This has potential." |
| 85–100 | "🔥 Post it. Now." |

### 4.3 `UpsellCard`

**Purpose:** Convert free users to $9/month after they see their score.

**Props:**
- `score: number` — used to personalize headline

**Behavior:**
- Headline personalizes based on score: 
  - High score: "Your idea has legs. See exactly why."
  - Mid score: "It's close. Find out what to fix."
  - Low score: "Don't post yet. Here's what to change."
- Feature list (4 items, always shown):
  1. 6-criteria score breakdown (originality, technical depth, market size, monetization, contrarianism, timing)
  2. "Show HN:" post draft — ready to copy-paste
  3. What HN will love about this idea
  4. What HN will roast you for
- CTA button: Stripe Checkout link, `#ff6600`, full text: `"Start for $9/month →"`
- Below button: `"Cancel anytime. No trials, no tricks."` in muted gray

---

## 5. Mobile Responsiveness

**Breakpoints:**
- Mobile: `< 640px`
- Tablet: `640px – 1024px`
- Desktop: `> 1024px`

**Mobile-specific rules:**

| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero layout | Centered, max-width 680px | Full-width, 16px horizontal padding |
| Score number | 96px | 72px |
| H1 | 48px | 32px |
| Textarea | 15px mono | 14px mono (prevent iOS zoom: min 16px) |
| UpsellCard | Max-width 480px, centered | Full-width, stacked |
| FAQ | Max-width 640px | Full-width |
| CTA buttons | Inline, fixed width | Full-width, 48px height min (touch target) |
| Footer | Single row | Stacked, centered |

**iOS-specific:**
- Textarea `font-size` must be `≥ 16px` to prevent auto-zoom on focus
- Use `font-size: max(16px, 14px)` or set explicitly to 16px on mobile
- Avoid `position: fixed` elements that interfere with soft keyboard

**Performance:**
- No external fonts, no heavy animation libraries
- Score count-up is pure `requestAnimationFrame`
- Total JS bundle target: < 40KB gzipped
- No layout shift on score reveal (reserve space or smooth push-down)

---

## 6. Shareable Score Card

**Concept:** After seeing their score, users can share a pre-rendered card to Twitter/X.

### Card Design

```
┌──────────────────────────────────────┐
│  🟠  Will It HN?                     │
│                                      │
│        74 / 100                      │
│     "HN-worthy territory"            │
│                                      │
│  "AI tool that rates your startup    │
│   idea against HN taste."            │
│                                      │
│  will-it-hn.dailyventures.xyz        │
└──────────────────────────────────────┘
```

**Dimensions:** 1200×630px (standard OG/Twitter card)

**Background:** `#0a0a0b` with subtle `#ff6600` noise texture or grain (5% opacity)

**Layout:**
- Top-left: `🟠 Will It HN?` in white, 28px
- Center: Score in `#ff6600`, 128px, monospace, bold
- Below score: label text ("HN-worthy territory") in gray, 24px
- Below label: truncated idea text (max 80 chars + ellipsis), white, 18px italic
- Bottom-right: URL in orange, 16px

**Implementation options:**
1. **Serverless OG image** — `/api/og?score=74&idea=...&label=...` using `@vercel/og` or `satori`
2. **Canvas fallback** — client-side `<canvas>` → `toDataURL()` for download

**Share button text:**
`"My startup idea scored 74/100 on Will It HN? 🟠 Check yours →"`

**Twitter pre-fill URL:**
```
https://twitter.com/intent/tweet?text=My+startup+idea+scored+74%2F100+on+%F0%9F%DF%A0+Will+It+HN%3F+Check+yours+%E2%86%92+will-it-hn.dailyventures.xyz
```

**Share button placement:** Below UpsellCard — secondary action, not competing with Stripe CTA.
Style: ghost button, `border: 1px solid #2a2a2a`, white text, hover border `#ff6600`.

---

## 7. 6-Criteria Breakdown (Paid Tier)

The paid-tier full report evaluates ideas across 6 axes that mirror how HN typically responds:

| # | Criterion | What It Measures |
|---|-----------|-----------------|
| 1 | **Originality** | Is this genuinely new or a rebrand of something that failed? |
| 2 | **Technical Depth** | Does it have real engineering/system challenge, or is it GPT wrappers? |
| 3 | **Market Size** | HN prefers either massive markets or niche-but-interesting ones |
| 4 | **Monetization Clarity** | Is the business model obvious and not "we'll figure it out"? |
| 5 | **Contrarianism** | Does it challenge an existing assumption in an interesting way? |
| 6 | **Timing** | Is this the right moment, or is it ahead/behind the curve? |

Each criterion renders as a `0–100` sub-score with a 1-sentence rationale.
Visual: horizontal bar with `#ff6600` fill on `#1e1e1e` track, score number to the right.

---

## 8. Implementation Notes

**Stack assumption:** Next.js / React (or Astro SSR). Static-first, minimal JS.

**Rate limiting strategy:**
- Free tier: `localStorage` key `wihn_uses_YYYY-MM-DD` (count). Reset at midnight UTC.
- IP-level fallback: server-side rate limit via Redis or Upstash (3 req/IP/day)
- Don't rely solely on localStorage — it's bypassable

**Stripe integration:**
- Single `price_id` for the `$9/month` subscription
- Checkout: hosted Stripe Checkout (no custom UI needed for v1)
- Success URL → `/dashboard` or `/welcome` with session token
- Webhook: `customer.subscription.created` → mark user as paid in DB

**Analytics:**
- Track: `idea_submitted`, `score_revealed`, `upsell_viewed`, `stripe_clicked`, `share_clicked`
- Use Plausible or Fathom (privacy-respecting, fits HN audience)
- Don't use GA — HN crowd will notice and comment

---

## 9. Tone & Copy Guidelines

This product talks to people who read HN daily. They are allergic to:
- Marketing speak ("supercharge your workflow")
- Fake urgency ("Only 3 spots left!")
- Overpromising ("guaranteed to go viral")
- Patronizing tooltips

**Do:**
- Be direct and slightly dry
- Self-aware humor is fine ("powered by AI that reads too much HN")
- Honest about limitations
- Short sentences

**Don't:**
- Exclamation points (max 1 per page, earned)
- Gradient backgrounds
- "💥 Unlock the power of..."
- Anything that sounds like a Product Hunt badge

---

*Spec complete. Ready for dev handoff.*
*Caroline · Product Design · Daily Ventures · 2026-04-07*
