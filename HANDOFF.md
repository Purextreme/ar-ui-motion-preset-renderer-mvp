# AR UI Motion Preset Renderer MVP - Handoff

Date: 2026-06-16

## Current Status

This project has been scaffolded as a local Vite + React + TypeScript motion graphics renderer for AR UI preset panels.

The implementation is intentionally MVP-scoped:

- Fixed-size render canvas, defaulting to `1920 x 1080`.
- Reference image upload for preview only.
- Ship PNG upload for `ShipDetailPanel`, including alpha-friendly image display.
- Three independent preset components:
  - `OrbitalNavigationPanel`
  - `MaterialColorPanel`
  - `ShipDetailPanel`
- Shared frame-driven render path for preview and export.
- Inspector controls for common transform parameters:
  - `x`
  - `y`
  - `scale`
  - `rotation`
  - `opacity`
  - `width`
  - `height`
  - `visible`
  - `zIndex`
- `ShipDetailPanel` specific controls:
  - `shipImageUrl`
  - `shipX`
  - `shipY`
  - `shipScale`
  - `scanlineEnabled`
  - `scanlineOpacity`
  - `accentColor`
- Play / Pause preview.
- Frame slider.
- `totalFrames`, default `100`.
- `fps`, default `25`.
- Local Playwright PNG sequence export.
- Vite dev middleware endpoint for browser-triggered render:
  - `POST /api/render`
- CLI render script:
  - `npm run render`

## Important Constraint

Development on the current Windows machine should stop here.

The local security software appears to block some automation and browser operations. Continue development on the Mac mini instead.

## Files Added

Core project setup:

- `package.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `index.html`

App entry and styling:

- `src/main.tsx`
- `src/App.tsx`
- `src/styles.css`

Editor UI:

- `src/editor/EditorLayout.tsx`
- `src/editor/Stage.tsx`
- `src/editor/Inspector.tsx`
- `src/editor/AssetPanel.tsx`
- `src/editor/TimelineControls.tsx`

Render model:

- `src/render/types.ts`
- `src/render/defaultPresets.ts`
- `src/render/presetRegistry.ts`
- `src/render/RenderScene.tsx`
- `src/render/RenderOnly.tsx`

Presets:

- `src/presets/OrbitalNavigationPanel/index.tsx`
- `src/presets/OrbitalNavigationPanel/schema.ts`
- `src/presets/MaterialColorPanel/index.tsx`
- `src/presets/MaterialColorPanel/schema.ts`
- `src/presets/ShipDetailPanel/index.tsx`
- `src/presets/ShipDetailPanel/schema.ts`

Utilities:

- `src/utils/animation.ts`
- `src/utils/colors.ts`
- `src/utils/math.ts`

Render scripts:

- `scripts/render-core.ts`
- `scripts/render-sequence.ts`

Generated during verification:

- `package-lock.json`
- `node_modules/`
- `dist/`
- `output/`
- `vite-dev.log`
- `vite-dev.err.log`

## What Was Verified

The following checks passed on the Windows machine before development was stopped:

```bash
npm install
npm run check
npm run build
npx playwright install chromium
npm run render
```

Observed render result:

```text
Rendered 100 frames for OrbitalNavigationPanel, MaterialColorPanel, ShipDetailPanel
Output: D:\YANQ\AI_Explorer\AR UI Motion Preset Renderer MVP\output
```

Output frame count check passed:

```text
MaterialColorPanel: 100
OrbitalNavigationPanel: 100
ShipDetailPanel: 100
```

Transparent background spot check passed:

```text
output\OrbitalNavigationPanel\frame_0000.png alpha(0,0)=0
output\MaterialColorPanel\frame_0000.png alpha(0,0)=0
output\ShipDetailPanel\frame_0000.png alpha(0,0)=0
```

The Vite dev server was started and responded successfully at:

```text
http://127.0.0.1:5173/
```

## What Was Not Fully Verified

The in-app Browser plugin check could not complete because the Node REPL kernel exited unexpectedly twice.

A fallback Playwright browser smoke test was attempted, but the current machine blocked Chromium launch with:

```text
browserType.launch: spawn EPERM
```

This is consistent with local security software blocking browser automation. The CLI render had already succeeded before this failure.

## Known Issues / Follow-Up

1. `npm install` reported two high severity audit findings.
   - Do not run `npm audit fix --force` blindly.
   - Review dependency advisories on the Mac mini and decide whether dependency upgrades are acceptable.

2. The browser-triggered Render button is implemented through Vite middleware.
   - It should work only while running the dev server.
   - For production packaging, this should become a small explicit Node render server or Electron/Tauri-style local app.

3. Generated folders should probably not be committed:
   - `node_modules/`
   - `dist/`
   - `output/`
   - `vite-dev.log`
   - `vite-dev.err.log`

4. The preview stage currently uses a simple scaled/scrollable workspace.
   - It is usable for MVP.
   - It is not a polished compositor-style viewport yet.

5. Dragging is minimal.
   - It only updates `x/y`.
   - Numeric controls remain the primary supported workflow.

6. `ShipDetailPanel` uses the uploaded PNG as a data URL in memory.
   - This is correct for the first MVP.
   - No persistence is implemented.

## Suggested Next Steps On Mac mini

1. Clone/pull the GitHub repository.

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browser binaries if needed:

```bash
npx playwright install chromium
```

4. Run checks:

```bash
npm run check
npm run build
npm run render
```

5. Start the editor:

```bash
npm run dev
```

6. Test in browser:

- Upload a reference image.
- Confirm canvas changes to the reference image natural size.
- Upload a transparent ship PNG.
- Select each preset.
- Toggle visibility.
- Adjust `x`, `y`, `scale`, `opacity`, `width`, and `height`.
- Test `Render Current`.
- Test `Render All`.
- Confirm exported PNGs do not include the reference image.

7. Improve only after MVP behavior is confirmed:

- Add `.gitignore`.
- Add UI polish for stage zoom/pan.
- Add better preset parameter schemas.
- Add a persistent local render server if this should not depend on Vite middleware.
- Add image export progress reporting.
- Add visual regression smoke tests using Playwright screenshots.

## Implementation Notes

Animation is frame-driven. Presets use:

```ts
progress = frame / (totalFrames - 1)
```

The implementation avoids:

- `Date.now()`
- `performance.now()`
- CSS infinite animation
- WebGL
- HyperFrames

The preview and export share `RenderScene`, which reduces the chance that editor preview and PNG output diverge.

The export path uses:

```ts
await page.screenshot({
  path,
  omitBackground: true,
})
```

The reference image is intentionally excluded from render jobs sent to export.

## Stop Point

Stop development on this Windows machine after this handoff.

The remaining work should continue on the Mac mini because local automation on this machine is unreliable under the installed security software.
