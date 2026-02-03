import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu when clicking outside
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

  return (
    <header
      ref={navRef}
      className="fixed top-0 z-30 w-full bg-gradient-to-b from-gray-500/80 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 rounded-md bg-emerald-600">
            <img src="/DS_new.png" alt="Dhanya Sethu Logo" />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight text-white">
            Dhanya Sethu
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-base md:text-lg font-body font-medium text-white">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <a href="#solutions" onClick={closeMenu}>Our Solutions</a>
          <a href="#howitworks" onClick={closeMenu}>How it Works</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          <Link to="/register" className="text-lg font-medium rounded-full px-4 py-1 text-white">
            Sign Up
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-green-600 font-medium px-4 py-1 text-lg text-white"
          >
            Login
          </Link>
        </div>

        <button
          className="md:hidden text-white text-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {!isOpen?'☰':'⛌'}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden  backdrop-blur-sm px-6 py-6 space-y-6 font-body text-white">
          <Link to="/" onClick={closeMenu} className="block">Home</Link>
          <a href="#solutions" onClick={closeMenu} className="block">Our Solutions</a>
          <a href="#howitworks" onClick={closeMenu} className="block">How it Works</a>
          <a href="#contact" onClick={closeMenu} className="block">Contact</a>

          <div className="pt-4 border-t border-white/20 space-y-3">
            <Link to="/register" onClick={closeMenu} className="block">
              Sign Up
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className="block rounded-full max-w-max bg-green-600 px-4 py-2 text-center"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
