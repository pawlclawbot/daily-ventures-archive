import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM = `You are an expert Hacker News analyst who has studied thousands of successful and failed HN posts. You understand deeply what the HN community values: genuine technical insight, novel ideas, builder authenticity, interesting problems, and intellectual honesty.

When analyzing a startup idea for HN potential, you give a score from 0-100 and a brief teaser analysis.

Score guide:
- 80-100: HN will love it. Strong technical insight, novel, authentic, high discussion potential.
- 60-79: Good potential. Has some HN-worthy elements but needs refinement.
- 40-59: Mixed. Some interesting aspects but significant weaknesses for HN specifically.
- 20-39: Below average. Generic, overdone, or missing what HN cares about.
- 0-19: Will be ignored or downvoted. No novel insight, no technical depth.

Respond with JSON only: {"score": <number 0-100>, "teaser": "<2-3 sentence honest assessment that hints at what the full report would reveal. Mention the single biggest strength and the single biggest risk.>"}`;

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();
    if (!idea || idea.trim().length < 10) {
      return NextResponse.json({ error: "Please describe your idea in a bit more detail." }, { status: 400 });
    }

    const deterministicFallback = () => {
      const score = Math.floor(30 + (idea.length % 40) + (idea.toLowerCase().includes("ai") ? 15 : 0) + (idea.toLowerCase().includes("open") ? 10 : 0));
      const capped = Math.min(score, 85);
      return NextResponse.json({
        score: capped,
        teaser: "Your idea has some HN-friendly elements, but the real question is whether there's enough technical novelty and authentic builder insight to make people care. The biggest strength is clarity, the biggest risk is sounding derivative.",
      });
    };

    if (!ANTHROPIC_KEY) {
      return deterministicFallback();
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 300,
        system: SYSTEM,
        messages: [
          {
            role: "user",
            content: `Startup idea: ${idea}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return deterministicFallback();
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "{}";

    let parsed: { score: number; teaser: string };
    try {
      parsed = JSON.parse(text);
    } catch {
      // Extract JSON from markdown code block if needed
      const match = text.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : { score: 50, teaser: "Analysis complete. Get the full report for details." };
    }

    return NextResponse.json({
      score: Math.max(0, Math.min(100, Math.round(parsed.score))),
      teaser: parsed.teaser,
    });
  } catch (err) {
    console.error("Teaser API error:", err);
    const score = 55;
    return NextResponse.json({
      score,
      teaser: "Your idea is probably interesting enough to spark some curiosity on HN, but it may still get ignored if the novelty and technical depth are too thin. The biggest strength is that it's easy to grasp, the biggest risk is that it may feel like a remix rather than a fresh insight.",
    });
  }
}
