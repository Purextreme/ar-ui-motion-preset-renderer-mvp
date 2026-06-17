import type { PresetComponent, PresetType } from "./types";
import { OrbitalNavigationPanel } from "../presets/OrbitalNavigationPanel";
import { MaterialColorPanel } from "../presets/MaterialColorPanel";
import { ShipDetailPanel } from "../presets/ShipDetailPanel";
import { ComponentLibrary } from "../presets/ComponentLibrary";
import { OrbitalOverview } from "../presets/OrbitalOverview";

export const presetLabels: Record<PresetType, string> = {
  OrbitalNavigationPanel: "Orbital Navigation",
  MaterialColorPanel: "Material / Color",
  ShipDetailPanel: "Ship Detail",
  ComponentLibrary: "Component Library",
  OrbitalOverview: "Orbital Overview",
};

export const presetRegistry: Record<PresetType, PresetComponent> = {
  OrbitalNavigationPanel,
  MaterialColorPanel,
  ShipDetailPanel,
  ComponentLibrary,
  OrbitalOverview,
};
