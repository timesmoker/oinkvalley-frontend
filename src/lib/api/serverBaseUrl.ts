import { headers } from "next/headers";

/**
 * 서버 컴포넌트(SSR)에서 상대 baseURL("/api")를 절대 URL로 변환한다.
 * - 프록시/로드밸런서 환경에서는 x-forwarded-*를 우선한다.
 * - host를 못 구하면 NEXT_PUBLIC_API_URL은 절대 URL이어야 한다.
 */
export function getServerApiBaseUrl(fallbackBaseUrl: string): string {
  const base = fallbackBaseUrl || "/api";

  if (!base.startsWith("/")) return base; // already absolute (http(s)://...) or other scheme

  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");

  if (!host) {
    throw new Error(
      `Cannot build absolute API URL: host header missing. Set NEXT_PUBLIC_API_URL to an absolute URL (e.g. https://nginx/api) instead of "${base}".`,
    );
  }

  return `${proto}://${host}${base}`;
}

export function getForwardedCookieHeader(): string {
  const h = headers();
  return h.get("cookie") ?? "";
}
