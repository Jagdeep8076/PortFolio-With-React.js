const ContactBackground = () => {
  return (
    <div
      data-contact-background
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* GRID */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      {/* CENTER LIGHT */}

      <div
        data-contact-light
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.025]
          blur-[120px]
        "
      />

      {/* GRAIN */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.45%22/%3E%3C/svg%3E')]
        "
      />

      {/* HORIZONTAL LINE */}

      <div
        data-contact-line
        className="
          absolute
          left-0
          top-1/2
          h-px
          w-full
          origin-left
          scale-x-0
          bg-white/10
        "
      />
    </div>
  );
};

export default ContactBackground;