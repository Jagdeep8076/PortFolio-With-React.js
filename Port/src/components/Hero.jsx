import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";
import Bulb from "./Bulb";

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const footerRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollDotRef = useRef(null);

  const [lightOn, setLightOn] = useState(false);

  // =========================================
  // HERO INITIAL ANIMATION
  // =========================================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Character ALWAYS visible (no changes here on click)
      gsap.set(videoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      // FRONT-END DEVELOPER hidden initially
      gsap.set(".hero-title", {
        opacity: 0,
        scale: 0.98,
      });

      // Light hidden initially
      gsap.set(".hero-light, .ambient-light", {
        opacity: 0,
      });

      // Footer
      tl.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Scroll Indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Scroll dot infinite animation
      gsap.to(scrollDotRef.current, {
        y: 45,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // =========================================
  // BULB → LIGHT + TEXT TOGGLE
  // (CHARACTER IS NOT TOUCHED)
  // =========================================
  useLayoutEffect(() => {
    const lights = heroRef.current?.querySelectorAll(".hero-light, .ambient-light");
    const title = heroRef.current?.querySelector(".hero-title");

    if (!lights || !title) return;

    if (lightOn) {
      // LIGHT ON
      gsap.to(lights, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      });

      // Text reveal behind character
      gsap.to(title, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    } else {
      // LIGHT OFF & REVERSE
      gsap.to(lights, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Text disappear
      gsap.to(title, {
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
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
        text-white
        font-[GeneralSans]
        z-0
      "
    >
      {/* =========================================
          LAYER: TOP (z-50)
          NAVBAR
      ========================================= */}
      <div className="absolute inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      {/* =========================================
          LAYER: (z-40)
          HANGING BULB (Centered)
      ========================================= */}
      <div
        className="
          pointer-events-auto
          absolute
          left-1/2
          top-0
          z-40
          -translate-x-1/2
        "
      >
        <Bulb onLightChange={setLightOn} />
      </div>

      {/* =========================================
          LAYER: (z-30)
          CHARACTER VIDEO (Always Visible & Playing)
      ========================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          flex
          items-center
          justify-center
          pt-8
        "
      >
        <video
          ref={videoRef}
          src="/Store/Hey-Character.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="
            h-auto
            w-auto
            max-h-[82vh]
            max-w-[75vw]
            object-contain
            drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]
          "
        />
      </div>

      {/* =========================================
          LAYER: (z-20)
          LIGHT BEAM & AMBIENT LIGHT
          (Under Bulb, Behind Character)
      ========================================= */}
      
      {/* Center Ambient Light */}
      <div
        className="
          ambient-light
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-20
          h-[90vh]
          w-[90vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.20)_18%,rgba(255,255,255,0.12)_35%,rgba(255,255,255,0.05)_55%,transparent_75%)]
          blur-[55px]
        "
      />

      {/* Spotlight Beam */}
      <div
        className="
          hero-light
          pointer-events-none
          absolute
          left-1/2
          top-[75px]
          z-20
          h-[78vh]
          w-[85vw]
          -translate-x-1/2
        "
      >
        {/* Outer Soft Light */}
        <div
          className="
            absolute
            inset-0
            [clip-path:polygon(48.5%_0%,51.5%_0%,100%_100%,0%_100%)]
            bg-[linear-gradient(to_bottom,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.20)_20%,rgba(255,255,255,0.10)_45%,rgba(255,255,255,0.04)_70%,transparent_100%)]
            blur-[35px]
          "
        />

        {/* Main Light Beam */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-[70%]
            -translate-x-1/2
            [clip-path:polygon(49%_0%,51%_0%,100%_100%,0%_100%)]
            bg-[linear-gradient(to_bottom,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.20)_25%,rgba(255,255,255,0.10)_55%,rgba(255,255,255,0.03)_80%,transparent_100%)]
            blur-[20px]
          "
        />

        {/* Center Hot Spot */}
        <div
          className="
            absolute
            left-1/2
            top-[4%]
            h-[65%]
            w-[32%]
            -translate-x-1/2
            [clip-path:polygon(46%_0%,54%_0%,100%_100%,0%_100%)]
            bg-[linear-gradient(to_bottom,rgba(255,255,255,0.28),rgba(255,255,255,0.12)_45%,transparent_100%)]
            blur-[18px]
          "
        />
      </div>

      {/* Floor Light */}
      <div
        className="
          ambient-light
          pointer-events-none
          absolute
          bottom-[95px]
          left-1/2
          z-20
          h-[90px]
          w-[38vw]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.12)_35%,transparent_72%)]
          blur-[18px]
        "
      />

      {/* =========================================
          LAYER: 
          FRONT-END / DEVELOPER (Behind Light & Character)
      ========================================= */}
      <div
        className="
          hero-title
          pointer-events-none
          absolute
          inset-0
          z-0
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            w-full
            text-center
            font-[GeneralSans]
            font-black
            uppercase
            leading-[0.78]
            tracking-[-0.065em]
            select-none
          "
        >
          <div className="text-[12vw] leading-[0.8] text-white md:text-[11.5vw] lg:text-[11vw]">
            FRONT-END
          </div>
          <div className="text-[12vw] leading-[0.8] text-white md:text-[11.5vw] lg:text-[11vw]">
            DEVELOPER
          </div>
        </div>
      </div>

      {/* =========================================
          OTHER UI ELEMENTS (Scroll & Footer)
      ========================================= */}
      <div
        ref={scrollRef}
        className="
          absolute
          right-6
          top-1/2
          z-40
          hidden
          -translate-y-1/2
          flex-col
          items-center
          gap-5
          opacity-0
          md:right-10
          md:flex
          lg:right-12
        "
      >
        <span className="[writing-mode:vertical-rl] font-[GeneralSans] text-[10px] font-medium uppercase tracking-[0.4em] text-white/70">
          Scroll Down
        </span>
        <div className="relative h-24 w-px bg-white/35">
          <span ref={scrollDotRef} className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
        </div>
      </div>

      <div
        ref={footerRef}
        className="
          absolute
          bottom-0
          left-6
          right-6
          z-40
          border-t
          border-white/15
          py-5
          opacity-0
          md:left-10
          md:right-10
          lg:left-12
          lg:right-12
        "
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-[220px]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/65">
              Based in India
            </p>
            <p className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/85">
              Available for Freelance
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            </p>
          </div>

          <div className="border-l border-white/10 pl-8 text-center">
            <div className="text-3xl font-light">3+</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/55">Projects</div>
          </div>

          <div className="border-l border-white/10 pl-8 text-center">
            <div className="text-3xl font-light">2+</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/55">Certificates</div>
          </div>

          <div className="border-l border-white/10 pl-8 text-center">
            <div className="text-3xl font-light">100%</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/55">Dedication</div>
          </div>

          <div className="flex items-center gap-7">
            {/* Social Icons */}
            <a href="https://github.com/Jagdeep8076" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/70 transition duration-300 hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/70 transition duration-300 hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="mailto:your@email.com" aria-label="Email" className="text-white/70 transition duration-300 hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;