function resolveUrl(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/** Site origin for metadata and absolute links. */
export function getSiteUrl(): string {
  const fromPublicEnv = resolveUrl(process.env.NEXT_PUBLIC_SITE_URL, "");
  if (fromPublicEnv) return fromPublicEnv;

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

/** Backend API base URL (proxied through Next.js in development). */
export function getApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (configured) {
    if (configured.startsWith("/")) {
      if (typeof window === "undefined") {
        return `${getSiteUrl()}${configured}`;
      }
      return configured;
    }
    return configured;
  }

  if (typeof window === "undefined") {
    return `${getSiteUrl()}/api/v1`;
  }
  return "/api/v1";
}

export const siteConfig = {
  name: "The Unbroken Echo",
  tagline: "Where words linger long after the last page",
  description:
    "Stories, poems, and reflections for readers who feel deeply and thinkers who write.",
  author: "Rohit Ranjan",
  get url() {
    return getSiteUrl();
  },
  get apiUrl() {
    return getApiUrl();
  },
} as const;
