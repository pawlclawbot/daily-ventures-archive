import Link from "next/link";

const STRIPE_LINK = "https://buy.stripe.com/3cI5kCbFkeaS0Q0dQbaVa00";

const painPoints = [
  {
    icon: "💀",
    title: "Weak headline?",
    desc: "We'll tell you exactly why visitors bounce in 3 seconds.",
  },
  {
    icon: "🎯",
    title: "Bad CTA?",
    desc: "Spotted. We'll show you what's killing your click-throughs.",
  },
  {
    icon: "🔥",
    title: "Confusing copy?",
    desc: "Destroyed. Line by line, no mercy.",
  },
];

const faqs = [
  {
    q: "How does it work?",
    a: "Pay $9, submit your landing page URL, and our AI crawls your page and produces a detailed audit covering headline, value prop, CTAs, trust signals, and copy quality. You get the full roast in your inbox within 15 minutes.",
  },
  {
    q: "What do I actually get?",
    a: "A brutally honest email with: headline analysis, value proposition clarity score, CTA effectiveness, trust signal gaps, copy quality breakdown, 3 specific conversion killers, and an overall letter grade (A–F) with rationale.",
  },
  {
    q: "What if my page is already good?",
    a: "Then we'll tell you that. But most landing pages have at least 3–5 critical issues costing them conversions. $9 to find out is a no-brainer.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1e1e24] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">
            🔥 <span className="text-gradient">Roast My Landing Page</span>
          </span>
          <a
            href={STRIPE_LINK}
            className="text-sm font-semibold bg-gradient-to-r from-[#e63946] to-[#f4a261] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Roasted — $9
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase text-[#f4a261] border border-[#f4a261]/30 px-3 py-1 rounded-full bg-[#f4a261]/10">
          AI-Powered · $9 · 15 Minutes
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          Your Landing Page is{" "}
          <span className="text-gradient">Leaking Money</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get a brutal AI audit of exactly what&apos;s killing your conversions.{" "}
          <span className="text-white font-semibold">$9. 15 minutes.</span> No
          fluff, no feelings — just the truth.
        </p>

        <a
          href={STRIPE_LINK}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e63946] to-[#f4a261] text-white font-black text-xl px-10 py-5 rounded-xl hover:opacity-90 transition-all glow-red hover:scale-105 duration-200"
        >
          Roast My Page →
        </a>

        <p className="mt-4 text-sm text-gray-500">
          💳 Secure payment via Stripe · Results in your inbox in ~15 min
        </p>

        <p className="mt-6 text-xs text-gray-600">
          No signup required · One-time payment · Refund if you&apos;re not satisfied
        </p>
      </section>

      {/* Pain Points */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Here&apos;s what we{" "}
          <span className="text-gradient">roast</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bg-[#111114] border border-[#1e1e24] rounded-xl p-6 hover:border-[#e63946]/40 transition-colors"
            >
              <div className="text-3xl mb-4">{point.icon}</div>
              <h3 className="font-bold text-lg mb-2">{point.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#111114] border border-[#1e1e24] rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What&apos;s in your roast
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "📰 Headline analysis — clarity, hook, specificity",
              "💎 Value proposition — are visitors getting it?",
              "🎯 CTA effectiveness — copy, placement, contrast",
              "🛡️ Trust signals — what&apos;s missing, what&apos;s weak",
              "✍️ Copy quality — tone, urgency, persuasion",
              "💣 3 specific conversion killers with fixes",
              "📊 Overall letter grade (A–F) with rationale",
              "⚡ Delivered to your inbox in ~15 minutes",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-[#f4a261] mt-0.5">✓</span>
                <span
                  className="text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={STRIPE_LINK}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e63946] to-[#f4a261] text-white font-black text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-all glow-red hover:scale-105 duration-200"
            >
              Get My Roast — $9 →
            </a>
            <p className="mt-3 text-xs text-gray-500">One-time · No subscription · Delivered in ~15 min</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently asked
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="bg-[#111114] border border-[#1e1e24] rounded-xl group"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-white hover:text-[#f4a261] transition-colors list-none">
                <span>{faq.q}</span>
                <span className="text-gray-500 group-open:rotate-180 transition-transform text-xl">
                  ↓
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-[#1e1e24] pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-[#e63946]/10 to-[#f4a261]/10 border border-[#e63946]/20 rounded-2xl p-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Stop guessing. Start{" "}
            <span className="text-gradient">converting.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            One $9 audit could be the difference between a page that leaks and
            one that converts. Your call.
          </p>
          <a
            href={STRIPE_LINK}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e63946] to-[#f4a261] text-white font-black text-xl px-10 py-5 rounded-xl hover:opacity-90 transition-all glow-red hover:scale-105 duration-200"
          >
            Roast My Page — $9 →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e24] px-6 py-8 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>
            🔥 <strong className="text-gray-400">roast.dailyventures.xyz</strong>
          </span>
          <span>Built for founders who want truth, not fluff.</span>
          <span>© {new Date().getFullYear()} Daily Ventures</span>
        </div>
      </footer>
    </main>
  );
}
