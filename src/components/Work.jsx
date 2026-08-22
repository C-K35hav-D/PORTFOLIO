import { utils } from 'animejs';
import { useRef, useState, useEffect } from "react";
import DragElements from "@/components/fancy/blocks/drag-elements";
import { useNavigate } from "react-router-dom";
import Project1 from "../assets/stuff/project2.png";
import Project2 from "../assets/stuff/project2.webm";
import Project3 from "../assets/stuff/project3.png";

const projects = [
  { id: 1, title: "Brand Design | Pulsar", teaser: Project1, type: "image" },
  { id: 2, title: "Motion & Film", teaser: Project2, type: "video" },
  { id: 3, title: "History thro Art", teaser: Project3, type: "image" },
  { id: 4, title: "Project 4", teaser: "https://images.unsplash.com/photo-1719586799413-3f42bb2a132d?q=80&w=2048&auto=format&fit=crop", type: "image" },
  { id: 5, title: "Project 5", teaser: "https://images.unsplash.com/photo-1720561467986-ca3d408ca30b?q=80&w=2048&auto=format&fit=crop", type: "image" },
  { id: 6, title: "Project 6", teaser: "https://images.unsplash.com/photo-1724403124996-64115f38cd3f?q=80&w=3082&auto=format&fit=crop", type: "image" },
];

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

function SprocketRow({ cardW }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 9px", background: "#0A0A0A" }}>
      {Array.from({ length: Math.floor(cardW / 18) }).map((_, i) => (
        <div key={i} style={{ width: `${cardW * 0.038}px`, height: `${cardW * 0.04}px`, background: "#F0EDE4", borderRadius: "1px", opacity: 0.9 }} />
      ))}
    </div>
  );
}

export default function Work() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  const rotations = useRef(projects.map(() => utils.randomPick([-12, -8, -5, -3, 0, 3, 5, 8, 12])));
  const sizes = useRef(projects.map(() => {
    const w = isMobile
      ? utils.randomPick([140, 150, 160, 170, 180])
      : isTablet
      ? utils.randomPick([180, 190, 200, 210, 220])
      : utils.randomPick([280, 295, 310, 325, 340]);
    const h = isMobile
      ? utils.randomPick([180, 190, 200, 210, 220])
      : isTablet
      ? utils.randomPick([220, 235, 250, 260])
      : utils.randomPick([310, 325, 340, 355, 370]);
    return { width: w, height: h };
  }));

  const positions = [
    { x: width * 0.06, y: height * 0.12 },
    { x: width * 0.35, y: height * 0.08 },
    { x: width * 0.62, y: height * 0.10 },
    { x: width * 0.10, y: height * 0.50 },
    { x: width * 0.38, y: height * 0.52 },
    { x: width * 0.65, y: height * 0.48 },
  ];

  const handleMouseDown = (e) => {
    e.currentTarget.dataset.startX = e.clientX;
    e.currentTarget.dataset.startY = e.clientY;
  };

  const handleClick = (e, id) => {
    const startX = parseFloat(e.currentTarget.dataset.startX);
    const startY = parseFloat(e.currentTarget.dataset.startY);
    if (Math.abs(e.clientX - startX) < 5 && Math.abs(e.clientY - startY) < 5) {
      if (id === 1) navigate("/project/1");
      if (id === 2) navigate("/project/2");
      if (id === 3) navigate("/project/3");
    }
  };

  return (
    <section id="work" style={{ width: "100%", height: "100dvh", position: "relative", background: "#26331d", overflow: "hidden" }}>
      <CuttingMatGrid width={width} height={height} />

      <div style={{ position: "absolute", top: "6.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center", pointerEvents: "none" }}>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, letterSpacing: "0.25em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Work</p>
        <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(243,237,237,0.35)", letterSpacing: "0.1em" }}>Here are a few projects I worked on</p>
      </div>

      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", alignItems: "center", gap: "0.75rem", pointerEvents: "none" }}>
        <span style={{ width: "24px", height: "1px", background: "rgba(240,237,228,0.25)" }} />
        <p style={{ fontFamily: "Space Grotesk, monospace", fontSize: "clamp(0.65rem, 2.6vw, 2.3rem)", letterSpacing: "0.1em", color: "rgba(240,237,228,0.45)", textTransform: "uppercase", whiteSpace: "nowrap", margin: 10 }}>
          Drag to explore · Click to open
        </p>
        <span style={{ width: "24px", height: "1px", background: "rgba(240,237,228,0.25)" }} />
      </div>

      <DragElements dragMomentum={false} className="w-full h-full">
        {projects.map((project, index) => {
          const rotation = rotations.current[index];
          const { width: cardW, height: cardH } = sizes.current[index];
          const pos = positions[index];
          const isFilm = project.id === 2;

          return isFilm ? (
            <div
              key={project.id}
              data-x={pos.x}
              data-y={pos.y}
              data-cursor="hover"
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseDown={handleMouseDown}
              onClick={(e) => handleClick(e, project.id)}
              style={{
                transform: `rotate(${rotation}deg)`,
                width: `${cardW}px`,
                height: `${cardH}px`,
                background: "#0A0A0A",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 28px rgba(0,0,0,0.6)",
                transition: "box-shadow 0.2s ease",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(255,61,0,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.6)"; }}
            >
              <SprocketRow cardW={cardW} />
              <div style={{ flex: 1, overflow: "hidden", margin: "0 6px" }}>
                <video
                  src={project.teaser}
                  autoPlay loop muted playsInline draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none", pointerEvents: "none", filter: "sepia(10%) contrast(1.1)" }}
                />
              </div>
              <SprocketRow cardW={cardW} />
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", color: "#F0EDE4", textTransform: "uppercase", textAlign: "center", padding: "4px 0 6px", background: "#0A0A0A", opacity: 0.6 }}>
                {project.title}
              </p>
            </div>
          ) : (
            <div
              key={project.id}
              data-x={pos.x}
              data-y={pos.y}
              data-cursor="hover"
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseDown={handleMouseDown}
              onClick={(e) => handleClick(e, project.id)}
              style={{ transform: `rotate(${rotation}deg)`, width: `${cardW}px`, height: `${cardH}px`, background: "white", padding: "8px", boxShadow: "0 10px 28px rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "6px", transition: "box-shadow 0.2s ease", cursor: "pointer" }}
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
      </DragElements>
    </section>
  );
}