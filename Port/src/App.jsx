import { useState } from "react";
import PreLoader from "./components/preLoader";
import CustomCursor from "./components/CustomCusor.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";

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
        <main className="portfolio-scroll">
          {/* HOME */}
          <section className="snap-section">
            <Hero />
          </section>

          {/* ABOUT */}
          <section className="snap-section">
            <About />
          </section>
        </main>
      )}
    </>
  );
};

export default App;