import { useMemo, useState } from "react";
import profile from "../data/profile.json";
import Modal from "./Modal";
import Badge from "./Badge";

export default function Research() {
  const [selected, setSelected] = useState(null);

  const items = useMemo(() => profile.research, []);

  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">06 — Research</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Research</h2>
        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          {items.map((r) => (
            <article
              key={r.title}
              className="dot-card bg-white/[0.02] border border-white/10 p-5 flex flex-col gap-2 hover:border-amber-300/50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-zinc-500">{r.year}</span>
              </div>
              <h3 className="font-semibold leading-snug tracking-tight text-lg">{r.title}</h3>
              <p className="font-mono text-xs text-zinc-500 uppercase">
                {r.role}
                {r.event ? ` — ${r.event}` : ""}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(r.models || []).map((m) => (
                  <Badge key={m}>{m}</Badge>
                ))}
              </div>
              <p className="text-sm text-zinc-400 line-clamp-2">{r.desc}</p>
              <button
                onClick={() => setSelected(r)}
                className="mt-auto self-start px-4 py-1.5 bg-white text-black text-sm font-medium hover:bg-amber-300 transition-colors"
              >
                Details →
              </button>
            </article>
          ))}
        </div>
        <Modal item={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
