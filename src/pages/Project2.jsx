import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Glass from "../components/ui/Glass";
import BoxCarousel from "@/components/fancy/carousel/box-carousel";
import useScreenSize from "@/hooks/use-screen-size";
import VID1 from "../assets/Project2/portrait01.webm";
import VID3 from "../assets/Project2/portrait03.webm";
import VID2 from "../assets/Project2/landscape02.webm";
const VID4 = VID2;

import BTS01_1 from "../assets/Project2/bts01_1.webm";
import BTS01_2 from "../assets/Project2/bts01_2.webm";
import BTS01_3 from "../assets/Project2/bts01_3.webm";
import BTS01_4 from "../assets/Project2/bts01_4.webm";
// import BTS02_1 from "../assets/Project2/bts02_1.webm";
// import BTS02_2 from "../assets/Project2/bts02_2.webm";
// import BTS02_3 from "../assets/Project2/bts02_3.webm";
// import BTS02_4 from "../assets/Project2/bts02_4.webm";
// import BTS03_1 from "../assets/Project2/bts03_1.webm";
// import BTS03_2 from "../assets/Project2/bts03_2.webm";
// import BTS03_3 from "../assets/Project2/bts03_3.webm";
// import BTS03_4 from "../assets/Project2/bts03_4.webm";
// import BTS04_1 from "../assets/Project2/bts04_1.webm";
// import BTS04_2 from "../assets/Project2/bts04_2.webm";
// import BTS04_3 from "../assets/Project2/bts04_3.webm";
// import BTS04_4 from "../assets/Project2/bts04_4.webm";

const carouselItems = [
  { id: "1", type: "video", src: VID1, alt: "Portrait 01" },
  { id: "2", type: "video", src: VID2, alt: "Landscape 02" },
  { id: "3", type: "video", src: VID3, alt: "Portrait 03" },
  { id: "4", type: "video", src: VID4, alt: "Landscape 04" },
];

const scenes = [
  { id: 0, label: "Portrait 01", src: VID1, orientation: "portrait", title: "[ Scene title here ]", bts: "[ Describe what this video is about. ]", tools: ["[ Tool ]", "[ Tool ]", "[ Tool ]"], btsClips: [BTS01_1, BTS01_2, BTS01_3, BTS01_4] },
  { id: 1, label: "Landscape 02", src: VID2, orientation: "landscape", title: "[ Scene title here ]", bts: "[ Describe this one. ]", tools: ["[ Tool ]", "[ Tool ]"], btsClips: [null, null, null, null] },
  { id: 2, label: "Portrait 03", src: VID3, orientation: "portrait", title: "[ Scene title here ]", bts: "[ Your BTS notes for this scene. ]", tools: ["[ Tool ]", "[ Tool ]", "[ Tool ]"], btsClips: [null, null, null, null] },
  { id: 3, label: "Landscape 04", src: VID4, orientation: "landscape", title: "[ Scene title here ]", bts: "[ Final scene notes. ]", tools: ["[ Tool ]", "[ Tool ]"], btsClips: [null, null, null, null] },
];

// Masonry layout config — alternates sizes for visual interest
const masonrySizes = [
  { colSpan: 2, rowSpan: 1, aspectRatio: "4/5" }, // big — matches 1080×1350
  { colSpan: 1, rowSpan: 1, aspectRatio: "16/9" }, // small landscape
  { colSpan: 1, rowSpan: 2, aspectRatio: "9/16" }, // tall portrait
  { colSpan: 1, rowSpan: 1, aspectRatio: "16/9" }, // small landscape
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function Section({ children, style }) {
  return (
    <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem", ...style }}
    >{children}</motion.section>
  );
}
function Reveal({ children, style }) {
  return <motion.div variants={fadeUpVariant} style={style}>{children}</motion.div>;
}
function Divider() {
  return <div style={{ width: "100%", height: "1px", background: "rgba(255,184,0,0.12)" }} />;
}
function Pill({ children }) {
  return (
    <span style={{ padding: "6px 14px", borderRadius: "999px", background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.25)", fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--yellow)", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function ElasticSlider({ value, onChange }) {
  const [dragging, setDragging] = useState(false);
  const [stretch, setStretch] = useState(0);
  const trackRef = useRef(null);
  const getVolFromEvent = useCallback((e) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, [value]);
  const handlePointerDown = (e) => { setDragging(true); const v = getVolFromEvent(e); onChange(v); setStretch((v - value) * 2); };
  const handlePointerMove = useCallback((e) => { if (!dragging) return; const v = getVolFromEvent(e); setStretch((v - value) * 1.5); onChange(v); }, [dragging, getVolFromEvent, onChange, value]);
  const handlePointerUp = useCallback(() => { setDragging(false); setStretch(0); }, []);
  useEffect(() => {
    if (dragging) { window.addEventListener("pointermove", handlePointerMove); window.addEventListener("pointerup", handlePointerUp); }
    return () => { window.removeEventListener("pointermove", handlePointerMove); window.removeEventListener("pointerup", handlePointerUp); };
  }, [dragging, handlePointerMove, handlePointerUp]);
  const scaleX = dragging ? 1 + Math.abs(stretch) * 0.4 : 1;
  const scaleY = dragging ? 1 - Math.abs(stretch) * 0.2 : 1;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "80px", flex: 1 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,184,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /></svg>
      <div ref={trackRef} onPointerDown={handlePointerDown} style={{ position: "relative", flex: 1, height: "20px", display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: "3px", borderRadius: "999px", background: "rgba(255,184,0,0.2)" }} />
        <div style={{ position: "absolute", left: 0, width: `${value * 100}%`, height: "3px", borderRadius: "999px", background: "var(--yellow)", transition: dragging ? "none" : "width 0.1s" }} />
        <div style={{ position: "absolute", left: `${value * 100}%`, transform: `translateX(-50%) scaleX(${scaleX}) scaleY(${scaleY})`, transformOrigin: "center", width: "14px", height: "14px", borderRadius: "50%", background: "var(--yellow)", boxShadow: "0 0 8px rgba(255,184,0,0.5)", transition: dragging ? "transform 0.05s" : "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), left 0.1s", pointerEvents: "none" }} />
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,184,0,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </div>
  );
}

function BigVideoPlayer({ src, orientation }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => { if (videoRef.current) videoRef.current.volume = volume; }, [volume]);
  useEffect(() => { setPlaying(false); setProgress(0); }, [src]);
  const togglePlay = () => { if (!videoRef.current) return; playing ? videoRef.current.pause() : videoRef.current.play(); setPlaying(!playing); };
  const handleSeek = (pct) => { if (!videoRef.current) return; videoRef.current.currentTime = pct * videoRef.current.duration; setProgress(pct); };
  const formatTime = (s) => { if (!s || isNaN(s)) return "0:00"; return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`; };
  const aspectRatio = orientation === "portrait" ? "9/16" : "16/9";
  const maxW = orientation === "portrait" ? "280px" : "100%";
  return (
    <div className="big-player-wrap" style={{ width: "100%", maxWidth: maxW, margin: "0 auto", borderRadius: "14px", overflow: "hidden", background: "#0A0A0A", border: "1px solid rgba(255,184,0,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div style={{ position: "relative", aspectRatio, background: "#000", cursor: "pointer" }} onClick={togglePlay}>
        <video ref={videoRef} src={src} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          onTimeUpdate={() => { if (videoRef.current) setProgress(videoRef.current.currentTime / (videoRef.current.duration || 1)); }}
          onLoadedMetadata={() => { if (videoRef.current) setDuration(videoRef.current.duration); }}
          onEnded={() => setPlaying(false)}
        />
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--yellow)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(255,184,0,0.4)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A0A0A"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: "8px", background: "#0f0f0f" }}>
        <div onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); handleSeek((e.clientX - rect.left) / rect.width); }}
          style={{ width: "100%", height: "3px", background: "rgba(255,184,0,0.2)", borderRadius: "999px", cursor: "pointer", position: "relative" }}
        >
          <div style={{ width: `${progress * 100}%`, height: "100%", background: "var(--yellow)", borderRadius: "999px", transition: "width 0.1s linear" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={togglePlay} style={{ flexShrink: 0, width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.25)", color: "var(--yellow)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {playing ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                     : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
          </button>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", color: "rgba(255,184,0,0.5)", flexShrink: 0 }}>{formatTime(progress * duration)} / {formatTime(duration)}</span>
          <ElasticSlider value={volume} onChange={(v) => { setVolume(v); if (videoRef.current) videoRef.current.volume = v; }} />
          <button onClick={() => { if (!videoRef.current) return; document.fullscreenElement ? document.exitFullscreen() : videoRef.current.requestFullscreen(); }}
            style={{ flexShrink: 0, width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.25)", color: "var(--yellow)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── BTS Masonry Gallery ────────────────────────────────────────────────
// ── BTS Masonry Gallery — no gaps, fixed layout ────────────────────────
function BTSGallery({ clips, label }) {
  const [expanded, setExpanded] = useState(null);
  const actualClips = clips.filter(Boolean);
  if (actualClips.length === 0) return null;

  const aspectRatios = ["3/4", "16/9", "9/16", "16/9"];

  const GalleryCard = ({ src, index }) => {
    const hasClip = !!src;
    const isExpanded = expanded === index;
    return (
      <motion.div
        layout
        onClick={() => hasClip && setExpanded(isExpanded ? null : index)}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          background: hasClip ? "#0A0A0A" : "rgba(255,184,0,0.02)",
          border: `1px solid ${hasClip ? "rgba(255,184,0,0.2)" : "rgba(255,184,0,0.08)"}`,
          cursor: hasClip ? "pointer" : "default",
          aspectRatio: aspectRatios[index] || "16/9",
          width: "100%",
        }}
        whileHover={hasClip ? { scale: 1.01 } : {}}
        transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      >
        {hasClip ? (
          <>
            <video src={src} autoPlay loop muted playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)", pointerEvents: "none" }} />
            
          </>
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "160px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px dashed rgba(255,184,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,184,0,0.2)" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "9px", color: "rgba(255,184,0,0.15)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>BTS {index + 1}</p>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--yellow)", textTransform: "uppercase", margin: 0 }}>
          BTS · Behind the Scenes
        </p>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,184,0,0.15)" }} />
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", color: "rgba(240,237,228,0.3)", margin: 0, whiteSpace: "nowrap" }}>
          {actualClips.length} clip{actualClips.length > 1 ? "s" : ""} · click to expand
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Row 1 — BTS 1 full width */}
        {/* Row 1 — BTS 1 centered, smaller */}
        <div style={{ maxWidth: "80%", margin: "0 auto" }}>
          <GalleryCard src={clips[0]} index={0} />
        </div>

        {/* Row 2 — left: BTS 2 + BTS 4 stacked, right: BTS 3 tall */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr .645fr", gap: "12px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <GalleryCard src={clips[1]} index={1} />
            <GalleryCard src={clips[3]} index={3} />
          </div>
          <GalleryCard src={clips[2]} index={2} />
        </div>
      </div>
    </div>
  );
}

export default function Project2Page() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const btsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const screenSize = useScreenSize();

  useEffect(() => { window.history.scrollRestoration = "manual"; window.scrollTo(0, 0); }, []);

  const goBack = () => { navigate("/"); setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 100); };
  const scrollToBTS = () => btsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const goToScene = (index) => { setActiveIndex(index); scrollToBTS(); };

  const getCarouselDimensions = () => {
    if (screenSize.lessThan("md")) return { width: 300, height: 220 };
    return { width: 640, height: 460 };
  };
  const { width, height } = getCarouselDimensions();
  const activeScene = scenes[activeIndex];
  const hasAnyBTS = activeScene.btsClips.some(Boolean);

  return (
    <div style={{ background: "#1A1206", minHeight: "100vh", color: "var(--white)", overflowX: "hidden" }}>

      <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100 }}>
        <Glass variant="subtle" style={{ borderRadius: "999px" }}>
          <motion.button onClick={goBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "999px", border: "none", background: "transparent", color: "#f4f5f7", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back to Work
          </motion.button>
        </Glass>
      </div>

      {/* HERO */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "7rem 2rem 5rem", background: "linear-gradient(160deg, #1A1206 0%, #0A0A0A 100%)", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(255,184,0,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: "center", marginBottom: "2.5rem", zIndex: 1 }}>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.28em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: "0.75rem" }}>Motion & Film · 2026</p>
          <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 0.9, color: "var(--white)", letterSpacing: "0.02em", marginBottom: "0.75rem" }}>Moving Images</h1>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(0.85rem, 1.3vw, 1rem)", color: "rgba(240,237,228,0.4)" }}>A collection of <span style={{ color: "var(--yellow)" }}>motion</span> work.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", width: "100%", zIndex: 1 }}
        >
          <BoxCarousel ref={carouselRef} items={carouselItems} width={width} height={height} direction="right" onIndexChange={(i) => setActiveIndex(i)} enableDrag perspective={1000} />

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
            <motion.button onClick={() => carouselRef.current?.prev()} whileHover={{ scale: 1.1, x: -3 }} whileTap={{ scale: 0.95 }}
              style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.25)", color: "var(--yellow)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </motion.button>
            <AnimatePresence mode="popLayout">
              <motion.button key={activeIndex} onClick={scrollToBTS} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
                style={{ padding: "8px 20px", borderRadius: "999px", background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, color: "var(--yellow)", letterSpacing: "0.05em", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
              >
                {carouselItems[activeIndex]?.alt}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>
              </motion.button>
            </AnimatePresence>
            <motion.button onClick={() => carouselRef.current?.next()} whileHover={{ scale: 1.1, x: 3 }} whileTap={{ scale: 0.95 }}
              style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: "var(--yellow)", border: "none", color: "#0A0A0A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </motion.button>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {scenes.map((_, i) => (
              <button key={i} onClick={() => goToScene(i)}
                style={{ width: activeIndex === i ? "24px" : "8px", height: "8px", borderRadius: "999px", background: activeIndex === i ? "var(--yellow)" : "rgba(255,184,0,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }}
              />
            ))}
          </div>
        </motion.div>

        <motion.button onClick={scrollToBTS} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          style={{ position: "absolute", bottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer" }}
        >
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(240,237,228,0.2)", textTransform: "uppercase", margin: 0 }}>Click video or dot · BTS below</p>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,184,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>
          </motion.div>
        </motion.button>
      </div>

      <Divider />

      {/* BTS */}
      <div ref={btsRef} style={{ scrollMarginTop: "2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "var(--yellow)", textTransform: "uppercase" }}>
                    {String(activeIndex + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")} · {activeScene.label}
                  </span>
                  <span style={{ padding: "2px 10px", borderRadius: "999px", background: activeScene.orientation === "portrait" ? "rgba(255,61,0,0.12)" : "rgba(26,43,109,0.35)", border: `1px solid ${activeScene.orientation === "portrait" ? "rgba(255,61,0,0.3)" : "rgba(100,130,255,0.3)"}`, fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", color: activeScene.orientation === "portrait" ? "var(--orange)" : "#8fa3ff", letterSpacing: "0.08em" }}>
                    {activeScene.orientation.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => goToScene((activeIndex - 1 + scenes.length) % scenes.length)}
                    style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: "var(--yellow)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button onClick={() => goToScene((activeIndex + 1) % scenes.length)}
                    style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--yellow)", border: "none", color: "#0A0A0A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>

              <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--white)", lineHeight: 1, marginBottom: "2.5rem" }}>{activeScene.title}</h2>

              {/* 60/40 layout */}
              <div className="bts-grid" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "2.5rem", alignItems: "start", marginBottom: "4rem" }}>
                <BigVideoPlayer key={activeScene.src} src={activeScene.src} orientation={activeScene.orientation} />
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div>
                    <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: "0.75rem" }}>About this scene</p>
                    <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(240,237,228,0.7)" }}>{activeScene.bts}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: "0.75rem" }}>Tools</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {activeScene.tools.map((t) => <Pill key={t}>{t}</Pill>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* BTS MASONRY GALLERY */}
              {hasAnyBTS && <BTSGallery key={activeIndex} clips={activeScene.btsClips} label={activeScene.label} />}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Divider />

      <Section>
        <Reveal>
          <div style={{ padding: "3rem 2rem", background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "var(--yellow)", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Let's Work Together</p>
              <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--white)", lineHeight: 1, margin: 0 }}>Got a project in mind?</h3>
            </div>
            <motion.button onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "999px", background: "var(--yellow)", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,184,0,0.25)" }}
            >
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </motion.button>
          </div>
        </Reveal>
      </Section>

      <div style={{ padding: "2.5rem 2rem calc(2.5rem + env(safe-area-inset-bottom)) 2rem", borderTop: "1px solid rgba(255,184,0,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.25rem", color: "var(--white)", letterSpacing: "0.1em", margin: 0 }}>Moving Images</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(240,237,228,0.3)" }}>Motion & Film</span>
          <span style={{ color: "var(--yellow)" }}>·</span>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(240,237,228,0.3)" }}>2026</span>
        </div>
      </div>

      <style>{`
        html, body { background: #1A1206; }
        @media (max-width: 768px) {
          .bts-grid { grid-template-columns: 1fr !important; }
        }
        .big-player-wrap:-webkit-full-screen video, .big-player-wrap:-moz-full-screen video, .big-player-wrap:fullscreen video {
          width: auto !important; height: 100% !important; max-width: 100% !important; object-fit: contain !important;
        }
        .big-player-wrap:-webkit-full-screen, .big-player-wrap:-moz-full-screen, .big-player-wrap:fullscreen {
          background: #000 !important; display: flex !important; flex-direction: column !important; justify-content: center !important;
        }
      `}</style>
    </div>
  );
}