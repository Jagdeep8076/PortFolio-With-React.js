import { useState } from "react";
import PreLoader from "./components/preLoader";
import CustomCursor from "./components/CustomCusor.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Skills from "./Skills/skills.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <>
      <CustomCursor />

      {isPreloading ? (
        <PreLoader
          onComplete={() => setIsPreloading(false)}
        />
      ) : (
        <>
          {/* NAVBAR placed outside snap-sections so it stays fixed on screen */}
          <Navbar />

          <main className="portfolio-scroll">
            {/* HOME */}
            <section className="snap-section">
              <Hero />
            </section>

            {/* ABOUT */}
            <section className="snap-section">
              <About />
            </section>

            {/* SKILLS */}
            <section className="snap-section">
              <Skills />
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default App;