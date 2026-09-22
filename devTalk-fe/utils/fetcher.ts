import { ApiError } from './apiError';
import env from './env';
import { refreshToken } from './refreshToken';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface FetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean>;
  isAuthenticated?: boolean;
  token?: string;
  timeout?: number;
  retry?: number;
  retryDelay?: number;
  isRetry?: boolean;
}

const buildUrl = (
  url: string,
  params?: Record<string, string | number | boolean>,
) => {
  const fullURL = url.startsWith('http') ? url : `${env.apiBaseUrl}${url}`;
  if (!params) return fullURL;
  const queryString = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  ).toString();

  return queryString ? `${fullURL}?${queryString}` : fullURL;
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetcher = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  options?: FetchOptions,
): Promise<T> => {
  const maxRetries = options?.retry ?? 0;
  const retryDelay = options?.retryDelay ?? 1000;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeout = options?.timeout || 10000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fullURL = buildUrl(url, options?.params);
      const authToken = options?.isAuthenticated ? options?.token : null;

      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
          ...options?.headers,
        },
        signal: controller.signal,
        ...options,
      };

      if (data && ['POST', 'PATCH', 'DELETE'].includes(method)) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(fullURL, config);

      if (!response.ok) {
        if (response.status === 401 && !options?.isRetry) {
          try {
            const newToken = await refreshToken();
            return await fetcher<T>(method, url, data, {
              ...options,
              token: newToken,
              isRetry: true,
            });
          } catch {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
              errorData.message ||
                `Request failed with status ${response.status}`,
              response.status,
              errorData.code,
            );
          }
        }
      }

      clearTimeout(timeoutId);
      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        lastError = new ApiError('Request timeout', 408, 'TIMEOUT');
      } else {
        lastError = error instanceof Error ? error : new Error('Unknown error');
      }

      const shouldRetry =
        attempt < maxRetries &&
        (lastError instanceof ApiError
          ? (lastError?.statusCode ?? 0) >= 500
          : true);

      if (shouldRetry) {
        await wait(retryDelay * (attempt + 1));
        continue;
      }

      throw lastError;
    }
  }

  throw lastError || new Error('Request failed');
};
