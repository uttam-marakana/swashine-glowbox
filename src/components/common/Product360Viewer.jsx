import { useState, useRef, useEffect, useCallback } from "react";
import { RotateCcw, Play, Pause, Upload, X } from "lucide-react";

/**
 * 360° product viewer — drag (or touch) left/right to rotate through frames.
 * Supports product frame list + optional multi-image upload for a custom sequence.
 */
export default function Product360Viewer({
  frames = [],
  productName = "Product",
  className = "",
}) {
  const [images, setImages] = useState(frames.filter(Boolean));
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const containerRef = useRef(null);
  const lastX = useRef(0);
  const acc = useRef(0);
  const objectUrls = useRef([]);
  const autoplayRef = useRef(null);

  // Sync when product frames change
  useEffect(() => {
    // Keep user uploads if any; otherwise use product frames
    if (objectUrls.current.length === 0) {
      setImages(frames.filter(Boolean));
      setIndex(0);
    }
  }, [frames]);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrls.current = [];
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  useEffect(() => {
    if (autoplay && images.length > 1) {
      autoplayRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 120);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, images.length]);

  const stepFromDelta = useCallback(
    (dx) => {
      if (images.length < 2) return;
      acc.current += dx;
      const threshold = 12; // px per frame
      while (acc.current >= threshold) {
        acc.current -= threshold;
        setIndex((i) => (i + 1) % images.length);
      }
      while (acc.current <= -threshold) {
        acc.current += threshold;
        setIndex((i) => (i - 1 + images.length) % images.length);
      }
    },
    [images.length],
  );

  const onPointerDown = (e) => {
    if (images.length < 2) return;
    setDragging(true);
    setAutoplay(false);
    lastX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    acc.current = 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = x - lastX.current;
    lastX.current = x;
    stepFromDelta(dx);
  };

  const onPointerUp = () => {
    setDragging(false);
    acc.current = 0;
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (!files.length) return;
    objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
    const urls = files.map((f) => URL.createObjectURL(f));
    objectUrls.current = urls;
    setImages(urls);
    setIndex(0);
    setAutoplay(false);
    e.target.value = "";
  };

  const resetToProduct = () => {
    objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
    objectUrls.current = [];
    setImages(frames.filter(Boolean));
    setIndex(0);
    setAutoplay(false);
  };

  const hasImages = images.length > 0;
  const canRotate = images.length > 1;
  const current = hasImages ? images[index % images.length] : null;

  return (
    <section className={className}>
      <div className="text-center mb-6">
        <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
          Interactive
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          360° Product View
        </h2>
        <p className="text-zinc-400 mt-2 text-sm max-w-md mx-auto">
          {canRotate
            ? "Drag left or right to rotate the product"
            : "Add multiple angle photos to enable full 360° rotation"}
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div
          ref={containerRef}
          className={`relative aspect-square rounded-3xl border overflow-hidden bg-zinc-900 select-none touch-none ${
            canRotate
              ? "border-brand-500/30 cursor-grab active:cursor-grabbing"
              : "border-zinc-800"
          } ${dragging ? "cursor-grabbing" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {current ? (
            <img
              src={current}
              alt={`${productName} — angle ${index + 1}`}
              className="w-full h-full object-contain p-6 pointer-events-none"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
              <div className="text-6xl mb-3 opacity-40">🔄</div>
              <p className="text-sm">
                No frames yet — upload angle photos below
              </p>
            </div>
          )}

          {/* Overlay hints */}
          {canRotate && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-xs text-zinc-300 pointer-events-none">
              <RotateCcw size={14} className="text-brand-400" />
              Drag to rotate · {index + 1}/{images.length}
            </div>
          )}

          {!canRotate && hasImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-xs text-zinc-400 pointer-events-none">
              Single view — upload 8–36 angles for 360°
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          {canRotate && (
            <button
              type="button"
              onClick={() => setAutoplay((a) => !a)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm transition"
            >
              {autoplay ? <Pause size={16} /> : <Play size={16} />}
              {autoplay ? "Pause" : "Auto-spin"}
            </button>
          )}

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm transition cursor-pointer">
            <Upload size={16} />
            Upload 360 frames
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>

          {objectUrls.current.length > 0 && (
            <button
              type="button"
              onClick={resetToProduct}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm transition"
            >
              <X size={16} />
              Reset
            </button>
          )}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-4">
          Tip: Capture product photos every 10–15° (24–36 frames) for a smooth
          spin. Uploads stay in your browser only.
        </p>
      </div>
    </section>
  );
}
