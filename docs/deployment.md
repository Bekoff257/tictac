# Deployment Guide

## Backend
1. Build image from `backend/`.
2. Run Prisma migrations.
3. Deploy to Kubernetes (HPA on CPU + socket connection count).
4. Attach Redis for Socket.IO adapter + queues.

## Mobile
1. Configure `EXPO_PUBLIC_API_URL` per environment.
2. Build with EAS for iOS/Android.
3. Integrate RevenueCat / store IAP for Gems.

## Observability
- OpenTelemetry traces for match lifecycle.
- Prometheus metrics: socket joins, move validation errors, purchase failures.
- Alerting on fraud spikes and economy drift.
