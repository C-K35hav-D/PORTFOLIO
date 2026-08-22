import React, { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";


import Glass from "../components/ui/Glass";
import PulsarLogoWhite from "../assets/pulsar/Asset 1.svg";
import PulsarLogoFull  from "../assets/pulsar/full logo.svg";
import PulsarLogoAmber from "../assets/pulsar/Asset 2.svg";
import SparkWhite      from "../assets/pulsar/spark-white.svg";
import SparkAmber      from "../assets/pulsar/spark-amber.svg";
import LogoClearspace  from "../assets/pulsar/LogoClearspace.svg";
import PulsarPoster1   from "../assets/pulsar/PulsarPoster_1.png";
import PulsarPoster2   from "../assets/pulsar/PulsarPoster_2.png";
import PulsarPoster3   from "../assets/pulsar/PulsarPoster_3.png";
import PulsarPoster4   from "../assets/pulsar/PulsarPoster_4.png";
import PulsarPoster5   from "../assets/pulsar/PulsarPoster_5.png";
import PosterMockup    from "../assets/pulsar/Poster_Mockup.mp4";
import LogoRevealVideo from "../assets/pulsar/LOGO REVEAL1.mp4";
import PulsarTurntable from "../components/PulsarTurntable";


const posters = [PulsarPoster1, PulsarPoster2, PulsarPoster3, PulsarPoster4, PulsarPoster5];

// ─── 3D wireframe ──────────────────────────────────────────────────────────
function BikeModel() {
  const obj = useLoader(OBJLoader, BIKE_URL);
  const groupRef = useRef();

  // Replace every material with an orange wireframe
  useEffect(() => {
    if (!obj) return;
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#f26822"),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = mat;
      }
    });
    // Centre the model on its own bounding box
    const box = new THREE.Box3().setFromObject(obj);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    obj.position.sub(centre);
  }, [obj]);

  // Slow turntable auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return <group ref={groupRef}><primitive object={obj} /></group>;
}

function WireframeBike() {
  return (
    <div
      style={{
        width: "100%",
        height: "clamp(280px, 45vw, 520px)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(242,104,34,0.2)",
        background: "#0a0a0d",
        cursor: "grab",
      }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#0a0a0d"]} />
        {/* Subtle ambient so the wireframe reads cleanly */}
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1} color="#f26822" />

        <Suspense fallback={null}>
          <BikeModel />
        </Suspense>

        {/* Let the viewer drag/orbit. Disable zoom on mobile so page still scrolls. */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
}

// ─── Shared UI ──────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em", color: "#f26822", textTransform: "uppercase", marginBottom: "1rem" }}>
      {children}
    </p>
  );
}

function Reveal({ children, delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function HR() {
  return <div style={{ width: "100%", height: "1px", background: "rgba(242,104,34,0.15)" }} />;
}

function OrangeLines({ height = 200, opacity = 0.85 }) {
  const pts = [20.89, 6.56, 34.01, 47.09, 60.37, 73.49, 86.57, 99.89, 113.01, 126.09, 139.38, 152.5, 165.58];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.88 192.01" style={{ height, width: "auto", opacity, display: "block" }}>
      <g fill="#f06924">
        {pts.map((v, i) => (
          <polygon key={i} points={`28.88 ${v} 28.88 ${(v - 6.56).toFixed(2)} 0 ${(v + 19.87).toFixed(2)} 0 ${(v + 26.43).toFixed(2)} 28.88 ${v}`} />
        ))}
      </g>
    </svg>
  );
}

function Section({ children, style }) {
  return (
    <section style={{ background: "#0f0f12", padding: "clamp(4rem,10vh,8rem) clamp(1.5rem,6vw,6rem)", ...style }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>{children}</div>
    </section>
  );
}

// ─── Infinite auto-scroll poster strip ──────────────────────────────────────
function PosterStrip() {
  const ref     = useRef(null);
  const animRef = useRef(null);
  const posRef  = useRef(0);
  const [paused, setPaused]     = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    let last = null;
    const step = (ts) => {
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;
      if (!paused) {
        posRef.current += dt * 0.04;
        if (posRef.current >= track.scrollWidth / 2) posRef.current = 0;
        track.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [paused]);

  const all = [...posters, ...posters];

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ display: "flex", gap: "12px", overflowX: "hidden", scrollbarWidth: "none", paddingBottom: "4px", cursor: "pointer" }}
      >
        {all.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelected(src)}
            style={{ flex: "0 0 auto", width: "clamp(140px,30vw,220px)", aspectRatio: "3/4", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(242,104,34,0.2)", transition: "transform 0.2s ease", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <img src={src} alt={`Poster ${(i % posters.length) + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
          >
            <motion.img
              src={selected}
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: "12px", display: "block", border: "1px solid rgba(242,104,34,0.3)" }}
            />
            <button
              onClick={() => setSelected(null)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(242,104,34,0.15)", border: "1px solid rgba(242,104,34,0.3)", color: "#f26822", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PulsarProject() {
  const navigate = useNavigate();
  const heroRef  = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const logoScale   = useTransform(scrollYProgress, [0, 0.5], [1, 2.2]);
  const logoOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const bgScale     = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => {
    navigate("/");
    setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div style={{ background: "#0f0f12", color: "#f4f5f7", overflowX: "hidden" }}>

      {/* BACK */}
      <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100 }}>
        <Glass variant="subtle" style={{ borderRadius: "999px" }}>
          <motion.button
            onClick={goBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "999px", border: "none", background: "transparent", color: "#f4f5f7", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            Back to Work
          </motion.button>
        </Glass>
      </div>

      {/* ── HERO — 300vh, zoom completes at 50%, rest scrolls into content ── */}
      <div ref={heroRef} style={{ position: "relative", height: "100vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#2b378b 0%,#1a2460 100%)", scale: bgScale }} />

          <div style={{ position: "absolute", left: 0, top: "15%", pointerEvents: "none", zIndex: 1 }}>
            <OrangeLines height="clamp(160px,22vw,280px)" opacity={0.7} />
          </div>
          <div style={{ position: "absolute", right: 0, bottom: "15%", pointerEvents: "none", zIndex: 1, transform: "scaleX(-1)" }}>
            <OrangeLines height="clamp(160px,22vw,280px)" opacity={0.7} />
          </div>

          <motion.div style={{ scale: logoScale, opacity: logoOpacity, position: "relative", zIndex: 2, textAlign: "center", width: "100%", maxWidth: "700px", padding: "0 2rem" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", color: "#f26822", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Brand Identity · 2026
            </motion.p>
            <motion.img
              src={PulsarLogoFull} alt="Pulsar"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
              style={{ width: "100%", maxWidth: "600px", display: "block", margin: "0 auto 1.5rem" }}
            />
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.9rem,1.2vw,1.05rem)", color: "rgba(244,245,247,0.5)", lineHeight: 1.65 }}
            >
              What happens when India's most recognizable motorcycle brand enters the EV era?
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 3 }}
          >
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.25)", textTransform: "uppercase" }}>Scroll</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(242,104,34,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <HR />

      {/* 01 PROBLEM */}
      <Section>
        <Reveal>
          <Label>01 · Problem</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "2rem" }}>
            Not a reliability problem.<br /><span style={{ color: "#f26822", fontWeight: 300 }}>An identity problem.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.95rem,1.2vw,1.05rem)", lineHeight: 1.8, color: "rgba(244,245,247,0.65)", maxWidth: "680px", marginBottom: "2.5rem" }}>
            Pulsar owns performance. It always has. Going electric meant one thing: convincing riders that an electric Pulsar still <em>feels</em> like a Pulsar.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1px", background: "rgba(242,104,34,0.15)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(242,104,34,0.15)" }}>
            {["Electric bikes feel less powerful.", "Battery reliability is uncertain.", "Built for cities, not real roads.", "Performance claims are hard to trust."].map((line, i) => (
              <div key={i} style={{ padding: "1.5rem", background: "#0f0f12" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(244,245,247,0.6)" }}>
                  <span style={{ color: "#f26822", marginRight: "0.5rem" }}>›</span>{line}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.3} style={{ marginTop: "3rem", borderLeft: "3px solid #f26822", paddingLeft: "1.5rem" }}>
          <p style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#f4f5f7" }}>The real problem was not technology.</p>
          <p style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "#f26822" }}>It was perception.</p>
        </Reveal>
      </Section>

      <HR />

      {/* 02 RESEARCH */}
      <Section>
        <Reveal>
          <Label>02 · Research</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "2rem" }}>
            Every EV brand<br /><span style={{ color: "#f26822", fontWeight: 300 }}>looked the same.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.95rem,1.2vw,1.05rem)", lineHeight: 1.8, color: "rgba(244,245,247,0.65)", maxWidth: "680px", marginBottom: "2.5rem" }}>
            Clean minimalism. Futuristic aesthetics. Technically advanced, emotionally distant. None of them captured the excitement of actually riding fast. That gap was the opportunity.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              { label: "Market gap", text: "Performance brands ignored the EV space. EV brands ignored performance riders." },
              { label: "Opportunity", text: "Own the intersection: electric power with undeniable Pulsar attitude." },
            ].map(item => (
              <div key={item.label} style={{ padding: "1.5rem", background: "rgba(244,245,247,0.04)", borderRadius: "12px", border: "1px solid rgba(242,104,34,0.2)" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#f26822", textTransform: "uppercase", marginBottom: "0.75rem" }}>{item.label}</p>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(244,245,247,0.6)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <HR />

      {/* 03 LOGO */}
      <Section>
        <Reveal>
          <Label>03 · Logo</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "3rem" }}>
            Sharp, fast,<br /><span style={{ color: "#f26822", fontWeight: 300 }}>unmistakably Pulsar</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", border: "1px solid rgba(242,104,34,0.2)", borderRadius: "16px", overflow: "hidden", marginBottom: "2.5rem" }}>
            <div style={{ padding: "3rem 2rem", background: "#2f4b9b", display: "flex", flexDirection: "column", alignItems: "center", borderBottom: "1px solid rgba(242,104,34,0.15)" }}>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(244,245,247,0.3)", textTransform: "uppercase", marginBottom: "2rem" }}>Ion White — Primary</p>
              <img src={PulsarLogoWhite} alt="Pulsar wordmark in white" style={{ width: "min(480px,80%)", display: "block" }} />
            </div>
            <div style={{ padding: "3rem 2rem", background: "#f4f5f7", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(10,10,10,0.4)", textTransform: "uppercase", marginBottom: "2rem" }}>Pulse Amber — Secondary</p>
              <img src={PulsarLogoAmber} alt="Pulsar wordmark in amber" style={{ width: "min(480px,80%)", display: "block" }} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1rem" }}>Clear Space</p>
          <div style={{ padding: "2.5rem", background: "rgba(244,245,247,0.03)", borderRadius: "12px", border: "1px solid rgba(244,245,247,0.08)" }}>
            <img src={LogoClearspace} alt="Logo clear space guide" style={{ width: "100%", display: "block" }} />
          </div>
        </Reveal>
        <Reveal delay={0.3} style={{ marginTop: "2rem" }}>
          <video src={LogoRevealVideo} autoPlay loop muted playsInline style={{ width: "100%", borderRadius: "12px", border: "1px solid rgba(242,104,34,0.2)", display: "block" }} />
        </Reveal>
      </Section>

      <HR />

      {/* 04 TAGLINE */}
      <Section>
        <Reveal>
          <Label>04 · Tagline</Label>
          <p style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,6vw,5rem)", color: "#f4f5f7", lineHeight: 1, marginBottom: "2rem" }}>
            Exceed <span style={{ fontWeight: 300, color: "#f26822" }}>the Limit</span>
          </p>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.9rem,1.2vw,1.05rem)", color: "rgba(244,245,247,0.5)", maxWidth: "480px", marginBottom: "3rem", lineHeight: 1.7 }}>
            Not because the motorcycle says it can. Because the rider proves it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {["Confident", "Bold", "Cyber", "Motivational", "Aspirational", "Performance-driven", "Future-ready"].map(w => (
              <span key={w} style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(242,104,34,0.1)", border: "1px solid rgba(242,104,34,0.3)", color: "#f26822", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600 }}>{w}</span>
            ))}
          </div>
        </Reveal>
      </Section>

      <HR />

      {/* 05 COLORS */}
      <Section>
        <Reveal>
          <Label>05 · Colors</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "3rem" }}>
            Energy meets <span style={{ color: "#f26822", fontWeight: 300 }}>precision</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1.5rem" }}>
            {[
              { hex: "#f26822", name: "Pulse Amber",  desc: "Energy. Acceleration. Ignition." },
              { hex: "#f4f5f7", name: "Ion White",    desc: "Clean. Futuristic. Legible." },
              { hex: "#2f4b9b", name: "Core Blue",    desc: "Stability. Tech. Trust." },
              { hex: "#2b378b", name: "Deep Circuit", desc: "Depth for digital spaces." },
            ].map(({ hex, name, desc }) => (
              <div key={hex}>
                <div style={{ width: "100%", height: "100px", background: hex, borderRadius: "10px", marginBottom: "12px", border: hex === "#f4f5f7" ? "1px solid rgba(0,0,0,0.08)" : "none" }} />
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "#f4f5f7", marginBottom: "3px" }}>{hex}</p>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 700, color: "#f26822", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{name}</p>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", color: "rgba(244,245,247,0.4)", lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <HR />

      {/* 06 TYPOGRAPHY */}
      <Section>
        <Reveal>
          <Label>06 · Typography</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "3rem" }}>
            Two typefaces.<br /><span style={{ color: "#f26822", fontWeight: 300 }}>One system.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(244,245,247,0.08)" }}>
            {[
              { name: "Panchang",      role: "Headlines",   weight: 500, sample: "PULSAR",                size: "clamp(3rem,8vw,5rem)",    note: "Sharp geometry, aggressive rhythm" },
              { name: "Panchang",      role: "Subheadings", weight: 300, sample: "Exceed the Limit",      size: "clamp(1.8rem,5vw,2.8rem)", note: "Same family, lighter weight" },
              { name: "Space Grotesk", role: "Body",        weight: 400, sample: "Built for riders first.", size: "1.1rem",                 note: "Modern, technical, readable" },
            ].map((t, i) => (
              <div key={i} style={{ padding: "2rem", background: i % 2 === 0 ? "rgba(244,245,247,0.03)" : "rgba(244,245,247,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", color: "#f26822", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "3px" }}>{t.role}</p>
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(244,245,247,0.35)" }}>{t.name} · {t.note}</p>
                </div>
                <p style={{ fontFamily: t.name === "Panchang" ? "Panchang, sans-serif" : "Space Grotesk, sans-serif", fontSize: t.size, fontWeight: t.weight, color: "#f4f5f7", lineHeight: 1 }}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <HR />

      {/* 07 VISUAL IDENTITY */}
      <Section>
        <Reveal>
          <Label>07 · Visual Identity</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "3rem" }}>
            The system<br /><span style={{ color: "#f26822", fontWeight: 300 }}>in the wild</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1rem" }}>Spark Mark</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(242,104,34,0.15)", marginBottom: "2.5rem" }}>
            <div style={{ padding: "3rem", background: "#f26822", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={SparkWhite} alt="Spark mark in white" style={{ width: "clamp(60px,20%,100px)" }} />
            </div>
            <div style={{ padding: "3rem", background: "#f4f5f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={SparkAmber} alt="Spark mark in amber" style={{ width: "clamp(60px,20%,100px)" }} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1rem" }}>Campaign Posters</p>
          <PosterStrip />
        </Reveal>
        <Reveal delay={0.3} style={{ marginTop: "2.5rem" }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(244,245,247,0.4)", textTransform: "uppercase", marginBottom: "1rem" }}>In Context</p>
          <video src={PosterMockup} autoPlay loop muted playsInline style={{ width: "100%", borderRadius: "12px", border: "1px solid rgba(242,104,34,0.2)", display: "block" }} />
        </Reveal>
      </Section>
      
      <HR />

      {/* 08 THE BIKE */}
      <Section>
        <Reveal>
          <Label>08 · The Bike</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "1rem" }}>
            Every angle.<br /><span style={{ color: "#f26822", fontWeight: 300 }}>Every line.</span>
          </h2>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.9rem,1.2vw,1rem)", color: "rgba(244,245,247,0.45)", marginBottom: "2.5rem", maxWidth: "520px", lineHeight: 1.7 }}>
            calculated
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div data-cursor="drag">
          <PulsarTurntable />
          </div>
        </Reveal>
      </Section>

      {/* SKILLS */}
      <Section>
        <Reveal>
          <Label>Skills Applied</Label>
          <h2 style={{ fontFamily: "Panchang, sans-serif", fontWeight: 500, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f4f5f7", lineHeight: 1.05, marginBottom: "2rem" }}>
            What this project <span style={{ color: "#f26822", fontWeight: 300 }}>pulled on</span>
          </h2>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.9rem,1.2vw,1rem)", color: "rgba(244,245,247,0.5)", maxWidth: "600px", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Strategy as much as execution: research, brand positioning, identity design, campaign development, motion graphics, and a fair amount of presenting the work out loud.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {["Brand Strategy", "Visual Identity", "Art Direction", "Copywriting", "Typography", "Campaign Design", "Motion Graphics", "Figma", "After Effects", "Illustrator", "Blender"].map(s => (
              <span key={s} style={{ padding: "7px 16px", borderRadius: "999px", background: "rgba(242,104,34,0.1)", border: "1px solid rgba(242,104,34,0.25)", color: "#f26822", fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <div style={{ padding: "3rem clamp(1.5rem,6vw,6rem)", borderTop: "1px solid rgba(242,104,34,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: "#0f0f12" }}>
        <img src={PulsarLogoWhite} alt="Pulsar" style={{ height: "18px", width: "auto" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(244,245,247,0.3)" }}>Exceed the Limit</span>
          <span style={{ color: "#f26822" }}>·</span>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(244,245,247,0.3)" }}>Identity System</span>
          <span style={{ color: "#f26822" }}>·</span>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(244,245,247,0.3)" }}>Campaign</span>
          <span style={{ color: "#f26822" }}>·</span>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(244,245,247,0.3)" }}>Motion</span>
          <span style={{ color: "#f26822" }}>·</span>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(244,245,247,0.3)" }}>2026</span>
        </div>
      </div>

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=panchang@300,400,500,600,700&display=swap');
        html, body { background: #0f0f12; padding-bottom: env(safe-area-inset-bottom); }
        * { box-sizing: border-box; }
        img, video { max-width: 100%; }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(auto-fit"] { grid-template-columns: 1fr 1fr !important; }
        }
            * { cursor: none !important; }
      `}</style>
    </div>
  );
}