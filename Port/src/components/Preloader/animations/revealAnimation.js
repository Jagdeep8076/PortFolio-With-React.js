import gsap from "gsap";

export function animateReveal({
  timeline,

  finalReveal,
  flash,
  preloader,

  progress,
  progressBar,

  onComplete,
}) {
  const name =
    finalReveal.querySelector(
      "[data-final-name]"
    );

  const title =
    finalReveal.querySelector(
      "[data-final-title]"
    );

  /* INITIAL */

  gsap.set(name, {
    opacity: 0,
    y: 30,
    letterSpacing: "0.3em",
  });

  gsap.set(title, {
    opacity: 0,
    y: 20,
    scale: 0.95,
  });

  /* --------------------------------
     REVEAL SCREEN
  -------------------------------- */

  timeline
    .to(finalReveal, {
      opacity: 1,
      duration: 0.55,
      ease: "power2.out",
    })

    /* 100% */

    .to(
      progress,
      {
        textContent: 100,
        duration: 0.5,
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
        width: "100%",
        duration: 0.5,
        ease: "none",
      },
      "<"
    );

  /* --------------------------------
     NAME
  -------------------------------- */

  timeline.to(name, {
    opacity: 1,
    y: 0,
    letterSpacing: "0.18em",
    duration: 0.8,
    ease: "power3.out",
  });

  /* --------------------------------
     TITLE
  -------------------------------- */

  timeline.to(
    title,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.35"
  );

  /* --------------------------------
     HOLD
  -------------------------------- */

  timeline.to({}, {
    duration: 0.7,
  });

  /* --------------------------------
     FLASH
  -------------------------------- */

  timeline
    .to(flash, {
      opacity: 1,
      duration: 0.1,
      ease: "power2.in",
    })

    /* --------------------------------
       PRELOADER EXIT
    -------------------------------- */

    .to(preloader, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })

    .call(() => {
      onComplete?.();
    });
}