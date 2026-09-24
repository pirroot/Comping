import BaseApi from "./BaseApi";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const buildUrl = (url: string) => `${BaseApi()}/${url.replace(/^\/+/, "")}`;

const isBrowser = typeof window !== "undefined";

const getAccess = () => (isBrowser ? localStorage.getItem("accessToken") : null);
const getRefresh = () => (isBrowser ? localStorage.getItem("refreshToken") : null);

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const LOGIN_PATH = "/auth";

// یک refresh همزمان: اگه چند درخواست با هم ۴۰۱ بگیرن، فقط یک بار refresh می‌زنیم
let refreshing: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
  const refreshToken = getRefresh();
  if (!refreshToken) return false;

  try {
    const res = await fetch(buildUrl("auth/refresh"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;

    const t = await res.json();
    if (!t?.accessToken || !t?.refreshToken) return false;

    localStorage.setItem("accessToken", t.accessToken);
    localStorage.setItem("refreshToken", t.refreshToken);
    return true;
  } catch {
    return false;
  }
}

async function parseError(response: Response): Promise<ApiError> {
  const body = await response.json().catch(() => null);
  const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
  return new ApiError(message ?? "خطایی رخ داد", response.status);
}

type Options = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  // برای endpointهای auth که نباید رفرش خودکار بشن (login/verify/refresh/logout)
  skipRefresh?: boolean;
};

export async function apiFetch<T = void>(
  url: string,
  { method, body, skipRefresh = false }: Options,
): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const send = () => {
    const headers: Record<string, string> = {};
    if (body !== undefined && !isFormData) {
      headers["Content-Type"] = "application/json";
    }
    const access = getAccess();
    if (access) headers.Authorization = `Bearer ${access}`;

    return fetch(buildUrl(url), {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as FormData)
            : JSON.stringify(body),
    });
  };

  let response = await send();

  if (response.status === 401 && !skipRefresh && isBrowser && getRefresh()) {
    refreshing ??= refreshTokens().finally(() => {
      refreshing = null;
    });
    const ok = await refreshing;

    if (ok) {
      response = await send();
    } else {
      clearTokens();
      window.location.replace(LOGIN_PATH);
      throw new ApiError("نشست شما منقضی شده است.", 401);
    }
  }

  if (!response.ok) throw await parseError(response);

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const json = await response.json()
    return (json?.data ?? json) as T;
  }
  return undefined as T;
}
