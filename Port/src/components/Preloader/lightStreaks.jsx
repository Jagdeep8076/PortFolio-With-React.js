import {
  forwardRef,
} from "react";

const LightStreaks = forwardRef(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="
          pointer-events-none
          absolute
          bottom-[28%]
          left-0
          z-[6]
          h-24
          w-[70vw]
          origin-left
          opacity-0
        "
      >
        {/* STREAK 1 */}
        <span
          className="
            absolute
            left-0
            top-3
            h-px
            w-full
            bg-white/20
            blur-[1px]
          "
        />

        {/* STREAK 2 */}
        <span
          className="
            absolute
            left-0
            top-9
            h-px
            w-[82%]
            bg-white/10
            blur-[2px]
          "
        />

        {/* STREAK 3 */}
        <span
          className="
            absolute
            left-0
            top-16
            h-px
            w-[62%]
            bg-white/15
            blur-[3px]
          "
        />

        {/* STREAK 4 */}
        <span
          className="
            absolute
            left-0
            top-20
            h-px
            w-[38%]
            bg-white/20
            blur-[4px]
          "
        />
      </div>
    );
  }
);

LightStreaks.displayName =
  "LightStreaks";

export default LightStreaks;