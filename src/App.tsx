import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import ResumeButton from "./components/ResumeButton";
import SocialBar from "./components/SocialBar";
import ProjectsShowcase from "./pages/ProjectsShowcase";
import { useTheme } from "./ThemeContext";
import LiquidCursor from "./components/LiquidCursor";

function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isDark ? "bg-dark text-dark-text" : "bg-cream text-coffee-800"
    }`}>
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px),
               radial-gradient(circle, rgba(199,140,60,0.1) 1px, transparent 1px)`
            : `linear-gradient(rgba(90,62,43,0.15) 1px, transparent 1px),
               linear-gradient(90deg, rgba(90,62,43,0.15) 1px, transparent 1px),
               radial-gradient(circle, rgba(90,62,43,0.25) 1.5px, transparent 1.5px)`,
          backgroundSize: "80px 80px, 80px 80px, 80px 80px",
          backgroundPosition: "-1px -1px, -1px -1px, 39px 39px",
        }}
      />
      <LiquidCursor />
      <Navbar />
      <SideNav />
      <SocialBar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
      <ResumeButton />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsShowcase />} />
    </Routes>
  );
}

export default App;
