import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductAdmin,
  updateProduct,
  upsertProduct,
} from "@/services/productService";
import { uploadProductImage } from "@/services/storageService";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";

const glass = "bg-white/[0.04] border border-white/10 rounded-2xl";

const empty = {
  id: 1,
  slug: "",
  name: "",
  category: "Standard",
  size: "",
  sizeKey: "18x24",
  priceRange: "mid",
  priceLabel: "",
  description: "",
  features: [],
  includes: "",
  badge: "",
  image: "",
  gallery: [],
  frameViews: { front: "", back: "", top: "", bottom: "" },
  type: "wall",
  note: "",
};

const field =
  "mt-1.5 w-full rounded-xl bg-zinc-900/80 border border-zinc-700 px-3.5 py-2.5 text-sm outline-none focus:border-brand-400/50 transition";
const labelCls =
  "block text-xs font-medium text-zinc-400 uppercase tracking-wider";

const FRAME_KEYS = [
  { key: "front", label: "Front" },
  { key: "back", label: "Back" },
  { key: "top", label: "Top (insert)" },
  { key: "bottom", label: "Bottom" },
];

export default function ProductEdit() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [featuresText, setFeaturesText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (isNew) return;
    getProductAdmin(id).then((p) => {
      if (!p) return;
      setForm({
        ...empty,
        ...p,
        gallery: p.gallery || [],
        frameViews: {
          front: p.frameViews?.front || "",
          back: p.frameViews?.back || "",
          top: p.frameViews?.top || "",
          bottom: p.frameViews?.bottom || "",
        },
      });
      setFeaturesText((p.features || []).join("\n"));
    });
  }, [id, isNew]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const setFrameView = (key, value) =>
    setForm((f) => ({
      ...f,
      frameViews: { ...(f.frameViews || {}), [key]: value },
    }));

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg("");
    try {
      const key = form.slug || form.id || "temp";
      const { url } = await uploadProductImage(String(key), file);
      setForm((f) => ({
        ...f,
        image: f.image || url,
        gallery: [...(f.gallery || []), url],
      }));
      setMsg("Gallery image uploaded");
    } catch (err) {
      setMsg(err.message || "Upload failed — check Firebase Storage");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  const onUploadFrame = async (frameKey, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg("");
    try {
      const key = `${form.slug || form.id || "temp"}-frame-${frameKey}`;
      const { url } = await uploadProductImage(String(key), file);
      setFrameView(frameKey, url);
      setMsg(`${frameKey} frame image uploaded`);
    } catch (err) {
      setMsg(err.message || "Frame upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  const removeGalleryImage = (url) => {
    setForm((f) => {
      const gallery = (f.gallery || []).filter((u) => u !== url);
      return {
        ...f,
        gallery,
        image: f.image === url ? gallery[0] || "" : f.image,
      };
    });
  };

  const setPrimary = (url) => setForm((f) => ({ ...f, image: url }));

  const onSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");

    const payload = {
      ...form,
      id: Number(form.id) || 1,
      badge: form.badge || null,
      features: featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      frameViews: {
        front: form.frameViews?.front || "",
        back: form.frameViews?.back || "",
        top: form.frameViews?.top || "",
        bottom: form.frameViews?.bottom || "",
      },
      firestoreId: form.firestoreId || null,
    };

    try {
      // Prefer upsert if available
      if (typeof upsertProduct === "function") {
        const newId = await upsertProduct(payload);
        setMsg("Saved successfully");
        setForm((f) => ({
          ...f,
          firestoreId: newId,
          source: "firestore",
        }));
        if (isNew || id !== newId) {
          navigate(`/admin/products/${newId}`, { replace: true });
        }
      } else if (isNew) {
        const newId = await createProduct(payload);
        navigate(`/admin/products/${newId}`);
      } else if (form.firestoreId) {
        const { firestoreId, source, ...data } = payload;
        await updateProduct(form.firestoreId, data);
        setMsg("Saved successfully");
      } else {
        setMsg(
          "This product is from company.js. Seed to Firestore first, or ensure upsertProduct is exported.",
        );
      }
    } catch (err) {
      setMsg(err.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-400"
        >
          <ArrowLeft size={16} /> Products
        </Link>
        <h1 className="text-2xl font-bold">
          {isNew ? "Add product" : "Edit product"}
        </h1>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        <section className={`${glass} p-5 md:p-6 space-y-4`}>
          <h2 className="text-sm font-semibold text-brand-400 uppercase tracking-wider">
            Basic info
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={labelCls}>
              Name *
              <input
                required
                className={field}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label className={labelCls}>
              Slug *
              <input
                required
                className={field}
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="18x24-inch-led-glowbox"
              />
            </label>
            <label className={labelCls}>
              Category
              <input
                className={field}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              />
            </label>
            <label className={labelCls}>
              Badge
              <input
                className={field}
                value={form.badge || ""}
                onChange={(e) => set("badge", e.target.value)}
                placeholder="Popular / Battery / Custom"
              />
            </label>
            <label className={labelCls}>
              Numeric ID
              <input
                type="number"
                className={field}
                value={form.id}
                onChange={(e) => set("id", e.target.value)}
              />
            </label>
            <label className={labelCls}>
              Type
              <select
                className={field}
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
              >
                <option value="wall">wall</option>
                <option value="desktop">desktop</option>
                <option value="arch">arch</option>
                <option value="custom">custom</option>
              </select>
            </label>
          </div>
          <label className={labelCls}>
            Description
            <textarea
              rows={4}
              className={field}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </label>
        </section>

        <section className={`${glass} p-5 md:p-6 space-y-4`}>
          <h2 className="text-sm font-semibold text-brand-400 uppercase tracking-wider">
            Size & pricing
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={labelCls}>
              Size label
              <input
                className={field}
                value={form.size}
                onChange={(e) => set("size", e.target.value)}
                placeholder="18 × 24 inches"
              />
            </label>
            <label className={labelCls}>
              Size key (filter)
              <input
                className={field}
                value={form.sizeKey}
                onChange={(e) => set("sizeKey", e.target.value)}
                placeholder="18x24"
              />
            </label>
            <label className={labelCls}>
              Price label
              <input
                className={field}
                value={form.priceLabel}
                onChange={(e) => set("priceLabel", e.target.value)}
                placeholder="₹4,000 – ₹7,000"
              />
            </label>
            <label className={labelCls}>
              Price range
              <select
                className={field}
                value={form.priceRange}
                onChange={(e) => set("priceRange", e.target.value)}
              >
                <option value="low">low</option>
                <option value="mid">mid</option>
                <option value="high">high</option>
              </select>
            </label>
          </div>
        </section>

        <section className={`${glass} p-5 md:p-6 space-y-4`}>
          <h2 className="text-sm font-semibold text-brand-400 uppercase tracking-wider">
            Features & package
          </h2>
          <label className={labelCls}>
            Features (one per line)
            <textarea
              rows={5}
              className={field}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder={"Black aluminium frame\nTool-free poster change"}
            />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={labelCls}>
              Includes
              <input
                className={field}
                value={form.includes}
                onChange={(e) => set("includes", e.target.value)}
              />
            </label>
            <label className={labelCls}>
              Note
              <input
                className={field}
                value={form.note || ""}
                onChange={(e) => set("note", e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className={`${glass} p-5 md:p-6 space-y-4`}>
          <h2 className="text-sm font-semibold text-brand-400 uppercase tracking-wider">
            Gallery images
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-xl bg-brand-500 text-black font-semibold text-sm px-4 py-2.5 cursor-pointer">
              <Upload size={16} />
              Upload image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onUpload}
                disabled={busy}
              />
            </label>
            <span className="text-xs text-zinc-500">
              Used on product gallery · set primary below
            </span>
          </div>

          {(form.gallery || []).length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-700 py-12 text-center text-zinc-500">
              <ImageIcon className="mx-auto mb-2 opacity-40" size={32} />
              No gallery images yet
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(form.gallery || []).map((url) => (
                <div
                  key={url}
                  className={`relative rounded-xl border overflow-hidden bg-black/30 aspect-square ${
                    form.image === url ? "border-brand-400" : "border-white/10"
                  }`}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-contain p-1"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex gap-1 p-1 bg-black/70">
                    <button
                      type="button"
                      onClick={() => setPrimary(url)}
                      className="flex-1 text-[10px] py-1 rounded bg-white/10 hover:bg-brand-500/30"
                    >
                      {form.image === url ? "Primary" : "Set primary"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(url)}
                      className="px-2 text-[10px] py-1 rounded bg-red-500/20 text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={`${glass} p-5 md:p-6 space-y-4`}>
          <h2 className="text-sm font-semibold text-brand-400 uppercase tracking-wider">
            Frame views (Front / Back / Top / Bottom)
          </h2>
          <p className="text-xs text-zinc-500">
            Shown only on the product page Frame design section. Upload to
            Storage or paste an https URL.
          </p>
          {FRAME_KEYS.map(({ key, label }) => (
            <div
              key={key}
              className="space-y-2 border-b border-white/5 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase text-zinc-400 w-24 shrink-0">
                  {label}
                </span>
                <input
                  className={`${field} mt-0 flex-1 min-w-[12rem]`}
                  value={form.frameViews?.[key] || ""}
                  onChange={(e) => setFrameView(key, e.target.value)}
                  placeholder="https://… or upload →"
                />
                <label className="text-xs font-semibold text-brand-400 cursor-pointer px-3 py-2 rounded-lg border border-brand-400/30 hover:bg-brand-500/10 whitespace-nowrap">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={busy}
                    onChange={(e) => onUploadFrame(key, e)}
                  />
                </label>
              </div>
              {form.frameViews?.[key] ? (
                <img
                  src={form.frameViews[key]}
                  alt={label}
                  className="h-24 object-contain rounded-lg border border-white/10 bg-black/30"
                />
              ) : null}
            </div>
          ))}
        </section>

        {msg && (
          <p className="text-sm text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-xl px-4 py-3">
            {msg}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-brand-500 text-black font-semibold px-8 py-3 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save product"}
          </button>
          <Link
            to="/admin/products"
            className="rounded-xl border border-white/15 px-6 py-3 text-sm text-zinc-300 hover:bg-white/5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
