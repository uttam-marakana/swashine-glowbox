import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { company, artworkGuidelines } from "@/data/company";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const RATE_PER_SQFT = 900;
const MAX_WIDTH_FT = 2;
const MAX_HEIGHT_FT = 6;
const MAX_WIDTH_IN = MAX_WIDTH_FT * 12;
const MAX_HEIGHT_IN = MAX_HEIGHT_FT * 12;

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
const glassHover =
  "hover:bg-white/[0.07] hover:border-brand-400/30 transition-all duration-300";
const glassCard = `${glass} ${glassHover} rounded-3xl`;

export default function Custom() {
  const [width, setWidth] = useState(24);
  const [height, setHeight] = useState(36);
  const [unit, setUnit] = useState("inch");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  const toInches = (w, h) => {
    if (unit === "ft") return { wIn: w * 12, hIn: h * 12 };
    return { wIn: w, hIn: h };
  };

  const calculate = () => {
    setError("");
    setQuote(null);
    const w = Number(width) || 0;
    const h = Number(height) || 0;
    if (w <= 0 || h <= 0) {
      setError("Please enter valid width and height.");
      return;
    }
    const { wIn, hIn } = toInches(w, h);
    const fits =
      (wIn <= MAX_WIDTH_IN && hIn <= MAX_HEIGHT_IN) ||
      (wIn <= MAX_HEIGHT_IN && hIn <= MAX_WIDTH_IN);
    if (!fits) {
      setError(
        `Maximum customised size is ${MAX_WIDTH_FT} × ${MAX_HEIGHT_FT} ft (${MAX_WIDTH_IN}" × ${MAX_HEIGHT_IN}").`,
      );
      return;
    }
    const areaSqFt = (wIn * hIn) / 144;
    const price = Math.round(areaSqFt * RATE_PER_SQFT);
    const sizeLabel =
      unit === "ft"
        ? `${w} × ${h} ft`
        : `${w}" × ${h}" (${(wIn / 12).toFixed(2)} × ${(hIn / 12).toFixed(2)} ft)`;
    setQuote({
      size: sizeLabel,
      area: areaSqFt.toFixed(2),
      rate: RATE_PER_SQFT,
      price: `₹${price.toLocaleString("en-IN")}`,
      priceRaw: price,
    });
  };

  const whatsappText = useMemo(() => {
    if (!quote) return "";
    return `Hi Swashine, Custom Glowbox quote:\nSize: ${quote.size}\nArea: ${quote.area} sq ft\nRate: ₹${quote.rate}/sq ft\nEstimated: ${quote.price}\nPlease confirm final price.`;
  }, [quote]);

  return (
    <div className="pt-28 pb-20 min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[420px] h-[420px] rounded-full bg-brand-500/12 blur-[110px]" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full bg-amber-400/8 blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span
            className={`inline-flex ${glass} px-4 py-1.5 rounded-full text-brand-400 text-sm font-semibold tracking-widest uppercase`}
          >
            Custom Orders
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-3">
            Custom Size Calculator
          </h1>
          <p className="text-zinc-400">
            Rate:{" "}
            <span className="text-white font-medium">
              ₹{RATE_PER_SQFT} per sq ft
            </span>
            {" · "}Max size:{" "}
            <span className="text-white font-medium">
              {MAX_WIDTH_FT} × {MAX_HEIGHT_FT} ft
            </span>
          </p>
        </motion.div>

        <div className={`${glassCard} p-8 md:p-10`}>
          <div className="flex gap-2 mb-6">
            {["inch", "ft"].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => {
                  setUnit(u);
                  setQuote(null);
                  setError("");
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  unit === u
                    ? "bg-brand-500 text-black"
                    : `${glass} text-zinc-300`
                }`}
              >
                {u === "inch" ? "Inches" : "Feet"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <Input
              label={`Width (${unit === "inch" ? "inches" : "ft"})`}
              type="number"
              min={1}
              step={unit === "ft" ? 0.1 : 1}
              value={width}
              onChange={(e) => {
                setWidth(+e.target.value || 0);
                setQuote(null);
                setError("");
              }}
            />
            <Input
              label={`Height (${unit === "inch" ? "inches" : "ft"})`}
              type="number"
              min={1}
              step={unit === "ft" ? 0.1 : 1}
              value={height}
              onChange={(e) => {
                setHeight(+e.target.value || 0);
                setQuote(null);
                setError("");
              }}
            />
          </div>

          <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
            Maximum customised size: {MAX_WIDTH_FT} × {MAX_HEIGHT_FT} ft. Price
            = area (sq ft) × ₹{RATE_PER_SQFT}. Print, shipping and GST are
            extra.
          </p>

          <Button onClick={calculate} className="w-full text-lg py-4">
            Calculate Price
          </Button>

          {error && (
            <div className="mt-6 rounded-2xl bg-red-500/15 border border-red-500/40 backdrop-blur-md text-red-400 px-5 py-4 text-sm">
              {error}
            </div>
          )}

          {quote && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-2xl bg-green-500/10 border border-green-500/30 backdrop-blur-md p-8 text-center"
            >
              <div className="text-brand-400 text-sm mb-1">ESTIMATED PRICE</div>
              <div className="text-xl font-medium text-zinc-300 mb-1">
                {quote.size}
              </div>
              <div className="text-sm text-zinc-500 mb-3">
                {quote.area} sq ft × ₹{quote.rate}/sq ft
              </div>
              <div className="text-5xl font-bold mb-4">{quote.price}</div>
              <p className="text-sm text-zinc-400 mb-6">
                Approximate quote for frame. Print, shipping & GST extra.
                Confirm final price on WhatsApp.
              </p>
              <Button
                variant="whatsapp"
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
                className="w-full"
              >
                Confirm on WhatsApp →
              </Button>
            </motion.div>
          )}
        </div>

        {/* Artwork guidelines */}
        {artworkGuidelines?.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Artwork guidelines
            </h2>
            <p className="text-sm text-zinc-500 text-center mb-8">
              Send print-ready files with your order for best results.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {artworkGuidelines.map((g) => (
                <div key={g.title} className={`${glassCard} p-5`}>
                  <h3 className="font-semibold text-brand-400 text-sm mb-1">
                    {g.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
