# Element Preset Development Guide

This project is an AR UI motion preset renderer. Future work should add or refine element presets without changing the rendering framework unless the user explicitly asks for framework changes.

## Core Rule

Keep preset work inside `src/presets`, `src/render/defaultPresets.ts`, `src/render/presetRegistry.ts`, `src/render/types.ts`, and preset-specific styling or shared preset helpers when necessary.

Do not modify these framework files for ordinary preset development:

- `scripts/render-core.ts`
- `vite.config.ts`
- `src/render/RenderScene.tsx`
- `src/render/RenderOnly.tsx`
- `src/editor/*`
- `src/App.tsx`

Only touch framework files when the requested feature cannot be implemented as preset data, preset SVG, preset CSS, or preset params.

## Existing Architecture

- `PresetProps` in `src/render/types.ts` defines the common element contract.
- Each preset is a React component with the `PresetComponent` signature.
- `context.progress` is the normalized animation value from `0` to `1`.
- `context.frame`, `context.totalFrames`, and `context.fps` are available for frame-accurate animation.
- `props.params` stores preset-specific editable values.
- `src/render/presetRegistry.ts` maps preset types to components and labels.
- `src/render/defaultPresets.ts` defines default element instances shown in the app and exported by script rendering.
- `scripts/render-core.ts` exports PNG sequences into `output/<PresetType>/frame_0000.png`.

## Adding A New Preset

1. Add a new folder:

   `src/presets/NewPresetName/index.tsx`

2. Implement a `PresetComponent`:

   ```tsx
   import { getPresetColors, getPresetColorStyle } from "../../render/presetStyle";
   import type { PresetComponent } from "../../render/types";

   export const NewPresetName: PresetComponent = ({ props, context }) => {
     const colors = getPresetColors(props.params);
     const pulse = 0.5 + Math.sin(context.progress * Math.PI * 2) * 0.2;

     return (
       <svg
         className="preset-svg new-preset-svg"
         viewBox="0 0 520 760"
         role="img"
         style={getPresetColorStyle(props.params)}
       >
         <rect x="1" y="1" width="518" height="758" rx="8" fill="none" stroke={colors.lineColor} />
         <text x="32" y="48" className="ui-title">NEW PRESET</text>
         <text x="32" y="78" className="ui-caption" opacity={pulse}>STATUS</text>
       </svg>
     );
   };
   ```

3. Add the type name to `PresetType` in `src/render/types.ts`.

4. Import and register it in `src/render/presetRegistry.ts`.

5. Add a default instance in `src/render/defaultPresets.ts`.

## Preset Parameters

Use `props.params` for preset-specific configuration. Keep values JSON-serializable because render jobs are sent through `/api/render`.

Shared color params already exist:

- `textColor`: normal text
- `lineColor`: major outlines, borders, guide lines
- `highlightTextColor`: titles and emphasized values

Use these helpers:

- `getPresetColors(props.params)` when SVG attributes need explicit color values.
- `getPresetColorStyle(props.params)` on the root `<svg>` so CSS classes can use the color variables.

Do not hard-code all text as white. Use the existing classes:

- `ui-title`
- `ui-caption`
- `ui-small`
- `ui-value`
- `ui-guide`

Only hard-code colors for visual assets that are intentionally not user-configurable, such as material swatches, heat maps, planet fills, or decorative glows.

## Animation Rules

- Use `context.progress` for looped animation.
- Prefer helpers from `src/utils/animation.ts`.
- Do not use `Date.now()`, `Math.random()`, timers, network requests, or browser-only side effects inside presets.
- Rendering must be deterministic: the same frame should produce the same pixels.
- Keep animation math local to the preset unless a helper is clearly reusable by multiple presets.

## SVG Rules

- The root element should be one `<svg className="preset-svg ...">`.
- Set a stable `viewBox` matching the intended preset aspect.
- Keep text as SVG `<text>` so font verification can inspect it.
- Use OPPOSANS-compatible font weights already defined in CSS.
- Avoid nested HTML inside SVG.
- If adding `<defs>` ids, prefix them with the preset name to avoid collisions.
- Do not add external image URLs. Rendering must work offline.

## Layout Rules

- Presets are positioned by `RenderScene`; do not position them with page-level CSS.
- Keep the SVG content inside its viewBox unless overflow is intentional.
- Do not change the canvas size in framework code for one preset.
- Use `width`, `height`, `scale`, `rotation`, `opacity`, and `zIndex` in default preset data for placement.

## Export Rules

- The export pipeline captures transparent PNG frames.
- Do not change `output` folder behavior unless requested.
- Do not change browser launch behavior unless the user's environment requires it.
- Current render browser policy uses allowed system channels (`msedge`, then `chrome`) to avoid forbidden bundled Playwright executables.

## Verification Checklist

Before handing off preset changes:

1. Run `npm run check`.
2. Run `npm run build`.
3. Render a small test, preferably 1 frame first.
4. Confirm the expected folder appears under `output/<PresetType>`.
5. Inspect at least one PNG if visual quality matters.

## Change Discipline

- Keep diffs small and traceable to the requested preset.
- Do not refactor framework files while adding visual presets.
- Do not rename existing preset ids or types unless migration is part of the request.
- Do not remove existing params, colors, or export behavior.
- If a requested preset needs a new shared capability, add the smallest helper possible and document why it is shared.
