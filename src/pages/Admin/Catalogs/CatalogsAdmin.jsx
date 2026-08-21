import { useEffect, useMemo, useState } from "react";
import { getCatalogsAdmin, saveCatalogs } from "@/services/contentService";
import { filterByQuery } from "@/utils/adminSearch";
import { Plus, Trash2, Save } from "lucide-react";

export default function CatalogsAdmin() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("");
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getCatalogsAdmin().then((res) => {
      setItems(res.items || []);
      setSource(res.source);
    });
  }, []);

  const filtered = useMemo(
    () =>
      filterByQuery(items, q, [
        "title",
        "description",
        "pages",
        "type",
        "whatsappNote",
      ]),
    [items, q],
  );

  const addRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "New catalogue",
        description: "",
        pages: "1 page",
        type: "PDF",
        file: null,
        whatsappNote: "Please send me the catalogue",
      },
    ]);
  };

  const updateById = (id, field, value) => {
    setItems((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const remove = (id) => setItems((prev) => prev.filter((r) => r.id !== id));

  const onSave = async () => {
    setBusy(true);
    setMsg("");
    try {
      const cleaned = items.map((c, i) => ({
        id: c.id || i + 1,
        title: String(c.title || "").trim(),
        description: String(c.description || "").trim(),
        pages: c.pages || "",
        type: c.type || "PDF",
        file: c.file || null,
        whatsappNote: c.whatsappNote || "",
      }));
      await saveCatalogs(cleaned);
      setSource("firestore");
      setMsg("Catalogs saved");
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
          <h1 className="text-2xl font-bold">Catalogs</h1>
          <p className="text-xs text-zinc-500 mt-1">Source: {source}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm"
          >
            <Plus size={16} /> Add catalog
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
        placeholder="Search catalogs…"
        className="w-full max-w-md rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400/40"
      />

      {msg && <p className="text-sm text-brand-400">{msg}</p>}

      <div className="space-y-4">
        {filtered.map((row) => (
          <div
            key={row.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 grid sm:grid-cols-2 gap-3"
          >
            <input
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm sm:col-span-2"
              value={row.title}
              onChange={(e) => updateById(row.id, "title", e.target.value)}
              placeholder="Title"
            />
            <textarea
              rows={2}
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm sm:col-span-2"
              value={row.description}
              onChange={(e) =>
                updateById(row.id, "description", e.target.value)
              }
              placeholder="Description"
            />
            <input
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
              value={row.pages}
              onChange={(e) => updateById(row.id, "pages", e.target.value)}
              placeholder="Pages"
            />
            <input
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
              value={row.type}
              onChange={(e) => updateById(row.id, "type", e.target.value)}
              placeholder="Type (PDF)"
            />
            <input
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm sm:col-span-2"
              value={row.whatsappNote || ""}
              onChange={(e) =>
                updateById(row.id, "whatsappNote", e.target.value)
              }
              placeholder="WhatsApp note"
            />
            <button
              type="button"
              onClick={() => remove(row.id)}
              className="text-red-400 text-sm inline-flex items-center gap-1"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-zinc-500 text-sm">No matching catalogs.</p>
        )}
      </div>
    </div>
  );
}
