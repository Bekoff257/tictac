# TicTac SaaS Multiplayer Platform

Production-grade Tic Tac Toe multiplayer SaaS scaffold built for scale, security, and monetization.

## Monorepo

- `mobile/` – React Native (Expo) app in TypeScript for players + embedded admin views.
- `backend/` – Node.js + TypeScript + Socket.IO API with clean architecture modules.
- `infra/` – Deployment and scaling artifacts.
- `docs/` – Architecture, schema, security, roadmap, and runbooks.

## Quick start

```bash
npm install
npm run setup
npm run dev
```

## Scripts

- `npm run dev:mobile`
- `npm run dev:backend`
- `npm run lint`
- `npm run test`
