import { useRef, useState, useEffect } from "react";
import DragElements from "@/components/fancy/blocks/drag-elements";

import Bolt from "../assets/stuff/Bolt.png";
import Brain from "../assets/stuff/Brain.png";
import Bulb from "../assets/stuff/Bulb.png";
import Chat from "../assets/stuff/Chat.png";
import Emark from "../assets/stuff/Emark.png";
import Nut from "../assets/stuff/Nut.png";

const projects = [
  { id: 1, title: "Project 1", teaser: "https://images.unsplash.com/photo-1683746531526-3bca2bc901b8?q=80&w=1820&auto=format&fit=crop" },
  { id: 2, title: "Project 2", teaser: "https://images.unsplash.com/photo-1631561729243-9b3291efceae?q=80&w=1885&auto=format&fit=crop" },
  { id: 3, title: "Project 3", teaser: "https://images.unsplash.com/photo-1635434002329-8ab192fe01e1?q=80&w=2828&auto=format&fit=crop" },
  { id: 4, title: "Project 4", teaser: "https://images.unsplash.com/photo-1719586799413-3f42bb2a132d?q=80&w=2048&auto=format&fit=crop" },
  { id: 5, title: "Project 5", teaser: "https://images.unsplash.com/photo-1720561467986-ca3d408ca30b?q=80&w=2048&auto=format&fit=crop" },
  { id: 6, title: "Project 6", teaser: "https://images.unsplash.com/photo-1724403124996-64115f38cd3f?q=80&w=3082&auto=format&fit=crop" },
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

function CuttingMatGrid({ width, height }) {
  const unit = 40;
  const majorEvery = 5;
  const cols = Math.ceil(width / unit);
  const rows = Math.ceil(height / unit);
  const vLines = [], hLines = [], topLabels = [], leftLabels = [];

  for (let i = 0; i <= cols; i++) {
    const x = i * unit;
    const isMajor = i % majorEvery === 0;
    vLines.push(<line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height} stroke={isMajor ? "rgba(240,237,228,0.16)" : "rgba(240,237,228,0.06)"} strokeWidth={isMajor ? 1.4 : 1} />);
    if (isMajor) topLabels.push(<text key={`tl-${i}`} x={x + 4} y={16} fontFamily="Space Grotesk, monospace" fontSize="10" letterSpacing="0.05em" fill="rgba(255,184,0,0.35)">{i * 10}</text>);
  }
  for (let j = 0; j <= rows; j++) {
    const y = j * unit;
    const isMajor = j % majorEvery === 0;
    hLines.push(<line key={`h-${j}`} x1={0} y1={y} x2={width} y2={y} stroke={isMajor ? "rgba(240,237,228,0.16)" : "rgba(240,237,228,0.06)"} strokeWidth={isMajor ? 1.4 : 1} />);
    if (isMajor) leftLabels.push(<text key={`ll-${j}`} x={4} y={y + 12} fontFamily="Space Grotesk, monospace" fontSize="10" letterSpacing="0.05em" fill="rgba(255,184,0,0.35)">{j * 10}</text>);
  }
  const diagonals = [];
  const step = unit * majorEvery * 2;
  for (let d = -height; d < width + height; d += step) {
    diagonals.push(<line key={`d-${d}`} x1={d} y1={0} x2={d + height} y2={height} stroke="rgba(217,90,48,0.08)" strokeWidth={1} />);
  }

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <defs>
        <linearGradient id="matBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3c4f30" />
          <stop offset="100%" stopColor="#26331d" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#matBase)" />
      {diagonals}{vLines}{hLines}
      <circle cx={0} cy={0} r={3} fill="rgba(217,90,48,0.6)" />
      {topLabels}{leftLabels}
    </svg>
  );
}

export default function Work() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const rotations = useRef(projects.map(() => randomInt(-12, 12)));
  const sizes = useRef(projects.map(() => ({
    width: isMobile ? randomInt(140, 180) : isTablet ? randomInt(180, 220) : randomInt(280, 340),
    height: isMobile ? randomInt(180, 220) : isTablet ? randomInt(220, 260) : randomInt(310, 370),
  })));

  // stuff items use pixel values based on window size
  const stuffItems = [
    { src: Emark, alt: "!",     x: width * 0.04,  y: height * 0.12, width: Math.max(70, width * 0.03),  rotate: -15 },
    { src: Brain, alt: "brain", x: width * 0.20,  y: height * 0.08, width: Math.max(190, width * 0.16),  rotate: 8   },
    { src: Bulb,  alt: "bulb",  x: width * 0.70,  y: height * 0.07, width: Math.max(90, width * 0.05),  rotate: -6  },
    { src: Chat,  alt: "chat",  x: width * 0.85,  y: height * 0.14, width: Math.max(90, width * 0.04),  rotate: 12  },
    { src: Bolt,  alt: "bolt",  x: width * 0.06,  y: height * 0.72, width: Math.max(35, width * 0.04), rotate: 30  },
    { src: Nut,   alt: "nut",   x: width * 0.86,  y: height * 0.76, width: Math.max(35, width * 0.04), rotate: -20 },
  ];

  return (
    <section
      id="work"
      style={{ width: "100%", height: "100dvh", position: "relative", background: "#26331d", overflow: "hidden" }}
    >
      <CuttingMatGrid width={width} height={height} />

      {/* top label */}
      <div style={{ position: "absolute", top: "6.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, letterSpacing: "0.25em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Work</p>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(243,237,237,0.35)", letterSpacing: "0.1em" }}>Here are a few projects I worked on</p>
      </div>

      {/* bottom hint */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", alignItems: "center", gap: "0.75rem", pointerEvents: "none" }}>
        <span style={{ width: "24px", height: "1px", background: "rgba(240,237,228,0.25)" }} />
        <p style={{ fontFamily: "Space Grotesk, monospace", fontSize: "clamp(0.65rem, 2.6vw, 2.3rem)", letterSpacing: "0.1em", color: "rgba(240,237,228,0.45)", textTransform: "uppercase", whiteSpace: "nowrap", margin: 10 }}>
          Drag to explore · Click to open
        </p>
        <span style={{ width: "24px", height: "1px", background: "rgba(240,237,228,0.25)" }} />
      </div>

      <DragElements dragMomentum={false} className="w-full h-full">

        {/* PROJECT CARDS */}
        {projects.map((project, index) => {
          const rotation = rotations.current[index];
          const { width: cardW, height: cardH } = sizes.current[index];
          return (
            <div key={project.id} style={{ transform: `rotate(${rotation}deg)`, width: `${cardW}px`, height: `${cardH}px`, background: "white", padding: "8px", boxShadow: "0 10px 28px rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "6px", transition: "box-shadow 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(255,184,0,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.45)"; }}
            >
              <div style={{ width: "100%", height: `${cardH - 36}px`, overflow: "hidden" }}>
                <img src={project.teaser} alt={project.title} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }} />
              </div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "#0A0A0A", textTransform: "uppercase" }}>{project.title}</p>
            </div>
          );
        })}

        {/* STUFF ICONS — use marginLeft/marginTop to offset from top-left origin */}
        {stuffItems.map((item) => (
          <div
            key={item.alt}
            data-x={item.x}
            data-y={item.y}
          >
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
              style={{
                width: `${item.width}px`,
                height: "auto",
                transform: `rotate(${item.rotate}deg)`,
                display: "block",
                userSelect: "none",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
              }}
            />
          </div>
        ))}

      </DragElements>
    </section>
  );
}