import { RenderScene } from "../render/RenderScene";
import type { PresetProps, RenderAssets } from "../render/types";

type StageProps = {
  canvasWidth: number;
  canvasHeight: number;
  frame: number;
  totalFrames: number;
  fps: number;
  assets: RenderAssets;
  presets: PresetProps[];
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
  onMovePreset: (id: string, x: number, y: number) => void;
};

export function Stage(props: StageProps) {
  return (
    <main className="stage-panel">
      <div className="stage-toolbar">
        <span>{props.canvasWidth} x {props.canvasHeight}</span>
        <span>frame {props.frame}</span>
      </div>
      <div className="stage-scroll">
        <div className="stage-scale-frame">
          <RenderScene {...props} showReference />
        </div>
      </div>
    </main>
  );
}
