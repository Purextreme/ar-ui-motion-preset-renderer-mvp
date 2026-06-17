import { loopCos, loopSin } from "../../utils/animation";
import { getPresetColors, getPresetColorStyle } from "../../render/presetStyle";
import { SimpleHudFrame } from "../../render/SimpleHudFrame";
import type { PresetComponent } from "../../render/types";

const assetBase = "/generated-hud";

function range(count: number) {
  return Array.from({ length: count }, (_, index) => index);
}

function orbitPoint(cx: number, cy: number, rx: number, ry: number, rotationDeg: number, phase: number) {
  const angle = phase * Math.PI * 2;
  const rotation = (rotationDeg * Math.PI) / 180;
  const x = Math.cos(angle) * rx;
  const y = Math.sin(angle) * ry;

  return {
    x: cx + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: cy + x * Math.sin(rotation) + y * Math.cos(rotation),
  };
}

function isOrbitFront(phase: number) {
  return Math.sin(phase * Math.PI * 2) > 0;
}

export const DesignConfidenceCard: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const pulse = 0.82 + Math.max(0, loopSin(context.progress, 0.12)) * 0.16;
  const barWidth = 336 + Math.max(0, loopSin(context.progress, 0.22)) * 12;

  return (
    <svg className="preset-svg design-confidence-svg" viewBox="0 0 560 250" role="img" style={getPresetColorStyle(props.params)}>
      <defs>
        <linearGradient id="designConfidenceBar" x1="0" x2="1">
          <stop offset="0%" stopColor="#8c4bff" />
          <stop offset="58%" stopColor="#a56cff" />
          <stop offset="100%" stopColor="#743cff" />
        </linearGradient>
        <filter id="designConfidenceGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <SimpleHudFrame idPrefix="designConfidence" width={560} height={250} title="DESIGN CONFIDENCE" progress={context.progress} colors={colors} accent="purple">
        <text x="56" y="132" className="ui-title" fontSize="64" opacity={pulse} filter="url(#designConfidenceGlow)">89</text>
        <text x="156" y="132" className="ui-title" fontSize="38" opacity="0.8">%</text>
        <rect x="56" y="162" width="440" height="18" rx="4" fill="#171139" opacity="0.66" />
        <rect x="56" y="162" width={barWidth} height="18" rx="4" fill="url(#designConfidenceBar)" opacity={pulse} filter="url(#designConfidenceGlow)" />
        <g opacity="0.18" stroke={colors.lineColor}>
          <path d="M310 72 H492 M332 90 H486 M412 108 H489" />
          {range(16).map((i) => <line key={i} x1={58 + i * 28} y1="198" x2={58 + i * 28} y2="214" />)}
        </g>
      </SimpleHudFrame>
    </svg>
  );
};

export const TrajectorySimulationCard: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const progress = context.progress;
  const nodeX = 172 + progress * 260;
  const nodeY = 190 - Math.sin(progress * Math.PI) * 80;

  return (
    <svg className="preset-svg trajectory-simulation-svg" viewBox="0 0 920 360" role="img" style={getPresetColorStyle(props.params)}>
      <defs>
        <filter id="trajectoryGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <SimpleHudFrame idPrefix="trajectory" width={920} height={360} title="TRAJECTORY SIMULATION" progress={progress} colors={colors} showGrid>
        <image href={`${assetBase}/planet-earth.png`} x="78" y="88" width="112" height="112" opacity="0.9" />
        <image href={`${assetBase}/planet-jupiter.png`} x="754" y="118" width="110" height="110" opacity="0.92" />
        <path d="M150 208 C322 120 512 78 724 204" fill="none" stroke="#dfe9ff" strokeOpacity="0.62" strokeWidth="3" />
        <path d="M150 208 C346 168 482 152 724 204" fill="none" stroke="#4b91ff" strokeOpacity="0.58" strokeWidth="2" />
        <path d="M150 208 C334 204 508 218 724 262" fill="none" stroke={colors.lineColor} strokeOpacity="0.14" />
        <circle cx={nodeX} cy={nodeY} r="5" fill="#ffc46d" filter="url(#trajectoryGlow)" />
        <line x1={nodeX} y1={nodeY - 28} x2={nodeX} y2={nodeY + 28} stroke="#ffffff" strokeOpacity="0.28" />
        <circle cx="150" cy="208" r="5" fill="#87c6ff" filter="url(#trajectoryGlow)" />
        <circle cx="724" cy="204" r="6" fill="#78bdff" filter="url(#trajectoryGlow)" />
        <text x="118" y="274" className="ui-title" fontSize="19" textAnchor="middle">EARTH</text>
        <text x="118" y="302" className="ui-title" fontSize="19" textAnchor="middle">DEPARTURE</text>
        <text x="454" y="312" className="ui-title" fontSize="24" textAnchor="middle" fill="#8fb9ff">ETA 180d 14h 32m</text>
        <text x="810" y="286" className="ui-title" fontSize="20" textAnchor="middle">TARGET</text>
        <text x="810" y="316" className="ui-title" fontSize="20" textAnchor="middle">JUPITER SYSTEM</text>
      </SimpleHudFrame>
    </svg>
  );
};

export const HullStressMap: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const scanRotation = context.progress * 360;

  return (
    <svg className="preset-svg hull-stress-map-svg" viewBox="0 0 420 520" role="img" style={getPresetColorStyle(props.params)}>
      <defs>
        <linearGradient id="hullStressScale" x1="0" x2="1">
          <stop offset="0%" stopColor="#3157ff" />
          <stop offset="48%" stopColor="#85d99a" />
          <stop offset="72%" stopColor="#e8c968" />
          <stop offset="100%" stopColor="#d94f3f" />
        </linearGradient>
        <filter id="hullStressGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <SimpleHudFrame idPrefix="hullStress" width={420} height={520} title="HULL STRESS MAP" progress={context.progress} colors={colors} showGrid>
        <image href={`${assetBase}/hull-stress-assembly.png`} x="54" y="112" width="312" height="312" opacity="0.88" />
        <g transform={`rotate(${scanRotation} 210 268)`} opacity="0.28">
          <line x1="210" y1="84" x2="210" y2="452" stroke="#ffffff" />
          <line x1="26" y1="268" x2="394" y2="268" stroke="#ffffff" />
        </g>
        <path d="M356 48 L374 82 H338 Z" fill="none" stroke="#ffb85c" strokeWidth="3" filter="url(#hullStressGlow)" />
        <line x1="356" y1="58" x2="356" y2="72" stroke="#ffb85c" strokeWidth="3" />
        <circle cx="356" cy="78" r="2.5" fill="#ffb85c" />
        <rect x="44" y="438" width="332" height="20" fill="url(#hullStressScale)" filter="url(#hullStressGlow)" />
        <text x="44" y="426" className="ui-small">0%</text>
        <text x="376" y="426" className="ui-small" textAnchor="end">100%</text>
      </SimpleHudFrame>
    </svg>
  );
};

export const ShipIdentityCard: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const rows = [
    ["CLASS:", "DEEP SPACE ENGINEERING PLATFORM"],
    ["DESIGNER:", "A. ISH"],
    ["STATUS:", "ACTIVE DESIGN"],
  ];

  return (
    <svg className="preset-svg ship-identity-svg" viewBox="0 0 560 250" role="img" style={getPresetColorStyle(props.params)}>
      <SimpleHudFrame idPrefix="shipIdentity" width={560} height={250} title="SHIP ID: ORION-7X" progress={context.progress} colors={colors}>
        <g transform="translate(42 112)">
          {rows.map(([label, value], i) => (
            <g key={label} transform={`translate(0 ${i * 38})`} opacity={0.68 + Math.max(0, loopSin(context.progress, i * 0.16)) * 0.18}>
              <text x="0" y="0" className="ui-small" fontSize="16">{label}</text>
              <text x="126" y="0" className="ui-value" fontSize="16">{value}</text>
            </g>
          ))}
        </g>
      </SimpleHudFrame>
    </svg>
  );
};

export const RingSegmentTag: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);

  return (
    <svg className="preset-svg ring-segment-tag-svg" viewBox="0 0 360 126" role="img" style={getPresetColorStyle(props.params)}>
      <SimpleHudFrame idPrefix="ringSegment" width={360} height={126} title="RING SEGMENT RS-02" progress={context.progress} colors={colors}>
        <text x="36" y="86" className="ui-title" fontSize="20" opacity="0.72">INTEGRITY 98%</text>
        <circle cx="326" cy="66" r="4" fill="#83baff" opacity={0.45 + Math.abs(loopSin(context.progress)) * 0.35} />
      </SimpleHudFrame>
    </svg>
  );
};

export const ThrustVectoringPanel: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const wobble = loopSin(context.progress) * 12;
  const levelAngle = loopSin(context.progress, 0.08) * 7.5;
  const driftX = loopSin(context.progress, 0.12) * 3;
  const driftY = loopCos(context.progress, 0.18) * 3;
  const fieldPath = [
    `M${132 + driftX} ${102 + driftY}`,
    `C${156 + driftX} ${80 + driftY} ${192 - driftX} ${92 - driftY} ${203 + driftX} ${122 + driftY}`,
    `C${232 - driftX} ${126 + driftY} ${244 + driftX} ${148 - driftY} ${230 + driftX} ${170 + driftY}`,
    `C${248 - driftX} ${194 + driftY} ${222 + driftX} ${222 - driftY} ${190 - driftX} ${212 + driftY}`,
    `C${171 + driftX} ${236 - driftY} ${136 - driftX} ${228 + driftY} ${130 + driftX} ${196 - driftY}`,
    `C${100 - driftX} ${194 + driftY} ${88 + driftX} ${166 - driftY} ${108 - driftX} ${146 + driftY}`,
    `C${96 + driftX} ${126 - driftY} ${108 - driftX} ${108 + driftY} ${132 + driftX} ${102 + driftY}`,
    "Z",
  ].join(" ");
  const innerFieldPath = [
    `M${148 - driftX} ${126 + driftY}`,
    `C${166 + driftX} ${108 - driftY} ${190 - driftX} ${118 + driftY} ${194 + driftX} ${142 - driftY}`,
    `C${212 - driftX} ${148 + driftY} ${214 + driftX} ${168 - driftY} ${198 - driftX} ${178 + driftY}`,
    `C${206 + driftX} ${196 - driftY} ${184 - driftX} ${208 + driftY} ${166 + driftX} ${194 - driftY}`,
    `C${148 - driftX} ${206 + driftY} ${128 + driftX} ${190 - driftY} ${136 - driftX} ${170 + driftY}`,
    `C${120 + driftX} ${158 - driftY} ${128 - driftX} ${136 + driftY} ${148 - driftX} ${126 + driftY}`,
    "Z",
  ].join(" ");

  return (
    <svg className="preset-svg thrust-vectoring-svg" viewBox="0 0 320 430" role="img" style={getPresetColorStyle(props.params)}>
      <defs>
        <radialGradient id="thrustVectorField" cx="50%" cy="48%" r="58%">
          <stop offset="0%" stopColor="#d7c6ff" stopOpacity="0.42" />
          <stop offset="52%" stopColor="#8c5cff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4e2ba8" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id="thrustVectorStroke" x1="68" y1="260" x2="244" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b58ff" />
          <stop offset="52%" stopColor="#d7c2ff" />
          <stop offset="100%" stopColor="#9b6cff" />
        </linearGradient>
        <filter id="thrustVectorGlow" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <SimpleHudFrame idPrefix="thrustVector" width={320} height={430} title="THRUST VECTORING" progress={context.progress} colors={colors} accent="purple" showGrid>
        <g transform="translate(0 8)">
          {[42, 72, 102].map((r) => <circle key={r} cx="160" cy="174" r={r} fill="none" stroke={colors.lineColor} strokeOpacity="0.18" />)}
          {range(12).map((i) => (
            <line
              key={i}
              x1="160"
              y1="174"
              x2={160 + Math.cos((i / 12) * Math.PI * 2) * 104}
              y2={174 + Math.sin((i / 12) * Math.PI * 2) * 104}
              stroke={colors.lineColor}
              strokeOpacity="0.13"
            />
          ))}
          <line x1="160" y1="76" x2="160" y2="272" stroke="#9a6bff" strokeWidth="2.2" strokeOpacity="0.72" filter="url(#thrustVectorGlow)" />
          <line x1="58" y1={174 + wobble} x2="262" y2={174 - wobble} stroke="#9a6bff" strokeWidth="2.4" strokeOpacity="0.78" filter="url(#thrustVectorGlow)" />
          <path d="M118 202 C138 176 148 152 146 112 M158 244 C170 210 198 184 236 166 M100 150 C126 160 154 164 188 154" stroke="#c9adff" strokeOpacity="0.18" fill="none" />
          <path d={fieldPath} fill="url(#thrustVectorField)" stroke="url(#thrustVectorStroke)" strokeWidth="3" filter="url(#thrustVectorGlow)" />
          <path d={innerFieldPath} fill="#c7adff" fillOpacity="0.11" stroke="#dfd2ff" strokeOpacity="0.38" strokeWidth="1.6" />
          <ellipse cx={134 + loopSin(context.progress, 0.28) * 3} cy="158" rx="20" ry="13" fill="#d9c8ff" fillOpacity="0.17" />
          <ellipse cx="196" cy={138 + loopCos(context.progress, 0.2) * 3} rx="24" ry="15" fill="#9f71ff" fillOpacity="0.18" />
          <ellipse cx={174 + loopSin(context.progress, 0.42) * 2} cy="198" rx="26" ry="17" fill="#b68cff" fillOpacity="0.14" />
          <circle cx="160" cy="174" r="26" fill="#a06cff" fillOpacity="0.13" stroke="#d4c1ff" strokeOpacity="0.3" filter="url(#thrustVectorGlow)" />
          <circle cx="160" cy="174" r="4" fill="#f1eaff" filter="url(#thrustVectorGlow)" />
          <text x="160" y="62" className="ui-small" textAnchor="middle">+Y</text>
          <text x="160" y="294" className="ui-small" textAnchor="middle">-Y</text>
          <text x="44" y="180" className="ui-small" textAnchor="middle">+Z</text>
          <text x="276" y="180" className="ui-small" textAnchor="middle">+X</text>
        </g>
        <line x1="36" y1="342" x2="284" y2="342" stroke={colors.lineColor} strokeOpacity="0.18" />
        <g transform="translate(36 358)">
          <line x1="0" y1="0" x2="86" y2="0" stroke={colors.lineColor} strokeOpacity="0.18" />
          <line x1="43" y1="-9" x2="43" y2="9" stroke={colors.lineColor} strokeOpacity="0.16" />
          <line
            x1="8"
            y1="0"
            x2="78"
            y2="0"
            stroke="#b18cff"
            strokeWidth="2.4"
            strokeOpacity="0.78"
            filter="url(#thrustVectorGlow)"
            transform={`rotate(${levelAngle} 43 0)`}
          />
        </g>
        <text x="36" y="390" className="ui-small">LEVEL ANGLE</text>
        <text x="282" y="390" className="ui-title" fontSize="24" textAnchor="end" fill="#8fb9ff">
          {levelAngle >= 0 ? "+" : ""}{levelAngle.toFixed(1)}°
        </text>
      </SimpleHudFrame>
    </svg>
  );
};

export const StructuralIntegrityCard: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const barWidth = 238;
  const barFillWidth = barWidth * 0.991;
  const animatedBarWidth = barFillWidth - 7 + Math.max(0, loopSin(context.progress, 0.12)) * 7;
  const barPulse = 0.7 + Math.max(0, loopSin(context.progress, 0.1)) * 0.28;
  const titlePulse = 0.78 + Math.max(0, loopSin(context.progress, 0.18)) * 0.2;
  const valuePulse = 0.84 + Math.max(0, loopSin(context.progress, 0.32)) * 0.16;
  const scanY = 78 + context.progress * 112;
  const flowOffset = (context.progress * 30) % 22;

  return (
    <svg className="preset-svg structural-integrity-svg" viewBox="0 0 580 220" role="img" style={getPresetColorStyle(props.params)}>
      <defs>
        <linearGradient id="structuralThumbBg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#12345d" stopOpacity="0.74" />
          <stop offset="58%" stopColor="#081a32" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#050b18" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id="structuralBarFill" x1="0" x2="1">
          <stop offset="0%" stopColor="#5e9dff" />
          <stop offset="56%" stopColor="#9cc9ff" />
          <stop offset="100%" stopColor="#d8e8ff" />
        </linearGradient>
        <pattern id="structuralThumbGrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0 H0 V16" fill="none" stroke={colors.lineColor} strokeOpacity="0.16" strokeWidth="0.6" />
        </pattern>
        <clipPath id="structuralThumbClip">
          <rect x="38" y="70" width="144" height="120" rx="6" />
        </clipPath>
        <clipPath id="structuralBarClip">
          <rect x="286" y="152" width={barFillWidth} height="16" rx="2" />
        </clipPath>
        <filter id="structuralGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <SimpleHudFrame idPrefix="structuralIntegrity" width={580} height={220} title="STRUCTURAL INTEGRITY" progress={context.progress} colors={colors}>
        <g clipPath="url(#structuralThumbClip)">
          <rect x="38" y="70" width="144" height="120" fill="url(#structuralThumbBg)" />
          <rect x="38" y="70" width="144" height="120" fill="url(#structuralThumbGrid)" opacity="0.9" />
          <path d="M50 174 C76 124 126 102 174 88" fill="none" stroke="#7fb6ff" strokeOpacity="0.18" />
          <path d="M48 112 H170 M72 84 V186 M142 76 V184" stroke="#9fcaff" strokeOpacity="0.1" />
          <rect x="38" y={scanY} width="144" height="16" fill="#9bcfff" opacity="0.1" />
          <image href={`${assetBase}/structural-ring-thumbnail.png`} x="22" y="72" width="176" height="126" opacity="0.96" />
        </g>
        <rect x="38" y="70" width="144" height="120" rx="6" fill="none" stroke={colors.lineColor} strokeOpacity="0.32" />
        <path d="M48 80 H78 M172 80 V110 M48 180 H78" stroke="#b9d6ff" strokeOpacity="0.36" filter="url(#structuralGlow)" />

        <text x="212" y="98" className="ui-title" fontSize="22" fill="#8fb9ff" opacity={titlePulse}>RING FRAME</text>
        <text x="212" y="138" className="ui-small" fontSize="16" opacity={0.5 + titlePulse * 0.16}>INTEGRITY</text>
        <text x="212" y="168" className="ui-title" fontSize="24" opacity={valuePulse} filter="url(#structuralGlow)">99.1%</text>
        <rect x="286" y="152" width={barWidth} height="16" rx="2" fill="#172040" opacity="0.68" />
        <rect x="286" y="152" width={animatedBarWidth} height="16" rx="2" fill="url(#structuralBarFill)" opacity={barPulse} filter="url(#structuralGlow)" />
        <g clipPath="url(#structuralBarClip)">
          {range(15).map((i) => (
            <rect
              key={i}
              x={286 - flowOffset + i * 22}
              y="152"
              width="8"
              height="16"
              fill="#ffffff"
              opacity="0.18"
            />
          ))}
        </g>
        <circle cx={286 + animatedBarWidth} cy="160" r={3.4 + Math.max(0, loopSin(context.progress, 0.24)) * 1.8} fill="#dcecff" opacity="0.9" filter="url(#structuralGlow)" />
      </SimpleHudFrame>
    </svg>
  );
};

export const CourseVectorPanel: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const originX = 218;
  const originY = 178;
  const tipX = 312 + loopSin(context.progress, 0.08) * 5;
  const tipY = 86 + loopCos(context.progress, 0.08) * 5;
  const sparkX = originX + (tipX - originX) * 0.62;
  const sparkY = originY + (tipY - originY) * 0.62;
  const sweepOpacity = 0.18 + Math.max(0, loopSin(context.progress, 0.18)) * 0.16;

  return (
    <svg className="preset-svg course-vector-svg" viewBox="0 0 380 230" role="img" style={getPresetColorStyle(props.params)}>
      <defs>
        <linearGradient id="courseVectorBeam" x1="218" y1="178" x2="312" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9a7dff" />
          <stop offset="56%" stopColor="#cbd7ff" />
          <stop offset="100%" stopColor="#5f93ff" />
        </linearGradient>
        <linearGradient id="courseVectorSector" x1="178" y1="210" x2="360" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0c1530" stopOpacity="0" />
          <stop offset="52%" stopColor="#18345f" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#061126" stopOpacity="0.08" />
        </linearGradient>
        <marker id="courseVectorArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#6fa4ff" />
        </marker>
        <filter id="courseVectorGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="courseVectorPlotClip">
          <rect x="166" y="64" width="194" height="144" />
        </clipPath>
      </defs>
      <SimpleHudFrame idPrefix="courseVector" width={380} height={230} title="COURSE VECTOR" progress={context.progress} colors={colors}>
        <text x="38" y="104" className="ui-title" fontSize="28">278.4°</text>
        <text x="38" y="150" className="ui-small" fontSize="16">MAGNITUDE</text>
        <text x="38" y="188" className="ui-title" fontSize="26">12.6 km/s</text>
        <g clipPath="url(#courseVectorPlotClip)">
          <path d="M186 206 C212 134 268 82 350 72 L360 72 L360 208 Z" fill="url(#courseVectorSector)" opacity="0.75" />
          <path d="M182 202 C210 126 270 80 342 72" fill="none" stroke={colors.lineColor} strokeOpacity="0.3" />
          <path d="M202 202 C230 148 274 122 330 116" fill="none" stroke={colors.lineColor} strokeOpacity="0.16" />
          <path d="M222 202 C246 166 276 150 318 148" fill="none" stroke={colors.lineColor} strokeOpacity="0.12" strokeDasharray="7 8" />
          <path d="M189 200 L260 122 M198 198 L337 74 M218 178 L338 158" fill="none" stroke={colors.lineColor} strokeOpacity="0.13" />
          <path d="M248 132 L262 118 L275 132" fill="none" stroke="#9fbaff" strokeOpacity="0.18" />
          <path d="M286 96 L298 86 L310 98" fill="none" stroke="#9fbaff" strokeOpacity="0.16" />
          <path d={`M${originX} ${originY} L${tipX} ${tipY}`} fill="none" stroke="url(#courseVectorBeam)" strokeWidth="3.4" markerEnd="url(#courseVectorArrow)" filter="url(#courseVectorGlow)" />
          <path d={`M${originX + 10} ${originY - 4} L${tipX - 18} ${tipY + 14}`} fill="none" stroke="#ffffff" strokeOpacity={sweepOpacity} strokeWidth="1.2" />
          <rect x={originX - 6} y={originY - 6} width="12" height="12" fill="#d7ccff" opacity="0.92" filter="url(#courseVectorGlow)" />
          <circle cx={sparkX} cy={sparkY} r="4" fill="#ffffff" filter="url(#courseVectorGlow)" />
          <circle cx="260" cy="122" r="3" fill="#cfdcff" />
          <circle cx="288" cy="108" r="2.2" fill="#b8c8ff" opacity="0.84" />
          <path d="M210 192 H239 M224 176 V204 M232 188 H246" stroke="#9fbaff" strokeOpacity="0.24" />
        </g>
      </SimpleHudFrame>
    </svg>
  );
};

export const OrbitalNavigationCard: PresetComponent = ({ props, context }) => {
  const colors = getPresetColors(props.params);
  const progress = context.progress;
  const primaryOrbit = { cx: 408, cy: 246, rx: 154, ry: 58, rotation: -9 };
  const transferOrbit = { cx: 418, cy: 232, rx: 172, ry: 70, rotation: -22 };
  const innerOrbit = { cx: 404, cy: 244, rx: 96, ry: 36, rotation: -6 };
  const orbitMarkers = [
    {
      key: "primary",
      phase: progress,
      point: orbitPoint(primaryOrbit.cx, primaryOrbit.cy, primaryOrbit.rx, primaryOrbit.ry, primaryOrbit.rotation, progress),
      radius: 5,
      fill: "#dce7ff",
    },
    {
      key: "transfer",
      phase: progress + 0.28,
      point: orbitPoint(transferOrbit.cx, transferOrbit.cy, transferOrbit.rx, transferOrbit.ry, transferOrbit.rotation, progress + 0.28),
      radius: 4,
      fill: "#b8c8ff",
    },
    {
      key: "inner",
      phase: progress + 0.62,
      point: orbitPoint(innerOrbit.cx, innerOrbit.cy, innerOrbit.rx, innerOrbit.ry, innerOrbit.rotation, progress + 0.62),
      radius: 3.5,
      fill: "#ffffff",
    },
    {
      key: "signal",
      phase: progress + 0.43,
      point: orbitPoint(primaryOrbit.cx, primaryOrbit.cy, primaryOrbit.rx * 0.82, primaryOrbit.ry * 0.82, primaryOrbit.rotation, progress + 0.43),
      radius: 4.5,
      fill: "#c9ccff",
    },
  ];

  return (
    <svg className="preset-svg orbital-navigation-card-svg" viewBox="0 0 620 460" role="img" style={getPresetColorStyle(props.params)}>
      <defs>
        <clipPath id="orbitalCardContentClip">
          <rect x="14" y="64" width="592" height="382" />
        </clipPath>
        <filter id="orbitalCardGlow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <SimpleHudFrame idPrefix="orbitalCard" width={620} height={460} title="ORBITAL NAVIGATION" progress={progress} colors={colors} showGrid>
        <g transform="translate(70 118)">
          <text x="0" y="0" className="ui-caption">CELESTIAL BODY</text>
          <text x="0" y="28" className="ui-title" fontSize="19">AURELIA PRIME</text>
          <text x="0" y="82" className="ui-caption">MASS</text>
          <text x="0" y="110" className="ui-title" fontSize="19">5.21 x 10²⁴ kg</text>
          <text x="0" y="164" className="ui-caption">RADIUS</text>
          <text x="0" y="192" className="ui-title" fontSize="19">6,371 km</text>
          <text x="0" y="246" className="ui-caption">GRAVITY</text>
          <text x="0" y="274" className="ui-title" fontSize="19">9.81 m/s²</text>
        </g>
        <g clipPath="url(#orbitalCardContentClip)">
          <g transform="translate(0 10)">
            <ellipse
              cx={primaryOrbit.cx}
              cy={primaryOrbit.cy}
              rx={primaryOrbit.rx}
              ry={primaryOrbit.ry}
              fill="none"
              stroke="#6c8cff"
              strokeOpacity="0.38"
              transform={`rotate(${primaryOrbit.rotation} ${primaryOrbit.cx} ${primaryOrbit.cy})`}
            />
            <ellipse
              cx={transferOrbit.cx}
              cy={transferOrbit.cy}
              rx={transferOrbit.rx}
              ry={transferOrbit.ry}
              fill="none"
              stroke="#477eff"
              strokeOpacity="0.28"
              transform={`rotate(${transferOrbit.rotation} ${transferOrbit.cx} ${transferOrbit.cy})`}
            />
            <ellipse
              cx={innerOrbit.cx}
              cy={innerOrbit.cy}
              rx={innerOrbit.rx}
              ry={innerOrbit.ry}
              fill="none"
              stroke="#9fbaff"
              strokeOpacity="0.18"
              strokeDasharray="8 8"
              transform={`rotate(${innerOrbit.rotation} ${innerOrbit.cx} ${innerOrbit.cy})`}
            />
            {orbitMarkers.filter((marker) => !isOrbitFront(marker.phase)).map((marker) => (
              <circle
                key={marker.key}
                cx={marker.point.x}
                cy={marker.point.y}
                r={marker.radius}
                fill={marker.fill}
                filter="url(#orbitalCardGlow)"
              />
            ))}
            <image href={`${assetBase}/planet-aurelia-prime.png`} x="280" y="122" width="210" height="210" opacity="1" />
            {orbitMarkers.filter((marker) => isOrbitFront(marker.phase)).map((marker) => (
              <circle
                key={marker.key}
                cx={marker.point.x}
                cy={marker.point.y}
                r={marker.radius}
                fill={marker.fill}
                filter="url(#orbitalCardGlow)"
              />
            ))}
          </g>
        </g>
      </SimpleHudFrame>
    </svg>
  );
};
