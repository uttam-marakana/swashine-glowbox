export default function Pagination({
  page,
  pageCount,
  from,
  to,
  total,
  onPage,
}) {
  if (total <= 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-6 text-sm text-zinc-400">
      <span>
        {from}–{to} of {total}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="rounded-lg border border-white/10 px-3 py-1.5 disabled:opacity-40 hover:bg-white/5"
        >
          Prev
        </button>
        <span className="text-zinc-300">
          {page} / {pageCount}
        </span>
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPage(page + 1)}
          className="rounded-lg border border-white/10 px-3 py-1.5 disabled:opacity-40 hover:bg-white/5"
        >
          Next
        </button>
      </div>
    </div>
  );
}
