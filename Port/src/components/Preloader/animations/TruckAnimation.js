import gsap from "gsap";

import { animateManifest } from "./manifestAnimation";
import { animateReveal } from "./revealAnimation";

export function createTruckAnimation({
  preloader,

  truck,
  headlight,

  manifest,
  finalReveal,

  flash,
  streaks,

  progress,
  progressBar,

  status,
  scanLine,

  onComplete,
}) {
  const tl =
    gsap.timeline();

  /* --------------------------------
     INITIAL STATES
  -------------------------------- */

  gsap.set(truck, {
    x: "-125vw",
    scale: 0.78,
    opacity: 0,
  });

  gsap.set(headlight, {
    opacity: 0,
    scale: 0.4,
  });

  gsap.set(manifest, {
    y: "110%",
    opacity: 0,
  });

  gsap.set(finalReveal, {
    opacity: 0,
  });

  gsap.set(flash, {
    opacity: 0,
  });

  gsap.set(streaks, {
    opacity: 0,
    scaleX: 0.2,
  });

  gsap.set(progressBar, {
    width: "0%",
  });

  gsap.set(progress, {
    textContent: "00",
  });

  /* --------------------------------
     SYSTEM BOOT
  -------------------------------- */

  tl.to(status, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  })

    .to(
      progress,
      {
        textContent: 10,
        duration: 0.8,
        snap: {
          textContent: 1,
        },
        ease: "none",
      },
      "<"
    )

    .to(
      progressBar,
      {
        width: "10%",
        duration: 0.8,
        ease: "none",
      },
      "<"
    );

  /* --------------------------------
     HEADLIGHT
  -------------------------------- */

  tl.to(headlight, {
    opacity: 0.8,
    scale: 1,
    duration: 1,
    ease: "power2.out",
  });

  /* --------------------------------
     TRUCK ENTER
  -------------------------------- */

  tl.to(truck, {
    opacity: 1,
    x: "-42vw",
    scale: 0.9,
    duration: 1.3,
    ease: "power3.out",
  })

    .to(
      progress,
      {
        textContent: 28,
        duration: 1.2,
        snap: {
          textContent: 1,
        },
        ease: "none",
      },
      "<"
    )

    .to(
      progressBar,
      {
        width: "28%",
        duration: 1.2,
        ease: "none",
      },
      "<"
    )

    .to(streaks, {
      opacity: 0.7,
      scaleX: 1,
      duration: 0.5,
      ease: "power2.out",
    });

  /* --------------------------------
     TRUCK MOVEMENT
  -------------------------------- */

  tl.to(truck, {
    x: "-7vw",
    scale: 1,
    duration: 2.2,
    ease: "power3.inOut",
  })

    .to(
      progress,
      {
        textContent: 48,
        duration: 2.2,
        snap: {
          textContent: 1,
        },
        ease: "none",
      },
      "<"
    )

    .to(
      progressBar,
      {
        width: "48%",
        duration: 2.2,
        ease: "none",
      },
      "<"
    );

  /* --------------------------------
     SMALL CAMERA SHAKE
  -------------------------------- */

  tl.to(truck, {
    y: 5,
    duration: 0.1,
  }).to(truck, {
    y: 0,
    duration: 0.25,
    ease: "power2.out",
  });

  /* --------------------------------
     MANIFEST
  -------------------------------- */

  animateManifest({
    timeline: tl,
    manifest,
    progress,
    progressBar,
    scanLine,
  });

  /* --------------------------------
     TRUCK EXIT
  -------------------------------- */

  tl.to(streaks, {
    opacity: 1,
    scaleX: 1.4,
    duration: 0.25,
    ease: "power2.out",
  });

  tl.to(truck, {
    x: "125vw",
    scale: 1.16,
    duration: 2,
    ease: "power3.in",
  })

    .to(
      progress,
      {
        textContent: 92,
        duration: 2,
        snap: {
          textContent: 1,
        },
        ease: "none",
      },
      "<"
    )

    .to(
      progressBar,
      {
        width: "92%",
        duration: 2,
        ease: "none",
      },
      "<"
    );

  /* --------------------------------
     LIGHT EXIT
  -------------------------------- */

  tl.to(
    headlight,
    {
      opacity: 0,
      scale: 1.4,
      duration: 0.5,
    },
    "-=0.6"
  );

  tl.to(
    streaks,
    {
      opacity: 0,
      scaleX: 2,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.4"
  );

  /* --------------------------------
     FINAL REVEAL
  -------------------------------- */

  animateReveal({
    timeline: tl,
    finalReveal,
    flash,
    preloader,
    progress,
    progressBar,
    onComplete,
  });

  return tl;
}