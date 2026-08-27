import { useState } from "react";
import { NavLink } from "react-router-dom";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed left-0 top-0 z-[1000] w-full">
        {/* Top Left Logo */}
        <NavLink
          to="/"
          className="absolute left-6 top-6 font-[GeneralSans] text-xl font-medium tracking-[-0.04em] text-white md:left-10 md:top-8 lg:left-12 lg:top-10"
        >
          Jagdeep Singh
        </NavLink>

        {/* Top Right Menu */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/10 md:right-10 md:top-8 lg:right-12 lg:top-10"
          aria-label="Toggle navigation"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span
              className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-300 ${
                isOpen ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-5 bg-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-300 ${
                isOpen ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ================= RIGHT SIDEBAR ================= */}
      <aside
        className={`fixed right-0 top-0 z-[999] flex h-screen w-[85%] flex-col justify-center bg-black px-10 transition-transform duration-500 ease-in-out sm:w-[60%] md:w-[45%] lg:w-[35%] lg:px-16 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-10">
          <p className="font-[GeneralSans] text-xs tracking-[0.3em] text-white/40">
            NAVIGATION
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-[GeneralSans] text-3xl font-medium tracking-tight transition-all duration-300 md:text-4xl ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:translate-x-2 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="absolute bottom-8 left-10 right-10 flex justify-between font-[GeneralSans] text-[10px] tracking-[0.2em] text-white/30 lg:left-16 lg:right-16">
          <span>JAGDEEP SINGH</span>
          <span>2026</span>
        </div>
      </aside>
    </>
  );
};

export default Navbar;