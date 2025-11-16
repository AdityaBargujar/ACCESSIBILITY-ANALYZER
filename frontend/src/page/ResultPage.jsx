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

      {/* Score Section */}
      <div className="flex flex-wrap justify-center gap-16 mb-16">
        <ScoreChart score={audit.wcag.score} label="Accessibility Score" />
        <ScoreChart score={audit.seo.score} label="SEO Score" />
        <ScoreChart score={audit.overall.score} label="Overall Score" />
      </div>

      {/* Accessibility Issues */}
      <h2 className="text-3xl font-bold mb-4">Accessibility Issues</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
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
      <div className="grid md:grid-cols-2 gap-6 mb-12">
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
      <div className="grid md:grid-cols-2 gap-6 pb-12">
        {audit.suggestions.map((s, i) => (
          <SuggestionCard key={i} s={s} />
        ))}
      </div>

    </div>
  );
}
