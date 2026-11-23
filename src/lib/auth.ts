import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  emailAndPassword:{
    enabled:true,
  }
  database: mongodbAdapter(db, {
    client,
  }),
});

















// import { cookies } from "next/headers";

// export interface SessionUser {
//   name: string;
//   email: string;
// }

// export const SESSION_COOKIE = "bazardor_session";
// export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;


// export async function getSessionUser(): Promise<SessionUser | null> {
//   const cookieStore = await cookies();
//   const raw = cookieStore.get(SESSION_COOKIE)?.value;

//   if (!raw) {
//     return null;
//   }

//   try {
//     const json = Buffer.from(raw, "base64url").toString("utf8");
//     return JSON.parse(json) as SessionUser;
//   } catch {
//     return null;
//   }
// }

// export function encodeSession(user: SessionUser): string {
//   return Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
// }
