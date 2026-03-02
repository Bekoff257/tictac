import { NextFunction, Request, Response } from 'express';

const requests = new Map<string, { count: number; startedAt: number }>();

export function rateLimit(maxPerMinute = 120) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip ?? 'unknown';
    const now = Date.now();
    const windowMs = 60_000;
    const entry = requests.get(key);

    if (!entry || now - entry.startedAt > windowMs) {
      requests.set(key, { count: 1, startedAt: now });
      return next();
    }

    if (entry.count >= maxPerMinute) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    entry.count += 1;
    next();
  };
}
