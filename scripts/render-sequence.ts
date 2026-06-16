import { createServer } from "vite";
import { renderJob } from "./render-core";
import { createDefaultPresets } from "../src/render/defaultPresets";
import type { RenderJob } from "../src/render/types";

const server = await createServer({
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  logLevel: "warn",
});

await server.listen();

try {
  const baseUrl = server.resolvedUrls?.local[0] ?? "http://127.0.0.1:5173/";
  const job: RenderJob = {
    canvasWidth: 1920,
    canvasHeight: 1080,
    totalFrames: 100,
    fps: 25,
    assets: {},
    presets: createDefaultPresets(),
  };

  const result = await renderJob(job, baseUrl);
  console.log(`Rendered ${result.frames} frames for ${result.presetTypes.join(", ")}`);
  console.log(`Output: ${result.outputRoot}`);
} finally {
  await server.close();
}
