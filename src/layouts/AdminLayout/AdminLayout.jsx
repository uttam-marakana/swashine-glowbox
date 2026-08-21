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
  Menu,
  X,
} from "lucide-react";
import { products as staticProducts } from "@/data/company";

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium transition whitespace-nowrap ${
    isActive
      ? "bg-brand-500/15 text-brand-400 border border-brand-500/30"
      : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
  }`;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    navigate(path);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* =========================================================
          DESKTOP SIDEBAR
          Visible from lg and above
      ========================================================== */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-60 xl:w-64 shrink-0 border-r border-white/10 bg-zinc-950 p-4 flex-col gap-2">
        <div className="px-2 py-3 mb-2">
          <div className="font-bold text-brand-400">Swashine Admin</div>

          <div className="text-xs text-zinc-500 truncate mt-1">
            {user?.email}
          </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/inquiries" className={linkClass}>
            <MessageSquare size={18} />
            Inquiries
          </NavLink>

          <NavLink to="/admin/products" className={linkClass}>
            <Package size={18} />
            Products
          </NavLink>

          <NavLink to="/admin/instagram" className={linkClass}>
            <Instagram size={18} />
            Instagram
          </NavLink>

          <NavLink to="/admin/faqs" className={linkClass}>
            <HelpCircle size={18} />
            FAQs
          </NavLink>

          <NavLink to="/admin/catalogs" className={linkClass}>
            <FileText size={18} />
            Catalogs
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={onLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:bg-white/5 hover:text-red-400 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* =========================================================
          MOBILE / TABLET TOP BAR
          Visible below lg
      ========================================================== */}
      <header className="lg:hidden sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur-xl">
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-bold text-brand-400 text-sm sm:text-base">
              Swashine Admin
            </div>

            <div className="text-[11px] sm:text-xs text-zinc-500 truncate max-w-[180px] sm:max-w-xs">
              {user?.email}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/10 transition"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 px-3 sm:px-5 py-3 bg-zinc-950">
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <NavLink
                to="/admin"
                end
                className={linkClass}
                onClick={closeMobileMenu}
              >
                <LayoutDashboard size={17} />
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/inquiries"
                className={linkClass}
                onClick={closeMobileMenu}
              >
                <MessageSquare size={17} />
                Inquiries
              </NavLink>

              <NavLink
                to="/admin/products"
                className={linkClass}
                onClick={closeMobileMenu}
              >
                <Package size={17} />
                Products
              </NavLink>

              <NavLink
                to="/admin/instagram"
                className={linkClass}
                onClick={closeMobileMenu}
              >
                <Instagram size={17} />
                Instagram
              </NavLink>

              <NavLink
                to="/admin/faqs"
                className={linkClass}
                onClick={closeMobileMenu}
              >
                <HelpCircle size={17} />
                FAQs
              </NavLink>

              <NavLink
                to="/admin/catalogs"
                className={linkClass}
                onClick={closeMobileMenu}
              >
                <FileText size={17} />
                Catalogs
              </NavLink>
            </nav>

            <button
              type="button"
              onClick={onLogout}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:bg-red-500/10 hover:text-red-400 border border-white/10 transition"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}
      <div className="lg:ml-60 xl:ml-64 min-w-0 min-h-screen flex flex-col">
        {/* Global Search */}
        <header className="sticky top-16 lg:top-0 z-30 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl px-4 sm:px-6 md:px-8 py-3">
          <div className="relative w-full max-w-xl">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
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
              className="w-full min-w-0 rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-400/40 transition placeholder:text-zinc-600"
            />

            {/* Search Results */}
            {open && results.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                {results.map((r) => (
                  <button
                    key={r.path + r.title}
                    type="button"
                    onMouseDown={() => go(r.path)}
                    className="w-full text-left px-3 sm:px-4 py-3 hover:bg-white/5 flex items-center justify-between gap-3 transition"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {r.title}
                      </div>

                      {r.subtitle && (
                        <div className="text-xs text-zinc-500 truncate mt-0.5">
                          {r.subtitle}
                        </div>
                      )}
                    </div>

                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 shrink-0">
                      {r.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 w-full p-4 sm:p-5 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
