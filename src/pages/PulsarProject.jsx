import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- Asset imports ---
import PulsarLogoWhite from "../assets/pulsar/Asset 1.svg";
import PulsarLogoFull from "../assets/pulsar/full logo.svg";
import PulsarLogoAmber from "../assets/pulsar/Asset 2.svg";
import SparkAmber from "../assets/pulsar/spark-amber.svg";
import SparkWhite from "../assets/pulsar/spark-white.svg";
import PulsarPoster1 from "../assets/pulsar/PulsarPoster_1.png";
import PulsarPoster2 from "../assets/pulsar/PulsarPoster_2.png";
import PulsarPoster3 from "../assets/pulsar/PulsarPoster_3.png";
import PulsarPoster4 from "../assets/pulsar/PulsarPoster_4.png";
import PulsarPoster5 from "../assets/pulsar/PulsarPoster_5.png";
import PosterMockup from "../assets/pulsar/Poster_Mockup.mp4";
import LogoRevealVideo from "../assets/pulsar/LOGO REVEAL1.mp4";
import LogoClearspace from "../assets/pulsar/LogoClearspace.svg";

const posters = [PulsarPoster1, PulsarPoster2, PulsarPoster3, PulsarPoster4, PulsarPoster5];

/* ============================================================
   🔧 SCROLL-REVEAL SETTINGS — tweak these to change the feel
   ============================================================ */
const REVEAL_Y_OFFSET = 28;          // px the content rises as it fades in (bigger = more dramatic)
const REVEAL_DURATION = 1;           // seconds each element takes to fade/rise into place
const REVEAL_EASE = [0.22, 1, 0.36, 1]; // easing curve (this one = smooth "ease-out" deceleration)
const REVEAL_STAGGER = 0.15;         // seconds between each child animating (bigger = slower cascade)
const REVEAL_DELAY_CHILDREN = 0.05;  // seconds before the first child starts
const REVEAL_VIEWPORT_AMOUNT = 0.1;  // 0–1, how much of an element must be visible before it triggers (0.2 = 20%)
const REVEAL_ONCE = true;            // true = animate in only once, false = re-animate every time it scrolls into view

// --- Shared UI ---
function Divider() {
  return <div style={{ width: "100%", height: "1px", background: "rgba(242,104,34,0.2)" }} />;
}

function Tag({ children }) {
  return (
    <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "#f26822", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
      {children}
    </span>
  );
}

function SubLabel({ children }) {
  return (
    <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
      {children}
    </p>
  );
}

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: REVEAL_STAGGER, delayChildren: REVEAL_DELAY_CHILDREN } },
};
const fadeUpVariant = {
  hidden: { opacity: 0, y: REVEAL_Y_OFFSET },
  show: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE } },
};

// Every <Section> staggers its children in as it scrolls into view.
// NOTE: only direct children wrapped in <Reveal> (or other motion components)
// receive this animation — plain <div>/<p> tags are ignored by Framer Motion.
function Section({ children, style }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: REVEAL_ONCE, amount: REVEAL_VIEWPORT_AMOUNT }}
      variants={sectionVariants}
      style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem", ...style }}
    >
      {children}
    </motion.section>
  );
}

// Wrap ANY block of content in <Reveal> to make it fade + rise in on scroll.
// Wrap each heading/paragraph/image block individually for a nice cascading effect,
// or wrap a whole group together if you want it to appear as one unit.
function Reveal({ children, style }) {
  return (
    <motion.div variants={fadeUpVariant} style={style}>
      {children}
    </motion.div>
  );
}

function ColorSwatch({ hex, name, desc }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "1 1 140px" }}>
      <div style={{ width: "100%", height: "80px", background: hex, borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }} />
      <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: "#f4f5f7", letterSpacing: "0.05em" }}>{hex}</p>
      <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, color: "#f26822", textTransform: "uppercase", letterSpacing: "0.1em" }}>{name}</p>
      <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", color: "rgba(244,245,247,0.5)", lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function Pill({ children, variant = "amber" }) {
  const styles = {
    amber: { background: "rgba(242,104,34,0.1)", border: "1px solid rgba(242,104,34,0.3)", color: "#f26822" },
    ghost: { background: "rgba(244,245,247,0.05)", border: "1px solid rgba(244,245,247,0.15)", color: "rgba(244,245,247,0.75)" },
    blue: { background: "rgba(47,75,155,0.25)", border: "1px solid rgba(120,150,240,0.35)", color: "#c7d2fe" },
  };
  return (
    <div style={{ padding: "10px 20px", borderRadius: "999px", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.03em", whiteSpace: "nowrap", ...styles[variant] }}>
      {children}
    </div>
  );
}

function SkillGroup({ title, variant, items }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1rem" }}>{title}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        {items.map((item) => <Pill key={item} variant={variant}>{item}</Pill>)}
      </div>
    </div>
  );
}

// --- Poster carousel (scrollable, hidden native scrollbar, custom arrows) ---
function PosterCarousel() {
  const trackRef = useRef(null);

  const scrollByCard = (dir) => {
    if (!trackRef.current) return;

    const card = trackRef.current.querySelector("[data-poster-card]");
    const amount = card ? card.offsetWidth + 16 : 340;

    trackRef.current.scrollBy({
      left: dir * amount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: "0.5rem",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            data-poster-card
            style={{
              flex: "0 0 auto",
              width: "min(70vw, 260px)",
              aspectRatio: "3 / 4",
              scrollSnapAlign: "center",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(242,104,34,0.2)",
              background: "rgba(244,245,247,0.03)",
            }}
          >
            <img
              src={posters[n - 1]}
              alt={`Pulsar campaign poster ${n}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "center",
          marginTop: "1.25rem",
        }}
      >
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous poster"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "rgba(244,245,247,0.08)",
            border: "1px solid rgba(244,245,247,0.2)",
            color: "#f4f5f7",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ‹
        </button>

        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next poster"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "#f26822",
            border: "none",
            color: "#0A0A0A",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

// --- Spark compare slider ---
function SparkCompareSlider() {
  const [pos, setPos] = useState(50);
  return (
    <div>
      <div style={{ position: "relative", width: "100%", maxWidth: "420px", margin: "0 auto", aspectRatio: "16 / 10", borderRadius: "16px", overflow: "hidden", userSelect: "none", cursor: "ew-resize", border: "1px solid rgba(244,245,247,0.15)" }}>
        <div style={{ position: "absolute", inset: 0, background: "#f26822", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={SparkWhite} alt="Spark mark in ion white" style={{ width: "32%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "#f4f5f7", display: "flex", alignItems: "center", justifyContent: "center", clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={SparkAmber} alt="Spark mark in pulse amber" style={{ width: "32%" }} />
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "2px", background: "#0A0A0A", transform: "translateX(-1px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)", width: "34px", height: "34px", borderRadius: "50%", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#f4f5f7", pointerEvents: "none" }}>↔</div>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Slide to compare the spark mark on light and dark backgrounds" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "ew-resize", margin: 0 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "420px", margin: "0.75rem auto 0" }}>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.5)" }}>On light backgrounds</p>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.5)", textAlign: "right" }}>On color / dark backgrounds</p>
      </div>
      <p style={{ textAlign: "center", fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.35)", marginTop: "0.4rem" }}>Drag to compare both colorways</p>
    </div>
  );
}

export default function PulsarProject() {
  const navigate = useNavigate();

  // Scrolls this page to the top the moment it mounts (e.g. right after a
  // polaroid/project card is clicked on the home page and we navigate here).
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => { navigate("/"); setTimeout(() => { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }, 100); };

  return (
    <div className="pulsar-page" style={{ background: "#2b378b", minHeight: "100vh", color: "#f4f5f7", overflowX: "hidden" }}>

      {/* BACK BUTTON */}
      <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100 }}>
        <motion.button onClick={goBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "999px", background: "rgba(244,245,247,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(244,245,247,0.15)", color: "#f4f5f7", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
          Back to Work
        </motion.button>
      </div>

      {/* ── HERO (animates on load, not on scroll — it's the first thing you see) ── */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "2rem clamp(1.5rem, 10vw, 5rem)", background: "linear-gradient(135deg, #2b378b 0%, #1a2460 100%)" }}>
        {/*
          Orange lines sit behind the logo (zIndex: 0) and are nudged off-screen
          by a negative offset that scales with viewport width.
          On mobile (~375px): left = -20px, height = 160px → safely behind content.
          On desktop: left = -15px, height = 320px → the original look.
          🔧 To adjust the mobile peek: change the clamp() in left/right.
          🔧 To change mobile height: change the first value in clamp() on height prop.
        */}
        {/*
          🔧 HERO ORANGE STRIPS
          left/right: negative = hidden behind edge, 0 = flush, positive = fully visible.
          On mobile we use -8px so just the tip peeks in (matching your original look).
          Height scales from 180px on phones up to 320px on wide screens.
        */}
        <div className="pulsar-hero-lines" style={{
          position: "absolute",
          left: "clamp(-8px, -0.5vw, -8px)",
          top: "10%",
          zIndex: 0,
          pointerEvents: "none",
        }}>
          <OrangeLinesVertical height="clamp(180px, 28vw, 320px)" />
        </div>
        <div className="pulsar-hero-lines" style={{
          position: "absolute",
          right: "clamp(-8px, -0.5vw, -8px)",
          bottom: "10%",
          zIndex: 0,
          pointerEvents: "none",
        }}>
          <OrangeLinesVertical height="clamp(180px, 28vw, 320px)" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: "center",
            zIndex: 2,       // logo/text above the lines
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(0.7rem, 0.9vw, 0.85rem)",
              fontWeight: 600,
              letterSpacing: "0.28em",
              color: "#f26822",
              textTransform: "uppercase",
              marginBottom: ".5rem",
            }}
          >
            Brand Identity Design · 2026
          </p>

          <img
            src={PulsarLogoFull}
            alt="Pulsar"
            style={{
              width: "100%",
              maxWidth: "680px",
              height: "auto",
              display: "block",
              margin: "0 auto 1.75rem",
            }}
          />

          <p
            style={{
              width: "min(85%, 520px)",
              margin: "0 auto",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              lineHeight: 1.65,
              color: "rgba(244,245,247,0.55)",
              letterSpacing: "0.01em",
            }}
          >
            What happens when one of India's most recognizable motorcycle brands enters the EV era?
          </p>
        </motion.div>
      </div>

      <Divider />

      {/* 01 — WHERE IT STARTED */}
      <Section>
        <Reveal><Tag>01 · Where It Started</Tag></Reveal>
        <Reveal>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", lineHeight: 1.1, marginBottom: "2rem" }}>
            Not a reliability problem.<br /><span style={{ color: "#f26822", fontWeight: 300 }}>An identity problem.</span>
          </h2>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "1.25rem" }}>
            Pulsar already owns a reputation for performance. For decades it has stood for speed, aggression, and confidence on Indian roads.
          </p>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
            The challenge was never convincing people that Pulsar could make a good motorcycle. It was convincing them that an <span style={{ color: "#f26822" }}>electric</span> Pulsar could still feel like a Pulsar.
          </p>
        </Reveal>

        <Reveal><SubLabel>Market observation</SubLabel></Reveal>
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
            While researching electric motorcycles, I noticed a pattern. Most brands leaned into clean minimalism and futuristic aesthetics. The products looked technically advanced, but emotionally distant. They rarely captured the excitement of actually riding fast.
          </p>
        </Reveal>

        <Reveal><SubLabel>User perception</SubLabel></Reveal>
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "1rem" }}>
            Conversations online kept surfacing the same handful of concerns.
          </p>
        </Reveal>
        <Reveal>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              "Electric bikes feel less powerful.",
              "Battery reliability is uncertain.",
              "They're built for cities, not real roads.",
              "Performance claims are hard to trust.",
            ].map((line) => (
              <li key={line} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", color: "rgba(244,245,247,0.7)", display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span style={{ color: "#f26822" }}>›</span> {line}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div>
            <p style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", color: "#f4f5f7", marginBottom: "0.25rem" }}>
              That became the real design problem.
            </p>
            <p style={{ fontFamily: "Panchang, sans-serif", fontWeight: 300, fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", color: "rgba(244,245,247,0.45)", marginBottom: "0.25rem" }}>
              Not technology.
            </p>
            <p style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#f26822" }}>
              Perception.
            </p>
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* 02 — FINDING THE VOICE */}
      <Section>
        <Reveal><Tag>02 · Finding the Voice</Tag></Reveal>
        <Reveal>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", marginBottom: "1.5rem" }}>
            Before the visuals, <span style={{ fontWeight: 300 }}>the words</span>
          </h2>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "1.5rem" }}>
            Every visual decision started with figuring out how the brand should sound. If Pulsar went electric, it couldn't suddenly turn soft, premium, or overly futuristic. It still had to feel like the rider who pushes first and asks questions later.
          </p>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
            In practice, that meant confident without being arrogant, technical without sounding robotic, motivational without turning into a cliché, and built for riders first, enthusiasts second.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {["Confident", "Bold", "Cyber", "Motivational", "Aspirational", "Urban", "Performance-driven", "Gender-neutral", "Future-ready"].map((word) => (
              <Pill key={word} variant="amber">{word}</Pill>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "3rem" }}>
            That personality is where <span style={{ color: "#f26822" }}>Exceed the Limit</span> came from. Not because the motorcycle says it can. Because the rider proves it.
          </p>
        </Reveal>

        <Reveal>
          <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              { label: "Mission", text: "Build electric motorcycles that deliver the same emotional rush riders already expect from Pulsar, while moving toward cleaner mobility." },
              { label: "Vision", text: "Become the benchmark for performance-first electric motorcycles in India." },
            ].map((item) => (
              <div key={item.label} style={{ padding: "1.5rem", background: "rgba(244,245,247,0.05)", borderRadius: "12px", border: "1px solid rgba(242,104,34,0.2)" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#f26822", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.label}</p>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(244,245,247,0.7)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* 03 — DESIGNING THE MARK */}
      <Section>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <Tag>03 · Designing the Mark</Tag>
              <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", marginBottom: "1.5rem" }}>
                Sharp, fast, <span style={{ fontWeight: 300 }}>unmistakably Pulsar</span>
              </h2>
            </div>
            <div style={{ flexShrink: 0, marginLeft: "2rem", paddingTop: "0.5rem" }}>
              <OrangeLinesVertical height={120} opacity={1} />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
            Rather than build an entirely new identity, I wanted the logo to evolve out of Pulsar's original DNA. Angular cuts read as acceleration. Forward-leaning terminals suggest movement. Compressed proportions add tension. Every decision reinforces motion, even when the logo is standing still.
          </p>
        </Reveal>

        {/* WORDMARK — two colorways */}
        <Reveal>
          <div style={{ padding: "3rem 2rem", background: "rgba(244,245,247,0.03)", borderRadius: "16px", border: "1px solid rgba(242,104,34,0.2)", display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", marginBottom: "3rem" }}>
            <div style={{ textAlign: "center", width: "100%" }}>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1.25rem" }}>Primary — Ion White</p>
              <img src={PulsarLogoWhite} alt="Pulsar wordmark in white" style={{ width: "min(500px, 80%)", height: "auto", margin: "0 auto" }} />
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1.25rem" }}>Secondary — Pulse Amber</p>
              <img src={PulsarLogoAmber} alt="Pulsar wordmark in amber" style={{ width: "min(500px, 80%)", height: "auto", margin: "0 auto" }} />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
            The symbol itself is built on simple geometric relationships, so it stays consistent no matter where it's applied. That same construction logic makes it easier to expand later. Icons, motion graphics, and layouts can all inherit the same visual language.
          </p>
        </Reveal>

        {/* VISUAL IDENTITY — spark mark, orange lines filling the empty space either side */}
        <Reveal><SubLabel>Visual Identity</SubLabel></Reveal>
        <Reveal>
          <div style={{ position: "relative", padding: "3rem 2rem", background: "rgba(0,0,0,0.3)", borderRadius: "16px", border: "1px solid rgba(242,104,34,0.15)", marginBottom: "3rem", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: "clamp(12px, 6%, 60px)", top: "50%", transform: "translateY(-50%)" }}>
              <OrangeLinesVertical height={180} opacity={0.8} />
            </div>
            <div style={{ position: "absolute", right: "clamp(12px, 6%, 60px)", top: "50%", transform: "translateY(-50%) scaleX(-1)" }}>
              <OrangeLinesVertical height={180} opacity={0.8} />
            </div>
            <img
              src={SparkWhite}
              alt="Spark mark"
              style={{ width: "clamp(100px, 25%, 200px)", height: "auto", display: "block", position: "relative", zIndex: 1 }}
            />
          </div>
        </Reveal>

        {/* SPARK MARK — compare slider */}
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
            Alongside the wordmark, I built a standalone spark mark that distills the identity into its simplest form. It works as a shortcut for the brand wherever the full wordmark isn't needed: social icons, app icons, UI elements, and merch.
          </p>
        </Reveal>
        <Reveal><SparkCompareSlider /></Reveal>

        {/* CLEAR SPACE */}
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", margin: "3rem 0 1rem" }}>Logo Construction & Clear Space</p>
        </Reveal>
        <Reveal>
          <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", alignItems: "center", marginBottom: "2.5rem" }}>
            <div style={{ padding: "2rem", background: "rgba(0,0,0,0.3)", borderRadius: "16px", border: "1px solid rgba(242,104,34,0.15)" }}>
              <img src={LogoClearspace} alt="Pulsar logo clear space and construction guide" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)" }}>
              Consistency isn't just about the logo itself. It's also about protecting the space around it. A fixed clear space, equal to the height of one letter, keeps other elements from crowding the mark so it stays legible at any scale.
            </p>
          </div>
        </Reveal>

        {/* MISUSE */}
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)", maxWidth: "700px", marginBottom: "1.25rem" }}>
            Strong identities stay strong because they get used the same way every time. These rules exist to stop the logo from losing recognition across different media.
          </p>
        </Reveal>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {["No off-brand colors", "No gradients", "No flipping or tilting", "No stretching or cropping", "Always 100% opacity"].map((rule) => (
              <Pill key={rule} variant="ghost">{rule}</Pill>
            ))}
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* 04 — BUILDING THE SYSTEM */}
      <Section>
        <Reveal><Tag>04 · Building the System</Tag></Reveal>
        <Reveal>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", marginBottom: "1.5rem" }}>
            Color and type <span style={{ fontWeight: 300 }}>that hold it together</span>
          </h2>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
            The visual system had to balance two personalities: performance and technology. Amber stands for energy, acceleration, and ignition. Blue brings in trust, engineering, and precision. Together they make an electric motorcycle feel exciting without losing credibility.
          </p>
        </Reveal>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
            <ColorSwatch hex="#f26822" name="Pulse Amber" desc="Energy, acceleration, ignition, electric heat." />
            <ColorSwatch hex="#f4f5f7" name="Ion White" desc="Clean and futuristic. Keeps things legible." />
            <ColorSwatch hex="#2f4b9b" name="Core Blue" desc="Stability, tech, trust." />
            <ColorSwatch hex="#2b378b" name="Deep Circuit Blue" desc="Depth for digital environments." />
          </div>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
            Panchang carries the weight of the headlines. Its sharp forms echo the geometry of the logo and give the system an aggressive rhythm. Space Grotesk balances it out, keeping longer reading comfortable while staying modern and technical.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { name: "Panchang", role: "Display / Headlines", size: "clamp(2rem, 5vw, 3.5rem)", weight: 500, sample: "Headlines" },
              { name: "Panchang", role: "Subheadings", size: "clamp(1.4rem, 3vw, 2.2rem)", weight: 300, sample: "Subheading" },
              { name: "Space Grotesk", role: "Body Text", size: "1rem", weight: 400, sample: "Body copy for everything else." },
            ].map((type) => (
              <div key={type.role} style={{ padding: "1.75rem", background: "rgba(244,245,247,0.03)", borderRadius: "12px", border: "1px solid rgba(244,245,247,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", color: "#f26822", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{type.role}</p>
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.4)" }}>{type.name}</p>
                </div>
                <p style={{ fontFamily: type.name === "Panchang" ? "Panchang, sans-serif" : "Space Grotesk, sans-serif", fontSize: type.size, fontWeight: type.weight, color: "#f4f5f7", lineHeight: 1 }}>{type.sample}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* BRAND PHILOSOPHY */}
      <Section>
        <Reveal><Tag>Along the Way</Tag></Reveal>
        <Reveal>
          <blockquote style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", color: "#f4f5f7", lineHeight: 1.15, borderLeft: "4px solid #f26822", paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            Performance isn't about excess.<br />
            It's <span style={{ color: "#f26822" }}>precision, intent,</span> and <span style={{ color: "#f26822", fontWeight: 300 }}>momentum.</span>
          </blockquote>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)", maxWidth: "650px" }}>
            Every project eventually reaches a point where one sentence starts making every decision easier. This was mine. Whenever something felt uncertain, I came back to it: bold by default, but sharp in execution rather than loud for the sake of it.
          </p>
        </Reveal>
      </Section>

      <Divider />

      {/* 05 — BRINGING IT TO LIFE */}
      <Section>
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
            <div style={{ flex: 1 }}>
              <Tag>05 · Bringing It to Life</Tag>
              <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem, 5vw, 4rem)", color: "#f4f5f7", lineHeight: 1, marginBottom: "2rem" }}>
                Exceed <span style={{ color: "#f26822", fontWeight: 300 }}>the limit</span>
              </h2>
            </div>
            <div style={{ flexShrink: 0, paddingTop: "1rem" }}>
              <OrangeLinesVertical height={100} opacity={1} />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "750px", marginBottom: "2.5rem" }}>
            A visual identity only proves itself once it leaves the design file. The launch campaign became the real test: could this brand feel confident without leaning on spec sheets or ad claims? Instead of telling riders the bike can handle it, the campaign lets them watch it prove itself.
          </p>
        </Reveal>

        <Reveal>
          <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
            <div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#f26822", textTransform: "uppercase", marginBottom: "0.75rem" }}>Why this campaign</p>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)" }}>
                The campaign runs on demonstration instead of declaration. Riders, creators, and everyday enthusiasts push the bike through rough conditions, and those real moments end up doing more work than any ad could.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#f26822", textTransform: "uppercase", marginBottom: "0.75rem" }}>The shift</p>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)" }}>
                From "is it safe?" to "it survived that." Less spec sheet, more endurance and control under real stress.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "750px", marginBottom: "3rem" }}>
            It opens with a live event. Top Indian riders and creators get the bike on a track built for extreme conditions: rough terrain, sharp turns, hard acceleration zones. Whatever they capture becomes the seed for the rest of the rollout, an <span style={{ color: "#f26822" }}>#ExceedTheLimit</span> social push, and a teaser-led bike reveal.
          </p>
        </Reveal>

        {/* POSTER CAROUSEL */}
        <Reveal><SubLabel>Event Posters</SubLabel></Reveal>
        <div style={{ marginBottom: "3.5rem" }}>
          <Reveal><PosterCarousel /></Reveal>
          <Reveal>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)", maxWidth: "600px", marginTop: "1.5rem" }}>
              Each poster captures a different moment of the bike being pushed somewhere it's not supposed to survive. Instead of listing features, it puts the viewer in a spot where they instinctively wonder if the bike can handle it, then lets the image answer that on its own. I shot both male and female riders throughout, because exceeding the limit was never meant to be about one type of rider.
            </p>
          </Reveal>
        </div>

        {/* POSTER MOCKUP */}
        <Reveal><SubLabel>Poster in Context</SubLabel></Reveal>
        <Reveal>
          <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2rem", alignItems: "center", marginBottom: "3.5rem" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(242,104,34,0.2)" }}>
              <video src={PosterMockup} autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
            </div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)" }}>
              Designs rarely live inside a perfect mockup. Dropping the poster into an actual street, in the middle of a real crowd, was the fastest way to check if it still held up outside a clean frame.
            </p>
          </div>
        </Reveal>

        {/* LOGO REVEAL */}
        <Reveal><SubLabel>Logo Reveal</SubLabel></Reveal>
        <Reveal>
          <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2rem", alignItems: "center" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(242,104,34,0.2)", background: "#0f1533" }}>
              <video src={LogoRevealVideo} autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
            </div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)" }}>
              Motion extends an identity, it doesn't just decorate it. The reveal leans on the same acceleration, sharp transitions, and momentum already built into the static mark.
            </p>
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* SKILLS */}
      <Section>
        <Reveal><Tag>Skills Behind the Work</Tag></Reveal>
        <Reveal>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", marginBottom: "1.5rem" }}>
            Skills applied throughout  <span style={{ fontWeight: 300 }}>the project</span>
          </h2>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
            This project leaned on strategy as much as execution: research, brand positioning, identity design, campaign development, motion graphics, and a fair amount of presenting the work out loud.
          </p>
        </Reveal>
        <Reveal><SkillGroup title="Craft" variant="amber" items={["Brand Strategy", "Visual Identity", "Art Direction", "Copywriting", "Typography", "Campaign Design"]} /></Reveal>
        <Reveal><SkillGroup title="Motion & Tools" variant="blue" items={["Motion Graphics", "Figma", "After Effects", "Illustrator", "Photoshop", "Blender"]} /></Reveal>
        <Reveal><SkillGroup title="Soft Skills" variant="ghost" items={["Storytelling", "Presenting Ideas", "Problem Solving", "Client Communication"]} /></Reveal>
      </Section>

      {/* FOOTER (not scroll-revealed — it's at the very bottom, no need to hide/reveal it) */}
      <div
        style={{
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(242,104,34,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <img
          src={PulsarLogoWhite}
          alt="Pulsar"
          style={{
            height: "24px",
            width: "auto",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.75rem",
            textAlign: "right",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "13px",
              color: "rgba(244,245,247,0.8)",
              letterSpacing: "0.05em",
            }}
          >
            Designed to move a legacy brand into its electric future.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            {["Brand Strategy", "Identity System", "Campaign", "Motion", "2026"].map(
              (item, index) => (
                <span
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(244,245,247,0.35)",
                  }}
                >
                  {index !== 0 && (
                    <span
                      style={{
                        marginRight: "0.75rem",
                        color: "#f26822",
                        fontSize: "0.95rem",
                      }}
                    >
                      ·
                    </span>
                  )}
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=panchang@300,400,500,600,700&display=swap');
        .pulsar-page img, .pulsar-page video { max-width: 100%; height: auto; }
        .poster-track { scrollbar-width: none; -ms-overflow-style: none; }
        .poster-track::-webkit-scrollbar { display: none; }

        /* --- Responsive grid --- */
        @media (max-width: 768px) {
          .pulsar-grid, .pulsar-grid-2 { grid-template-columns: 1fr !important; }
        }

        /*
          🔧 To hide the orange strips below a certain phone width, uncomment:
          @media (max-width: 360px) { .pulsar-hero-lines { display: none; } }
        */
      `}</style>
    </div>
  );
}

// --- Inline SVGs (kept as JSX, not <img src>, so they render reliably on GitHub Pages) ---
function OrangeLinesVertical({ height = 192, opacity = 0.85, style }) {
  // height can be a number (px) or a CSS string like "clamp(140px, 22vw, 320px)"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.88 192.01" style={{ height, width: "auto", opacity, display: "block", ...style }}>
      <g fill="#f06924">
        <polygon points="28.88 20.89 28.88 14.33 0 40.76 0 47.32 28.88 20.89"/>
        <polygon points="28.88 6.56 28.88 0 0 26.43 0 32.99 28.88 6.56"/>
        <polygon points="28.88 34.01 28.88 27.45 0 53.88 0 60.44 28.88 34.01"/>
        <polygon points="28.88 47.09 28.88 40.53 0 66.96 0 73.52 28.88 47.09"/>
        <polygon points="28.88 60.37 28.88 53.81 0 80.25 0 86.81 28.88 60.37"/>
        <polygon points="28.88 73.49 28.88 66.93 0 93.36 0 99.92 28.88 73.49"/>
        <polygon points="28.88 86.57 28.88 80.01 0 106.45 0 113.01 28.88 86.57"/>
        <polygon points="28.88 99.89 28.88 93.34 0 119.77 0 126.33 28.88 99.89"/>
        <polygon points="28.88 113.01 28.88 106.45 0 132.89 0 139.44 28.88 113.01"/>
        <polygon points="28.88 126.09 28.88 119.53 0 145.97 0 152.53 28.88 126.09"/>
        <polygon points="28.88 139.38 28.88 132.82 0 159.25 0 165.81 28.88 139.38"/>
        <polygon points="28.88 152.5 28.88 145.94 0 172.37 0 178.93 28.88 152.5"/>
        <polygon points="28.88 165.58 28.88 159.02 0 185.45 0 192.01 28.88 165.58"/>
      </g>
    </svg>
  );
}