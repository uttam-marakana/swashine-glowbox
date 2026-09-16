import { useState } from "react";

function PrintPriceToggle({
  priceWithoutPrint,
  priceWithPrint,
  fallback,
  defaultWithPrint = true,
}) {
  const [withPrint, setWithPrint] = useState(defaultWithPrint);

  const without = priceWithoutPrint || fallback || "—";
  const withP = priceWithPrint || fallback || "—";
  const activePrice = withPrint ? withP : without;

  const btn = (active) =>
    `flex-1 min-w-0 rounded-2xl border px-4 py-3 text-center transition ${
      active
        ? "bg-brand-500/15 border-brand-400 text-white shadow-[0_0_24px_rgba(251,191,36,0.12)]"
        : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"
    }`;

  return (
    <div className="mb-6 space-y-3">
      <div className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
        Print option
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          type="button"
          className={btn(!withPrint)}
          onClick={() => setWithPrint(false)}
        >
          <div className="text-xs sm:text-sm font-medium mb-1">
            Without Print
          </div>
          <div
            className={`text-base sm:text-lg font-bold tabular-nums ${
              !withPrint ? "text-brand-400" : "text-zinc-500"
            }`}
          >
            {without}
          </div>
        </button>
        <button
          type="button"
          className={btn(withPrint)}
          onClick={() => setWithPrint(true)}
        >
          <div className="text-xs sm:text-sm font-medium mb-1">With Print</div>
          <div
            className={`text-base sm:text-lg font-bold tabular-nums ${
              withPrint ? "text-brand-400" : "text-zinc-500"
            }`}
          >
            {withP}
          </div>
        </button>
      </div>
      <div className="text-sm text-zinc-400">
        Selected:{" "}
        <span className="text-white font-medium">
          {withPrint ? "With Print" : "Without Print"}
        </span>
        <span className="text-brand-400 font-bold ml-2 text-lg">
          {activePrice}
        </span>
      </div>
    </div>
  );
}
