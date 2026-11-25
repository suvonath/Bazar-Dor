"use client";

import { Toaster as HotToaster } from "react-hot-toast";

/** Global react-hot-toast container (`data-rht-toaster`). */
const Toaster = () => (
  <HotToaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        fontSize: "0.875rem",
        borderRadius: "0.75rem",
        padding: "0.75rem 1rem",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      success: {
        iconTheme: { primary: "#15803d", secondary: "#ffffff" },
      },
      error: {
        iconTheme: { primary: "#dc2626", secondary: "#ffffff" },
      },
    }}
  />
);

export default Toaster;
