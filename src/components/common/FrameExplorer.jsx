import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

const VIEWS = [
  { id: "front", label: "Front", hint: "Display face" },
  { id: "back", label: "Back", hint: "Mounting & cable side" },
  { id: "top", label: "Top insert", hint: "Banner / poster slot" },
  { id: "bottom", label: "Bottom", hint: "Base & finish" },
];

/**
 * Admin-only frame angles: product.frameViews { front, back, top, bottom }
 * No visitor upload — manage images in Admin → Product → Frame views
 */
export default function FrameExplorer({
  productName = "Glowbox",
  defaultViews = {},
  className = "",
}) {
  const [active, setActive] = useState("front");
  const shellSrc = defaultViews[active] || null;
  const hasAny = VIEWS.some((v) => defaultViews[v.id]);

  return (
    <section className={className}>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Frame design</h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
          Front, back, top insert slot and bottom — catalog photos managed in
          Admin.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              active === v.id
                ? "bg-brand-500 text-black"
                : "bg-white/5 border border-white/10 text-zinc-400 hover:border-brand-400/40 hover:text-white"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-zinc-500 mb-4">
        {VIEWS.find((v) => v.id === active)?.hint}
      </p>

      <div className="relative mx-auto max-w-xl aspect-[4/5] md:aspect-[5/4] rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 p-4 md:p-6 flex items-center justify-center"
          >
            {shellSrc ? (
              <img
                src={shellSrc}
                alt={`${productName} — ${active}`}
                className="max-w-full max-h-full w-full h-full object-contain"
              />
            ) : (
              <div className="text-center text-zinc-500 p-6">
                <ImageIcon size={40} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm capitalize">{active} view</p>
                <p className="text-xs text-zinc-600 mt-1">
                  {hasAny
                    ? "No image for this angle — set it in Admin"
                    : "Upload frame images in Admin → Edit product → Frame views"}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {hasAny && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {VIEWS.map((v) =>
            defaultViews[v.id] ? (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(v.id)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${
                  active === v.id ? "border-brand-500" : "border-white/10"
                }`}
              >
                <img
                  src={defaultViews[v.id]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ) : null,
          )}
        </div>
      )}
    </section>
  );
}
