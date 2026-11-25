"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  ERROR_MESSAGES,
  PROTECTED_MESSAGE,
  TOAST_MESSAGES,
} from "@/lib/messages";

/**
 * Reads `?toast=`, `?error=` and `?reason=` query parameters and shows the
 * matching react-hot-toast notification, then cleans the URL (except `error`,
 * which stays so the inline form message keeps rendering).
 */
const ToastHandler = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handledRef = useRef<string | null>(null);

  const error = searchParams.get("error");
  const toastParam = searchParams.get("toast");
  const reason = searchParams.get("reason");

  useEffect(() => {
    if (!error && !toastParam && !reason) {
      return;
    }

    // Guard against React StrictMode double-invoking the effect.
    const key = `${pathname}|${error}|${toastParam}|${reason}`;
    if (handledRef.current === key) {
      return;
    }
    handledRef.current = key;

    if (error) {
      toast.error(
        ERROR_MESSAGES[error] ?? "কিছু ভুল হয়েছে, আবার চেষ্টা করুন।"
      );
    } else if (reason === "protected") {
      toast(PROTECTED_MESSAGE, { icon: "⚠️" });
    } else if (toastParam) {
      const entry = TOAST_MESSAGES[toastParam];
      if (entry) {
        toast[entry.type](entry.message);
      }
    }

    // Remove one-shot params so a refresh doesn't repeat the toast.
    // `error` is kept: the auth forms render it inline as well.
    const params = new URLSearchParams(searchParams);
    params.delete("toast");
    params.delete("reason");
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl);
    }
  }, [searchParams, pathname, router, error, toastParam, reason]);

  return null;
};

export default ToastHandler;
