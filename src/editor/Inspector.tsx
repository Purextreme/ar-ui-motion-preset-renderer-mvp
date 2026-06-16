import { toBoolean, toNumber, toStringValue } from "../utils/math";
import type { PresetProps } from "../render/types";

type InspectorProps = {
  preset: PresetProps;
  onChange: (nextPreset: PresetProps) => void;
};

function NumberField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function Inspector({ preset, onChange }: InspectorProps) {
  function updatePatch(patch: Partial<PresetProps>) {
    onChange({ ...preset, ...patch });
  }

  function updateParam(key: string, value: unknown) {
    onChange({
      ...preset,
      params: {
        ...preset.params,
        [key]: value,
      },
    });
  }

  const isShipPanel = preset.type === "ShipDetailPanel";

  return (
    <aside className="panel inspector">
      <div className="panel-section">
        <div className="panel-title">Inspector</div>
        <div className="selected-name">{preset.type}</div>
      </div>

      <div className="panel-section grid-fields">
        <NumberField label="x" value={preset.x} onChange={(x) => updatePatch({ x })} />
        <NumberField label="y" value={preset.y} onChange={(y) => updatePatch({ y })} />
        <NumberField
          label="scale"
          value={preset.scale}
          min={0.1}
          step={0.05}
          onChange={(scale) => updatePatch({ scale })}
        />
        <NumberField
          label="opacity"
          value={preset.opacity}
          min={0}
          max={1}
          step={0.05}
          onChange={(opacity) => updatePatch({ opacity })}
        />
        <NumberField
          label="width"
          value={preset.width}
          min={80}
          onChange={(width) => updatePatch({ width })}
        />
        <NumberField
          label="height"
          value={preset.height}
          min={80}
          onChange={(height) => updatePatch({ height })}
        />
        <NumberField
          label="rotation"
          value={preset.rotation}
          step={1}
          onChange={(rotation) => updatePatch({ rotation })}
        />
        <NumberField
          label="zIndex"
          value={preset.zIndex}
          step={1}
          onChange={(zIndex) => updatePatch({ zIndex })}
        />
      </div>

      {isShipPanel ? (
        <div className="panel-section grid-fields">
          <div className="panel-title full-row">Ship Image</div>
          <NumberField
            label="shipX"
            value={toNumber(preset.params.shipX, 96)}
            onChange={(value) => updateParam("shipX", value)}
          />
          <NumberField
            label="shipY"
            value={toNumber(preset.params.shipY, 108)}
            onChange={(value) => updateParam("shipY", value)}
          />
          <NumberField
            label="shipScale"
            value={toNumber(preset.params.shipScale, 1)}
            min={0.1}
            step={0.05}
            onChange={(value) => updateParam("shipScale", value)}
          />
          <NumberField
            label="scanOpacity"
            value={toNumber(preset.params.scanlineOpacity, 0.45)}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateParam("scanlineOpacity", value)}
          />
          <label className="field full-row">
            <span>accentColor</span>
            <input
              type="color"
              value={toStringValue(preset.params.accentColor, "#8a6cff")}
              onChange={(event) => updateParam("accentColor", event.target.value)}
            />
          </label>
          <label className="checkbox-row full-row">
            <input
              type="checkbox"
              checked={toBoolean(preset.params.scanlineEnabled, true)}
              onChange={(event) => updateParam("scanlineEnabled", event.target.checked)}
            />
            <span>scanlineEnabled</span>
          </label>
        </div>
      ) : null}
    </aside>
  );
}
