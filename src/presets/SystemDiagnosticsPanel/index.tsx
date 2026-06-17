import { loopCos, loopSin } from "../../utils/animation";
import { getPresetColors, getPresetColorStyle } from "../../render/presetStyle";
import { SimpleHudFrame } from "../../render/SimpleHudFrame";
import type { PresetComponent } from "../../render/types";

const gauges = [
  { label: "POWER", value: 98, phase: 0.02 },
  { label: "SHIELDS", value: 94, phase: 0.2 },
  { label: "HULL INTEGRITY", value: 96, phase: 0.38 },
  { label: "SYSTEMS", value: 97, phase: 0.58 },
];

const gaugeRadius = 42;
const gaugeCircumference = Math.PI * gaugeRadius * 2;

export const SystemDiagnosticsPanel: PresetComponent = ({ props, context }) => {
  const { progress } = context;
  const colors = getPresetColors(props.params);
  const statusPulse = 0.52 + Math.abs(loopSin(progress, 0.16)) * 0.32;

  return (
    <svg
      className="preset-svg system-diagnostics-svg"
      viewBox="0 0 760 300"
      role="img"
      style={getPresetColorStyle(props.params)}
    >
      <defs>
        <linearGradient id="systemDiagnosticsBar" x1="0" x2="1">
          <stop offset="0%" stopColor="#5a48ff" />
          <stop offset="56%" stopColor="#976cff" />
          <stop offset="100%" stopColor="#ca9bff" />
        </linearGradient>
        <linearGradient id="systemDiagnosticsArc" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#6f8cff" />
          <stop offset="54%" stopColor="#8ec9ff" />
          <stop offset="100%" stopColor="#eaf7ff" />
        </linearGradient>
        <filter id="systemDiagnosticsGlow" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="systemDiagnosticsSoftGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="systemDiagnosticsScanlines" width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 0 H7" stroke="#9ebdff" strokeOpacity="0.055" />
        </pattern>
      </defs>

      <SimpleHudFrame idPrefix="systemDiagnostics" width={760} height={300} title="SYSTEM DIAGNOSTICS" progress={progress} colors={colors}>
        <text x="584" y="42" className="ui-caption" opacity="0.5">JUPITER SYSTEM</text>
        <g transform="translate(558 62)" filter="url(#systemDiagnosticsGlow)">
          <path d="M0 0 H154 L168 12 H16 Z" fill="url(#systemDiagnosticsBar)" opacity={0.56 + Math.abs(loopSin(progress, 0.08)) * 0.26} />
          <path d="M20 12 H166" stroke="#d9c7ff" strokeOpacity="0.2" />
        </g>

        <g transform="translate(640 101)" fill={colors.highlightTextColor} filter="url(#systemDiagnosticsGlow)">
          <path d="M0 8 L6 1 L12 8 Z" opacity={statusPulse} />
          <rect x="31" y="5" width="11" height="5" rx="1.5" opacity={0.36 + Math.abs(loopSin(progress, 0.34)) * 0.34} />
          <path d="M73 8 L79 1 L85 8 Z" opacity={0.3 + Math.abs(loopSin(progress, 0.58)) * 0.36} />
        </g>

        <g transform="translate(72 142)">
          {gauges.map((gauge, index) => {
            const x = index * 162;
            const loadPulse = 0.965 + Math.max(0, loopSin(progress, gauge.phase)) * 0.035;
            const arcLength = gaugeCircumference * (gauge.value / 100) * loadPulse;
            const sparkAngle = (progress + gauge.phase) * Math.PI * 2;
            const sparkX = 58 + Math.cos(sparkAngle - Math.PI / 2) * gaugeRadius;
            const sparkY = 18 + Math.sin(sparkAngle - Math.PI / 2) * gaugeRadius;
            const halo = 0.42 + Math.abs(loopCos(progress, gauge.phase)) * 0.2;

            return (
              <g key={gauge.label} transform={`translate(${x} 0)`}>
                <circle cx="58" cy="18" r="57" fill="#07101e" opacity="0.68" filter="url(#systemDiagnosticsSoftGlow)" />
                <circle cx="58" cy="18" r="54" fill="none" stroke="#385083" strokeOpacity="0.44" strokeWidth="5" />
                <circle cx="58" cy="18" r="44" fill="#060a14" stroke={colors.lineColor} strokeOpacity="0.24" strokeWidth="2" />
                <circle
                  cx="58"
                  cy="18"
                  r={gaugeRadius}
                  fill="none"
                  stroke="url(#systemDiagnosticsArc)"
                  strokeWidth="8"
                  strokeLinecap="butt"
                  strokeDasharray={`${arcLength} ${gaugeCircumference - arcLength}`}
                  strokeDashoffset={-gaugeCircumference * 0.1}
                  transform="rotate(-90 58 18)"
                  opacity={0.72 + halo * 0.28}
                  filter="url(#systemDiagnosticsGlow)"
                />
                <circle cx={sparkX} cy={sparkY} r="3.2" fill="#eef8ff" opacity={0.5 + halo * 0.35} filter="url(#systemDiagnosticsGlow)" />
                <circle cx="58" cy="18" r="32" fill="none" stroke="#7188bd" strokeOpacity="0.2" />
                <text x="58" y="25" className="ui-title" textAnchor="middle" fontSize="26">
                  {gauge.value}%
                </text>
                <text x="58" y="104" className="ui-small" textAnchor="middle" opacity="0.74">
                  {gauge.label}
                </text>
              </g>
            );
          })}
        </g>
      </SimpleHudFrame>
    </svg>
  );
};
