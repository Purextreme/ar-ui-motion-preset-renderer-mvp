import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import type { RenderJob } from "../src/render/types";

export type RenderResult = {
  presetTypes: string[];
  outputRoot: string;
  frames: number;
};

export async function renderJob(
  job: RenderJob,
  baseUrl: string,
  outputRoot = path.resolve(process.cwd(), "output"),
): Promise<RenderResult> {
  const browser = await chromium.launch();

  try {
    for (const preset of job.presets) {
      const targetDir = path.join(outputRoot, preset.type);
      await rm(targetDir, { recursive: true, force: true });
      await mkdir(targetDir, { recursive: true });

      const page = await browser.newPage({
        viewport: {
          width: job.canvasWidth,
          height: job.canvasHeight,
        },
        deviceScaleFactor: 1,
      });

      await page.addInitScript((payload) => {
        window.__AR_RENDER_JOB__ = payload;
      }, {
        ...job,
        presets: [preset],
      });

      await page.goto(`${baseUrl.replace(/\/$/, "")}/render`, {
        waitUntil: "networkidle",
      });

      for (let frame = 0; frame < job.totalFrames; frame += 1) {
        await page.evaluate(async (nextFrame) => {
          window.__AR_SET_FRAME__?.(nextFrame);
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          });
        }, frame);

        await page.screenshot({
          path: path.join(targetDir, `frame_${String(frame).padStart(4, "0")}.png`),
          omitBackground: true,
        });
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  return {
    presetTypes: job.presets.map((preset) => preset.type),
    outputRoot,
    frames: job.totalFrames,
  };
}
