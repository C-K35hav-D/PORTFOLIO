import { useEffect, useRef, useState } from "react";

const TOTAL = 240;
const BASE  = "https://res.cloudinary.com/w9xrjxe3/image/upload/v1787377775";

// Build all 240 URLs — no local imports needed
const frames = Array.from({ length: TOTAL }, (_, i) =>
  `${BASE}/${String(i + 1).padStart(4, "0")}.webp`
);

export default function PulsarTurntable() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [dragging, setDragging]     = useState(false);
  const [loaded, setLoaded]         = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const lastX        = useRef(null);
  const accRef       = useRef(0);
  const containerRef = useRef(null);

  // Preload all frames
  useEffect(() => {
    let count = 0;
    frames.forEach(src => {
      const img = new Image();
      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === TOTAL) setLoaded(true);
      };
      img.onerror = () => { count++; if (count === TOTAL) setLoaded(true); };
      img.src = src;
    });
  }, []);

  // Wheel
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    accRef.current += delta * 0.08;
    const steps = Math.round(accRef.current);
    if (steps !== 0) {
      accRef.current -= steps;
      setFrameIndex(i => ((i + steps) % TOTAL + TOTAL) % TOTAL);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag
  const handlePointerDown = (e) => {
    setDragging(true);
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    accRef.current += dx * -0.5;
    const steps = Math.round(accRef.current);
    if (steps !== 0) {
      accRef.current -= steps;
      setFrameIndex(i => ((i + steps) % TOTAL + TOTAL) % TOTAL);
    }
  };

  const handlePointerUp = () => { setDragging(false); lastX.current = null; };

  const pct = Math.round((loadedCount / TOTAL) * 100);

  return (
    <div
      ref={containerRef}
      data-cursor="drag"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#0a0a0d",
        border: "1px solid rgba(242,104,34,0.2)",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/* loading */}
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid rgba(242,104,34,0.2)", borderTop: "2px solid #f26822", animation: "spin 0.8s linear infinite" }} />
          {/* progress bar */}
          <div style={{ width: "160px", height: "2px", background: "rgba(242,104,34,0.15)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#f26822", borderRadius: "999px", transition: "width 0.1s linear" }} />
          </div>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(244,245,247,0.3)", textTransform: "uppercase" }}>
            {pct}%
          </p>
        </div>
      )}

      {/* current frame */}
      <img
        src={frames[frameIndex]}
        alt={`Bike angle ${frameIndex + 1}`}
        draggable={false}
        style={{
          width: "100%", height: "100%",
          objectFit: "contain",
          display: "block",
          pointerEvents: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* hint */}
      {loaded && (
        <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "6px", pointerEvents: "none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(242,104,34,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="M15 6l6 6-6 6"/>
          </svg>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(244,245,247,0.25)", textTransform: "uppercase" }}>
            Drag to rotate
          </p>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(242,104,34,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scaleX(-1)" }}>
            <path d="M5 12h14"/><path d="M15 6l6 6-6 6"/>
          </svg>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}