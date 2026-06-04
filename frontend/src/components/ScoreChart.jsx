import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function ScoreChart({ score = 0, label = "Score" }) {
  const data = [
    { name: "score", value: score },
    { name: "rest", value: 100 - score },
  ];

  // choose a color based on score range
  const color = score >= 90 ? "#10b981" : score >= 75 ? "#3b82f6" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[200px] hover:scale-105 transition-transform duration-300">
      <div className="relative flex items-center justify-center mb-4">
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={70}
            innerRadius={55}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#f1f5f9" />
          </Pie>
        </PieChart>
        
        {/* Score in center */}
        <div className="absolute flex flex-col items-center justify-center mt-1">
          <span className="text-4xl font-black text-[#0a1024] leading-none">{score}</span>
        </div>
      </div>
      
      <h3 className="text-[14px] font-bold text-[#0a1024]">{label}</h3>
    </div>
  );
}
