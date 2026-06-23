import { motion, useInView, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { experience } from "../data";
import { useTheme } from "../ThemeContext";


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
    <div className={`font-mono text-xs rounded-lg px-3 py-2 h-14 overflow-hidden ${
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

function ExperienceCard({ job, isDark }: { job: typeof experience[0]; isDark: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full cursor-default group"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
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
              className="progress-border-exp"
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
                ? "bg-dark-light/95 hover:shadow-xl hover:shadow-cyan-500/5"
                : "bg-white hover:shadow-xl hover:shadow-cyan-500/10"
            }`}
          >

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${
                isDark ? "text-white" : "text-coffee-900"
              }`}>
                {job.role}
              </h3>
              <a
                href={job.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold text-base hover:underline inline-flex items-center gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                {job.company}
                <HiOutlineExternalLink className="text-xs opacity-60" />
              </a>
            </div>
            <span className={`text-lg sm:text-xl font-semibold shrink-0 ${
              isDark ? "text-dark-muted" : "text-coffee-400"
            }`}>
              {job.period}
            </span>
          </div>

          <p className={`text-sm sm:text-base leading-relaxed mb-4 ${
            isDark ? "text-gray-300" : "text-coffee-600"
          }`}>
            {job.description}
          </p>

          <div className={`flex items-center gap-2 text-xs mb-4 ${
            isDark ? "text-dark-muted" : "text-coffee-500"
          }`}>
            <HiOutlineLocationMarker className="text-accent" />
            {job.location}
          </div>

          <TechTypewriter techs={job.techStack} isDark={isDark} />

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
              className="progress-border-exp"
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

          <ul className="space-y-2.5">
            {job.highlights.map((point, i) => (
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

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="experience" className="relative py-12 sm:py-16">
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
            Work{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line — desktop only */}
          <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-px ${
            isDark ? "bg-white/10" : "bg-coffee-300/30"
          }`} />

          {/* Animated progress on the line — desktop only */}
          <motion.div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 w-0.5 bg-gradient-to-b from-accent via-primary to-accent-light rounded-full origin-top"
            style={{ scaleY: scrollYProgress, height: "calc(100% - 64px)" }}
          />

          {experience.map((job, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.2, ease: [0.25, 0.1, 0, 1] }}
                className={`relative flex flex-col lg:flex-row items-center mb-10 lg:mb-16 last:mb-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`w-full lg:w-[calc(50%-40px)] ${isLeft ? "lg:pr-0" : "lg:pl-0"}`}>
                  <ExperienceCard job={job} isDark={isDark} />
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex flex-col items-center w-20 shrink-0 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.2, type: "spring" }}
                    className="relative"
                  >
                    <div className={`w-4 h-4 rounded-full border-[3px] ${
                      isDark ? "border-accent bg-dark" : "border-primary bg-cream"
                    }`} />
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                      isDark ? "bg-accent" : "bg-primary"
                    }`} />
                  </motion.div>
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden lg:block w-[calc(50%-40px)]" />
              </motion.div>
            );
          })}

          {/* "NOW" marker at top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2"
          >
            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
              isDark
                ? "bg-accent/20 text-accent border border-accent/30"
                : "bg-primary/15 text-primary border border-primary/30"
            }`}>
              NOW
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
