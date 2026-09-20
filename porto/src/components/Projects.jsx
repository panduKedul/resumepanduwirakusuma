import { useMemo, useState } from "react";
import profile from "../data/profile.json";
import FilterBar from "./FilterBar";
import Modal from "./Modal";
import Badge from "./Badge";
import { filterBy } from "./filter";

const YEARS = ["2021", "2022", "2023", "2024", "2025"];

export default function Projects() {
  const [year, setYear] = useState("all");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);

  const categories = useMemo(
    () => [...new Set(profile.projects.flatMap((p) => p.tags || []))].sort(),
    []
  );

  const filtered = useMemo(
    () => filterBy(profile.projects, year, category),
    [year, category]
  );

  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">05 — Projects</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Projects</h2>
        <div className="mt-6">
          <FilterBar
            years={YEARS}
            categories={categories}
            year={year}
            category={category}
            onYear={setYear}
            onCategory={setCategory}
          />
        </div>
        <p className="text-sm text-zinc-500 mt-3 font-mono">
          {filtered.length} of {profile.projects.length} projects
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {filtered.map((p) => (
            <article
              key={p.title}
              className="dot-card bg-white/[0.02] border border-white/10 p-5 flex flex-col gap-2 hover:border-amber-300/50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-zinc-500">{p.year}</span>
                <span className="font-mono text-xs text-zinc-500">{p.role}</span>
              </div>
              <h3 className="font-semibold leading-snug tracking-tight text-lg">{p.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {(p.tags || []).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <p className="text-sm text-zinc-400 line-clamp-2">{p.desc}</p>
              <button
                onClick={() => setSelected(p)}
                className="mt-auto self-start px-4 py-1.5 bg-white text-black text-sm font-medium hover:bg-amber-300 transition-colors"
              >
                Details →
              </button>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-zinc-500 mt-4">No projects match the filter.</p>
        )}
        <Modal item={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
