export default function Modal({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-lg max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-zinc-400 mb-2">
          {item.year}{item.role ? ` — ${item.role}` : ""}
        </p>
        <p className="text-sm text-zinc-200 mb-4">{item.desc}</p>
        <button
          onClick={onClose}
          className="px-3 py-1 rounded bg-amber-400 text-zinc-950 text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
