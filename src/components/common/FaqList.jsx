import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqList({ items = [], className = "" }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="border border-zinc-800 rounded-2xl bg-zinc-900/60 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-sm md:text-base">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-brand-400 transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
