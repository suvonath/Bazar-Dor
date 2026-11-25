"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: ReactNode;
  pendingText: string;
  className?: string;
}

/** Submit button that shows a spinner while its server action runs. */
const SubmitButton = ({
  children,
  pendingText,
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <span className="inline-flex items-center justify-center gap-2">
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          {pendingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
