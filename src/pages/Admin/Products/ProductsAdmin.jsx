import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  listProductsAdmin,
  deleteProduct,
  seedProductsFromCompany,
} from "@/services/productService";
import { filterByQuery } from "@/utils/adminSearch";
import { Search } from "lucide-react";

export default function ProductsAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    setRows(await listProductsAdmin());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      filterByQuery(rows, q, [
        "name",
        "slug",
        "category",
        "size",
        "sizeKey",
        "priceLabel",
        "badge",
        "type",
        "description",
      ]),
    [rows, q],
  );

  const remove = async (p) => {
    if (!p.firestoreId) {
      alert("This item comes from data/company.js. Delete it in that file.");
      return;
    }
    if (!confirm("Delete this product from Firestore?")) return;
    await deleteProduct(p.firestoreId);
    load();
  };

  const seed = async () => {
    try {
      const res = await seedProductsFromCompany();
      setMsg(res.message);
      load();
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={seed}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5"
          >
            Seed from company.js
          </button>
          <Link
            to="/admin/products/new"
            className="rounded-xl bg-brand-500 text-black font-semibold px-4 py-2 text-sm"
          >
            Add product
          </Link>
        </div>
      </div>

      {/* Real-time search */}
      <div className="relative max-w-md mb-5">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name, size, category, price…"
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-400/40"
        />
      </div>

      {!loading && (
        <p className="text-xs text-zinc-500 mb-3">
          Showing {filtered.length} of {rows.length} products
          {q.trim() ? ` for “${q.trim()}”` : ""}
        </p>
      )}

      {msg && <p className="text-sm text-brand-400 mb-4">{msg}</p>}

      {loading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-zinc-500">No products found.</p>
      ) : filtered.length === 0 ? (
        <p className="text-zinc-500">No products match your search.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div
              key={p.firestoreId || p.slug || p.id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="w-16 h-16 rounded-xl bg-black/40 overflow-hidden shrink-0">
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    💡
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{p.name}</div>
                <div className="text-xs text-zinc-500">
                  {p.size} · {p.priceLabel}
                  <span className="ml-2 text-zinc-600">
                    ({p.source || "company.js"})
                  </span>
                </div>
              </div>
              <Link
                to={`/admin/products/${p.firestoreId || p.slug}`}
                className="text-brand-400 text-sm hover:underline"
              >
                {p.firestoreId ? "Edit" : "View"}
              </Link>
              <button
                type="button"
                onClick={() => remove(p)}
                className="text-red-400 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
