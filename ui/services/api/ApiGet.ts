import BaseApi from './BaseApi';

export const apiGet = async <T = unknown>(url: string = ''): Promise<T> => {
  const response = await fetch(BaseApi() + url);
  if (!response.ok) {
    throw new Error(`خطا در دریافت اطلاعات: ${response.statusText}`);
  }

  return (await response.json()) as T;
};
