import { useRef, useMemo, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../ThemeContext";
import {
  SiSharp, SiDotnet, SiAngular, SiReact, SiJavascript,
  SiHtml5, SiCss, SiTypescript, SiPostgresql, SiDocker,
  SiKubernetes, SiCplusplus,
} from "react-icons/si";
import { HiOutlineDatabase, HiOutlineCloud, HiOutlineCube } from "react-icons/hi";

interface Skill { name: string; icon: ReactNode }

const skills: Skill[] = [
  { name: "C#", icon: <SiSharp color="#68217a" /> },
  { name: ".NET", icon: <SiDotnet color="#512bd4" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178c6" /> },
  { name: "JavaScript", icon: <SiJavascript color="#f7df1e" /> },
  { name: "Angular", icon: <SiAngular color="#dd0031" /> },
  { name: "React", icon: <SiReact color="#61dafb" /> },
  { name: "HTML5", icon: <SiHtml5 color="#e34f26" /> },
  { name: "CSS3", icon: <SiCss color="#1572b6" /> },
  { name: "SQL Server", icon: <HiOutlineDatabase color="#cc2927" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#4169e1" /> },
  { name: "Azure", icon: <HiOutlineCloud color="#0078d4" /> },
  { name: "Docker", icon: <SiDocker color="#2496ed" /> },
  { name: "Kubernetes", icon: <SiKubernetes color="#326ce5" /> },
  { name: "C++", icon: <SiCplusplus color="#00599c" /> },
  { name: "Dynamics 365", icon: <HiOutlineCube color="#4B53BC" /> },
];

function fibSphere(count: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

function Globe({ isDark, rotRef }: { isDark: boolean; rotRef: React.RefObject<{ rx: number; ry: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const { gl } = useThree();
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const c = gl.domElement;
    const down = (e: PointerEvent) => {
      dragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
      c.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current || !rotRef.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      rotRef.current.ry += dx * 0.005;
      rotRef.current.rx += dy * 0.005;
      velocity.current = { x: dy * 0.003, y: dx * 0.003 };
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => { dragging.current = false; };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointerleave", up);
    return () => {
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointerleave", up);
    };
  }, [gl, rotRef]);

  useFrame(() => {
    if (!rotRef.current || !groupRef.current) return;
    const now = performance.now();
    const delta = (now - lastTime.current) / 1000;
    lastTime.current = now;

    if (!dragging.current) {
      rotRef.current.ry += delta * 0.15;
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      rotRef.current.rx += velocity.current.x;
      rotRef.current.ry += velocity.current.y;
    }

    groupRef.current.rotation.set(rotRef.current.rx, rotRef.current.ry, 0, "XYZ");
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      <mesh>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial color={isDark ? "#111111" : "#2a1c14"} transparent opacity={0.92} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.72, 3]} />
        <meshBasicMaterial color={isDark ? "#c78c3c" : "#8b5e3c"} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.9, 32, 32]} />
        <meshBasicMaterial color={isDark ? "#c78c3c" : "#a07850"} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function TechGlobe() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const basePoints = useMemo(() => fibSphere(skills.length), []);
  const R = 30;
  const rotRef = useRef({ rx: 0.3, ry: 0 });

  const project = (rx: number, ry: number) => {
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    return basePoints.map(([bx, by, bz]) => {
      const y1 = by * cosX - bz * sinX;
      const z1 = by * sinX + bz * cosX;
      const x2 = bx * cosY + z1 * sinY;
      const z2 = -bx * sinY + z1 * cosY;
      return { x: 50 + x2 * R, y: 50 - y1 * R, z: z2 };
    });
  };

  const [positions, setPositions] = useState(() => project(0.3, 0));

  useEffect(() => {
    let raf: number;
    const loop = () => {
      setPositions(project(rotRef.current.rx, rotRef.current.ry));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full">
      <div className="w-full h-[350px] sm:h-[450px] lg:h-[550px] cursor-grab active:cursor-grabbing" style={{ touchAction: "none" }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} style={{ background: "transparent" }}>
          <ambientLight intensity={0.4} />
          <Globe isDark={isDark} rotRef={rotRef} />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full">
          {skills.map((skill, i) => {
            const pos = positions[i];
            if (!pos) return null;
            const depth = (pos.z + 1) / 2;
            const scale = 0.4 + 0.7 * depth;
            const opacity = 0.1 + 0.9 * depth;
            return (
              <div
                key={skill.name}
                className="absolute flex flex-col items-center gap-0.5"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(depth * 100),
                  pointerEvents: pos.z > -0.2 ? "auto" : "none",
                }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg transition-all duration-300 hover:drop-shadow-[0_0_15px_#c78c3c] hover:scale-115 cursor-pointer">
                  {skill.icon}
                </div>
                <span className={`text-[9px] sm:text-[11px] font-mono font-medium ${
                  isDark ? "text-gray-400" : "text-coffee-500"
                }`}>
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`text-center mt-1 text-xs font-medium ${
        isDark ? "text-dark-muted" : "text-coffee-400"
      }`}>
        Drag to explore skills universe
      </div>
    </div>
  );
}
