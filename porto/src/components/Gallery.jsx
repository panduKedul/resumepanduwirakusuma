import { useState } from "react";
import profile from "../data/profile.json";

const PLACEHOLDERS = (profile.projects || []).slice(0, 6).map((p, i) => ({
  title: p.title,
  caption: `${p.year} — ${p.role}`,
  label: `Screenshot ${i + 1}`,
}));

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">07 — Gallery</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Gallery</h2>
        <p className="text-sm text-zinc-500 mt-3">
          Replace with real screenshots — placeholder grid, click for lightbox.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {PLACEHOLDERS.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setSelected(g)}
              className="dot-card bg-white/[0.02] border border-white/10 aspect-video flex flex-col items-center justify-center gap-1 hover:border-amber-300/50"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300">{g.label}</span>
              <span className="text-sm font-medium text-zinc-200 line-clamp-2 px-3">{g.title}</span>
            </button>
          ))}
        </div>
        {selected && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center p-4 z-50"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-black border border-white/10 max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4">
                <span className="text-sm text-zinc-400">{selected.label} — replace with real screenshot</span>
              </div>
              <h3 className="font-semibold mb-1 tracking-tight">{selected.title}</h3>
              <p className="font-mono text-xs text-zinc-500 mb-4">{selected.caption}</p>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-1.5 bg-white text-black text-sm font-medium hover:bg-amber-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
