"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({ name: "", email: "", idea: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/report", {
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
          <div className="text-7xl mb-6">🟠</div>
          <h1 className="text-4xl font-black mb-4">Report incoming!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Your full HN analysis is being generated. Check your inbox in ~5 minutes.
          </p>
          <div className="bg-[#111114] border border-[#1e1e24] rounded-xl p-6 text-left text-sm text-gray-400 space-y-2">
            <p>📧 Report will be sent to: <strong className="text-white">{form.email}</strong></p>
            <p>⏱️ Expected delivery: ~5 minutes</p>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Check your spam if it doesn&apos;t arrive.{" "}
            <a href="mailto:hello@dailyventures.xyz" className="text-[#ff6600] hover:underline">
              Contact us
            </a>{" "}
            if still nothing after 15 min.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <nav className="border-b border-[#1e1e24] px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <span className="font-bold text-lg tracking-tight">
            🟠{" "}
            <span className="bg-gradient-to-r from-[#ff6600] to-[#ff9900] bg-clip-text text-transparent">
              Will It HN?
            </span>
          </span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-[#ff6600] border border-[#ff6600]/30 px-3 py-1 rounded-full bg-[#ff6600]/10">
            ✅ Payment confirmed
          </div>
          <h1 className="text-4xl font-black mb-3">Now let&apos;s analyze your idea 🟠</h1>
          <p className="text-gray-400 text-lg">
            Submit your startup idea and we&apos;ll send a full HN analysis to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111114] border border-[#1e1e24] rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Your name *</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full bg-[#0a0a0b] border border-[#1e1e24] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email address *</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@startup.com"
              className="w-full bg-[#0a0a0b] border border-[#1e1e24] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600] transition-colors"
            />
            <p className="mt-1 text-xs text-gray-500">Full report will be delivered here.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Your startup idea *</label>
            <textarea
              name="idea"
              required
              value={form.idea}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your startup idea in detail. What does it do? Who is it for? What's the unique insight or technology? What stage are you at?"
              className="w-full bg-[#0a0a0b] border border-[#1e1e24] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6600] transition-colors resize-none"
            />
            <p className="mt-1 text-xs text-gray-500">More detail = better analysis. 3-5 sentences is ideal.</p>
          </div>

          {status === "error" && (
            <div className="bg-[#ff6600]/10 border border-[#ff6600]/30 rounded-lg px-4 py-3 text-[#ff6600] text-sm">
              ⚠️ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-[#ff6600] to-[#ff9900] text-white font-black text-lg py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] duration-200"
          >
            {status === "loading" ? "🟠 Generating report..." : "🟠 Send My Full Report"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Full analysis delivered to your inbox in ~5 minutes
          </p>
        </form>
      </div>
    </main>
  );
}
