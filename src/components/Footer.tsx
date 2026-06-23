import { HiOutlineHeart } from "react-icons/hi";
import { useTheme } from "../ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`relative ${isDark ? "bg-[#111111]" : "bg-coffee-900"}`}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isDark ? "text-gray-300" : "text-cream"
        }`}>
          <p>&copy; {new Date().getFullYear()} Sachin Mailar. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <HiOutlineHeart className="text-red-500 text-sm" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
