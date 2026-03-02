import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.string().default('4000'),
  JWT_SECRET: z.string().default('dev-secret'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/tictac'),
});

export const env = EnvSchema.parse(process.env);
