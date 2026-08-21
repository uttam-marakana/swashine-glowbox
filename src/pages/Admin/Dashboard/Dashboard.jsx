import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Package,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { listInquiries } from "@/services/inquiryService";
import { listProductsAdmin } from "@/services/productService";
import { products as staticProducts, company } from "@/data/company";

const glass = "bg-white/[0.04] border border-white/10 rounded-2xl";

export default function Dashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [inq, prods] = await Promise.all([
        listInquiries(),
        listProductsAdmin(),
      ]);
      setInquiries(inq);
      setProducts(prods);
      setLoading(false);
    })();
  }, []);

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const productCount = products.length || staticProducts.length;
  const recent = inquiries.slice(0, 5);

  const widgets = [
    {
      label: "New inquiries",
      value: newCount,
      hint: "Needs reply",
      icon: AlertCircle,
      to: "/admin/inquiries",
      accent: "text-amber-400",
    },
    {
      label: "All inquiries",
      value: inquiries.length,
      hint: "Contact + dealers",
      icon: MessageSquare,
      to: "/admin/inquiries",
      accent: "text-brand-400",
    },
    {
      label: "Products",
      value: productCount,
      hint: "Catalog items",
      icon: Package,
      to: "/admin/products",
      accent: "text-emerald-400",
    },
    {
      label: "Static catalog",
      value: staticProducts.length,
      hint: "company.js",
      icon: Sparkles,
      to: "/admin/products",
      accent: "text-sky-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {company.name} · Admin overview
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {widgets.map((w) => {
          const Icon = w.icon;
          return (
            <Link
              key={w.label}
              to={w.to}
              className={`${glass} p-5 hover:border-brand-400/30 transition group`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">
                    {w.label}
                  </div>
                  <div className={`text-3xl font-bold mt-2 ${w.accent}`}>
                    {loading ? "—" : w.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{w.hint}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-brand-400">
                  <Icon size={18} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent inquiries */}
        <div className={`${glass} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent inquiries</h2>
            <Link
              to="/admin/inquiries"
              className="text-xs text-brand-400 hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <p className="text-sm text-zinc-500">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="text-sm text-zinc-500">No inquiries yet.</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-3 text-sm border-b border-white/5 pb-3 last:border-0"
                >
                  <div className="min-w-0">
                    <div className="font-medium truncate">{r.name || "—"}</div>
                    <div className="text-xs text-zinc-500 truncate">
                      {r.source} · {r.phone || r.email || "—"}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      r.status === "new"
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {r.status || "new"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className={`${glass} p-5`}>
          <h2 className="font-semibold mb-4">Quick actions</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              to="/admin/products/new"
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm hover:border-brand-400/40 transition"
            >
              + Add product
            </Link>
            <Link
              to="/admin/inquiries"
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm hover:border-brand-400/40 transition"
            >
              Review inquiries
            </Link>
            <Link
              to="/admin/products"
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm hover:border-brand-400/40 transition"
            >
              Manage catalog
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm hover:border-brand-400/40 transition"
            >
              Open website ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
