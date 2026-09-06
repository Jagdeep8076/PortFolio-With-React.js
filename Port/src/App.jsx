import { useState } from "react";
import PreLoader from "./components/preLoader";
import CustomCursor from "./components/CustomCusor.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Skills from "./Skills/skills.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Navbar from "./components/Navbar.jsx";
import Certificates from "./components/Certificates/Certificates.jsx";

const App = () => {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <>
      <CustomCursor />

      {isPreloading ? (
        <PreLoader onComplete={() => setIsPreloading(false)} />
      ) : (
        <div className="relative min-h-screen w-full bg-[#050505] text-white">
          <Navbar />

          <main className="portfolio-scroll">
            <section id="home" className="snap-section">
              <Hero />
            </section>

            <section id="about" className="snap-section">
              <About />
            </section>

            <section id="skills" className="snap-section">
              <Skills />
            </section>

            <section id="projects" className="snap-section">
              <Projects />
            </section>

            <section id="certificates" className="snap-section min-h-screen h-auto">
              <Certificates />
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default App;