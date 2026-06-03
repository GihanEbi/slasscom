"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const STEPS = [
  { id: 1, label: "Company",     title: "Company Information",                subtitle: "Basic details about your organisation" },
  { id: 2, label: "Energy",      title: "Efficient Consumption of Energy",    subtitle: "Energy consumption to be calculated in KwH" },
  { id: 3, label: "Water",       title: "Efficient Consumption of Water",     subtitle: "Water consumption to be calculated in m³" },
  { id: 4, label: "Emissions",   title: "Minimizing Discharge — Emissions",   subtitle: "Direct and Indirect GHG Emissions" },
  { id: 5, label: "GHG",         title: "GHG Emissions Quantification",       subtitle: "Monitoring and reporting on GHG gases" },
  { id: 6, label: "Scope",       title: "Scope Categories",                   subtitle: "Categorized emission sources" },
  { id: 7, label: "Compliance",  title: "Compliance & Environment Impact",    subtitle: "EHS practices and regulatory compliance" },
  { id: 8, label: "Assessments", title: "Supplier & Carbon Assessments",      subtitle: "Risk assessments and reduction targets" },
  { id: 9, label: "Impact",      title: "Impact on Environment & Compliance", subtitle: "Contributions and sustainability targets" },
];

type FD = Record<string, string>;
type FieldProps = { label: string; k: string; fd: FD; set: (k: string, v: string) => void; hint?: string; placeholder?: string };
type SelProps  = FieldProps & { options: string[] };

// ─── Field primitives ──────────────────────────────────────────────────────────

function TInput({ label, k, fd, set, hint, placeholder }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 leading-snug">{label}</label>
      {hint && <p className="text-xs text-slate-400 leading-relaxed">{hint}</p>}
      <input
        type="text"
        value={fd[k] ?? ""}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder ?? "Enter value…"}
        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
      />
    </div>
  );
}

function TArea({ label, k, fd, set, hint, placeholder }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 leading-snug">{label}</label>
      {hint && <p className="text-xs text-slate-400 leading-relaxed">{hint}</p>}
      <textarea
        value={fd[k] ?? ""}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder ?? "Enter details…"}
        rows={3}
        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
      />
    </div>
  );
}

function Sel({ label, k, fd, set, options, hint }: SelProps) {
  const val = fd[k] ?? "";
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700 leading-snug">{label}</label>
      {hint && <p className="text-xs text-slate-400 leading-relaxed">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => set(k, val === opt ? "" : opt)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              val === opt
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
            }`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function YN({ label, k, fd, set, hint }: FieldProps) {
  const val = fd[k] ?? "";
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700 leading-snug">{label}</label>
      {hint && <p className="text-xs text-slate-400 leading-relaxed">{hint}</p>}
      <div className="flex gap-2">
        {["Yes", "No"].map((opt) => (
          <button key={opt} type="button" onClick={() => set(k, opt)}
            className={`px-6 py-2 rounded-xl text-sm font-semibold border transition-all ${
              val === opt
                ? opt === "Yes"
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                  : "bg-red-400 text-white border-red-400 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
            }`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 flex flex-col gap-4">
      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{title}</p>
      {children}
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" />
      </svg>
      <p className="text-xs text-amber-700 leading-relaxed">{children}</p>
    </div>
  );
}

function Divider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-slate-100" />
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{title}</span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ─── Section content ───────────────────────────────────────────────────────────

function S1({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <TInput label="Name of the Company" k="company_name" fd={fd} set={set} placeholder="Enter your company name…" />
  );
}

function S2({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <Note>Energy consumption to be calculated in KwH. Provide details of energy consumption based on the categories below.</Note>

      <Sel label="Your energy consumption is based on?" k="energy_type" fd={fd} set={set}
        options={["Renewable Energy", "Non-renewable energy"]} />

      <Divider title="Renewable Energy Generated" />

      <Sel label="Renewable energy is based on which elements?" k="renewable_elements" fd={fd} set={set}
        options={["Wind", "Solar", "Hydropower", "Biomass", "Geothermal", "Ocean Energy", "Other"]} />
      {fd["renewable_elements"] === "Other" && (
        <TInput label="Please specify" k="renewable_elements_other" fd={fd} set={set} />
      )}
      <TInput label="Quantity of Electricity generated from Wind? (KwH)" k="wind_kwh" fd={fd} set={set} placeholder="e.g. 1500" />
      <TInput label="Quantity of Electricity generated from Solar? (KwH)" k="solar_kwh" fd={fd} set={set} placeholder="e.g. 2300" />
      <TInput label="Quantity of Electricity generated from other renewable sources? (KwH)" k="other_renewable_kwh" fd={fd} set={set} placeholder="e.g. 800" />

      <Divider title="Non-Renewable Energy Consumed" />

      <Sel label="Non-renewable energy consumption is based on which elements?" k="nonrenewable_elements" fd={fd} set={set}
        options={["Coal", "Oil", "Natural Gas", "Nuclear", "Other"]} />
      {fd["nonrenewable_elements"] === "Other" && (
        <TInput label="Please specify" k="nonrenewable_elements_other" fd={fd} set={set} />
      )}
      <TInput label="Quantity of Grid Electricity Consumed (KwH)" k="grid_electricity_kwh" fd={fd} set={set} placeholder="e.g. 5000" />
      <TInput label="Quantity of fuel consumed"
        k="fuel_consumed" fd={fd} set={set} placeholder="e.g. 200 litres"
        hint="Include petrol, diesel, kerosene (and any other fuel) used for vehicles, generators and other machinery" />
      <TInput label="Quantity of energy consumed from other sources (KwH)" k="other_energy_kwh" fd={fd} set={set} placeholder="e.g. 300" />
      <TInput label="Total energy consumed" k="total_energy" fd={fd} set={set} placeholder="e.g. 8000 KwH" />

      <Sel label="Percentage of energy sourced from the grid (Grid electricity / Total energy Consumed)" k="grid_pct" fd={fd} set={set}
        options={["10-20%", "20-40%", "40-50%", "50-60%", "60% and above"]} />

      <Sel label="Percentage Renewable (Renewable energy generated / Total energy Consumed)" k="renewable_pct" fd={fd} set={set}
        options={["Less than 20%", "20-40%", "40-60%", "More than 60%", "Other"]} />
      {fd["renewable_pct"] === "Other" && (
        <TInput label="Please specify renewable percentage" k="renewable_pct_other" fd={fd} set={set} />
      )}

      <Divider title="Energy Intensity" />
      <TInput label="Number of Employees for the period" k="num_employees" fd={fd} set={set} placeholder="e.g. 250" />
      <TInput label="Energy Use per employee" k="energy_per_employee" fd={fd} set={set}
        hint="Total energy consumed / number of employees" placeholder="e.g. 32 KwH/employee" />
    </>
  );
}

function S3({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <Note>Water consumption to be calculated in m³. Provide details of water consumption based on the categories below.</Note>

      <Sel label="Source of water" k="water_source" fd={fd} set={set}
        options={["Main supply (Municipal)", "Private Providers", "Rain water", "Ground water", "Surface water"]} />
      <TInput label="Water usage for day-to-day operations (m³)" k="water_daily" fd={fd} set={set} placeholder="e.g. 150" />
      <TInput label="Total water withdrawn (m³)" k="water_withdrawn" fd={fd} set={set} placeholder="e.g. 200" />
      <TInput label="Total water consumed (m³)" k="water_consumed" fd={fd} set={set} placeholder="e.g. 180" />
      <TInput label="Water re-used through treatment facilities (m³)" k="water_reused" fd={fd} set={set} placeholder="e.g. 40" />

      <YN label="Do you operate in Regions with High or Extremely High Baseline Water Stress?" k="water_stress" fd={fd} set={set} />
      {fd["water_stress"] === "Yes" && (
        <Sub title="High Water Stress Regions">
          <p className="text-xs text-slate-500">Specify the percentage for each region with High or Extremely High Baseline Water Stress.</p>
          <TInput label="Total water withdrawn in high water stress regions (m³)" k="stress_water_withdrawn" fd={fd} set={set} />
          <TInput label="Total water consumed in high water stress regions (m³)" k="stress_water_consumed" fd={fd} set={set} />
        </Sub>
      )}
    </>
  );
}

function S4({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <Sel label="Emissions from" k="emissions_from" fd={fd} set={set}
        options={["Fuel", "Grid power", "Air travel", "Road travel", "Capital goods"]} />

      <Divider title="Direct and Indirect GHG Emissions" />

      <Sub title="Diesel">
        <TInput label="Units consumed (Litres)" k="diesel_litres" fd={fd} set={set} placeholder="e.g. 500" />
        <TInput label="Total CO2 emission (TCO2)" k="diesel_co2" fd={fd} set={set} placeholder="e.g. 1.32" />
      </Sub>
      <Sub title="Petrol">
        <TInput label="Units consumed (Litres)" k="petrol_litres" fd={fd} set={set} placeholder="e.g. 300" />
        <TInput label="Total CO2 emission (TCO2)" k="petrol_co2" fd={fd} set={set} placeholder="e.g. 0.69" />
      </Sub>
      <Sub title="Kerosene">
        <TInput label="Units consumed (Litres)" k="kerosene_litres" fd={fd} set={set} placeholder="e.g. 100" />
        <TInput label="Total CO2 emission (TCO2)" k="kerosene_co2" fd={fd} set={set} placeholder="e.g. 0.26" />
      </Sub>
      <Sub title="Electricity">
        <TInput label="Units consumed (KwH)" k="elec_kwh" fd={fd} set={set} placeholder="e.g. 5000" />
        <TInput label="Total CO2 emission (KG)" k="elec_co2_kg" fd={fd} set={set} placeholder="e.g. 2400" />
      </Sub>
    </>
  );
}

function S5({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <Note>
        Quantification (Number) of GHG Emissions for reporting (Eg: GHG protocol, quantity, monitoring and reporting on GHG gases — CO₂, CH₄, N₂O, etc.) for the following:
      </Note>
      <p className="text-sm font-semibold text-slate-700">Other</p>
      <YN label="Natural gas" k="ghg_natural_gas" fd={fd} set={set} />
      <YN label="Distillate fuel oil" k="ghg_distillate" fd={fd} set={set} />
      <YN label="Gasoline" k="ghg_gasoline" fd={fd} set={set} />
      <YN label="Refrigerants" k="ghg_refrigerants" fd={fd} set={set} />
    </>
  );
}

function S6({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <TInput label="Purchased and used electricity" k="scope_electricity" fd={fd} set={set} placeholder="e.g. 5000 KwH" />
      <TInput label="Heating and cooling" k="scope_heating" fd={fd} set={set} placeholder="e.g. 800 KwH" />
      <TInput label="Travel (Business & Employee commuting)" k="scope_travel" fd={fd} set={set} placeholder="e.g. 12,000 km" />
      <TInput label="Purchased goods / services, capital goods" k="scope_goods" fd={fd} set={set} placeholder="e.g. LKR 2,500,000" />
      <TInput label="Upstream transportation / leased assets" k="scope_transport" fd={fd} set={set} placeholder="e.g. 5,000 km" />
      <TInput label="Waste from operations" k="scope_waste" fd={fd} set={set} placeholder="e.g. 2 tonnes" />
    </>
  );
}

function S7({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <YN label="Are there established Environmental Health and Safety practices established?" k="ehs_practices" fd={fd} set={set} />
      <YN label="Were there any non compliance with local regulations?" k="non_compliance" fd={fd} set={set} />
      <YN label="Were any fines or penalties paid for non-compliance of EHS?" k="ehs_fines" fd={fd} set={set} />
      {fd["ehs_fines"] === "Yes" && (
        <TArea label="If yes, specify the non-compliance" k="ehs_fines_detail" fd={fd} set={set} placeholder="Describe the non-compliance…" />
      )}
      <YN label="Is there an approved Client and business code of conduct?" k="code_of_conduct" fd={fd} set={set} />
      <YN label="Does the Company implement Environmental regulations?" k="env_regulations" fd={fd} set={set} />
    </>
  );
}

function S8({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <p className="text-sm font-semibold text-slate-700 pb-1 border-b border-slate-100">Supplier Environmental Assessments</p>
      <TArea label="Does the Company conduct detailed risk assessments of suppliers? If Yes, briefly explain the process"
        k="supplier_risk_assessment" fd={fd} set={set} placeholder="Describe the risk assessment process…" />
      <TInput label="How frequently are suppliers assessed and reviewed?" k="supplier_freq" fd={fd} set={set} placeholder="e.g. Annually, Quarterly…" />
      <TInput label="Does the Company conduct supplier audits? (Eg: No. of 3rd party audits done)" k="supplier_audits" fd={fd} set={set} placeholder="e.g. 3 audits per year" />
      <TArea label="Are there any corrective action plans in place for high risk suppliers?" k="corrective_action" fd={fd} set={set} placeholder="Describe corrective action plans…" />
      <TArea label="Does the Company have any carbon reduction targets? If Yes, briefly explain" k="carbon_targets" fd={fd} set={set} placeholder="Describe carbon reduction targets…" />
    </>
  );
}

function S9({ fd, set }: { fd: FD; set: (k: string, v: string) => void }) {
  return (
    <>
      <YN label="Has the Company made any financial contributions, such as, donations, loans, sponsorships, etc. directly or indirectly?"
        k="financial_contributions" fd={fd} set={set} />
      {fd["financial_contributions"] === "Yes" && (
        <Sub title="Financial Contributions">
          <TInput label="The total monetary value of financial contributions made directly" k="financial_direct" fd={fd} set={set} placeholder="e.g. LKR 500,000" />
          <TInput label="The total monetary value of financial contributions made indirectly" k="financial_indirect" fd={fd} set={set} placeholder="e.g. LKR 200,000" />
        </Sub>
      )}

      <YN label="Has the Company made any in kind contributions, such as, advertising, consultancy, donation of equipment etc. directly or indirectly?"
        k="inkind_contributions" fd={fd} set={set} />
      {fd["inkind_contributions"] === "Yes" && (
        <Sub title="In-Kind Contributions">
          <TInput label="The total monetary value of in-kind contributions made directly" k="inkind_direct" fd={fd} set={set} placeholder="e.g. LKR 150,000" />
          <TInput label="The total monetary value of in-kind contributions made indirectly" k="inkind_indirect" fd={fd} set={set} placeholder="e.g. LKR 80,000" />
          <TArea label="How has this monetary value of in-kind contributions been estimated by the Company based on Country and beneficiary?"
            k="inkind_estimation" fd={fd} set={set} placeholder="Explain the estimation methodology…" />
        </Sub>
      )}

      <YN label="Are targets set based on SBTi?" k="sbti_targets" fd={fd} set={set} />
      {fd["sbti_targets"] === "Yes" && (
        <TArea label="Please give a brief description of the targets, timelines and approvals"
          k="sbti_detail" fd={fd} set={set} placeholder="Describe SBTi targets and timelines…" />
      )}
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function BaselineMatrixPage() {
  const [step, setStep]        = useState(1);
  const [done, setDone]        = useState<Set<number>>(new Set());
  const [submitted, setSubmit] = useState(false);
  const [fd, setFd]            = useState<FD>({});

  function set(k: string, v: string) { setFd((p) => ({ ...p, [k]: v })); }

  function next() {
    setDone((p) => new Set([...p, step]));
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    setDone((p) => new Set([...p, step]));
    setSubmit(true);
  }

  const pct      = Math.round((done.size / STEPS.length) * 100);
  const stepData = STEPS[step - 1];

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <PageHeader />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center border border-slate-100">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Submitted Successfully!</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Thank you for completing the SLASSCOM Baseline Matrix. Your data has been recorded.
            </p>
            <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity">
              Back to Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <PageHeader />

      {/* ── Sticky Progress Bar ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">Step {step} of {STEPS.length} — <span className="text-slate-700 font-semibold">{stepData.label}</span></span>
            <span className="text-xs font-semibold text-blue-600">{pct}% Complete</span>
          </div>

          {/* Step indicators */}
          <div className="flex items-center">
            {STEPS.flatMap((s, idx) => {
              const isCompleted = done.has(s.id);
              const isCurrent   = step === s.id;
              const els = [
                <div key={`step-${s.id}`}
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isCompleted ? "bg-blue-600 border-blue-600 text-white" :
                    isCurrent   ? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100" :
                                  "bg-white border-slate-300 text-slate-400"
                  }`}>
                  {isCompleted ? <CheckIcon /> : s.id}
                </div>,
              ];
              if (idx < STEPS.length - 1) {
                els.push(
                  <div key={`line-${s.id}`}
                    className={`flex-1 h-0.5 transition-colors duration-500 mx-0.5 ${isCompleted ? "bg-blue-600" : "bg-slate-200"}`}
                  />
                );
              }
              return els;
            })}
          </div>

          {/* Label row */}
          <div className="hidden sm:flex justify-between mt-1.5 px-0">
            {STEPS.map((s) => (
              <span key={s.id} className={`text-[9px] font-semibold uppercase tracking-wide w-7 text-center leading-tight ${
                done.has(s.id) ? "text-blue-500" : step === s.id ? "text-slate-800" : "text-slate-400"
              }`}>{s.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Section header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <span className="w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">{step}</span>
            Section {step} of {STEPS.length}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{stepData.title}</h1>
          <p className="mt-1.5 text-sm text-slate-500">{stepData.subtitle}</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col gap-6">
          {step === 1 && <S1 fd={fd} set={set} />}
          {step === 2 && <S2 fd={fd} set={set} />}
          {step === 3 && <S3 fd={fd} set={set} />}
          {step === 4 && <S4 fd={fd} set={set} />}
          {step === 5 && <S5 fd={fd} set={set} />}
          {step === 6 && <S6 fd={fd} set={set} />}
          {step === 7 && <S7 fd={fd} set={set} />}
          {step === 8 && <S8 fd={fd} set={set} />}
          {step === 9 && <S9 fd={fd} set={set} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <button type="button" onClick={back} disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            {STEPS.map((s) => (
              <div key={s.id} className={`w-1.5 h-1.5 rounded-full transition-all ${
                done.has(s.id) ? "bg-blue-500" : step === s.id ? "bg-blue-300 scale-125" : "bg-slate-200"
              }`} />
            ))}
          </div>

          {step < STEPS.length ? (
            <button type="button" onClick={next}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={submit}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all">
              Submit
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Page Header ───────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
        <a href="/" className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </a>
        <div className="h-5 w-px bg-slate-200" />
        <div>
          <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">SLASSCOM · ESG</p>
          <p className="text-sm font-semibold text-slate-800">Baseline Matrix</p>
        </div>
      </div>
    </header>
  );
}
