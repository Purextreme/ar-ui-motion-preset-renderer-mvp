import type { CSSProperties } from "react";

export type PresetColorParams = {
  textColor: string;
  lineColor: string;
  highlightTextColor: string;
};

export const defaultPresetColors: PresetColorParams = {
  textColor: "#c8e5ff",
  lineColor: "#7ec4ff",
  highlightTextColor: "#e9f8ff",
};

function readColor(params: Record<string, unknown>, key: keyof PresetColorParams) {
  const value = params[key];
  return typeof value === "string" && value.trim() ? value : defaultPresetColors[key];
}

export function getPresetColors(params: Record<string, unknown>): PresetColorParams {
  return {
    textColor: readColor(params, "textColor"),
    lineColor: readColor(params, "lineColor"),
    highlightTextColor: readColor(params, "highlightTextColor"),
  };
}

export function getPresetColorStyle(params: Record<string, unknown>): CSSProperties {
  const colors = getPresetColors(params);

  return {
    "--preset-text-color": colors.textColor,
    "--preset-line-color": colors.lineColor,
    "--preset-highlight-text-color": colors.highlightTextColor,
  } as CSSProperties;
}
