import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Organizations from "./components/Organizations";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import useReveal from "./hooks/useReveal";

export default function App() {
  useReveal();
  return (
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
        <div id="gallery" className="reveal"><Gallery /></div>
        <div id="contact" className="reveal"><Contact /></div>
      </main>
    </div>
  );
}
