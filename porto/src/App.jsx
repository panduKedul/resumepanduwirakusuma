import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Organizations from "./components/Organizations";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Contact from "./components/Contact";
import { MotionConfig } from "framer-motion";
import useReveal from "./hooks/useReveal";
import useLenis from "./hooks/useLenis";

// Below-fold heavy chunk (carousel + photos) split agar payload awal kecil = DDoS cost naik.
const Gallery = lazy(() => import("./components/Gallery"));

export default function App() {
  useReveal();
  useLenis();
  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-black text-zinc-100 min-h-screen">
      <Navbar />
      <main>
        <div id="hero"><Hero /></div>
        <div id="about" className="reveal"><About /></div>
        <div id="edu" className="reveal"><Education /></div>
        <div id="exp" className="reveal"><Experience /></div>
        <div id="orgs" className="reveal"><Organizations /></div>
        <div id="projects" className="reveal"><Projects /></div>
        <div id="research" className="reveal"><Research /></div>
        <div id="gallery" className="reveal"><Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-20 text-sm text-zinc-500 font-mono">Loading gallery…</div>}><Gallery /></Suspense></div>
        <div id="contact" className="reveal"><Contact /></div>
      </main>
    </div>
    </MotionConfig>
  );
}
