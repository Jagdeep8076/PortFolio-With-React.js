const ContactHero = () => {
  return (
    <div
      data-contact-hero
      className="
        w-full
        max-w-[750px]
      "
    >
      <p
        data-contact-label
        className="
          mb-8
          text-[9px]
          uppercase
          tracking-[0.5em]
          text-white/40
        "
      >
        Start a conversation
      </p>

      <h2
        data-contact-heading
        className="
          text-[clamp(3.5rem,9vw,9rem)]
          font-light
          uppercase
          leading-[0.82]
          tracking-[-0.05em]
        "
      >
        <span className="block overflow-hidden">
          <span className="contact-line block">
            Let's
          </span>
        </span>

        <span className="block overflow-hidden">
          <span className="contact-line block">
            Create
          </span>
        </span>

        <span className="block overflow-hidden">
          <span className="contact-line block">
            Something
          </span>
        </span>

        <span className="block overflow-hidden">
          <span className="contact-line block text-white/35">
            Worth
          </span>
        </span>

        <span className="block overflow-hidden">
          <span className="contact-line block">
            Remembering.
          </span>
        </span>
      </h2>

      <p
        data-contact-description
        className="
          mt-10
          max-w-md
          text-sm
          leading-7
          text-white/45
          md:text-base
        "
      >
        Have an idea, project, or opportunity?
        Let's turn it into something meaningful,
        functional, and built to last.
      </p>
    </div>
  );
};

export default ContactHero;