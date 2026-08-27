import { useEffect, useRef } from "react";
import gsap from "gsap";

const PreLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline();

    // =========================
    // LOADING 0 → 100
    // =========================

    tl.to(counter, {
      value: 100,
      duration: 3,
      ease: "none",

      onUpdate: () => {
        const value = Math.floor(counter.value);

        // Percentage
        if (counterRef.current) {
          counterRef.current.textContent =
            `${value}`.padStart(2, "0") + "%";
        }

        // Progress bar
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            width: `${value}%`,
          });
        }
      },
    })

      // =========================
      // CONTENT EXIT
      // =========================

      .to(contentRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: "power3.inOut",
      })

      // =========================
      // PRELOADER EXIT
      // =========================

      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      })

      // =========================
      // TELL APP TO SHOW HOME
      // =========================

      .call(() => {
        onComplete?.();
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-black
        text-white
      "
    >
      <div
        ref={contentRef}
        className="
          w-[90%]
          max-w-[1400px]
        "
      >
        {/* =========================
            NAME
        ========================= */}

        <div className="my-16 text-center md:my-20">
          <h1
            className="
              font-[SFDisplay]
              text-[clamp(55px,12vw,180px)]
              font-bold
              leading-none
              tracking-[-0.07em]
              whitespace-nowrap
            "
          >
            JAGDEEP SINGH
          </h1>
        </div>

        {/* =========================
            LOADING INFO
        ========================= */}

        <div
          className="
            flex
            justify-between
            font-[GeneralSans]
            text-xs
            tracking-[0.15em]
            text-white
          "
        >
          <span>LOADING</span>

          <span ref={counterRef}>
            00%
          </span>
        </div>

        {/* =========================
            PROGRESS BAR
        ========================= */}

        <div
          className="
            relative
            mt-4
            h-[2px]
            w-full
            overflow-hidden
            bg-white/20
          "
        >
          <div
            ref={progressRef}
            className="
              absolute
              left-0
              top-0
              h-full
              bg-white
            "
            style={{
              width: "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreLoader;