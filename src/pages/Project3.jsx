import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Float from "@/components/fancy/blocks/float";

// ── Asset imports — swap with your real files when ready ──
import BaroquePoster from "../assets/Project3/baroque-poster.png";
// import BaroqueCards from "../assets/Project3/baroque-cards.jpg";
import Baroque3D from "../assets/Project3/baroque-3d1.webm";
import PostImpPoster from "../assets/Project3/postimp-poster.png";
import PostImp3D from "../assets/Project3/PizzaBox.webm";
import NeoClassPoster from "../assets/Project3/neoclassic-poster.png";
// import NeoClass3D from "../assets/Project3/neoclassic-3d.jpg";

// Placeholder colours per style
const BAROQUE = {
  bg: "#0A0805",
  accent: "#C9A84C",
  accentDim: "rgba(201,168,76,0.2)",
  accentBorder: "rgba(201,168,76,0.3)",
  text: "#F5EDD6",
  textDim: "rgba(245,237,214,0.6)",
  label: "Baroque",
};
const POSTIMP = {
  bg: "#0D1235",
  accent: "#F5C842",
  accentDim: "rgba(245,200,66,0.18)",
  accentBorder: "rgba(245,200,66,0.35)",
  text: "#E8EAF6",
  textDim: "rgba(232,234,246,0.6)",
  label: "Post-Impressionism",
};
const NEOCLASS = {
  bg: "#F5F0E8",
  accent: "#8B1A1A",
  accentDim: "rgba(139,26,26,0.1)",
  accentBorder: "rgba(139,26,26,0.25)",
  text: "#1A1A2E",
  textDim: "rgba(26,26,46,0.6)",
  label: "Neoclassicism",
};

const styles = [
  {
    key: "baroque",
    theme: BAROQUE,
    title: "Opus Arcana",
    subtitle: "Baroque · Playing Cards",
    era: "17th – 18th Century",
    heroLine: "Where opulence meets obsession.",
    about: "The Baroque period was defined by drama, grandeur, and an overwhelming richness of detail. Every surface was an opportunity for ornamentation — ceilings, columns, card backs. Opus Arcana translates that energy into a playing card deck: each face card is a tableau, each suit mark a gilded embellishment. The deck doesn't just reference Baroque art — it feels like it was commissioned by a cardinal.",
    styleNotes: [
      "Ornate and dramatic — high contrast between thick and thin strokes",
      "Decorative serifs and embellishments on every letterform",
      "Chiaroscuro-inspired card faces — light emerging from dark",
      "Evokes 17th–18th century European grandeur (Bach, Versailles, Caravaggio)",
    ],
    font: "Playfair Display SC",
    fontNote: "Gives a sense of grandeur without going overboard. Eligible at all sizes.",
    tools: ["Typography", "Game Design", "Conceptualization", "Illustration"],
    palette: ["#0A0805", "#C9A84C", "#F5EDD6", "#2A1F0E"],
    paletteNames: ["Midnight", "Gilded", "Parchment", "Mahogany"],
    images: [BaroquePoster],
    video: [Baroque3D],
  },
  {
    key: "postimp",
    theme: POSTIMP,
    title: "Ponista Pizza", // Nuit Étoilée
    subtitle: "Post-Impressionism · Perfume",
    era: "Late 19th Century",
    heroLine: "The sky as scent. The night as feeling.",
    about: "Post-Impressionism didn't reject Impressionism — it pushed past it. Van Gogh's Starry Night isn't a painting of a sky; it's a painting of how a sky feels. Nuit Étoilée (French for Starry Night) takes that same principle and applies it to fragrance packaging. The swirling cobalt and gold of the bottle label mirrors the turbulent brushwork of the original, turning a product into an emotion.",
    styleNotes: [
      "Swirling, expressive brushstroke textures translated into print",
      "Deep cobalt blues and luminous yellows — Van Gogh's signature palette",
      "Thick, visible texture suggesting impasto paint",
      "Emotion over accuracy — the goal is feeling, not representation",
    ],
    font: "IM Fell English",
    fontNote: "A typeface with the weight of history — slightly irregular, deeply human.",
    tools: ["Typography", "Packaging Design", "Illustration", "Conceptualization"],
    palette: ["#0D1235", "#1B2A6B", "#F5C842", "#E8D5A3"],
    paletteNames: ["Night Sky", "Deep Cobalt", "Starlight", "Warm Glow"],
    images: [PostImpPoster, PostImp3D],
    video: [PostImp3D],
  },
  {
    key: "neoclass",
    theme: NEOCLASS,
    title: "Enlight",
    subtitle: "Neoclassicism · Matchstick Box",
    era: "18th – Early 19th Century",
    heroLine: "To light is to illuminate. To illuminate is to know.",
    about: "\"En Light\" — to light in French — connects the age of Enlightenment with the act of striking a match. Neoclassicism was the visual language of that era: reason, order, symmetry, and a deep reverence for Greek and Roman antiquity. Enlight's matchbox design channels all of that — the Ionic column, the laurel wreath, the architectural grid — into an everyday object. Something you'd use once and never forget.",
    styleNotes: [
      "Ionic column and laurel leaf motifs — directly referencing classical antiquity",
      "Strict symmetry and geometric order on every face of the box",
      "Deep crimson, navy blue, and gilded gold — serious, regal, authoritative",
      "Paronomasia (wordplay on En-Light / Enlightenment) embedded in the concept",
    ],
    font: "Bell MT",
    fontNote: "Reflects the Neoclassical era — the same refined geometry and classical restraint.",
    tools: ["Paronomasia", "Typography", "3D Conceptualization", "Illustration"],
    palette: ["#8B1A1A", "#1E2A5E", "#C9A84C", "#F5F0E8"],
    paletteNames: ["Crimson", "Navy", "Gold", "Ivory"],
    images: [NeoClassPoster],
    // images: [],
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, style }) {
  return <motion.div variants={fadeUpVariant} style={style}>{children}</motion.div>;
}

function Divider({ color = "rgba(255,255,255,0.1)" }) {
  return <div style={{ width: "100%", height: "1px", background: color }} />;
}

// Ornamental SVG divider for Baroque
function OrnamentDivider({ color = "#C9A84C" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2rem 0", opacity: 0.6 }}>
      <div style={{ flex: 1, height: "1px", background: color }} />
      <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
        <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
      </svg>
      <div style={{ flex: 1, height: "1px", background: color }} />
    </div>
  );
}

// Swirling Post-Impressionism accent
function SwirlAccent({ color = "#F5C842" }) {
  return (
    <svg viewBox="0 0 120 40" style={{ width: "120px", height: "40px", opacity: 0.4 }}>
      <path d="M5 20 Q20 5 35 20 Q50 35 65 20 Q80 5 95 20 Q110 35 115 20" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 28 Q20 13 35 28 Q50 43 65 28 Q80 13 95 28" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// Neoclassical column ornament
function ColumnAccent({ color = "#8B1A1A" }) {
  return (
    <svg viewBox="0 0 40 80" style={{ width: "24px", height: "48px", opacity: 0.35 }}>
      <rect x="4" y="0" width="32" height="6" fill={color} />
      <rect x="8" y="6" width="24" height="64" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="6" x2="12" y2="70" stroke={color} strokeWidth="0.5" />
      <line x1="20" y1="6" x2="20" y2="70" stroke={color} strokeWidth="0.5" />
      <line x1="28" y1="6" x2="28" y2="70" stroke={color} strokeWidth="0.5" />
      <rect x="4" y="70" width="32" height="10" fill={color} />
    </svg>
  );
}

// Image placeholder card
function ImagePlaceholder({ label, theme, aspectRatio = "4/3" }) {
  return (
    <div style={{ aspectRatio, borderRadius: "10px", background: theme.accentDim, border: `1px solid ${theme.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: `2px dashed ${theme.accent}`, margin: "0 auto 0.75rem", opacity: 0.4 }} />
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", color: theme.accent, opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</p>
      </div>
    </div>
  );
}

// Style section
function StyleSection({ style, index, sectionRef }) {
  const { theme } = style;
  const isNeo = style.key === "neoclass";
  const isBaroque = style.key === "baroque";
  const isPost = style.key === "postimp";

  return (
    <div ref={sectionRef} id={`section-${style.key}`} style={{ background: theme.bg, scrollMarginTop: "2rem" }}>
      {/* Section hero */}
      <div style={{ minHeight: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>

        {/* Background texture per style */}
        {isBaroque && (
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
        )}
        {isPost && (
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(245,200,66,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(27,42,107,0.6) 0%, transparent 50%)", pointerEvents: "none" }} />
        )}
        {isNeo && (
          <>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(139,26,26,0.05) 0%, transparent 40%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
          </>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <Reveal>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", color: theme.accent, textTransform: "uppercase", marginBottom: "0.5rem" }}>
              {String(index + 1).padStart(2, "0")} · {style.era}
            </p>
          </Reveal>

          <Reveal>
            {isBaroque && (
              <h2 style={{ fontFamily: "'Playfair Display SC', serif", fontSize: "clamp(3rem, 8vw, 7rem)", color: theme.text, lineHeight: 0.95, marginBottom: "1rem", letterSpacing: "0.02em" }}>
                {style.title}
              </h2>
            )}
            {isPost && (
              <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: "clamp(3rem, 8vw, 7rem)", color: theme.text, lineHeight: 0.95, marginBottom: "1rem", fontStyle: "italic" }}>
                {style.title}
              </h2>
            )}
            {isNeo && (
              <h2 style={{ fontFamily: "'Bell MT', 'Garamond', serif", fontSize: "clamp(3rem, 8vw, 7rem)", color: theme.text, lineHeight: 0.95, marginBottom: "1rem", letterSpacing: "0.08em" }}>
                {style.title}
              </h2>
            )}
          </Reveal>

          <Reveal>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)", color: theme.textDim, marginBottom: "0.5rem" }}>
              {style.subtitle}
            </p>
          </Reveal>

          <Reveal>
            {isBaroque && <OrnamentDivider color={theme.accent} />}
            {isPost && <div style={{ margin: "1rem auto" }}><SwirlAccent color={theme.accent} /></div>}
            {isNeo && <div style={{ width: "60px", height: "2px", background: theme.accent, margin: "1.5rem auto", opacity: 0.6 }} />}
          </Reveal>

          <Reveal>
            <p style={{ fontFamily: isNeo ? "'Bell MT', serif" : "Space Grotesk, sans-serif", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: theme.text, fontStyle: isBaroque || isPost ? "italic" : "normal", maxWidth: "560px", margin: "0 auto", lineHeight: 1.5 }}>
              "{style.heroLine}"
            </p>
          </Reveal>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem 6rem" }}
      >
        {/* Main image + about */}
        <Reveal>
          <div className="p3-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", marginBottom: "3rem" }}>
            {/* poster image */}
            <div
  style={{
    aspectRatio: "5/7",
    borderRadius: "10px",
    overflow: "hidden",
  }}
>
  <img
    src={style.images[0]}
    alt={style.title}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  />
</div>

            {/* about text */}
            <div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: theme.accent, textTransform: "uppercase", marginBottom: "1rem" }}>
                About the Work
              </p>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: theme.textDim, marginBottom: "2rem" }}>
                {style.about}
              </p>

              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: theme.accent, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Style Notes
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {style.styleNotes.map((note) => (
                  <li key={note} style={{ display: "flex", gap: "0.6rem", alignItems: "baseline" }}>
                    <span style={{ color: theme.accent, fontSize: "12px", flexShrink: 0 }}>–</span>
                    <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.875rem", color: theme.textDim, lineHeight: 1.6 }}>{note}</span>
                  </li>
                ))}
              </ul>

              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: theme.accent, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Typeface
              </p>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.875rem", color: theme.textDim, lineHeight: 1.6 }}>
                <strong style={{ color: theme.text }}>{style.font}</strong> — {style.fontNote}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Colour palette */}
        <Reveal style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: theme.accent, textTransform: "uppercase", marginBottom: "1rem" }}>
            Colour Palette
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {style.palette.map((hex, i) => (
              <div key={hex} style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 80px" }}>
                <div style={{ height: "60px", borderRadius: "8px", background: hex, border: isNeo ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.08)" }} />
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", color: theme.textDim, letterSpacing: "0.05em" }}>{hex}</p>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>{style.paletteNames[i]}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 3D render + extra images */}
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: theme.accent, textTransform: "uppercase", marginBottom: "1rem" }}>
            3D Render
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {style.video ? (
              <video
                src={style.video}
                autoPlay loop muted playsInline
                style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", borderRadius: "10px", border: `1px solid ${theme.accentBorder}`, display: "block" }}
              />
            ) : (
              <ImagePlaceholder label="3D Render — Main" theme={theme} aspectRatio="16/10" />
            )}
            <ImagePlaceholder label="3D Render — Detail" theme={theme} aspectRatio="16/10" />
          </div>
        </Reveal>

        {/* Tools */}
        <Reveal>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: theme.accent, textTransform: "uppercase", marginBottom: "1rem" }}>
            Skills Applied
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {style.tools.map((t) => (
              <span key={t} style={{ padding: "6px 14px", borderRadius: "999px", background: theme.accentDim, border: `1px solid ${theme.accentBorder}`, fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: theme.accent, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </motion.div>

      {isNeo && <div style={{ height: "4px", background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────
export default function Project3Page() {
  const navigate = useNavigate();
  const [activeStyle, setActiveStyle] = useState(0);
  const sectionRefs = useRef([null, null, null]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => {
    navigate("/");
    setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const scrollToStyle = (i) => {
    setActiveStyle(i);
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // active style theme for back button
  const theme = styles[activeStyle].theme;

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>

      {/* BACK BUTTON */}
      <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100 }}>
        <motion.button onClick={goBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "999px", background: "rgba(10,10,10,0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", color: "#F5EDD6", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
          Back to Work
        </motion.button>
      </div>

      {/* HERO */}
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0A0805 0%, #1A0E05 50%, #0D0A1A 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 2rem 8rem", position: "relative", overflow: "hidden" }}>

        {/* decorative background elements */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(139,26,26,0.08) 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(27,42,107,0.1) 0%, transparent 50%)", pointerEvents: "none" }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: "center", zIndex: 1, maxWidth: "800px" }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", color: "rgba(201,168,76,0.7)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Print Design · 2024
          </p>

          <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.9, color: "#F5EDD6", letterSpacing: "0.02em", marginBottom: "1.5rem" }}>
            ART HISTORY<br />
            <span style={{ WebkitTextStroke: ".15vw #C9A84C", WebkitTextFillColor: "transparent" }}>
              APPLIED
            </span>
          </h1>

          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: "rgba(245,237,214,0.5)", maxWidth: "500px", margin: "0 auto 3rem", lineHeight: 1.65 }}>
            Three centuries of art history. Three products. One question — what happens when you design with the masters?
          </p>

{/* Style selector cards with floating posters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", alignItems: "flex-end" }}>
            {styles.map((s, i) => (
              <div key={s.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                {/* Floating poster above button */}
                <Float
                  speed={0.4}
                  amplitude={[6, 14, 8]}
                  rotationRange={[6, 8, 3]}
                  timeOffset={i * 1.2}
                >
                  <motion.div
                    onClick={() => scrollToStyle(i)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "210px",
                      height: "290px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: `2px solid ${s.theme.accentBorder}`,
                      cursor: "pointer",
                      boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <img
                      src={s.images[0]}
                      alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </motion.div>
                </Float>

                {/* Nav button below */}
                <motion.button
                  onClick={() => scrollToStyle(i)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "10px",
                    background: activeStyle === i ? s.theme.accentDim : "rgba(245,237,214,0.04)",
                    border: `1px solid ${activeStyle === i ? s.theme.accent : "rgba(245,237,214,0.1)"}`,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    minWidth: "140px",
                  }}
                >
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px", color: s.theme.accent, opacity: 0.8 }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.2rem", letterSpacing: "0.05em", color: "#F5EDD6", margin: "0 0 2px" }}>
                    {s.title}
                  </p>
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", color: "rgba(245,237,214,0.4)", margin: 0 }}>
                    {s.subtitle}
                  </p>
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: "absolute", bottom: "1.5rem", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
        >
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(245,237,214,0.2)", textTransform: "uppercase", margin: 0 }}>
            Click a style or scroll
          </p>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" /><path d="M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* THREE STYLE SECTIONS */}
      {styles.map((s, i) => (
        <StyleSection
          key={s.key}
          style={s}
          index={i}
          sectionRef={(el) => (sectionRefs.current[i] = el)}
        />
      ))}

      {/* FOOTER */}
      <div style={{ padding: "2.5rem 2rem", borderTop: "1px solid rgba(201,168,76,0.2)", background: "#0A0805", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.25rem", color: "#F5EDD6", letterSpacing: "0.1em", margin: 0 }}>
          Art History Applied
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(245,237,214,0.3)" }}>Print Design</span>
          <span style={{ color: "#C9A84C" }}>·</span>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(245,237,214,0.3)" }}>2024</span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display+SC:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&display=swap');
        @media (max-width: 768px) {
          .p3-grid { grid-template-columns: 1fr !important; }
        }
        html, body { background: #0A0805; }
      `}</style>
    </div>
  );
}