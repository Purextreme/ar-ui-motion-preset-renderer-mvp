import { RenderScene } from "../render/RenderScene";
import type { PresetProps } from "../render/types";

type StageProps = {
  canvasWidth: number;
  canvasHeight: number;
  frame: number;
  totalFrames: number;
  fps: number;
  presets: PresetProps[];
  selectedPresetId: string;
};

export function Stage(props: StageProps) {
  const visiblePresets = props.presets.filter((preset) => preset.id === props.selectedPresetId);

  return (
    <main className="stage-panel">
      <div className="stage-toolbar">
        <span>{props.canvasWidth} x {props.canvasHeight}</span>
        <span>frame {props.frame}</span>
      </div>
      <div className="stage-scroll">
        <div className="stage-scale-frame">
          <RenderScene {...props} presets={visiblePresets} previewGuides />
        </div>
      </div>
    </main>
  );
}
