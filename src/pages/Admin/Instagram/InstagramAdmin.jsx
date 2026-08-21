import { useEffect, useMemo, useState } from "react";
import {
  getInstagramFeedAdmin,
  saveInstagramFeed,
} from "@/services/contentService";
import { filterByQuery } from "@/utils/adminSearch";
import { Plus, Trash2, Save } from "lucide-react";

export default function InstagramAdmin() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("");
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getInstagramFeedAdmin().then((res) => {
      setItems(res.items || []);
      setSource(res.source);
    });
  }, []);

  const filtered = useMemo(
    () => filterByQuery(items, q, ["id", "url"]),
    [items, q],
  );

  const addRow = () => {
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), url: "https://www.instagram.com/reel/" },
    ]);
  };

  const updateRow = (index, key, value) => {
    setItems((prev) => {
      const next = [...prev];
      // map through filtered index carefully — edit by id
      const id = filtered[index]?.id;
      return prev.map((row) =>
        row.id === id ? { ...row, [key]: value } : row,
      );
    });
  };

  const removeRow = (id) => {
    setItems((prev) => prev.filter((r) => r.id !== id));
  };

  const onSave = async () => {
    setBusy(true);
    setMsg("");
    try {
      const cleaned = items
        .map((r) => ({
          id: String(r.id || Date.now()),
          url: String(r.url || "").trim(),
        }))
        .filter((r) => r.url.includes("instagram.com"));
      await saveInstagramFeed(cleaned);
      setItems(cleaned);
      setSource("firestore");
      setMsg("Instagram feed saved");
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
          <h1 className="text-2xl font-bold">Instagram feed</h1>
          <p className="text-xs text-zinc-500 mt-1">Source: {source}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm"
          >
            <Plus size={16} /> Add URL
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
        placeholder="Filter URLs in real time…"
        className="w-full max-w-md rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-brand-400/40"
      />

      {msg && <p className="text-sm text-brand-400">{msg}</p>}

      <div className="space-y-3">
        {filtered.map((row, index) => (
          <div
            key={row.id}
            className="flex flex-col sm:flex-row gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <input
              className="sm:w-28 rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
              value={row.id}
              onChange={(e) => updateRow(index, "id", e.target.value)}
              placeholder="id"
            />
            <input
              className="flex-1 rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm"
              value={row.url}
              onChange={(e) => updateRow(index, "url", e.target.value)}
              placeholder="https://www.instagram.com/reel/… or /p/…"
            />
            <button
              type="button"
              onClick={() => removeRow(row.id)}
              className="text-red-400 p-2 hover:bg-red-500/10 rounded-xl"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-zinc-500 text-sm">No matching URLs.</p>
        )}
      </div>
    </div>
  );
}
