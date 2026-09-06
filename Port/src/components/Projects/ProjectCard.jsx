import { forwardRef } from "react";

const ProjectCard = forwardRef(
  ({ project, index, activeIndex, onClick }, ref) => {
    const isActive = index === activeIndex;

    return (
      <article
        ref={ref}
        onClick={onClick}
        className="absolute left-1/2 top-1/2 w-[85%] max-w-[760px] -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none md:w-[58%]"
      >
        <div
          className={`relative overflow-hidden rounded-2xl border bg-[#0d0d0d] p-3 transition-colors duration-300 ${
            isActive
              ? "border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "border-white/10"
          }`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#141414] md:aspect-[16/9]">
            <img
              src={project.image}
              alt={project.title}
              draggable="false"
              className={`h-full w-full object-cover transition-transform duration-700 ${
                isActive ? "scale-100" : "scale-105"
              }`}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

            <div className="absolute left-4 top-4 md:left-5 md:top-5">
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow md:text-4xl">
                {project.number}
              </span>
            </div>

            {isActive && (
              <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[8px] font-medium tracking-[0.2em] text-white/90 backdrop-blur-md md:right-5 md:top-5 md:text-[9px]">
                FEATURED
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 md:bottom-5 md:left-5 md:right-5 md:gap-3">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.25em] text-white/60 uppercase">
                  {project.category}
                </p>

                <h3 className="text-2xl font-black leading-tight tracking-tight text-white md:text-4xl">
                  {project.title}{" "}
                  <span className="text-white/40">{project.highlight}</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 md:gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-semibold text-black transition hover:bg-white/90 md:px-4 md:py-2 md:text-xs"
                  >
                    View Project ↗
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/60 px-3.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-black md:px-4 md:py-2 md:text-xs"
                  >
                    View GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pb-1 pt-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[8px] text-white/60 md:text-[9px]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-base text-white/40">↗</span>
          </div>
        </div>
      </article>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;