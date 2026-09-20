import { useEffect, useRef } from "react";

export default function DotCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let dots = [];
    const mouse = { x: -9999, y: -9999 };
    const RADIUS = 120;

    const isMobile = () =>
      typeof window !== "undefined" && window.innerWidth < 768;
    const gap = () => (isMobile() ? 36 : 28);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const build = () => {
      dots = [];
      const g = gap();
      for (let y = g / 2; y < h; y += g) {
        for (let x = g / 2; x < w; x += g) {
          dots.push({ bx: x, by: y, x, y });
        }
      }
      // cap dot count for perf (~2400 motif target on large screens)
      if (dots.length > 4200) {
        const step = Math.ceil(dots.length / 4200);
        dots = dots.filter((_, i) => i % step === 0);
      }
    };

    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onScroll = () => {
      const fade = Math.max(0.25, 1 - window.scrollY / (h * 1.2));
      canvas.style.opacity = String(fade);
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.bx - mouse.x;
        const dy = d.by - mouse.y;
        const dist = Math.hypot(dx, dy);
        let glow = 0;
        if (dist < RADIUS) {
          const f = 1 - dist / RADIUS;
          glow = f;
          const push = f * 10;
          const inv = dist || 1;
          d.x = d.bx + (dx / inv) * push;
          d.y = d.by + (dy / inv) * push;
        } else {
          d.x += (d.bx - d.x) * 0.12;
          d.y += (d.by - d.y) * 0.12;
        }
        const base = 0.28;
        const alpha = base + glow * 0.72;
        const r = 1.1 + glow * 1.4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle =
          glow > 0.5
            ? `rgba(252,211,77,${alpha.toFixed(3)})`
            : `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    onScroll();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none bg-black"
    />
  );
}
