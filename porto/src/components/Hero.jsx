import profile from "../data/profile.json";
import DotCanvas from "./DotCanvas";
import heroPhoto from "../assets/photo-hero.webp";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const h = profile.hero;
  return (
    <header className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <DotCanvas />
      {/* Arfazrll-style ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[60rem] bg-amber-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-amber-300/10 blur-[100px] rounded-full" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-32 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="relative shrink-0 order-first md:order-last"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <div aria-hidden="true" className="absolute -inset-6 bg-amber-400/20 blur-3xl rounded-full" />
          <img
            src={heroPhoto}
            alt="Muhammad Pandu Wirakusuma"
            className="relative w-56 md:w-72 object-cover rounded-2xl border border-white/10 shadow-[0_20px_80px_-20px_rgba(252,211,77,0.45)]"
          />
          <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-zinc-900/90 border border-amber-300/30 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">Open to collaborate</p>
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300">
              ● Portfolio — 2026
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full border border-white/15 text-zinc-300">
              Lecturer · Tel-U Jakarta
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="font-display font-bold tracking-tight mt-4"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", lineHeight: 0.95 }}
          >
            {h.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-4 font-mono text-xs md:text-sm uppercase tracking-widest text-zinc-400"
          >
            {h.roles.join("  /  ")}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-6 text-zinc-300 max-w-2xl text-lg leading-relaxed"
          >
            {h.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-6 flex gap-6 font-mono"
          >
            <div>
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Projects</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Research</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">6</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Orgs</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="cursor-pointer px-6 py-3 bg-white text-black font-semibold text-sm hover:bg-amber-300 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-amber-300 focus-visible:outline-offset-2"
            >
              View Projects ↓
            </a>
            <a
              href="#contact"
              className="cursor-pointer px-6 py-3 border border-white/20 text-sm text-zinc-100 hover:border-amber-300 hover:text-amber-300 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-amber-300 focus-visible:outline-offset-2"
            >
              Contact Me
            </a>
            <a
              href="/CV-Muhammad-Pandu-Wirakusuma.pdf"
              download="CV-Muhammad-Pandu-Wirakusuma.pdf"
              className="cursor-pointer px-6 py-3 bg-amber-300 text-black font-semibold text-sm hover:bg-amber-200 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Download CV ↓
            </a>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={7} className="mt-6 text-sm text-zinc-500 font-mono">
            {h.phone} •{" "}
            {h.emails
              .map((e) => (h.emailLabels?.[e] ? `${e} (${h.emailLabels[e]})` : e))
              .join(" / ")}
          </motion.p>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-amber-300 to-transparent animate-pulse" />
      </div>
    </header>
  );
}
