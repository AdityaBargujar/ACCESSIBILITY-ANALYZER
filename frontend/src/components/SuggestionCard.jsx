export default function SuggestionCard({ s }) {
  return (
    <div className="bg-white border border-green-100 p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-white pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-5 relative z-10">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm border border-green-200 group-hover:scale-110 transition-transform">
          💡
        </div>
        <h3 className="font-black text-[17px] text-[#0a1024] leading-snug mt-1">
          {s.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[#4b5563] text-[15px] leading-relaxed mb-6 font-medium relative z-10">
        {s.text}
      </p>

      <div className="grow"></div>

      {/* References/Tags */}
      {s.references && s.references.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-5 border-t border-gray-100 relative z-10">
          {s.references.map((ref, i) => (
            <span
              key={i}
              className="bg-gray-50 text-gray-600 border border-gray-200 text-[11px] px-3 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-sm"
            >
              {ref}
            </span>
          ))}
        </div>
      )}

      {/* Source Badge */}
      <div className="mt-5 pt-4 border-t border-gray-100 relative z-10">
        {s.source === 'ai' ? (
          <div className="flex items-center gap-2 text-xs text-[#0047ff] font-bold bg-blue-50 border border-blue-100 w-max px-3 py-1.5 rounded-lg shadow-sm">
            <span>✨</span> AI GENERATED
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-gray-500 font-bold bg-gray-50 border border-gray-200 w-max px-3 py-1.5 rounded-lg shadow-sm">
            <span>⚙️</span> AUTOMATED RULE
          </div>
        )}
      </div>
    </div>
  );
}
