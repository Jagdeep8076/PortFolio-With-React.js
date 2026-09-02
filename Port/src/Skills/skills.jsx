import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

// All 16 Technical Skills
const techSkills = [
  { id: "html", name: "HTML5", short: "H5", bg: "#e34f26", text: "#fff" },
  { id: "css", name: "CSS3", short: "C3", bg: "#1572b6", text: "#fff" },
  { id: "react", name: "React.js", short: "⚛", bg: "#00a8cc", text: "#fff" },
  { id: "js", name: "JavaScript", short: "JS", bg: "#f0c808", text: "#000" },
  { id: "scss", name: "SCSS", short: "S", bg: "#c63b7e", text: "#fff" },
  { id: "tail", name: "Tailwind", short: "≈", bg: "#0d8ca8", text: "#fff" },
  { id: "gsap", name: "GSAP", short: "G", bg: "#65a30d", text: "#fff" },
  { id: "redux", name: "Redux", short: "R", bg: "#5b21b6", text: "#fff" },
  { id: "hooks", name: "Hooks", short: "⚓", bg: "#0d9488", text: "#fff" },
  { id: "git", name: "Git", short: "◆", bg: "#ea580c", text: "#fff" },
  { id: "github", name: "GitHub", short: "GH", bg: "#27272a", text: "#fff" },
  { id: "npm", name: "NPM", short: "📦", bg: "#dc2626", text: "#fff" },
  { id: "vite", name: "Vite", short: "⚡", bg: "#7c3aed", text: "#fff" },
  { id: "vercel", name: "Vercel", short: "▲", bg: "#e5e7eb", text: "#000" },
  { id: "python", name: "Python", short: "PY", bg: "#0284c7", text: "#fff" },
  { id: "api", name: "REST APIs", short: "API", bg: "#3f3f46", text: "#fff" },
];

const softSkills = [
  "Problem-Solving",
  "Analytical Thinking",
  "Team Collaboration",
  "Effective Communication",
  "Time Management",
  "Adaptability",
  "Quick Learner"
];

const Skills = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const itemRefs = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    setDimensions({ width, height });

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.2, scale: 0.0015 }, 
    });
    engineRef.current = engine;

    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      friction: 0.5,
    };
    
    const thickness = 100;
    const ground = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width + 200, thickness, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions);
    
    // FIX: Moved ceiling WAY up so blocks don't get stuck above it
    const ceiling = Matter.Bodies.rectangle(width / 2, -3000, width * 2, thickness, wallOptions);

    Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    const blocks = techSkills.map((skill, index) => {
      // Keep them grouped closer horizontally so they don't spawn inside the walls
      const startX = Math.random() * (width - 250) + 125;
      
      // Stagger them to drop in smaller increments
      const startY = -150 - (index * 60);

      return Matter.Bodies.rectangle(startX, startY, 110, 110, {
        chamfer: { radius: 24 }, 
        restitution: 0.6, // Slightly more bounce
        friction: 0.5,
        frictionAir: 0.01,
        density: 0.05,
        render: { visible: false },
      });
    });

    Matter.World.add(engine.world, blocks);

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.World.add(engine.world, mouseConstraint);

    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    Matter.Events.on(engine, "afterUpdate", () => {
      blocks.forEach((block, i) => {
        const el = itemRefs.current[i];
        if (el) {
          const x = block.position.x - 55; 
          const y = block.position.y - 55;
          el.style.transform = `translate(${x}px, ${y}px) rotate(${block.angle}rad)`;
        }
      });
    });

    return () => {
      Matter.Render.stop(engine);
      Matter.Runner.stop(runner);
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-ticker {
            animation: ticker 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
          .text-outline {
            color: transparent;
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
          }
          .ticker-mask {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}
      </style>

      <section 
        id="skills"
        className="relative w-full min-h-screen bg-[#050505] px-4 py-24 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col items-start z-10 mb-8 px-4">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">03 / SKILLS</span>
            <div className="h-[1px] w-24 bg-white/10"></div>
          </div>
          
          <h2 className="text-[14vw] md:text-[8vw] font-black uppercase tracking-tighter text-outline leading-none w-full text-center mt-4">
            Tech Stack
          </h2>
          
          <p className="w-full text-center text-white/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mt-2">
            Drag and throw them around
          </p>
        </div>

        <div 
          ref={sceneRef} 
          className="relative w-full h-[55vh] max-w-6xl mx-auto z-10 overflow-hidden"
        >
          {techSkills.map((skill, i) => (
            <div
              key={skill.id}
              ref={(el) => (itemRefs.current[i] = el)}
              className="absolute top-0 left-0 w-[110px] h-[110px] rounded-[24px] flex flex-col items-center justify-center p-3 select-none transition-transform hover:scale-105 cursor-grab active:cursor-grabbing"
              style={{
                backgroundColor: skill.bg,
                color: skill.text,
                pointerEvents: "none", 
                boxShadow: `
                  inset 0px 8px 15px rgba(255, 255, 255, 0.35), 
                  inset 0px -8px 15px rgba(0, 0, 0, 0.25), 
                  0px 15px 25px rgba(0,0,0,0.6)
                `,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="text-4xl font-black mb-1 drop-shadow-md">
                {skill.short}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-center drop-shadow-md">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-6xl mx-auto mt-12 z-20 overflow-hidden relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 md:w-24 bg-white/10"></div>
            <h3 className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40">
              • Soft Skills & Attributes •
            </h3>
            <div className="h-[1px] w-12 md:w-24 bg-white/10"></div>
          </div>
          
          <div className="ticker-mask w-full overflow-hidden py-4 cursor-pointer">
            <div className="animate-ticker gap-4 md:gap-6 px-4">
              {[...softSkills, ...softSkills, ...softSkills, ...softSkills].map((skill, index) => (
                <div 
                  key={`${skill}-${index}`}
                  className="group relative px-6 py-3 rounded-full border border-white/10 bg-transparent transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/30 flex-shrink-0"
                >
                  <span className="relative z-10 text-xs md:text-sm font-light tracking-wide text-white/50 transition-colors duration-300 group-hover:text-white">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;