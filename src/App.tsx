import { useEffect, useMemo, useState } from "react";
import { AssetPanel } from "./editor/AssetPanel";
import { EditorLayout } from "./editor/EditorLayout";
import { Stage } from "./editor/Stage";
import { TimelineControls } from "./editor/TimelineControls";
import { createDefaultPresets } from "./render/defaultPresets";
import type { PresetProps, RenderJob } from "./render/types";

const defaultCanvas = {
  width: 1000,
  height: 1000,
};

export function App() {
  const canvasWidth = defaultCanvas.width;
  const canvasHeight = defaultCanvas.height;
  const [presets, setPresets] = useState<PresetProps[]>(() => createDefaultPresets());
  const [selectedPresetId, setSelectedPresetId] = useState("orbital-navigation");
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

  async function renderPresets(targetPresets: PresetProps[]) {
    setIsRendering(true);
    setRenderStatus("Rendering...");

    const job: RenderJob = {
      canvasWidth,
      canvasHeight,
      totalFrames,
      fps,
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
          onSelectPreset={setSelectedPresetId}
          onUpdatePresetParams={(presetId, nextParams) => {
            setPresets((currentPresets) => currentPresets.map((preset) => (
              preset.id === presetId
                ? { ...preset, params: { ...preset.params, ...nextParams } }
                : preset
            )));
          }}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
      }
      center={
        <Stage
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          frame={frame}
          totalFrames={totalFrames}
          fps={fps}
          presets={presets}
          selectedPresetId={selectedPresetId}
        />
      }
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
