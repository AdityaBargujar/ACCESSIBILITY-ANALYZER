import { useState } from 'react';
import IssueHelp from './IssueHelp';

export default function IssueCard({ issue }) {
  const [showHelp, setShowHelp] = useState(false);
  
  // Determine severity based on issue ID
  const getSeverity = (id) => {
    const idLower = (id || "").toLowerCase();
    if (
      idLower.includes("missing-alt") ||
      idLower.includes("missing-lang") ||
      idLower.includes("missing-title") ||
      idLower.includes("noindex") ||
      idLower.includes("missing-viewport")
    ) {
      return "critical";
    }
    if (
      idLower.includes("h1") ||
      idLower.includes("meta-desc") ||
      idLower.includes("canonical") ||
      idLower.includes("og-tags")
    ) {
      return "major";
    }
    return "minor";
  };

  const severity = getSeverity(issue.id);
  const severityConfig = {
    critical: { topBorder: "border-t-red-500", badge: "bg-red-50 text-red-600 border border-red-100", icon: "🔴", iconBg: "bg-red-50 border border-red-100" },
    major: { topBorder: "border-t-orange-400", badge: "bg-orange-50 text-orange-600 border border-orange-100", icon: "🟠", iconBg: "bg-orange-50 border border-orange-100" },
    minor: { topBorder: "border-t-blue-500", badge: "bg-blue-50 text-blue-600 border border-blue-100", icon: "🔵", iconBg: "bg-blue-50 border border-blue-100" }
  };

  const config = severityConfig[severity];

  return (
    <div className={`bg-white border border-gray-100 border-t-4 ${config.topBorder} p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full`}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 ${config.iconBg} rounded-full flex items-center justify-center text-lg shrink-0 shadow-sm`}>
            {config.icon}
          </div>
          <h3 className="font-black text-[15px] text-[#0a1024] leading-tight word-break line-clamp-2">
            {issue.id?.replace(/-/g, " ").toUpperCase()}
          </h3>
        </div>
      </div>

      {/* Badge */}
      <div className="mb-5">
        <span className={`${config.badge} px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-widest shadow-sm`}>
          {severity}
        </span>
      </div>

      {/* Description */}
      <p className="text-[#4b5563] text-sm leading-relaxed mb-5 line-clamp-3 font-medium">{issue.desc}</p>

      {/* Location */}
      {issue.location && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="text-gray-400 text-[11px] font-bold tracking-widest mb-1.5 uppercase flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Location
          </p>
          <p className="text-[#0a1024] font-mono break-all text-[12px] line-clamp-1 font-semibold">{issue.location}</p>
        </div>
      )}

      {/* Code Snippet */}
      {issue.snippet && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
          <p className="text-gray-400 text-[11px] font-bold tracking-widest mb-1.5 uppercase flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Snippet
          </p>
          <pre className="bg-white p-3 rounded-lg text-xs text-gray-600 overflow-auto max-h-24 border border-gray-200 font-mono shadow-inner">
            {issue.snippet.slice(0, 150)}
          </pre>
        </div>
      )}

      <div className="grow"></div>

      {/* Footer */}
      <div className="mt-4 pt-5 border-t border-gray-100 flex justify-end">
        <button
          onClick={() => setShowHelp(true)}
          className="text-white bg-[#0047ff] hover:bg-[#0038cc] shadow-md shadow-blue-500/20 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Learn More
        </button>
      </div>

      {/* Help Modal */}
      {showHelp && <IssueHelp issueId={issue.id} onClose={() => setShowHelp(false)} />}
    </div>
  );
}
