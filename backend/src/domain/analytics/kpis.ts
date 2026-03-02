export interface Kpis {
  dau: number;
  mau: number;
  revenue: number;
  completionRate: number;
  tournamentParticipationRate: number;
  day1Retention: number;
}

export function calcCompletionRate(completed: number, started: number): number {
  if (!started) return 0;
  return Number(((completed / started) * 100).toFixed(2));
}
