"use client";

import { useState, useEffect } from "react";

interface TeaserFormProps {
  stripeLink: string;
}

const DAILY_LIMIT = 3;

function getTodayKey() {
  return `wih_uses_${new Date().toISOString().slice(0, 10)}`;
}

function getUsesToday(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(getTodayKey()) || "0", 10);
}

function incrementUses() {
  const key = getTodayKey();
  const current = getUsesToday();
  localStorage.setItem(key, String(current + 1));
  return current + 1;
}

export default function TeaserForm({ stripeLink }: TeaserFormProps) {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<{ score: number; teaser: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usesToday, setUsesToday] = useState(0);

  useEffect(() => {
    setUsesToday(getUsesToday());
  }, []);

  const remaining = Math.max(0, DAILY_LIMIT - usesToday);
  const limitReached = usesToday >= DAILY_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    if (limitReached) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/teaser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      const newCount = incrementUses();
      setUsesToday(newCount);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 70) return "text-green-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const scoreLabel = (score: number) => {
    if (score >= 80) return "🚀 HN will love this";
    if (score >= 60) return "👍 Solid HN potential";
    if (score >= 40) return "🤔 Mixed signals";
    if (score >= 20) return "😬 Needs work";
    return "💀 HN will destroy this";
  };

  if (limitReached && !result) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1a1a1f] border border-[#ff6600]/40 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="font-black text-xl mb-2">Daily limit reached</h3>
          <p className="text-gray-400 mb-6">
            You&apos;ve used your 3 free scores for today. Upgrade to Pro for unlimited.
          </p>
          <a
            href={stripeLink}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6600] to-[#ff9900] text-white font-black text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] duration-200"
          >
            Upgrade to Pro — $9/month →
          </a>
          <p className="mt-3 text-sm text-gray-600">Unlimited scores · Full reports · Cancel anytime</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea in 2-3 sentences. What does it do? Who is it for? What's the insight?"
            rows={4}
            className="w-full bg-[#111114] border border-[#1e1e24] rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600] transition-colors resize-none text-lg"
          />
          {remaining > 0 && remaining < DAILY_LIMIT && (
            <p className="text-sm text-gray-500 text-left">
              {remaining} free score{remaining !== 1 ? "s" : ""} remaining today
            </p>
          )}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm text-left">
              ⚠️ {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !idea.trim()}
            className="w-full bg-gradient-to-r from-[#ff6600] to-[#ff9900] text-white font-black text-xl py-5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] duration-200"
          >
            {loading ? "🟠 Analyzing..." : "🟠 Get Free Score →"}
          </button>
        </form>
      ) : (
        <div className="bg-[#111114] border border-[#1e1e24] rounded-2xl p-8 text-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-xl">Your HN Score</h3>
            <button
              onClick={() => { setResult(null); setIdea(""); }}
              className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
            >
              Try another →
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className={`text-7xl font-black ${scoreColor(result.score)}`}>
              {result.score}
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">out of 100</div>
              <div className="font-semibold text-lg">{scoreLabel(result.score)}</div>
            </div>
          </div>

          <div className="bg-[#0a0a0b] border border-[#1e1e24] rounded-xl p-5 mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">{result.teaser}</p>
          </div>

          <div className="bg-[#ff6600]/10 border border-[#ff6600]/30 rounded-xl p-5">
            <p className="font-semibold mb-3">🔒 Full report unlocks:</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ 6-criteria detailed breakdown</li>
              <li>✓ Specific suggestions to sharpen your angle</li>
              <li>✓ Ready-to-post Show HN title + first comment</li>
              <li>✓ Top 3 risks that could kill your post</li>
            </ul>
            {remaining > 0 ? (
              <p className="mt-4 text-sm text-gray-500">{remaining} free score{remaining !== 1 ? "s" : ""} remaining today</p>
            ) : (
              <p className="mt-4 text-sm text-yellow-500/80">Daily free limit reached — upgrade for unlimited</p>
            )}
            <a
              href={stripeLink}
              className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6600] to-[#ff9900] text-white font-black text-lg py-4 rounded-xl hover:opacity-90 transition-all hover:scale-[1.01] duration-200"
            >
              Unlock Full Report — $9/month →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
