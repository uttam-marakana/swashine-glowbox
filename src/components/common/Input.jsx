export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm text-zinc-400">{label}</label>}
      <input
        className={`w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-500 transition ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
