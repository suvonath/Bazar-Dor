import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { cache } from "react";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Reuse one client across hot reloads in dev so we don't exhaust connections.
const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ??
  new MongoClient(process.env.MONGODB_URL as string);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:{
    google:{
      clientId:process.env.GOOGLE_CLIENT_ID as string,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,

    },
    github:{
      clientId:process.env.GITHUB_CLIENT_ID as string,
      clientSecret:process.env.GITHUB_CLIENT_SECRET as string,

    }

  },
  database: mongodbAdapter(db, {
    client,
  }),
  // Must be the last plugin: copies the Set-Cookie header of auth.api.*
  // calls into Next's cookie store so Server Actions actually persist it.
  plugins: [nextCookies()],
});

/**
 * Reads the current user from the Better Auth session cookie.
 * `cache` dedupes the lookup when Header and a page both ask in one request.
 */
export const getSessionUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
});
