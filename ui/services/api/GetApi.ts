import { apiFetch } from './ApiFetch';

export const getApi = <T = unknown>(url: string = '') =>
  apiFetch<T>(url, { method: 'GET' });
