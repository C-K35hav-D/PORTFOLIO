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

const posters = [PulsarPoster1, PulsarPoster2, PulsarPoster3, PulsarPoster4, PulsarPoster5];

// --- Inline SVGs (kept as JSX, not <img src>, so they render reliably on GitHub Pages) ---
function OrangeLinesVertical({ height = 192, opacity = 0.85, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.88 192.01" style={{ height, width: "auto", opacity, ...style }}>
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

function Section({ children, style }) {
  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem", ...style }}>
      {children}
    </section>
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
  useEffect(() => { window.scrollTo(0, 0); }, []);
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

      {/* ── HERO ── */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "2rem clamp(1.5rem, 10vw, 5rem)", background: "linear-gradient(135deg, #2b378b 0%, #1a2460 100%)" }}>
        <div style={{ position: "absolute", left: 0, top: "10%", zIndex: 1 }}><OrangeLinesVertical height={320} /></div>
        <div style={{ position: "absolute", right: 0, bottom: "10%", zIndex: 1 }}><OrangeLinesVertical height={320} /></div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: "center", zIndex: 2, width: "100%", maxWidth: "800px" }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", letterSpacing: "0.3em", color: "#f26822", textTransform: "uppercase", marginBottom: "2rem" }}>Brand Identity Design · 2026</p>

          <img
            src={PulsarLogoFull}
            alt="Pulsar"
            style={{ width: "100%", maxWidth: "680px", height: "auto", margin: "0 auto 2.5rem", display: "block" }}
          />

          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", color: "rgba(244,245,247,0.4)", letterSpacing: "0.1em", fontStyle: "italic" }}>
            What happens when one of India's most recognizable motorcycle brands enters the EV era?
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} style={{ position: "absolute", bottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.35)", textTransform: "uppercase", textAlign: "center" }}>Scroll to see how it came together</p>
          <div style={{ width: "2px", height: "40px", background: "#f26822" }} />
        </motion.div>
      </div>

      <Divider />

      {/* 01 — WHERE IT STARTED */}
      <Section>
        <Tag>01 · Where It Started</Tag>
        <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", lineHeight: 1.1, marginBottom: "2rem" }}>
          Not a reliability problem.<br /><span style={{ color: "#f26822", fontWeight: 300 }}>An identity problem.</span>
        </h2>

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "1.25rem" }}>
          Pulsar already owns a reputation for performance. For decades it has stood for speed, aggression, and confidence on Indian roads.
        </p>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
          The challenge was never convincing people that Pulsar could make a good motorcycle. It was convincing them that an <span style={{ color: "#f26822" }}>electric</span> Pulsar could still feel like a Pulsar.
        </p>

        <SubLabel>Market observation</SubLabel>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
          While researching electric motorcycles, I noticed a pattern. Most brands leaned into clean minimalism and futuristic aesthetics. The products looked technically advanced, but emotionally distant. They rarely captured the excitement of actually riding fast.
        </p>

        <SubLabel>User perception</SubLabel>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "1rem" }}>
          Conversations online kept surfacing the same handful of concerns.
        </p>
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
      </Section>

      <Divider />

      {/* 02 — FINDING THE VOICE */}
      <Section>
        <Tag>02 · Finding the Voice</Tag>
        <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", marginBottom: "1.5rem" }}>
          Before the visuals, <span style={{ fontWeight: 300 }}>the words</span>
        </h2>

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "1.5rem" }}>
          Every visual decision started with figuring out how the brand should sound. If Pulsar went electric, it couldn't suddenly turn soft, premium, or overly futuristic. It still had to feel like the rider who pushes first and asks questions later.
        </p>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
          In practice, that meant confident without being arrogant, technical without sounding robotic, motivational without turning into a cliché, and built for riders first, enthusiasts second.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
          {["Confident", "Bold", "Cyber", "Motivational", "Aspirational", "Urban", "Performance-driven", "Gender-neutral", "Future-ready"].map((word) => (
            <Pill key={word} variant="amber">{word}</Pill>
          ))}
        </div>

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "3rem" }}>
          That personality is where <span style={{ color: "#f26822" }}>Exceed the Limit</span> came from. Not because the motorcycle says it can. Because the rider proves it.
        </p>

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
      </Section>

      <Divider />

      {/* 03 — DESIGNING THE MARK */}
      <Section>
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

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
          Rather than build an entirely new identity, I wanted the logo to evolve out of Pulsar's original DNA. Angular cuts read as acceleration. Forward-leaning terminals suggest movement. Compressed proportions add tension. Every decision reinforces motion, even when the logo is standing still.
        </p>

        {/* WORDMARK — two colorways */}
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

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
          The symbol itself is built on simple geometric relationships, so it stays consistent no matter where it's applied. That same construction logic makes it easier to expand later. Icons, motion graphics, and layouts can all inherit the same visual language.
        </p>

        {/* VISUAL IDENTITY — spark mark, orange lines filling the empty space either side */}
        <SubLabel>Visual Identity</SubLabel>
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

        {/* SPARK MARK — compare slider */}
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
          Alongside the wordmark, I built a standalone spark mark that distills the identity into its simplest form. It works as a shortcut for the brand wherever the full wordmark isn't needed: social icons, app icons, UI elements, and merch.
        </p>
        <SparkCompareSlider />

        {/* CLEAR SPACE */}
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", margin: "3rem 0 1rem" }}>Logo Construction & Clear Space</p>
        <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", alignItems: "center", marginBottom: "2.5rem" }}>
          <div style={{ padding: "2rem", background: "rgba(0,0,0,0.3)", borderRadius: "16px", border: "1px solid rgba(242,104,34,0.15)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 374.91 145.75" style={{ width: "100%", height: "auto" }}>
              <defs>
                <style>{`
                  .lcs1{stroke-dasharray:4.83 4.83}
                  .lcs1,.lcs2,.lcs3,.lcs4,.lcs5{fill:none;stroke-miterlimit:10}
                  .lcs1,.lcs3,.lcs4,.lcs5{stroke:#f06a25;stroke-width:.75px}
                  .lcs6{fill:#ed2024}
                  .lcs6,.lcs7,.lcs8{isolation:isolate}
                  .lcs6,.lcs8{opacity:.2}
                  .lcs9,.lcs7,.lcs8{fill:#fff}
                  .lcs2{stroke:#fff}
                  .lcs4{stroke-dasharray:5.07 5.07}
                  .lcs7{opacity:.5}
                  .lcs5{stroke-dasharray:4.84 4.84}
                `}</style>
              </defs>
              <g>
                <path className="lcs9" d="M80.36,55.41c-2.76,0-5.29,1.52-6.6,3.95l-17.75,33.12h11.41l14.42-26.9c.65-1.22,1.92-1.97,3.3-1.97h13.04l-4.36,8.13h-9.54l-4.1,7.65h20.1l12.85-23.97h-32.77Z"/>
                <path className="lcs9" d="M143.7,55.41l-15.48,28.87h-8.93c-.9,0-1.47-.96-1.05-1.75l14.54-27.12h-9.25c-1.35,0-2.6.74-3.24,1.94l-13.98,26.09c-2.19,4.09.77,9.04,5.41,9.04h24.13l19.86-37.07h-12.02Z"/>
                <path className="lcs9" d="M160.81,81.41l13.94-26h-7.67c-1.91,0-3.67,1.05-4.58,2.74l-14.04,26.21c-1.97,3.67.69,8.12,4.86,8.12h19.63l4.39-8.19h-14.8c-1.48,0-2.42-1.58-1.72-2.88Z"/>
                <path className="lcs9" d="M203.69,68.11c-1.07-.83-1.39-2.31-.75-3.51l.53-1h23.78l4.39-8.19h-31.19c-1.94,0-3.72,1.07-4.63,2.77l-2.07,3.86c-2.25,4.2-1.13,9.41,2.64,12.32l10.36,7.98c-.65,1.2-1.9,1.94-3.26,1.94h-18l-4.39,8.19h30.58l6.91-12.88-14.9-11.49Z"/>
                <path className="lcs7" d="M341.98,71.26c.83-1.07,2.31-1.39,3.51-.75l1,.53v23.78l8.19,4.39v-31.19c0-1.94-1.07-3.72-2.77-4.63l-3.86-2.07c-4.2-2.25-9.41-1.13-12.32,2.64l-7.98,10.36c-1.2-.65-1.94-1.9-1.94-3.26v-18l-8.19-4.39v30.58l12.88,6.91,11.49-14.9Z"/>
                <path className="lcs9" d="M259.56,55.41h-19.91l-8.75,16.32h-8.05l5.24,5.24-8.31,15.5h12.02l6.99-13.04h10.92l-6.99,13.04h11.45l13.03-24.3c3.09-5.77-1.09-12.76-7.64-12.76ZM242.93,71.73l4.36-8.13h7.17c1.7,0,2.78,1.81,1.98,3.3l-2.59,4.83h-10.92Z"/>
                <path className="lcs9" d="M296.57,79.38h8.19l12.85-23.97h-29.89c-3.37,0-6.48,1.86-8.07,4.83l-17.28,32.24h10.43l14.48-27.01c.61-1.15,1.81-1.86,3.11-1.86h12.44l-4.36,8.13h-9.93l-3.67,6.85,11.47,13.9h11.03l-.45-.55-10.36-12.55Z"/>
              </g>
              <g>
                <line className="lcs3" x1=".15" y1="92.13" x2="2.65" y2="92.13"/>
                <line className="lcs4" x1="7.72" y1="92.13" x2="369.88" y2="92.13"/>
                <line className="lcs3" x1="372.41" y1="92.13" x2="374.91" y2="92.13"/>
                <line className="lcs3" x1=".15" y1="100.77" x2="2.65" y2="100.77"/>
                <line className="lcs4" x1="7.72" y1="100.77" x2="369.88" y2="100.77"/>
                <line className="lcs3" x1="372.41" y1="100.77" x2="374.91" y2="100.77"/>
                <line className="lcs3" x1=".15" y1="129.2" x2="2.65" y2="129.2"/>
                <line className="lcs4" x1="7.72" y1="129.2" x2="369.88" y2="129.2"/>
                <line className="lcs3" x1="372.41" y1="129.2" x2="374.91" y2="129.2"/>
                <line className="lcs3" y1="55.41" x2="2.5" y2="55.41"/>
                <line className="lcs4" x1="7.57" y1="55.41" x2="369.87" y2="55.41"/>
                <line className="lcs3" x1="372.41" y1="55.41" x2="374.91" y2="55.41"/>
                <line className="lcs3" y1="47.12" x2="2.5" y2="47.12"/>
                <line className="lcs4" x1="7.57" y1="47.12" x2="369.87" y2="47.12"/>
                <line className="lcs3" x1="372.41" y1="47.12" x2="374.91" y2="47.12"/>
                <line className="lcs3" y1="18.34" x2="2.5" y2="18.34"/>
                <line className="lcs4" x1="7.57" y1="18.34" x2="369.87" y2="18.34"/>
                <line className="lcs3" x1="372.41" y1="18.34" x2="374.91" y2="18.34"/>
                <rect className="lcs6" x="47.23" y="55.41" width="8.79" height="37.07"/>
                <rect className="lcs8" x="18.65" y="55.41" width="8.79" height="37.07"/>
                <rect className="lcs8" x="28.18" y="55.41" width="8.79" height="37.07"/>
                <rect className="lcs8" x="37.71" y="55.41" width="8.79" height="37.07"/>
                <rect className="lcs6" x="56.02" y="46.41" width="261.59" height="8.79"/>
                <rect className="lcs6" x="56.02" y="92.62" width="261.59" height="8.79"/>
                <rect className="lcs8" x="56.02" y="101.88" width="261.59" height="8.79"/>
                <rect className="lcs8" x="56.02" y="111.15" width="261.59" height="8.79"/>
                <rect className="lcs8" x="56.02" y="120.41" width="261.59" height="8.79"/>
                <rect className="lcs8" x="56.02" y="18.55" width="261.59" height="8.79"/>
                <rect className="lcs8" x="56.02" y="27.84" width="261.59" height="8.79"/>
                <rect className="lcs8" x="56.02" y="37.12" width="261.59" height="8.79"/>
                <rect className="lcs6" x="317.61" y="55.41" width="8.33" height="37.07"/>
                <rect className="lcs8" x="327.19" y="55.41" width="8.33" height="37.07"/>
                <rect className="lcs8" x="336.77" y="55.41" width="8.33" height="37.07"/>
                <rect className="lcs8" x="346.35" y="55.41" width="8.33" height="37.07"/>
              </g>
            </svg>
          </div>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)" }}>
            Consistency isn't just about the logo itself. It's also about protecting the space around it. A fixed clear space, equal to the height of one letter, keeps other elements from crowding the mark so it stays legible at any scale.
          </p>
        </div>

        {/* MISUSE */}
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)", maxWidth: "700px", marginBottom: "1.25rem" }}>
          Strong identities stay strong because they get used the same way every time. These rules exist to stop the logo from losing recognition across different media.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {["No off-brand colors", "No gradients", "No flipping or tilting", "No stretching or cropping", "Always 100% opacity"].map((rule) => (
            <Pill key={rule} variant="ghost">{rule}</Pill>
          ))}
        </div>
      </Section>

      <Divider />

      {/* 04 — BUILDING THE SYSTEM */}
      <Section>
        <Tag>04 · Building the System</Tag>
        <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", marginBottom: "1.5rem" }}>
          Color and type <span style={{ fontWeight: 300 }}>that hold it together</span>
        </h2>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
          The visual system had to balance two personalities: performance and technology. Amber stands for energy, acceleration, and ignition. Blue brings in trust, engineering, and precision. Together they make an electric motorcycle feel exciting without losing credibility.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <ColorSwatch hex="#f26822" name="Pulse Amber" desc="Energy, acceleration, ignition, electric heat." />
          <ColorSwatch hex="#f4f5f7" name="Ion White" desc="Clean and futuristic. Keeps things legible." />
          <ColorSwatch hex="#2f4b9b" name="Core Blue" desc="Stability, tech, trust." />
          <ColorSwatch hex="#2b378b" name="Deep Circuit Blue" desc="Depth for digital environments." />
        </div>

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2rem" }}>
          Panchang carries the weight of the headlines. Its sharp forms echo the geometry of the logo and give the system an aggressive rhythm. Space Grotesk balances it out, keeping longer reading comfortable while staying modern and technical.
        </p>

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
      </Section>

      <Divider />

      {/* BRAND PHILOSOPHY */}
      <Section>
        <Tag>Along the Way</Tag>
        <blockquote style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", color: "#f4f5f7", lineHeight: 1.15, borderLeft: "4px solid #f26822", paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          Performance isn't about excess.<br />
          It's <span style={{ color: "#f26822" }}>precision, intent,</span> and <span style={{ color: "#f26822", fontWeight: 300 }}>momentum.</span>
        </blockquote>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)", maxWidth: "650px" }}>
          Every project eventually reaches a point where one sentence starts making every decision easier. This was mine. Whenever something felt uncertain, I came back to it: bold by default, but sharp in execution rather than loud for the sake of it.
        </p>
      </Section>

      <Divider />

      {/* 05 — BRINGING IT TO LIFE */}
      <Section>
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

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "750px", marginBottom: "2.5rem" }}>
          A visual identity only proves itself once it leaves the design file. The launch campaign became the real test: could this brand feel confident without leaning on spec sheets or ad claims? Instead of telling riders the bike can handle it, the campaign lets them watch it prove itself.
        </p>

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

        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "750px", marginBottom: "3rem" }}>
          It opens with a live event. Top Indian riders and creators get the bike on a track built for extreme conditions: rough terrain, sharp turns, hard acceleration zones. Whatever they capture becomes the seed for the rest of the rollout, an <span style={{ color: "#f26822" }}>#ExceedTheLimit</span> social push, and a teaser-led bike reveal.
        </p>

        {/* POSTER CAROUSEL */}
        <SubLabel>Event Posters</SubLabel>
        <div style={{ marginBottom: "3.5rem" }}>
          <PosterCarousel />
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)", maxWidth: "600px", marginTop: "1.5rem" }}>
            Each poster captures a different moment of the bike being pushed somewhere it's not supposed to survive. Instead of listing features, it puts the viewer in a spot where they instinctively wonder if the bike can handle it, then lets the image answer that on its own. I shot both male and female riders throughout, because exceeding the limit was never meant to be about one type of rider.
          </p>
        </div>

        {/* POSTER MOCKUP */}
        <SubLabel>Poster in Context</SubLabel>
        <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2rem", alignItems: "center", marginBottom: "3.5rem" }}>
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(242,104,34,0.2)" }}>
            <video src={PosterMockup} autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
          </div>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)" }}>
            Designs rarely live inside a perfect mockup. Dropping the poster into an actual street, in the middle of a real crowd, was the fastest way to check if it still held up outside a clean frame.
          </p>
        </div>

        {/* LOGO REVEAL */}
        <SubLabel>Logo Reveal</SubLabel>
        <div className="pulsar-grid-2" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2rem", alignItems: "center" }}>
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(242,104,34,0.2)", background: "#0f1533" }}>
            <video src={LogoRevealVideo} autoPlay loop muted playsInline style={{ width: "100%", display: "block" }} />
          </div>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)" }}>
            Motion extends an identity, it doesn't just decorate it. The reveal leans on the same acceleration, sharp transitions, and momentum already built into the static mark.
          </p>
        </div>
      </Section>

      <Divider />

      {/* SKILLS */}
      <Section>
        <Tag>Skills Behind the Work</Tag>
        <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#f4f5f7", marginBottom: "1.5rem" }}>
          Skills applied throughout  <span style={{ fontWeight: 300 }}>the project</span>
        </h2>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)", maxWidth: "700px", marginBottom: "2.5rem" }}>
          This project leaned on strategy as much as execution: research, brand positioning, identity design, campaign development, motion graphics, and a fair amount of presenting the work out loud.
        </p>
        <SkillGroup title="Craft" variant="amber" items={["Brand Strategy", "Visual Identity", "Art Direction", "Copywriting", "Typography", "Campaign Design"]} />
        <SkillGroup title="Motion & Tools" variant="blue" items={["Motion Graphics", "Figma", "After Effects", "Illustrator", "Photoshop", "Blender"]} />
        <SkillGroup title="Soft Skills" variant="ghost" items={["Storytelling", "Presenting Ideas", "Problem Solving", "Client Communication"]} />
      </Section>

      {/* FOOTER */}
      <div style={{ padding: "3rem 2rem", borderTop: "1px solid rgba(242,104,34,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <img src={PulsarLogoWhite} alt="Pulsar" style={{ height: "22px", width: "auto" }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: "10px" }}>
          {/* Placeholder — swap for your own closing line whenever you're ready */}
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.35)", letterSpacing: "0.05em", border: "1px dashed rgba(244,245,247,0.25)", borderRadius: "999px", padding: "4px 12px" }}>
            Add your closing line
          </span>
          {["Identity System", "Campaign", "Motion", "2026"].map((item) => (
            <span key={item} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.35)", letterSpacing: "0.1em" }}>
              · {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=panchang@300,400,500,600,700&display=swap');
        .pulsar-page img, .pulsar-page video { max-width: 100%; height: auto; }
        .poster-track { scrollbar-width: none; -ms-overflow-style: none; }
        .poster-track::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .pulsar-grid, .pulsar-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}