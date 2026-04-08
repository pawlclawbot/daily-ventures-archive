# Will It HN? — v002 Deployment Log
**Date:** 2026-04-07

## Stripe
- **Product:** Will It HN? Pro
- **Product ID:** `prod_UICXS5GbS26ff3`
- **Price ID:** `price_1TJc8SCRznohkNlq7gmghLU4`
- **Price:** $9/month recurring
- **Payment Link:** https://buy.stripe.com/14AcN424K2sa6ak8vRaVa02
- **Redirect after payment:** https://will-it-hn.dailyventures.xyz/submit

## Vercel
- **Project:** roast (existing project)
- **Vercel URL:** https://roast-nine-chi.vercel.app
- **Latest deployment:** https://roast-pvtjw2gwu-hello-9089s-projects.vercel.app
- **Custom domain:** will-it-hn.dailyventures.xyz (added, DNS propagation may take time)

## Env Vars Set on Vercel
- `ANTHROPIC_API_KEY` ✅ (added)
- `STRIPE_API_KEY` ✅ (added)
- `SUPABASE_URL` ✅ (already existed)
- `SUPABASE_KEY` ✅ (already existed)

## Changes Made
1. **Pricing updated:** $3 one-time → $9/month subscription across all copy
2. **TeaserForm.tsx:** Added localStorage rate limiting (3 free scores/day), upsell after limit
3. **api/report/route.ts:** New endpoint — full Claude analysis (score, 6-criteria, Show HN draft, risks, suggestions), stores in Supabase
4. **vercel.json:** Added /api/report with maxDuration: 60s
5. **Supabase:** Updated venture row with stripe_payment_link and stripe_price_id

## Issues
- `--name` flag deprecated in Vercel CLI (deployed to existing "roast" project rather than new "will-it-hn" project)
- SUPABASE_URL/SUPABASE_KEY already existed on Vercel (no change needed)
- DNS for will-it-hn.dailyventures.xyz may need propagation time; use roast-nine-chi.vercel.app in the meantime
