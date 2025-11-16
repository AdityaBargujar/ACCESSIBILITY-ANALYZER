import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function ScoreChart({ score = 0, label = "Score" }) {
  const data = [
    { name: "score", value: score },
    { name: "rest", value: 100 - score },
  ];

  // choose a neutral color based on score range (no letter grades)
  const color = score >= 90 ? "#10b981" : score >= 75 ? "#3b82f6" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">{label}</h3>

      <PieChart width={140} height={140}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={60}
          innerRadius={42}
          startAngle={90}
          endAngle={-270}
        >
          <Cell fill={color} />
          <Cell fill="#1f2937" />
        </Pie>
      </PieChart>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-3xl font-bold text-white">{score}</div>
      </div>
    </div>
  );
}
