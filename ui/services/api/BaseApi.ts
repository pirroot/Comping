export default function BaseApi(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  return baseUrl.replace(/\/+$/, "");
}
