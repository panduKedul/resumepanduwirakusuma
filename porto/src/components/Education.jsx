import profile from "../data/profile.json";
import Timeline from "./Timeline";

export default function Education() {
  const items = profile.education.map((e) => ({
    period: `${e.level} • ${e.period} • GPA ${e.gpa}`,
    role: `${e.major}`,
    org: e.school,
    desc: e.notes,
  }));
  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">02 — Education</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Education</h2>
        <div className="mt-8">
          <Timeline items={items} />
        </div>
      </div>
    </section>
  );
}
