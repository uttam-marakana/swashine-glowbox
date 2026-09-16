import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductAdmin,
  updateProduct,
  upsertProduct,
} from "@/services/productService";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

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
  type: "wall",
  note: "",
};

const field =
  "mt-1.5 w-full rounded-xl bg-zinc-900/80 border border-zinc-700 px-3.5 py-2.5 text-sm outline-none focus:border-brand-400/50 transition";
const labelCls =
  "block text-xs font-medium text-zinc-400 uppercase tracking-wider";

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
      });
      setFeaturesText((p.features || []).join("\n"));
    });
  }, [id, isNew]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

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
      firestoreId: form.firestoreId || null,
    };

    try {
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

  const previewImages =
    form.gallery?.length > 0 ? form.gallery : form.image ? [form.image] : [];

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
            Product images (local)
          </h2>
          <p className="text-xs text-zinc-500">
            Photos come from the project folder via{" "}
            <code className="text-zinc-400">company.js</code> for slug{" "}
            <span className="text-brand-400">{form.slug || "—"}</span>. They are
            not uploaded or saved to Firebase. Change files under{" "}
            <code className="text-zinc-400">src/assets/images/products/</code>{" "}
            and keep the same slug.
          </p>

          {previewImages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-700 py-12 text-center text-zinc-500">
              <ImageIcon className="mx-auto mb-2 opacity-40" size={32} />
              No local images for this slug. Add them in company.js / assets.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {previewImages.map((url) => (
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
                  {form.image === url && (
                    <span className="absolute bottom-1 left-1 right-1 text-center text-[10px] py-0.5 rounded bg-brand-500/90 text-black font-semibold">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
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
