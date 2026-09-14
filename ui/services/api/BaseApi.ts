export default function BaseApi() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return baseUrl;
}
