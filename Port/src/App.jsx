import { useState } from "react";
import PreLoader from "./components/preLoader";
import CustomCursor from "./components/CustomCusor.jsx";
import Hero from "./components/Hero/Hero.jsx";

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
        <Hero />
      )}
    </>
  );
};

export default App;