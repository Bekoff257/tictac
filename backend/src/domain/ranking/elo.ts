export interface EloInput {
  playerA: number;
  playerB: number;
  scoreA: 0 | 0.5 | 1;
  kFactor?: number;
}

export function calculateElo({ playerA, playerB, scoreA, kFactor = 32 }: EloInput) {
  const expectedA = 1 / (1 + 10 ** ((playerB - playerA) / 400));
  const expectedB = 1 - expectedA;
  const scoreB = (1 - scoreA) as 0 | 0.5 | 1;

  const nextA = Math.round(playerA + kFactor * (scoreA - expectedA));
  const nextB = Math.round(playerB + kFactor * (scoreB - expectedB));

  return { nextA, nextB, deltaA: nextA - playerA, deltaB: nextB - playerB };
}

export function tierFromMmr(mmr: number): string {
  if (mmr < 1000) return 'BRONZE';
  if (mmr < 1300) return 'SILVER';
  if (mmr < 1600) return 'GOLD';
  if (mmr < 1900) return 'PLATINUM';
  if (mmr < 2200) return 'DIAMOND';
  return 'MASTER';
}
