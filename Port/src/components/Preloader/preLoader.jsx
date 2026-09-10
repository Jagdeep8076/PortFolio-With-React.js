import { useEffect, useRef } from "react";

import { createParticles } from "./Particles";
import { runTruckAnimation } from "./TruckAnimation";

function Preloader({ onComplete }) {

  const rootRef = useRef(null);

  const truckRef = useRef(null);

  const headlightsRef = useRef(null);

  const popupRef = useRef(null);

  const finalScreenRef = useRef(null);

  const finalNameRef = useRef(null);

  const finalTitleRef = useRef(null);

  const flashRef = useRef(null);

  const particlesCanvasRef = useRef(null);

  useEffect(() => {

    const cleanupParticles =
      createParticles(particlesCanvasRef.current);

    const popupItems =
      popupRef.current.querySelectorAll(
        "[data-popup-item]"
      );

    const timeline = runTruckAnimation({

      truck: truckRef.current,

      headlights: headlightsRef.current,

      popup: popupRef.current,

      popupItems,

      finalScreen: finalScreenRef.current,

      finalName: finalNameRef.current,

      finalTitle: finalTitleRef.current,

      flash: flashRef.current,

      preloader: rootRef.current,

      onComplete

    });

    return () => {

      timeline.kill();

      cleanupParticles();

    };

  }, [onComplete]);

  return (

    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white"
    >

      <canvas
        ref={particlesCanvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[radial-gradient(circle_at_70%_55%,rgba(255,255,255,0.08),transparent_28%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[20]
          opacity-[0.06]
        "
        style={{
          backgroundImage: "url('/textures/noise.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "420px 420px"
        }}
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          z-[2]
          h-[30%]
          w-full
          bg-[linear-gradient(to_top,#090909,transparent)]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-[-5%]
          z-[3]
          h-[22%]
          w-[110%]
          opacity-80
        "
        style={{
          backgroundImage:
            "url('/textures/road-texture.jpg')",

          backgroundSize: "cover",

          backgroundPosition: "center"
        }}
      />

      <div
        ref={headlightsRef}
        className="
          pointer-events-none
          absolute
          bottom-[24%]
          right-[6%]
          z-[4]
          h-40
          w-64
          rounded-full
          bg-white/20
          blur-[70px]
        "
      />

      <div
        className="
          absolute
          left-7
          top-7
          z-[30]
          md:left-12
          md:top-10
        "
      >

        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.5em]
            text-white
            md:text-xs
          "
        >
          Jagdeep Singh
        </p>

        <p
          className="
            mt-2
            text-[9px]
            uppercase
            tracking-[0.38em]
            text-zinc-500
            md:text-[10px]
          "
        >
          Developer
        </p>

      </div>

      <div
        className="
          absolute
          bottom-7
          left-7
          z-[30]
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
            md:text-[10px]
          "
        >
          Delivering creativity...
        </p>

      </div>

      <img
        ref={truckRef}
        src="/images/truck.png"
        alt=""
        draggable="false"
        className="
          pointer-events-none
          absolute
          bottom-[17%]
          left-0
          z-[10]
          h-auto
          w-[92vw]
          max-w-none
          select-none
          md:w-[82vw]
        "
      />

      <div
        ref={popupRef}
        className="
          absolute
          bottom-[13%]
          left-1/2
          z-[40]
          w-[min(88vw,520px)]
          -translate-x-1/2
          border
          border-white/25
          bg-black/90
          p-6
          shadow-2xl
          backdrop-blur-xl
          md:p-8
        "
      >

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-4
          "
        >

          <p
            data-popup-item
            className="
              text-[9px]
              uppercase
              tracking-[0.42em]
              text-zinc-500
            "
          >
            Delivery Manifest
          </p>

          <p
            data-popup-item
            className="
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-zinc-600
            "
          >
            JS / 001
          </p>

        </div>

        <div data-popup-item>

          <p
            className="
              text-2xl
              font-light
              uppercase
              tracking-[0.12em]
              md:text-4xl
            "
          >
            My Portfolio
          </p>

          <p
            className="
              mt-2
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-zinc-500
            "
          >
            Has arrived
          </p>

        </div>

        <div
          className="
            mt-7
            grid
            grid-cols-2
            gap-3
            border-y
            border-white/10
            py-5
            sm:grid-cols-4
          "
        >

          <div data-popup-item>

            <p className="text-lg font-light">
              06
            </p>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-zinc-600
              "
            >
              Projects
            </p>

          </div>

          <div data-popup-item>

            <p className="text-lg font-light">
              12
            </p>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-zinc-600
              "
            >
              Skills
            </p>

          </div>

          <div data-popup-item>

            <p className="text-lg font-light">
              03
            </p>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-zinc-600
              "
            >
              Focus
            </p>

          </div>

          <div data-popup-item>

            <p className="text-lg font-light">
              01
            </p>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-zinc-600
              "
            >
              Identity
            </p>

          </div>

        </div>

        <p
          data-popup-item
          className="
            text-[9px]
            uppercase
            tracking-[0.38em]
            text-zinc-400
          "
        >
          Design · Code · Create
        </p>

      </div>

      <div
        ref={finalScreenRef}
        className="
          absolute
          inset-0
          z-[50]
          flex
          items-center
          justify-center
          bg-black
          px-6
          text-center
        "
      >

        <div>

          <p
            ref={finalNameRef}
            className="
              text-3xl
              font-light
              uppercase
              md:text-6xl
              lg:text-8xl
            "
          >
            Jagdeep Singh
          </p>

          <p
            ref={finalTitleRef}
            className="
              mt-5
              text-xs
              uppercase
              tracking-[0.65em]
              text-zinc-400
              md:text-sm
            "
          >
            Portfolio
          </p>

        </div>

      </div>

      <div
        ref={flashRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[100]
          bg-white
        "
      />

    </div>
  );
}

export default Preloader;