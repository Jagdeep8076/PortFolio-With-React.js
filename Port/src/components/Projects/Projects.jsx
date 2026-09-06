import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ProjectCard from "./ProjectCard.jsx";

const projects = [
  {
    id: 1,
    number: "01",
    title: "NEXORA",
    highlight: "AI",
    category: "AI APPLICATION",
    description:
      "An AI-powered chat application with authentication, real-time conversations, chat history and intelligent AI responses.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "AI"],
    image: "/projects/Nexora-AI.png",
    live: "https://nexora-ai-ten-fawn.vercel.app?_vercel_share=gXQ0WnmI4kYJT6yCQfDwEJjLGSBNKlnd",
    github: "https://github.com/Jagdeep8076/BACKEND2.0/tree/main/Nexora%20AI",
  },
  {
    id: 2,
    number: "02",
    title: "K72",
    highlight: "CLONE",
    category: "WEBSITE UI",
    description:
      "A modern and responsive frontend clone inspired by the K72 website, built using React, Vite, Tailwind CSS, and GSAP.",
    tech: ["REACT.JS", "JavaScript", "GSAP", "THREE.JS", "TAILWIND-CSS"],
    image: "/projects/k72.png",
    live: "https://k72-clone-iota.vercel.app/",
    github: "https://github.com/Jagdeep8076/k72-clone",
  },
  {
    id: 3,
    number: "03",
    title: "Cynthia Ugwu",
    highlight: "CLONE",
    category: "AWARD-PORTFOLIO",
    description:
      "A responsive frontend inspired by Cynthia Ugwu's portfolio website.",
    tech: ["HTML5", "CSS", "JAVASCRIPT", "LOCOMOTIVESCROLL"],
    image: "/projects/Cynthia Ugwu.png",
    live: "https://your-vercel-link.vercel.app/",
    github: "https://github.com/Jagdeep8076/-Cynthia-Ugwu-frontend-only ",
  },
  {
    id: 4,
    number: "04",
    title: "MACOS",
    highlight: "OS",
    category: "DESKTOP EXPERIENCE",
    description:
      "A macOS-inspired desktop experience with interactive windows, applications and smooth user interactions.",
    tech: ["React", "JavaScript", "SCSS"],
    image: "/projects/MAC-OS.png",
    live: "https://mac-os-psi-ten.vercel.app?_vercel_share=cg08VtaDjUxRJBddGCB34Q4IxqIwGSDl",
    github: "https://github.com/Jagdeep8076/MAC-OS",
  },
  {
    id: 5,
    number: "05",
    title: "REELS",
    highlight: "UI",
    category: "SOCIAL EXPERIENCE",
    description:
      "A short-video social interface focused on smooth interactions, modern UI and an engaging browsing experience.",
    tech: ["React", "JavaScript", "CSS"],
    image: "/projects/reels.png",
    live: "https://reels-xp95.vercel.app?_vercel_share=JO53xI9IgDMv6T5UIzrd8kIRXiwtsbl4",
    github: "https://github.com/Jagdeep8076/reels-",
  },
  {
    id: 6,
    number: "06",
    title: "INSTAGRAM-CLONE",
    highlight: "SOCIAL-MEDIA",
    category: "SOCIAL-EXPERIENCE",
    description:
      "A full-stack Instagram-inspired social media application built with a modern React frontend and a Node.js/Express backend.",
    tech: [
      "React.js",
      "Vite",
      "SCSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "ImageKit",
    ],
    image: "/projects/Instagram.png",
    live: "https://instagram-clone-frontend-xi.vercel.app/login",
    github: "https://github.com/Jagdeep8076/instagram-clone-frontend",
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const cardsRef = useRef([]);
  const touchStartX = useRef(0);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const previousProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const total = projects.length;

    cards.forEach((card, index) => {
      let difference = index - activeIndex;

      if (difference > total / 2) {
        difference -= total;
      }

      if (difference < -total / 2) {
        difference += total;
      }

      gsap.to(card, {
        x: difference * 330,
        scale: difference === 0 ? 1 : 0.72,
        opacity:
          Math.abs(difference) > 2 ? 0 : difference === 0 ? 1 : 0.42,
        rotateY: difference * -7,
        duration: 0.65,
        ease: "power3.out",
        overwrite: true,
      });
    });
  }, [activeIndex]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const distance =
      touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      nextProject();
    } else {
      previousProject();
    }
  };

  return (
    <>
      <section
        className="relative min-h-screen w-full overflow-hidden bg-black text-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative z-30 mx-auto flex w-[90%] items-end gap-5 pt-20">
          <div>
            <p className="mb-2 text-[9px] tracking-[0.5em] text-white/40">
              SELECTED WORK
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              MY <span className="text-white/30">PROJECTS</span>
            </h2>
          </div>

          <div className="mb-3 h-px flex-1 bg-white/10" />

          <div className="mb-1 hidden text-right text-[9px] tracking-[0.35em] text-white/30 md:block">
            <p>CODE</p>
            <p>DESIGN</p>
            <p>BUILD</p>
          </div>
        </div>

        <div className="relative mx-auto flex h-[560px] w-full items-center justify-center overflow-hidden md:h-[620px]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              activeIndex={activeIndex}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              onClick={() => {
                if (index === activeIndex) {
                  setSelectedProject(project);
                } else {
                  setActiveIndex(index);
                }
              }}
            />
          ))}

          <button
            type="button"
            onClick={previousProject}
            className="absolute left-[4%] top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl backdrop-blur-md transition hover:bg-white hover:text-black"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextProject}
            className="absolute right-[4%] top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl backdrop-blur-md transition hover:bg-white hover:text-black"
          >
            →
          </button>
        </div>

        <div className="relative z-30 flex justify-center gap-6">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.id}
              onClick={() => setActiveIndex(index)}
              className={`text-xs transition-all duration-300 ${
                activeIndex === index
                  ? "scale-125 text-white"
                  : "text-white/25 hover:text-white/60"
              }`}
            >
              {project.number}
            </button>
          ))}
        </div>

        <p className="relative z-30 mt-7 text-center text-[9px] tracking-[0.4em] text-white/25">
          CLICK THE CENTER CARD TO EXPLORE
        </p>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-3xl border border-white/15 bg-[#080808]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black text-xl transition hover:bg-white hover:text-black"
            >
              ×
            </button>

            <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-2">
              <div className="flex items-center justify-center border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-center p-7 md:p-12">
                <p className="mb-4 text-[10px] tracking-[0.4em] text-white/40">
                  {selectedProject.number} / {selectedProject.category}
                </p>

                <h3 className="text-5xl font-black leading-[0.85] tracking-[-0.04em] md:text-7xl">
                  {selectedProject.title}
                  <br />
                  <span className="text-transparent [-webkit-text-stroke:1px_white]">
                    {selectedProject.highlight}
                  </span>
                </h3>

                <div className="my-8 h-px w-16 bg-white" />

                <p className="max-w-xl text-sm leading-7 text-white/55">
                  {selectedProject.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 px-4 py-2 text-[10px] text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition hover:bg-white/80"
                  >
                    VIEW LIVE PROJECT ↗
                  </a>

                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/30 px-6 py-3 text-xs transition hover:bg-white hover:text-black"
                  >
                    VIEW GITHUB ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;