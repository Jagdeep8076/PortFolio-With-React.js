import { useEffect, useRef } from "react";

import ContactBackground from "./ContactBackground";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactStatus from "./ContactStatus";
import ContactLinks from "./ContactLinks";

import { initContactIntro } from "./animations/contactIntro";
import { initContactInteraction } from "./animations/contactInteraction";

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanupIntro = initContactIntro(sectionRef.current);
    const cleanupInteraction = initContactInteraction(sectionRef.current);

    return () => {
      cleanupIntro?.();
      cleanupInteraction?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >
      <ContactBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1600px]
          flex-col
          px-6
          py-8
          md:px-10
          lg:px-16
          xl:px-20
        "
      >
        {/* TOP BAR */}

        <div
          data-contact-top
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-5
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.45em]
              text-white/50
            "
          >
            Contact / 06
          </span>

          <span
            className="
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/40
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-white
                shadow-[0_0_12px_rgba(255,255,255,0.8)]
              "
            />

            Available
          </span>
        </div>

        {/* MAIN */}

        <div
          className="
            flex
            flex-1
            flex-col
            justify-center
            gap-16
            py-16
            lg:flex-row
            lg:items-center
            lg:gap-20
          "
        >
          <ContactHero />

          <ContactForm />
        </div>

        {/* BOTTOM */}

        <div
          className="
            grid
            gap-10
            border-t
            border-white/10
            pt-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          <ContactStatus />

          <ContactLinks />

          <div
            data-contact-footer
            className="
              flex
              items-end
              justify-start
              text-[8px]
              uppercase
              tracking-[0.35em]
              text-white/25
              lg:justify-end
            "
          >
            © 2026 Jagdeep Singh
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;