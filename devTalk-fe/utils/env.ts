import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().describe('Base URL for the API server'),
  NEXT_PUBLIC_DEPLOY_URL: z
    .string()
    .url()
    .describe('Base URL of this Next.js app (for client calls to /api, etc.)'),
});

function resolvePublicDeployUrl(): string {
  const v = process.env.NEXT_PUBLIC_DEPLOY_URL?.trim();
  if (v) return v;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }
  return 'http://localhost:3000';
}

function resolveApiBaseUrl(publicApiUrl: string): string {
  const internalApiUrl = process.env.API_URL?.trim();
  if (typeof window === 'undefined' && internalApiUrl) {
    const parsed = z.string().url().safeParse(internalApiUrl);
    if (!parsed.success) {
      console.error('❌ Invalid API_URL:', parsed.error);
      throw new Error('Invalid API_URL');
    }
    return parsed.data;
  }
  return publicApiUrl;
}

const _env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_DEPLOY_URL: resolvePublicDeployUrl(),
};
const parseEnv = envSchema.safeParse(_env);

if (!parseEnv.success) {
  console.error('❌ Invalid environment variables:', parseEnv.error);
  throw new Error('Invalid environment variables');
}

const env = {
  apiBaseUrl: resolveApiBaseUrl(parseEnv.data.NEXT_PUBLIC_API_URL),
  deployUrl: parseEnv.data.NEXT_PUBLIC_DEPLOY_URL,
};

export default env;
