import type { PresetComponent, PresetType } from "./types";
import { OrbitalNavigationPanel } from "../presets/OrbitalNavigationPanel";
import { MaterialColorPanel } from "../presets/MaterialColorPanel";
import { ShipDetailPanel } from "../presets/ShipDetailPanel";

export const presetLabels: Record<PresetType, string> = {
  OrbitalNavigationPanel: "Orbital Navigation",
  MaterialColorPanel: "Material / Color",
  ShipDetailPanel: "Ship Detail",
};

export const presetRegistry: Record<PresetType, PresetComponent> = {
  OrbitalNavigationPanel,
  MaterialColorPanel,
  ShipDetailPanel,
};
