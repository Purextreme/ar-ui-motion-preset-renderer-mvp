import type { PresetComponent, PresetType } from "./types";
import { OrbitalNavigationPanel } from "../presets/OrbitalNavigationPanel";
import { MaterialColorPanel } from "../presets/MaterialColorPanel";
import { ShipDetailPanel } from "../presets/ShipDetailPanel";
import { ComponentLibrary } from "../presets/ComponentLibrary";
import { OrbitalOverview } from "../presets/OrbitalOverview";
import { SystemDiagnosticsPanel } from "../presets/SystemDiagnosticsPanel";
import { DesignConfidenceCard } from "../presets/DesignConfidenceCard";
import { TrajectorySimulationCard } from "../presets/TrajectorySimulationCard";
import { HullStressMap } from "../presets/HullStressMap";
import { ShipIdentityCard } from "../presets/ShipIdentityCard";
import { RingSegmentTag } from "../presets/RingSegmentTag";
import { ThrustVectoringPanel } from "../presets/ThrustVectoringPanel";
import { StructuralIntegrityCard } from "../presets/StructuralIntegrityCard";
import { CourseVectorPanel } from "../presets/CourseVectorPanel";
import { OrbitalNavigationCard } from "../presets/OrbitalNavigationCard";

export const presetLabels: Record<PresetType, string> = {
  OrbitalNavigationPanel: "Orbital Navigation",
  MaterialColorPanel: "Material / Color",
  ShipDetailPanel: "Ship Detail",
  ComponentLibrary: "Component Library",
  OrbitalOverview: "Orbital Overview",
  SystemDiagnosticsPanel: "System Diagnostics",
  DesignConfidenceCard: "Design Confidence",
  TrajectorySimulationCard: "Trajectory Simulation",
  HullStressMap: "Hull Stress Map",
  ShipIdentityCard: "Ship Identity",
  RingSegmentTag: "Ring Segment",
  ThrustVectoringPanel: "Thrust Vectoring",
  StructuralIntegrityCard: "Structural Integrity",
  CourseVectorPanel: "Course Vector",
  OrbitalNavigationCard: "Orbital Navigation Card",
};

export const presetRegistry: Record<PresetType, PresetComponent> = {
  OrbitalNavigationPanel,
  MaterialColorPanel,
  ShipDetailPanel,
  ComponentLibrary,
  OrbitalOverview,
  SystemDiagnosticsPanel,
  DesignConfidenceCard,
  TrajectorySimulationCard,
  HullStressMap,
  ShipIdentityCard,
  RingSegmentTag,
  ThrustVectoringPanel,
  StructuralIntegrityCard,
  CourseVectorPanel,
  OrbitalNavigationCard,
};
