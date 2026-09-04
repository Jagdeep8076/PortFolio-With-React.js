import { forwardRef } from "react";

const ProjectCard = forwardRef(
  ({ project, index, activeIndex, onClick }, ref) => {
    const isActive = index === activeIndex;

    return (
      <article
        ref={ref}
        onClick={onClick}
        className="absolute left-1/2 top-1/2 w-[72%] max-w-[760px] -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none md:w-[58%]"
      >
        <div
          className={`relative overflow-hidden rounded-2xl border bg-[#090909] p-3 ${
            isActive
              ? "border-white/40 shadow-[0_30px_100px_rgba(255,255,255,0.08)]"
              : "border-white/10"
          }`}
        >
          {/* IMAGE */}

          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#111]">
            <img
              src={project.image}
              alt={project.title}
              draggable="false"
              className={`h-full w-full object-cover grayscale transition-transform duration-700 ${
                isActive ? "scale-100" : "scale-110"
              }`}
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* NUMBER */}

            <div className="absolute left-5 top-5">
              <span className="text-4xl font-bold text-white/80">
                {project.number}
              </span>
            </div>

            {/* FEATURED */}

            {isActive && (
              <div className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-[9px] tracking-[0.2em] backdrop-blur-md">
                FEATURED
              </div>
            )}

            {/* TITLE */}

            <div className="absolute bottom-5 left-5 right-5">
              <p className="mb-2 text-[9px] tracking-[0.3em] text-white/50">
                {project.category}
              </p>

              <h3 className="text-3xl font-black tracking-tight md:text-5xl">
                {project.title}{" "}
                <span className="text-white/30">
                  {project.highlight}
                </span>
              </h3>
            </div>
          </div>

          {/* CARD FOOTER */}

          <div className="flex items-center justify-between px-2 pb-1 pt-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-3 py-1 text-[8px] text-white/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-lg">↗</span>
          </div>
        </div>
      </article>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;