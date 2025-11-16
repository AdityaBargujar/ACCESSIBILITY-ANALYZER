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
    critical: { bg: "bg-red-500/10", border: "border-red-500/30", badge: "bg-red-500/20 text-red-300", icon: "🔴" },
    major: { bg: "bg-amber-500/10", border: "border-amber-500/30", badge: "bg-amber-500/20 text-amber-300", icon: "🟠" },
    minor: { bg: "bg-blue-500/10", border: "border-blue-500/30", badge: "bg-blue-500/20 text-blue-300", icon: "🔵" }
  };

  const config = severityConfig[severity];

  return (
    <div className={`${config.bg} border ${config.border} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm flex flex-col h-full`}>
      
      {/* Header with Icon and Severity Badge */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl shrink-0">{config.icon}</span>
          <h3 className="font-bold text-lg text-white word-break">
            {issue.id?.replace(/-/g, " ").toUpperCase()}
          </h3>
        </div>
        <span className={`${config.badge} px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0`}>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-3 shrink-0">{issue.desc}</p>

      {/* Location */}
      {issue.location && (
        <div className="mb-3 p-2 bg-black/30 border border-gray-700/50 rounded-lg shrink-0">
          <p className="text-xs text-gray-500 font-semibold mb-1">📍 LOCATION</p>
          <p className="text-xs text-gray-400 font-mono break-all">{issue.location}</p>
        </div>
      )}

      {/* Code Snippet - Scrollable */}
      {issue.snippet && (
        <div className="mb-3 p-3 bg-black/30 border border-gray-700/50 rounded-lg overflow-hidden shrink-0">
          <p className="text-xs text-gray-500 mb-2 font-semibold">CODE SNIPPET</p>
          <pre className="bg-black/50 p-3 rounded-lg text-xs text-gray-400 overflow-auto max-h-32 border border-gray-700/50">
            {issue.snippet}
          </pre>
        </div>
      )}

      {/* Spacer - pushes button to bottom */}
      <div className="grow"></div>

      {/* Footer with Help Button */}
      <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-end shrink-0">
        <button
          onClick={() => setShowHelp(true)}
          className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap"
        >
          ℹ️ Learn More
        </button>
      </div>

      {/* Help Modal */}
      {showHelp && <IssueHelp issueId={issue.id} onClose={() => setShowHelp(false)} />}
    </div>
  );
}
