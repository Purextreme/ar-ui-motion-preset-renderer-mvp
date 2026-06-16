import { presetLabels } from "../render/presetRegistry";
import { getPresetColors } from "../render/presetStyle";
import type { PresetProps, PresetType } from "../render/types";

type AssetPanelProps = {
  presets: PresetProps[];
  selectedPresetId: string;
  canvasWidth: number;
  canvasHeight: number;
  onSelectPreset: (id: string) => void;
  onUpdatePresetParams: (id: string, params: Record<string, unknown>) => void;
};

export function AssetPanel({
  presets,
  selectedPresetId,
  canvasWidth,
  canvasHeight,
  onSelectPreset,
  onUpdatePresetParams,
}: AssetPanelProps) {
  const selectedPreset = presets.find((preset) => preset.id === selectedPresetId) ?? presets[0];
  const colors = getPresetColors(selectedPreset.params);

  function updateColor(key: keyof typeof colors, value: string) {
    onUpdatePresetParams(selectedPreset.id, { [key]: value });
  }

  return (
    <aside className="panel asset-panel">
      <div className="panel-section">
        <div className="panel-title">Preset</div>
        <select
          value={selectedPresetId}
          onChange={(event) => onSelectPreset(event.target.value)}
        >
          {presets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {presetLabels[preset.type as PresetType]}
            </option>
          ))}
        </select>
      </div>

      <div className="panel-section">
        <div className="panel-title">Colors</div>
        <label className="color-control">
          <span>Text</span>
          <input
            type="color"
            value={colors.textColor}
            onChange={(event) => updateColor("textColor", event.target.value)}
          />
        </label>
        <label className="color-control">
          <span>Lines</span>
          <input
            type="color"
            value={colors.lineColor}
            onChange={(event) => updateColor("lineColor", event.target.value)}
          />
        </label>
        <label className="color-control">
          <span>Title / Focus</span>
          <input
            type="color"
            value={colors.highlightTextColor}
            onChange={(event) => updateColor("highlightTextColor", event.target.value)}
          />
        </label>
      </div>

      <div className="panel-section small-copy">
        <div>Canvas: {canvasWidth} x {canvasHeight}</div>
        <div>Position: centered</div>
        <div>Export: transparent PNG sequence</div>
        <div className="font-note">Requires OPPOSANS installed, otherwise render fails.</div>
      </div>
    </aside>
  );
}
