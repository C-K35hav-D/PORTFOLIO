import { motion } from "framer-motion";
import Typewriter from "@/components/fancy/text/typewriter";
import ImageTrail, { ImageTrailItem } from "@/components/fancy/image/image-trail";

const trailItems = [
  { bg: "#FF00F0", label: "_" },
  { bg: "#FF3D00", label: "K" },
  { bg: "#00F0FF", label: "E" },
  { bg: "#E8135A", label: "S" },
  { bg: "#1A2B6D", label: "H" },
  { bg: "#7C00FF", label: "A" },
  { bg: "#FFB800", label: "V" },
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        background: "var(--black)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── IMAGE TRAIL ── */}
      <ImageTrail
        threshold={80}
        intensity={0.3}
        keyframes={{ opacity: [0, 1, 1, 0], scale: [1, 1, 2] }}
        keyframesOptions={{
          opacity: { duration: 2, times: [0, 0.001, 0.9, 1] },
          scale: { duration: 2, times: [0, 0.8, 1] },
        }}
        repeatChildren={2}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {trailItems.map((item, index) => (
          <ImageTrailItem key={index}>
            <div
              style={{
                width: "90px",
                height: "75px",
                background: item.bg,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "48px",
                color: "#0A0A0A",
                letterSpacing: "0.05em",
                boxShadow: `0 8px 32px ${item.bg}55`,
              }}
            >
              {item.label}
            </div>
          </ImageTrailItem>
        ))}
      </ImageTrail>

      {/* ── HERO TEXT ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 50,
          width: "90vw",
        }}
      >
        {/* tag line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.25em",
            color: "var(--orange)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Artist || Designer
        </motion.p>

        {/* big heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(3rem, 8vw, 8rem)",
            lineHeight: 0.95,
            color: "var(--white)",
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          WHO AM I?
          <br />
          <span
            style={{
              display: "block",
              fontSize: "clamp(1.8rem, 5.5vw, 7rem)",
              WebkitTextStroke: ".15vw var(--orange)",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <Typewriter
              text={[
                "Brand Identity Designer",
                "Motion Designer",
                "Visual Designer",
                "Typography Connoisseur",
                "Creative Director",
                "Communication Designer",
                "Creative Visionary",
                "Brand Architect",
                "Experience Designer",
                "Creative Technologist",
                "Design Futurist",
                "Visual Innovation Designer",
                "Multidisciplinary Designer",
                "3D Artist",
              ]}
              speed={70}
              deleteSpeed={40}
              waitTime={1800}
              cursorChar="_"
              as="span"
            />
          </span>
        </motion.h1>

        {/* scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: "rgba(240,237,228,0.35)",
            textTransform: "uppercase",
            marginTop: "2rem",
          }}
        >
          A jack of all trades is a master of none, but oftentimes better than a master of one.
        </motion.p>
      </div>
    </section>
  );
}
