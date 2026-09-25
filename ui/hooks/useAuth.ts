'use client';

import { useEffect, useState } from 'react';

type AuthStatus = 'loading' | 'in' | 'out';

const AUTH_EVENT = 'auth-change';

export const notifyAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const check = () =>
      setStatus(localStorage.getItem('refreshToken') ? 'in' : 'out');

    check();
    window.addEventListener(AUTH_EVENT, check);
    window.addEventListener('storage', check);
    return () => {
      window.removeEventListener(AUTH_EVENT, check);
      window.removeEventListener('storage', check);
    };
  }, []);

  return status;
}
