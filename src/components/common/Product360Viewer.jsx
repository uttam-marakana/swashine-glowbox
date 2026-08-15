import { useState, useRef, useEffect } from "react";
import { RotateCcw, Play, Pause, Upload, X } from "lucide-react";

/**
 * 360° product viewer with FRONT + BACK faces.
 * - Predefined: frames[0] = front, frames[last] = back
 * - Upload front + optional back
 * - Drag / auto-spin for full 360°
 */
export default function Product360Viewer({
  frames = [],
  productName = "Product",
  className = "",
}) {
  const list = frames.filter(Boolean);
  const defaultFront = list[0] || null;
  const defaultBack = list.length > 1 ? list[list.length - 1] : list[0] || null;

  const [frontSrc, setFrontSrc] = useState(defaultFront);
  const [backSrc, setBackSrc] = useState(defaultBack);
  const [rotationY, setRotationY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [userFront, setUserFront] = useState(false);
  const [userBack, setUserBack] = useState(false);

  const lastX = useRef(0);
  const frontUrl = useRef(null);
  const backUrl = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (userFront || userBack) return;
    const f = frames.filter(Boolean);
    setFrontSrc(f[0] || null);
    setBackSrc(f.length > 1 ? f[f.length - 1] : f[0] || null);
    setRotationY(0);
  }, [frames, userFront, userBack]);

  useEffect(() => {
    return () => {
      if (frontUrl.current) URL.revokeObjectURL(frontUrl.current);
      if (backUrl.current) URL.revokeObjectURL(backUrl.current);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  useEffect(() => {
    if (!autoplay) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }
    autoplayRef.current = setInterval(() => {
      setRotationY((r) => (r + 3) % 360);
    }, 40);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay]);

  const onPointerDown = (e) => {
    if (!frontSrc) return;
    setDragging(true);
    setAutoplay(false);
    lastX.current = e.clientX ?? 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? 0;
    const dx = x - lastX.current;
    lastX.current = x;
    setRotationY((r) => {
      let next = r + dx * 0.45;
      return ((next % 360) + 360) % 360;
    });
  };

  const onPointerUp = () => setDragging(false);

  const handleFrontUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (frontUrl.current) URL.revokeObjectURL(frontUrl.current);
    const url = URL.createObjectURL(file);
    frontUrl.current = url;
    setFrontSrc(url);
    setUserFront(true);
    if (!userBack) setBackSrc(url);
    setRotationY(0);
    setAutoplay(false);
    e.target.value = "";
  };

  const handleBackUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (backUrl.current) URL.revokeObjectURL(backUrl.current);
    const url = URL.createObjectURL(file);
    backUrl.current = url;
    setBackSrc(url);
    setUserBack(true);
    setAutoplay(false);
    e.target.value = "";
  };

  const resetToProduct = () => {
    if (frontUrl.current) {
      URL.revokeObjectURL(frontUrl.current);
      frontUrl.current = null;
    }
    if (backUrl.current) {
      URL.revokeObjectURL(backUrl.current);
      backUrl.current = null;
    }
    setUserFront(false);
    setUserBack(false);
    const f = frames.filter(Boolean);
    setFrontSrc(f[0] || null);
    setBackSrc(f.length > 1 ? f[f.length - 1] : f[0] || null);
    setRotationY(0);
    setAutoplay(false);
  };

  const hasImage = Boolean(frontSrc);
  const backIsMirrored = backSrc && frontSrc && backSrc === frontSrc;

  return (
    <section className={className}>
      <div className="text-center mb-6">
        <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
          Interactive
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          360° Product View
        </h2>
        <p className="text-zinc-400 mt-2 text-sm max-w-lg mx-auto">
          Front + back faces for a full spin. Drag to rotate · Upload front and
          back photos.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div
          className={`relative aspect-square rounded-3xl border overflow-hidden bg-zinc-900 select-none touch-none ${
            hasImage
              ? "border-brand-500/30 cursor-grab active:cursor-grabbing"
              : "border-zinc-800"
          } ${dragging ? "cursor-grabbing" : ""}`}
          style={{ perspective: "1200px" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {hasImage ? (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative w-[78%] h-[78%]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotationY}deg)`,
                  transition: dragging ? "none" : "transform 0.08s linear",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-950/80 border border-zinc-700 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg) translateZ(2px)",
                  }}
                >
                  <img
                    src={frontSrc}
                    alt={`${productName} front`}
                    className="max-w-full max-h-full object-contain p-3 pointer-events-none"
                    draggable={false}
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-brand-500 text-black px-2 py-0.5 rounded-full">
                    Front
                  </span>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-950/80 border border-zinc-700 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg) translateZ(2px)",
                  }}
                >
                  <img
                    src={backSrc || frontSrc}
                    alt={`${productName} back`}
                    className={`max-w-full max-h-full object-contain p-3 pointer-events-none ${
                      backIsMirrored ? "scale-x-[-1]" : ""
                    }`}
                    draggable={false}
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-zinc-600 text-white px-2 py-0.5 rounded-full">
                    Back
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
              <div className="text-6xl mb-3 opacity-40">🔄</div>
              <p className="text-sm">
                Upload front (and back) photos for 360° preview
              </p>
            </div>
          )}

          {hasImage && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-xs text-zinc-300 pointer-events-none">
              <RotateCcw size={14} className="text-brand-400" />
              Drag to rotate · {Math.round(rotationY)}°
              <span className="text-zinc-500">
                · {rotationY >= 90 && rotationY < 270 ? "Back" : "Front"}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          {hasImage && (
            <button
              type="button"
              onClick={() => setAutoplay((a) => !a)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm transition"
            >
              {autoplay ? <Pause size={16} /> : <Play size={16} />}
              {autoplay ? "Pause" : "Auto-spin"}
            </button>
          )}

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-black font-medium text-sm hover:bg-brand-600 transition cursor-pointer">
            <Upload size={16} />
            Upload front
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFrontUpload}
            />
          </label>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm transition cursor-pointer">
            <Upload size={16} />
            Upload back
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBackUpload}
            />
          </label>

          {(userFront || userBack) && (
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

        <p className="text-center text-xs text-zinc-600 mt-4 max-w-md mx-auto">
          Gallery: first image = front, last = back. Upload both sides for the
          best 360° view.
        </p>
      </div>
    </section>
  );
}
