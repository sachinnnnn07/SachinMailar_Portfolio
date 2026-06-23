import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  HiOutlinePaperAirplane,
  HiOutlineLocationMarker,
  HiX,
} from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail, SiGooglemaps } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { personalInfo } from "../data";
import { useTheme } from "../ThemeContext";

const contactCards = [
  {
    icon: <SiGmail className="text-2xl" color="#EA4335" />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    isLocation: false,
  },
  {
    icon: <FaPhoneAlt className="text-xl" color="#34A853" />,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    isLocation: false,
  },
  {
    icon: <FaXTwitter className="text-2xl" color="#000000" />,
    label: "Twitter / X",
    value: "@sachinnnn07",
    href: personalInfo.twitter,
    isLocation: false,
  },
  {
    icon: <SiGooglemaps className="text-2xl" color="#4285F4" />,
    label: "Location",
    value: "Gadag, Karnataka, India",
    href: null,
    isLocation: true,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showMap, setShowMap] = useState(false);

  const WEB3FORMS_KEY = "b7236133-55a0-4824-8385-276aac5cd19f";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: "Portfolio Website",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16">

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
            Get in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-coffee-500"
          }`}>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4 justify-between"
          >
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12, type: "spring", stiffness: 100 }}
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (card.isLocation) {
                    setShowMap(true);
                  } else if (card.href) {
                    window.open(card.href, card.label === "Email" ? "_self" : "_blank");
                  }
                }}
                className={`group relative flex items-center gap-4 p-4 rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                  isDark
                    ? "bg-dark-light/40 border-white/5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                    : "bg-white/60 border-coffee-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                }`}
              >
                {/* Hover gradient sweep */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDark
                    ? "bg-gradient-to-r from-accent/5 via-transparent to-transparent"
                    : "bg-gradient-to-r from-primary/5 via-transparent to-transparent"
                }`} />

                <motion.div
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 group-hover:bg-white/10 group-hover:shadow-md group-hover:shadow-accent/10"
                      : "bg-coffee-100/50 group-hover:bg-white group-hover:shadow-md group-hover:shadow-primary/10"
                  }`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {card.icon}
                </motion.div>
                <div>
                  <p className={`text-xs uppercase tracking-wider font-medium ${
                    isDark ? "text-dark-muted" : "text-coffee-400"
                  }`}>
                    {card.label}
                  </p>
                  <p className={`text-sm sm:text-base ${
                    isDark ? "text-gray-300" : "text-coffee-600"
                  }`}>
                    {card.value}
                  </p>
                </div>
              </motion.div>
            ))}

          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className={`lg:col-span-3 p-6 sm:p-8 rounded-2xl border space-y-5 flex flex-col ${
              isDark
                ? "bg-dark-light/40 border-white/5"
                : "bg-white/60 border-coffee-200"
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-coffee-600"
                }`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-1 ${
                    isDark
                      ? "bg-dark/60 border-white/10 text-white placeholder-dark-muted focus:border-accent/50 focus:ring-accent/30"
                      : "bg-cream border-coffee-200 text-coffee-800 placeholder-coffee-400 focus:border-primary/50 focus:ring-primary/30"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-coffee-600"
                }`}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-1 ${
                    isDark
                      ? "bg-dark/60 border-white/10 text-white placeholder-dark-muted focus:border-accent/50 focus:ring-accent/30"
                      : "bg-cream border-coffee-200 text-coffee-800 placeholder-coffee-400 focus:border-primary/50 focus:ring-primary/30"
                  }`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-coffee-600"
              }`}>
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-1 resize-none ${
                  isDark
                    ? "bg-dark/60 border-white/10 text-white placeholder-dark-muted focus:border-accent/50 focus:ring-accent/30"
                    : "bg-cream border-coffee-200 text-coffee-800 placeholder-coffee-400 focus:border-primary/50 focus:ring-primary/30"
                }`}
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <motion.button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending" || status === "sent"}
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                "Message Sent!"
              ) : status === "error" ? (
                "Failed — Try Again"
              ) : (
                <>
                  <HiOutlinePaperAirplane className="text-lg rotate-90" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowMap(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl ${
                isDark ? "bg-dark-light border border-white/10" : "bg-white border border-coffee-200"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? "border-white/10" : "border-coffee-200"
              }`}>
                <div className="flex items-center gap-3">
                  <HiOutlineLocationMarker className="text-accent text-xl" />
                  <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-coffee-900"}`}>
                    Gadag, Karnataka, India
                  </h3>
                </div>
                <button
                  onClick={() => setShowMap(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isDark ? "hover:bg-white/10 text-dark-muted" : "hover:bg-coffee-100 text-coffee-500"
                  }`}
                >
                  <HiX className="text-lg" />
                </button>
              </div>

              {/* Map */}
              <div className="w-full h-[400px] sm:h-[450px]">
                <iframe
                  title="Gadag, Karnataka"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121956.67832587856!2d75.5530149!3d15.4315406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8f9421f866bb9%3A0x4249c83813586308!2sGadag%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Footer */}
              <div className={`px-6 py-3 border-t flex items-center justify-between ${
                isDark ? "border-white/10" : "border-coffee-200"
              }`}>
                <p className={`text-sm ${isDark ? "text-dark-muted" : "text-coffee-400"}`}>
                  My hometown
                </p>
                <a
                  href="https://www.google.com/maps/place/Gadag,+Karnataka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent font-medium hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
