export type Role = 'ADMIN' | 'USER';

export function assertRole(userRole: Role, allowed: Role[]): void {
  if (!allowed.includes(userRole)) {
    throw new Error('Forbidden');
  }
}
