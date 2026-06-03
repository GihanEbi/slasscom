"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const STEPS = [
  { id: 1, label: "Workforce", title: "Workforce Composition",           subtitle: "Employee headcount and workforce structure" },
  { id: 2, label: "Turnover",  title: "Employee Turnover & Retention",   subtitle: "New hires, departures, and retention metrics" },
  { id: 3, label: "Diversity", title: "Diversity & Inclusion",           subtitle: "Leadership diversity, age groups, and D&I initiatives" },
  { id: 4, label: "Labour",    title: "Labour Practices & Human Rights", subtitle: "Working conditions, wages, and employee rights" },
  { id: 5, label: "Health",    title: "Health & Safety",                 subtitle: "Workplace incidents, safety systems, and well-being" },
  { id: 6, label: "Training",  title: "Training & Development",          subtitle: "Learning hours, investment, and skills programmes" },
  { id: 7, label: "Community", title: "Community Engagement & CSR",      subtitle: "Social contributions and community impact" },
];

type FD    = Record<string, string>;
type SetFn = (k: string, v: string) => void;

// --- Editable Table -----------------------------------------------------------

function EditableTable({
  title, headers, rows, tkey, fd, set,
}: {
  title: string; headers: string[]; rows: string[];
  tkey: string; fd: FD; set: SetFn;
}) {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">{title}</p>
      )}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 border-b border-slate-200 min-w-[180px]">
                Category
              </th>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-3 py-3 text-center text-xs font-semibold text-slate-600 border-b border-slate-200 border-l border-slate-200 min-w-[110px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowLabel, ri) => (
              <tr
                key={rowLabel}
                className={
                  ri % 2 === 0
                    ? "bg-white hover:bg-emerald-50/30 transition-colors"
                    : "bg-slate-50/40 hover:bg-emerald-50/30 transition-colors"
                }
              >
                <td className="px-4 py-2.5 text-sm font-medium text-slate-700 border-b border-slate-100">
                  {rowLabel}
                </td>
                {headers.map((_, ci) => {
                  const cellKey = `${tkey}_${ri}_${ci}`;
                  return (
                    <td key={ci} className="px-2 py-1.5 border-b border-slate-100 border-l border-slate-100">
                      <input
                        type="text"
                        value={fd[cellKey] ?? ""}
                        onChange={(e) => set(cellKey, e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent text-sm text-slate-800 text-center outline-none focus:border-emerald-300 focus:bg-emerald-50 focus:ring-1 focus:ring-emerald-200 transition-all placeholder-slate-300"
                        placeholder="-"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Field Primitives ---------------------------------------------------------

function TInput({
  label, k, fd, set, hint, placeholder,
}: { label: string; k: string; fd: FD; set: SetFn; hint?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 leading-snug">{label}</label>
      {hint && <p className="text-xs text-slate-400 leading-relaxed">{hint}</p>}
      <input
        type="text"
        value={fd[k] ?? ""}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder ?? "Enter value..."}
        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
      />
    </div>
  );
}

function TArea({
  label, k, fd, set, hint, placeholder,
}: { label: string; k: string; fd: FD; set: SetFn; hint?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 leading-snug">{label}</label>
      {hint && <p className="text-xs text-slate-400 leading-relaxed">{hint}</p>}
      <textarea
        value={fd[k] ?? ""}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder ?? "Enter details..."}
        rows={3}
        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
      />
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

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" />
      </svg>
      <p className="text-xs text-emerald-700 leading-relaxed">{children}</p>
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

// --- Step Sections ------------------------------------------------------------

function S1({ fd, set }: { fd: FD; set: SetFn }) {
  return (
    <>
      <Note>Provide a breakdown of your company's total workforce as of the end of the reporting period.</Note>

      <EditableTable
        title="Number of Employees by Employment Type"
        headers={["Male", "Female", "Total"]}
        rows={["Permanent Full-time", "Permanent Part-time", "Contract / Temporary", "Interns / Trainees", "Total"]}
        tkey="wf_type" fd={fd} set={set}
      />

      <EditableTable
        title="Employees by Job Category"
        headers={["Male", "Female", "Total"]}
        rows={["Executive / Senior Management", "Middle Management", "Technical / Professional", "Operations", "Administrative / Support", "Total"]}
        tkey="wf_cat" fd={fd} set={set}
      />

      <Divider title="Additional Workforce Details" />
      <TInput label="Total number of employees at the start of the reporting period" k="wf_start" fd={fd} set={set} placeholder="e.g. 520" />
      <TInput label="Total number of employees at the end of the reporting period" k="wf_end" fd={fd} set={set} placeholder="e.g. 548" />
      <TInput label="Number of employees based in Sri Lanka" k="wf_lk" fd={fd} set={set} placeholder="e.g. 480" />
      <TInput label="Number of employees based outside Sri Lanka" k="wf_intl" fd={fd} set={set} placeholder="e.g. 68" />
    </>
  );
}

function S2({ fd, set }: { fd: FD; set: SetFn }) {
  return (
    <>
      <Note>Report on the movement of employees during the reporting period including new hires and voluntary / involuntary departures.</Note>

      <EditableTable
        title="New Hires by Age Group and Gender"
        headers={["Male", "Female", "Total"]}
        rows={["Under 30", "30 - 50", "Over 50", "Total"]}
        tkey="nh_age" fd={fd} set={set}
      />

      <EditableTable
        title="Employee Departures by Reason"
        headers={["Male", "Female", "Total"]}
        rows={["Resignation", "Retirement", "Termination", "Redundancy", "Other", "Total"]}
        tkey="dep_reason" fd={fd} set={set}
      />

      <Divider title="Turnover Metrics" />
      <TInput
        label="Employee turnover rate (%)"
        k="turnover_rate" fd={fd} set={set}
        placeholder="e.g. 12.5%"
        hint="(No. of departures / Average headcount) x 100"
      />
      <TInput label="Employee retention rate (%)" k="retention_rate" fd={fd} set={set} placeholder="e.g. 87.5%" />
      <TInput label="Average length of service (years)" k="avg_service" fd={fd} set={set} placeholder="e.g. 4.2" />
      <TArea label="What are the primary reasons for employee attrition?" k="attrition_reasons" fd={fd} set={set} placeholder="Describe the main factors driving employee departures..." />
    </>
  );
}

function S3({ fd, set }: { fd: FD; set: SetFn }) {
  return (
    <>
      <Note>Report on the diversity of your workforce and leadership, as well as initiatives to promote inclusivity.</Note>

      <EditableTable
        title="Leadership Composition by Gender"
        headers={["Male", "Female", "Total", "% Women"]}
        rows={["Board of Directors", "C-Suite / Executive", "Senior Management", "Middle Management", "Total Leadership"]}
        tkey="ldr_gender" fd={fd} set={set}
      />

      <EditableTable
        title="Employees by Age Group"
        headers={["Male", "Female", "Total", "% of Workforce"]}
        rows={["Under 30", "30 - 50", "Over 50", "Total"]}
        tkey="age_group" fd={fd} set={set}
      />

      <Divider title="D&I Policy & Initiatives" />
      <TInput label="Does the company have a formal Diversity & Inclusion (D&I) policy?" k="di_policy" fd={fd} set={set} placeholder="Yes / No - when was it last reviewed?" />
      <TArea label="Describe the key D&I initiatives undertaken during the reporting period" k="di_initiatives" fd={fd} set={set} placeholder="List programmes, awareness campaigns, mentoring schemes, etc." />
      <TInput label="Gender pay gap ratio (women's median pay / men's median pay)" k="pay_gap" fd={fd} set={set} placeholder="e.g. 0.94 (women earn 94% of men's pay)" />
      <TArea label="Describe initiatives to promote ethnic, cultural, or national diversity" k="ethnic_div" fd={fd} set={set} placeholder="Describe relevant initiatives..." />
      <TInput label="Percentage of employees with disabilities (%)" k="disability_pct" fd={fd} set={set} placeholder="e.g. 2%" />
    </>
  );
}

function S4({ fd, set }: { fd: FD; set: SetFn }) {
  return (
    <>
      <Note>Provide information on your company's commitment to labour standards, fair wages, and the protection of human rights.</Note>

      <EditableTable
        title="Employee Benefits Coverage"
        headers={["Available (Yes / No)", "Coverage (% of Employees)"]}
        rows={[
          "Medical Insurance",
          "Life Insurance",
          "Retirement / Pension Plan",
          "Paid Maternity Leave",
          "Paid Paternity Leave",
          "Flexible / Remote Working",
          "Mental Health Support",
          "Professional Development Fund",
          "Transport Allowance",
          "Meal / Food Allowance",
        ]}
        tkey="benefits" fd={fd} set={set}
      />

      <Divider title="Human Rights & Labour Standards" />
      <TInput label="Does the company have a formal Human Rights policy?" k="hr_policy" fd={fd} set={set} placeholder="Yes / No - provide brief details..." />
      <TArea label="Describe the company's approach to preventing child labour and forced labour in its operations and supply chain" k="child_labour" fd={fd} set={set} placeholder="Describe policies and verification procedures..." />
      <TInput label="What percentage of employees are covered by collective bargaining agreements? (%)" k="cba_pct" fd={fd} set={set} placeholder="e.g. 0% / 45% / 100%" />
      <TArea label="Describe the company's grievance mechanism for employees" k="grievance" fd={fd} set={set} placeholder="Describe how employees can raise concerns and how they are resolved..." />
      <TInput label="Ratio of entry-level wage to local minimum wage" k="wage_ratio" fd={fd} set={set} placeholder="e.g. 1.2x the minimum wage" />
      <TInput label="Average annual employee compensation (LKR)" k="avg_comp" fd={fd} set={set} placeholder="e.g. LKR 1,800,000" />
      <TInput label="Does the company comply with all applicable local and international labour regulations?" k="labour_compliance" fd={fd} set={set} placeholder="Yes / No - provide details if non-compliant..." />
    </>
  );
}

function S5({ fd, set }: { fd: FD; set: SetFn }) {
  return (
    <>
      <Note>Report on workplace safety performance, health programmes, and the physical and mental well-being of employees.</Note>

      <EditableTable
        title="Workplace Safety Incident Statistics"
        headers={["Current Year", "Previous Year", "Rate per 100 Employees"]}
        rows={[
          "Fatalities",
          "Lost Time Injuries (LTI)",
          "Recordable Injuries",
          "Near Misses",
          "First Aid Incidents",
          "Occupational Diseases",
        ]}
        tkey="safety_inc" fd={fd} set={set}
      />

      <Divider title="Safety Management" />
      <TInput label="Does the company have a certified Health & Safety Management System (e.g. ISO 45001)?" k="safety_cert" fd={fd} set={set} placeholder="Yes / No - specify certification..." />
      <TInput label="How frequently are internal Health & Safety audits conducted?" k="safety_audit_freq" fd={fd} set={set} placeholder="e.g. Quarterly, Annually..." />
      <TInput label="Number of employees who received Health & Safety training during the reporting period" k="safety_trained" fd={fd} set={set} placeholder="e.g. 350" />
      <TInput label="Total Health & Safety training hours during the reporting period" k="safety_train_hrs" fd={fd} set={set} placeholder="e.g. 1,050" />
      <TArea label="Describe the company's employee well-being programmes" k="wellbeing_prog" fd={fd} set={set} placeholder="Mental health support, EAP, ergonomics, sports/recreation, etc." />
      <TInput label="Are occupational health services (e.g. company doctor, on-site clinic) available to employees?" k="occ_health" fd={fd} set={set} placeholder="Yes / No - describe services available..." />
    </>
  );
}

function S6({ fd, set }: { fd: FD; set: SetFn }) {
  return (
    <>
      <Note>Report on learning and development investment, programmes offered, and career advancement opportunities provided to employees.</Note>

      <EditableTable
        title="Training Investment by Employee Level"
        headers={["No. Employees Trained", "Total Training Hours", "Avg. Hours / Employee", "Investment (LKR)"]}
        rows={[
          "Executive / Senior Management",
          "Middle Management",
          "Technical / Professional",
          "Operations",
          "Administrative / Support",
          "Total",
        ]}
        tkey="train_level" fd={fd} set={set}
      />

      <EditableTable
        title="Training by Type"
        headers={["No. of Participants", "Total Hours", "Investment (LKR)"]}
        rows={[
          "Technical / Professional Skills",
          "Leadership & Management",
          "Compliance & Regulatory",
          "Digital & IT Skills",
          "Soft Skills / Communication",
          "Safety & Health",
          "ESG / Sustainability",
          "Total",
        ]}
        tkey="train_type" fd={fd} set={set}
      />

      <Divider title="Development Programmes" />
      <TInput label="Total training budget for the reporting period (LKR)" k="train_budget" fd={fd} set={set} placeholder="e.g. LKR 5,000,000" />
      <TInput label="Training budget as a percentage of total payroll (%)" k="train_budget_pct" fd={fd} set={set} placeholder="e.g. 2.5%" />
      <TArea label="Describe the key skills development and upskilling programmes offered to employees" k="skills_prog" fd={fd} set={set} placeholder="Describe courses, certifications, on-the-job training, etc." />
      <TInput label="Does the company have a formal succession planning programme?" k="succession" fd={fd} set={set} placeholder="Yes / No - provide details..." />
      <TInput label="Number of employees who received internal promotion or career advancement during the period" k="promotions" fd={fd} set={set} placeholder="e.g. 42" />
    </>
  );
}

function S7({ fd, set }: { fd: FD; set: SetFn }) {
  return (
    <>
      <Note>Report on community programmes, social investments, and the broader societal impact of the company's operations.</Note>

      <EditableTable
        title="CSR Programme Summary"
        headers={["No. of Beneficiaries", "Investment (LKR)", "Employee Volunteers"]}
        rows={[
          "Education & Skills Development",
          "Environmental Conservation",
          "Health & Well-being",
          "Economic Empowerment",
          "Arts, Culture & Heritage",
          "Other / Cross-cutting",
          "Total",
        ]}
        tkey="csr_prog" fd={fd} set={set}
      />

      <Divider title="Social Impact & Governance" />
      <TInput label="Total monetary value of CSR and community contributions during the reporting period (LKR)" k="csr_total" fd={fd} set={set} placeholder="e.g. LKR 10,000,000" />
      <TInput label="Number of active community programmes or partnerships" k="csr_count" fd={fd} set={set} placeholder="e.g. 8" />
      <TInput label="Total employee volunteer hours during the reporting period" k="volunteer_hrs" fd={fd} set={set} placeholder="e.g. 2,500" />
      <TArea label="Describe the key social impact and outcomes achieved through CSR activities" k="csr_impact" fd={fd} set={set} placeholder="Quantify beneficiaries, outcomes, and community change..." />
      <TInput label="Does the company have a formal Anti-Corruption and Anti-Bribery policy?" k="anti_corrupt" fd={fd} set={set} placeholder="Yes / No - policy details..." />
      <TInput label="Are there any ongoing or pending legal actions related to social or human rights issues?" k="legal_actions" fd={fd} set={set} placeholder="Yes / No - provide details if applicable..." />
      <TArea label="Describe any partnerships with government, NGOs, or international organisations for social impact" k="partnerships" fd={fd} set={set} placeholder="List key partnerships and their objectives..." />
    </>
  );
}

// --- Main Page ----------------------------------------------------------------

export default function SocialFactorsPage() {
  const [step, setStep]        = useState(1);
  const [done, setDone]        = useState<Set<number>>(new Set());
  const [submitted, setSubmit] = useState(false);
  const [fd, setFd]            = useState<FD>({});

  function handleSet(k: string, v: string) { setFd((p) => ({ ...p, [k]: v })); }

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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
              Thank you for completing the SLASSCOM Social Factors assessment. Your data has been recorded.
            </p>
            <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity">
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <PageHeader />

      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">
              Step {step} of {STEPS.length} &mdash;{" "}
              <span className="text-slate-700 font-semibold">{stepData.label}</span>
            </span>
            <span className="text-xs font-semibold text-emerald-600">{pct}% Complete</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full mb-3 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex items-center">
            {STEPS.flatMap((s, idx) => {
              const isCompleted = done.has(s.id);
              const isCurrent   = step === s.id;
              const els = [
                <div
                  key={`step-${s.id}`}
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-200"
                      : isCurrent
                      ? "bg-white border-emerald-500 text-emerald-600 ring-4 ring-emerald-100"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {isCompleted ? <CheckIcon /> : s.id}
                </div>,
              ];
              if (idx < STEPS.length - 1) {
                els.push(
                  <div
                    key={`line-${s.id}`}
                    className={`flex-1 h-0.5 mx-0.5 transition-colors duration-500 ${
                      isCompleted ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  />
                );
              }
              return els;
            })}
          </div>

          <div className="hidden sm:flex justify-between mt-1.5">
            {STEPS.map((s) => (
              <span
                key={s.id}
                className={`text-[9px] font-semibold uppercase tracking-wide w-7 text-center leading-tight ${
                  done.has(s.id) ? "text-emerald-500" : step === s.id ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <span className="w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold shrink-0">
              {step}
            </span>
            Section {step} of {STEPS.length}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{stepData.title}</h1>
          <p className="mt-1.5 text-sm text-slate-500">{stepData.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col gap-6">
          {step === 1 && <S1 fd={fd} set={handleSet} />}
          {step === 2 && <S2 fd={fd} set={handleSet} />}
          {step === 3 && <S3 fd={fd} set={handleSet} />}
          {step === 4 && <S4 fd={fd} set={handleSet} />}
          {step === 5 && <S5 fd={fd} set={handleSet} />}
          {step === 6 && <S6 fd={fd} set={handleSet} />}
          {step === 7 && <S7 fd={fd} set={handleSet} />}
        </div>

        <div className="flex items-center justify-between mt-6 gap-4">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-1.5">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`rounded-full transition-all duration-300 ${
                  done.has(s.id)
                    ? "w-2 h-2 bg-emerald-500"
                    : step === s.id
                    ? "w-2.5 h-2.5 bg-emerald-300"
                    : "w-1.5 h-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>

          {step < STEPS.length ? (
            <button
              type="button"
              onClick={next}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all"
            >
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

// --- Page Header --------------------------------------------------------------

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
          <p className="text-sm font-semibold text-slate-800">Social Factors — Baseline Standards</p>
        </div>
      </div>
    </header>
  );
}
