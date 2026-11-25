"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, getSessionUser } from "@/lib/auth";

function authErrorCode(error: unknown, fallback: string) {
  if (error instanceof APIError) {
    if (error.body?.code === "USER_ALREADY_EXISTS") {
      return "exists";
    }

    if (error.status === 401 || error.status === 403) {
      return "credentials";
    }
  }

  return fallback;
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

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
  } catch (error) {
    redirect(`/sign-up?error=${authErrorCode(error, "failed")}`);
  }

  // Spec: after registering, take the user to the login page with a toast.
  redirect("/sign-in?toast=signup");
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

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
  } catch (error) {
    redirect(`/sign-in?error=${authErrorCode(error, "credentials")}`);
  }

  redirect("/?toast=signin");
}

export async function socialSignInAction(formData: FormData) {
  const provider = String(formData.get("provider") ?? "Google").toLowerCase();
  let url: string | undefined;

  try {
    const result = await auth.api.signInSocial({
      body: { provider, callbackURL: "/?toast=signin" },
    });

    url = result.url;
  } catch {
    redirect("/sign-in?error=social");
  }

  if (!url) {
    redirect("/sign-in?error=social");
  }

  redirect(url);
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/?toast=signout");
}

export async function updateProfileAction(formData: FormData) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    redirect("/profile?error=name");
  }

  try {
    await auth.api.updateUser({
      body: { name },
      headers: await headers(),
    });
  } catch {
    redirect("/profile?error=name");
  }

  redirect("/profile?toast=updated");
}
