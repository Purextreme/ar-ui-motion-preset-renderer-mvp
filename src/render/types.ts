export type PresetType =
  | "OrbitalNavigationPanel"
  | "MaterialColorPanel"
  | "ShipDetailPanel"
  | "ComponentLibrary"
  | "OrbitalOverview";

export type PresetProps = {
  id: string;
  type: PresetType;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  zIndex: number;
  params: Record<string, unknown>;
};

export type PresetRenderContext = {
  frame: number;
  totalFrames: number;
  fps: number;
  progress: number;
  previewGuides: boolean;
};

export type PresetComponent = (args: {
  props: PresetProps;
  context: PresetRenderContext;
}) => React.ReactElement | null;

export type RenderJob = {
  canvasWidth: number;
  canvasHeight: number;
  totalFrames: number;
  fps: number;
  presets: PresetProps[];
};

declare global {
  interface Window {
    __AR_RENDER_JOB__?: RenderJob;
    __AR_SET_FRAME__?: (frame: number) => void;
  }
}
