import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../ThemeContext";
import TechGlobe from "./TechGlobe";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="skills" className="relative py-12 sm:py-16">

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? "text-white" : "text-coffee-900"
          }`}>
            Skills &{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            isDark ? "text-dark-muted" : "text-coffee-500"
          }`}>
            Explore my technology stack — an interactive globe of tools and
            frameworks I work with daily.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TechGlobe />
        </motion.div>
      </div>
    </section>
  );
}
