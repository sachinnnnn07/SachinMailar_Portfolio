import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineLightningBolt,
  HiOutlineBriefcase,
  HiOutlineCode,
  HiOutlineAcademicCap,
  HiOutlineMail,
} from "react-icons/hi";
import { useTheme } from "../ThemeContext";

const sections = [
  { id: "home", icon: <HiOutlineHome />, label: "Home" },
  { id: "about", icon: <HiOutlineUser />, label: "About" },
  { id: "skills", icon: <HiOutlineLightningBolt />, label: "Skills" },
  { id: "experience", icon: <HiOutlineBriefcase />, label: "Experience" },
  { id: "projects", icon: <HiOutlineCode />, label: "Projects" },
  { id: "education", icon: <HiOutlineAcademicCap />, label: "Education" },
  { id: "contact", icon: <HiOutlineMail />, label: "Contact" },
];

export default function SideNav() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1">
      {/* Track line */}
      <div className={`absolute inset-0 w-px left-1/2 -translate-x-1/2 ${
        isDark ? "bg-white/5" : "bg-coffee-200/50"
      }`} />

      {sections.map((section, i) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="relative group flex items-center"
            onMouseEnter={() => setHovered(section.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {hovered === section.id && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-full mr-3 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                    isDark ? "bg-dark-lighter text-white" : "bg-coffee-800 text-cream"
                  }`}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
              className="relative p-1.5"
            >
              {/* Active ring */}
              {isActive && (
                <motion.div
                  layoutId="activeRing"
                  className={`absolute inset-0 rounded-full border-2 ${
                    isDark ? "border-accent" : "border-primary"
                  }`}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              {/* Dot / Icon */}
              <div
                className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? "bg-accent/20 text-accent scale-110 shadow-lg shadow-accent/20"
                      : "bg-primary/15 text-primary scale-110 shadow-lg shadow-primary/20"
                    : isDark
                      ? "bg-dark-light/80 text-dark-muted hover:text-accent hover:bg-dark-lighter hover:shadow-md hover:shadow-accent/10"
                      : "bg-white/80 text-coffee-800 hover:text-primary hover:bg-coffee-100 hover:shadow-md hover:shadow-primary/10"
                }`}
                style={{ boxShadow: isActive ? undefined : isDark ? "0 0 8px rgba(199,140,60,0.08)" : "0 0 8px rgba(139,94,60,0.08)" }}
              >
                {section.icon}
              </div>
            </motion.div>
          </a>
        );
      })}
    </div>
  );
}
