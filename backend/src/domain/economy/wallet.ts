export type Currency = 'COINS' | 'GEMS';

export interface Wallet {
  coins: number;
  gems: number;
}

export function applyDelta(wallet: Wallet, currency: Currency, delta: number): Wallet {
  const next = { ...wallet };
  if (currency === 'COINS') {
    if (next.coins + delta < 0) throw new Error('Insufficient coins');
    next.coins += delta;
  } else {
    if (next.gems + delta < 0) throw new Error('Insufficient gems');
    next.gems += delta;
  }
  return next;
}
