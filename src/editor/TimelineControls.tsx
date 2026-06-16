type TimelineControlsProps = {
  frame: number;
  totalFrames: number;
  fps: number;
  isPlaying: boolean;
  isRendering: boolean;
  renderStatus: string;
  onFrameChange: (frame: number) => void;
  onTotalFramesChange: (totalFrames: number) => void;
  onFpsChange: (fps: number) => void;
  onTogglePlayback: () => void;
  onRenderCurrent: () => void;
  onRenderAll: () => void;
};

export function TimelineControls({
  frame,
  totalFrames,
  fps,
  isPlaying,
  isRendering,
  renderStatus,
  onFrameChange,
  onTotalFramesChange,
  onFpsChange,
  onTogglePlayback,
  onRenderCurrent,
  onRenderAll,
}: TimelineControlsProps) {
  return (
    <footer className="timeline">
      <button type="button" onClick={onTogglePlayback}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <input
        className="frame-slider"
        type="range"
        min={0}
        max={Math.max(0, totalFrames - 1)}
        value={frame}
        onChange={(event) => onFrameChange(Number(event.target.value))}
      />
      <div className="frame-readout">
        {frame} / {Math.max(0, totalFrames - 1)}
      </div>
      <label>
        frames
        <input
          type="number"
          min={1}
          value={totalFrames}
          onChange={(event) => onTotalFramesChange(Number(event.target.value))}
        />
      </label>
      <label>
        fps
        <input
          type="number"
          min={1}
          value={fps}
          onChange={(event) => onFpsChange(Number(event.target.value))}
        />
      </label>
      <button type="button" disabled={isRendering} onClick={onRenderCurrent}>
        Render Current
      </button>
      <button type="button" disabled={isRendering} onClick={onRenderAll}>
        Render All
      </button>
      <div className="render-status">{renderStatus}</div>
    </footer>
  );
}
