import { useEffect, useRef } from "react";

const Character = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play once on mount. lightOn never controls this video.
    video.play().catch((err) => {
      console.log("Autoplay prevented:", err);
    });
  }, []);

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-[20]
        flex
        items-center
        justify-center
        pt-20
        mix-blend-screen 
      "
    >
      <video
        ref={videoRef}
        src="/Store/Hey-Character.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="
          block
          h-auto
          w-auto
          max-h-[85vh]
          max-w-[85vw]
          object-contain
        "
        style={{
          // Filter adjusted slightly to keep the character bright
          filter: "brightness(1.05) contrast(1.04)",
        }}
      />
    </div>
  );
};

export default Character;
