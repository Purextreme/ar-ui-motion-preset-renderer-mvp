import { useEffect, useState } from "react";
import { RenderScene } from "./RenderScene";
import type { RenderJob } from "./types";

type RenderOnlyProps = {
  job: RenderJob;
};

export function RenderOnly({ job }: RenderOnlyProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    document.body.classList.add("render-body");
    window.__AR_SET_FRAME__ = setFrame;

    return () => {
      document.body.classList.remove("render-body");
      delete window.__AR_SET_FRAME__;
    };
  }, []);

  return (
    <RenderScene
      canvasWidth={job.canvasWidth}
      canvasHeight={job.canvasHeight}
      frame={frame}
      totalFrames={job.totalFrames}
      fps={job.fps}
      assets={job.assets}
      presets={job.presets}
      showReference={false}
    />
  );
}
