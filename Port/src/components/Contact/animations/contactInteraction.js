import gsap from "gsap";

export const initContactInteraction = (section) => {
  if (!section) return;

  const form = section.querySelector("[data-contact-form]");
  const light = section.querySelector("[data-contact-light]");
  const scan = section.querySelector("[data-form-scan]");

  if (!form) return;

  const moveLight = (event) => {
    const rect = section.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    gsap.to(light, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 1.2,
      ease: "power3.out",
    });
  };

  const handleFormEnter = () => {
    gsap.to(scan, {
      opacity: 1,
      x: form.offsetWidth,
      duration: 1.4,
      ease: "power2.inOut",
      repeat: -1,
    });
  };

  const handleFormLeave = () => {
    gsap.killTweensOf(scan);

    gsap.to(scan, {
      opacity: 0,
      x: 0,
      duration: 0.3,
    });
  };

  section.addEventListener("mousemove", moveLight);
  form.addEventListener("mouseenter", handleFormEnter);
  form.addEventListener("mouseleave", handleFormLeave);

  return () => {
    section.removeEventListener("mousemove", moveLight);
    form.removeEventListener("mouseenter", handleFormEnter);
    form.removeEventListener("mouseleave", handleFormLeave);

    gsap.killTweensOf(light);
    gsap.killTweensOf(scan);
  };
};