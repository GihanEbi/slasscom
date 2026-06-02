export default function SocialFactorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <a href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </a>
          <div>
            <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">SLASSCOM · ESG</p>
            <p className="text-sm font-semibold text-slate-800">Social Factors</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-14">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Social Factors
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Environment, Social & Governance (ESG)
            <span className="block text-emerald-600">Baseline Standards — Social Factors</span>
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
            Track and measure social responsibility metrics including labor practices, community engagement, diversity & inclusion, and employee well-being across the IT industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: "Employee Well-being", desc: "Health, safety, and work-life balance programmes" },
            { label: "Diversity & Inclusion", desc: "Gender, ethnicity, and equal opportunity metrics" },
            { label: "Labor Practices", desc: "Fair wages, working hours, and employment standards" },
            { label: "Community Engagement", desc: "CSR initiatives and local community impact" },
            { label: "Training & Development", desc: "Employee upskilling and education investments" },
            { label: "Human Rights", desc: "Supply chain ethics and anti-discrimination policies" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{item.label}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
