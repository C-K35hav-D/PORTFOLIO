import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

function Section({ children, style }) {
  return (
    <motion.section
      {...fadeUp}
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "5rem 2rem",
        ...style,
      }}
    >
      {children}
    </motion.section>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: "Space Grotesk, sans-serif",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.2em",
      color: "#f26822",
      textTransform: "uppercase",
      display: "block",
      marginBottom: "0.75rem",
    }}>
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div style={{
      width: "100%",
      height: "1px",
      background: "rgba(242,104,34,0.2)",
    }} />
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

export default function PulsarProject() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: "#2b378b", minHeight: "100vh", color: "#f4f5f7", overflowX: "hidden" }}>

      {/* BACK BUTTON */}
      <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100 }}>
        <motion.button
          onClick={() => { navigate("/"); setTimeout(() => { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "999px",
            background: "rgba(244,245,247,0.1)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(244,245,247,0.15)", color: "#f4f5f7",
            fontFamily: "Space Grotesk, sans-serif", fontSize: "13px",
            fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
          Back to Work
        </motion.button>
      </div>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", position: "relative",
        overflow: "hidden", padding: "2rem",
        background: "linear-gradient(135deg, #2b378b 0%, #1a2460 100%)",
      }}>
        <div style={{ position: "absolute", left: 0, top: "10%", width: "60px", height: "60%", background: "repeating-linear-gradient(45deg, #f26822, #f26822 6px, transparent 6px, transparent 16px)", opacity: 0.8 }} />
        <div style={{ position: "absolute", right: 0, bottom: "10%", width: "60px", height: "60%", background: "repeating-linear-gradient(45deg, #f26822, #f26822 6px, transparent 6px, transparent 16px)", opacity: 0.8 }} />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: "center", zIndex: 1 }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", letterSpacing: "0.3em", color: "#f26822", textTransform: "uppercase", marginBottom: "1.5rem" }}>Brand Identity · 2026</p>
          <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(5rem, 15vw, 12rem)", lineHeight: 0.9, color: "#f4f5f7", letterSpacing: "0.02em", marginBottom: "2rem" }}>PULSAR</h1>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(244,245,247,0.6)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
            A complete brand identity system for Bajaj Pulsar's electric evolution — Bold, Fast, Unapologetically Pulsar.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} style={{ position: "absolute", bottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.35)", textTransform: "uppercase" }}>Scroll to explore</p>
          <div style={{ width: "1px", height: "40px", background: "rgba(242,104,34,0.5)" }} />
        </motion.div>
      </div>

      <Divider />

      {/* OVERVIEW */}
      <Section>
        <div className="pulsar-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <Tag>Brand Overview</Tag>
            <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              EXCEED<br /><span style={{ color: "#f26822" }}>THE LIMIT</span>
            </h2>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.7)" }}>
              Pulsar is the evolution of street performance — now electric, expressive, and inclusive. Designed for riders who shape their own identity. Speed, sharp modernity, and connected tech create a ride that feels alive in every moment.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { label: "Mission", text: "To lead the shift toward a cleaner, more inclusive future of mobility, where electric performance and personal freedom let every rider Exceed The Limit." },
              { label: "Vision", text: "To ignite the thrill of riding for a new generation. Performance, style, and sustainable innovation, while keeping the spirit of freedom alive." },
            ].map((item) => (
              <div key={item.label} style={{ padding: "1.5rem", background: "rgba(244,245,247,0.05)", borderRadius: "12px", border: "1px solid rgba(242,104,34,0.2)" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#f26822", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.label}</p>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(244,245,247,0.7)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* TONE OF VOICE */}
      <Section>
        <Tag>Tone of Voice</Tag>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f4f5f7", marginBottom: "3rem" }}>How Pulsar Speaks</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {["Confident", "Bold", "Cyber", "Motivational", "Aspirational", "Urban", "Performance-Driven", "Gender-Neutral", "Future-Ready"].map((word) => (
            <div key={word} style={{ padding: "12px 24px", borderRadius: "999px", background: "rgba(242,104,34,0.1)", border: "1px solid rgba(242,104,34,0.3)", fontFamily: "Space Grotesk, sans-serif", fontSize: "14px", fontWeight: 600, color: "#f26822", letterSpacing: "0.05em" }}>
              {word}
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* LOGO */}
      <Section>
        <Tag>Brand Visual Code</Tag>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f4f5f7", marginBottom: "3rem" }}>The Logo</h2>
        <div style={{ padding: "4rem 2rem", background: "rgba(244,245,247,0.03)", borderRadius: "16px", border: "1px solid rgba(242,104,34,0.2)", display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem", marginBottom: "3rem" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Primary — Ion White · #F4F5F7</p>
            <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3rem, 10vw, 8rem)", color: "#f4f5f7", letterSpacing: "0.1em", lineHeight: 1 }}>PULSAR</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Secondary — Pulse Amber · #f26822</p>
            <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3rem, 10vw, 8rem)", color: "#f26822", letterSpacing: "0.1em", lineHeight: 1 }}>PULSAR</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* COLOR PALETTE */}
      <Section>
        <Tag>Color System</Tag>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f4f5f7", marginBottom: "3rem" }}>Brand Colors</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <ColorSwatch hex="#f26822" name="Pulse Amber" desc="Energy, acceleration, ignition, and electric heat." />
          <ColorSwatch hex="#f4f5f7" name="Ion White" desc="Clean, futuristic neutral for clarity and balance." />
          <ColorSwatch hex="#2f4b9b" name="Core Blue" desc="Core brand blue — stability, technology, trust." />
          <ColorSwatch hex="#2b378b" name="Deep Circuit Blue" desc="Darker system blue for depth and digital environments." />
        </div>
      </Section>

      <Divider />

      {/* TYPOGRAPHY */}
      <Section>
        <Tag>Typography</Tag>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f4f5f7", marginBottom: "3rem" }}>Type System</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[
            { name: "Panchang Variable", role: "Display / Headlines", size: "clamp(2rem, 5vw, 4rem)", weight: 700, sample: "Headlines" },
            { name: "Panchang Variable", role: "Subheadings", size: "clamp(1.5rem, 3vw, 2.5rem)", weight: 500, sample: "Subheading" },
            { name: "Proxima Nova", role: "Body Text", size: "1rem", weight: 400, sample: "Body text for elaborative content and descriptions." },
          ].map((type) => (
            <div key={type.role} style={{ padding: "2rem", background: "rgba(244,245,247,0.03)", borderRadius: "12px", border: "1px solid rgba(244,245,247,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", color: "#f26822", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{type.role}</p>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.4)" }}>{type.name}</p>
              </div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: type.size, fontWeight: type.weight, color: "#f4f5f7", lineHeight: 1 }}>{type.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* BRAND PHILOSOPHY */}
      <Section>
        <Tag>Brand Philosophy</Tag>
        <blockquote style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#f4f5f7", lineHeight: 1.1, borderLeft: "4px solid #f26822", paddingLeft: "2rem", marginBottom: "2rem" }}>
          Performance is not defined by excess,<br />
          but by <span style={{ color: "#f26822" }}>precision, intent,</span> and <span style={{ color: "#f26822" }}>momentum.</span>
        </blockquote>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(244,245,247,0.65)", maxWidth: "650px" }}>
          Pulsar stands for progress that is inclusive, expressive, and future-ready. Bolder and aggressive by default — but with intent, sharp in execution, and limitless in possibility.
        </p>
      </Section>

      {/* FOOTER */}
      <div style={{ padding: "3rem 2rem", borderTop: "1px solid rgba(242,104,34,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "2rem", color: "#f4f5f7", letterSpacing: "0.1em" }}>PULSAR</p>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.35)", letterSpacing: "0.1em" }}>Brand Guideline · 2026</p>
        <motion.button
          onClick={() => { navigate("/"); setTimeout(() => { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "999px", background: "#f26822", border: "none", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
          Back to Work
        </motion.button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pulsar-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}