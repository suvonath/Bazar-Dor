import { auth, takeAuthError } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth).POST;

/**
 * TEMPORARY diagnostic: Better Auth swallows unhandled errors into an empty
 * 500, which hides the cause in production. Re-attach the captured error to
 * the body so it can be read back during debugging.
 */
async function withDiagnostics(request: Request): Promise<Response> {
  const response = await handler(request);

  if (response.status >= 500) {
    const error = takeAuthError();

    if (error) {
      const message =
        error instanceof Error ? `${error.name}: ${error.message}` : String(error);

      console.error("[auth] responding with diagnostic:", message);

      return new Response(JSON.stringify({ diagnostic: message }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return response;
}

export const GET = withDiagnostics;
export const POST = withDiagnostics;
