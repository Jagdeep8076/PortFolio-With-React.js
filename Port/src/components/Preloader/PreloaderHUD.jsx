import { forwardRef } from "react";

const PreloaderHUD = forwardRef(
  (
    {
      progressRef,
      progressBarRef,
      statusRef,
    },
    ref
  ) => {
    return (
      <>
        {/* BRAND */}
        <div
          className="
            absolute
            left-7
            top-7
            z-[50]
            md:left-12
            md:top-10
          "
        >
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.5em]
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
            "
          >
            Full Stack Developer
          </p>
        </div>

        {/* SYSTEM HUD */}
        <div
          className="
            absolute
            right-7
            top-7
            z-[50]
            w-44
            md:right-12
            md:top-10
            md:w-56
          "
        >
          <div
            className="
              mb-2
              flex
              items-center
              justify-between
            "
          >
            <span
              ref={statusRef}
              className="
                text-[8px]
                uppercase
                tracking-[0.28em]
                text-zinc-500
                opacity-0
                md:text-[9px]
              "
            >
              Initializing portfolio
            </span>

            <span
              className="
                text-[8px]
                tracking-[0.2em]
                text-zinc-700
              "
            >
              SYS 01
            </span>
          </div>

          {/* PROGRESS */}
          <div
            className="
              h-px
              w-full
              overflow-hidden
              bg-white/10
            "
          >
            <div
              ref={progressBarRef}
              className="
                h-full
                w-0
                bg-white
              "
            />
          </div>

          {/* PERCENTAGE */}
          <div
            className="
              mt-2
              flex
              items-end
              justify-between
            "
          >
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.28em]
                text-zinc-600
              "
            >
              Loading
            </span>

            <span
              className="
                font-mono
                text-xl
                font-light
                tracking-wider
              "
            >
              <span ref={progressRef}>00</span>
              <span className="text-zinc-600">
                %
              </span>
            </span>
          </div>
        </div>
      </>
    );
  }
);

PreloaderHUD.displayName = "PreloaderHUD";

export default PreloaderHUD;