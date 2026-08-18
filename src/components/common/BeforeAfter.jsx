import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

/**
 * Before & After — single image upload.
 * OFF / ON toggle applies brightness only (no second upload).
 * Uploaded file stays in the browser (object URL).
 */
export default function BeforeAfter({
  title = "Before & After",
  description = "Upload one photo, then toggle OFF / ON to preview unlit vs illuminated.",
  defaultSrc = null,
  defaultOffSrc = null,
  defaultOnSrc = null,
  className = "",
}) {
  // Prefer explicit defaultSrc; else product gallery defaults
  const initial = defaultSrc || defaultOnSrc || defaultOffSrc || null;

  const [showOn, setShowOn] = useState(true);
  const [src, setSrc] = useState(initial);
  const inputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    if (!objectUrlRef.current) {
      setSrc(defaultSrc || defaultOnSrc || defaultOffSrc || null);
    }
  }, [defaultSrc, defaultOffSrc, defaultOnSrc]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setSrc(url);
  };

  const clearUpload = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setSrc(defaultSrc || defaultOnSrc || defaultOffSrc || null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className={className}>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        {title}
      </h2>
      <p className="text-zinc-400 text-center mb-8 max-w-lg mx-auto text-sm md:text-base">
        {description}
      </p>

      {/* Single upload */}
      <div className="max-w-md mx-auto mb-6">
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Preview image
            </span>
            {src && objectUrlRef.current && (
              <button
                type="button"
                onClick={clearUpload}
                className="text-zinc-500 hover:text-red-400 transition"
                aria-label="Clear uploaded image"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-zinc-600 hover:border-brand-400/60 text-sm text-zinc-400 hover:text-brand-300 transition"
          >
            <Upload size={16} />
            {src ? "Change photo" : "Upload photo"}
          </button>
        </div>
      </div>

      {/* OFF / ON toggle (unchanged behaviour) */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => setShowOn(false)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
            !showOn
              ? "bg-red-500 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          OFF
        </button>
        <button
          type="button"
          onClick={() => setShowOn(true)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
            showOn
              ? "bg-green-500 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          ON
        </button>
      </div>

      {/* Preview — one image, brightness for OFF vs ON */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          key={showOn ? "on" : "off"}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className={`rounded-3xl border overflow-hidden aspect-[4/3] max-h-[min(65vh,480px)] flex items-center justify-center ${
            showOn
              ? "bg-zinc-800/80 border-green-500/30"
              : "bg-zinc-900/80 border-zinc-700"
          }`}
        >
          {src ? (
            <img
              src={src}
              alt={showOn ? "ON — illuminated" : "OFF — unlit"}
              className={`max-h-full max-w-full object-contain p-2 transition duration-300 ${
                showOn
                  ? "brightness-110 contrast-105"
                  : "brightness-50 saturate-50 opacity-90"
              }`}
            />
          ) : (
            <div className="text-center text-zinc-500 p-8">
              <ImageIcon size={48} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">
                Upload a photo to preview OFF / ON lighting
              </p>
            </div>
          )}
        </motion.div>
        <p className="text-center text-sm text-zinc-500 mt-4">
          {showOn
            ? "ON — fully illuminated, vibrant colours"
            : "OFF — print visible but not backlit"}
        </p>
        <p className="text-center text-xs text-zinc-600 mt-2">
          Images stay in your browser only — nothing is uploaded to our servers.
        </p>
      </div>
    </section>
  );
}
