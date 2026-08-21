import { useEffect, useMemo, useState } from "react";
import {
  listInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "@/services/inquiryService";
import { company } from "@/data/company";
import { filterByQuery } from "@/utils/adminSearch";
import { Search } from "lucide-react";

export default function Inquiries() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    setRows(await listInquiries());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      filterByQuery(rows, q, [
        "name",
        "phone",
        "email",
        "message",
        "source",
        "product",
        "status",
        "city",
        "business",
      ]),
    [rows, q],
  );

  const setStatus = async (id, status) => {
    await updateInquiryStatus(id, status);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    await deleteInquiry(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inquiries</h1>

      <div className="relative max-w-md mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, message, status…"
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-400/40"
        />
      </div>

      {!loading && rows.length > 0 && (
        <p className="text-xs text-zinc-500 mb-3">
          Showing {filtered.length} of {rows.length}
          {q.trim() ? ` for “${q.trim()}”` : ""}
        </p>
      )}

      {loading ? (
        <p className="text-zinc-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-zinc-500">No inquiries yet.</p>
      ) : filtered.length === 0 ? (
        <p className="text-zinc-500">No inquiries match your search.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.04] text-zinc-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/5">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://wa.me/${
                        String(r.phone || "").replace(/\D/g, "") ||
                        company.whatsapp
                      }`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-400 hover:underline"
                    >
                      {r.phone || "—"}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{r.source}</td>
                  <td className="px-4 py-3 max-w-xs truncate text-zinc-400">
                    {r.message || r.product || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status || "new"}
                      onChange={(e) => setStatus(r.id, e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1"
                    >
                      <option value="new">new</option>
                      <option value="read">read</option>
                      <option value="done">done</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="text-red-400 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
