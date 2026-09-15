const ContactLinks = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
    },
    {
      name: "Email",
      url: "mailto:your@email.com",
    },
  ];

  return (
    <div
      data-contact-links
      className="flex flex-wrap gap-x-8 gap-y-3"
    >
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.name === "Email" ? undefined : "_blank"}
          rel={
            link.name === "Email"
              ? undefined
              : "noopener noreferrer"
          }
          className="
            group
            flex
            items-center
            gap-2
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-white/40
            transition-colors
            hover:text-white
          "
        >
          <span>{link.name}</span>

          <span
            className="
              translate-y-1
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            ↗
          </span>
        </a>
      ))}
    </div>
  );
};

export default ContactLinks;