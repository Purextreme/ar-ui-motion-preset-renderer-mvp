import { loopSin } from "../../utils/animation";
import type { PresetComponent } from "../../render/types";

const statRows = [
  ["DIAMETER", "1,240 m"],
  ["MASS", "128,500 t"],
  ["CREW CAPACITY", "320"],
  ["PROPULSION", "ION DRIVE"],
  ["POWER OUTPUT", "2.4 GW"],
  ["ORBIT", "LEO / 420 km"],
];

export const ShipDetailPanel: PresetComponent = ({ props, context }) => {
  const { progress, previewGuides } = context;
  const accentColor = "#8a6cff";
  const scanlineOpacity = 0.45;
  const floatY = loopSin(progress) * 8;
  const scanY = 110 + progress * 250;
  const glow = 0.45 + Math.abs(loopSin(progress)) * 0.22;

  return (
    <svg className="preset-svg ship-svg" viewBox="0 0 520 760" role="img">
      <defs>
        <linearGradient id="shipGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#10213e" stopOpacity="0.76" />
          <stop offset="100%" stopColor="#160b29" stopOpacity="0.56" />
        </linearGradient>
        <linearGradient id="shipScan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor={accentColor} stopOpacity={scanlineOpacity} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="shipGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="1" y="1" width="518" height="758" rx="7" fill="url(#shipGlass)" />
      <rect
        x="1.5"
        y="1.5"
        width="517"
        height="757"
        rx="7"
        fill="none"
        stroke={accentColor}
        strokeOpacity={glow}
      />
      <path d="M34 86 H486 M34 430 H486" stroke="#64ddff" strokeOpacity="0.28" />
      <text x="34" y="48" className="ui-title">QL-020170</text>
      <text x="34" y="72" className="ui-caption">ORBITAL PLATFORM</text>

      {previewGuides ? (
        <g transform={`translate(76 ${122 + floatY})`}>
          <rect
            x="0"
            y="0"
            width="368"
            height="238"
            rx="10"
            fill="none"
            stroke="#7bdcff"
            strokeDasharray="10 8"
            strokeOpacity="0.5"
          />
          <path d="M18 119 H350 M184 18 V220" stroke="#7bdcff" strokeOpacity="0.18" />
          <text x="184" y="128" textAnchor="middle" className="ui-guide">此处留空</text>
        </g>
      ) : null}

      <rect x="76" y={scanY} width="368" height="38" fill="url(#shipScan)" opacity="0.86" />

      <g transform="translate(34 468)">
        {statRows.map(([label, value], index) => {
          const phase = (progress * statRows.length + index * 0.62) % statRows.length;
          const active = phase > index && phase < index + 1.35;
          const rowOpacity = active ? 0.98 : 0.62;

          return (
            <g key={label} transform={`translate(0 ${index * 42})`}>
              <rect
                x="0"
                y="-20"
                width="452"
                height="30"
                fill={active ? accentColor : "#58cfff"}
                opacity={active ? 0.14 : 0.05}
              />
              <text x="0" y="0" className="ui-small" opacity={rowOpacity}>{label}:</text>
              <text x="220" y="0" className="ui-value" opacity={rowOpacity}>
                {value}
              </text>
            </g>
          );
        })}
      </g>

      <circle cx="482" cy="44" r="4" fill="#39f5d7" opacity={0.6 + Math.abs(loopSin(progress)) * 0.28} filter="url(#shipGlow)" />
    </svg>
  );
};
