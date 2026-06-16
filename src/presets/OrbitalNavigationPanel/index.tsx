import { loopCos, loopSin } from "../../utils/animation";
import type { PresetComponent } from "../../render/types";

export const OrbitalNavigationPanel: PresetComponent = ({ context }) => {
  const { progress } = context;
  const glow = 0.55 + loopSin(progress) * 0.18;
  const scanOffset = -120 + progress * 240;
  const points = [0, 0.25, 0.5, 0.72].map((phase, index) => {
    const radiusX = 74 + index * 24;
    const radiusY = 38 + index * 13;
    const cx = 260 + loopCos(progress, phase) * radiusX;
    const cy = 182 + loopSin(progress, phase) * radiusY;

    return { cx, cy };
  });

  return (
    <svg className="preset-svg orbital-svg" viewBox="0 0 520 430" role="img">
      <defs>
        <linearGradient id="orbitalGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#16224a" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#100822" stopOpacity="0.58" />
        </linearGradient>
        <linearGradient id="orbitalTrace" x1="0" x2="1">
          <stop offset="0%" stopColor="#5ee7ff" stopOpacity="0" />
          <stop offset="45%" stopColor="#786dff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d45cff" stopOpacity="0.2" />
        </linearGradient>
        <filter id="orbitalGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="1" y="1" width="518" height="428" rx="7" fill="url(#orbitalGlass)" />
      <rect
        x="1.5"
        y="1.5"
        width="517"
        height="427"
        rx="7"
        fill="none"
        stroke="#7a8cff"
        strokeOpacity={glow}
      />
      <path d="M28 64 H492 M28 365 H492" stroke="#4ec9ff" strokeOpacity="0.28" />
      <text x="28" y="42" className="ui-title">ORBITAL NAVIGATION</text>
      <text x="28" y="395" className="ui-caption">PROJECT: QL-020170</text>

      <g transform="translate(0 4)">
        {[0, 1, 2, 3].map((ring) => (
          <ellipse
            key={ring}
            cx="260"
            cy="182"
            rx={72 + ring * 28}
            ry={38 + ring * 15}
            fill="none"
            stroke="#78dcff"
            strokeOpacity={0.18 + ring * 0.04}
          />
        ))}
        <circle cx="260" cy="182" r="28" fill="#17285b" stroke="#8a6cff" strokeOpacity="0.85" />
        <circle cx="260" cy="182" r="10" fill="#8a6cff" opacity="0.8" filter="url(#orbitalGlow)" />
        <path
          d={`M${140 + scanOffset} 214 C215 116, 322 250, ${410 + scanOffset * 0.25} 140`}
          fill="none"
          stroke="url(#orbitalTrace)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />
        {points.map((point, index) => (
          <circle
            key={`${point.cx}-${index}`}
            cx={point.cx}
            cy={point.cy}
            r={index === 0 ? 5 : 4}
            fill={index === 2 ? "#39f5d7" : "#69cfff"}
            opacity={0.82}
            filter="url(#orbitalGlow)"
          />
        ))}
      </g>

      <g className="status-lines" transform="translate(30 300)">
        {[
          "ORBIT STATUS: STABLE",
          "TRAJECTORY: OPTIMAL",
          "ETA TO LEO: 02:17:43",
        ].map((label, index) => (
          <g key={label} transform={`translate(0 ${index * 24})`}>
            <circle
              cx="5"
              cy="-4"
              r={3 + (index === 0 ? Math.abs(loopSin(progress)) * 1.2 : 0)}
              fill="#39f5d7"
              opacity={0.72 + Math.abs(loopSin(progress, index * 0.15)) * 0.2}
            />
            <text x="18" y="0" className="ui-small">{label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
};
