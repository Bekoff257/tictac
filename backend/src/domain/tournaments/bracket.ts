export interface Participant { id: string; seed: number; }
export interface BracketMatch { id: string; round: number; slot: number; playerA?: string; playerB?: string; winner?: string; }

export function createKnockoutBracket(participants: Participant[]): BracketMatch[] {
  const sorted = [...participants].sort((a, b) => a.seed - b.seed);
  const powerOfTwo = 2 ** Math.ceil(Math.log2(sorted.length || 1));
  const padded = [...sorted, ...Array.from({ length: powerOfTwo - sorted.length }, (_, i) => ({ id: `BYE-${i}`, seed: 9999 + i }))];

  const matches: BracketMatch[] = [];
  let roundPlayers = padded.map((p) => p.id);
  let round = 1;
  while (roundPlayers.length > 1) {
    const nextRound: string[] = [];
    for (let i = 0; i < roundPlayers.length; i += 2) {
      const playerA = roundPlayers[i];
      const playerB = roundPlayers[i + 1];
      const id = `R${round}-M${i / 2 + 1}`;
      const winner = playerA.startsWith('BYE-') ? playerB : playerB.startsWith('BYE-') ? playerA : undefined;
      matches.push({ id, round, slot: i / 2 + 1, playerA, playerB, winner });
      nextRound.push(winner ?? `WINNER:${id}`);
    }
    roundPlayers = nextRound;
    round += 1;
  }

  return matches;
}
