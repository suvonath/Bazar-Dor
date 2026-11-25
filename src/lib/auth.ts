import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { cache } from "react";
import { MongoClient, type Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Reuse one client across hot reloads in dev so we don't exhaust connections.
const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

/**
 * Creates (and caches) the Mongo client only when a connection string exists,
 * so `next build` never crashes when env vars are unavailable.
 * `MongoClient` itself connects lazily on first operation.
 */
function getMongoClient(): MongoClient | undefined {
  const uri = process.env.MONGODB_URL;

  if (!uri) {
    return undefined;
  }

  if (!globalForMongo.mongoClient) {
    globalForMongo.mongoClient = new MongoClient(uri);
  }

  return globalForMongo.mongoClient;
}

function getDb(): { db: Db; client: MongoClient } | undefined {
  const client = getMongoClient();

  if (!client) {
    return undefined;
  }

  return { db: client.db("bazar-dor"), client };
}

const connection = getDb();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // Sign-up must land on the login page (per spec) instead of auto-login.
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  // Failed OAuth flows land on the sign-in form with ?error=..., which renders
  // inline and as a react-hot-toast message (instead of a raw error page).
  onAPIError: {
    errorURL: "/sign-in",
  },
  database: connection
    ? mongodbAdapter(connection.db, { client: connection.client })
    : undefined,
  // Must be the last plugin: copies the Set-Cookie header of auth.api.*
  // calls into Next's cookie store so Server Actions actually persist it.
  plugins: [nextCookies()],
});

/**
 * Reads the current user from the Better Auth session cookie.
 * `cache` dedupes the lookup when Header and a page both ask in one request.
 * Returns null on any lookup failure so a database hiccup never crashes a page.
 */
export const getSessionUser = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user ?? null;
  } catch {
    return null;
  }
});
