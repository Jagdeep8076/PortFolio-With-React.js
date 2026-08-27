import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const circleRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      // Small outer circle - smooth follow
      gsap.to(circleRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
      });

      // Bigger inner dot - fast follow
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Outer Circle */}
      <div
        ref={circleRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99998]
          h-9
          w-9
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/60
        "
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99999]
          h-2.5
          w-2.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white
        "
      />
    </>
  );
};

export default CustomCursor;