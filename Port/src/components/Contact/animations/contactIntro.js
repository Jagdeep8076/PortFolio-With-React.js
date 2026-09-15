import gsap from "gsap";

export const initContactIntro = (section) => {
  if (!section) return;

  const ctx = gsap.context(() => {
    const timeline = gsap.timeline({
      paused: true,
    });

    timeline
      .fromTo(
        "[data-contact-background]",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      )

      .fromTo(
        "[data-contact-top]",
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )

      .fromTo(
        ".contact-line",
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.3"
      )

      .fromTo(
        "[data-contact-label]",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.7"
      )

      .fromTo(
        "[data-contact-description]",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )

      .fromTo(
        "[data-contact-form]",
        {
          y: 60,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.7"
      )

      .fromTo(
        "[data-form-field]",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5"
      )

      .fromTo(
        "[data-contact-status], [data-contact-links], [data-contact-footer]",
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.2"
      );

    timeline.play();

    gsap.fromTo(
      "[data-contact-line]",
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power4.inOut",
        delay: 0.5,
      }
    );
  }, section);

  return () => ctx.revert();
};