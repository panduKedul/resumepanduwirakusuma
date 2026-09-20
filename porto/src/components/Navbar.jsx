import { useEffect, useState } from "react";

const LINKS = [
  ["About", "about"],
  ["Edu", "edu"],
  ["Exp", "exp"],
  ["Orgs", "orgs"],
  ["Projects", "projects"],
  ["Research", "research"],
  ["Gallery", "gallery"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div
        className="absolute top-0 left-0 h-0.5 bg-amber-300 transition-[width]"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="font-bold text-amber-300 tracking-tight">
          PW<span className="text-zinc-500">.</span>
        </a>
        <div className="hidden md:flex gap-4 text-sm font-mono uppercase tracking-wider">
          {LINKS.map(([label, id], i) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-zinc-400 hover:text-amber-300"
            >
              <span className="text-zinc-600 mr-1">0{i + 1}</span>
              {label}
            </a>
          ))}
        </div>
        <button
          type="button"
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-zinc-200 border border-white/10 rounded px-2 py-1"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-2 text-sm font-mono uppercase">
          {LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="text-zinc-300 hover:text-amber-300"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
