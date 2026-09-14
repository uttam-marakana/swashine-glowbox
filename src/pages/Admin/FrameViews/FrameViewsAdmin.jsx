import { useEffect, useState } from "react";
import { getFrameViewsAdmin, saveFrameViews } from "@/services/contentService";
import { uploadProductImage } from "@/services/storageService";

const KEYS = [
  { key: "front", label: "Front" },
  { key: "back", label: "Back" },
  { key: "top", label: "Top (insert slot)" },
  { key: "bottom", label: "Bottom" },
];

const field =
  "w-full rounded-xl bg-zinc-900/80 border border-zinc-700 px-3.5 py-2.5 text-sm outline-none focus:border-brand-400/50";

export default function FrameViewsAdmin() {
  const [form, setForm] = useState({
    front: "",
    back: "",
    top: "",
    bottom: "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getFrameViewsAdmin().then((d) => {
      setForm({
        front: d.front || "",
        back: d.back || "",
        top: d.top || "",
        bottom: d.bottom || "",
      });
    });
  }, []);

  const setKey = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const onUpload = async (key, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg("");
    try {
      const { url } = await uploadProductImage(`global-frame-${key}`, file);
      setKey(key, url);
      setMsg(`${key} uploaded — click Save to publish`);
    } catch (err) {
      setMsg(err.message || "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      await saveFrameViews(form);
      setMsg(
        "Saved. These images appear on every product’s Frame design section.",
      );
    } catch (err) {
      setMsg(err.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Frame design images</h1>
      <p className="text-sm text-zinc-500 mb-6">
        Global Front / Back / Top / Bottom — shared by all products (not
        per-product).
      </p>

      <form onSubmit={onSave} className="space-y-6">
        {KEYS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3"
          >
            <div className="text-sm font-semibold text-brand-400">{label}</div>
            <input
              className={field}
              value={form[key] || ""}
              onChange={(e) => setKey(key, e.target.value)}
              placeholder="https://… or upload"
            />
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-xs font-semibold text-brand-400 cursor-pointer px-3 py-2 rounded-lg border border-brand-400/30">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={busy}
                  onChange={(e) => onUpload(key, e)}
                />
              </label>
              {form[key] ? (
                <img
                  src={form[key]}
                  alt={label}
                  className="h-20 object-contain rounded-lg border border-white/10 bg-black/40"
                />
              ) : null}
            </div>
          </div>
        ))}

        {msg && (
          <p className="text-sm text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-xl px-4 py-3">
            {msg}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-brand-500 text-black font-semibold px-8 py-3 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save frame images"}
        </button>
      </form>
    </div>
  );
}
