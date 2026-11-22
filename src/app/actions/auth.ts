"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  encodeSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  type SessionUser,
} from "@/lib/auth";

async function startSession(user: SessionUser) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function signUpAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!name || !email || !password || !confirmPassword) {
    redirect("/sign-up?error=missing");
  }

  if (!email.includes("@")) {
    redirect("/sign-up?error=email");
  }

  if (password.length < 8) {
    redirect("/sign-up?error=password");
  }

  if (password !== confirmPassword) {
    redirect("/sign-up?error=match");
  }

  await startSession({ name, email });
  redirect("/");
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password || !email.includes("@")) {
    redirect("/sign-in?error=invalid");
  }

  if (password.length < 8) {
    redirect("/sign-in?error=password");
  }

  const name = email.split("@")[0];

  await startSession({ name, email });
  redirect("/");
}

export async function socialSignInAction(formData: FormData) {
  const provider = String(formData.get("provider") ?? "Google");

  // Placeholder until BetterAuth's OAuth providers are configured.
  await startSession({
    name: `${provider} ব্যবহারকারী`,
    email: `user@${provider.toLowerCase()}.example`,
  });
  redirect("/");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}
