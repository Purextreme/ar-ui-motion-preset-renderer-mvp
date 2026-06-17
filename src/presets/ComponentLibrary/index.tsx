import { loopSin } from "../../utils/animation";
import { getPresetColors, getPresetColorStyle } from "../../render/presetStyle";
import type { PresetComponent } from "../../render/types";

type ComponentKind = "reactor" | "habitat" | "docking" | "engine";

const components: Array<{
  name: string;
  version: string;
  desc: string;
  kind: ComponentKind;
}> = [
  { name: "CORE REACTOR", version: "MK-III", desc: "Balanced Output", kind: "reactor" },
  { name: "HABITAT RING", version: "H2-R", desc: "High Capacity", kind: "habitat" },
  { name: "DOCKING NODE", version: "DN-6", desc: "Multi-Port", kind: "docking" },
  { name: "ENGINE CLUSTER", version: "EC-9", desc: "Vector Thrust", kind: "engine" },
];

const materials = [
  { label: ["CERAMIC", "ALLOY"], fill: "url(#clMatPurple)", shine: "url(#clMatPurpleShine)" },
  { label: ["TITANIUM", "COMPOSITE"], fill: "url(#clMatGrey)", shine: "url(#clMatGreyShine)" },
  { label: ["GRAPHENE", "LATTICE"], fill: "url(#clMatBlue)", shine: "url(#clMatBlueShine)" },
];

function ThumbnailFrame({
  rowY,
  active,
  children,
}: {
  rowY: number;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x="36"
        y={rowY}
        width="244"
        height="116"
        rx="8"
        fill="#07152a"
        fillOpacity="0.74"
        stroke="var(--preset-line-color)"
        strokeOpacity={active ? 0.58 : 0.3}
      />
      <rect x="36" y={rowY} width="244" height="116" rx="8" fill="url(#clGrid)" opacity="0.68" />
      <path
        d={`M46 ${rowY + 30} H270 M62 ${rowY + 6} V${rowY + 110} M254 ${rowY + 6} V${rowY + 110}`}
        stroke="var(--preset-line-color)"
        strokeOpacity="0.1"
      />
      <path
        d={`M44 ${rowY + 13} V${rowY + 8} H61 M255 ${rowY + 8} H272 V${rowY + 25} M272 ${rowY + 91} V${rowY + 108} H255 M61 ${rowY + 108} H44 V${rowY + 91}`}
        fill="none"
        stroke="var(--preset-highlight-text-color)"
        strokeOpacity={active ? 0.68 : 0.36}
        strokeWidth="1.4"
      />
      <g clipPath={`url(#clThumbClip-${rowY})`}>{children}</g>
    </g>
  );
}

function InfoPanel({
  rowY,
  name,
  version,
  desc,
  active,
  pulse,
}: {
  rowY: number;
  name: string;
  version: string;
  desc: string;
  active: boolean;
  pulse: number;
}) {
  return (
    <g>
      <rect
        x="302"
        y={rowY + 7}
        width="170"
        height="102"
        rx="6"
        fill="#071326"
        fillOpacity={active ? 0.38 : 0.22}
        stroke="var(--preset-line-color)"
        strokeOpacity={active ? 0.42 : 0.16}
      />
      <path d={`M418 ${rowY + 88} H464 M318 ${rowY + 92} H365`} stroke="var(--preset-line-color)" strokeOpacity="0.1" />
      <rect
        x="438"
        y={rowY + 18}
        width="24"
        height="4"
        rx="1.5"
        fill="var(--preset-highlight-text-color)"
        opacity={0.58 + pulse * 0.36}
        filter="url(#clSoftGlow)"
      />
      <text x="308" y={rowY + 52} className="ui-value" fontSize="17">{name}</text>
      <text x="308" y={rowY + 75} className="ui-caption" fontSize="13">{version}</text>
      <text x="308" y={rowY + 96} className="ui-small" opacity="0.76">{desc}</text>
    </g>
  );
}

function ReactorModel({ rowY, pulse }: { rowY: number; pulse: number }) {
  return (
    <g transform={`translate(58 ${rowY + 13})`} filter="url(#clModelGlow)">
      <ellipse cx="146" cy="47" rx="34" ry="38" fill="url(#clMetalDark)" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.74" />
      <path d="M54 20 L148 10 C164 18 172 34 172 48 C172 64 164 78 148 86 L54 75 C40 66 34 56 34 47 C34 37 40 27 54 20Z" fill="url(#clMetal)" stroke="var(--preset-line-color)" strokeOpacity="0.72" />
      <path d="M47 23 C62 33 68 62 50 73 M82 16 C96 29 100 67 84 82 M118 12 C132 27 134 70 120 86" fill="none" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.55" strokeWidth="2" />
      <ellipse cx="56" cy="47" rx="21" ry="30" fill="url(#clMetalDark)" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.58" />
      <ellipse cx="147" cy="47" rx="22" ry="26" fill="#071326" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.86" strokeWidth="2" />
      <ellipse cx="147" cy="47" rx="12" ry="15" fill="none" stroke="var(--preset-line-color)" strokeOpacity="0.85" strokeWidth="2" />
      <circle cx="147" cy="47" r="4" fill="var(--preset-highlight-text-color)" opacity={0.55 + pulse * 0.36} />
      <path d="M42 38 H16 M42 56 H16 M168 31 L196 25 M170 64 L196 70" stroke="var(--preset-line-color)" strokeOpacity="0.64" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((dot) => (
        <circle
          key={dot}
          cx={147 + Math.cos(dot * Math.PI / 3) * 17}
          cy={47 + Math.sin(dot * Math.PI / 3) * 20}
          r="2"
          fill="var(--preset-highlight-text-color)"
          opacity="0.75"
        />
      ))}
      <path d="M64 31 H111 M64 63 H110 M93 20 V76" stroke="#d8ecff" strokeOpacity="0.22" />
    </g>
  );
}

function HabitatModel({ rowY, pulse }: { rowY: number; pulse: number }) {
  return (
    <g transform={`translate(54 ${rowY + 18})`} filter="url(#clModelGlow)">
      <ellipse cx="106" cy="45" rx="78" ry="35" fill="none" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.78" strokeWidth="6" />
      <ellipse cx="106" cy="45" rx="56" ry="22" fill="none" stroke="#071326" strokeOpacity="0.9" strokeWidth="12" />
      <ellipse cx="106" cy="45" rx="75" ry="33" fill="none" stroke="var(--preset-line-color)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="7 7" />
      <path d="M39 27 C75 6 136 6 174 27 M42 63 C78 82 135 82 170 63" fill="none" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.46" strokeWidth="2.5" />
      <path d="M55 20 L70 12 M80 11 L84 27 M116 10 L114 28 M148 15 L138 30 M51 69 L66 77 M92 80 L91 64 M126 79 L124 63 M157 70 L145 60" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.7" strokeWidth="2.2" />
      <path d="M106 45 L30 45 M106 45 L182 45 M106 45 L70 18 M106 45 L144 18 M106 45 L72 72 M106 45 L145 72" stroke="var(--preset-line-color)" strokeOpacity="0.3" />
      <circle cx="106" cy="45" r="8" fill="var(--preset-highlight-text-color)" opacity={0.25 + pulse * 0.28} filter="url(#clSoftGlow)" />
      <path d="M21 39 H3 M189 39 H208 M18 52 H0 M191 52 H210" stroke="var(--preset-line-color)" strokeOpacity="0.56" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((dot) => {
        const angle = (dot / 8) * Math.PI * 2;
        return (
          <rect
            key={dot}
            x={102 + Math.cos(angle) * 73}
            y={42 + Math.sin(angle) * 31}
            width="8"
            height="5"
            rx="1"
            fill="var(--preset-highlight-text-color)"
            opacity="0.62"
            transform={`rotate(${angle * 180 / Math.PI} ${106 + Math.cos(angle) * 73} ${45 + Math.sin(angle) * 31})`}
          />
        );
      })}
    </g>
  );
}

function DockingModel({ rowY, pulse }: { rowY: number; pulse: number }) {
  return (
    <g transform={`translate(56 ${rowY + 14})`} filter="url(#clModelGlow)">
      <path d="M54 27 L142 17 C158 25 168 36 169 48 C168 60 158 72 142 81 L54 70 C39 63 31 55 31 48 C31 40 39 33 54 27Z" fill="url(#clMetal)" stroke="var(--preset-line-color)" strokeOpacity="0.72" />
      <ellipse cx="56" cy="49" rx="26" ry="28" fill="url(#clMetalDark)" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.58" />
      <ellipse cx="142" cy="49" rx="28" ry="33" fill="url(#clMetalDark)" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.8" strokeWidth="2" />
      <ellipse cx="142" cy="49" rx="17" ry="22" fill="none" stroke="var(--preset-line-color)" strokeOpacity="0.84" strokeWidth="3" />
      <ellipse cx="142" cy="49" rx="7" ry="10" fill="var(--preset-highlight-text-color)" opacity={0.32 + pulse * 0.3} />
      <path d="M58 29 C70 39 72 60 58 69 M91 22 C104 36 105 65 91 76 M121 19 C134 34 135 66 122 79" fill="none" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.48" strokeWidth="2" />
      <path d="M27 36 H7 M27 61 H7 M166 30 L196 20 M169 48 H202 M166 67 L196 77" stroke="var(--preset-line-color)" strokeOpacity="0.72" strokeWidth="2.5" />
      <path d="M7 36 L7 61 M196 20 L202 48 L196 77" fill="none" stroke="var(--preset-line-color)" strokeOpacity="0.28" />
      {[0, 1, 2, 3, 4, 5].map((dot) => (
        <circle
          key={dot}
          cx={142 + Math.cos(dot * Math.PI / 3) * 21}
          cy={49 + Math.sin(dot * Math.PI / 3) * 25}
          r="2.3"
          fill="var(--preset-highlight-text-color)"
          opacity="0.72"
        />
      ))}
    </g>
  );
}

function EngineModel({ rowY, pulse }: { rowY: number; pulse: number }) {
  const nozzles = [
    [142, 28, 16],
    [172, 39, 20],
    [133, 60, 20],
    [164, 72, 16],
  ];

  return (
    <g transform={`translate(48 ${rowY + 16})`} filter="url(#clModelGlow)">
      <path d="M25 33 C54 16 105 15 146 26 C158 42 158 60 146 76 C105 90 54 85 25 66 C14 55 14 43 25 33Z" fill="url(#clMetal)" stroke="var(--preset-line-color)" strokeOpacity="0.72" />
      <path d="M42 28 L27 18 M42 71 L27 82 M81 21 V84 M112 24 V80" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.42" strokeWidth="2" />
      <path d="M37 38 H118 M37 60 H118 M56 28 C65 40 65 58 56 71 M96 24 C106 38 106 63 96 80" fill="none" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.34" strokeWidth="2" />
      {nozzles.map(([cx, cy, r], index) => (
        <g key={`${cx}-${cy}`}>
          <ellipse cx={cx} cy={cy} rx={r + 11} ry={r * 0.74 + 8} fill="url(#clMetalDark)" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.74" strokeWidth="2" />
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.74} fill="#061024" stroke="var(--preset-line-color)" strokeOpacity="0.88" strokeWidth="2" />
          <ellipse cx={cx} cy={cy} rx={r * 0.46} ry={r * 0.32} fill="var(--preset-highlight-text-color)" opacity={0.22 + pulse * 0.18 + index * 0.03} />
        </g>
      ))}
      <path d="M17 45 H0 M18 57 H0 M185 39 H211 M177 72 H202" stroke="var(--preset-line-color)" strokeOpacity="0.58" strokeWidth="2" />
      <path d="M116 22 C139 21 166 31 184 45 M114 82 C140 84 168 76 184 58" fill="none" stroke="var(--preset-highlight-text-color)" strokeOpacity="0.22" />
    </g>
  );
}

function ComponentModel({ kind, rowY, pulse }: { kind: ComponentKind; rowY: number; pulse: number }) {
  switch (kind) {
    case "reactor":
      return <ReactorModel rowY={rowY} pulse={pulse} />;
    case "habitat":
      return <HabitatModel rowY={rowY} pulse={pulse} />;
    case "docking":
      return <DockingModel rowY={rowY} pulse={pulse} />;
    case "engine":
      return <EngineModel rowY={rowY} pulse={pulse} />;
  }
}

export const ComponentLibrary: PresetComponent = ({ props, context }) => {
  const { progress } = context;
  const colors = getPresetColors(props.params);
  const accentColor = colors.highlightTextColor;
  const scanY = -90 + progress * 1040;
  const glow = 0.46 + Math.abs(loopSin(progress)) * 0.24;
  const verticalSweep = 30 + progress * 420;
  const rowYs = components.map((_, i) => 110 + i * 143);

  return (
    <svg
      className="preset-svg component-library-svg"
      viewBox="0 0 520 960"
      role="img"
      style={getPresetColorStyle(props.params)}
    >
      <defs>
        <linearGradient id="clGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#10203d" stopOpacity="0.78" />
          <stop offset="48%" stopColor="#071224" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#050817" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="clEdgeShade" x1="0" x2="1">
          <stop offset="0%" stopColor="#000816" stopOpacity="0.52" />
          <stop offset="45%" stopColor="#0b1430" stopOpacity="0" />
          <stop offset="100%" stopColor="#000511" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="clScan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="clVerticalFlare" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#f2d9a7" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="clMetal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#dcecff" stopOpacity="0.82" />
          <stop offset="45%" stopColor="#739bd5" stopOpacity="0.54" />
          <stop offset="100%" stopColor="#24416b" stopOpacity="0.76" />
        </linearGradient>
        <linearGradient id="clMetalDark" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#a8c6ee" stopOpacity="0.66" />
          <stop offset="62%" stopColor="#244064" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#081225" stopOpacity="0.94" />
        </linearGradient>
        <linearGradient id="clMatPurple" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c06bff" stopOpacity="0.94" />
          <stop offset="100%" stopColor="#6a26ff" stopOpacity="0.86" />
        </linearGradient>
        <linearGradient id="clMatGrey" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#91a4d6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#40516d" stopOpacity="0.76" />
        </linearGradient>
        <linearGradient id="clMatBlue" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#398cff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0c4fcb" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id="clMatPurpleShine" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="clMatGreyShine" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="clMatBlueShine" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="62%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
        <filter id="clGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="clSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="clModelGlow" x="-28%" y="-28%" width="156%" height="156%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="clGrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0 L0 0 L0 22" fill="none" stroke={colors.lineColor} strokeOpacity="0.16" strokeWidth="0.6" />
        </pattern>
        <pattern id="clScanlines" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0 H8" stroke="#9dbbff" strokeOpacity="0.055" />
        </pattern>
        <pattern id="clMaterialFacet" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M0 42 L42 0 M-11 12 L12 -11 M30 53 L53 30" stroke="#ffffff" strokeOpacity="0.1" />
          <path d="M0 0 L42 18 L24 42 Z" fill="#ffffff" fillOpacity="0.03" />
        </pattern>
        <clipPath id="clPanelClip">
          <path d="M26 1 H488 L519 30 V928 L487 959 H20 L1 940 V28 Z" />
        </clipPath>
        {rowYs.map((rowY) => (
          <clipPath key={rowY} id={`clThumbClip-${rowY}`}>
            <rect x="36" y={rowY} width="244" height="116" rx="8" />
          </clipPath>
        ))}
      </defs>

      <g clipPath="url(#clPanelClip)">
        <path d="M26 1 H488 L519 30 V928 L487 959 H20 L1 940 V28 Z" fill="url(#clGlass)" />
        <path d="M26 1 H488 L519 30 V928 L487 959 H20 L1 940 V28 Z" fill="url(#clEdgeShade)" />
        <rect x="0" y="0" width="520" height="960" fill="url(#clScanlines)" opacity="0.75" />
        <path d="M44 92 H484 M44 664 H480 M36 896 H484" stroke={colors.lineColor} strokeOpacity="0.14" />
        <rect x={verticalSweep} y="0" width="36" height="960" fill="url(#clVerticalFlare)" opacity="0.55" />
      </g>

      <path
        d="M26 1 H488 L519 30 V928 L487 959 H20 L1 940 V28 Z"
        fill="none"
        stroke={accentColor}
        strokeOpacity={glow}
        strokeWidth="1.3"
      />
      <path
        d="M1 88 L24 66 V31 M500 18 L519 35 M1 878 L22 900 V940 M492 942 L519 916"
        fill="none"
        stroke={accentColor}
        strokeOpacity="0.36"
        strokeWidth="2"
      />

      <text x="38" y="61" className="ui-title" fontSize="23" filter="url(#clSoftGlow)">COMPONENT LIBRARY</text>
      <text x="370" y="47" className="ui-small" opacity="0.48" fontSize="10">FUSION CORE</text>
      <text x="370" y="60" className="ui-small" opacity="0.48" fontSize="10">INTERFACE v3.2</text>
      <line x1="38" y1="80" x2="482" y2="80" stroke={colors.lineColor} strokeOpacity="0.26" />

      {components.map((comp, i) => {
        const rowY = rowYs[i];
        const phase = (progress * components.length + i * 0.56) % components.length;
        const active = phase > i && phase < i + 1.15;
        const pulse = Math.abs(loopSin(progress, i * 0.18));

        return (
          <g key={comp.name}>
            <ThumbnailFrame rowY={rowY} active={active}>
              <ComponentModel kind={comp.kind} rowY={rowY} pulse={pulse} />
            </ThumbnailFrame>
            <InfoPanel
              rowY={rowY}
              name={comp.name}
              version={comp.version}
              desc={comp.desc}
              active={active}
              pulse={pulse}
            />
          </g>
        );
      })}

      <text x="38" y="710" className="ui-title" fontSize="18" filter="url(#clSoftGlow)">MATERIAL PRESETS</text>

      <g transform="translate(38 735)">
        {materials.map((mat, i) => {
          const matPulse = 0.78 + Math.abs(loopSin(progress, i * 0.31)) * 0.2;
          const x = i * 160;

          return (
            <g key={mat.label.join(" ")} transform={`translate(${x} 0)`}>
              <rect
                width="102"
                height="58"
                rx="2"
                fill={mat.fill}
                opacity={matPulse}
                stroke={colors.lineColor}
                strokeOpacity="0.22"
              />
              <rect width="102" height="58" rx="2" fill="url(#clMaterialFacet)" opacity="0.78" />
              <path d="M0 58 L102 0 V58 Z" fill={mat.shine} opacity="0.9" />
              <text x="0" y="88" className="ui-small" fontSize="11" fontWeight="700" opacity="0.72">
                {mat.label[0]}
              </text>
              <text x="0" y="103" className="ui-small" fontSize="11" fontWeight="700" opacity="0.72">
                {mat.label[1]}
              </text>
            </g>
          );
        })}
      </g>

      <g transform="translate(38 918)">
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={i * 16}
            cy="0"
            r="2.4"
            fill={accentColor}
            opacity={0.2 + Math.abs(loopSin(progress, i * 0.14)) * 0.48}
            filter="url(#clSoftGlow)"
          />
        ))}
      </g>

      <rect x="1" y={scanY} width="518" height="40" fill="url(#clScan)" opacity="0.78" />
      <circle
        cx="493"
        cy="22"
        r="4"
        fill="#39f5d7"
        opacity={0.55 + Math.abs(loopSin(progress)) * 0.32}
        filter="url(#clGlow)"
      />
    </svg>
  );
};
