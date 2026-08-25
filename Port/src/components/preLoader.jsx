import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

const sidebarItems = [
  { name: "Home", path: "/" },
  { name: "Pages", path: "/pages" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Path", path: "/path" },
  { name: "Experience", path: "/experience" },
  { name: "Project", path: "/project" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
      });

      // Logo animation
      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Menu button animation
      tl.fromTo(
        menuRef.current,
        {
          opacity: 0,
          scale: 0.7,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  // Sidebar animation
  useEffect(() => {
    if (!sidebarRef.current) return;

    if (isSidebarOpen) {
      gsap.to(sidebarRef.current, {
        x: "0%",
        duration: 0.7,
        ease: "power4.out",
      });

      gsap.fromTo(
        ".sidebar-link",
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isSidebarOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav
        ref={navbarRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[1000]
          w-full
        "
      >
        {/* ================= LOGO ================= */}

        <div
          ref={logoRef}
          className="
            pointer-events-auto
            absolute
            left-6
            top-6
            md:left-10
            md:top-8
            lg:left-12
            lg:top-10
          "
        >
          <NavLink
            to="/"
            className="
              font-[GeneralSans]
              text-lg
              font-medium
              tracking-[-0.04em]
              text-white
              md:text-xl
            "
          >
            Jagdeep Singh
          </NavLink>
        </div>

        {/* ================= MENU BUTTON ================= */}

        <div
          className="
            pointer-events-auto
            absolute
            right-6
            top-6
            md:right-10
            md:top-8
            lg:right-12
            lg:top-10
          "
        >
          <button
            ref={menuRef}
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/25
              bg-black/20
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-white
              hover:bg-white/10
            "
            aria-label="Toggle navigation"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`
                  absolute
                  h-[1.5px]
                  w-5
                  bg-white
                  transition-transform
                  duration-300
                  ${
                    isSidebarOpen
                      ? "rotate-45"
                      : "-translate-y-[4px]"
                  }
                `}
              />

              <span
                className={`
                  absolute
                  h-[1.5px]
                  w-5
                  bg-white
                  transition-opacity
                  duration-300
                  ${isSidebarOpen ? "opacity-0" : "opacity-100"}
                `}
              />

              <span
                className={`
                  absolute
                  h-[1.5px]
                  w-5
                  bg-white
                  transition-transform
                  duration-300
                  ${
                    isSidebarOpen
                      ? "-rotate-45"
                      : "translate-y-[4px]"
                  }
                `}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* ================= RIGHT SIDEBAR ================= */}

      <aside
        ref={sidebarRef}
        className="
          fixed
          right-0
          top-0
          z-[999]
          flex
          h-screen
          w-[85%]
          translate-x-full
          flex-col
          justify-center
          bg-black
          px-10
          sm:w-[60%]
          md:w-[45%]
          lg:w-[35%]
          lg:px-16
        "
      >
        <div className="mb-10 font-[GeneralSans] text-xs tracking-[0.25em] text-white/40">
          NAVIGATION
        </div>

        <div className="flex flex-col gap-5">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `
                sidebar-link
                font-[GeneralSans]
                text-3xl
                font-medium
                tracking-tight
                transition-all
                duration-300
                md:text-4xl
                ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:translate-x-2 hover:text-white"
                }
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div
          className="
            absolute
            bottom-8
            left-10
            right-10
            flex
            justify-between
            font-[GeneralSans]
            text-[10px]
            tracking-[0.2em]
            text-white/30
            lg:left-16
            lg:right-16
          "
        >
          <span>JAGDEEP SINGH</span>
          <span>2026</span>
        </div>
      </aside>
    </>
  );
};

export default Navbar;