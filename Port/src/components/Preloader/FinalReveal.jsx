import { forwardRef } from "react";

const FinalReveal = forwardRef(({ flashRef }, ref) => {
  return (
    <>
      <section
        ref={ref}
        className="absolute inset-0 z-[60] flex items-center justify-center bg-black px-6 text-center opacity-0"
      >
        <div>
          <p className="mb-5 text-[8px] uppercase tracking-[0.55em] text-zinc-600">
            Portfolio Initialized
          </p>

          <h1
            data-final-name
            className="text-4xl font-light uppercase tracking-[0.2em] md:text-6xl lg:text-8xl"
          >
            Jagdeep Singh
          </h1>

          <p
            data-final-title
            className="mt-6 text-xs uppercase tracking-[0.65em] text-zinc-400 md:text-sm"
          >
            Full Stack Developer
          </p>

          <p className="mt-5 text-[8px] uppercase tracking-[0.42em] text-zinc-700">
            Design · Code · Create
          </p>
        </div>
      </section>

      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-[100] bg-white opacity-0"
      />
    </>
  );
});

FinalReveal.displayName = "FinalReveal";

export default FinalReveal;