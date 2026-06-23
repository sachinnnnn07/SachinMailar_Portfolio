import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

const RESUME_LINK = "https://drive.google.com/file/d/1HHHxJU1aIaXKeOdBa_xcKu94VEQiS1ay/view?usp=drive_link";

export default function ResumeButton() {
  const [bottom, setBottom] = useState(40);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top;
      const windowH = window.innerHeight;
      const minBottom = 40;

      if (footerTop < windowH) {
        setBottom(Math.max(minBottom, windowH - footerTop + 12));
      } else {
        setBottom(minBottom);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.a
      href={RESUME_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ x: 120 }}
      animate={{ x: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 80 }}
      className="fixed right-3 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-accent text-white font-semibold text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-all duration-200 hover:bg-accent-light border border-accent-light/30 hover:border-accent-light/50"
      style={{
        bottom: `${bottom}px`,
        boxShadow: "0 0 20px rgba(199,140,60,0.4), 0 0 60px rgba(199,140,60,0.15)",
      }}
      whileHover={{
        boxShadow: "0 0 35px rgba(199,140,60,0.6), 0 0 80px rgba(199,140,60,0.25)",
      }}
    >
      <span>Resume</span>
      <HiOutlineDocumentText className="text-xl" />

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ animation: "resumeGlow 2s ease-in-out infinite" }}
      />

      <style>{`
        @keyframes resumeGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(199,140,60,0.3), inset 0 0 15px rgba(199,140,60,0.05); }
          50% { box-shadow: 0 0 40px rgba(199,140,60,0.5), inset 0 0 25px rgba(199,140,60,0.1); }
        }
      `}</style>
    </motion.a>
  );
}
