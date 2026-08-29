import { useState } from "react";

const sidebarItems = [
  { number: "01", name: "Home", path: "#home" },
  { number: "02", name: "About", path: "#about" },
  { number: "03", name: "Skills", path: "#skills" },
  { number: "04", name: "Projects", path: "#projects" },
  { number: "05", name: "Experience", path: "#experience" },
  { number: "06", name: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path) => {
    setIsOpen(false);

    const element = document.querySelector(path);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>

      <nav className="absolute left-0 top-0 z-[1000] w-full">

        <button
          type="button"
          onClick={() => handleNavigation("#home")}
          className="
            absolute
            left-6
            top-6
            cursor-pointer
            border-none
            bg-transparent
            p-0
            font-[GeneralSans]
            text-xl
            font-medium
            tracking-[-0.04em]
            text-white
            outline-none
            md:left-10
            md:top-8
            lg:left-12
            lg:top-10
          "
        >
          Jagdeep Singh
        </button>

        {/* ================= MENU BUTTON ================= */}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            absolute
            right-6
            top-6
            flex
            h-12
            w-12
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/30
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-white
            hover:bg-white/10
            md:right-10
            md:top-8
            lg:right-12
            lg:top-10
          "
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            {/* TOP LINE */}

            <span
              className={`
                absolute
                h-[1.5px]
                w-5
                bg-white
                transition-transform
                duration-300
                ${
                  isOpen
                    ? "rotate-45"
                    : "-translate-y-[4px]"
                }
              `}
            />

            {/* MIDDLE LINE */}

            <span
              className={`
                absolute
                h-[1.5px]
                w-5
                bg-white
                transition-opacity
                duration-300
                ${
                  isOpen
                    ? "opacity-0"
                    : "opacity-100"
                }
              `}
            />

            {/* BOTTOM LINE */}

            <span
              className={`
                absolute
                h-[1.5px]
                w-5
                bg-white
                transition-transform
                duration-300
                ${
                  isOpen
                    ? "-rotate-45"
                    : "translate-y-[4px]"
                }
              `}
            />
          </span>
        </button>
      </nav>

      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed
          inset-0
          z-[980]
          bg-black/50
          backdrop-blur-[2px]
          transition-all
          duration-500
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          RIGHT SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          right-0
          top-0
          z-[990]
          flex
          h-screen
          w-[85%]
          flex-col
          justify-center
          bg-black
          px-10
          shadow-[-20px_0_60px_rgba(0,0,0,0.4)]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.77,0,0.175,1)]
          sm:w-[60%]
          md:w-[45%]
          lg:w-[35%]
          lg:px-16
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* ================= TOP LABEL ================= */}

        <div
          className="
            absolute
            left-10
            top-10
            lg:left-16
            lg:top-12
          "
        >
          <p
            className="
              font-[GeneralSans]
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/40
            "
          >
            Navigation
          </p>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="flex flex-col gap-5">
          {sidebarItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() =>
                handleNavigation(item.path)
              }
              className="
                group
                flex
                cursor-pointer
                items-center
                gap-4
                border-none
                bg-transparent
                p-0
                text-left
                outline-none
              "
            >
              {/* NUMBER */}

              <span
                className="
                  w-6
                  shrink-0
                  font-[GeneralSans]
                  text-[9px]
                  tracking-[0.15em]
                  text-white/25
                  transition-colors
                  duration-300
                  group-hover:text-white/70
                "
              >
                {item.number}
              </span>

              {/* NAME */}

              <span
                className="
                  font-[GeneralSans]
                  text-3xl
                  font-medium
                  uppercase
                  tracking-[-0.04em]
                  text-white/50
                  transition-all
                  duration-300
                  group-hover:translate-x-2
                  group-hover:text-white
                  md:text-4xl
                "
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* ================= BOTTOM INFO ================= */}

        <div
          className="
            absolute
            bottom-8
            left-10
            right-10
            flex
            items-end
            justify-between
            border-t
            border-white/10
            pt-5
            lg:left-16
            lg:right-16
          "
        >
          {/* LEFT */}

          <div className="flex flex-col gap-1">
            <span
              className="
                font-[GeneralSans]
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              Based in India
            </span>

            <span
              className="
                font-[GeneralSans]
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/50
              "
            >
              Frontend Developer
            </span>
          </div>

          {/* RIGHT */}

          <span
            className="
              font-[GeneralSans]
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/30
            "
          >
            2026
          </span>
        </div>
      </aside>
    </>
  );
};

export default Navbar;