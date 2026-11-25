/** Shared Bengali messages for form errors and toast notifications. */
export const ERROR_MESSAGES: Record<string, string> = {
  missing: "সব ঘর পূরণ করুন।",
  email: "সঠিক ইমেইল দিন।",
  password: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  match: "দুটি পাসওয়ার্ড মিলছে না।",
  invalid: "ইমেইল ও পাসওয়ার্ড সঠিকভাবে দিন।",
  exists: "এই ইমেইল দিয়ে একটি অ্যাকাউন্ট ইতিমধ্যে আছে।",
  credentials: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
  social: "সোশ্যাল সাইন ইন সফল হয়নি, আবার চেষ্টা করুন।",
  failed: "কিছু ভুল হয়েছে, আবার চেষ্টা করুন।",
  name: "নাম লিখুন।",
  protected: "এই পাতাটি দেখতে আগে সাইন ইন করতে হবে।",
};

export interface ToastMessage {
  type: "success" | "error";
  message: string;
}

/** Success toasts keyed by the `?toast=` query parameter. */
export const TOAST_MESSAGES: Record<string, ToastMessage> = {
  signin: { type: "success", message: "সফলভাবে সাইন ইন হয়েছে।" },
  signup: {
    type: "success",
    message: "রেজিস্ট্রেশন সফল হয়েছে! এখন সাইন ইন করুন।",
  },
  signout: { type: "success", message: "সফলভাবে সাইন আউট হয়েছে।" },
  updated: { type: "success", message: "প্রোফাইল আপডেট হয়েছে।" },
};

/** Shown when the proxy redirects an unauthenticated visitor to /sign-in. */
export const PROTECTED_MESSAGE = "এই পাতাটি দেখতে আগে সাইন ইন করতে হবে।";
