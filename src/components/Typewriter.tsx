import { useState, useEffect } from "react";

interface TypewriterProps {
  phrases: string[];
  className?: string;
}

export default function Typewriter({ phrases, className = "" }: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const currentPhrase = phrases[phraseIndex];
  const displayedText = currentPhrase.slice(0, charIndex);

  useEffect(() => {
    if (isPaused) {
      const pause = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pause);
    }

    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setCharIndex((c) => c + 1);
        } else {
          setIsPaused(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((p) => (p + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, currentPhrase, phrases]);

  return (
    <span className={className}>
      {displayedText}
      <span
        className="text-accent font-light inline-block"
        style={{ animation: "blink 0.7s step-end infinite" }}
      >
        |
      </span>
    </span>
  );
}
