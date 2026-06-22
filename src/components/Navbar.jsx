import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", id: "home", color: "#FF3D00" },
  { label: "Work", id: "work", color: "#FFB800" },
  { label: "About", id: "about", color: "#E8135A" },
  { label: "Services", id: "services", color: "#1A2B6D" },
  { label: "Contact", id: "contact", color: "#F0EDE4" },
];

const wobble = {
  rotate: [0, -5, 5, -3, 3, -1, 1, 0],
  transition: { duration: 0.45, ease: "easeInOut" },
};

const noWobble = {
  rotate: 0,
  transition: { duration: 0.2, ease: "easeOut" },
};

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [hovering, setHovering] = useState(null);

  // track active section by scroll
  useEffect(() => {
    const observers = navItems.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ════════════════════════════
          DESKTOP — top center pill
      ════════════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-3"
      >
        {/* main pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            padding: "6px 8px",
            borderRadius: "999px",
            background: "rgba(15, 15, 20, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            const isHovered = hovering === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHovering(item.id)}
                onMouseLeave={() => setHovering(null)}
                animate={isHovered ? wobble : noWobble}
                whileTap={{ scale: 0.93 }}
                style={{
                  position: "relative",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background: "transparent",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: "Space Grotesk, sans-serif",
                  letterSpacing: "0.01em",
                  color: isActive ? "#0A0A0A" : "rgba(240,237,228,0.75)",
                  transition: "color 0.25s ease",
                  zIndex: 1,
                  transformOrigin: "center center",
                  display: "inline-block",
                }}
              >
                {/* sliding highlight */}
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId="desk-highlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 38,
                        mass: 0.8,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        background: isActive ? item.color : `${item.color}22`,
                        zIndex: -1,
                      }}
                    />
                  )}
                </AnimatePresence>
                {item.label}
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* ════════════════════════════
          MOBILE — bottom center pill
      ════════════════════════════ */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="fixed bottom-23 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-2"
      >
        {/* main pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            padding: "6px 8px",
            borderRadius: "999px",
            background: "rgba(15, 15, 20, 0.65)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                whileHover={wobble}
                whileTap={{ scale: 0.9 }}
                onHoverEnd={(e) => {
                  e.target.style.transform = "";
                }}
                style={{
                  position: "relative",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 500,
                  fontFamily: "Space Grotesk, sans-serif",
                  color: isActive ? "#0A0A0A" : "rgba(240,237,228,0.7)",
                  transition: "color 0.25s ease",
                  zIndex: 1,
                  transformOrigin: "center center",
                  display: "inline-block",
                }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="mobile-highlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 38,
                        mass: 0.8,
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "999px",
                        background: item.color,
                        zIndex: -1,
                      }}
                    />
                  )}
                </AnimatePresence>
                {item.label}
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}