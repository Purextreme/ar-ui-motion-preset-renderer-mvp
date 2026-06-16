import { chromium, type Page } from "playwright";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import type { RenderJob } from "../src/render/types";

export type RenderResult = {
  presetTypes: string[];
  outputRoot: string;
  frames: number;
};

const openSourceTextFonts = [
  "OPPOSans",
  "OPPO Sans",
  "Source Han Sans SC",
  "Source Han Sans CN",
  "Source Han Sans",
  "Noto Sans CJK SC",
  "Noto Sans SC",
  "思源黑体",
  "思源黑体 SC",
  "思源黑体 CN",
] as const;

type PlatformFont = {
  familyName: string;
  glyphCount: number;
};

function normalizeFontName(fontName: string) {
  return fontName
    .replace(/^["']|["']$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function isOpenSourceTextFont(fontName: string) {
  const normalizedFont = normalizeFontName(fontName);

  return openSourceTextFonts.some((openSourceFont) => {
    const normalizedOpenSourceFont = normalizeFontName(openSourceFont);
    return normalizedFont === normalizedOpenSourceFont
      || normalizedFont.startsWith(`${normalizedOpenSourceFont} `);
  });
}

async function verifyOpenSourceTextFonts(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const client = await page.context().newCDPSession(page);
  await client.send("DOM.enable");
  await client.send("CSS.enable");

  const { root } = await client.send("DOM.getDocument");
  const { nodeIds } = await client.send("DOM.querySelectorAll", {
    nodeId: root.nodeId,
    selector: "text",
  });

  if (nodeIds.length === 0) {
    throw new Error("Font verification failed: no SVG text nodes were found in the render scene.");
  }

  const usedFonts = new Map<string, number>();

  for (const nodeId of nodeIds) {
    const { fonts } = await client.send("CSS.getPlatformFontsForNode", { nodeId }) as { fonts: PlatformFont[] };

    for (const font of fonts) {
      if (font.glyphCount > 0) {
        usedFonts.set(font.familyName, (usedFonts.get(font.familyName) ?? 0) + font.glyphCount);
      }
    }
  }

  const blockedFonts = [...usedFonts.keys()].filter((fontName) => !isOpenSourceTextFont(fontName));

  if (blockedFonts.length > 0) {
    throw new Error(
      `Font verification failed: Chromium used ${blockedFonts.join(", ")}. `
        + `Install or enable one of these open-source fonts: ${openSourceTextFonts.join(", ")}.`,
    );
  }

  if (usedFonts.size === 0) {
    throw new Error("Font verification failed: Chromium did not report any platform fonts for SVG text.");
  }
}

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
      await verifyOpenSourceTextFonts(page);

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
