import BaseApi from "./BaseApi";

export const apiRemove = async <T = void>(url: string): Promise<T> => {
  const response = await fetch(BaseApi() + url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`موفق به حذف نشد! : ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return undefined as T;
}
