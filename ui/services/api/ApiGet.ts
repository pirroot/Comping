import BaseApi from "./BaseApi"

export const apiGet = async <T = unknown>(url: string = ''): Promise<T> => {
  const data = await fetch(BaseApi() + url)
  const response = data.json()

  return response as Promise<T>
}
