export default function BaselineMatrixPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <a href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </a>
          <div>
            <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">SLASSCOM · ESG</p>
            <p className="text-sm font-semibold text-slate-800">Baseline Matrix</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-14">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
            </svg>
            Baseline Matrix
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            SLASSCOM
            <span className="block text-blue-600">Baseline Matrix</span>
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
            A comprehensive baseline matrix capturing the current state of the Sri Lanka IT industry&apos;s ESG performance, enabling benchmarking and progress tracking toward Green IT goals.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left px-6 py-4 font-semibold">Category</th>
                <th className="text-left px-6 py-4 font-semibold">Metric</th>
                <th className="text-left px-6 py-4 font-semibold">Baseline</th>
                <th className="text-left px-6 py-4 font-semibold">Target</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { category: "Environmental", metric: "Carbon Emissions", baseline: "—", target: "Net Zero", status: "In Progress" },
                { category: "Environmental", metric: "Energy Consumption", baseline: "—", target: "30% Reduction", status: "Pending" },
                { category: "Social", metric: "Gender Diversity", baseline: "—", target: "40% Women", status: "In Progress" },
                { category: "Social", metric: "Employee Training Hours", baseline: "—", target: "40 hrs/year", status: "Pending" },
                { category: "Governance", metric: "Board Independence", baseline: "—", target: "50% Independent", status: "Pending" },
                { category: "Governance", metric: "ESG Reporting", baseline: "—", target: "Annual Report", status: "In Progress" },
              ].map((row, i) => (
                <tr key={i} className={`border-t border-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-blue-50/40"}`}>
                  <td className="px-6 py-4 font-medium text-slate-700">{row.category}</td>
                  <td className="px-6 py-4 text-slate-600">{row.metric}</td>
                  <td className="px-6 py-4 text-slate-400 italic">{row.baseline}</td>
                  <td className="px-6 py-4 text-slate-600">{row.target}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      row.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
