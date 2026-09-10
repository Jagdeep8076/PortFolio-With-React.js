import gsap from "gsap";

export function runTruckAnimation({
  truck,
  headlights,
  popup,
  popupItems,
  finalScreen,
  finalName,
  finalTitle,
  flash,
  preloader,
  onComplete
}) {

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const tl = gsap.timeline({
    onComplete
  });

  gsap.set(truck, {
    x: "-125vw",
    y: 0,
    scale: 0.82,
    opacity: 0.95
  });

  gsap.set(headlights, {
    opacity: 0,
    scale: 0.6
  });

  gsap.set(popup, {
    y: "110%",
    opacity: 0,
    scale: 0.96
  });

  gsap.set(popupItems, {
    y: 18,
    opacity: 0
  });

  gsap.set(finalScreen, {
    opacity: 0
  });

  gsap.set(finalName, {
    opacity: 0,
    y: 24,
    letterSpacing: "0.25em"
  });

  gsap.set(finalTitle, {
    opacity: 0,
    y: 20,
    scale: 0.96
  });

  gsap.set(flash, {
    opacity: 0
  });

  if (reduceMotion) {

    tl.to(preloader, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.out"
    });

    return tl;
  }

  tl

    .to(
      headlights,
      {
        opacity: 0.65,
        scale: 1,
        duration: 1.1,
        ease: "power2.out"
      },
      0.6
    )

    .to(
      truck,
      {
        x: "-8vw",
        scale: 1,
        duration: 4,
        ease: "power3.inOut"
      },
      1.2
    )

    .to(truck, {
      y: 7,
      duration: 0.16,
      ease: "power2.out"
    })

    .to(truck, {
      y: 0,
      duration: 0.28,
      ease: "power2.inOut"
    })

    .to(
      headlights,
      {
        opacity: 0.32,
        duration: 0.4
      },
      "<"
    )

    .to(
      popup,
      {
        y: "0%",
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power4.out"
      },
      "+=0.25"
    )

    .to(
      popupItems,
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out"
      },
      "-=0.5"
    )

    .to(
      {},
      {
        duration: 1.2
      }
    )

    .to(popupItems, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.04
    })

    .to(
      popup,
      {
        y: "-20%",
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
        ease: "power3.in"
      },
      "-=0.15"
    )

    .to(
      headlights,
      {
        opacity: 0.72,
        scale: 1.08,
        duration: 0.4
      },
      "+=0.15"
    )

    .to(truck, {
      x: "125vw",
      scale: 1.06,
      duration: 3,
      ease: "power2.in"
    })

    .to(
      headlights,
      {
        opacity: 0,
        duration: 0.6
      },
      "-=0.7"
    )

    .to(
      finalScreen,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.25"
    )

    .to(finalName, {
      opacity: 1,
      y: 0,
      letterSpacing: "0.18em",
      duration: 0.8,
      ease: "power3.out"
    })

    .to(
      finalTitle,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out"
      },
      "-=0.35"
    )

    .to(
      {},
      {
        duration: 0.65
      }
    )

    .to(flash, {
      opacity: 1,
      duration: 0.18
    })

    .to(preloader, {
      opacity: 0,
      duration: 0.55,
      ease: "power2.out"
    });

  return tl;
}