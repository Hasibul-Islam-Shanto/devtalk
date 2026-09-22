import { fetcher, FetchOptions } from './fetcher';

export const get = <T>(url: string, options?: FetchOptions) =>
  fetcher<T>('GET', url, undefined, options);

export const post = <T>(url: string, data?: unknown, options?: FetchOptions) =>
  fetcher<T>('POST', url, data, options);

export const patch = <T>(url: string, data?: unknown, options?: FetchOptions) =>
  fetcher<T>('PATCH', url, data, options);

export const del = <T>(url: string, options?: FetchOptions) =>
  fetcher<T>('DELETE', url, undefined, options);
