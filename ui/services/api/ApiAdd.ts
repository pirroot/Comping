import BaseApi from "./BaseApi";

export const apiAdd = async <TResponse = void, TBody = unknown>(
  url: string,
  data: TBody,
): Promise<TResponse> => {
  const response = await fetch(BaseApi() + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  if (!response.ok) {
    throw new Error(`موفق به اضافه کردن نشد! : ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as TResponse;
  }

  return undefined as TResponse;
};
