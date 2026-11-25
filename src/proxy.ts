import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Next.js 16 route guard (`middleware` was renamed to `proxy`).
 * Protects confidential pages so guests cannot open them via a direct link:
 * - /profile, /profile/*  (profile + update-information routes)
 * - /products/*, /product/*  (product detail pages — protected per spec)
 *
 * Unauthenticated visitors are redirected to /sign-in with `?reason=protected`,
 * which ToastHandler turns into a warning toast.
 */
export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session?.user) {
      return NextResponse.next();
    }
  } catch {
    // Session lookup failed (e.g. database unavailable) — treat as guest.
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("reason", "protected");

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/products/:path*",
    "/product/:path*",
  ],
};
