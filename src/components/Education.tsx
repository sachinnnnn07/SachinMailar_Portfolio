import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { education } from "../data";
import { useTheme } from "../ThemeContext";

const GRID = 20;
const CELL = 16;
const SPEED = 120;

type Point = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

function SnakeGame({ onScore }: { onScore: (score: number, best: number) => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [, setDir] = useState<Dir>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [started, setStarted] = useState(false);
  const [cellSize, setCellSize] = useState(CELL);
  const dirRef = useRef<Dir>("RIGHT");

  useEffect(() => {
    const measure = () => {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      const h = wrapperRef.current.clientHeight;
      setCellSize(Math.floor(Math.min(w, h) / GRID));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    onScore(score, best);
  }, [score, best, onScore]);

  const spawnFood = useCallback((snk: Point[]): Point => {
    let f: Point;
    do {
      f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (snk.some((s) => s.x === f.x && s.y === f.y));
    return f;
  }, []);

  const reset = useCallback(() => {
    const initial = [{ x: 10, y: 10 }];
    setSnake(initial);
    setFood(spawnFood(initial));
    setDir("RIGHT");
    dirRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setStarted(true);
  }, [spawnFood]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      const newDir = map[e.key];
      if (!newDir) return;
      e.preventDefault();
      const opp: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
      if (newDir !== opp[dirRef.current]) {
        dirRef.current = newDir;
        setDir(newDir);
      }
      if (!started || gameOver) reset();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [started, gameOver, reset]);

  useEffect(() => {
    if (gameOver && score > best) setBest(score);
  }, [gameOver, score, best]);

  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        const d = dirRef.current;
        if (d === "UP") head.y--;
        if (d === "DOWN") head.y++;
        if (d === "LEFT") head.x--;
        if (d === "RIGHT") head.x++;

        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID || prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1);
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(interval);
  }, [started, gameOver, food, spawnFood]);

  const canvasSize = GRID * cellSize;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#1a1b26";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.strokeStyle = "#2a2b3a";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasSize, i * cellSize);
      ctx.stroke();
    }

    snake.forEach((s, i) => {
      const brightness = 1 - (i / snake.length) * 0.5;
      ctx.fillStyle = i === 0 ? "#9ece6a" : `rgba(158, 206, 106, ${brightness})`;
      ctx.beginPath();
      ctx.roundRect(s.x * cellSize + 1, s.y * cellSize + 1, cellSize - 2, cellSize - 2, 3);
      ctx.fill();
    });

    ctx.fillStyle = "#ff5f57";
    ctx.beginPath();
    ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
  }, [snake, food, cellSize, canvasSize]);

  const handleTouch = (direction: Dir) => {
    const opp: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (direction !== opp[dirRef.current]) {
      dirRef.current = direction;
      setDir(direction);
    }
    if (!started || gameOver) reset();
  };

  return (
    <div ref={wrapperRef} className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Game canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="block max-w-full max-h-full"
        />
        {!started && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg">
            <p className="text-[#9ece6a] font-mono text-base mb-2">Snake Game</p>
            <p className="text-[#565869] font-mono text-xs">Press arrow keys or WASD</p>
            <button onClick={reset} className="mt-3 px-5 py-2 rounded-lg bg-[#238636] text-white text-sm font-medium hover:bg-[#2ea043] transition-colors">
              Play
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg">
            <p className="text-[#ff5f57] font-mono text-base font-bold mb-1">Game Over!</p>
            <p className="text-[#a9b1d6] font-mono text-sm mb-1">Score: {score}</p>
            {score >= best && score > 0 && (
              <p className="text-[#febc2e] font-mono text-xs mb-2">New Best!</p>
            )}
            <button onClick={reset} className="mt-1 px-5 py-2 rounded-lg bg-[#238636] text-white text-sm font-medium hover:bg-[#2ea043] transition-colors">
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Mobile touch controls */}
      <div className="flex flex-col items-center gap-1 mt-3 lg:hidden">
        <button onClick={() => handleTouch("UP")} className="w-10 h-10 rounded-lg bg-[#2a2b3a] text-[#a9b1d6] flex items-center justify-center text-lg hover:bg-[#3a3b4a] transition-colors">↑</button>
        <div className="flex gap-1">
          <button onClick={() => handleTouch("LEFT")} className="w-10 h-10 rounded-lg bg-[#2a2b3a] text-[#a9b1d6] flex items-center justify-center text-lg hover:bg-[#3a3b4a] transition-colors">←</button>
          <button onClick={() => handleTouch("DOWN")} className="w-10 h-10 rounded-lg bg-[#2a2b3a] text-[#a9b1d6] flex items-center justify-center text-lg hover:bg-[#3a3b4a] transition-colors">↓</button>
          <button onClick={() => handleTouch("RIGHT")} className="w-10 h-10 rounded-lg bg-[#2a2b3a] text-[#a9b1d6] flex items-center justify-center text-lg hover:bg-[#3a3b4a] transition-colors">→</button>
        </div>
      </div>
    </div>
  );
}

function SnakeTerminal({ isInView }: { isInView: boolean }) {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const handleScore = useCallback((s: number, b: number) => {
    setScore(s);
    setBest(b);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="rounded-2xl overflow-hidden border bg-[#1a1b26] border-[#2a2b3a] shadow-2xl shadow-black/20 flex flex-col"
    >
      {/* Terminal header with score */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#15161e] border-b border-[#2a2b3a]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[#565869] text-xs font-mono ml-2">~/snake-game</span>
          <span className="text-[#565869] font-mono text-xs ml-3">|</span>
          <span className="text-[#9ece6a] font-mono text-xs font-bold ml-2">{score}</span>
          <span className="text-[#565869] font-mono text-[10px]">PTS</span>
          <span className="text-[#febc2e] font-mono text-xs font-bold ml-2">{best}</span>
          <span className="text-[#565869] font-mono text-[10px]">BEST</span>
        </div>
        <span className="text-[#9ece6a] text-xs font-mono hidden sm:inline">arrow keys</span>
      </div>

      {/* Game area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <SnakeGame onScore={handleScore} />
      </div>
    </motion.div>
  );
}

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="education" className="relative py-12 sm:py-16">
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
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left — Education cards */}
          <div className="flex flex-col gap-4 justify-between">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 60, filter: "blur(10px)" }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.15, ease: [0.25, 0.1, 0, 1] }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl"
              >
                {/* Hover progress border */}
                <div className="absolute -inset-px rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="progress-border-edu"
                    style={{
                      position: "absolute",
                      inset: "-50%",
                      animation: "borderSpin 3s linear infinite",
                    }}
                  />
                </div>
                <div className={`relative p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
                  isDark
                    ? "bg-dark-light"
                    : "bg-white"
                }`}>

                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent items-center justify-center shrink-0">
                    <HiOutlineAcademicCap className="text-2xl text-white" />
                  </div>

                  <div className="flex-1">
                    {edu.collegeLink ? (
                      <a
                        href={edu.collegeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-lg sm:text-xl font-bold inline-flex items-center gap-2 hover:underline ${
                          isDark ? "text-white" : "text-coffee-900"
                        }`}
                      >
                        {edu.institution}
                        <HiOutlineExternalLink className="text-sm opacity-50" />
                      </a>
                    ) : (
                      <h3 className={`text-lg sm:text-xl font-bold ${
                        isDark ? "text-white" : "text-coffee-900"
                      }`}>
                        {edu.institution}
                      </h3>
                    )}
                    {edu.university && (
                      <p className={`text-xs mb-0.5 ${isDark ? "text-gray-400" : "text-coffee-500"}`}>
                        {edu.universityLink ? (
                          <a
                            href={edu.universityLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline inline-flex items-center gap-1"
                          >
                            {edu.university}
                            <HiOutlineExternalLink className="text-[10px] opacity-50" />
                          </a>
                        ) : (
                          edu.university
                        )}
                      </p>
                    )}
                    <p className="text-accent font-semibold text-base mb-3">
                      {edu.degree}
                    </p>

                    <div className={`flex flex-wrap items-center gap-3 text-xs ${
                      isDark ? "text-dark-muted" : "text-coffee-500"
                    }`}>
                      <span className="flex items-center gap-1">
                        <HiOutlineCalendar className="text-accent" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-accent" />
                        {edu.location}
                      </span>
                      {edu.cgpa && (
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium ${
                          isDark
                            ? "bg-accent/10 border-accent/20 text-accent-light"
                            : "bg-accent/10 border-accent/20 text-accent-dark"
                        }`}>
                          <HiOutlineStar className="text-accent" />
                          CGPA: {edu.cgpa}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — Snake game terminal */}
          <SnakeTerminal isInView={isInView} />
        </div>

      </div>
    </section>
  );
}
