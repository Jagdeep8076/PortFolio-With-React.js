import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../Navbar";
import Rope from "./Rope";
import Character from "./Character";

const Hero = () => {
  const heroRef = useRef(null);
  const [lightOn, setLightOn] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spotlight = heroRef.current?.querySelector(".spotlight");
      const floorLight = heroRef.current?.querySelector(".floor-light");
      const ambientLight = heroRef.current?.querySelector(".ambient-light");

      const frontend = heroRef.current?.querySelector(".frontend-text");
      const developer = heroRef.current?.querySelector(".developer-text");

      if (!spotlight || !floorLight || !ambientLight) return;
      if (!frontend || !developer) return;

      if (lightOn) {
        gsap.to([spotlight, ambientLight, floorLight], {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.08,
        });

        gsap.to(frontend, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to(developer, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.08,
          ease: "power3.out",
        });
      } else {
        gsap.to([spotlight, ambientLight, floorLight], {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        });

        gsap.to(frontend, {
          opacity: 0,
          x: -35,
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(developer, {
          opacity: 0,
          x: 35,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [lightOn]);

  return (
    <section
      ref={heroRef}
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-black
        font-[GeneralSans]
        text-white
      "
    >
      {/* NAVBAR */}
      <div className="absolute inset-x-0 top-0 z-[60]">
        <Navbar />
      </div>

      {/* ROPE */}
      <div className="absolute left-1/2 top-0 z-[70] -translate-x-1/2">
        <Rope onLightChange={setLightOn} />
      </div>

      {/* AMBIENT LIGHT */}
      <div
        className="
          ambient-light
          pointer-events-none
          absolute
          left-1/2
          top-[8%]
          z-[5]
          h-[78vh]
          w-[78vw]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.07)_30%,rgba(255,255,255,0.025)_55%,transparent_75%)]
          opacity-0
          blur-[60px]
        "
      />

      {/* SPOTLIGHT */}
      <div
        className="
          spotlight
          pointer-events-none
          absolute
          left-1/2
          top-[65px]
          z-[6]
          h-[78vh]
          w-full
          -translate-x-1/2
          opacity-0
        "
      >
        <div
          className="absolute inset-0 blur-[35px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.17) 0%, rgba(255,255,255,0.09) 32%, rgba(255,255,255,0.025) 68%, transparent 100%)",
            clipPath:
              "polygon(46.5% 0%, 53.5% 0%, 79% 100%, 21% 100%)",
          }}
        />

        <div
          className="absolute inset-0 blur-[14px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.11) 40%, rgba(255,255,255,0.02) 70%, transparent 100%)",
            clipPath:
              "polygon(49% 0%, 51% 0%, 64% 100%, 36% 100%)",
          }}
        />
      </div>

      {/* TEXT - BEHIND CHARACTER */}
      <div className="pointer-events-none absolute inset-0 z-[10]">

        <div
          className="
            frontend-text
            absolute
            left-[4vw]
            top-[38%]
            -translate-y-1/2
            whitespace-nowrap
            text-[8vw]
            font-black
            uppercase
            leading-none
            tracking-[-0.06em]
            text-white
            opacity-0
            md:text-[7vw]
            lg:text-[6.8vw]
          "
          style={{
            transform: "translateX(-35px) translateY(-50%)",
          }}
        >
          FRONTEND
        </div>

        <div
          className="
            developer-text
            absolute
            bottom-[27%]
            right-[3vw]
            whitespace-nowrap
            text-[8vw]
            font-black
            uppercase
            leading-none
            tracking-[-0.06em]
            text-white
            opacity-0
            md:text-[7vw]
            lg:text-[6.8vw]
          "
          style={{
            transform: "translateX(35px)",
          }}
        >
          DEVELOPER
        </div>
      </div>

      {/* CHARACTER - NEVER HIDDEN / NEVER RESTARTED */}
      <Character />

      {/* FLOOR LIGHT */}
      <div
        className="
          floor-light
          pointer-events-none
          absolute
          bottom-[12%]
          left-1/2
          z-[16]
          h-[75px]
          w-[42vw]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.09)_35%,transparent_72%)]
          opacity-0
          blur-[18px]
        "
      />

      {/* SCROLL */}
      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-1/2
          z-[50]
          hidden
          -translate-y-1/2
          flex-col
          items-center
          gap-5
          opacity-70
          md:right-10
          md:flex
          lg:right-12
        "
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.4em] [writing-mode:vertical-rl]">
          Scroll Down
        </span>

        <div className="relative h-24 w-px bg-white/35">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="
          absolute
          bottom-0
          left-5
          right-5
          z-[50]
          border-t
          border-white/10
          pb-5
          pt-4
          md:left-10
          md:right-10
          lg:left-12
          lg:right-12
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/55">
              Based in India
            </p>

            <p className="mt-1 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/85">
              Available for Freelance
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            </p>
          </div>

          <div className="hidden items-center gap-12 text-center md:flex">
            <div>
              <div className="text-2xl font-light">3+</div>
              <p className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                Projects
              </p>
            </div>

            <div className="border-l border-white/10 pl-12">
              <div className="text-2xl font-light">2+</div>
              <p className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                Certificates
              </p>
            </div>

            <div className="border-l border-white/10 pl-12">
              <div className="text-2xl font-light">100%</div>
              <p className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                Dedication
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-[9px] uppercase tracking-[0.15em] text-white/60 md:flex">
            <a
              href="https://github.com/Jagdeep8076"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="mailto:your@email.com"
              className="transition hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
