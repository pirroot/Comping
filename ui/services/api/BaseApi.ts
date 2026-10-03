export default function BaseApi(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  return baseUrl.replace(/\/+$/, '');
}

export function getAssetUrl(path?: string | null): string {
  if (!path) return '/images/Products/1.png';
  if (/^https?:\/\//i.test(path)) return path;
  const apiRoot = BaseApi().replace(/\/api\/?$/, '');
  return `${apiRoot}${path.startsWith('/') ? path : `/${path}`}`;
}
