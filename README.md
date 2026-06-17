# AR UI Motion Preset Renderer MVP

本项目是一个本地运行的 AR UI 动画 PNG 序列帧生成器。

它不是普通网页展示页，而是用于生成可导入 AE 合成的透明背景 motion graphics 素材。

## 功能

- Vite + React 本地网页预览。
- 默认画布：`1000 x 1000`。
- 当前 preset 始终居中。
- 动画完全由 frame 驱动。
- 支持导出透明背景 PNG sequence。
- 当前包含 3 个 preset：
  - `OrbitalNavigationPanel`
  - `MaterialColorPanel`
  - `ShipDetailPanel`

`ShipDetailPanel` 中的飞船区域只做预览 guide，导出时不会包含 `此处留空` 文案。飞船图片建议在 AE 中后期合成。

## 环境要求

- Node.js
- npm
- Playwright Chromium

第一次安装后，如果导出时报 Playwright 浏览器缺失，需要运行：

```bash
npx playwright install chromium
```

## 安装依赖

```bash
npm install
```

## 启动网页预览

```bash
npm run dev
```

然后打开：

```text
http://127.0.0.1:5173/
```

网页中可以：

- 选择 preset。
- 播放 / 暂停动画。
- 拖动 frame slider 查看指定帧。
- 设置 `frames` 和 `fps`。
- 点击 `Render Current` 导出当前 preset。
- 点击 `Render All` 导出全部 preset。

## 导出 PNG 序列

### 方式 1：网页按钮导出

先启动：

```bash
npm run dev
```

然后在网页中点击：

- `Render Current`
- 或 `Render All`

### 方式 2：命令行导出全部 preset

```bash
npm run render
```

该命令会自动启动临时 Vite server，并导出全部 preset。

## 输出目录

导出结果会写入：

```text
output/
  OrbitalNavigationPanel/
    frame_0000.png
    frame_0001.png
    ...

  MaterialColorPanel/
    frame_0000.png
    frame_0001.png
    ...

  ShipDetailPanel/
    frame_0000.png
    frame_0001.png
    ...
```

每次导出某个 preset 前，会先清空该 preset 对应的输出目录，避免旧帧残留。

## 验证命令

```bash
npm run check
npm run build
npm run render
```

## AE 使用方式

1. 在 AE 中导入对应 preset 的 PNG sequence。
2. 按需要缩放、调整透明度和摆放位置。
3. `ShipDetailPanel` 的飞船图片请在 AE 中单独叠加到预留区域。

导出的 PNG 使用透明背景，不包含网页预览背景。

## 注意

- 不需要上传 reference image。
- 不需要上传 ship PNG。
- 网页只负责预览和导出 UI 动画素材。
- 最终位置、缩放、透明度和合成由 AE 完成。
