import profile from "../data/profile.json";
import Badge from "./Badge";
import aboutPhoto from "../assets/photo-about.jpg";

export default function About() {
  return (
    <section className="bg-black">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">01 — About</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">About</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start mt-6">
          <img
            src={aboutPhoto}
            alt="Muhammad Pandu Wirakusuma"
            className="w-full md:w-72 shrink-0 object-cover border border-white/15"
          />
          <div className="flex-1">
            <p className="text-zinc-300 leading-relaxed max-w-3xl text-lg">{profile.about}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.keywords.map((k) => (
                <Badge key={k}>{k}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
