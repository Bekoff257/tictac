# Architecture Decisions

## Stack
- **Mobile:** React Native + Expo + TypeScript + Zustand for predictable state and rapid release.
- **Backend:** Node.js + Express + Socket.IO for low-latency real-time play and event fan-out.
- **Database:** PostgreSQL (Prisma) for transactional economy, tournament integrity, and analytics joins.
- **Async:** Queue workers (BullMQ/Redis in production) for reward distribution, season rollover, and analytics aggregation.

## Clean Architecture Layout
- `domain/*` pure game/economy/ranking logic.
- `api/*` HTTP contracts.
- `middleware/*` auth, RBAC, throttling.
- `services/*` orchestration.
- `repositories/*` persistence adapters.

## Why this scales to 100k+ CCU
1. Socket.IO horizontal scale via Redis adapter + sticky sessions.
2. Stateless API pods behind load balancer.
3. Read replicas for leaderboard/read-heavy workloads.
4. CQRS-style analytics pipeline: write events once, aggregate asynchronously.
5. CDN for cosmetic assets + edge caching for shop catalog.
