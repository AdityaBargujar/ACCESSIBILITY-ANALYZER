import React from "react";
import { useLocation, Link } from "react-router-dom";
import ScoreChart from "../components/ScoreChart";
import IssueCard from "../components/IssueCard";
import SuggestionCard from "../components/SuggestionCard";

export default function ResultPage() {
  const location = useLocation();
  const audit = location.state;
  
  if (!audit) return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center">
      <p className="text-xl text-gray-300 mb-4">No audit data found</p>
      <Link to="/" className="text-blue-400 underline hover:text-blue-300">
        ← Back to Home
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10 relative">

      {/* Back */}
      <Link to="/" className="text-blue-400 underline hover:text-blue-300">
        ← Back to Home
      </Link>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-center mt-6 mb-14 bg-linear-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
        Audit Report
      </h1>

      {/* Score Section - Grid Layout */}
      <div className="grid md:grid-cols-3 gap-8 mb-14 place-items-center">
        <ScoreChart score={audit.wcag.score} label="Accessibility" />
        <ScoreChart score={audit.seo.score} label="SEO" />
        <ScoreChart score={audit.overall.score} label="Overall" />
      </div>

      {/* Issue Summary Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
          <p className="text-red-300 font-semibold mb-1">🔴 Critical Issues</p>
          <p className="text-3xl font-bold text-white">{(audit.wcag.breakdown?.critical || 0) + (audit.seo.breakdown?.critical || 0)}</p>
          <p className="text-xs text-gray-400 mt-1">Fix these immediately</p>
        </div>
        
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
          <p className="text-amber-300 font-semibold mb-1">🟠 Major Issues</p>
          <p className="text-3xl font-bold text-white">{(audit.wcag.breakdown?.major || 0) + (audit.seo.breakdown?.major || 0)}</p>
          <p className="text-xs text-gray-400 mt-1">Fix soon</p>
        </div>
      </div>

      {/* How to Fix Issues Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-12">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-blue-300">How to Use This Report</p>
            <p className="text-sm text-gray-300 mt-1">
              Each issue card shows what's wrong, where to find it, and how to fix it. Click <strong>"Learn More"</strong> for detailed explanations and code examples.
              Start with <strong>red (critical) issues</strong>, then work on <strong>orange (major) issues</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Accessibility Issues */}
      <h2 className="text-3xl font-bold mb-4">Accessibility Issues</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {audit.wcag.issues.length > 0 ? (
          audit.wcag.issues.map((issue, i) => (
            <IssueCard key={i} issue={issue} />
          ))
        ) : (
          <p className="text-gray-400">No accessibility issues found.</p>
        )}
      </div>

      {/* SEO Issues */}
      <h2 className="text-3xl font-bold mb-4">SEO Issues</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {audit.seo.issues.length > 0 ? (
          audit.seo.issues.map((issue, i) => (
            <IssueCard key={i} issue={issue} />
          ))
        ) : (
          <p className="text-gray-400">No SEO issues found.</p>
        )}
      </div>

      {/* Suggestions */}
      <h2 className="text-3xl font-bold mb-4">AI Suggestions</h2>
      <div className="grid md:grid-cols-3 gap-4 pb-12">
        {audit.suggestions.map((s, i) => (
          <SuggestionCard key={i} s={s} />
        ))}
      </div>

    </div>
  );
}
