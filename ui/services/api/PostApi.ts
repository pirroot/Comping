import { apiFetch } from './ApiFetch';

export { ApiError } from './ApiFetch';

export const postApi = <TResponse = void, TBody = unknown>(
  url: string,
  data: TBody,
  options?: { skipRefresh?: boolean },
) => apiFetch<TResponse>(url, { method: 'POST', body: data, ...options });
