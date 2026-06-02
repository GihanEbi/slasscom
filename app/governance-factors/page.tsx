"use client";

import { useState } from "react";

type FD = Record<string, string>;

const TOTAL = 22;

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 focus:bg-white transition";
const textareaCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 focus:bg-white transition resize-none";
const selectCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 focus:bg-white transition cursor-pointer appearance-none pr-10";
const labelCls = "block text-sm font-semibold text-slate-700 mb-1.5 leading-snug";
const subGroupCls = "pl-5 border-l-2 border-violet-100 space-y-3 mt-2";

function TF({
  id, label, fd, set, rows = 3,
}: {
  id: string; label?: string; fd: FD; set: (k: string, v: string) => void; rows?: number;
}) {
  return (
    <div className="space-y-1">
      {label && <label className={labelCls} htmlFor={id}>{label}</label>}
      <textarea
        id={id} rows={rows} className={textareaCls}
        placeholder="Enter your response..."
        value={fd[id] || ""}
        onChange={(e) => set(id, e.target.value)}
      />
    </div>
  );
}

function IF({
  id, label, fd, set,
}: {
  id: string; label?: string; fd: FD; set: (k: string, v: string) => void;
}) {
  return (
    <div className="space-y-1">
      {label && <label className={labelCls} htmlFor={id}>{label}</label>}
      <input
        id={id} type="text" className={inputCls}
        placeholder="Enter your response..."
        value={fd[id] || ""}
        onChange={(e) => set(id, e.target.value)}
      />
    </div>
  );
}

function SF({
  id, label, options, fd, set,
}: {
  id: string; label?: string; options: string[]; fd: FD; set: (k: string, v: string) => void;
}) {
  const val = fd[id] || "";
  const isOther = val.toLowerCase() === "other";
  return (
    <div className="space-y-1">
      {label && <label className={labelCls} htmlFor={id}>{label}</label>}
      <div className="relative">
        <select
          id={id} className={selectCls} value={val}
          onChange={(e) => set(id, e.target.value)}
        >
          <option value="">Select one...</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
      </div>
      {isOther && (
        <input
          type="text" className={inputCls + " mt-2"}
          placeholder="Please specify..."
          value={fd[id + "_other"] || ""}
          onChange={(e) => set(id + "_other", e.target.value)}
        />
      )}
    </div>
  );
}

function SectionHeading({ n, title }: { n: number; title?: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-slate-100">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {n}
        </span>
        <div>
          <p className="text-xs font-bold text-violet-500 uppercase tracking-widest">
            Section {n} of {TOTAL}
          </p>
          {title && <h2 className="text-lg font-bold text-slate-800">{title}</h2>}
        </div>
      </div>
    </div>
  );
}

function SubGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
      <div className={subGroupCls}>{children}</div>
    </div>
  );
}

function SubItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</p>
      {children}
    </div>
  );
}

function GroupHeading({ title }: { title: string }) {
  return (
    <p className="text-sm font-bold text-slate-700 mt-2 mb-3 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-violet-400 inline-block" />
      {title}
    </p>
  );
}

export default function GovernanceFactorsPage() {
  const [current, setCurrent] = useState(1);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [fd, setFD] = useState<FD>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setFD((prev) => ({ ...prev, [k]: v }));
  const pct = Math.round((done.size / TOTAL) * 100);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNext = () => {
    setDone((prev) => new Set([...prev, current]));
    if (current < TOTAL) {
      setCurrent((c) => c + 1);
    } else {
      setSubmitted(true);
    }
    scrollTop();
  };

  const handlePrev = () => {
    if (current > 1) setCurrent((c) => c - 1);
    scrollTop();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-200">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Submitted!</h2>
          <p className="text-slate-500 mb-2">All 22 governance sections have been completed.</p>
          <p className="text-sm text-violet-600 font-medium mb-8">Your ESG governance report has been recorded.</p>
          <button
            onClick={() => { setCurrent(1); setDone(new Set()); setSubmitted(false); setFD({}); }}
            className="px-8 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition shadow-sm"
          >
            Start New Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Sticky header + progress */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-5 py-3">
          <div className="flex items-center gap-3 mb-3">
            <a
              href="/"
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition flex-shrink-0"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </a>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-semibold tracking-widest uppercase">SLASSCOM · ESG Governance</p>
              <p className="text-sm font-semibold text-slate-800 truncate">Governance Factors Reporting Form</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-slate-400">Progress</p>
              <p className="text-sm font-bold text-violet-600">{done.size} / {TOTAL}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{pct}% complete</span>
              <span>Section {current} of {TOTAL}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-8">
        {/* Section dots navigator */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrent(n)}
              title={`Section ${n}`}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                done.has(n)
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-200"
                  : n === current
                  ? "bg-violet-100 text-violet-700 ring-2 ring-violet-400 ring-offset-1"
                  : "bg-white text-slate-400 border border-slate-200 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              {done.has(n) ? (
                <svg className="w-3 h-3 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : n}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 overflow-hidden">
          <div className="p-8 space-y-6">

            {/* ── SECTION 1 ── */}
            {current === 1 && (
              <>
                <SectionHeading n={1} title="GOVERNANCE" />
                <GroupHeading title="Organizational Details" />
                <IF id="s1_legal_name" label="Report organization's legal name:" fd={fd} set={set} />
                <TF id="s1_ownership" label="Report its nature of ownership and legal form:" fd={fd} set={set} />
                <IF id="s1_hq" label="Report the location of its headquarters:" fd={fd} set={set} />
                <TF id="s1_countries" label="Report its countries of operation:" fd={fd} set={set} />

                <GroupHeading title="Entities Included in Sustainability Reporting" />
                <TF id="s1_entities" label="List all its entities included in its sustainability reporting:" fd={fd} set={set} />

                <GroupHeading title="Reporting Period, Frequency and Contact" />
                <SF
                  id="s1_period"
                  label="Specify the reporting period for, and the frequency of, the organization's sustainability reporting:"
                  options={["April 2024 - March 2025", "Jan 2024 - December 2025", "Other"]}
                  fd={fd} set={set}
                />
                <TF
                  id="s1_financial_period"
                  label="Specify the reporting period for its financial reporting and, if it does not align with the period for its sustainability reporting, explain the reason for this:"
                  fd={fd} set={set}
                />
                <IF id="s1_pub_date" label="Report the publication date of the report or reported information:" fd={fd} set={set} />
                <IF id="s1_contact" label="Specify the contact point for questions about the report or reported information:" fd={fd} set={set} />
              </>
            )}

            {/* ── SECTION 2 ── */}
            {current === 2 && (
              <>
                <SectionHeading n={2} title="Governance Structure & Composition" />
                <TF
                  id="s2_structure"
                  label="Describe the organization's governance structure, including committees of the highest governance body:"
                  fd={fd} set={set} rows={4}
                />
                <SF
                  id="s2_committees_select"
                  label="List the committees of the highest governance body that are responsible for decision-making on and overseeing the management of the organization's impacts on the economy, environment, and people:"
                  options={["Board of Directors", "Chairman", "Sustainability Committee", "Audit and Risk", "Other"]}
                  fd={fd} set={set}
                />
                <TF
                  id="s2_committees_detail"
                  label="List the committees of the highest governance body that are responsible for decision-making on and overseeing the management of the organization's impacts on the economy, environment, and people:"
                  fd={fd} set={set} rows={4}
                />
              </>
            )}

            {/* ── SECTION 3 ── */}
            {current === 3 && (
              <>
                <SectionHeading n={3} title="Review and Approval of Reported Information" />
                <TF
                  id="s3_review"
                  label="Report whether the highest governance body is responsible for reviewing and approving the reported information and if so, describe the process for reviewing and approving the information:"
                  fd={fd} set={set} rows={4}
                />
                <TF
                  id="s3_not_responsible"
                  label="If the highest governance body is not responsible for reviewing and approving the reported information, explain the reason for this:"
                  fd={fd} set={set} rows={4}
                />
              </>
            )}

            {/* ── SECTION 4 ── */}
            {current === 4 && (
              <>
                <SectionHeading n={4} title="Policy Commitments" />
                <TF
                  id="s4_policy"
                  label="Describe the organization's policy commitments for responsible business conduct:"
                  fd={fd} set={set} rows={6}
                />
              </>
            )}

            {/* ── SECTION 5 ── */}
            {current === 5 && (
              <>
                <SectionHeading n={5} title="Compliance with Laws and Regulations" />

                <SubGroup label="Report the total number of significant instances of non-compliance with laws and regulations during the reporting period, and a breakdown of this total by:">
                  <SubItem label="i. Instances for which fines were incurred:">
                    <SF id="s5_fines_inst" label="" options={["1","2","3","4","5","None"]} fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Instances for which non-monetary sanctions were incurred:">
                    <SF id="s5_sanctions_inst" label="" options={["1","2","3","4","5","None"]} fd={fd} set={set} />
                  </SubItem>
                </SubGroup>

                <SubGroup label="Report the total number and the monetary value of fines for instances of non-compliance with laws and regulations that were paid during the reporting period, and a breakdown of this total by:">
                  <SubItem label="i. Fines for instances of non-compliance in the current reporting period:">
                    <IF id="s5_fines_current" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Fines for instances of non-compliance in previous reporting periods:">
                    <IF id="s5_fines_prev" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>

                <SubGroup label="Report the total number and the monetary value of fines for instances of non-compliance with laws and regulations that were paid during the reporting period, and a breakdown of this total by:">
                  <SubItem label="i. Fines for instances of non-compliance in the current reporting period:">
                    <IF id="s5_fines_current2" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>

                <SF
                  id="s5_significant"
                  label="Describe the significant instances of non-compliance:"
                  options={["1","2","3","4","5","None"]}
                  fd={fd} set={set}
                />
                <TF
                  id="s5_determination"
                  label="Describe how it has determined significant instances of non-compliance:"
                  fd={fd} set={set}
                />
              </>
            )}

            {/* ── SECTION 6 ── */}
            {current === 6 && (
              <>
                <SectionHeading n={6} title="Anti-Corruption" />
                <SF
                  id="s6_operations_pct"
                  label="Total number and percentage of operations assessed for risks related to corruption:"
                  options={["Less than 10%","Less than 20% - 10%","Less than 50% - 25%","Less than 75% - 50%","More than 75%","100%"]}
                  fd={fd} set={set}
                />
                <TF
                  id="s6_risks"
                  label="Significant risks related to corruption identified through the risk assessment:"
                  fd={fd} set={set}
                />
              </>
            )}

            {/* ── SECTION 7 ── */}
            {current === 7 && (
              <>
                <SectionHeading n={7} title="Restatements of Information" />
                <SubGroup label="Report restatements of information made from previous reporting periods and explain:">
                  <SubItem label="i. The reasons for the restatements:">
                    <TF id="s7_reasons" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. The effect of the restatements:">
                    <TF id="s7_effect" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
              </>
            )}

            {/* ── SECTION 8 ── */}
            {current === 8 && (
              <>
                <SectionHeading n={8} title="Governance Body Composition" />
                <SubGroup label="Describe the composition of the highest governance body and its committees by:">
                  <SubItem label="i. Executive and non-executive members:">
                    <TF id="s8_exec" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Independence:">
                    <TF id="s8_independence" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iii. Tenure of members on the governance body:">
                    <TF id="s8_tenure" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iv. Number of other significant positions and commitments held by each member, and the nature of the commitments:">
                    <TF id="s8_positions" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="v. Gender:">
                    <TF id="s8_gender" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="vi. Under-represented social groups:">
                    <TF id="s8_underrep" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="vii. Competencies relevant to the impacts of the organization:">
                    <TF id="s8_competencies" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="viii. Stakeholder representation:">
                    <TF id="s8_stakeholder" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
              </>
            )}

            {/* ── SECTION 9 ── */}
            {current === 9 && (
              <>
                <SectionHeading n={9} title="Nomination and Selection of the Highest Governance Body" />
                <TF
                  id="s9_process"
                  label="Describe the nomination and selection processes for the highest governance body and its committees:"
                  fd={fd} set={set} rows={4}
                />
                <SubGroup label="Describe the criteria used for nominating and selecting highest governance body members, including whether and how the following are taken into consideration:">
                  <SubItem label="i. Views of stakeholders (including shareholders):">
                    <TF id="s9_stakeholders" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Diversity:">
                    <TF id="s9_diversity" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iii. Independence:">
                    <TF id="s9_independence" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iv. Competencies relevant to the impacts of the organization:">
                    <TF id="s9_competencies" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
              </>
            )}

            {/* ── SECTION 10 ── */}
            {current === 10 && (
              <>
                <SectionHeading n={10} title="Chair of the Highest Governance Body" />
                <TF
                  id="s10_chair_exec"
                  label="Report whether the chair of the highest governance body is also a senior executive in the organization:"
                  fd={fd} set={set} rows={2}
                />
                <TF
                  id="s10_chair_explain"
                  label="If the chair is also a senior executive, explain their function within the organization's management, the reasons for this arrangement, and how conflicts of interest are prevented and mitigated:"
                  fd={fd} set={set} rows={4}
                />
              </>
            )}

            {/* ── SECTION 11 ── */}
            {current === 11 && (
              <>
                <SectionHeading n={11} title="Role of the Highest Governance Body in Overseeing the Management of Impacts" />
                <TF
                  id="s11_role"
                  label="Describe the role of the highest governance body and of senior executives in developing, approving, and updating the organization's purpose, value or mission statements, strategies, policies, and goals related to sustainable development:"
                  fd={fd} set={set} rows={5}
                />
              </>
            )}

            {/* ── SECTION 12 ── */}
            {current === 12 && (
              <>
                <SectionHeading n={12} title="Delegation of Responsibility for Managing Impacts" />
                <SubGroup label="Describe how the highest governance body delegates responsibility for managing the organization's impacts on the economy, environment, and people, including:">
                  <SubItem label="i. Whether it has appointed any senior executives with responsibility for the management of impacts:">
                    <TF id="s12_appointed" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Whether it has delegated responsibility for the management of impacts to other employees:">
                    <TF id="s12_delegated" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
              </>
            )}

            {/* ── SECTION 13 ── */}
            {current === 13 && (
              <>
                <SectionHeading n={13} title="Conflicts of Interest" />
                <TF
                  id="s13_conflicts"
                  label="Describe the processes for the highest governance body to ensure that conflicts of interest are prevented and mitigated:"
                  fd={fd} set={set} rows={5}
                />
              </>
            )}

            {/* ── SECTION 14 ── */}
            {current === 14 && (
              <>
                <SectionHeading n={14} title="Collective Knowledge of the Highest Governance Body" />
                <TF
                  id="s14_knowledge"
                  label="Report measures taken to advance the collective knowledge, skills, and experience of the highest governance body on sustainable development:"
                  fd={fd} set={set} rows={5}
                />
              </>
            )}

            {/* ── SECTION 15 ── */}
            {current === 15 && (
              <>
                <SectionHeading n={15} title="Strategy, Policies and Practices" />
                <GroupHeading title="Statement on Sustainable Development Strategy" />
                <TF
                  id="s15_statement"
                  label="Report a statement from the highest governance body or most senior executive of the organization about the relevance of sustainable development to the organization and its strategy for contributing to sustainable development:"
                  fd={fd} set={set} rows={5}
                />

                <GroupHeading title="Mechanisms for Seeking Advice and Raising Concerns" />
                <SubGroup label="Describe the mechanisms for individuals to:">
                  <SubItem label="i. Seek advice on implementing the organization's policies and practices for responsible business conduct:">
                    <TF id="s15_seek_advice" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Raise concerns about the organization's business conduct:">
                    <TF id="s15_raise_concerns" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>

                <GroupHeading title="Anti-Corruption" />
                <TF
                  id="s15_employees_training"
                  label="Total number and percentage of employees that the organization's anti-corruption policies and procedures have been communicated to, broken down by employee category and region:"
                  fd={fd} set={set}
                />
                <TF
                  id="s15_gov_training"
                  label="Total number and percentage of governance body members that have received training on anti-corruption, broken down by region:"
                  fd={fd} set={set}
                />
              </>
            )}

            {/* ── SECTION 16 ── */}
            {current === 16 && (
              <>
                <SectionHeading n={16} title="Nomination and Selection of the Highest Governance Body" />
                <TF
                  id="s16_process"
                  label="Describe the nomination and selection processes for the highest governance body and its committees:"
                  fd={fd} set={set} rows={4}
                />
                <SubGroup label="Describe the criteria used for nominating and selecting highest governance body members, including whether and how the following are taken into consideration:">
                  <SubItem label="i. Views of stakeholders (including shareholders):">
                    <TF id="s16_stakeholders" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Diversity:">
                    <TF id="s16_diversity" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iii. Independence:">
                    <TF id="s16_independence" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iv. Competencies relevant to the impacts of the organization:">
                    <TF id="s16_competencies" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
              </>
            )}

            {/* ── SECTION 17 ── */}
            {current === 17 && (
              <>
                <SectionHeading n={17} title="Role of the Highest Governance Body in Overseeing the Management of Impacts" />
                <SubGroup label="Describe the role of the highest governance body in overseeing the organization's due diligence and other processes to identify and manage the organization's impacts on the economy, environment, and people, including:">
                  <SubItem label="i. Whether and how the highest governance body engages with stakeholders to support these processes:">
                    <TF id="s17_engage" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. How the highest governance body considers the outcomes of these processes:">
                    <TF id="s17_outcomes" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
                <TF
                  id="s17_effectiveness"
                  label="Describe the role of the highest governance body in reviewing the effectiveness of the organization's processes as described in 2-12-b, and report the frequency of this review:"
                  fd={fd} set={set} rows={4}
                />
              </>
            )}

            {/* ── SECTION 18 ── */}
            {current === 18 && (
              <>
                <SectionHeading n={18} title="Conflicts of Interest" />
                <SubGroup label="Report whether conflicts of interest are disclosed to stakeholders, including, at a minimum, those relating to:">
                  <SubItem label="i. Cross-board membership:">
                    <SF id="s18_cross_board" label="" options={["Yes","No"]} fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Cross-shareholding with suppliers & other stakeholders:">
                    <SF id="s18_cross_share" label="" options={["Yes","No"]} fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iii. Existence of controlling shareholders:">
                    <SF id="s18_controlling" label="" options={["Yes","No"]} fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iv. Related parties, their relationships, transactions, and balances:">
                    <SF id="s18_related" label="" options={["Yes","No"]} fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
              </>
            )}

            {/* ── SECTION 19 ── */}
            {current === 19 && (
              <>
                <SectionHeading n={19} title="Evaluation of the Performance of the Highest Governance Body" />
                <TF
                  id="s19_evaluation"
                  label="Describe the processes for evaluating the performance of the highest governance body in overseeing the management of the organization's impacts on the economy, environment, and people:"
                  fd={fd} set={set} rows={5}
                />
              </>
            )}

            {/* ── SECTION 20 ── */}
            {current === 20 && (
              <>
                <SectionHeading n={20} title="Remuneration Policies" />
                <SubGroup label="Describe the remuneration policies for members of the highest governance body and senior executives, including:">
                  <SubItem label="i. Fixed pay and variable pay:">
                    <TF id="s20_fixed_var" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. Sign-on bonuses or recruitment incentive payments:">
                    <TF id="s20_bonuses" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iii. Termination payments:">
                    <TF id="s20_termination" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iv. Claw backs:">
                    <TF id="s20_clawbacks" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="v. Retirement benefits:">
                    <TF id="s20_retirement" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
                <TF
                  id="s20_relation"
                  label="Describe how the remuneration policies for members of the highest governance body and senior executives relate to their objectives and performance in relation to the management of the organization's impacts on the economy, environment, and people:"
                  fd={fd} set={set} rows={4}
                />
              </>
            )}

            {/* ── SECTION 21 ── */}
            {current === 21 && (
              <>
                <SectionHeading n={21} title="Strategy, Policies and Practices" />
                <SubGroup label="Describe how the organization embeds each of its policy commitments for responsible business conduct throughout its activities and business relationships, including:">
                  <SubItem label="i. How the organization allocates responsibility to implement the commitments across different levels within the organization:">
                    <TF id="s21_allocates" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="ii. How the organization integrates the commitments into organizational strategies, operational policies, and operational procedures:">
                    <TF id="s21_integrates" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iii. How the organization implements its commitments with and through its business relationships:">
                    <TF id="s21_implements" label="" fd={fd} set={set} />
                  </SubItem>
                  <SubItem label="iv. Training that the organization provides on implementing the commitments:">
                    <TF id="s21_training" label="" fd={fd} set={set} />
                  </SubItem>
                </SubGroup>
              </>
            )}

            {/* ── SECTION 22 ── */}
            {current === 22 && (
              <>
                <SectionHeading n={22} title="Anti-Corruption" />
                <TF
                  id="s22_confirmed"
                  label="Total number and nature of confirmed incidents of corruption:"
                  fd={fd} set={set}
                />
                <TF
                  id="s22_dismissed"
                  label="Total number of confirmed incidents in which employees were dismissed or disciplined for corruption:"
                  fd={fd} set={set}
                />
                <TF
                  id="s22_contracts"
                  label="Total number of confirmed incidents when contracts with business partners were terminated or not renewed due to violations related to corruption:"
                  fd={fd} set={set}
                />
                <TF
                  id="s22_legal"
                  label="Public legal cases regarding corruption brought against the organization or its employees during the reporting period and the outcomes of such cases:"
                  fd={fd} set={set} rows={4}
                />
              </>
            )}

          </div>

          {/* Navigation footer */}
          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={current === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <span className="text-sm text-slate-400 font-medium">
              {current} / {TOTAL}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition shadow-sm shadow-violet-200"
            >
              {current === TOTAL ? "Submit Report" : "Next Section"}
              {current < TOTAL ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-12" />
      </main>
    </div>
  );
}
