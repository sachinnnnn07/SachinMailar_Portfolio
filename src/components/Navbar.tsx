import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { navLinks } from "../data";
import { useTheme } from "../ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isDark = theme === "dark";
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? "bg-dark/90 backdrop-blur-xl shadow-lg shadow-black/30"
            : "bg-coffee-900/95 backdrop-blur-xl shadow-lg shadow-coffee-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.a
            href="#home"
            className="text-xl sm:text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-accent">&lt;</span>
            <span className={isDark || scrolled ? "text-white" : "text-coffee-900"}>Sachin</span>
            <span className="text-accent"> /&gt;</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className={`relative px-4 py-2 text-base font-semibold transition-all duration-300 group ${
                  isDark || scrolled ? "text-gray-300 hover:text-accent" : "text-coffee-600 hover:text-accent"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDark || scrolled
                  ? "bg-white/10 text-accent-light hover:bg-white/15"
                  : "bg-coffee-200 text-coffee-700 hover:bg-coffee-300"
              }`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="#contact"
              className="hidden md:inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>

            <button
              className={`md:hidden p-2 ${isDark || scrolled ? "text-white" : "text-coffee-800"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden backdrop-blur-xl overflow-hidden ${
              isDark ? "bg-dark/95" : "bg-cream/95"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-6 h-full pb-20">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`text-2xl font-medium transition-colors ${
                    isDark ? "text-dark-muted hover:text-accent" : "text-coffee-600 hover:text-accent-dark"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent via-primary to-accent-light"
        style={{ scaleX }}
      />
    </motion.nav>
  );
}
