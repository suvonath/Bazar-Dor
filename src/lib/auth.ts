import { cookies } from "next/headers";

export interface SessionUser {
  name: string;
  email: string;
}

export const SESSION_COOKIE = "bazardor_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

/**
 * Placeholder session store until BetterAuth is wired up.
 * Replace `getSessionUser` with `auth.api.getSession({ headers: await headers() })`
 * and the actions in `src/app/actions/auth.ts` with BetterAuth's client/server calls.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  try {
    const json = Buffer.from(raw, "base64url").toString("utf8");
    return JSON.parse(json) as SessionUser;
  } catch {
    return null;
  }
}

export function encodeSession(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
}
