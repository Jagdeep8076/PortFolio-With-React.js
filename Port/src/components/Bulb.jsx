import { useRef, useState } from "react";
import gsap from "gsap";

const Bulb = ({ onLightChange }) => {
  const bulbRef = useRef(null);
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    const nextState = !isOn;
    setIsOn(nextState);

    // Hanging bulb swing animation
    gsap.killTweensOf(bulbRef.current);

    gsap.fromTo(
      bulbRef.current,
      {
        rotation: -5,
      },
      {
        rotation: 5,
        duration: 0.22,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(bulbRef.current, {
            rotation: 0,
          });
        },
      }
    );

    // Tell Hero to turn light/text ON or OFF
    onLightChange?.(nextState);
  };

  return (
    <div className="relative">
      {/* =========================================
          HANGING ROPE
      ========================================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-16
          w-[3px]
          -translate-x-1/2
          bg-white/40
        "
      />

      {/* =========================================
          BULB
      ========================================= */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={isOn ? "Turn bulb off" : "Turn bulb on"}
        className="
          relative
          z-10
          block
          cursor-pointer
          border-0
          bg-transparent
          p-0
          pt-12
          outline-none
        "
      >
        <img
          ref={bulbRef}
          src="/store/Bulb.png"
          alt="Hanging bulb"
          className={`
            block
            h-auto
            w-[120px]
            origin-top
            object-contain
            transition-all
            duration-300
            md:w-[145px]
            lg:w-[165px]
            ${
              isOn
                ? "brightness-125 drop-shadow-[0_0_45px_rgba(255,255,255,1)]"
                : "brightness-75"
            }
          `}
        />
      </button>
    </div>
  );
};

export default Bulb;