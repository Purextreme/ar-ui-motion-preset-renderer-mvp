# AGENTS.md

AR UI motion preset renderer — React + Vite + TypeScript. Renders animated SVG presets, previews in browser, exports PNG frame sequences via Playwright.

## Commands

- `npm run dev` — Vite dev server on `127.0.0.1` (required; render API is a Vite middleware)
- `npm run check` — TypeScript type-check only (`tsc --noEmit`)
- `npm run build` — Type-check then Vite production build (`tsc -b && vite build`)
- `npm run render` — Full pipeline: starts Vite, Playwright screenshots frames to `output/<PresetType>/`

Always run `npm run check` before `npm run build`. The build script calls `tsc -b` first and will fail on type errors.

## Preset Development

Detailed guide: `PRESET_DEVELOPMENT_GUIDE.md`. Key rules:

- Presets live in `src/presets/<Name>/index.tsx` — one folder per preset
- Register in `src/render/presetRegistry.ts` (component + label) and add type to `PresetType` in `src/render/types.ts`
- Add default instance in `src/render/defaultPresets.ts`
- Do NOT modify framework files for ordinary presets: `scripts/render-core.ts`, `vite.config.ts`, `src/render/RenderScene.tsx`, `src/render/RenderOnly.tsx`, `src/editor/*`, `src/App.tsx`

## Architecture

```
src/presets/          — individual preset components (one folder each)
src/render/types.ts   — PresetType, PresetProps, PresetComponent, RenderJob
src/render/presetRegistry.ts — PresetType → component + label mapping
src/render/defaultPresets.ts — default element instances for the editor
src/render/presetStyle.ts    — color helpers (getPresetColors, getPresetColorStyle)
src/render/RenderScene.tsx    — renders all visible presets (centered, z-ordered)
src/render/RenderOnly.tsx     — headless render mode for Playwright
src/utils/animation.ts        — getProgress, loopSin, loopCos, clamp
src/editor/                  — AssetPanel, Stage, TimelineControls, EditorLayout
scripts/render-core.ts        — Playwright screenshot engine
scripts/render-sequence.ts    — script entrypoint
```

## Conventions

- All animation driven by `context.progress` (0→1). Use `loopSin`/`loopCos` from `src/utils/animation.ts` for periodic effects. Never use `Date.now()`, timers, or `Math.random()`.
- Colors via `getPresetColors(props.params)` and `getPresetColorStyle(params)`. CSS classes: `ui-title`, `ui-caption`, `ui-small`, `ui-value`, `ui-guide`. Don't hardcode white text.
- Root SVG element: `<svg className="preset-svg ..." viewBox="0 0 W H">`. Keep text as `<text>`, no nested HTML.
- `<defs>` ids must be prefixed with preset name to avoid collisions.
- No external image URLs — rendering must work offline.
- Presets positioned by RenderScene (centered absolute). Use `width/height/scale/rotation/opacity/zIndex` in default data.
- Export captures transparent PNGs. Don't change output folder behavior.

## Render Pipeline

The Vite dev server includes a middleware at `/api/render` that accepts POSTed `RenderJob` JSON, launches Playwright (msedge → chrome), navigates to `/render` (RenderOnly mode), and screenshots each frame. Each preset exports independently to `output/<PresetType>/frame_NNNN.png`.

Browser policy: uses `AR_RENDER_BROWSER_CHANNEL` env var, falls back to msedge, then chrome. No bundled Playwright executables.
