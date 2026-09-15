import gsap from "gsap";

export const initContactForm = (form) => {
  if (!form) return;

  const fields = form.querySelectorAll("[data-form-field]");
  const button = form.querySelector("[data-send-button]");
  const scan = form.querySelector("[data-form-scan]");

  // Initial state
  gsap.set(fields, {
    opacity: 1,
    y: 0,
  });

  // --------------------------------
  // INPUT FOCUS ANIMATION
  // --------------------------------

  fields.forEach((field) => {
    const input = field.querySelector("input, textarea");

    if (!input) return;

    input.addEventListener("focus", () => {
      gsap.to(field, {
        x: 4,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    input.addEventListener("blur", () => {
      gsap.to(field, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // --------------------------------
  // BUTTON HOVER
  // --------------------------------

  const buttonEnter = () => {
    gsap.to(button, {
      y: -3,
      duration: 0.3,
      ease: "power3.out",
    });

    if (scan) {
      gsap.fromTo(
        scan,
        {
          opacity: 0,
          x: "-100%",
        },
        {
          opacity: 1,
          x: "500%",
          duration: 0.9,
          ease: "power2.inOut",
        }
      );
    }
  };

  const buttonLeave = () => {
    gsap.to(button, {
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });

    if (scan) {
      gsap.to(scan, {
        opacity: 0,
        duration: 0.2,
      });
    }
  };

  button?.addEventListener("mouseenter", buttonEnter);
  button?.addEventListener("mouseleave", buttonLeave);

  // --------------------------------
  // CLEANUP
  // --------------------------------

  return () => {
    fields.forEach((field) => {
      const input = field.querySelector("input, textarea");

      input?.removeEventListener("focus", () => {});
      input?.removeEventListener("blur", () => {});
    });

    button?.removeEventListener("mouseenter", buttonEnter);
    button?.removeEventListener("mouseleave", buttonLeave);

    gsap.killTweensOf(fields);
    gsap.killTweensOf(button);
    gsap.killTweensOf(scan);
  };
};