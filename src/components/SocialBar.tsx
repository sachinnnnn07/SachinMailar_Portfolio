import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaCode, FaHackerrank } from "react-icons/fa";
import { personalInfo } from "../data";
import { useTheme } from "../ThemeContext";

const socials = [
  { icon: <FaLinkedinIn />, href: personalInfo.linkedin, label: "LinkedIn", color: "#0A66C2" },
  { icon: <FaGithub />, href: personalInfo.github, label: "GitHub", color: "#f0f0f0" },
  { icon: <FaCode />, href: personalInfo.leetcode, label: "LeetCode", color: "#FFA116" },
  { icon: <FaHackerrank />, href: personalInfo.hackerrank, label: "HackerRank", color: "#2EC866" },
];

export default function SocialBar() {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg transition-all duration-300 ${
                isDark
                  ? "border-white/10 bg-dark-light/50 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20"
                  : "border-coffee-300/50 text-coffee-800 bg-white/50 backdrop-blur-sm hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20"
              }`}
              style={{
                color: isDark ? social.color : undefined,
                boxShadow: isDark ? "0 0 10px rgba(199,140,60,0.1)" : "0 0 10px rgba(139,94,60,0.1)",
              }}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
