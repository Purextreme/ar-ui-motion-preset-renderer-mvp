import { loopCos, loopSin } from "../../utils/animation";
import { getPresetColors, getPresetColorStyle } from "../../render/presetStyle";
import type { PresetComponent } from "../../render/types";

const CX = 266;
const CY = 158;

const orbits = [
  { rx: 52, ry: 22, rotate: -8, speed: 1.05, phase: 0.05, planetSize: 3.5, planetColor: "#e9f8ff" },
  { rx: 86, ry: 36, rotate: -15, speed: 0.82, phase: 0.28, planetSize: 4.5, planetColor: "#b9d8ff" },
  { rx: 122, ry: 50, rotate: 7, speed: 0.58, phase: 0.6, planetSize: 3.2, planetColor: "#87a4ff" },
  { rx: 168, ry: 68, rotate: -12, speed: 0.42, phase: 0.76, planetSize: 6, planetColor: "#f2f7ff" },
  { rx: 218, ry: 88, rotate: -15, speed: 0.31, phase: 0.18, planetSize: 5, planetColor: "#99c9ff" },
  { rx: 270, ry: 108, rotate: -17, speed: 0.24, phase: 0.52, planetSize: 4, planetColor: "#6578ff" },
];

const stats = [
  ["STAR", "KELVAR-7"],
  ["PLANETS", "5"],
  ["MOONS", "12"],
  ["WAYPOINTS", "3"],
  ["DISTANCE", "2.4 AU"],
];

const guidePaths = [
  "M18 152 C110 26 310 -8 506 62",
  "M28 200 C132 118 244 88 374 92 C428 94 476 112 512 142",
  "M92 78 C186 34 318 32 454 82",
  "M76 242 C186 280 338 276 486 222",
];

const nodes = [
  { x: 96, y: 201, r: 8, strong: true },
  { x: 152, y: 159, r: 2.2 },
  { x: 219, y: 184, r: 2 },
  { x: 334, y: 104, r: 4.5, strong: true },
  { x: 414, y: 152, r: 3.8 },
  { x: 444, y: 42, r: 8, strong: true },
  { x: 498, y: 76, r: 7, strong: true },
  { x: 452, y: 264, r: 5.5 },
];

function getOrbitPoint(orbit: typeof orbits[number], progress: number) {
  const angle = (progress * orbit.speed + orbit.phase) * Math.PI * 2;
  const rotation = orbit.rotate * Math.PI / 180;
  const x = Math.cos(angle) * orbit.rx;
  const y = Math.sin(angle) * orbit.ry;

  return {
    x: CX + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: CY + x * Math.sin(rotation) + y * Math.cos(rotation),
    depth: Math.sin(angle),
  };
}

export const OrbitalOverview: PresetComponent = ({ props, context }) => {
  const { progress } = context;
  const colors = getPresetColors(props.params);
  const accentColor = colors.highlightTextColor;
  const glow = 0.42 + Math.abs(loopSin(progress)) * 0.28;
  const starPulse = 0.76 + Math.abs(loopSin(progress, 0.08)) * 0.24;
  const scanX = 26 + progress * 488;
  const sweepRotation = -12 + loopSin(progress, 0.2) * 3;

  return (
    <svg
      className="preset-svg orbital-overview-svg"
      viewBox="0 0 680 320"
      role="img"
      style={getPresetColorStyle(props.params)}
    >
      <defs>
        <linearGradient id="orbitalOverviewGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#101a3a" stopOpacity="0.88" />
          <stop offset="48%" stopColor="#081326" stopOpacity="0.76" />
          <stop offset="100%" stopColor="#080b1c" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="orbitalOverviewShade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#172755" stopOpacity="0.36" />
          <stop offset="58%" stopColor="#0b142b" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#010511" stopOpacity="0.46" />
        </linearGradient>
        <linearGradient id="orbitalOverviewSweep" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#8fbfff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="orbitalOverviewTrail" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#a9c8ff" stopOpacity="0.54" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.86" />
        </linearGradient>
        <linearGradient id="orbitalOverviewDimTrail" x1="0" x2="1">
          <stop offset="0%" stopColor="#6f85ff" stopOpacity="0" />
          <stop offset="62%" stopColor="#8cc8ff" stopOpacity="0.36" />
          <stop offset="100%" stopColor="#f5fbff" stopOpacity="0.68" />
        </linearGradient>
        <radialGradient id="orbitalOverviewStar" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="24%" stopColor="#fff2ff" stopOpacity="0.96" />
          <stop offset="52%" stopColor="#b38cff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5e6fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orbitalOverviewStarGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffccee" stopOpacity="0.5" />
          <stop offset="54%" stopColor="#7aa9ff" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#2a4dff" stopOpacity="0" />
        </radialGradient>
        <filter id="orbitalOverviewGlow" x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="orbitalOverviewSoftGlow" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="orbitalOverviewPlanetGlow" x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="orbitalOverviewScanlines" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0 H8" stroke="#9dbbff" strokeOpacity="0.07" />
        </pattern>
        <clipPath id="orbitalOverviewClip">
          <rect x="8" y="8" width="664" height="296" rx="7" />
        </clipPath>
      </defs>

      <g clipPath="url(#orbitalOverviewClip)">
        <rect x="8" y="8" width="664" height="296" rx="7" fill="url(#orbitalOverviewGlass)" />
        <rect x="8" y="8" width="664" height="296" rx="7" fill="url(#orbitalOverviewShade)" />
        <rect x="8" y="8" width="664" height="296" rx="7" fill="url(#orbitalOverviewScanlines)" opacity="0.64" />
        <path d="M20 48 H650 M20 270 H650 M90 8 V304 M198 8 V304 M506 8 V304" stroke={colors.lineColor} strokeOpacity="0.055" />
        {guidePaths.map((path, index) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={colors.lineColor}
            strokeOpacity={0.08 + index * 0.018}
            strokeWidth="1"
            strokeDasharray={index % 2 === 0 ? "9 9" : undefined}
          />
        ))}
        <rect x={scanX} y="8" width="42" height="296" fill="url(#orbitalOverviewSweep)" opacity="0.24" />
      </g>

      <rect x="8.5" y="8.5" width="663" height="295" rx="7" fill="none" stroke={accentColor} strokeOpacity={glow} strokeWidth="1.2" />
      <rect x="13.5" y="13.5" width="653" height="285" rx="5" fill="none" stroke={colors.lineColor} strokeOpacity="0.24" />
      <path
        d="M8 32 V17 Q8 8 17 8 H36 M644 8 H663 Q672 8 672 17 V36 M672 280 V295 Q672 304 663 304 H640 M36 304 H17 Q8 304 8 295 V276"
        fill="none"
        stroke={accentColor}
        strokeOpacity={0.62 + glow * 0.34}
        strokeWidth="1.5"
      />

      <text x="32" y="42" className="ui-title" fill={accentColor}>ORBITAL OVERVIEW</text>

      <g clipPath="url(#orbitalOverviewClip)">
        <g transform={`rotate(${sweepRotation} ${CX} ${CY})`}>
          {orbits.map((orbit, i) => (
            <ellipse
              key={`orbit-${i}`}
              cx={CX}
              cy={CY}
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              stroke={colors.lineColor}
              strokeOpacity={0.14 + Math.abs(loopSin(progress, i * 0.13)) * 0.1}
              strokeWidth={i === 3 ? 1.2 : 0.8}
              strokeDasharray={i === 0 || i === 4 ? "4 7" : undefined}
              transform={`rotate(${orbit.rotate} ${CX} ${CY})`}
            />
          ))}
          <ellipse
            cx={CX}
            cy={CY}
            rx={orbits[3].rx}
            ry={orbits[3].ry}
            fill="none"
            stroke="url(#orbitalOverviewTrail)"
            strokeWidth="2.2"
            strokeDasharray="78 520"
            strokeDashoffset={-progress * 620}
            opacity="0.78"
            transform={`rotate(${orbits[3].rotate} ${CX} ${CY})`}
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx={orbits[5].rx}
            ry={orbits[5].ry}
            fill="none"
            stroke="url(#orbitalOverviewDimTrail)"
            strokeWidth="1.8"
            strokeDasharray="92 700"
            strokeDashoffset={-progress * 780}
            opacity="0.72"
            transform={`rotate(${orbits[5].rotate} ${CX} ${CY})`}
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx="102"
            ry="42"
            fill="none"
            stroke="#ffe2ff"
            strokeOpacity="0.34"
            strokeWidth="1.7"
            strokeDasharray="32 214"
            strokeDashoffset={progress * 260}
            transform={`rotate(${-28} ${CX} ${CY})`}
          />
        </g>

        <g>
          <path d="M112 206 L152 159 L219 184 L334 104 L414 152 L498 76" fill="none" stroke={colors.lineColor} strokeOpacity="0.16" strokeWidth="0.8" />
          <path d="M214 138 C246 128 278 128 308 142" fill="none" stroke="#dce8ff" strokeOpacity="0.34" strokeWidth="1.2" />
          <path d="M166 92 C210 68 278 58 350 72" fill="none" stroke={colors.lineColor} strokeOpacity="0.12" strokeDasharray="6 8" />
          <path d="M286 214 C342 226 390 224 438 196" fill="none" stroke={colors.lineColor} strokeOpacity="0.14" strokeDasharray="3 8" />

          <circle cx={CX} cy={CY} r="60" fill="url(#orbitalOverviewStarGlow)" opacity={starPulse * 0.6} />
          <circle cx={CX} cy={CY} r="31" fill="url(#orbitalOverviewStar)" opacity={starPulse} filter="url(#orbitalOverviewGlow)" />
          <circle cx={CX} cy={CY} r="13" fill="#fff8ff" opacity={starPulse * 0.98} />
          <path
            d={`M${CX - 38} ${CY} H${CX + 38} M${CX} ${CY - 28} V${CY + 28}`}
            stroke="#fff7ff"
            strokeOpacity={0.18 + Math.abs(loopCos(progress)) * 0.08}
          />

          {orbits.map((orbit, i) => {
            const planet = getOrbitPoint(orbit, progress);
            const behindStar = planet.depth > 0.35;
            const planetOpacity = behindStar ? 0.38 : 0.96;

            return (
              <g key={`planet-${i}`} opacity={planetOpacity}>
                <circle
                  cx={planet.x}
                  cy={planet.y}
                  r={orbit.planetSize}
                  fill={orbit.planetColor}
                  filter="url(#orbitalOverviewPlanetGlow)"
                />
                <circle
                  cx={planet.x - orbit.planetSize * 0.18}
                  cy={planet.y - orbit.planetSize * 0.22}
                  r={orbit.planetSize * 0.5}
                  fill="#ffffff"
                  opacity="0.72"
                />
                {i === 3 && (
                  <circle cx={planet.x} cy={planet.y} r={orbit.planetSize + 5} fill="none" stroke="#e8efff" strokeOpacity="0.32" strokeWidth="1" />
                )}
              </g>
            );
          })}

          {nodes.map((node, index) => {
            const nodePulse = 0.58 + Math.max(0, loopSin(progress, index * 0.11)) * 0.28;

            return (
              <g key={`${node.x}-${node.y}`} opacity={node.strong ? 0.96 : 0.5}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + (node.strong ? 5 : 2)}
                  fill={node.strong ? "#789cff" : "#9fbaff"}
                  opacity={node.strong ? 0.12 : 0.06}
                  filter="url(#orbitalOverviewSoftGlow)"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={node.strong ? "#dce8ff" : "#a8b7d6"}
                  opacity={nodePulse}
                  filter={node.strong ? "url(#orbitalOverviewPlanetGlow)" : undefined}
                />
                <circle cx={node.x} cy={node.y} r={Math.max(1.6, node.r * 0.35)} fill="#ffffff" opacity="0.68" />
              </g>
            );
          })}
        </g>
      </g>

      <line x1="526" y1="50" x2="526" y2="266" stroke={colors.lineColor} strokeOpacity="0.28" />
      <path d="M548 50 H638 M548 266 H638" stroke={colors.lineColor} strokeOpacity="0.08" />

      <g transform="translate(552 64)">
        {stats.map(([label, value], i) => {
          const statGlow = 0.58 + Math.abs(loopSin(progress, i * 0.15)) * 0.22;
          return (
            <g key={label} transform={`translate(0 ${i * 42})`}>
              <text x="0" y="0" className="ui-caption" opacity="0.6">{label}</text>
              <text x="0" y="19" className="ui-value" opacity={statGlow}>{value}</text>
            </g>
          );
        })}
      </g>

      <line x1="32" y1="273" x2="366" y2="273" stroke={accentColor} strokeOpacity="0.12" strokeWidth="0.5" />
      <line x1="32" y1="276" x2="438" y2="276" stroke={colors.lineColor} strokeOpacity="0.06" strokeWidth="0.5" />

      <circle
        cx="648"
        cy="28"
        r="3.5"
        fill="#39f5d7"
        opacity={0.5 + Math.abs(loopSin(progress)) * 0.35}
        filter="url(#orbitalOverviewSoftGlow)"
      />
    </svg>
  );
};
