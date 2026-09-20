import { useCallback, useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";

const DIGITELCO_PHOTOS = [
  "start.png",
  "halaman-utama-max-2.png",
  "halaman-berita-terkini-1.png",
  "halaman-highlights-3.png",
  "cabang-organisasi-bso.png",
  "cabang-bso-hooligans-1.png",
  "cabang-bso-hooligans-2.png",
  "cabang-bso-hooligans-3.png",
].map((f) => `/gallery/digitelco/${f}`);

// Photos per project index. Only DigiTelco (Project 1) is filled for now.
const PROJECT_PHOTOS = {
  0: DIGITELCO_PHOTOS,
};

const ITEMS = (profile.projects || []).map((p, i) => ({
  title: p.title,
  caption: `${p.year} — ${p.role}`,
  label: `Project ${i + 1}`,
  photos: PROJECT_PHOTOS[i] || [],
}));

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const touchX = useRef(null);

  const open = (item) => {
    setSelected(item);
    setPhotoIndex(0);
  };

  const step = useCallback(
    (dir) => {
      if (!selected || selected.photos.length === 0) return;
      setPhotoIndex((i) => (i + dir + selected.photos.length) % selected.photos.length);
    },
    [selected]
  );

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, step]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) step(1);
    if (dx > 40) step(-1);
    touchX.current = null;
  };

  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">07 — Gallery</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Gallery</h2>
        <p className="text-sm text-zinc-500 mt-3">
          One album per project — click to open and swipe through the photos.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {ITEMS.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() => open(g)}
              className="dot-card relative bg-white/[0.02] border border-white/10 aspect-video flex flex-col items-center justify-center gap-1 hover:border-amber-300/50 overflow-hidden"
            >
              {g.photos.length > 0 ? (
                <>
                  <img
                    src={g.photos[0]}
                    alt={g.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-zinc-100 bg-black/70 px-2 py-0.5">
                    {g.label} • {g.photos.length} photos
                  </span>
                </>
              ) : (
                <>
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-300">{g.label}</span>
                  <span className="text-sm font-medium text-zinc-200 line-clamp-2 px-3">{g.title}</span>
                </>
              )}
            </button>
          ))}
        </div>
        {selected && (
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur flex items-center justify-center p-4 z-50"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-black border border-white/10 max-w-3xl w-full p-4 md:p-6"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-xs uppercase tracking-widest text-amber-300">{selected.label}</p>
                {selected.photos.length > 0 && (
                  <p className="font-mono text-xs text-zinc-400">
                    {photoIndex + 1} / {selected.photos.length}
                  </p>
                )}
              </div>
              {selected.photos.length > 0 ? (
                <>
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={() => step(-1)}
                      className="absolute left-2 z-10 px-3 py-2 bg-black/70 border border-white/20 text-zinc-100 hover:border-amber-300 hover:text-amber-300"
                    >
                      ←
                    </button>
                    <img
                      src={selected.photos[photoIndex]}
                      alt={`${selected.title} photo ${photoIndex + 1}`}
                      className="w-full max-h-[65vh] object-contain bg-white/[0.02] border border-white/10"
                    />
                    <button
                      type="button"
                      aria-label="Next photo"
                      onClick={() => step(1)}
                      className="absolute right-2 z-10 px-3 py-2 bg-black/70 border border-white/20 text-zinc-100 hover:border-amber-300 hover:text-amber-300"
                    >
                      →
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {selected.photos.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setPhotoIndex(i)}
                        className={`h-14 w-20 shrink-0 overflow-hidden border ${
                          i === photoIndex ? "border-amber-300" : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="aspect-video bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4">
                  <span className="text-sm text-zinc-400">Photos coming soon</span>
                </div>
              )}
              <h3 className="font-semibold mb-1 tracking-tight mt-3">{selected.title}</h3>
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
