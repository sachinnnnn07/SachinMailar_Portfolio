import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineExternalLink,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { FaGithub, FaLinkedinIn, FaCode, FaHackerrank } from "react-icons/fa";
import { liveProjects, personalInfo } from "../data";
import { useTheme } from "../ThemeContext";

const allProjects = [...liveProjects];

type Project = (typeof liveProjects)[number];

const glowColors = [
  { dark: "#a855f7, #ec4899, #8b5cf6, #d946ef, #a855f7", light: "#7c3aed, #db2777, #6d28d9, #c026d3, #7c3aed" },
  { dark: "#10b981, #06b6d4, #14b8a6, #22d3ee, #10b981", light: "#059669, #0891b2, #0d9488, #06b6d4, #059669" },
  { dark: "#f59e0b, #ef4444, #f97316, #eab308, #f59e0b", light: "#d97706, #dc2626, #ea580c, #ca8a04, #d97706" },
  { dark: "#3b82f6, #8b5cf6, #6366f1, #a78bfa, #3b82f6", light: "#2563eb, #7c3aed, #4f46e5, #8b5cf6, #2563eb" },
  { dark: "#ec4899, #f43f5e, #d946ef, #fb7185, #ec4899", light: "#db2777, #e11d48, #c026d3, #f43f5e, #db2777" },
];

function ProjectCard({ project, idx, isDark, gradient }: { project: Project; idx: number; isDark: boolean; gradient: string }) {
  const [hovered, setHovered] = useState(false);
  const year = getYear(project.period);
  const fresh = isNew(project.period);
  const image = "image" in project ? (project as { image?: string }).image : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((h) => !h)}
      className="group relative rounded-2xl cursor-default p-[1px]"
    >
      {/* Animated glow border */}
      <div
        className="absolute -inset-px rounded-2xl opacity-40 group-hover:opacity-100 blur-[2px] group-hover:blur-xs transition-all duration-500"
        style={{
          background: `linear-gradient(270deg, ${isDark ? glowColors[idx % glowColors.length].dark : glowColors[idx % glowColors.length].light})`,
          backgroundSize: "300% 300%",
          animation: "glowSpin 4s ease infinite",
        }}
      />

      {/* Card body */}
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-dark-light/90 shadow-lg shadow-black/10 group-hover:shadow-xl group-hover:shadow-accent/10"
            : "bg-white shadow-lg shadow-coffee-200/30 group-hover:shadow-xl group-hover:shadow-primary/15"
        }`}
      >
      {/* Preview image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-20 h-14 rounded-lg border-2 border-white/40" />
              <div className="absolute top-6 left-6 w-20 h-14 rounded-lg border-2 border-white/30 bg-white/10" />
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-2 border-white/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm" />
            </div>
            <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-6">
              {project.techStack.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 + 0.3 + i * 0.08 }}
                  className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content — swaps between summary and detail on hover */}
      <div className="p-5 sm:p-6">
        {/* Title — always visible */}
        <div className="flex items-center gap-2.5 mb-3">
          <h2 className={`text-lg font-bold leading-snug line-clamp-1 ${
            isDark ? "text-white" : "text-coffee-900"
          }`}>
            {project.title}
          </h2>
          <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            fresh
              ? "bg-green-500/15 text-green-500 border border-green-500/30"
              : isDark
                ? "bg-white/5 text-dark-muted border border-white/10"
                : "bg-coffee-100 text-coffee-500 border border-coffee-200"
          }`}>
            {fresh ? "NEW" : year}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!hovered ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className={`text-sm leading-relaxed line-clamp-3 ${
                isDark ? "text-gray-400" : "text-coffee-500"
              }`}>
                {project.description}
              </p>

              {/* Hover hint */}
              <div
                className={`flex items-center justify-center gap-2 mt-4 text-xs font-medium ${
                  isDark ? "text-accent/60" : "text-primary/50"
                }`}
                style={{ animation: "flipHint 2s ease-in-out infinite" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                </svg>
                <span className="hidden sm:inline">Hover to see more</span>
                <span className="sm:hidden">Tap to see more</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className={`text-sm leading-relaxed mb-4 ${
                isDark ? "text-gray-300" : "text-coffee-600"
              }`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      isDark
                        ? "bg-accent/10 text-accent-light border-accent/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isDark
                        ? "bg-accent text-white hover:bg-accent-light"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    <HiOutlineExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                      isDark
                        ? "border-white/15 text-gray-300 hover:bg-white/10 hover:text-white"
                        : "border-coffee-200 text-coffee-600 hover:bg-coffee-100 hover:text-coffee-900"
                    }`}
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      </div>
    </motion.div>
  );
}

const gradients = [
  "from-violet-500/80 via-fuchsia-500/70 to-pink-500/80",
  "from-emerald-500/80 via-teal-500/70 to-cyan-500/80",
  "from-amber-500/80 via-orange-500/70 to-red-500/80",
  "from-blue-500/80 via-indigo-500/70 to-purple-500/80",
  "from-rose-500/80 via-pink-500/70 to-fuchsia-500/80",
];

function getYear(period: string) {
  const match = period.match(/(\d{4})/);
  if (!match) {
    const shortMatch = period.match(/(\d{2})\/(\d{4})/);
    if (shortMatch) return shortMatch[2];
  }
  return match ? match[1] : "";
}

function isNew(period: string) {
  const year = getYear(period);
  return year === "2026";
}

export default function ProjectsShowcase() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [showSort, setShowSort] = useState(false);

  const projects = useMemo(() => {
    return [...allProjects].sort((a, b) => {
      const ya = parseInt(getYear(a.period)) || 0;
      const yb = parseInt(getYear(b.period)) || 0;
      return sortBy === "newest" ? yb - ya : ya - yb;
    });
  }, [sortBy]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-dark text-dark-text" : "bg-cream text-coffee-800"
      }`}
    >
      {/* Social sidebar */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {[
          { icon: <FaLinkedinIn />, href: personalInfo.linkedin, label: "LinkedIn", color: "#0A66C2" },
          { icon: <FaGithub />, href: personalInfo.github, label: "GitHub", color: "#f0f0f0" },
          { icon: <FaCode />, href: personalInfo.leetcode, label: "LeetCode", color: "#FFA116" },
          { icon: <FaHackerrank />, href: personalInfo.hackerrank, label: "HackerRank", color: "#2EC866" },
        ].map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg transition-all duration-300 ${
              isDark
                ? "border-white/10 bg-dark-light/50 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20"
                : "border-coffee-300/50 text-coffee-800 bg-white/50 backdrop-blur-sm hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20"
            }`}
            style={{ color: isDark ? social.color : undefined }}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* Header */}
      <div
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
          isDark ? "bg-dark/90 border-white/10" : "bg-cream/90 border-coffee-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-5">
              <Link
                to="/"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isDark
                    ? "text-dark-muted hover:text-white"
                    : "text-coffee-500 hover:text-coffee-900"
                }`}
              >
                <HiOutlineArrowLeft />
                Back
              </Link>
              <h1
                className={`text-2xl sm:text-3xl font-bold ${
                  isDark ? "text-white" : "text-coffee-900"
                }`}
              >
                Projects
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleTheme}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors ${
                  isDark
                    ? "bg-dark-lighter text-accent-light hover:bg-dark-lighter/80"
                    : "bg-coffee-200 text-coffee-700 hover:bg-coffee-300"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? "☀" : "☾"}
              </motion.button>
            </div>
          </div>

        </div>
      </div>


      {/* Toolbar: sort + count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isDark
                  ? "bg-dark-lighter/60 text-dark-text border-white/10 hover:border-white/20"
                  : "bg-white/80 text-coffee-700 border-coffee-200 hover:border-coffee-300"
              }`}
            >
              Sort by:{" "}
              <span className={isDark ? "text-accent-light" : "text-primary"}>
                {sortBy === "newest" ? "Newest" : "Oldest"}
              </span>
              <svg
                className={`w-3.5 h-3.5 transition-transform ${showSort ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full left-0 mt-2 rounded-xl border shadow-xl z-50 overflow-hidden ${
                    isDark
                      ? "bg-dark-light border-white/10"
                      : "bg-white border-coffee-200"
                  }`}
                >
                  {(["newest", "oldest"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setShowSort(false);
                      }}
                      className={`block w-full text-left px-5 py-2.5 text-sm transition-colors ${
                        sortBy === opt
                          ? isDark
                            ? "bg-accent/15 text-accent-light"
                            : "bg-primary/10 text-primary"
                          : isDark
                            ? "text-dark-text hover:bg-white/5"
                            : "text-coffee-700 hover:bg-coffee-50"
                      }`}
                    >
                      {opt === "newest" ? "Newest first" : "Oldest first"}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className={`text-sm ${isDark ? "text-dark-muted" : "text-coffee-400"}`}>
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              idx={idx}
              isDark={isDark}
              gradient={gradients[idx % gradients.length]}
            />
          ))}
        </div>


        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              isDark
                ? "text-dark-muted hover:text-white"
                : "text-coffee-400 hover:text-coffee-900"
            }`}
          >
            <HiOutlineArrowLeft />
            Back to Portfolio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
