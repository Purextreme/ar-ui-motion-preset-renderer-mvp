import type { PresetProps } from "./types";

export function createDefaultPresets(): PresetProps[] {
  return [
    {
      id: "orbital-navigation",
      type: "OrbitalNavigationPanel",
      x: 112,
      y: 96,
      width: 520,
      height: 760,
      scale: 1,
      rotation: 0,
      opacity: 1,
      visible: true,
      zIndex: 1,
      params: {},
    },
    {
      id: "material-color",
      type: "MaterialColorPanel",
      x: 112,
      y: 654,
      width: 500,
      height: 300,
      scale: 1,
      rotation: 0,
      opacity: 1,
      visible: true,
      zIndex: 2,
      params: {
        selectedMaterial: "metallic",
        selectedColor: "purple",
      },
    },
    {
      id: "ship-detail",
      type: "ShipDetailPanel",
      x: 1250,
      y: 146,
      width: 520,
      height: 760,
      scale: 1,
      rotation: 0,
      opacity: 1,
      visible: true,
      zIndex: 3,
      params: {},
    },
  ];
}
