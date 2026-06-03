"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const cards = [
  {
    id: 1,
    title: "Environment, Social & Governance (ESG) -Baseline Standards - Social Factors",
    description:
      "Track and measure social responsibility metrics including labor practices, community engagement, diversity & inclusion, and employee well-being across the IT industry.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
    badge: "Social",
    badgeColor: "bg-emerald-100 text-emerald-700",
    route: "/social-factors",
  },
  {
    id: 2,
    title: "SLASSCOM - Baseline Matrix",
    description:
      "A comprehensive baseline matrix capturing the current state of the Sri Lanka IT industry's ESG performance, enabling benchmarking and progress tracking toward Green IT goals.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
    badge: "Matrix",
    badgeColor: "bg-blue-100 text-blue-700",
    route: "/baseline-matrix",
  },
  {
    id: 3,
    title: "Environment, Social & Governance (ESG) -Baseline Standards - Governance Factors",
    description:
      "Monitor governance standards including board structure, transparency, ethics, risk management, and compliance frameworks essential for responsible corporate leadership.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    iconBg: "bg-violet-100 text-violet-600",
    badge: "Governance",
    badgeColor: "bg-violet-100 text-violet-700",
    route: "/governance-factors",
  },
];

const ADMIN_PASSWORD = "Admin@123";

function AdminPasswordModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password.trim()) { setError("Password is required."); return; }
    if (password !== ADMIN_PASSWORD) { setError("Incorrect password. Please try again."); return; }
    router.push("/admin-dashboard");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-slate-700 to-slate-900" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-1">Admin Access</h3>
        <p className="text-slate-500 text-sm mb-6">Enter the admin password to access the dashboard.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter password"
              autoFocus
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors ${
                error
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-slate-200 bg-white focus:border-slate-500 focus:bg-slate-50/30"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            Access Dashboard →
          </button>
        </form>
      </div>
    </div>
  );
}

function EmailModal({
  card,
  onClose,
}: {
  card: (typeof cards)[number];
  onClose: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function validate(value: string) {
    if (!value.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email address.";
    return "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate(email);
    if (err) { setError(err); return; }
    router.push(card.route);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* top gradient bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${card.color}`} />

        <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-5`}>
          {card.icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Enter Your Email</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          To update stats for <span className="font-semibold text-slate-700">{card.badge}</span>, please provide your email address.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            onBlur={() => setError(validate(email))}
            placeholder="you@company.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors ${
              error
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-slate-200 bg-white focus:border-blue-500 focus:bg-blue-50/30"
            }`}
          />
              {error && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                  </svg>
                  {error}
                </p>
              )}
              <button
                type="submit"
                className={`mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r ${card.color} text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity`}
              >
                Continue →
              </button>
            </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCard, setActiveCard] = useState<(typeof cards)[number] | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {activeCard && <EmailModal card={activeCard} onClose={() => setActiveCard(null)} />}
      {showAdminModal && <AdminPasswordModal onClose={() => setShowAdminModal(false)} />}
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">
                SLASSCOM
              </p>
              <p className="text-sm font-semibold text-slate-800">
                ESG Baseline Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Tracking
            </span>
            <button
              onClick={() => setShowAdminModal(true)}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        {/* decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/5 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/30">
              ESG Baseline Standards · Sri Lanka IT Industry
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Your Contribution Matters: Update Your ESG Baseline Stats Today
            </h1>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
              As a leading Industry, we are committed to fostering a culture of
              sustainability and responsible business practices. As part of this
              ongoing commitment, we have established an Environmental, Social,
              and Governance (ESG) Baseline Standard Temporary Dashboard, to
              track and report our progress as an industry toward Sri Lanka&apos;s ESG
              goals which is to be positioned as a{" "}
              <span className="text-white font-semibold">
                Green IT destination globally.
              </span>
            </p>
          </div>

          {/* stat pills */}
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { label: "Environmental", icon: "🌿" },
              { label: "Social", icon: "🤝" },
              { label: "Governance", icon: "🛡️" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium"
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-14">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
            ESG Reporting Categories
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Select a category below to view or update your organisation&apos;s ESG
            baseline statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveCard(card)}
              className={`group relative flex flex-col rounded-2xl border ${card.border} ${card.bg} overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              {/* top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} />

              <div className="flex-1 p-7 flex flex-col gap-5">
                {/* icon + badge */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* title */}
                <h3 className="text-slate-800 font-bold text-lg leading-snug">
                  {card.title}
                </h3>

                {/* description */}
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {card.description}
                </p>

                {/* CTA */}
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveCard(card); }}
                  className={`mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r ${card.color} text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity`}
                >
                  Update Stats →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} SLASSCOM ESG Baseline Dashboard. All
            rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">
              Powered by
            </span>
            <Image
              src="/logo-techneura.png"
              alt="Techneura"
              width={90}
              height={26}
              className="object-contain"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
