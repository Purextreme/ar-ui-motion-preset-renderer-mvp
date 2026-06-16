import { loopCos, loopSin } from "../../utils/animation";
import type { PresetComponent } from "../../render/types";

type OrbitTrack = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
  stroke: string;
  opacity: number;
  width: number;
  dash?: string;
};

const orbitTracks: OrbitTrack[] = [
  {
    cx: 260,
    cy: 208,
    rx: 190,
    ry: 60,
    rotate: -13,
    stroke: "#548dff",
    opacity: 0.42,
    width: 1.4,
    dash: "5 7",
  },
  {
    cx: 260,
    cy: 208,
    rx: 178,
    ry: 70,
    rotate: 12,
    stroke: "#78c9ff",
    opacity: 0.34,
    width: 1.3,
    dash: "10 8",
  },
  {
    cx: 260,
    cy: 208,
    rx: 148,
    ry: 54,
    rotate: -31,
    stroke: "#84b8ff",
    opacity: 0.46,
    width: 1.5,
  },
  {
    cx: 260,
    cy: 208,
    rx: 148,
    ry: 54,
    rotate: -18,
    stroke: "#ffb43d",
    opacity: 0.88,
    width: 2.2,
  },
];

const metricRows = [
  ["APOGEE", "2,874 km"],
  ["PERIGEE", "412 km"],
  ["INCLINATION", "28.47°"],
  ["PERIOD", "92.6 min"],
];

const statusRows = [
  ["POWER", 98],
  ["PROPULSION", 92],
  ["LIFE SUPPORT", 100],
  ["STRUCTURAL INTEGRITY", 96],
];

function getOrbitPoint(track: OrbitTrack, progress: number, phase = 0) {
  const angle = (progress + phase) * Math.PI * 2;
  const rotation = track.rotate * Math.PI / 180;
  const x = Math.cos(angle) * track.rx;
  const y = Math.sin(angle) * track.ry;

  return {
    cx: track.cx + x * Math.cos(rotation) - y * Math.sin(rotation),
    cy: track.cy + x * Math.sin(rotation) + y * Math.cos(rotation),
  };
}

export const OrbitalNavigationPanel: PresetComponent = ({ context }) => {
  const { progress } = context;
  const pulse = 0.55 + Math.abs(loopSin(progress)) * 0.28;
  const scanY = 100 + progress * 190;
  const sweepX = 58 + progress * 398;
  const mainOrbit = orbitTracks[3];
  const blueOrbit = orbitTracks[0];
  const activeDot = getOrbitPoint(blueOrbit, progress, 0.12);
  const amberDot = getOrbitPoint(mainOrbit, progress, 0.54);
  const amberLeadDot = getOrbitPoint(mainOrbit, progress, 0.96);

  return (
    <svg className="preset-svg orbital-svg" viewBox="0 0 520 760" role="img">
      <defs>
        <linearGradient id="orbitalGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#102345" stopOpacity="0.78" />
          <stop offset="48%" stopColor="#071322" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#0c1428" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id="orbitalPanelShade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#122341" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#050b13" stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id="orbitalScan" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#65dfff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="orbitalBar" x1="0" x2="1">
          <stop offset="0%" stopColor="#6b50ff" />
          <stop offset="70%" stopColor="#6979ff" />
          <stop offset="100%" stopColor="#68d9ff" />
        </linearGradient>
        <radialGradient id="earthGlow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#9ddaff" />
          <stop offset="38%" stopColor="#428fe8" />
          <stop offset="75%" stopColor="#164481" />
          <stop offset="100%" stopColor="#07172e" />
        </radialGradient>
        <filter id="orbitalGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="orbitalSoftGlow" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="orbitalGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0 H0 V36" fill="none" stroke="#5fa8ff" strokeOpacity="0.1" />
        </pattern>
        <clipPath id="orbitalMapClip">
          <rect x="48" y="106" width="424" height="220" rx="8" />
        </clipPath>
      </defs>

      <rect x="1" y="1" width="518" height="758" rx="8" fill="url(#orbitalGlass)" />
      <rect x="1.5" y="1.5" width="517" height="757" rx="8" fill="none" stroke="#7ec4ff" strokeOpacity={pulse} />
      <path
        d="M16 1 H35 M485 1 H504 M1 19 V39 M519 19 V39 M1 721 V741 M519 721 V741 M16 759 H35 M485 759 H504"
        stroke="#9bd9ff"
        strokeOpacity="0.76"
      />
      <path d="M42 96 H478 M42 407 H478 M42 676 H478" stroke="#5aa7ff" strokeOpacity="0.18" />
      <path d="M18 20 V740 M502 20 V740" stroke="#6baeff" strokeOpacity="0.18" />

      <text x="48" y="48" className="ui-title" fill="#8fb9ff">TRAJECTORY SIMULATION</text>
      <text x="48" y="78" className="ui-caption">ORBITAL INSERTION</text>

      <g clipPath="url(#orbitalMapClip)">
        <rect x="48" y="106" width="424" height="220" rx="8" fill="url(#orbitalPanelShade)" />
        <rect x="48" y="106" width="424" height="220" fill="url(#orbitalGrid)" opacity="0.72" />
        <path d="M260 106 V326 M48 216 H472" stroke="#56aaff" strokeOpacity="0.14" />
        <path d="M64 284 C142 220, 174 148, 270 132 C352 118, 414 138, 456 172" fill="none" stroke="#69a8ff" strokeOpacity="0.11" />
        <path d="M64 158 C152 104, 288 104, 458 138" fill="none" stroke="#69a8ff" strokeOpacity="0.12" strokeDasharray="8 9" />
        <rect x={sweepX} y="106" width="34" height="220" fill="url(#orbitalScan)" opacity="0.34" />
        <rect x="48" y={scanY} width="424" height="28" fill="url(#orbitalScan)" opacity="0.2" />

        <g transform="translate(0 8)">
          <ellipse cx="260" cy="208" rx="58" ry="26" fill="none" stroke="#6db6ff" strokeOpacity="0.2" />
          <ellipse cx="260" cy="208" rx="96" ry="43" fill="none" stroke="#6db6ff" strokeOpacity="0.16" />
          {orbitTracks.map((orbit) => (
            <ellipse
              key={`${orbit.stroke}-${orbit.rotate}`}
              cx={orbit.cx}
              cy={orbit.cy}
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              stroke={orbit.stroke}
              strokeWidth={orbit.width}
              strokeOpacity={orbit.opacity}
              strokeDasharray={orbit.dash}
              filter={orbit.stroke === "#ffb43d" ? "url(#orbitalGlow)" : undefined}
              transform={`rotate(${orbit.rotate} ${orbit.cx} ${orbit.cy})`}
            />
          ))}

          <circle cx="260" cy="208" r="31" fill="#14376d" opacity="0.62" filter="url(#orbitalSoftGlow)" />
          <circle cx="260" cy="208" r="25" fill="url(#earthGlow)" stroke="#8bd8ff" strokeOpacity="0.8" />
          <path
            d="M244 196 C250 188, 259 192, 264 186 M239 212 C250 204, 257 219, 268 208 M267 225 C279 216, 281 207, 273 199"
            fill="none"
            stroke="#b5f4ff"
            strokeOpacity="0.36"
            strokeWidth="2"
          />
          <path d="M235 208 H285 M260 183 V233" stroke="#c9f6ff" strokeOpacity="0.16" />

          <circle cx={activeDot.cx} cy={activeDot.cy} r="3.5" fill="#8fd8ff" filter="url(#orbitalGlow)" />
          <circle cx={amberDot.cx} cy={amberDot.cy} r="4" fill="#ffbd4e" filter="url(#orbitalGlow)" />
          <circle cx={amberLeadDot.cx} cy={amberLeadDot.cy} r="2.8" fill="#ffcf72" opacity="0.9" filter="url(#orbitalGlow)" />
          <circle cx="405" cy="130" r="2.5" fill="#8fd8ff" opacity={0.72 + Math.max(0, loopSin(progress, 0.22)) * 0.2} filter="url(#orbitalGlow)" />
        </g>
      </g>
      <rect x="48.5" y="106.5" width="423" height="219" rx="8" fill="none" stroke="#5fa8ff" strokeOpacity="0.26" />

      <g transform="translate(48 366)">
        {metricRows.map(([label, value], index) => (
          <g key={label} transform={`translate(${index * 119} 0)`}>
            <path d="M0 -22 V28" stroke="#5fa8ff" strokeOpacity={index === 0 ? 0 : 0.18} />
            <text x="8" y="-6" className="ui-caption" opacity="0.78">{label}</text>
            <text x="8" y="22" className="ui-value" fill="#83a9ff">{value}</text>
          </g>
        ))}
      </g>

      <text x="48" y="448" className="ui-title" fill="#8fb9ff">SYSTEM STATUS</text>
      <path d="M48 458 H78" stroke="#77dfff" strokeWidth="2" strokeOpacity="0.82" />

      <g transform="translate(48 482)">
        <rect x="0" y="-18" width="424" height="200" rx="6" fill="#07111e" opacity="0.42" stroke="#5fa8ff" strokeOpacity="0.1" />
        {statusRows.map(([label, value], index) => {
          const y = index * 45;
          const shimmer = 0.55 + Math.max(0, loopSin(progress, index * 0.13)) * 0.28;

          return (
            <g key={label} transform={`translate(0 ${y})`}>
              <text x="10" y="8" className="ui-small" fill="#9ec8ff">{label}</text>
              <rect x="190" y="-2" width="188" height="10" rx="1.5" fill="#1a2b4b" opacity="0.78" />
              <rect x="190" y="-2" width={Number(value) * 1.78} height="10" rx="1.5" fill="url(#orbitalBar)" opacity={shimmer} filter="url(#orbitalGlow)" />
              <rect
                x={190 + ((progress + index * 0.19) % 1) * 158}
                y="-2"
                width="30"
                height="10"
                rx="1.5"
                fill="#b7f5ff"
                opacity="0.16"
              />
              <text x="410" y="8" className="ui-small" fill="#93baff" textAnchor="end" opacity={0.78 + Math.max(0, loopSin(progress, index * 0.17)) * 0.18}>{value}%</text>
            </g>
          );
        })}
      </g>

      <g transform="translate(48 714)">
        <text x="0" y="0" className="ui-title" fill="#8fb9ff">OVERALL STATUS</text>
        <rect x="282" y="-26" width="132" height="42" rx="2" fill="#06212b" stroke="#3ce7ff" strokeOpacity={0.54 + Math.abs(loopSin(progress)) * 0.22} />
        <text x="348" y="1" className="ui-title" fill="#6df4ff" textAnchor="middle" opacity={0.82 + Math.abs(loopSin(progress, 0.08)) * 0.16}>NOMINAL</text>
      </g>

      <circle cx="494" cy="84" r="2.5" fill="#8bd8ff" opacity={pulse} filter="url(#orbitalGlow)" />
    </svg>
  );
};
