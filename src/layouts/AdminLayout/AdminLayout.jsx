import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  LogOut,
  Search,
  Instagram,
  HelpCircle,
  FileText,
} from "lucide-react";
import { products as staticProducts } from "@/data/company";

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
    isActive
      ? "bg-brand-500/15 text-brand-400 border border-brand-500/30"
      : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
  }`;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];

    const pages = [
      { type: "Page", title: "Dashboard", path: "/admin" },
      { type: "Page", title: "Inquiries", path: "/admin/inquiries" },
      { type: "Page", title: "Products", path: "/admin/products" },
      { type: "Page", title: "Add product", path: "/admin/products/new" },
      { type: "Page", title: "Instagram feed", path: "/admin/instagram" },
      { type: "Page", title: "FAQs", path: "/admin/faqs" },
      { type: "Page", title: "Catalogs", path: "/admin/catalogs" },
    ].filter((p) => p.title.toLowerCase().includes(term));

    const prods = (staticProducts || [])
      .filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.slug?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.size?.toLowerCase().includes(term),
      )
      .slice(0, 8)
      .map((p) => ({
        type: "Product",
        title: p.name,
        subtitle: p.size,
        path: `/admin/products/${p.slug}`,
      }));

    return [...pages, ...prods].slice(0, 12);
  }, [q]);

  const onLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const go = (path) => {
    setQ("");
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <aside className="w-60 shrink-0 border-r border-white/10 p-4 flex flex-col gap-2">
        <div className="px-2 py-3 mb-2">
          <div className="font-bold text-brand-400">Swashine Admin</div>
          <div className="text-xs text-zinc-500 truncate mt-1">
            {user?.email}
          </div>
        </div>
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/admin/inquiries" className={linkClass}>
          <MessageSquare size={18} /> Inquiries
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          <Package size={18} /> Products
        </NavLink>
        <NavLink to="/admin/instagram" className={linkClass}>
          <Instagram size={18} /> Instagram
        </NavLink>
        <NavLink to="/admin/faqs" className={linkClass}>
          <HelpCircle size={18} /> FAQs
        </NavLink>
        <NavLink to="/admin/catalogs" className={linkClass}>
          <FileText size={18} /> Catalogs
        </NavLink>
        <button
          type="button"
          onClick={onLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:bg-white/5 hover:text-red-400"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Global search */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl px-4 md:px-8 py-3">
          <div className="relative max-w-xl">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Search pages, products, sizes…"
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-400/40"
            />
            {open && results.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden z-30">
                {results.map((r) => (
                  <button
                    key={r.path + r.title}
                    type="button"
                    onMouseDown={() => go(r.path)}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {r.title}
                      </div>
                      {r.subtitle && (
                        <div className="text-xs text-zinc-500">
                          {r.subtitle}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 shrink-0">
                      {r.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 min-w-0 p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
