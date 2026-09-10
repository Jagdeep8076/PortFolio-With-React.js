import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Rope = ({ onLightChange }) => {
  const [isOn, setIsOn] = useState(false);

  
  const ropeRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const pullDistanceRef = useRef(0);
  const wasDraggedRef = useRef(false);

  // =========================================
  // NATURAL ROPE SWING
  // =========================================
  useEffect(() => {
    const rope = ropeRef.current;

    if (!rope) return;

    const swing = gsap.to(rope, {
      rotation: 2.2,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "top center",
    });

    return () => {
      swing.kill();
    };
  }, []);

  // =========================================
  // TOGGLE LIGHT
  // =========================================
  const toggleLight = () => {
    const nextState = !isOn;

    setIsOn(nextState);
    onLightChange?.(nextState);

    // Small natural pull-back movement
    gsap.fromTo(
      ropeRef.current,
      {
        y: nextState ? 25 : 15,
        rotation: nextState ? -2 : 2,
      },
      {
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.45)",
      }
    );
  };

  // =========================================
  // START PULL
  // =========================================
  const handlePointerDown = (event) => {
    event.preventDefault();

    isDraggingRef.current = true;
    wasDraggedRef.current = false;

    startYRef.current = event.clientY;
    pullDistanceRef.current = 0;

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  // =========================================
  // PULL ROPE
  // =========================================
  const handlePointerMove = (event) => {
    if (!isDraggingRef.current || !ropeRef.current) return;

    const distance = Math.max(
      0,
      Math.min(80, event.clientY - startYRef.current)
    );

    pullDistanceRef.current = distance;

    if (distance > 5) {
      wasDraggedRef.current = true;
    }

    // Rope stretches downward
    gsap.set(ropeRef.current, {
      y: distance,
      rotation: distance > 10 ? -1.5 : 0,
    });
  };

  // =========================================
  // RELEASE ROPE
  // =========================================
  const handlePointerUp = (event) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    event.currentTarget.releasePointerCapture?.(event.pointerId);

    const pulledEnough = pullDistanceRef.current >= 25;

    // Spring back
    gsap.to(ropeRef.current, {
      y: 0,
      rotation: 0,
      duration: 0.65,
      ease: "elastic.out(1, 0.45)",
    });

    if (pulledEnough) {
      toggleLight();
    }

    pullDistanceRef.current = 0;
  };

  // =========================================
  // CLICK FALLBACK
  // =========================================
  const handleClick = () => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }
    toggleLight();
  };

  return (
    <div className="relative flex justify-center select-none">
      <button
        type="button"
        aria-label={
          isOn ? "Pull rope to turn light off" : "Pull rope to turn light on"
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
        className="
          relative
          cursor-grab
          touch-none
          border-none
          bg-transparent
          p-0
          outline-none
          active:cursor-grabbing">
      
        <div ref={ropeRef} className="relative origin-top">
  
          <div 
            className="absolute bottom-[98%] left-1/2 h-[200px] w-[5px] -translate-x-1/2 rounded-t-full bg-[#1c120a]"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 4px)"
            }}
          />

          <img
            src="/Store/Bulb.png"
            alt="Hanging pull rope"
            draggable="false"
            className="
              block
              h-auto
              w-[85px]
              object-contain
              origin-top
            "
          />

          {/* Subtle glow when ON */}
          <span
            className={`
              pointer-events-none
              absolute
              bottom-[4%]
              left-1/2
              h-20
              w-20
              -translate-x-1/2
              rounded-full
              transition-all
              duration-700
              ${isOn ? "bg-orange-300/30 blur-3xl opacity-100" : "opacity-0"}
            `}
          />
        </div>
      </button>
    </div>
  );
};

export default Rope;