export function filterByQuery(items, query, fields) {
  const q = String(query || "")
    .trim()
    .toLowerCase();
  if (!q) return items;
  return items.filter((item) =>
    fields.some((field) => {
      const val = item[field];
      if (val == null) return false;
      if (Array.isArray(val)) return val.join(" ").toLowerCase().includes(q);
      return String(val).toLowerCase().includes(q);
    }),
  );
}
