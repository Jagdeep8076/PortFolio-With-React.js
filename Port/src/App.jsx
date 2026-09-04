import { useState } from "react";
import PreLoader from "./components/preLoader";
import CustomCursor from "./components/CustomCusor.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Skills from "./Skills/skills.jsx";
import Projects from "./components/Projects/Projects.jsx"; 
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <>
      <CustomCursor />
      
      {isPreloading ? (
        <PreLoader onComplete={() => setIsPreloading(false)} />
      ) : (
        <>
          <Navbar />
          
          <main className="portfolio-scroll">
            <section className="snap-section">
              <Hero />
            </section>
            
            <section className="snap-section">
              <About />
            </section>
            
            <section className="snap-section">
              <Skills />
            </section>
            
            <section className="snap-section">
              <Projects />
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default App;