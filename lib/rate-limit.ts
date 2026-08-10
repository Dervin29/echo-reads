import { NextResponse } from "next/server";
import { headers as nextHeaders } from "next/headers";

type BackoffConfig = {
  multiplier: number;
  maxSeconds: number;
};

type TierConfig = {
  max: number;
  windowSeconds: number;
  backoff?: BackoffConfig;
};

const envInt = (name: string, fallback: number): number => {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const RATE_LIMIT_TIERS = {
  auth: {
    max: envInt("RATE_LIMIT_AUTH_MAX", 5),
    windowSeconds: envInt("RATE_LIMIT_AUTH_WINDOW_SECONDS", 60),
    backoff: {
      multiplier: envInt("RATE_LIMIT_AUTH_BACKOFF_MULTIPLIER", 2),
      maxSeconds: envInt("RATE_LIMIT_AUTH_MAX_BACKOFF_SECONDS", 900),
    },
  },
  public: {
    max: envInt("RATE_LIMIT_PUBLIC_MAX", 20),
    windowSeconds: envInt("RATE_LIMIT_PUBLIC_WINDOW_SECONDS", 60),
  },
  authed: {
    max: envInt("RATE_LIMIT_AUTHED_MAX", 60),
    windowSeconds: envInt("RATE_LIMIT_AUTHED_WINDOW_SECONDS", 60),
  },
} as const satisfies Record<string, TierConfig>;

export type RateLimitTier = keyof typeof RATE_LIMIT_TIERS;

type Entry = {
  hits: number[];
  blockedUntil: number;
  consecutive: number;
};

const store = new Map<string, Entry>();

const TOO_MANY_REQUESTS = "Too many requests. Please try again later.";

export function getClientIp(request?: Request): string {
  const forwarded = request?.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

export async function getRequestIp(): Promise<string> {
  const requestHeaders = await nextHeaders();
  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

export function buildKey(prefix: string, identifier: string): string {
  return `${prefix}:${identifier}`;
}

function cleanupExpired(now: number): void {
  if (store.size < 10000) return;
  const longestWindowMs = Math.max(
    ...Object.values(RATE_LIMIT_TIERS).map((tier) => tier.windowSeconds * 1000),
  );
  for (const [key, entry] of store) {
    const lastHit = entry.hits[entry.hits.length - 1] ?? 0;
    if (now - lastHit > longestWindowMs && entry.blockedUntil < now) {
      store.delete(key);
    }
  }
}

function checkLimit(
  key: string,
  tier: TierConfig,
): { limited: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  cleanupExpired(now);

  let entry = store.get(key);
  if (!entry) {
    entry = { hits: [], blockedUntil: 0, consecutive: 0 };
    store.set(key, entry);
  }

  if (entry.blockedUntil > now) {
    return {
      limited: true,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((entry.blockedUntil - now) / 1000),
      ),
    };
  }

  const windowMs = tier.windowSeconds * 1000;
  entry.hits = entry.hits.filter((hit) => now - hit < windowMs);

  if (entry.hits.length >= tier.max) {
    let retryAfterSeconds = tier.windowSeconds;
    if (tier.backoff) {
      const factor = Math.pow(tier.backoff.multiplier, entry.consecutive);
      retryAfterSeconds = Math.min(
        tier.windowSeconds * factor,
        tier.backoff.maxSeconds,
      );
    }
    entry.consecutive += 1;
    entry.blockedUntil = now + retryAfterSeconds * 1000;
    return { limited: true, remaining: 0, retryAfterSeconds };
  }

  entry.hits.push(now);
  entry.consecutive = 0;
  return {
    limited: false,
    remaining: tier.max - entry.hits.length,
    retryAfterSeconds: 0,
  };
}

function rateLimitResponse(
  tier: TierConfig,
  result: { remaining: number; retryAfterSeconds: number },
): NextResponse {
  return NextResponse.json(
    { error: TOO_MANY_REQUESTS },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfterSeconds),
        "X-RateLimit-Limit": String(tier.max),
        "X-RateLimit-Remaining": String(result.remaining),
      },
    },
  );
}

export function routeRateLimit(opts: {
  tier: RateLimitTier;
  request: Request;
  identifier?: string;
}): NextResponse | null {
  const tier = RATE_LIMIT_TIERS[opts.tier];
  const identifier = opts.identifier ?? getClientIp(opts.request);
  const result = checkLimit(buildKey(`rl:${opts.tier}`, identifier), tier);
  if (!result.limited) return null;
  return rateLimitResponse(tier, result);
}

export async function actionRateLimit(opts: {
  tier: RateLimitTier;
  identifier?: string;
}): Promise<{ limited: boolean; retryAfterSeconds: number }> {
  const tier = RATE_LIMIT_TIERS[opts.tier];
  const identifier = opts.identifier ?? (await getRequestIp());
  const result = checkLimit(buildKey(`rl:${opts.tier}`, identifier), tier);
  return { limited: result.limited, retryAfterSeconds: result.retryAfterSeconds };
}

export function checkAuthAttempts(opts: {
  accountId: string;
  request: Request;
}): NextResponse | null {
  const tier = RATE_LIMIT_TIERS.auth;
  const accountResult = checkLimit(
    buildKey("rl:auth:account", opts.accountId),
    tier,
  );
  const ipResult = checkLimit(
    buildKey("rl:auth:ip", getClientIp(opts.request)),
    tier,
  );
  const limited = accountResult.limited || ipResult.limited;
  if (!limited) return null;
  return rateLimitResponse(tier, {
    remaining: 0,
    retryAfterSeconds: Math.max(
      accountResult.retryAfterSeconds,
      ipResult.retryAfterSeconds,
    ),
  });
}
