import { presetLabels } from "../render/presetRegistry";
import type { PresetProps, PresetType, RenderAssets } from "../render/types";

type AssetPanelProps = {
  presets: PresetProps[];
  selectedPresetId: string;
  assets: RenderAssets;
  onSelectPreset: (id: string) => void;
  onToggleVisible: (id: string, visible: boolean) => void;
  onReferenceImage: (url: string, width: number, height: number) => void;
  onShipImage: (url: string) => void;
};

function readImageFile(file: File, onLoad: (url: string, width: number, height: number) => void) {
  const reader = new FileReader();

  reader.onload = () => {
    const url = String(reader.result);
    const image = new Image();
    image.onload = () => onLoad(url, image.naturalWidth, image.naturalHeight);
    image.src = url;
  };

  reader.readAsDataURL(file);
}

export function AssetPanel({
  presets,
  selectedPresetId,
  assets,
  onSelectPreset,
  onToggleVisible,
  onReferenceImage,
  onShipImage,
}: AssetPanelProps) {
  const selectedPreset = presets.find((preset) => preset.id === selectedPresetId) ?? presets[0];

  return (
    <aside className="panel asset-panel">
      <div className="panel-section">
        <div className="panel-title">Assets</div>
        <label className="file-control">
          <span>Reference image</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                readImageFile(file, onReferenceImage);
              }
            }}
          />
        </label>
        <label className="file-control">
          <span>Ship PNG alpha</span>
          <input
            type="file"
            accept="image/png"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                readImageFile(file, (url) => onShipImage(url));
              }
            }}
          />
        </label>
      </div>

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
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={selectedPreset.visible}
            onChange={(event) => onToggleVisible(selectedPreset.id, event.target.checked)}
          />
          <span>Visible</span>
        </label>
      </div>

      <div className="panel-section small-copy">
        <div>Reference: {assets.referenceImage ? "loaded" : "none"}</div>
        <div>Ship image: {assets.shipImage ? "loaded" : "none"}</div>
      </div>
    </aside>
  );
}
