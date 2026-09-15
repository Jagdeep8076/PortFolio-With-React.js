import gsap from "gsap";

export function animateManifest({
  timeline,
  manifest,
  progress,
  progressBar,
  scanLine,
}) {
  const items =
    manifest.querySelectorAll(
      "[data-manifest-item]"
    );

  /* INITIAL ITEM STATE */

  gsap.set(items, {
    y: 18,
    opacity: 0,
  });

  /* --------------------------------
     MANIFEST ENTER
  -------------------------------- */

  timeline
    .to(
      manifest,
      {
        y: "0%",
        opacity: 1,
        duration: 0.75,
        ease: "power4.out",
      }
    )

    /* ITEMS */

    .to(
      items,
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: "power3.out",
      },
      "-=0.35"
    )

    /* PROGRESS */

    .to(
      progress,
      {
        textContent: 72,
        duration: 0.9,
        snap: {
          textContent: 1,
        },
        ease: "power2.inOut",
      },
      "<"
    )

    .to(
      progressBar,
      {
        width: "72%",
        duration: 0.9,
        ease: "power2.inOut",
      },
      "<"
    );

  /* --------------------------------
     SCAN
  -------------------------------- */

  timeline.to(
    scanLine,
    {
      opacity: 1,
      yPercent: 100,
      duration: 1.2,
      ease: "none",
    },
    "<"
  );

  /* --------------------------------
     HOLD
  -------------------------------- */

  timeline.to({}, {
    duration: 1,
  });

  /* --------------------------------
     MANIFEST EXIT
  -------------------------------- */

  timeline
    .to(items, {
      y: -10,
      opacity: 0,
      duration: 0.25,
      stagger: 0.035,
    })

    .to(
      manifest,
      {
        y: "-20%",
        opacity: 0,
        scale: 0.98,
        duration: 0.45,
        ease: "power3.in",
      },
      "-=0.1"
    );
}