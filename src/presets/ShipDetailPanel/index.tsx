import { loopSin } from "../../utils/animation";
import { toBoolean, toNumber, toStringValue } from "../../utils/math";
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
  const { progress, assets } = context;
  const accentColor = toStringValue(props.params.accentColor, "#8a6cff");
  const shipImageUrl = toStringValue(props.params.shipImageUrl, "") || assets.shipImage;
  const shipX = toNumber(props.params.shipX, 96);
  const shipY = toNumber(props.params.shipY, 108);
  const shipScale = toNumber(props.params.shipScale, 1);
  const scanlineEnabled = toBoolean(props.params.scanlineEnabled, true);
  const scanlineOpacity = toNumber(props.params.scanlineOpacity, 0.45);
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

      <g transform={`translate(${shipX} ${shipY + floatY}) scale(${shipScale})`}>
        {shipImageUrl ? (
          <image href={shipImageUrl} x="0" y="0" width="328" height="230" preserveAspectRatio="xMidYMid meet" />
        ) : (
          <g opacity="0.86">
            <path
              d="M36 128 C96 42, 236 36, 302 128 C228 166, 110 166, 36 128 Z"
              fill="#223a72"
              stroke={accentColor}
              strokeOpacity="0.8"
            />
            <ellipse cx="169" cy="126" rx="102" ry="21" fill="#5a6ca5" opacity="0.45" />
            <circle cx="168" cy="100" r="24" fill="#7bdcff" opacity="0.28" />
          </g>
        )}
      </g>

      {scanlineEnabled ? (
        <rect x="76" y={scanY} width="368" height="38" fill="url(#shipScan)" opacity="0.86" />
      ) : null}

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
