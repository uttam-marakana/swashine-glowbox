import { useEffect, useMemo, useState } from "react";
import { getFaqsAdmin, saveFaqs } from "@/services/contentService";
import { filterByQuery } from "@/utils/adminSearch";
import { Plus, Trash2, Save } from "lucide-react";

export default function FaqsAdmin() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("");
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getFaqsAdmin().then((res) => {
      setItems(
        (res.items || []).map((f, i) => ({
          ...f,
          _key: f._key || `faq-${i}`,
        })),
      );
      setSource(res.source);
    });
  }, []);

  const filtered = useMemo(
    () => filterByQuery(items, q, ["q", "a"]),
    [items, q],
  );

  const addRow = () => {
    setItems((prev) => [...prev, { _key: `faq-${Date.now()}`, q: "", a: "" }]);
  };

  const updateByKey = (key, field, value) => {
    setItems((prev) =>
      prev.map((row) => (row._key === key ? { ...row, [field]: value } : row)),
    );
  };

  const remove = (key) =>
    setItems((prev) => prev.filter((r) => r._key !== key));

  const onSave = async () => {
    setBusy(true);
    setMsg("");
    try {
      const cleaned = items
        .map(({ q, a }) => ({
          q: String(q || "").trim(),
          a: String(a || "").trim(),
        }))
        .filter((f) => f.q && f.a);
      await saveFaqs(cleaned);
      setSource("firestore");
      setMsg("FAQs saved");
    } catch (e) {
      setMsg(e.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">FAQs</h1>
          <p className="text-xs text-zinc-500 mt-1">Source: {source}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm"
          >
            <Plus size={16} /> Add FAQ
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 text-black font-semibold px-4 py-2 text-sm disabled:opacity-60"
          >
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search questions & answers…"
        className="w-full max-w-md rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400/40"
      />

      {msg && <p className="text-sm text-brand-400">{msg}</p>}

      <div className="space-y-4">
        {filtered.map((row) => (
          <div
            key={row._key}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3"
          >
            <div className="flex justify-between gap-2">
              <span className="text-xs text-zinc-500">Question</span>
              <button
                type="button"
                onClick={() => remove(row._key)}
                className="text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <input
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
              value={row.q}
              onChange={(e) => updateByKey(row._key, "q", e.target.value)}
            />
            <span className="text-xs text-zinc-500">Answer</span>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
              value={row.a}
              onChange={(e) => updateByKey(row._key, "a", e.target.value)}
            />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-zinc-500 text-sm">No matching FAQs.</p>
        )}
      </div>
    </div>
  );
}
