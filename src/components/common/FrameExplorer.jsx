import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const VIEWS = [
  { id: "front", label: "Front", hint: "Lit display face" },
  { id: "back", label: "Back", hint: "Mounting & cable" },
  { id: "top", label: "Top insert", hint: "Banner / poster slot" },
  { id: "bottom", label: "Bottom", hint: "Base & finish" },
  { id: "side", label: "Side", hint: "Frame depth" },
];

/**
 * 5-view frame explorer + poster upload with top-slot insert animation.
 * defaultViews: optional { front, back, top, bottom, side } image URLs
 */
export default function FrameExplorer({
  productName = "Glowbox",
  defaultViews = {},
  className = "",
}) {
  const [active, setActive] = useState("front");
  const [posterSrc, setPosterSrc] = useState(null);
  const [inserting, setInserting] = useState(false);
  const inputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    // 1) Jump to top insert view
    setActive("top");
    setInserting(true);
    setPosterSrc(null);

    // 2) Brief “sliding into slot” moment
    await new Promise((r) => setTimeout(r, 700));

    // 3) Set image + move to front (poster appears on face)
    setPosterSrc(url);
    setActive("front");
    await new Promise((r) => setTimeout(r, 400));
    setInserting(false);
  };

  const clearPoster = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setPosterSrc(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const shellSrc = defaultViews[active] || null;

  return (
    <section className={className}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Frame design explorer
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
          Explore front, back, top insert slot, bottom and side. Upload a
          graphic — it slides in from the top slot, then lights up on the front.
        </p>
      </div>

      {/* View tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => !inserting && setActive(v.id)}
            disabled={inserting}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              active === v.id
                ? "bg-brand-500 text-black"
                : "bg-white/5 border border-white/10 text-zinc-400 hover:border-brand-400/40 hover:text-white"
            } disabled:opacity-50`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-zinc-500 mb-4">
        {VIEWS.find((v) => v.id === active)?.hint}
      </p>

      {/* Stage */}
      <div className="relative mx-auto max-w-xl aspect-[4/5] md:aspect-[5/4] rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active + (posterSrc || "empty")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
          >
            {/* Product shell / placeholder frame */}
            <div className="relative w-full h-full max-w-sm mx-auto">
              {/* Outer aluminium frame look */}
              <div
                className={`absolute inset-0 rounded-lg border-[10px] md:border-[14px] ${
                  active === "front"
                    ? "border-zinc-600 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]"
                    : "border-zinc-700"
                } bg-zinc-900/80`}
              />

              {/* Inner display area */}
              <div className="absolute inset-[10px] md:inset-[14px] rounded-sm overflow-hidden bg-zinc-950 flex items-center justify-center">
                {/* Optional product photo for this angle */}
                {shellSrc && active !== "front" && (
                  <img
                    src={shellSrc}
                    alt={`${productName} ${active}`}
                    className="absolute inset-0 w-full h-full object-contain opacity-90"
                  />
                )}

                {/* FRONT: poster or empty */}
                {active === "front" && (
                  <>
                    {posterSrc ? (
                      <motion.img
                        key={posterSrc}
                        src={posterSrc}
                        alt="Uploaded banner"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 w-full h-full object-cover"
                      />
                    ) : shellSrc ? (
                      <img
                        src={shellSrc}
                        alt={`${productName} front`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-zinc-600 p-6">
                        <ImageIcon
                          size={40}
                          className="mx-auto mb-2 opacity-40"
                        />
                        <p className="text-xs">
                          Upload a graphic to preview on front
                        </p>
                      </div>
                    )}
                    {/* Soft “ON” glow when poster present */}
                    {posterSrc && (
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(251,191,36,0.15)]" />
                    )}
                  </>
                )}

                {/* TOP: insert slot + animation */}
                {active === "top" && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div className="w-[85%] h-3 rounded-full bg-zinc-800 border border-zinc-600 mb-4 shadow-inner" />
                    <p className="text-xs text-zinc-500 mb-2">
                      Poster insert slot
                    </p>
                    <AnimatePresence>
                      {inserting && (
                        <motion.div
                          initial={{ y: -120, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 40, opacity: 0 }}
                          transition={{ duration: 0.65, ease: "easeInOut" }}
                          className="w-[70%] aspect-[3/4] max-h-[55%] rounded border-2 border-dashed border-brand-400/60 bg-brand-500/10 flex items-center justify-center"
                        >
                          <span className="text-xs text-brand-400 font-medium px-2 text-center">
                            Inserting graphic…
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!inserting && !posterSrc && (
                      <p className="text-xs text-zinc-600 mt-2">
                        Use Upload — graphic slides in here first
                      </p>
                    )}
                    {!inserting && posterSrc && (
                      <p className="text-xs text-green-400/90 mt-2">
                        Graphic loaded — viewing front face
                      </p>
                    )}
                  </div>
                )}

                {/* BACK / BOTTOM / SIDE labels when no shell image */}
                {!shellSrc && active !== "front" && active !== "top" && (
                  <div className="text-center text-zinc-500">
                    <div className="text-4xl mb-2 opacity-30">▣</div>
                    <p className="text-sm font-medium capitalize">
                      {active} view
                    </p>
                    <p className="text-xs mt-1 text-zinc-600">
                      Add photo in admin / defaultViews later
                    </p>
                  </div>
                )}
              </div>

              {/* Side depth cue */}
              {active === "side" && (
                <div className="absolute right-0 top-[12%] bottom-[12%] w-3 md:w-4 bg-gradient-to-r from-zinc-700 to-zinc-500 rounded-r-sm" />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {inserting && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 text-[10px] uppercase tracking-widest text-brand-400 bg-black/60 px-3 py-1 rounded-full">
            Sliding into top slot…
          </div>
        )}
      </div>

      {/* Upload */}
      <div className="mt-6 max-w-md mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex flex-col sm:flex-row items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            disabled={inserting}
            onClick={() => inputRef.current?.click()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 text-black font-semibold text-sm px-5 py-2.5 disabled:opacity-60"
          >
            <Upload size={16} />
            {inserting ? "Inserting…" : "Upload front graphic"}
          </button>
          {posterSrc && (
            <button
              type="button"
              onClick={clearPoster}
              className="text-sm text-zinc-400 hover:text-red-400 inline-flex items-center gap-1"
            >
              <X size={14} /> Clear
            </button>
          )}
          <p className="text-xs text-zinc-500 sm:ml-auto text-center sm:text-right">
            Stays in your browser only
          </p>
        </div>
      </div>
    </section>
  );
}
