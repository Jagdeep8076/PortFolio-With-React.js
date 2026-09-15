import { useEffect, useRef } from "react";

import PreloaderHUD from "./PreloaderHUD.jsx";
import DeliveryManifest from "./DeliveryManifest.jsx";
import FinalReveal from "./FinalReveal.jsx";
import LightStreaks from "./lightStreaks.jsx";
import ParticleBackground from "./particlesBackground.jsx";

import { createTruckAnimation } from "./animations/TruckAnimation.js";
const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);

  const truckRef = useRef(null);
  const headlightRef = useRef(null);

  const manifestRef = useRef(null);
  const finalRevealRef = useRef(null);

  const flashRef = useRef(null);
  const streakRef = useRef(null);

  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const statusRef = useRef(null);
  const scanLineRef = useRef(null);

  useEffect(() => {
    const animation = createTruckAnimation({
      preloader: preloaderRef.current,

      truck: truckRef.current,
      headlight: headlightRef.current,

      manifest: manifestRef.current,
      finalReveal: finalRevealRef.current,

      flash: flashRef.current,
      streaks: streakRef.current,

      progress: progressRef.current,
      progressBar: progressBarRef.current,

      status: statusRef.current,
      scanLine: scanLineRef.current,

      onComplete,
    });

    return () => {
      animation?.kill();
    };
  }, [onComplete]);

  return (
    <main
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white"
    >
      {/* PARTICLES */}
      <ParticleBackground />

      {/* VIGNETTE */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          z-[1]
          bg-[radial-gradient(circle_at_70%_55%,rgba(255,255,255,0.08),transparent_32%)]
        "
      />

      {/* SCAN LINE */}
      <div
        ref={scanLineRef}
        className="
          pointer-events-none
          absolute left-0 top-0
          z-[30]
          h-px w-full
          bg-white/30
          opacity-0
          shadow-[0_0_25px_rgba(255,255,255,0.5)]
        "
      />

      {/* HUD */}
      <PreloaderHUD
        progressRef={progressRef}
        progressBarRef={progressBarRef}
        statusRef={statusRef}
      />

      {/* LIGHT STREAKS */}
      <LightStreaks ref={streakRef} />

      {/* HEADLIGHT GLOW */}
      <div
        ref={headlightRef}
        className="
          pointer-events-none
          absolute
          bottom-[22%]
          right-[5%]
          z-[5]
          h-48
          w-72
          rounded-full
          bg-white/20
          opacity-0
          blur-[90px]
        "
      />

      {/* TRUCK */}
      <img
        ref={truckRef}
        src="/images/truck.png"
        alt=""
        draggable="false"
        className="
          pointer-events-none
          absolute
          bottom-[14%]
          left-0
          z-[10]
          w-[95vw]
          max-w-none
          select-none
          md:w-[82vw]
        "
      />

      {/* MANIFEST */}
      <DeliveryManifest ref={manifestRef} />

      {/* FINAL REVEAL */}
      <FinalReveal
        ref={finalRevealRef}
        flashRef={flashRef}
      />

      {/* BOTTOM LABEL */}
      <div
        className="
          absolute
          bottom-7
          left-7
          z-[50]
          md:bottom-10
          md:left-12
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.45em]
            text-zinc-500
          "
        >
          Delivering creativity...
        </p>
      </div>
    </main>
  );
};

export default Preloader;