import type { IncomingMessage } from "http";

/**
 * Obtiene el pathname de una URL.
 * Usa una base falsa para poder parsear URLs relativas.
 * @param url - URL relativa o completa
 * @returns pathname de la URL
 */
export function getPathname(url: string): string {
  try {
    return new URL(url, "http://localhost").pathname;
  } catch {
    return "/";
  }
}

/**
 * Obtiene los parámetros de query de un IncomingMessage.
 * Maneja correctamente tanto entornos locales como producción detrás de un proxy.
 * @param req - Objeto IncomingMessage
 * @returns URLSearchParams con los parámetros de la URL
 */
export function getQueryParams(req: IncomingMessage): URLSearchParams {
  const rawUrl = req.url ?? "/";

  // Determinar protocolo (x-forwarded-proto si existe, sino http)
  const protocol = Array.isArray(req.headers["x-forwarded-proto"])
    ? req.headers["x-forwarded-proto"][0]
    : req.headers["x-forwarded-proto"] ?? "http";

  // Determinar host (header host o localhost por defecto)
  const host = Array.isArray(req.headers.host) ? req.headers.host[0] : req.headers.host ?? "localhost";

  try {
    const fullUrl = new URL(rawUrl, `${protocol}://${host}`);
    return fullUrl.searchParams;
  } catch {
    // Si algo falla, devolver un objeto vacío para no romper el servidor
    return new URLSearchParams();
  }
}

/**
 * Obtiene un objeto con todos los parámetros de query como key/value.
 * Útil si no querés usar URLSearchParams directamente.
 * @param req - IncomingMessage
 * @returns Record<string, string>
 */
export function getQueryObject(req: IncomingMessage): Record<string, string> {
  const params = getQueryParams(req);
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}