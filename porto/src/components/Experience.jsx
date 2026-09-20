import profile from "../data/profile.json";
import Timeline from "./Timeline";

export default function Experience() {
  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">03 — Experience</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Pengalaman Kerja</h2>
        <div className="mt-8">
          <Timeline items={profile.experience} />
        </div>
      </div>
    </section>
  );
}
