"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    url: "",
    goal: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="text-7xl mb-6">🔥</div>
          <h1 className="text-4xl font-black mb-4">Roast queued!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Check your email in ~15 minutes. We&apos;re crawling your page and cooking
            up something brutal.
          </p>
          <div className="bg-[#111114] border border-[#1e1e24] rounded-xl p-6 text-left text-sm text-gray-400 space-y-2">
            <p>
              📧 Roast will be sent to: <strong className="text-white">{form.email}</strong>
            </p>
            <p>
              🌐 Page being roasted:{" "}
              <strong className="text-[#f4a261]">{form.url}</strong>
            </p>
            <p>⏱️ Expected delivery: ~15 minutes</p>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Check your spam folder if it doesn&apos;t arrive. Still nothing after 30
            min?{" "}
            <a
              href="mailto:hello@dailyventures.xyz"
              className="text-[#f4a261] hover:underline"
            >
              Contact us
            </a>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Nav */}
      <nav className="border-b border-[#1e1e24] px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <span className="font-bold text-lg tracking-tight">
            🔥{" "}
            <span className="bg-gradient-to-r from-[#e63946] to-[#f4a261] bg-clip-text text-transparent">
              Roast My Landing Page
            </span>
          </span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-[#f4a261] border border-[#f4a261]/30 px-3 py-1 rounded-full bg-[#f4a261]/10">
            ✅ Payment confirmed
          </div>
          <h1 className="text-4xl font-black mb-3">
            Now let&apos;s roast your page 🔥
          </h1>
          <p className="text-gray-400 text-lg">
            Submit your landing page URL and we&apos;ll send you a brutal AI audit
            within 15 minutes.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111114] border border-[#1e1e24] rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Your name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full bg-[#0a0a0b] border border-[#1e1e24] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#e63946] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@startup.com"
              className="w-full bg-[#0a0a0b] border border-[#1e1e24] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#e63946] transition-colors"
            />
            <p className="mt-1 text-xs text-gray-500">
              This is where your roast will be delivered.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Landing page URL *
            </label>
            <input
              type="url"
              name="url"
              required
              value={form.url}
              onChange={handleChange}
              placeholder="https://mystartup.com"
              className="w-full bg-[#0a0a0b] border border-[#1e1e24] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#e63946] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              What&apos;s your main goal for this page?{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea
              name="goal"
              value={form.goal}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Get signups, book demos, sell a product..."
              className="w-full bg-[#0a0a0b] border border-[#1e1e24] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#e63946] transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <div className="bg-[#e63946]/10 border border-[#e63946]/30 rounded-lg px-4 py-3 text-[#e63946] text-sm">
              ⚠️ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-[#e63946] to-[#f4a261] text-white font-black text-lg py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] duration-200"
          >
            {status === "loading" ? "🔥 Roasting..." : "🔥 Submit My Page for Roasting"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Results delivered to your inbox in ~15 minutes
          </p>
        </form>
      </div>
    </main>
  );
}
