import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function runAudit() {
    if (!url) return;
    setLoading(true);

    const resp = await fetch("http://localhost:4000/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await resp.json();
    setLoading(false);
    navigate("/results", { state: data });
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center px-4">
      
      {/* Title */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-center bg-linear-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg mb-6">
        Accessibility Analyzer
      </h1>

     

      {/* Glassmorphic Box */}
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-8 rounded-3xl w-full max-w-2xl">
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="https://example.com"
            className="flex-1 p-4 rounded-xl bg-[#0d1117] border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={runAudit}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition px-10 py-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            {loading ? "Scanning..." : "Scan"}
          </button>
        </div>
      </div>

      <p className="text-gray-500 mt-10">
        WCAG • SEO Analyzer 
      </p>
    </div>
  );
}
