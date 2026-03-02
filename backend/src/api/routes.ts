import { Router } from 'express';
import { z } from 'zod';
import { assertRole } from '@/domain/auth/rbac.js';
import { calculateElo } from '@/domain/ranking/elo.js';
import { softResetMmr } from '@/domain/seasons/reset.js';
import { createKnockoutBracket } from '@/domain/tournaments/bracket.js';
import { applyDelta } from '@/domain/economy/wallet.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

router.get('/shop/items', (_req, res) => {
  res.json([
    { id: 'theme-1', name: 'Neon Board', category: 'BOARD_THEME', rarity: 'RARE', priceCoins: 1200 },
    { id: 'emo-gg', name: 'GG Emote', category: 'EMOTE', rarity: 'COMMON', priceCoins: 250 },
  ]);
});

router.post('/rank/elo-preview', (req, res) => {
  const schema = z.object({ playerA: z.number(), playerB: z.number(), scoreA: z.union([z.literal(0), z.literal(0.5), z.literal(1)]) });
  const parsed = schema.parse(req.body);
  res.json(calculateElo(parsed));
});

router.post('/season/soft-reset', (req, res) => {
  const schema = z.object({ currentMmr: z.number(), baseline: z.number().optional(), retentionRate: z.number().optional() });
  res.json({ mmr: softResetMmr(schema.parse(req.body)) });
});

router.post('/tournaments/knockout/generate', (req, res) => {
  const schema = z.object({ participants: z.array(z.object({ id: z.string(), seed: z.number() })) });
  const { participants } = schema.parse(req.body);
  res.json(createKnockoutBracket(participants));
});

router.post('/wallet/preview', (req, res) => {
  const schema = z.object({ coins: z.number(), gems: z.number(), currency: z.enum(['COINS', 'GEMS']), delta: z.number() });
  const payload = schema.parse(req.body);
  res.json(applyDelta({ coins: payload.coins, gems: payload.gems }, payload.currency, payload.delta));
});

router.post('/admin/users/:id/ban', (req, res) => {
  const role = req.headers['x-role'];
  assertRole((role as 'ADMIN' | 'USER') ?? 'USER', ['ADMIN']);
  res.json({ userId: req.params.id, status: 'BANNED' });
});

export { router };
