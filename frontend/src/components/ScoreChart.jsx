import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function ScoreChart({ score = 0, label = "Score" }) {
  const data = [
    { name: "score", value: score },
    { name: "rest", value: 100 - score },
  ];

  const color = score >= 90 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div className="card p-4 flex flex-col items-center" style={{ width: 220 }}>
      <h3 className="text-lg font-semibold mb-2">{label}</h3>

      <PieChart width={160} height={160}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={70}
          innerRadius={50}
          startAngle={90}
          endAngle={-270}
        >
          <Cell fill={color} />
          <Cell fill="#1f2937" />
        </Pie>
      </PieChart>

      <div className="text-2xl font-bold">{score}</div>
    </div>
  );
}
