# Repository Guidelines

## Project Structure & Module Organization

This is a React + Vite + TypeScript project for rendering animated AR-style SVG presets and exporting PNG frame sequences. Source code lives in `src/`. Preset components are organized under `src/presets/<PresetName>/index.tsx`. Rendering types, registry, defaults, and scene helpers live in `src/render/`. Editor UI lives in `src/editor/`, shared animation helpers in `src/utils/`, and Playwright export scripts in `scripts/`. Static assets belong in `public/`; generated build and render output go to `dist/` and `output/` and should not be committed.

## Build, Test, and Development Commands

- `npm run dev` starts the Vite dev server on `127.0.0.1`; required for the render middleware.
- `npm run check` runs TypeScript type checking with `tsc --noEmit`.
- `npm run build` runs `tsc -b` and creates the production Vite build.
- `npm run render` starts the render pipeline and exports frames to `output/<PresetType>/`.

Run `npm run check` before `npm run build` when validating code changes.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Match the existing two-space indentation and JSX style. Preset folders use PascalCase names, for example `src/presets/ComponentLibrary/index.tsx`. Add new presets by updating `src/render/types.ts`, `src/render/presetRegistry.ts`, and `src/render/defaultPresets.ts`. Keep ordinary preset work out of framework files such as `src/render/RenderScene.tsx`, `src/App.tsx`, and `vite.config.ts` unless the renderer itself is being changed.

## Preset and Rendering Rules

Drive animation only from `context.progress`; do not use timers, `Date.now()`, or `Math.random()`. Use `loopSin`, `loopCos`, and `clamp` from `src/utils/animation.ts` where appropriate. Use `getPresetColors()` and `getPresetColorStyle()` for colors. Root preset SVGs should use `className="preset-svg ..."` and a stable `viewBox`. Prefix `<defs>` IDs with the preset name to avoid collisions. Do not reference external image URLs; renders must work offline.

## Testing Guidelines

There is no separate unit test suite configured. The primary verification path is `npm run check`, followed by `npm run build` for broader validation. For rendering changes, run `npm run render` when visual output or export behavior may be affected.

## Commit & Pull Request Guidelines

Recent commits use short imperative messages such as `Add component library image assets` and `Remove Mimo workspace files`. Keep commits focused and avoid mixing generated output with source edits. Pull requests should describe the visual or rendering impact, list commands run, and include screenshots or output samples when preset appearance changes.
