import profile from "../data/profile.json";
import DotCanvas from "./DotCanvas";
import heroPhoto from "../assets/photo-hero.webp";

export default function Hero() {
  const h = profile.hero;
  return (
    <header className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <DotCanvas />
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-32 w-full flex flex-col md:flex-row items-center gap-10">
        <img
          src={heroPhoto}
          alt="Muhammad Pandu Wirakusuma"
          className="w-56 md:w-72 shrink-0 object-cover order-first md:order-last"
        />
        <div className="flex-1">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300">
          ● Portfolio — 2026
        </p>
        <h1
          className="font-display font-bold tracking-tight mt-4"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
        >
          {h.name}
        </h1>
        <p className="mt-4 font-mono text-xs md:text-sm uppercase tracking-widest text-zinc-400">
          {h.roles.join("  /  ")}
        </p>
        <p className="mt-6 text-zinc-300 max-w-2xl text-lg leading-relaxed">
          {h.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black font-semibold text-sm hover:bg-amber-300 transition-colors"
          >
            View Projects ↓
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-white/20 text-sm text-zinc-100 hover:border-amber-300 hover:text-amber-300 transition-colors"
          >
            Contact Me
          </a>
          <a
            href="/CV-Muhammad-Pandu-Wirakusuma.pdf"
            download="CV-Muhammad-Pandu-Wirakusuma.pdf"
            className="px-6 py-3 bg-amber-300 text-black font-semibold text-sm hover:bg-amber-200 transition-colors"
          >
            Download CV ↓
          </a>
        </div>
        <p className="mt-6 text-sm text-zinc-500 font-mono">
          {h.phone} •{" "}
          {h.emails
            .map((e) => (h.emailLabels?.[e] ? `${e} (${h.emailLabels[e]})` : e))
            .join(" / ")}
        </p>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-amber-300 to-transparent animate-pulse" />
      </div>
    </header>
  );
}
