import { useState } from "react";
import { motion } from "framer-motion";
import meImage from "../assets/About-me/ME.png";
import resumeFile from "../assets/Resume_Channakeshav.pdf";

export default function About() {
  const [hovering, setHovering] = useState(false);
  const [maskPos, setMaskPos] = useState({ x: 50, y: 50 });

  return (
<section
  id="about"
  style={{
    minHeight: "100vh",
    width: "100%",
    padding: "8rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: "#1A0610",
  }}
>
      <div
        className="about-grid"
        style={{
          maxWidth: "1300px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* ── PHOTO — glass frame ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            position: "relative",
            padding: "1rem",
            borderRadius: "24px",
            background: "rgba(26, 43, 109, 0.15)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 61, 0, 0.25)",
            boxShadow: hovering
              ? "0 0 50px rgba(255,61,0,0.35), 0 20px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(0,0,0,0.4)",
            transition: "box-shadow 0.5s ease",
          }}
        >
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMaskPos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* base layer — always black & white */}
            <img
              src={meImage}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.1)",
                display: "block",
              }}
            />

            {/* top layer — duotone, revealed via cursor mask */}
            <img
              src={meImage}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter:
                  "grayscale(20%) sepia(100%) hue-rotate(-50deg) saturate(800%) brightness(0.9)",
                opacity: hovering ? 1 : 0,
                maskImage: `radial-gradient(circle 200px at ${maskPos.x}% ${maskPos.y}%, black 0%, black 40%, transparent 75%)`,
                WebkitMaskImage: `radial-gradient(circle 200px at ${maskPos.x}% ${maskPos.y}%, black 0%, black 40%, transparent 75%)`,
                transition: "opacity 0.4s ease",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#FF0000",
                background: "rgba(10,10,10,0.5)",
                padding: "4px 10px",
                borderRadius: "999px",
                backdropFilter: "blur(8px)",
                zIndex: 2,
              }}
            >
              ● UNAVAILABLE FOR WORK
            </div>
          </div>
        </motion.div>

        {/* ── CONTENT ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
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
            About Me
          </p>

          <h2
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              color: "var(--white)",
              marginBottom: "1.5rem",
              letterSpacing: "0.01em",
            }}
          >
            I let my work do the{" "}
            <span
              style={{
                WebkitTextStroke: ".15vw var(--yellow)",
                WebkitTextFillColor: "transparent",
              }}
            >
              TALKING
            </span>{" "}
            for me.
          </h2>

          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(240,237,228,0.75)",
              marginBottom: "2.5rem",
              maxWidth: "540px",
            }}
          >
            Placeholder bio replace this with your own story. Talk about
            who you are, how you got into design, what excites you about the
            craft, and the kind of work you love making. Keep it personal
            and conversational, like you are talking to a future client or
            collaborator.
          </p>

          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "4+", label: "Years Experience" },
              { num: "150+", label: "Projects Completed" },
              { num: "6+", label: "Tools Mastered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "2.5rem",
                    color: "var(--orange)",
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "12px",
                    color: "rgba(240,237,228,0.5)",
                    letterSpacing: "0.05em",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <motion.a
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "999px",
              // background: "#cdf662",
              background: "var(--orange)",
              color: "#0A0A0A",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.03em",
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(255,61,0,0.35)",
            }}
          >
            View Resume
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
