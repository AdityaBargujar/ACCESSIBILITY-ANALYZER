import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function ScoreChart({ score = 0, label = "Score" }) {
  const data = [
    { name: "score", value: score },
    { name: "rest", value: 100 - score },
  ];

  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: "A", color: "#10b981", bgGrade: "bg-green-500/20", textGrade: "text-green-300" };
    if (score >= 80) return { grade: "B", color: "#3b82f6", bgGrade: "bg-blue-500/20", textGrade: "text-blue-300" };
    if (score >= 70) return { grade: "C", color: "#f59e0b", bgGrade: "bg-amber-500/20", textGrade: "text-amber-300" };
    if (score >= 60) return { grade: "D", color: "#ef5350", bgGrade: "bg-orange-500/20", textGrade: "text-orange-300" };
    return { grade: "F", color: "#dc2626", bgGrade: "bg-red-500/20", textGrade: "text-red-300" };
  };

  const gradeInfo = getGradeInfo(score);

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
          <Cell fill={gradeInfo.color} />
          <Cell fill="#1f2937" />
        </Pie>
      </PieChart>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-3xl font-bold text-white">{score}</div>
        <div className={`${gradeInfo.bgGrade} ${gradeInfo.textGrade} px-3 py-1 rounded-lg font-bold text-lg border border-opacity-30`}>
          {gradeInfo.grade}
        </div>
      </div>
    </div>
  );
}
