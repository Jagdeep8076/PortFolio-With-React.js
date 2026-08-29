import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scroller = document.querySelector(".portfolio-scroll");

    if (!section || !scroller) return;

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray(".about-reveal");

      // Initial states
      gsap.set(revealItems, { opacity: 0, y: 40 });
      gsap.set(".about-title-line", { yPercent: 110 });
      gsap.set(".about-photo", { opacity: 0, scale: 0.88 });
      gsap.set(".orbit", { rotation: 0 });

      // Header / intro reveal
      gsap.to(revealItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Big title reveal
      gsap.to(".about-title-line", {
        yPercent: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-title",
          scroller,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Portrait
      gsap.to(".about-photo", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-visual",
          scroller,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Slow orbit rotation
      gsap.to(".orbit", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Stats
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            scroller,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Refresh after layout is ready.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black px-6 py-20 font-[GeneralSans] text-white md:px-10 md:py-24 lg:px-12"
    >
      {/* Subtle background elements */}
      <div className="pointer-events-none absolute right-[-5%] top-[-3%] select-none text-[24vw] font-black leading-none text-white/[0.025]">
        01
      </div>

      <div className="pointer-events-none absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <header className="about-reveal mb-16 flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-white/45">
            <span className="text-white">01</span>
            <span>/</span>
            <span>About</span>
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
            Get to know me
          </span>
        </header>

        {/* ================= INTRO ================= */}
        <div className="mb-24 grid items-center gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

          {/* LEFT */}
          <div>
            <p className="about-reveal mb-5 text-[10px] uppercase tracking-[0.3em] text-white/45">
              Who I am
            </p>

            <h1 className="about-title mb-8 overflow-hidden text-[18vw] font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-[110px] lg:text-[125px]">
              <span className="about-title-line block">About</span>
              <span className="about-title-line block text-white/45">Me.</span>
            </h1>

            <div className="about-reveal mb-8 h-px w-20 bg-white/30" />

            <p className="about-reveal max-w-xl text-base font-light leading-8 text-white/65 md:text-lg">
              I&apos;m <span className="text-white">Jagdeep Singh</span>, a
              Frontend Developer focused on building interactive, responsive
              and visually engaging digital experiences.
            </p>

            <p className="about-reveal mt-5 max-w-xl text-sm font-light leading-7 text-white/40 md:text-base">
              I enjoy turning ideas into clean interfaces and bringing them
              to life with modern JavaScript, React and animation.
            </p>

            <div className="about-reveal mt-9 flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 hover:bg-white hover:text-black"
              >
                Download Resume
                <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href="https://github.com/Jagdeep8076"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:border-white/40 hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="about-visual relative flex min-h-[380px] items-center justify-center lg:min-h-[500px]">

            <div className="orbit absolute h-[290px] w-[290px] rounded-full border border-white/10 sm:h-[370px] sm:w-[370px] lg:h-[430px] lg:w-[430px]" />

            <div className="orbit absolute h-[235px] w-[235px] rounded-full border border-white/5 border-t-white/40 sm:h-[310px] sm:w-[310px] lg:h-[365px] lg:w-[365px]" />

            <span className="absolute right-[14%] top-[18%] h-2 w-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

            <div className="about-photo relative z-10 h-[250px] w-[250px] overflow-hidden rounded-full border border-white/15 bg-[#0a0a0a] sm:h-[320px] sm:w-[320px] lg:h-[370px] lg:w-[370px]">
              <img
                src="/Store/my-photo.jpg"
                alt="Jagdeep Singh"
                className="h-full w-full object-cover grayscale transition duration-700 hover:scale-105"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="absolute bottom-[7%] left-[7%] z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black text-sm text-white/80 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              {"</>"}
            </div>

            <div className="absolute bottom-[8%] right-[0%] z-20 border border-white/10 bg-black/85 px-5 py-4 backdrop-blur-md sm:right-[2%]">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/40">
                  Available for
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
              <p className="text-sm font-medium">
                Freelance
                <br />
                Opportunities
              </p>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="stats-grid mb-24 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["2+", "Years Learning", "Constantly learning and improving."],
            ["10+", "Projects Built", "From ideas to complete solutions."],
            ["Fast", "Performance", "Focused on clean and optimized UI."],
            ["100%", "User First", "Building simple and intuitive experiences."],
          ].map(([number, title, description]) => (
            <div
              key={title}
              className="stat-card group bg-[#050505] p-7 transition duration-500 hover:bg-[#0c0c0c] lg:p-8"
            >
              <span className="mb-8 block h-8 w-8 border border-white/20 transition duration-300 group-hover:bg-white group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]" />

              <h3 className="text-4xl font-light tracking-tight">{number}</h3>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
                {title}
              </p>

              <p className="mt-4 text-xs leading-6 text-white/35">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* ================= JOURNEY + SKILLS ================= */}
        <div className="mb-28 min-h-[55vh] flex items-center lg:mb-36">

          {/* JOURNEY */}
          <div className="about-reveal">
            <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/45">
              My Journey
            </p>

            <div className="mb-8 h-px w-full bg-white/10" />

            <p className="max-w-xl text-sm font-light leading-7 text-white/65 md:text-base">
              I started with curiosity about how websites work. That curiosity
              became a passion for frontend development and interactive
              digital experiences.
            </p>

            <p className="mt-6 max-w-xl text-sm font-light leading-7 text-white/45 md:text-base">
              Today, I focus on creating responsive interfaces, meaningful
              animations and practical products using modern web
              technologies.
            </p>

            <div className="mt-10 text-3xl font-light tracking-tight text-white">
              Jagdeep Singh
            </div>
          </div>


        </div>

      </div>
    </section>
  );
};

export default About;