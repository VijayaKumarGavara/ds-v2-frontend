import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
export default function Navbar({ toggleTheme, theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      ref={navRef}
      className="
        fixed top-0 z-30 w-full
        backdrop-blur-md
        bg-gradient-to-b
        from-light-bg/70 via-light-bg/50 to-light-bg/30
        dark:from-dark-bg/80 dark:via-dark-bg/60 dark:to-dark-bg/40
      ">
      <div className="flex items-center justify-between px-6 md:px-10 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 rounded-md bg-brand-500">
            <img src="/DS_new.png" alt="Dhanya Sethu Logo" />
          </div>
          <span className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-light-text dark:text-dark-text">
            Dhanya Sethu
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 font-body font-medium text-light-text dark:text-dark-text">
          {[
            { label: "Home", to: "home" },
            { label: "About", to: "about" },
            { label: "How it Works", to: "howitworks" },
            { label: "Features", to: "features" },
          ].map((item) => {
            return (
              <button
                onClick={() => {
                  handleScroll(item.to);
                  closeMenu();
                }}
                className="transition  text-sm md:text-base hover:text-light-text2 hover:dark:text-dark-text2">
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex gap-4 items-center">
          <Link
            to="/register"
            className="text-base font-medium rounded-full px-4 py-1 text-light-text dark:text-dark-text hover:text-light-text2 hover:dark:text-dark-text2">
            Sign Up
          </Link>

          <Link
            to="/login"
            className="rounded-full bg-brand-500 hover:bg-brand-600 px-4 py-1 text-base font-ui font-medium text-white transition">
            Login
          </Link>

          <button
            onClick={toggleTheme}
            className="rounded-full text-light-text dark:text-dark-text px-3 py-1 text-sm font-ui"
            aria-label="Toggle theme">
            {theme !== "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-light-text dark:text-dark-text text-xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}>
          {!isOpen ? <MenuIcon /> : <CloseIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="
            lg:hidden flex flex-col px-6 py-6 space-y-6 font-body
            bg-light-card/90 dark:bg-dark-card/90
            backdrop-blur-sm
            text-light-text dark:text-dark-text
          ">
          {[
            { label: "Home", to: "home" },
            { label: "About", to: "about" },
            { label: "How it Works", to: "howitworks" },
            { label: "Features", to: "features" },
          ].map((item) => {
            return (
              <button
                onClick={() => {
                  handleScroll(item.to);
                  closeMenu();
                }}
                className="transition hover:text-light-text2 hover:dark:text-dark-text2 max-w-max">
                {item.label}
              </button>
            );
          })}

          <div className="pt-4 border-t border-light-border dark:border-dark-border space-y-3">
            <Link
              to="/register"
              onClick={closeMenu}
              className="block hover:text-light-text2 hover:dark:text-dark-text2">
              Sign Up
            </Link>

            <Link
              to="/login"
              onClick={closeMenu}
              className="block max-w-max rounded-full bg-brand-500 hover:bg-brand-600 px-4 py-2 text-white transition">
              Login
            </Link>

            <button
              onClick={toggleTheme}
              className="rounded-full text-light-text dark:text-dark-text px-3 py-1 text-sm font-ui"
              aria-label="Toggle theme">
              {theme !== "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
