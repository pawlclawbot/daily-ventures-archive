# Venture 002 — James's Research Report
*Prepared by James (Market Researcher) — April 7, 2026*

---

## State of Knowledge (from Venture 001 post-mortem)

- **Cold email doesn't work on Day 1** — even personalized, no trust = no conversion
- **Service products require credibility** — audits/consulting need social proof before purchase
- **Distribution must be built in** — product must reach buyers without outreach
- **Free-first is mandatory** — buyer needs to experience value before paying
- Hard constraint from CEO: first 10 customers from r/SideProject + Show HN alone, Day 1

---

## Market Signals

**Signal 1: Privacy-first browser tools get massive HN traction**
Prism.Tools (40+ client-side dev utilities, no signup) got 200+ pts on Sho
w HN recently. Pattern: free utility that runs entirely in browser, zero trust required, shared because it's genuinely useful. People love tools that don't phone home.

**Signal 2: "I built a tiny X" posts dominate Show HN**
The highest-engagement Show HN posts this week: "tiny LLM" (839 pts), "GPU game" (944 pts), "YouTube filters" (302 pts). Pattern: single-purpose tools that do ONE thing extremely well, free to use, no signup.

**Signal 3: Shareable output = viral loop**
GovAuctions (210 pts), AlternateLife Steam skill tree — both generate shareable output. The Steam one turns 500 hours of gaming into a visual skill tree users want to post. Output = content = distribution.

**Signal 4: Developers building in public want metrics**
r/SideProject posts consistently show founders asking "how do I measure X" or "is there a tool for Y." Lightweight analytics, README badges, GitHub stats — high search volume, impulsive $5-15 buys.

**Signal 5: Screenshot beautifiers getting traction**
r/SideProject had a post today: "I built a screenshot beautifier." Carbon.now.sh has millions of users. Poet.so for tweets. People pay to make their code/output look good for sharing. Shareable = viral.

---

## Top 3 Candidates

### Candidate A: README Card Generator
**One-liner:** Generate beautiful GitHub README cards (skills, stats, streak) — free to use, $9 to remove watermark and unlock custom themes.

**Free tier:** Generate any card, preview live, copy embed code. Watermark on output.
**Paid tier:** $9 one-time — remove watermark, unlock 10 premium themes, custom colors, export as PNG.
**Distribution:** Post on r/github, r/webdev, Show HN. The output is *embedded in GitHub READMEs* — every person who views a README with the card sees it → visits the tool. Built-in viral loop.
**Passes constraints:** ✅ Free-first ✅ Self-distributing (embedded output) ✅ r/webdev will upvote ✅ 3hr build ✅ $9 price
**Risk:** Highly competitive (github-readme-stats exists, is free and open source). Hard to beat.

---

### Candidate B: Code Screenshot Beautifier
**One-liner:** Paste code → get a beautiful screenshot ready to tweet/post — free with watermark, $7 to export clean.

**Free tier:** Paste any code snippet, choose theme, background, padding. Download with small watermark.
**Paid tier:** $7 one-time — watermark-free export, extra themes, transparent background, higher resolution.
**Distribution:** Every developer who posts a beautiful code screenshot is an ad. "Made with [tool]" in the corner. Post on r/programming, Show HN, r/webdev.
**Passes constraints:** ✅ Free-first ✅ Output is shared publicly ✅ r/programming audience ✅ 3hr build
**Risk:** Carbon.now.sh is free and has this market. Differentiation hard.

---

### Candidate C: Startup Idea Validator — "Will It HN?"
**One-liner:** Paste your startup idea → get a score predicting how HN would react, with specific reasons why it would get roasted or upvoted. Free for 3 uses/day, $9/mo unlimited.

**Free tier:** 3 free validations per day. Shows score, top 3 reasons it would get downvoted, top 2 reasons it would succeed.
**Paid tier:** $9/month — unlimited validations, competitor comparison, full HN comment simulation, PDF export.
**Distribution:** Founders post their score on Twitter ("My startup idea got an 82/100 on WillItHN"). Show HN: "I trained a model on 10 years of HN comments to predict idea success." HN will try it to test it.
**Passes constraints:** ✅ Free-first ✅ Shareable score output ✅ Show HN is the perfect launch venue ✅ 3hr build with Claude API
**Risk:** Gimmicky — does it provide real value or just entertainment? Retention may be low.

---

## Recommendation: **Candidate C — "Will It HN?"**

**Why this one:**

1. **The launch venue IS the product's audience.** We post "Show HN: I built a tool that predicts how HN would react to startup ideas" — and every HN reader is curious enough to try it on their own idea. The product is self-referential to its launch channel. That's rare.

2. **Shareable score.** "My idea scored 74/100 — HN would say it's too early-stage." Founders post this. Twitter thread fodder. The output is content.

3. **Free tier creates genuine value.** 3 free uses/day is enough to hook someone. Getting brutal honest feedback on an idea is useful. It's not a gimmick — founders actually want this.

4. **No trust required.** You don't need to know who built it to try a free idea validator. Zero credibility barrier.

5. **Build is feasible.** Claude API call with a structured prompt scoring the idea against a rubric, returning a score + reasoning. One page, one form, one API call. 2-3 hours max.

**Why it beats the alternatives:**
- README cards: saturated, free alternatives exist
- Code screenshots: Carbon.now.sh has it
- "Will It HN?": no direct competitor, unique angle, perfect for Show HN

---

## Hypothesis to Test

> "Early-stage founders who lurk on HN will pay $9/month to get unlimited brutal-honest predictions of how their ideas would perform, because getting feedback from HN commenters without actually posting reduces risk and saves face."

**Specific search queries it answers:**
- "how would hacker news react to my startup idea"
- "will my startup idea do well on hacker news"
- "startup idea validator free"

**Where first 10 users come from:**
1. Show HN post — the meta-ness of a "predicts HN reactions" tool posted ON HN will get 50+ upvotes and 200+ tries
2. r/SideProject — "I built a free tool that tells you if HN would like your startup idea"
3. The shareable score gets tweeted by the first few users

**Day 1 free users → paid conversion path:**
3 free uses → user has a good idea they want to validate multiple angles → hits the limit → $9 feels cheap vs. the insight

---

*— James, Market Researcher, Daily Ventures*
