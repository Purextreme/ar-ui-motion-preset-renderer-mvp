import { loopSin } from "../../utils/animation";
import { getPresetColors, getPresetColorStyle } from "../../render/presetStyle";
import type { PresetComponent } from "../../render/types";

const components = [
  {
    name: "CORE REACTOR",
    version: "MK-III",
    desc: "Balanced Output",
    imageSrc: "/component-library/core-reactor.png",
  },
  {
    name: "HABITAT RING",
    version: "H2-R",
    desc: "High Capacity",
    imageSrc: "/component-library/habitat-ring.png",
  },
  {
    name: "DOCKING NODE",
    version: "DN-6",
    desc: "Multi-Port",
    imageSrc: "/component-library/docking-node.png",
  },
  {
    name: "ENGINE CLUSTER",
    version: "EC-9",
    desc: "Vector Thrust",
    imageSrc: "/component-library/engine-cluster.png",
  },
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
      <g clipPath={`url(#clThumbClip-${rowY})`}>{children}</g>
      <rect x="36" y={rowY} width="244" height="116" rx="8" fill="url(#clThumbShade)" opacity="0.56" />
      <rect x="36" y={rowY} width="244" height="116" rx="8" fill="url(#clGrid)" opacity="0.2" />
      <path
        d={`M46 ${rowY + 30} H270 M62 ${rowY + 6} V${rowY + 110} M254 ${rowY + 6} V${rowY + 110}`}
        stroke="var(--preset-line-color)"
        strokeOpacity="0.12"
      />
      <path
        d={`M44 ${rowY + 13} V${rowY + 8} H61 M255 ${rowY + 8} H272 V${rowY + 25} M272 ${rowY + 91} V${rowY + 108} H255 M61 ${rowY + 108} H44 V${rowY + 91}`}
        fill="none"
        stroke="var(--preset-highlight-text-color)"
        strokeOpacity={active ? 0.68 : 0.36}
        strokeWidth="1.4"
      />
    </g>
  );
}

function ComponentImage({
  imageSrc,
  rowY,
  pulse,
}: {
  imageSrc: string;
  rowY: number;
  pulse: number;
}) {
  return (
    <g>
      <image
        href={imageSrc}
        x="36"
        y={rowY}
        width="244"
        height="116"
        preserveAspectRatio="xMidYMid slice"
        opacity={0.86 + pulse * 0.12}
      />
      <rect
        x="36"
        y={rowY}
        width="244"
        height="116"
        fill="url(#clImageSweep)"
        opacity={0.22 + pulse * 0.12}
        style={{ mixBlendMode: "screen" }}
      />
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
        <linearGradient id="clThumbShade" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#08172d" stopOpacity="0.12" />
          <stop offset="62%" stopColor="#050b18" stopOpacity="0" />
          <stop offset="100%" stopColor="#02050d" stopOpacity="0.42" />
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
        <linearGradient id="clImageSweep" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="42%" stopColor="#9fc6ff" stopOpacity="0.08" />
          <stop offset="78%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
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
              <ComponentImage imageSrc={comp.imageSrc} rowY={rowY} pulse={pulse} />
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
