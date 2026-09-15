const ContactStatus = () => {
  return (
    <div data-contact-status>
      <p
        className="
          mb-4
          text-[8px]
          uppercase
          tracking-[0.4em]
          text-white/25
        "
      >
        Current Status
      </p>

      <div className="flex items-center gap-3">
        <span
          className="
            h-2
            w-2
            rounded-full
            bg-white
            shadow-[0_0_15px_rgba(255,255,255,0.8)]
          "
        />

        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-white/70
          "
        >
          Available for opportunities
        </p>
      </div>

      <p
        className="
          mt-4
          text-[9px]
          uppercase
          tracking-[0.25em]
          text-white/25
        "
      >
        India · Remote · Worldwide
      </p>
    </div>
  );
};

export default ContactStatus;