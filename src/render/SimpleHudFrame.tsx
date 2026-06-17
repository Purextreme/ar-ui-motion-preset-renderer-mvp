import type { ReactNode } from "react";
import type { PresetColorParams } from "./presetStyle";

type SimpleHudFrameProps = {
  idPrefix: string;
  width: number;
  height: number;
  title: string;
  progress: number;
  colors: PresetColorParams;
  accent?: "blue" | "purple";
  showGrid?: boolean;
  headerRight?: ReactNode;
  children: ReactNode;
};

export function SimpleHudFrame({
  idPrefix,
  width,
  height,
  title,
  progress,
  colors,
  accent = "blue",
  showGrid = false,
  headerRight,
  children,
}: SimpleHudFrameProps) {
  const x = 8;
  const y = 8;
  const innerWidth = width - 16;
  const innerHeight = height - 16;
  const headerY = 56;
  const corner = Math.min(24, width * 0.07, height * 0.1);
  const accentColor = accent === "purple" ? "#9b6cff" : colors.highlightTextColor;
  const pulse = 0.48 + Math.sin(progress * Math.PI * 2) * 0.12;
  const sweepX = x + ((progress * (innerWidth + 90)) % (innerWidth + 90)) - 90;

  return (
    <>
      <defs>
        <linearGradient id={`${idPrefix}FrameGlass`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#121b32" stopOpacity="0.46" />
          <stop offset="56%" stopColor="#07101f" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#050816" stopOpacity="0.58" />
        </linearGradient>
        <linearGradient id={`${idPrefix}FrameShade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#27406c" stopOpacity="0.12" />
          <stop offset="58%" stopColor="#0b142b" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#00040b" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${idPrefix}FrameSweep`} x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${idPrefix}FrameGlow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id={`${idPrefix}FrameScanlines`} width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 0 H7" stroke="#9ebdff" strokeOpacity="0.045" />
        </pattern>
        <pattern id={`${idPrefix}FrameGrid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0 H0 V24" fill="none" stroke={colors.lineColor} strokeOpacity="0.09" strokeWidth="0.6" />
        </pattern>
        <clipPath id={`${idPrefix}FrameClip`}>
          <rect x={x} y={y} width={innerWidth} height={innerHeight} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${idPrefix}FrameClip)`}>
        <rect x={x} y={y} width={innerWidth} height={innerHeight} fill={`url(#${idPrefix}FrameGlass)`} />
        <rect x={x} y={y} width={innerWidth} height={innerHeight} fill={`url(#${idPrefix}FrameShade)`} />
        <rect x={x} y={y} width={innerWidth} height={innerHeight} fill={`url(#${idPrefix}FrameScanlines)`} opacity="0.7" />
        {showGrid ? (
          <rect x={x} y={headerY} width={innerWidth} height={innerHeight - headerY + y} fill={`url(#${idPrefix}FrameGrid)`} opacity="0.72" />
        ) : null}
        <rect x={sweepX} y={y} width="54" height={innerHeight} fill={`url(#${idPrefix}FrameSweep)`} opacity="0.6" />
      </g>

      <rect
        x={x}
        y={y}
        width={innerWidth}
        height={innerHeight}
        fill="none"
        stroke={colors.lineColor}
        strokeOpacity={pulse}
        strokeWidth="1"
      />
      <path
        d={`M${x} ${y + corner} V${y} H${x + corner} M${x + innerWidth - corner} ${y} H${x + innerWidth} V${y + corner} M${x + innerWidth} ${y + innerHeight - corner} V${y + innerHeight} H${x + innerWidth - corner} M${x + corner} ${y + innerHeight} H${x} V${y + innerHeight - corner}`}
        fill="none"
        stroke={accentColor}
        strokeOpacity={0.62 + pulse * 0.28}
        strokeWidth="2"
        filter={`url(#${idPrefix}FrameGlow)`}
      />
      <text x={x + 26} y={y + 34} className="ui-title" fontSize="20" fill={accentColor} filter={`url(#${idPrefix}FrameGlow)`}>
        {title}
      </text>
      <line x1={x + 26} y1={headerY} x2={x + innerWidth - 28} y2={headerY} stroke={colors.lineColor} strokeOpacity="0.28" />
      <line x1={x + 26} y1={headerY + 4} x2={x + 68} y2={headerY + 4} stroke={accentColor} strokeOpacity="0.44" />
      <line x1={x + innerWidth - 60} y1={headerY + 4} x2={x + innerWidth - 28} y2={headerY + 4} stroke={accentColor} strokeOpacity="0.36" />
      {headerRight ? <g>{headerRight}</g> : null}

      {children}
    </>
  );
}
