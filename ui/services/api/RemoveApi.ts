import { apiFetch } from "./ApiFetch";

export const apiRemove = <T = void>(url: string) =>
  apiFetch<T>(url, { method: "DELETE" });
