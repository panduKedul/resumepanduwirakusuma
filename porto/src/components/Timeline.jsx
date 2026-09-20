export default function Timeline({ items }) {
  return (
    <ol className="relative border-l border-white/10 ml-2 space-y-6">
      {items.map((it, i) => (
        <li key={i} className="ml-4">
          <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-amber-300" />
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">{it.period}</p>
          <h4 className="font-semibold tracking-tight">{it.role ? `${it.role} — ` : ""}{it.org || it.school}</h4>
          {it.desc || it.notes ? (
            <p className="text-sm text-zinc-300 mt-1">{it.desc || it.notes}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
