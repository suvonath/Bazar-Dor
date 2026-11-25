import type { Product } from "@/lib/products";
import { formatPct } from "@/lib/products";

type ChangeDirection = Product["change"]["dir"];

interface ChangeBadgeProps {
  dir: ChangeDirection;
  pct: number;
  size?: "sm" | "md";
}

const TONE_CLASS: Record<ChangeDirection, string> = {
  up: "bg-emerald-50 text-emerald-600",
  down: "bg-red-50 text-red-600",
  flat: "bg-gray-100 text-gray-500",
};

const ARROW: Record<ChangeDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
};

const ChangeBadge = ({ dir, pct, size = "sm" }: ChangeBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-semibold ${
        size === "md" ? "px-2.5 py-1 text-sm" : "px-2 py-0.5 text-xs"
      } ${TONE_CLASS[dir]}`}
    >
      <span aria-hidden="true">{ARROW[dir]}</span>
      {formatPct(pct)}
    </span>
  );
};

export default ChangeBadge;
