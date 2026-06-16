import { loopSin } from "../../utils/animation";
import { colorSwatches } from "../../utils/colors";
import type { PresetComponent } from "../../render/types";

const materials = [
  { key: "metallic", label: "metallic", fill: "#c7d7e8" },
  { key: "carbon", label: "carbon fiber", fill: "#172238" },
  { key: "energy", label: "purple energy", fill: "#7a45ff" },
];

const colors = [
  ["white", colorSwatches.white],
  ["purple", colorSwatches.purple],
  ["blue", colorSwatches.blue],
  ["dark blue", colorSwatches.darkBlue],
  ["teal", colorSwatches.teal],
] as const;

export const MaterialColorPanel: PresetComponent = ({ props, context }) => {
  const { progress } = context;
  const selectedMaterial = String(props.params.selectedMaterial ?? "metallic");
  const scanX = progress * 210 - 80;

  return (
    <svg className="preset-svg material-svg" viewBox="0 0 500 300" role="img">
      <defs>
        <linearGradient id="materialGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#132744" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#130d2a" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="materialScan" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <pattern id="carbonPattern" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 L12 0 M-4 4 L4 -4 M8 16 L16 8" stroke="#71809c" strokeOpacity="0.35" />
        </pattern>
        {materials.map((material, index) => (
          <clipPath key={material.key} id={`materialTileClip-${index}`}>
            <rect x="0" y="0" width="124" height="100" rx="6" />
          </clipPath>
        ))}
      </defs>

      <g>
        <rect x="1" y="1" width="498" height="298" rx="7" fill="url(#materialGlass)" />
        <rect x="1.5" y="1.5" width="497" height="297" rx="7" fill="none" stroke="#6fe5ff" strokeOpacity="0.45" />
        <text x="28" y="42" className="ui-title">MATERIAL / COLOR</text>

        <g transform="translate(28 76)">
          {materials.map((material, index) => {
            const x = index * 146;
            const selected = selectedMaterial === material.key || (selectedMaterial === "metallic" && index === 0);
            const pulse = selected ? 0.45 + Math.abs(loopSin(progress)) * 0.25 : 0.18;

            return (
              <g key={material.key} transform={`translate(${x} 0)`}>
                <rect
                  width="124"
                  height="100"
                  rx="6"
                  fill={material.key === "carbon" ? "url(#carbonPattern)" : material.fill}
                  opacity={material.key === "energy" ? 0.82 : 0.7}
                  stroke={selected ? "#8a6cff" : "#5ee7ff"}
                  strokeOpacity={pulse}
                />
                <g clipPath={`url(#materialTileClip-${index})`}>
                  <path
                    d={`M${scanX} 102 L${scanX + 44} 0`}
                    stroke="url(#materialScan)"
                    strokeWidth="18"
                    opacity="0.5"
                  />
                </g>
                <text x="12" y="126" className="ui-small">{material.label}</text>
              </g>
            );
          })}
        </g>

        <g transform="translate(30 238)">
          {colors.map(([label, color], index) => {
            const pulse = 1 + Math.max(0, loopSin(progress, index * 0.11)) * 0.22;

            return (
              <g key={label} transform={`translate(${index * 54} 0)`}>
                <circle r={13 * pulse} cx="13" cy="0" fill={color} opacity="0.88" />
                {index === 1 ? (
                  <circle r="19" cx="13" cy="0" fill="none" stroke="#ffffff" strokeOpacity="0.75" />
                ) : null}
              </g>
            );
          })}
        </g>

        <g transform="translate(432 32)" stroke="#7bdcff" strokeOpacity="0.75">
          <path d="M0 0 H28 M0 8 H22 M0 16 H28" />
        </g>
      </g>
    </svg>
  );
};
