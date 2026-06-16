export function getProgress(frame: number, totalFrames: number): number {
  if (totalFrames <= 1) {
    return 0;
  }

  return frame / (totalFrames - 1);
}

export function loopSin(progress: number, phase = 0): number {
  return Math.sin((progress + phase) * Math.PI * 2);
}

export function loopCos(progress: number, phase = 0): number {
  return Math.cos((progress + phase) * Math.PI * 2);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
