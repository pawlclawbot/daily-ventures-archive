import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const VENTURE_ID = "172c2048-04eb-4d03-85d8-205b98cf4e75";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, url, goal } = body;

    if (!name || !email || !url) {
      return NextResponse.json({ error: "Name, email, and URL are required." }, { status: 400 });
    }

    // Validate URL format
    try { new URL(url); } catch {
      return NextResponse.json({ error: "Please enter a valid URL including https://" }, { status: 400 });
    }

    // Write submission to Supabase agent_logs as a queue entry
    // Format: email|url|name|goal (pipe-delimited)
    const notes = [email, url, name, goal || ""].join("|");

    const res = await fetch(`${SUPABASE_URL}/rest/v1/agent_logs`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        venture_id: VENTURE_ID,
        agent_role: "roast_submission",
        action: "roast_requested",
        outcome: "pending",
        notes,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Supabase write failed:", err);
      return NextResponse.json({ error: "Failed to queue submission. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Roast API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
