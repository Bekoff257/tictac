export interface SoftResetInput {
  currentMmr: number;
  baseline?: number;
  retentionRate?: number;
}

export function softResetMmr({ currentMmr, baseline = 1200, retentionRate = 0.7 }: SoftResetInput): number {
  return Math.round(baseline + (currentMmr - baseline) * retentionRate);
}
