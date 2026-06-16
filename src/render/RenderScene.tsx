import { getProgress } from "../utils/animation";
import { presetRegistry } from "./presetRegistry";
import type { PresetProps } from "./types";

type RenderSceneProps = {
  canvasWidth: number;
  canvasHeight: number;
  frame: number;
  totalFrames: number;
  fps: number;
  presets: PresetProps[];
  previewGuides: boolean;
  selectedPresetId?: string;
};

export function RenderScene({
  canvasWidth,
  canvasHeight,
  frame,
  totalFrames,
  fps,
  presets,
  previewGuides,
  selectedPresetId,
}: RenderSceneProps) {
  const progress = getProgress(frame, totalFrames);

  return (
    <div
      className="render-scene"
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
    >
      {presets
        .filter((preset) => preset.visible)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((preset) => {
          const PresetComponent = presetRegistry[preset.type];

          return (
            <div
              key={preset.id}
              className={`preset-layer ${selectedPresetId === preset.id ? "is-selected" : ""}`}
              style={{
                left: "50%",
                top: "50%",
                width: preset.width,
                height: preset.height,
                opacity: preset.opacity,
                zIndex: preset.zIndex,
                transform: `translate(-50%, -50%) scale(${preset.scale}) rotate(${preset.rotation}deg)`,
              }}
            >
              <PresetComponent
                props={preset}
                context={{
                  frame,
                  totalFrames,
                  fps,
                  progress,
                  previewGuides,
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
