import { notifyAuthChange } from '@/hooks/useAuth';
import { postApi } from './PostApi';

export type VerifyResponse = {
  accessToken: string;
  refreshToken: string;
};

const noRefresh = { skipRefresh: true };

export const authApi = {
  login: (phone: string) => postApi('auth/login', { phone }, noRefresh),
  verify: (phone: string, code: string) =>
    postApi<VerifyResponse>('auth/verify', { phone, code }, noRefresh),
  refresh: (refreshToken: string) =>
    postApi<VerifyResponse>('auth/refresh', { refreshToken }, noRefresh),
  logout: (refreshToken: string) =>
    postApi('auth/logout', { refreshToken }, noRefresh),
};

export const tokens = {
  save: (t: VerifyResponse) => {
    if (!t?.accessToken || !t?.refreshToken) {
      throw new Error('Invalid token response');
    }
    localStorage.setItem('accessToken', t.accessToken);
    localStorage.setItem('refreshToken', t.refreshToken);
    notifyAuthChange();
  },
  getRefresh: () => localStorage.getItem('refreshToken'),
  clear: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    notifyAuthChange();
  },
};

export function getErrorMessage(err: unknown, fallback: string): string {
  return err instanceof Error && err.message ? err.message : fallback;
}
