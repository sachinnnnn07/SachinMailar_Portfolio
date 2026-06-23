import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineServer,
} from "react-icons/hi";
import { personalInfo } from "../data";
import { useTheme } from "../ThemeContext";

const stats = [
  { label: "Years Experience", value: "4.5+" },
  { label: "Projects Delivered", value: "15+" },
  { label: "Technologies", value: "20+" },
  { label: "Performance Gains", value: "30%" },
];

const highlights = [
  {
    icon: <HiOutlineCode className="text-2xl" />,
    title: "Full Stack Development",
    desc: "End-to-end development with C#, .NET Core, Angular, and React",
  },
  {
    icon: <HiOutlineServer className="text-2xl" />,
    title: "API Architecture",
    desc: "Secure RESTful APIs with OAuth 2.0, JWT, and Entity Framework",
  },
  {
    icon: <HiOutlineGlobe className="text-2xl" />,
    title: "Cloud Solutions",
    desc: "Azure App Services, Functions, Docker & Kubernetes deployments",
  },
  {
    icon: <HiOutlineLightningBolt className="text-2xl" />,
    title: "Performance Optimization",
    desc: "30% system performance improvements through optimization & tuning",
  },
];

const wordAnimation = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.02 },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const summaryWords = personalInfo.summary.split(" ");

  return (
    <section id="about" className="relative py-12 sm:py-16">
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? "text-white" : "text-coffee-900"
          }`}>
            About{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-10">
          {/* Text — word-by-word reveal */}
          <motion.p
            variants={wordAnimation}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`text-base sm:text-lg leading-relaxed text-justify flex flex-wrap ${
              isDark ? "text-gray-300" : "text-coffee-600"
            }`}
          >
            {summaryWords.map((word, i) => (
              <motion.span key={i} variants={letterAnimation} className="mr-1.5 mb-0.5 inline-block">
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Stats — fly in from different directions */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const directions = [
                { x: -60, y: -40 },
                { x: 60, y: -40 },
                { x: -60, y: 40 },
                { x: 60, y: 40 },
              ];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: directions[i].x, y: directions[i].y, scale: 0.9 }}
                  animate={isInView
                    ? { opacity: 1, x: 0, y: 0, scale: 1 }
                    : { opacity: 0, x: directions[i].x, y: directions[i].y, scale: 0.9 }
                  }
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`p-5 rounded-2xl border text-center transition-colors duration-300 ${
                    isDark
                      ? "bg-dark-light/60 border-white/5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10"
                      : "bg-white/60 border-coffee-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                  }`}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className={`text-xs sm:text-sm ${isDark ? "text-dark-muted" : "text-coffee-500"}`}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Highlight cards — fly up with stagger + blur */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`group p-6 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? "bg-dark-light/40 border-white/5 hover:border-accent/30 hover:bg-dark-light/60 hover:shadow-lg hover:shadow-accent/10"
                  : "bg-white/60 border-coffee-200 hover:border-primary/30 hover:bg-white/80 hover:shadow-lg hover:shadow-primary/10"
              }`}
            >
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isDark
                    ? "bg-accent/10 text-accent-light group-hover:bg-accent/20"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                }`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {item.icon}
              </motion.div>
              <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-coffee-800"}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? "text-dark-muted" : "text-coffee-500"}`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
