import React, { useState } from 'react';

export default function TrendChart({ studentPoints = 85 }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Data points matching the curve in the reference image
  // Scale adjusted for realistic student cumulative / monthly points
  const data = [
    { month: 'Jan', value: 350, displayPts: 15 },
    { month: 'Feb', value: 820, displayPts: 25 },
    { month: 'Mar', value: 580, displayPts: 20 },
    { month: 'Apr', value: 1220, displayPts: 35 },
    { month: 'May', value: 1040, displayPts: 25 },
    { month: 'Jun', value: 1480, displayPts: 40 },
  ];

  // SVG dimensions
  const width = 640;
  const height = 210;
  const paddingX = 45;
  const paddingY = 30;

  const maxValue = 1600;

  // Map values to coordinates
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.value / maxValue) * (height - paddingY * 2);
    return { ...d, x, y };
  });

  // Generate smooth SVG bezier curve path
  const createSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);

  // Closed area path for background gradient fill
  const firstPt = points[0];
  const lastPt = points[points.length - 1];
  const areaPath = `${linePath} L ${lastPt.x} ${height - paddingY} L ${firstPt.x} ${height - paddingY} Z`;

  return (
    <div className="card-dark p-5 flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            POINTS EARNING TREND
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            (Last 6 Months)
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Consistent Growth</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 sm:h-52 select-none overflow-visible"
        >
          <defs>
            {/* Emerald Gradient for the area under curve */}
            <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
            </linearGradient>

            {/* Glowing line filter */}
            <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10b981" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Horizontal Grid lines and Y-axis labels */}
          {[0, 500, 1000, 1500].map((val) => {
            const y = height - paddingY - (val / maxValue) * (height - paddingY * 2);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#1c2432"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9.5"
                  fontFamily="sans-serif"
                  fontWeight="500"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#emeraldGradient)" />

          {/* Smooth Line Curve with Glow */}
          <path
            d={linePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#emeraldGlow)"
          />

          {/* Data Points and Interactivity */}
          {points.map((pt, idx) => {
            const isHovered = hoveredPoint === idx;
            return (
              <g key={pt.month}>
                {/* Invisible hover hotspot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="14"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Visible Data Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? '5' : '3.5'}
                  fill="#10b981"
                  stroke="#0f1721"
                  strokeWidth="2"
                  className="transition-all duration-150 pointer-events-none"
                />

                {/* X-axis Month Label */}
                <text
                  x={pt.x}
                  y={height - 8}
                  textAnchor="middle"
                  fill={isHovered ? '#10b981' : '#64748b'}
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight={isHovered ? '700' : '500'}
                  className="transition-colors duration-150"
                >
                  {pt.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint !== null && (
          <div
            className="absolute z-20 pointer-events-none bg-[#111722] border border-emerald-500/40 px-2.5 py-1.5 rounded-lg shadow-xl shadow-emerald-950/60 text-center transform -translate-x-1/2 -translate-y-full transition-all duration-150"
            style={{
              left: `${(points[hoveredPoint].x / width) * 100}%`,
              top: `${(points[hoveredPoint].y / height) * 100 - 8}%`,
            }}
          >
            <p className="text-[10px] text-slate-400">{points[hoveredPoint].month} Activity</p>
            <p className="text-xs font-bold text-emerald-400">
              +{points[hoveredPoint].displayPts} Points
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
