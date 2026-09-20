import profile from "../data/profile.json";

export default function Organizations() {
  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">04 — Organizations</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Organizations</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {profile.orgs.map((o) => (
            <div
              key={o.org}
              className="dot-card border border-white/10 bg-white/[0.02] p-5 hover:border-amber-300/50"
            >
              <h4 className="font-semibold tracking-tight">{o.org}</h4>
              <p className="font-mono text-xs text-amber-300 mt-1 uppercase tracking-wider">
                {o.role} • {o.period}
              </p>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
