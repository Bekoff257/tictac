# Security Design

## Core controls
- JWT-based auth with role claims (`ADMIN`/`USER`).
- RBAC checks on all admin endpoints.
- Server-authoritative game engine (`applyMove`) validates turns and board state.
- Request rate limiting middleware.
- Zod validation on all mutation payloads.
- Transaction-first economy design (wallet updates + purchase logs atomically).

## Anti-cheat
- Move timing heuristics and impossible-state detection.
- Signed match transcript persisted for replay audit.
- Match result recomputation from move history before MMR payout.

## Postgres RLS baseline
```sql
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_self_read ON "User"
  FOR SELECT USING (id = current_setting('app.user_id'));

CREATE POLICY admin_read_all_users ON "User"
  FOR SELECT USING (current_setting('app.role') = 'ADMIN');
```
