import Link from "next/link";

const STRIPE_LINK = "https://buy.stripe.com/14AcN424K2sa6ak8vRaVa02";

const criteria = [
  {
    icon: "🎯",
    title: "Novelty score",
    desc: "Is this genuinely new or just another 'Uber for X'? HN punishes clones ruthlessly.",
  },
  {
    icon: "🔧",
    title: "Technical depth",
    desc: "Does it have interesting engineering or a clever insight? HN users are builders.",
  },
  {
    icon: "💡",
    title: "Founder authenticity",
    desc: "Does it feel like something you'd actually build and care about? HN detects BS instantly.",
  },
  {
    icon: "📣",
    title: "Show HN potential",
    desc: "Can you demo it right now? The best Show HNs have something to click on.",
  },
];

const faqs = [
  {
    q: "How does it work?",
    a: "Paste your startup idea, get a free teaser score. Subscribe at $9/month to unlock unlimited full reports: a detailed breakdown of your HN likelihood score, what will make HN upvote you, what will make them ignore you, and a Show HN post draft.",
  },
  {
    q: "What's in the full report?",
    a: "An HN likelihood score (0–100), analysis across 6 criteria HN cares about, specific suggestions to sharpen your angle, a ready-to-post Show HN title and first comment draft, and the top 3 risks that could kill your post.",
  },
  {
    q: "What if my idea is bad?",
    a: "That's the point. $9/month to score unlimited ideas before you spend months building is the best ROI you'll ever get. We'll tell you exactly why it won't land and what would make it better.",
  },
  {
    q: "Why Hacker News specifically?",
    a: "A successful HN launch can mean thousands of users overnight. It's the highest-signal audience for technical founders. And if your idea can't survive HN scrutiny, it probably has real problems.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1e1e24] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">
            🟠 <span className="text-gradient">Will It HN?</span>
          </span>
          <a
            href={STRIPE_LINK}
            className="text-sm font-semibold bg-gradient-to-r from-[#ff6600] to-[#ff9900] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Full Report — $9/mo
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase text-[#ff6600] border border-[#ff6600]/30 px-3 py-1 rounded-full bg-[#ff6600]/10">
          AI-Powered · $9/month · Unlimited Analysis
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          Will Your Startup Idea{" "}
          <span className="bg-gradient-to-r from-[#ff6600] to-[#ff9900] bg-clip-text text-transparent">
            Survive HN?
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Paste your startup idea. Get an HN likelihood score + brutal honest feedback on what Hacker News will love — or destroy.{" "}
          <span className="text-white font-semibold">$9/month. Unlimited.</span>
        </p>

        {/* Free teaser form */}
        <TeaserForm stripeLink={STRIPE_LINK} />

        <p className="mt-4 text-sm text-gray-500">
          Free teaser score · Full report $9/month · Unlimited
        </p>
      </section>

      {/* What we analyze */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-center mb-2">
          What HN actually cares about
        </h2>
        <p className="text-gray-400 text-center mb-12">
          The 4 signals that determine if your post gets 200 upvotes or 2.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {criteria.map((c) => (
            <div
              key={c.title}
              className="bg-[#111114] border border-[#1e1e24] rounded-2xl p-6"
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-[#1a1a1f] to-[#111114] border border-[#ff6600]/20 rounded-3xl p-10">
          <div className="text-5xl mb-4">🟠</div>
          <h2 className="text-3xl font-black mb-4">
            Get your full HN report
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Score (0–100) · 6-criteria breakdown · Show HN post draft · Top 3 risks
          </p>
          <a
            href={STRIPE_LINK}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6600] to-[#ff9900] text-white font-black text-xl px-10 py-5 rounded-xl hover:opacity-90 transition-all hover:scale-105 duration-200"
          >
            Get Full Report — $9/month →
          </a>
          <p className="mt-4 text-sm text-gray-500">$9/month · Unlimited reports · Cancel anytime</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-center mb-10">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="bg-[#111114] border border-[#1e1e24] rounded-xl p-6"
            >
              <h3 className="font-bold mb-2">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e24] px-6 py-8 text-center text-sm text-gray-600">
        <p>
          🟠 Will It HN? · Part of{" "}
          <a href="https://dailyventures.xyz" className="hover:text-gray-400 transition-colors">
            Daily Ventures
          </a>{" "}
          · Built in a day
        </p>
      </footer>
    </main>
  );
}

// Client component for teaser form
import TeaserForm from "./components/TeaserForm";
