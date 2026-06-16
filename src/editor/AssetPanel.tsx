import { presetLabels } from "../render/presetRegistry";
import type { PresetProps, PresetType } from "../render/types";

type AssetPanelProps = {
  presets: PresetProps[];
  selectedPresetId: string;
  canvasWidth: number;
  canvasHeight: number;
  onSelectPreset: (id: string) => void;
};

export function AssetPanel({
  presets,
  selectedPresetId,
  canvasWidth,
  canvasHeight,
  onSelectPreset,
}: AssetPanelProps) {
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

      <div className="panel-section small-copy">
        <div>Canvas: {canvasWidth} x {canvasHeight}</div>
        <div>Position: centered</div>
        <div>Export: transparent PNG sequence</div>
      </div>
    </aside>
  );
}
