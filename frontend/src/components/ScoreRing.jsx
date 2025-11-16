import React from 'react'
export default function ScoreRing({score=0}){
  const size=100, stroke=12
  const r=(size-stroke)/2
  const c=2*Math.PI*r
  const offset=c*(1 - Math.max(0,Math.min(1,score/100)))
  const color = score>=90?'#10b981':score>=70?'#f59e0b':'#ef4444'
  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke="url(#g)" strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="20" fill="#e6eef8">{score}</text>
    </svg>
  )
}
