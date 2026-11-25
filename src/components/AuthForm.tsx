import Link from "next/link";
import {
  signInAction,
  signUpAction,
  socialSignInAction,
} from "@/app/actions/auth";
import { ERROR_MESSAGES } from "@/lib/messages";
import SubmitButton from "./SubmitButton";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
  error?: string;
}

const labelClass = "block text-sm font-semibold text-gray-800";
const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100";
const socialButtonClass =
  "flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

const AuthForm = ({ mode, error }: AuthFormProps) => {
  const isSignUp = mode === "sign-up";

  return (
    <div className="space-y-4">
      <form action={isSignUp ? signUpAction : signInAction} className="space-y-4">
        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {ERROR_MESSAGES[error] ?? "কিছু ভুল হয়েছে, আবার চেষ্টা করুন।"}
          </p>
        ) : null}

        {isSignUp ? (
          <div>
            <label htmlFor="name" className={labelClass}>
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="যেমন: রবিউল ইসলাম"
              className={inputClass}
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className={labelClass}>
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={inputClass}
          />
        </div>

        {isSignUp ? (
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="আবার লিখুন"
              className={inputClass}
            />
          </div>
        ) : null}

        <SubmitButton
          pendingText={isSignUp ? "তৈরি হচ্ছে..." : "সাইন ইন হচ্ছে..."}
          className="w-full rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </SubmitButton>

        <div className="flex items-center gap-3 py-1 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>
      </form>

      {/*
        Social login lives in its own forms with a hidden `provider` input:
        a <button formAction={fn}> makes React overwrite the button's name
        with $ACTION_ID_..., which would lose the provider value (the GitHub
        button used to fall back to Google).
      */}
      <div className="grid grid-cols-2 gap-3">
        <form action={socialSignInAction}>
          <input type="hidden" name="provider" value="Google" />
          <SubmitButton
            pendingText="যাচাই হচ্ছে..."
            className={`w-full ${socialButtonClass}`}
          >
            <GoogleIcon />
            Google দিয়ে চালিয়ে যান
          </SubmitButton>
        </form>

        <form action={socialSignInAction}>
          <input type="hidden" name="provider" value="GitHub" />
          <SubmitButton
            pendingText="যাচাই হচ্ছে..."
            className={`w-full ${socialButtonClass}`}
          >
            <GitHubIcon />
            GitHub দিয়ে চালিয়ে যান
          </SubmitButton>
        </form>
      </div>

      <p className="pt-1 text-center text-sm text-gray-600">
        {isSignUp ? (
          <>
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </>
        ) : (
          <>
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
