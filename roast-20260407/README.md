# Roast My Landing Page — Archived

**Venture Slug:** roast  
**Launched:** April 6, 2026  
**Shut Down:** April 7, 2026  
**URL (live):** https://roast.dailyventures.xyz  
**Status:** Killed — Did not hit Day 1 threshold ($1 / 1 sale)

## What It Was
$9 flat — AI audit of startup landing pages, brutally honest analysis delivered to email in 15 minutes.

## Why It Was Killed
Did not hit the Day 1 revenue threshold of $1 (1 sale) within the required window.

## Stack
- Next.js 15 (App Router)
- Tailwind CSS
- Stripe payment link ($9 flat)
- AgentMail for email delivery (roast@agentmail.to)
- Supabase for venture tracking
- Vercel for hosting
- Anthropic Claude for roast generation

## Post-Mortem Notes
- Landing page was live and functional
- Stripe payment flow set up but no purchases made
- Submit flow was built but Stripe success redirect not wired to /submit page
- Core roast AI (/api/roast) was functional

## Part of Daily Ventures
This venture was built by [Daily Ventures](https://dailyventures.xyz) — a venture studio that ships micro-businesses daily and validates them against progressive revenue thresholds.
