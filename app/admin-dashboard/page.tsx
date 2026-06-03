"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ── Sample aggregated stats (representative data for the SLASSCOM IT industry) ─

const ENV = {
  submissions: 47,
  renewablePct: 34,
  gridPct: 58,
  otherPct: 8,
  avgEnergyKwh: 8420,
  avgEnergyPerEmployee: 32,
  avgWaterConsumed: 186,
  waterReusedPct: 21,
  waterStressPct: 18,
  carbonTargetsPct: 45,
  sbtiPct: 23,
  energySources: [
    { label: "Grid Electricity", pct: 58, color: "#3b82f6" },
    { label: "Solar", pct: 18, color: "#f59e0b" },
    { label: "Wind", pct: 9, color: "#14b8a6" },
    { label: "Other Renewable", pct: 10, color: "#10b981" },
    { label: "Hydropower", pct: 5, color: "#06b6d4" },
  ],
  ghgTracking: [
    { label: "Refrigerants", pct: 89 },
    { label: "Gasoline", pct: 71 },
    { label: "Natural Gas", pct: 67 },
    { label: "Distillate Fuel Oil", pct: 54 },
  ],
  compliance: [
    { label: "Code of Conduct Approved", pct: 91 },
    { label: "EHS Practices Established", pct: 82 },
    { label: "No EHS Fines", pct: 84 },
    { label: "Environmental Regulations", pct: 76 },
    { label: "No Regulatory Non-Compliance", pct: 71 },
  ],
  scopeCategories: [
    { label: "Grid Electricity", value: "5,200 KwH", pct: 100 },
    { label: "Purchased Goods / Services", value: "LKR 2.4M", pct: 74 },
    { label: "Business Travel", value: "12,400 km", pct: 62 },
    { label: "Heating & Cooling", value: "820 KwH", pct: 48 },
    { label: "Upstream Transport", value: "4,800 km", pct: 38 },
    { label: "Waste from Operations", value: "1.8 T", pct: 22 },
  ],
};

const SOC = {
  submissions: 52,
  avgEmployees: 312,
  malePct: 58,
  femalePct: 42,
  womenInLeadership: 31,
  avgTurnover: 14.2,
  avgRetention: 85.8,
  avgServiceYears: 4.1,
  leadership: [
    { label: "Board of Directors", women: 28 },
    { label: "C-Suite / Executive", women: 24 },
    { label: "Senior Management", women: 33 },
    { label: "Middle Management", women: 38 },
  ],
  ageGroups: [
    { label: "Under 30", pct: 44, color: "#10b981" },
    { label: "30–50", pct: 49, color: "#14b8a6" },
    { label: "Over 50", pct: 7, color: "#94a3b8" },
  ],
  benefits: [
    { label: "Medical Insurance", pct: 94 },
    { label: "Paid Maternity Leave", pct: 91 },
    { label: "Life Insurance", pct: 84 },
    { label: "Flexible / Remote Work", pct: 78 },
    { label: "Paid Paternity Leave", pct: 73 },
    { label: "Transport Allowance", pct: 71 },
    { label: "Professional Dev Fund", pct: 67 },
    { label: "Mental Health Support", pct: 62 },
  ],
  safety: [
    { label: "Fatalities", value: 0, severity: "safe" },
    { label: "Lost Time Injuries", value: 3, severity: "warn" },
    { label: "Recordable Injuries", value: 12, severity: "warn" },
    { label: "Near Misses", value: 47, severity: "info" },
    { label: "First Aid Incidents", value: 89, severity: "info" },
    { label: "Occupational Diseases", value: 2, severity: "warn" },
  ],
  trainingHrsPerEmployee: 28.4,
  trainingBudgetPct: 2.3,
  trainingTypes: [
    { label: "Technical / Professional", pct: 82 },
    { label: "Digital & IT Skills", pct: 76 },
    { label: "Compliance & Regulatory", pct: 71 },
    { label: "Soft Skills", pct: 63 },
    { label: "Leadership & Management", pct: 58 },
    { label: "ESG / Sustainability", pct: 44 },
  ],
  csrInvestmentM: 8.2,
  csrPrograms: 7,
  volunteerHrs: 2840,
  csrCategories: [
    { label: "Education & Skills", pct: 38, color: "#10b981" },
    { label: "Health & Well-being", pct: 22, color: "#14b8a6" },
    { label: "Environmental Conservation", pct: 18, color: "#06b6d4" },
    { label: "Economic Empowerment", pct: 14, color: "#8b5cf6" },
    { label: "Arts & Culture", pct: 8, color: "#f59e0b" },
  ],
};

const GOV = {
  submissions: 38,
  avgSections: 18.7,
  totalSections: 22,
  reportingPeriods: [
    { label: "Apr 2024 – Mar 2025", pct: 61, color: "#8b5cf6" },
    { label: "Jan 2024 – Dec 2025", pct: 31, color: "#a78bfa" },
    { label: "Other", pct: 8, color: "#ddd6fe" },
  ],
  committees: [
    { label: "Board of Directors", pct: 94 },
    { label: "Audit and Risk", pct: 82 },
    { label: "Sustainability Committee", pct: 67 },
    { label: "Chairman", pct: 58 },
  ],
  conflictDisclosure: [
    { label: "Related Party Transactions", yes: 79 },
    { label: "Cross-board Membership", yes: 71 },
    { label: "Cross-shareholding", yes: 68 },
    { label: "Controlling Shareholders", yes: 54 },
  ],
  antiCorruption: {
    opsAssessedPct: 78,
    boardTrained: 82,
    employeesTrained: 74,
    confirmedIncidents: 2,
    dismissals: 1,
    contractTerminations: 0,
  },
  fineDistribution: [
    { label: "Zero Fines", pct: 67, color: "#10b981" },
    { label: "1–2 Fines", pct: 24, color: "#f59e0b" },
    { label: "3+ Fines", pct: 9, color: "#ef4444" },
  ],
  sectionCompletion: [
    94, 91, 87, 89, 76, 84, 71, 88, 82, 79,
    85, 77, 83, 74, 81, 76, 78, 92, 68, 73, 80, 72,
  ],
};

// ── Chart primitives ───────────────────────────────────────────────────────────

function Ring({
  pct, color, size = 88, stroke = 9,
}: { pct: number; color: string; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${(pct / 100) * C} ${C}`} strokeLinecap="round" />
    </svg>
  );
}

function Donut({
  segs, size = 120, stroke = 14,
}: { segs: { value: number; color: string }[]; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const total = segs.reduce((s, x) => s + x.value, 0);
  let cum = 0;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
      {segs.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * C;
        const offset = -(cum * C);
        cum += pct;
        return (
          <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${C - dash}`}
            strokeDashoffset={offset}
          />
        );
      })}
    </svg>
  );
}

function Bar({
  label, pct, value, color = "bg-blue-500",
}: { label: string; pct: number; value?: string; color?: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value ?? `${pct}%`}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${className}`}>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">{title}</p>
      {children}
    </div>
  );
}

function KpiChip({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-1 ${color}`}>
      <p className="text-xs font-semibold uppercase tracking-widest opacity-70">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
      {sub && <p className="text-xs opacity-60 font-medium">{sub}</p>}
    </div>
  );
}

// ── Tab components ─────────────────────────────────────────────────────────────

type Tab = "overview" | "environmental" | "social" | "governance";

function TabBtn({ id, label, current, onClick, dot }: {
  id: Tab; label: string; current: Tab; onClick: (t: Tab) => void; dot: string;
}) {
  const active = current === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
        active
          ? "bg-white text-slate-900 shadow-sm border border-slate-200"
          : "text-slate-500 hover:text-slate-700 hover:bg-white/60"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      {label}
    </button>
  );
}

// ── Tab content ────────────────────────────────────────────────────────────────

function OverviewTab() {
  const total = ENV.submissions + SOC.submissions + GOV.submissions;
  const forms = [
    {
      name: "Social Factors", submissions: SOC.submissions, sections: 7,
      completionRate: 84, gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700",
      color: "#10b981", description: "Workforce, diversity, labour, health, training & CSR",
    },
    {
      name: "Baseline Matrix", submissions: ENV.submissions, sections: 9,
      completionRate: 76, gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700",
      color: "#3b82f6", description: "Energy, water, emissions, compliance & sustainability",
    },
    {
      name: "Governance Factors", submissions: GOV.submissions, sections: 22,
      completionRate: 69, gradient: "from-violet-500 to-purple-600",
      bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700",
      color: "#8b5cf6", description: "Governance structure, policy, compliance & anti-corruption",
    },
  ];

  const insights = [
    { icon: "⚡", color: "bg-amber-50 border-amber-200 text-amber-800", text: "34% of companies use renewable energy on average — growing opportunity for green IT." },
    { icon: "👥", color: "bg-emerald-50 border-emerald-200 text-emerald-800", text: "Women represent 31% of leadership roles across reporting companies." },
    { icon: "🛡️", color: "bg-violet-50 border-violet-200 text-violet-800", text: "67% of companies report zero compliance fines in the governance period." },
    { icon: "📚", color: "bg-blue-50 border-blue-200 text-blue-800", text: "Average 28.4 training hours per employee — led by technical and digital skills." },
    { icon: "🌱", color: "bg-teal-50 border-teal-200 text-teal-800", text: "Only 23% have set SBTi-aligned carbon reduction targets — a major gap." },
    { icon: "❤️", color: "bg-rose-50 border-rose-200 text-rose-800", text: "94% of companies provide medical insurance; mental health support at 62%." },
  ];

  return (
    <div className="space-y-6">
      {/* KPI bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiChip label="Total Submissions" value={String(total)} sub="Across all 3 forms" color="bg-slate-800 text-white" />
        <KpiChip label="Participating Companies" value="68" sub="Sri Lanka IT industry" color="bg-blue-600 text-white" />
        <KpiChip label="Avg ESG Coverage" value="76%" sub="Sections completed" color="bg-emerald-600 text-white" />
        <KpiChip label="Reporting Period" value="2024–25" sub="Current cycle" color="bg-violet-600 text-white" />
      </div>

      {/* Form breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {forms.map((f) => (
          <div key={f.name} className={`relative rounded-2xl border ${f.border} ${f.bg} p-6 overflow-hidden`}>
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.gradient}`} />
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold uppercase tracking-widest ${f.text} mb-1`}>{f.name}</p>
                <p className="text-3xl font-bold text-slate-800">{f.submissions}</p>
                <p className="text-xs text-slate-500 mt-0.5">submissions · {f.sections} sections</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.description}</p>
              </div>
              <div className="relative shrink-0">
                <Ring pct={f.completionRate} color={f.color} size={72} stroke={7} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-700">{f.completionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission distribution + ESG pillar scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Submission Distribution">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <Donut
                segs={[
                  { value: SOC.submissions, color: "#10b981" },
                  { value: ENV.submissions, color: "#3b82f6" },
                  { value: GOV.submissions, color: "#8b5cf6" },
                ]}
                size={130} stroke={16}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-800">{total}</span>
                <span className="text-xs text-slate-400">total</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {[
                { label: "Social Factors", value: SOC.submissions, color: "bg-emerald-500" },
                { label: "Baseline Matrix", value: ENV.submissions, color: "bg-blue-500" },
                { label: "Governance", value: GOV.submissions, color: "bg-violet-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
                      {item.label}
                    </span>
                    <span className="font-bold text-slate-800">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.value / total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="ESG Pillar Scores">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Environmental", score: 72, color: "#3b82f6", sub: "Baseline Matrix" },
              { label: "Social", score: 81, color: "#10b981", sub: "Social Factors" },
              { label: "Governance", score: 68, color: "#8b5cf6", sub: "Governance Form" },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <Ring pct={p.score} color={p.color} size={76} stroke={8} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-800">{p.score}</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-700">{p.label}</p>
                  <p className="text-[10px] text-slate-400">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Key insights */}
      <Card title="Key Industry Insights">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {insights.map((ins) => (
            <div key={ins.text} className={`rounded-xl border p-3.5 ${ins.color}`}>
              <span className="text-lg">{ins.icon}</span>
              <p className="text-xs leading-relaxed mt-1.5">{ins.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function EnvironmentalTab() {
  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiChip label="Submissions" value={String(ENV.submissions)} sub="Companies reported" color="bg-blue-600 text-white" />
        <KpiChip label="Avg Energy" value="8,420 KwH" sub="Per company / year" color="bg-indigo-50 text-indigo-800" />
        <KpiChip label="Avg Water" value="186 m³" sub="Per company / year" color="bg-cyan-50 text-cyan-800" />
        <KpiChip label="Carbon Targets" value={`${ENV.carbonTargetsPct}%`} sub="Have reduction targets" color="bg-emerald-50 text-emerald-800" />
      </div>

      {/* Energy mix + sources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Energy Mix">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <Donut
                segs={[
                  { value: ENV.renewablePct, color: "#10b981" },
                  { value: ENV.gridPct, color: "#3b82f6" },
                  { value: ENV.otherPct, color: "#94a3b8" },
                ]}
                size={130} stroke={16}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-slate-800">{ENV.renewablePct}%</span>
                <span className="text-[10px] text-slate-400 text-center leading-tight">renewable</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {[
                { label: "Grid Electricity", pct: ENV.gridPct, color: "bg-blue-500" },
                { label: "Renewable Energy", pct: ENV.renewablePct, color: "bg-emerald-500" },
                { label: "Other Sources", pct: ENV.otherPct, color: "bg-slate-400" },
              ].map((item) => (
                <Bar key={item.label} label={item.label} pct={item.pct} color={item.color} />
              ))}
            </div>
          </div>
        </Card>

        <Card title="Energy Sources Breakdown">
          <div className="space-y-4">
            {ENV.energySources.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-bold text-slate-800">{s.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Scope categories + GHG tracking */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Scope Category Coverage (avg reported values)">
          <div className="space-y-4">
            {ENV.scopeCategories.map((s) => (
              <Bar key={s.label} label={s.label} pct={s.pct} value={s.value} color="bg-blue-400" />
            ))}
          </div>
        </Card>

        <Card title="GHG Gas Tracking Adoption">
          <div className="space-y-4 mb-6">
            {ENV.ghgTracking.map((g) => (
              <Bar key={g.label} label={g.label} pct={g.pct} color="bg-indigo-500" />
            ))}
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sustainability Targets</p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">Carbon Reduction Targets</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative">
                    <Ring pct={ENV.carbonTargetsPct} color="#3b82f6" size={48} stroke={5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-slate-700">{ENV.carbonTargetsPct}%</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{ENV.carbonTargetsPct}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500">SBTi Aligned Targets</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative">
                    <Ring pct={ENV.sbtiPct} color="#f59e0b" size={48} stroke={5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-slate-700">{ENV.sbtiPct}%</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{ENV.sbtiPct}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500">Water Stress Regions</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative">
                    <Ring pct={ENV.waterStressPct} color="#06b6d4" size={48} stroke={5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-slate-700">{ENV.waterStressPct}%</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{ENV.waterStressPct}%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Compliance */}
      <Card title="Environmental Compliance Rates (% of companies in compliance)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {ENV.compliance.map((c) => (
            <div key={c.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600">{c.label}</span>
                <span className={`font-bold ${c.pct >= 80 ? "text-emerald-600" : c.pct >= 65 ? "text-amber-600" : "text-red-500"}`}>
                  {c.pct}%
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${c.pct >= 80 ? "bg-emerald-500" : c.pct >= 65 ? "bg-amber-400" : "bg-red-400"}`}
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Water stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Avg Water Consumed", value: "186 m³", sub: "Per year" },
          { label: "Water Reuse Rate", value: `${ENV.waterReusedPct}%`, sub: "Treated & reused" },
          { label: "Avg Energy/Employee", value: `${ENV.avgEnergyPerEmployee} KwH`, sub: "Annual intensity" },
          { label: "In Water Stress Regions", value: `${ENV.waterStressPct}%`, sub: "Companies affected" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialTab() {
  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiChip label="Submissions" value={String(SOC.submissions)} sub="Companies reported" color="bg-emerald-600 text-white" />
        <KpiChip label="Avg Workforce" value={String(SOC.avgEmployees)} sub="Employees per company" color="bg-emerald-50 text-emerald-800" />
        <KpiChip label="Avg Turnover" value={`${SOC.avgTurnover}%`} sub="Annual rate" color="bg-amber-50 text-amber-800" />
        <KpiChip label="Avg Retention" value={`${SOC.avgRetention}%`} sub="Annual rate" color="bg-teal-50 text-teal-800" />
      </div>

      {/* Gender + Leadership */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Workforce Gender Split">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <Donut
                segs={[
                  { value: SOC.malePct, color: "#3b82f6" },
                  { value: SOC.femalePct, color: "#ec4899" },
                ]}
                size={130} stroke={18}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-800">{SOC.femalePct}%</span>
                <span className="text-[10px] text-slate-400">female</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {[
                { label: "Male", pct: SOC.malePct, color: "bg-blue-500" },
                { label: "Female", pct: SOC.femalePct, color: "bg-pink-500" },
              ].map((g) => (
                <div key={g.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 font-medium">{g.label}</span>
                    <span className="font-bold text-slate-800">{g.pct}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${g.color}`} style={{ width: `${g.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5 mt-1">
                <p className="text-xs text-emerald-700 font-semibold">Women in Leadership</p>
                <p className="text-2xl font-bold text-emerald-600">{SOC.womenInLeadership}%</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Women in Leadership by Level">
          <div className="space-y-4">
            {SOC.leadership.map((l) => (
              <div key={l.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600">{l.label}</span>
                  <span className="font-bold text-slate-800">{l.women}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-pink-400 transition-all duration-700"
                    style={{ width: `${l.women}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Workforce Age Groups</p>
            <div className="flex gap-1 h-10 rounded-lg overflow-hidden">
              {SOC.ageGroups.map((a) => (
                <div key={a.label} className="flex items-center justify-center text-white text-[10px] font-bold rounded-sm"
                  style={{ width: `${a.pct}%`, backgroundColor: a.color }}>
                  {a.pct > 10 ? `${a.pct}%` : ""}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              {SOC.ageGroups.map((a) => (
                <div key={a.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-xs text-slate-500">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Benefits + Training */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Employee Benefits Coverage">
          <div className="space-y-3.5">
            {SOC.benefits.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{b.label}</span>
                  <span className={`font-bold ${b.pct >= 80 ? "text-emerald-600" : b.pct >= 65 ? "text-amber-600" : "text-orange-500"}`}>
                    {b.pct}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${b.pct >= 80 ? "bg-emerald-500" : b.pct >= 65 ? "bg-teal-400" : "bg-amber-400"}`}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Training Programme Adoption">
          <div className="space-y-3.5 mb-5">
            {SOC.trainingTypes.map((t) => (
              <Bar key={t.label} label={t.label} pct={t.pct} color="bg-emerald-500" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center">
              <p className="text-xs text-emerald-600 mb-1">Avg Training Hours</p>
              <p className="text-2xl font-bold text-emerald-700">{SOC.trainingHrsPerEmployee}</p>
              <p className="text-[10px] text-emerald-500">per employee / year</p>
            </div>
            <div className="rounded-xl bg-teal-50 border border-teal-100 p-3 text-center">
              <p className="text-xs text-teal-600 mb-1">Training Budget</p>
              <p className="text-2xl font-bold text-teal-700">{SOC.trainingBudgetPct}%</p>
              <p className="text-[10px] text-teal-500">of total payroll</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Safety incidents + CSR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Workplace Safety Incidents (industry aggregate)">
          <div className="space-y-2">
            {SOC.safety.map((s) => {
              const colors: Record<string, string> = {
                safe: "bg-emerald-50 border-emerald-200 text-emerald-700",
                warn: "bg-amber-50 border-amber-200 text-amber-700",
                info: "bg-slate-50 border-slate-200 text-slate-600",
              };
              const badges: Record<string, string> = { safe: "bg-emerald-500", warn: "bg-amber-500", info: "bg-slate-400" };
              return (
                <div key={s.label} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${colors[s.severity]}`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${badges[s.severity]}`} />
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                  <span className="text-lg font-bold">{s.value}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="CSR Programme Distribution">
          <div className="flex items-center gap-5 mb-5">
            <div className="relative shrink-0">
              <Donut
                segs={SOC.csrCategories.map((c) => ({ value: c.pct, color: c.color }))}
                size={110} stroke={14}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-slate-600">LKR</span>
                <span className="text-sm font-bold text-slate-800">{SOC.csrInvestmentM}M</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {SOC.csrCategories.map((c) => (
                <div key={c.label} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-600 flex-1">{c.label}</span>
                  <span className="font-bold text-slate-800">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-600">LKR {SOC.csrInvestmentM}M</p>
              <p className="text-xs text-slate-400">avg CSR investment</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-teal-600">{SOC.csrPrograms}</p>
              <p className="text-xs text-slate-400">avg programs/company</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-cyan-600">{SOC.volunteerHrs.toLocaleString()}</p>
              <p className="text-xs text-slate-400">avg volunteer hours</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function GovernanceTab() {
  const avgPct = Math.round((GOV.avgSections / GOV.totalSections) * 100);
  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiChip label="Submissions" value={String(GOV.submissions)} sub="Companies reported" color="bg-violet-600 text-white" />
        <KpiChip label="Avg Sections Done" value={`${GOV.avgSections}/${GOV.totalSections}`} sub={`${avgPct}% completion`} color="bg-violet-50 text-violet-800" />
        <KpiChip label="Anti-Corruption" value={`${GOV.antiCorruption.opsAssessedPct}%`} sub="Ops assessed" color="bg-purple-50 text-purple-800" />
        <KpiChip label="Zero Fines" value="67%" sub="Of companies reporting" color="bg-emerald-50 text-emerald-800" />
      </div>

      {/* Section completion heatmap */}
      <Card title={`Governance Section Completion Rate (${GOV.totalSections} sections)`}>
        <div className="grid grid-cols-11 gap-1.5">
          {GOV.sectionCompletion.map((pct, i) => {
            const intensity =
              pct >= 90 ? "bg-violet-600 text-white" :
              pct >= 80 ? "bg-violet-400 text-white" :
              pct >= 70 ? "bg-violet-200 text-violet-800" :
              "bg-violet-100 text-violet-600";
            return (
              <div key={i} className={`aspect-square rounded-lg flex flex-col items-center justify-center ${intensity} transition-all`} title={`Section ${i + 1}: ${pct}%`}>
                <span className="text-[9px] font-bold">{i + 1}</span>
                <span className="text-[8px] opacity-80">{pct}%</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium">Completion scale:</p>
          {[
            { color: "bg-violet-600", label: "90%+" },
            { color: "bg-violet-400", label: "80–89%" },
            { color: "bg-violet-200", label: "70–79%" },
            { color: "bg-violet-100", label: "<70%" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-sm ${s.color}`} />
              <span className="text-[11px] text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Reporting periods + committees */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Reporting Period Adoption">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <Donut
                segs={GOV.reportingPeriods.map((r) => ({ value: r.pct, color: r.color }))}
                size={120} stroke={15}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-800">{GOV.submissions}</span>
                <span className="text-[10px] text-slate-400">companies</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {GOV.reportingPeriods.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      {r.label}
                    </span>
                    <span className="font-bold text-slate-800">{r.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Governance Committee Types">
          <div className="space-y-4">
            {GOV.committees.map((c) => (
              <Bar key={c.label} label={c.label} pct={c.pct} color="bg-violet-500" />
            ))}
          </div>
        </Card>
      </div>

      {/* Conflicts + Fine distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card title="Conflict of Interest Disclosure Rate">
          <div className="space-y-4">
            {GOV.conflictDisclosure.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600">{c.label}</span>
                  <span className={`font-bold ${c.yes >= 75 ? "text-emerald-600" : c.yes >= 60 ? "text-amber-600" : "text-orange-500"}`}>
                    {c.yes}% disclosed
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${c.yes >= 75 ? "bg-emerald-500" : c.yes >= 60 ? "bg-amber-400" : "bg-orange-400"}`}
                    style={{ width: `${c.yes}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Compliance Fine Distribution">
          <div className="space-y-3 mb-6">
            {GOV.fineDistribution.map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor:
                      f.label === "Zero Fines" ? "#10b981" : f.label === "1–2 Fines" ? "#f59e0b" : "#ef4444"
                    }} />
                    {f.label}
                  </span>
                  <span className="font-bold text-slate-800">{f.pct}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${f.pct}%`,
                      backgroundColor: f.label === "Zero Fines" ? "#10b981" : f.label === "1–2 Fines" ? "#f59e0b" : "#ef4444",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Anti-corruption summary */}
          <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Anti-Corruption Metrics</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Ops Assessed", value: `${GOV.antiCorruption.opsAssessedPct}%`, color: "text-violet-700" },
                { label: "Board Trained", value: `${GOV.antiCorruption.boardTrained}%`, color: "text-purple-700" },
                { label: "Staff Trained", value: `${GOV.antiCorruption.employeesTrained}%`, color: "text-indigo-700" },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                  <p className="text-[10px] text-slate-400">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-3 pt-3 border-t border-violet-100">
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">{GOV.antiCorruption.confirmedIncidents}</p>
                <p className="text-[10px] text-slate-400">Confirmed incidents</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">{GOV.antiCorruption.dismissals}</p>
                <p className="text-[10px] text-slate-400">Dismissals</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">{GOV.antiCorruption.contractTerminations}</p>
                <p className="text-[10px] text-slate-400">Contract terminations</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
              aria-label="Back to home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">SLASSCOM · ESG</p>
              <p className="text-sm font-bold text-slate-800">Admin Analytics Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Admin
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Data
            </span>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-2 flex gap-1 overflow-x-auto">
          <TabBtn id="overview" label="Overview" current={tab} onClick={setTab} dot="bg-slate-500" />
          <TabBtn id="environmental" label="Environmental" current={tab} onClick={setTab} dot="bg-blue-500" />
          <TabBtn id="social" label="Social" current={tab} onClick={setTab} dot="bg-emerald-500" />
          <TabBtn id="governance" label="Governance" current={tab} onClick={setTab} dot="bg-violet-500" />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {tab === "overview" && <OverviewTab />}
        {tab === "environmental" && <EnvironmentalTab />}
        {tab === "social" && <SocialTab />}
        {tab === "governance" && <GovernanceTab />}
      </main>
    </div>
  );
}
