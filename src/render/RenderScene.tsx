import { getProgress } from "../utils/animation";
import { presetRegistry } from "./presetRegistry";
import type { PresetProps, RenderAssets } from "./types";

type RenderSceneProps = {
  canvasWidth: number;
  canvasHeight: number;
  frame: number;
  totalFrames: number;
  fps: number;
  assets: RenderAssets;
  presets: PresetProps[];
  showReference: boolean;
  selectedPresetId?: string;
  onSelectPreset?: (id: string) => void;
  onMovePreset?: (id: string, x: number, y: number) => void;
};

export function RenderScene({
  canvasWidth,
  canvasHeight,
  frame,
  totalFrames,
  fps,
  assets,
  presets,
  showReference,
  selectedPresetId,
  onSelectPreset,
  onMovePreset,
}: RenderSceneProps) {
  const progress = getProgress(frame, totalFrames);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>, preset: PresetProps) {
    if (!onMovePreset) {
      return;
    }

    event.stopPropagation();
    onSelectPreset?.(preset.id);

    const stage = event.currentTarget.parentElement;
    if (!stage) {
      return;
    }

    const startRect = stage.getBoundingClientRect();
    const ratioX = canvasWidth / startRect.width;
    const ratioY = canvasHeight / startRect.height;
    const startClientX = event.clientX;
    const startClientY = event.clientY;
    const startX = preset.x;
    const startY = preset.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const nextX = startX + (moveEvent.clientX - startClientX) * ratioX;
      const nextY = startY + (moveEvent.clientY - startClientY) * ratioY;
      onMovePreset(preset.id, Math.round(nextX), Math.round(nextY));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }

  return (
    <div
      className="render-scene"
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
    >
      {showReference && assets.referenceImage ? (
        <img className="reference-image" src={assets.referenceImage} alt="" />
      ) : null}

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
                left: preset.x,
                top: preset.y,
                width: preset.width,
                height: preset.height,
                opacity: preset.opacity,
                zIndex: preset.zIndex,
                transform: `scale(${preset.scale}) rotate(${preset.rotation}deg)`,
              }}
              onPointerDown={(event) => handlePointerDown(event, preset)}
            >
              <PresetComponent
                props={preset}
                context={{
                  frame,
                  totalFrames,
                  fps,
                  progress,
                  assets,
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
