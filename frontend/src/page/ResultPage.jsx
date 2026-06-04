import { useLocation, Link } from "react-router-dom";
import ScoreChart from "../components/ScoreChart";
import IssueCard from "../components/IssueCard";
import SuggestionCard from "../components/SuggestionCard";

export default function ResultPage() {
  const location = useLocation();
  const audit = location.state;
  
  if (!audit) return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#0a1024] flex flex-col items-center justify-center font-sans">
      <p className="text-xl text-gray-500 mb-4">No audit data found</p>
      <Link to="/" className="text-[#0047ff] font-bold hover:underline">
        ← Back to Home
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#0a1024] font-sans pb-20">
      
      {/* UPPER BLUE DIV */}
      <div className="bg-[#0b172a] pt-4 pb-48 px-6">
        {/* Navbar */}
        <nav className="flex items-center justify-between max-w-7xl mx-auto mb-10">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="flex items-center text-xl font-bold tracking-tight text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#ff6a00] mr-2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              accessiAnalyzer
            </div>
          </Link>
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="bg-white rounded-full flex items-center px-4 py-2">
              <span className="text-gray-400 mr-2">🌐</span>
              <span className="text-gray-600 text-sm truncate">{audit.url}</span>
            </div>
          </div>
          <Link to="/" className="text-sm font-bold text-white hover:text-gray-300 transition-colors tracking-wider">
            ✕ CLOSE
          </Link>
        </nav>

        {/* Header Text */}
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Accessibility Scan Results
          </h1>
          <p className="text-gray-400 text-lg">
            Detailed breakdown of WCAG and SEO compliance for your website.
          </p>
        </div>
      </div>

      {/* OVERLAPPING CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
        
        {/* Giant White Overlapping Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-10 mb-8 border border-gray-100 flex flex-col md:flex-row items-center justify-around gap-8">
          <ScoreChart score={audit.wcag.score} label="Accessibility Score" />
          
          <div className="hidden md:block w-px h-40 bg-gray-100"></div>

          <ScoreChart score={audit.seo.score} label="SEO Score" />
          
          <div className="hidden md:block w-px h-40 bg-gray-100"></div>

          <ScoreChart score={audit.overall.score} label="Overall Score" />
        </div>

        {/* Talk to Expert CTA (Matching Screenshot) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-[#0a1024] text-xl mb-1">Talk to an accessibility expert</h3>
            <p className="text-[#4b5563] text-sm leading-relaxed">
              High-traffic sites carry higher legal and brand risk.<br/>
              Book a meeting to see how we support accessibility and compliance.
            </p>
          </div>
          <button className="bg-[#0047ff] hover:bg-[#0038cc] text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20">
            Schedule a Demo
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        {/* Issue Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-xl flex items-center justify-between group hover:border-red-200 transition-colors">
            <div>
              <p className="text-[#0a1024] font-bold text-lg mb-1 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Critical Issues
              </p>
              <p className="text-sm text-gray-500 font-medium">Must fix immediately</p>
            </div>
            <p className="text-5xl font-black text-red-500">{(audit.wcag.breakdown?.critical || 0) + (audit.seo.breakdown?.critical || 0)}</p>
          </div>
          
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-xl flex items-center justify-between group hover:border-orange-200 transition-colors">
            <div>
              <p className="text-[#0a1024] font-bold text-lg mb-1 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                Major Issues
              </p>
              <p className="text-sm text-gray-500 font-medium">Fix as soon as possible</p>
            </div>
            <p className="text-5xl font-black text-orange-400">{(audit.wcag.breakdown?.major || 0) + (audit.seo.breakdown?.major || 0)}</p>
          </div>
        </div>

        {/* Accessibility Issues List */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0a1024]">Accessibility Issues</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
              WCAG 2.1
            </span>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-1 gap-4">
              {audit.wcag.issues.length > 0 ? (
                audit.wcag.issues.map((issue, i) => (
                  <IssueCard key={i} issue={issue} />
                ))
              ) : (
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center text-green-700 font-bold flex items-center justify-center gap-3">
                  <span className="text-2xl">✅</span>
                  No accessibility issues found! Great job.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO Issues List */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0a1024]">SEO Issues</h2>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
              BEST PRACTICES
            </span>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-1 gap-4">
              {audit.seo.issues.length > 0 ? (
                audit.seo.issues.map((issue, i) => (
                  <IssueCard key={i} issue={issue} />
                ))
              ) : (
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center text-green-700 font-bold flex items-center justify-center gap-3">
                  <span className="text-2xl">✅</span>
                  No SEO issues found! Great job.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-[#0a1024] flex items-center gap-2">
              <span>✨</span> AI Actionable Suggestions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {audit.suggestions.length > 0 ? (
                audit.suggestions.map((s, i) => (
                  <SuggestionCard key={i} s={s} />
                ))
              ) : (
                <div className="col-span-2 text-gray-500 text-center bg-gray-50 border border-gray-100 p-6 rounded-xl">No AI suggestions available.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
