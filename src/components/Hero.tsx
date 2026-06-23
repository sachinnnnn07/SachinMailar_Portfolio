import { motion } from "framer-motion";
import {
  HiOutlineChevronDown,
  HiOutlineBriefcase,
  HiOutlineCode,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import { FaLinkedinIn, FaCode, FaHackerrank, FaGithub } from "react-icons/fa";
import { personalInfo } from "../data";
import { useTheme } from "../ThemeContext";
import Typewriter from "./Typewriter";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] ${
            isDark ? "bg-accent/20" : "bg-accent/10"
          }`}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[120px] ${
            isDark ? "bg-primary/20" : "bg-primary/10"
          }`}
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] ${
            isDark ? "bg-indigo-500/10" : "bg-coffee-300/20"
          }`}
        />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left — Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6 ${
                isDark
                  ? "border-accent/30 bg-accent/5 text-accent-light"
                  : "border-primary/30 bg-primary/5 text-primary"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4"
            >
              <span className={isDark ? "text-white" : "text-coffee-900"}>
                Hi, I'm{" "}
              </span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 h-12 sm:h-14 flex items-center justify-center lg:justify-start"
            >
              <div className={`text-xl sm:text-2xl md:text-3xl font-mono ${
                isDark ? "text-gray-300" : "text-coffee-700"
              }`}>
                <span role="img" aria-label="developer">👨‍💻</span>
                <span className="mx-2">
                  <Typewriter
                    phrases={["Full Stack Software Engineer"]}
                    className="font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                  />
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base sm:text-lg max-w-xl mb-10 leading-relaxed ${
                isDark ? "text-dark-muted" : "text-coffee-500"
              } mx-auto lg:mx-0`}
            >
              Translating complex business requirements into robust technical solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              {[
                { icon: <HiOutlineBriefcase className="text-accent text-lg" />, label: "EXPERIENCE", value: "4.5+", unit: "YRS", hoverColor: "group-hover:text-orange-500" },
                { icon: <HiOutlineCode className="text-blue-500 text-lg" />, label: "PROJECTS", value: "3+", unit: "DEL", hoverColor: "group-hover:text-blue-500" },
                { icon: <HiOutlineLightningBolt className="text-red-500 text-lg" />, label: "CAFFEINE", value: "∞", unit: "ml", hoverColor: "group-hover:text-red-500" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className={`group flex flex-col px-5 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "bg-dark-light/60 border-white/5 hover:border-accent/30"
                      : "bg-white/60 border-coffee-200 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {stat.icon}
                    <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                      isDark ? "text-dark-muted" : "text-coffee-400"
                    }`}>{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-2xl font-bold transition-colors duration-300 ${isDark ? "text-white" : "text-coffee-900"} ${stat.hoverColor}`}>{stat.value}</span>
                    <span className={`text-xs font-medium ${isDark ? "text-dark-muted" : "text-coffee-400"}`}>{stat.unit}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4"
        >
          {[
            { icon: <FaLinkedinIn />, href: personalInfo.linkedin, label: "LinkedIn", hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10" },
            { icon: <FaGithub />, href: personalInfo.github, label: "GitHub", hoverClass: "hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10" },
            { icon: <FaCode />, href: personalInfo.leetcode, label: "LeetCode", hoverClass: "hover:text-[#FFA116] hover:border-[#FFA116]/50 hover:bg-[#FFA116]/10" },
            { icon: <FaHackerrank />, href: personalInfo.hackerrank, label: "HackerRank", hoverClass: "hover:text-[#2EC866] hover:border-[#2EC866]/50 hover:bg-[#2EC866]/10" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? `border-dark-lighter text-dark-muted ${social.hoverClass}`
                  : `border-coffee-300 text-coffee-500 ${social.hoverClass}`
              }`}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
          </div>

          {/* Right — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
            className="relative shrink-0 overflow-visible"
          >
            <div className={`relative rounded-full p-1.5 ${
              isDark
                ? "bg-gradient-to-br from-accent via-primary to-accent-light"
                : "bg-gradient-to-br from-primary via-accent to-primary-light"
            }`}>
              <img
                src="/Image.png"
                alt="Sachin Mailar"
                className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full object-cover"
                style={{ objectPosition: "center 15%", borderWidth: 6, borderStyle: "solid", borderColor: isDark ? "#1a1a1a" : "#faf6f0" }}
              />
            </div>
            {/* Decorative ring — hidden on small mobile */}
            <div className={`hidden sm:block absolute inset-0 rounded-full border-2 border-dashed animate-spin ${
              isDark ? "border-accent/40" : "border-primary/30"
            }`} style={{ animationDuration: "15s", margin: "-12px" }} />
            {/* Glow behind */}
            <div className={`absolute inset-0 rounded-full blur-[60px] -z-10 ${
              isDark ? "bg-accent/15" : "bg-primary/10"
            }`} />
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isDark ? "text-dark-muted hover:text-accent" : "text-coffee-400 hover:text-primary"
          }`}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <HiOutlineChevronDown className="text-xl animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
