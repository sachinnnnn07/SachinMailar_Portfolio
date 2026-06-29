import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineExternalLink,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { projects, personalInfo } from "../data";
import { useTheme } from "../ThemeContext";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const codeLines = [
  { indent: 0, text: 'function greet() {' },
  { indent: 1, text: 'const h = new Date().getHours();' },
  { indent: 1, text: 'const msg = h<12 ? "Morning"' },
  { indent: 2, text: ': h<18 ? "Afternoon" : "Evening";' },
  { indent: 1, text: 'const d = new Date().toLocaleDateString();' },
  { indent: 1, text: 'return `Good ${msg}! | ${d}`;' },
  { indent: 0, text: '}' },
  { indent: 0, text: 'console.log(greet());' },
];


function TechTypewriter({ techs, isDark }: { techs: string[]; isDark: boolean }) {
  const line = `[ ${techs.join(", ")} ]`;
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      const restart = setTimeout(() => {
        setCharIdx(0);
        setDone(false);
      }, 4000);
      return () => clearTimeout(restart);
    }

    if (charIdx >= line.length) {
      setDone(true);
      return;
    }

    const speed = 35 + Math.random() * 30;
    const timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [charIdx, done, line]);

  const displayed = line.slice(0, charIdx);

  return (
    <div className={`font-mono text-xs rounded-lg px-3 py-2 ${
      isDark ? "bg-[#1a1b26] border border-[#2a2b3a]" : "bg-[#1e1e2e] border border-[#313244]"
    }`}>
      <span className="text-[#565869] mr-2">$</span>
      <span className="text-[#bb9af7]">const </span>
      <span className="text-[#c0caf5]">stack </span>
      <span className="text-[#89ddff]">= </span>
      <span className="text-[#9ece6a]">{displayed}</span>
      {!done && <span className="text-[#7aa2f7]" style={{ animation: "blink 0.7s step-end infinite" }}>|</span>}
    </div>
  );
}

function ProjectCard({ project, isDark }: { project: typeof projects[0]; isDark: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => window.open(project.link, "_blank")}
    >
      <div
        className="relative w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="relative rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Hover progress border */}
          <div className="absolute -inset-px rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="progress-border-proj"
              style={{
                position: "absolute",
                inset: "-50%",
                animation: "borderSpin 3s linear infinite",
              }}
            />
          </div>
          <div
            className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
              isDark
                ? "bg-dark-light/95 hover:shadow-xl hover:shadow-purple-500/5"
                : "bg-white hover:shadow-xl hover:shadow-purple-500/10"
            }`}
          >

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${
                isDark ? "text-white" : "text-coffee-900"
              }`}>
                {project.title}
              </h3>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold text-base hover:underline inline-flex items-center gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                Live Site
                <HiOutlineExternalLink className="text-xs opacity-60" />
              </a>
            </div>
            <span className={`text-lg sm:text-xl font-semibold shrink-0 ${
              isDark ? "text-dark-muted" : "text-coffee-400"
            }`}>
              {project.period}
            </span>
          </div>

          <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
            isDark ? "text-gray-300" : "text-coffee-600"
          }`}>
            {project.description}
          </p>

          <div className={`flex flex-wrap items-center gap-3 text-xs mb-4 ${
            isDark ? "text-dark-muted" : "text-coffee-500"
          }`}>
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendar className="text-accent" />
              {project.period}
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineLocationMarker className="text-accent" />
              {project.location}
            </span>
          </div>

          <TechTypewriter techs={project.techStack} isDark={isDark} />

          {/* Flip hint */}
          <div className={`flex items-center justify-center gap-2 mt-4 text-xs font-medium ${
            isDark ? "text-accent/60" : "text-primary/50"
          }`} style={{ animation: "flipHint 2s ease-in-out infinite" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
            </svg>
            <span className="hidden sm:inline">Hover to flip</span>
            <span className="sm:hidden">Tap to flip</span>
          </div>

          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Animated border glow */}
          <div className="absolute -inset-px rounded-2xl overflow-hidden">
            <div
              className="progress-border-proj"
              style={{
                position: "absolute",
                inset: "-50%",
                animation: "borderSpin 3s linear infinite",
              }}
            />
          </div>

          <div
            className={`relative h-full p-6 sm:p-8 rounded-2xl overflow-y-auto scrollbar-hide ${
              isDark ? "bg-dark-light" : "bg-white"
            }`}
          >
            <h3 className={`text-lg sm:text-xl font-bold mb-4 ${
              isDark ? "text-white" : "text-coffee-900"
            }`}>
              What I Did Here
            </h3>

            <ul className="space-y-3">
              {project.highlights.map((point, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-coffee-600"
                  }`}
                >
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                    isDark ? "bg-accent" : "bg-primary"
                  }`} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Scroll down glass indicator */}
            <div className={`sticky bottom-0 left-0 right-0 flex flex-col items-center pb-4 pt-10 rounded-b-2xl ${
              isDark
                ? "bg-gradient-to-t from-dark-light via-dark-light/90 to-transparent"
                : "bg-gradient-to-t from-white via-white/90 to-transparent"
            }`}>
              <div className={`px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md flex items-center gap-2 ${
                isDark
                  ? "bg-white/10 text-white/70 border border-white/10"
                  : "bg-black/5 text-coffee-500 border border-coffee-200/50"
              }`} style={{ animation: "scrollBounce 2s ease-in-out infinite" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                Scroll down
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="projects" className="relative py-12 sm:py-16">
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? "text-white" : "text-coffee-900"
          }`}>
            Project &{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GitHub
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left — Project cards */}
          <div className="flex flex-col gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.2, ease: [0.25, 0.1, 0, 1] }}
              >
                <ProjectCard project={project} isDark={isDark} />
              </motion.div>
            ))}
          </div>

          {/* Right — GitHub terminal card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl overflow-hidden border bg-[#1a1b26] border-[#2a2b3a] shadow-2xl shadow-black/20 flex flex-col"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#15161e] border-b border-[#2a2b3a]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[#565869] text-xs font-mono ml-2">~/sachin-mailar</span>
            </div>

            <CodeTypewriter lines={codeLines} />

            <div className="px-4 pb-4 pt-1 flex gap-3 mt-auto">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#238636]/25"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaGithub className="text-base" />
                GitHub
              </motion.a>
              <Link to="/projects" className="flex-1">
                <motion.div
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <HiOutlineExternalLink className="text-base" />
                  Live Projects
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CodeTypewriter({ lines }: { lines: { indent: number; text: string }[] }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      const restart = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
        setDone(false);
      }, 3000);
      return () => clearTimeout(restart);
    }

    if (lineIdx >= lines.length) {
      setDone(true);
      return;
    }

    const currentLine = lines[lineIdx].text;
    if (charIdx < currentLine.length) {
      const speed = 30 + Math.random() * 40;
      const timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [lineIdx, charIdx, done, lines]);

  return (
    <div className="px-4 py-3 font-mono text-xs leading-relaxed flex-1">
      {lines.map((line, i) => {
        if (i > lineIdx) return null;
        const displayText = i === lineIdx ? line.text.slice(0, charIdx) : line.text;
        const showCursor = i === lineIdx && !done;

        return (
          <div key={i} className="flex">
            <span className="text-[#565869] w-5 text-right mr-3 select-none text-[11px] leading-relaxed">
              {i + 1}
            </span>
            <span style={{ paddingLeft: `${line.indent * 16}px` }}>
              {colorizeCode(displayText)}
              {showCursor && (
                <span className="text-[#7aa2f7] font-light" style={{ animation: "blink 0.7s step-end infinite" }}>|</span>
              )}
            </span>
          </div>
        );
      })}
      {done && (
        <div className="mt-2 pt-2 border-t border-[#2a2b3a]">
          <span className="text-[#565869] text-[10px]">OUTPUT</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[#28c840]">{">"}</span>
            <span className="text-[#9ece6a]">
              {new Date().getHours() < 12 ? "Good Morning!" : new Date().getHours() < 18 ? "Good Afternoon!" : "Good Evening!"} | {days[new Date().getDay()]}, {new Date().toLocaleDateString()}
            </span>
            <span className="text-[#7aa2f7]" style={{ animation: "blink 0.7s step-end infinite" }}>_</span>
          </div>
        </div>
      )}
    </div>
  );
}

function colorizeCode(text: string) {
  const parts: { text: string; color: string }[] = [];
  let remaining = text;

  const rules: [RegExp, string][] = [
    [/^(const|let|var|return)\b/, "#bb9af7"],
    [/^(true|false|null|undefined)\b/, "#ff9e64"],
    [/^(\d+)/, "#ff9e64"],
    [/^"[^"]*"/, "#9ece6a"],
    [/^`[^`]*`/, "#9ece6a"],
    [/^[{}[\]();,]/, "#a9b1d6"],
    [/^=>/, "#89ddff"],
    [/^:/, "#89ddff"],
    [/^[a-zA-Z_$]\w*/, "#c0caf5"],
    [/^\s+/, "#c0caf5"],
    [/^./, "#c0caf5"],
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const [regex, color] of rules) {
      const match = remaining.match(regex);
      if (match) {
        parts.push({ text: match[0], color });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      parts.push({ text: remaining[0], color: "#c0caf5" });
      remaining = remaining.slice(1);
    }
  }

  return (
    <>
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.color }}>{p.text}</span>
      ))}
    </>
  );
}
