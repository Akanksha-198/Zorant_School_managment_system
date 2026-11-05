import { useState } from 'react';

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const STUDENTS = [440, 500, 410, 670, 230, 410, 200, 350, 750, 320, 260, 160];
const ADMISSIONS = [24, 41, 35, 27, 43, 24, 17, 31, 23, 23, 12, 16];

// Lightweight responsive SVG combo chart (bars + line), no chart library needed.
export default function StrengthChart() {
  const [hover, setHover] = useState(null);
  const W = 760, H = 300, pad = { l: 44, r: 40, t: 16, b: 34 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const step = iw / MONTHS.length;
  const maxS = 800, maxA = 50;
  const y1 = (v) => pad.t + ih - (v / maxS) * ih;
  const y2 = (v) => pad.t + ih - (v / maxA) * ih;
  const x = (i) => pad.l + step * i + step / 2;
  const line = ADMISSIONS.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y2(v)}`).join(' ');

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Students and new admissions by month" onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id="barg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b824e5" /><stop offset="1" stopColor="#4c0a5d" />
          </linearGradient>
        </defs>
        {[0, 200, 400, 600, 800].map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y1(t)} y2={y1(t)} stroke="var(--border)" />
            <text x={pad.l - 8} y={y1(t) + 4} textAnchor="end" className="ax">{t}</text>
          </g>
        ))}
        {[0, 10, 20, 30, 40, 50].map((t) => (
          <text key={t} x={W - pad.r + 8} y={y2(t) + 4} className="ax">{t}</text>
        ))}
        {STUDENTS.map((v, i) => (
          <g key={i} onMouseEnter={() => setHover(i)}>
            <rect x={x(i) - step * 0.5} y={pad.t} width={step} height={ih} fill="transparent" />
            <rect
              x={x(i) - step * 0.3} y={y1(v)} width={step * 0.6} height={pad.t + ih - y1(v)} rx="4"
              fill="url(#barg)" opacity={hover === null || hover === i ? 1 : 0.55}
              className="bar" style={{ animationDelay: `${i * 40}ms` }}
            />
            <text x={x(i)} y={H - 10} textAnchor="middle" className="ax">{MONTHS[i]}</text>
          </g>
        ))}
        <path d={line} fill="none" stroke="#19d3a0" strokeWidth="2.5" strokeLinejoin="round" />
        {ADMISSIONS.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y2(v)} r={hover === i ? 6 : 4} fill="#fff" stroke="#19d3a0" strokeWidth="2.5" />
        ))}
        {hover !== null && (
          <g transform={`translate(${Math.min(Math.max(x(hover), 90), W - 90)} ${pad.t + 4})`}>
            <rect x="-70" width="140" height="44" rx="8" fill="#17243a" opacity="0.94" />
            <text x="0" y="18" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{MONTHS[hover]}</text>
            <text x="0" y="34" textAnchor="middle" fill="#cfe0f5" fontSize="11">{STUDENTS[hover]} students · {ADMISSIONS[hover]} new</text>
          </g>
        )}
      </svg>
      <div className="legend">
        <span><i style={{ background: '#2f8be0' }} /> Students</span>
        <span><i style={{ background: '#19d3a0' }} /> New admissions</span>
      </div>
    </div>
  );
}
