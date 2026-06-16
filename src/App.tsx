import { useEffect, useMemo, useState } from "react";
import { AssetPanel } from "./editor/AssetPanel";
import { EditorLayout } from "./editor/EditorLayout";
import { Inspector } from "./editor/Inspector";
import { Stage } from "./editor/Stage";
import { TimelineControls } from "./editor/TimelineControls";
import { createDefaultPresets } from "./render/defaultPresets";
import type { PresetProps, RenderAssets, RenderJob } from "./render/types";

const defaultCanvas = {
  width: 1920,
  height: 1080,
};

export function App() {
  const [canvasWidth, setCanvasWidth] = useState(defaultCanvas.width);
  const [canvasHeight, setCanvasHeight] = useState(defaultCanvas.height);
  const [presets, setPresets] = useState<PresetProps[]>(() => createDefaultPresets());
  const [selectedPresetId, setSelectedPresetId] = useState("orbital-navigation");
  const [assets, setAssets] = useState<RenderAssets>({});
  const [frame, setFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(100);
  const [fps, setFps] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [renderStatus, setRenderStatus] = useState("Ready");

  const selectedPreset = useMemo(
    () => presets.find((preset) => preset.id === selectedPresetId) ?? presets[0],
    [presets, selectedPresetId],
  );

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setFrame((currentFrame) => (currentFrame + 1) % Math.max(totalFrames, 1));
    }, 1000 / Math.max(fps, 1));

    return () => window.clearInterval(interval);
  }, [fps, isPlaying, totalFrames]);

  function updatePreset(nextPreset: PresetProps) {
    setPresets((currentPresets) =>
      currentPresets.map((preset) => (preset.id === nextPreset.id ? nextPreset : preset)),
    );
  }

  function updatePresetPatch(id: string, patch: Partial<PresetProps>) {
    setPresets((currentPresets) =>
      currentPresets.map((preset) => (preset.id === id ? { ...preset, ...patch } : preset)),
    );
  }

  function handleShipImage(url: string) {
    setAssets((currentAssets) => ({
      ...currentAssets,
      shipImage: url,
    }));
    setPresets((currentPresets) =>
      currentPresets.map((preset) =>
        preset.type === "ShipDetailPanel"
          ? {
              ...preset,
              params: {
                ...preset.params,
                shipImageUrl: url,
              },
            }
          : preset,
      ),
    );
  }

  async function renderPresets(targetPresets: PresetProps[]) {
    setIsRendering(true);
    setRenderStatus("Rendering...");

    const job: RenderJob = {
      canvasWidth,
      canvasHeight,
      totalFrames,
      fps,
      assets: {
        shipImage: assets.shipImage,
      },
      presets: targetPresets.map((preset) => ({
        ...preset,
        visible: true,
      })),
    };

    try {
      const response = await fetch("/api/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload.error ?? `Render failed: ${response.status}`);
      }

      const result = await response.json() as { outputRoot: string; frames: number };
      setRenderStatus(`Done: ${result.frames} frames -> ${result.outputRoot}`);
    } catch (error) {
      setRenderStatus(error instanceof Error ? error.message : String(error));
    } finally {
      setIsRendering(false);
    }
  }

  return (
    <EditorLayout
      left={
        <AssetPanel
          presets={presets}
          selectedPresetId={selectedPresetId}
          assets={assets}
          onSelectPreset={setSelectedPresetId}
          onToggleVisible={(id, visible) => updatePresetPatch(id, { visible })}
          onReferenceImage={(url, width, height) => {
            setAssets((currentAssets) => ({
              ...currentAssets,
              referenceImage: url,
            }));
            setCanvasWidth(width);
            setCanvasHeight(height);
          }}
          onShipImage={handleShipImage}
        />
      }
      center={
        <Stage
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          frame={frame}
          totalFrames={totalFrames}
          fps={fps}
          assets={assets}
          presets={presets}
          selectedPresetId={selectedPresetId}
          onSelectPreset={setSelectedPresetId}
          onMovePreset={(id, x, y) => updatePresetPatch(id, { x, y })}
        />
      }
      right={<Inspector preset={selectedPreset} onChange={updatePreset} />}
      bottom={
        <TimelineControls
          frame={frame}
          totalFrames={totalFrames}
          fps={fps}
          isPlaying={isPlaying}
          isRendering={isRendering}
          renderStatus={renderStatus}
          onFrameChange={setFrame}
          onTotalFramesChange={(nextTotalFrames) => {
            const safeTotalFrames = Math.max(1, Math.round(nextTotalFrames));
            setTotalFrames(safeTotalFrames);
            setFrame((currentFrame) => Math.min(currentFrame, safeTotalFrames - 1));
          }}
          onFpsChange={(nextFps) => setFps(Math.max(1, Math.round(nextFps)))}
          onTogglePlayback={() => setIsPlaying((current) => !current)}
          onRenderCurrent={() => renderPresets([selectedPreset])}
          onRenderAll={() => renderPresets(presets)}
        />
      }
    />
  );
}
