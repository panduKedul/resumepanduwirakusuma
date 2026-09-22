import { useEffect } from "react";
import Lenis from "lenis";

// Lenis smooth scroll, hormati prefers-reduced-motion.
// Return void; simpan instance di window.__lenis untuk anchor handler.
export default function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    let lenis = null;
    let raf = 0;
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      window.__lenis = lenis;
      document.documentElement.classList.add("lenis");
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } catch {
      return undefined;
    }
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el || !window.__lenis) return;
      e.preventDefault();
      window.__lenis.scrollTo(el, { offset: -64 });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      document.documentElement.classList.remove("lenis");
      if (lenis) lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}
