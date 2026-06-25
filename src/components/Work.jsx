import { useRef } from "react";
import DragElements from "@/components/fancy/blocks/drag-elements";

const projects = [
  {
    id: 1,
    title: "Project 1",
    teaser: "https://images.unsplash.com/photo-1683746531526-3bca2bc901b8?q=80&w=1820&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Project 2",
    teaser: "https://images.unsplash.com/photo-1631561729243-9b3291efceae?q=80&w=1885&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Project 3",
    teaser: "https://images.unsplash.com/photo-1635434002329-8ab192fe01e1?q=80&w=2828&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Project 4",
    teaser: "https://images.unsplash.com/photo-1719586799413-3f42bb2a132d?q=80&w=2048&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Project 5",
    teaser: "https://images.unsplash.com/photo-1720561467986-ca3d408ca30b?q=80&w=2048&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Project 6",
    teaser: "https://images.unsplash.com/photo-1724403124996-64115f38cd3f?q=80&w=3082&auto=format&fit=crop",
  },
];

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Cutting-mat grid background.
 * Draws minor + major gridlines (like mm/cm marks), a couple of faint
 * 45° cutting guides, ruler numbers along the top and left edges, and a
 * small "origin" mark — so the section reads as a real self-healing
 * cutting mat sitting under the project polaroids.
 */
function CuttingMatGrid({ width, height }) {
  const unit = 40; // minor grid spacing in px
  const majorEvery = 5; // every 5th line is bold + numbered

  const cols = Math.ceil(width / unit);
  const rows = Math.ceil(height / unit);

  const vLines = [];
  const hLines = [];
  const topLabels = [];
  const leftLabels = [];

  for (let i = 0; i <= cols; i++) {
    const x = i * unit;
    const isMajor = i % majorEvery === 0;
    vLines.push(
      <line
        key={`v-${i}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={isMajor ? "rgba(240,237,228,0.16)" : "rgba(240,237,228,0.06)"}
        strokeWidth={isMajor ? 1.4 : 1}
      />
    );
    if (isMajor) {
      topLabels.push(
        <text
          key={`tl-${i}`}
          x={x + 4}
          y={16}
          fontFamily="Space Grotesk, monospace"
          fontSize="10"
          letterSpacing="0.05em"
          fill="rgba(255,184,0,0.35)"
        >
          {i * 10}
        </text>
      );
    }
  }

  for (let j = 0; j <= rows; j++) {
    const y = j * unit;
    const isMajor = j % majorEvery === 0;
    hLines.push(
      <line
        key={`h-${j}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke={isMajor ? "rgba(240,237,228,0.16)" : "rgba(240,237,228,0.06)"}
        strokeWidth={isMajor ? 1.4 : 1}
      />
    );
    if (isMajor) {
      leftLabels.push(
        <text
          key={`ll-${j}`}
          x={4}
          y={y + 12}
          fontFamily="Space Grotesk, monospace"
          fontSize="10"
          letterSpacing="0.05em"
          fill="rgba(255,184,0,0.35)"
        >
          {j * 10}
        </text>
      );
    }
  }

  // faint 45° cutting guides, spread wide so they stay subtle
  const diagonals = [];
  const step = unit * majorEvery * 2;
  for (let d = -height; d < width + height; d += step) {
    diagonals.push(
      <line
        key={`d-${d}`}
        x1={d}
        y1={0}
        x2={d + height}
        y2={height}
        stroke="rgba(217,90,48,0.08)"
        strokeWidth={1}
      />
    );
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <defs>
        <linearGradient id="matBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3c4f30" />
          <stop offset="100%" stopColor="#26331d" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#matBase)" />
      {diagonals}
      {vLines}
      {hLines}
      <circle cx={0} cy={0} r={3} fill="rgba(217,90,48,0.6)" />
      {topLabels}
      {leftLabels}
    </svg>
  );
}

export default function Work() {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  const rotations = useRef(projects.map(() => randomInt(-12, 12)));

  const sizes = useRef(
    projects.map(() => ({
      width: isMobile
        ? randomInt(140, 180)
        : isTablet
        ? randomInt(180, 220)
        : randomInt(320, 360),

      height: isMobile
        ? randomInt(180, 220)
        : isTablet
        ? randomInt(220, 260)
        : randomInt(350, 390),
    }))
  );

  const handleMouseDown = (e) => {
    e.currentTarget.dataset.startX = e.clientX;
    e.currentTarget.dataset.startY = e.clientY;
  };

  const handleClick = (e, id) => {
    const startX = parseFloat(e.currentTarget.dataset.startX);
    const startY = parseFloat(e.currentTarget.dataset.startY);
    const distX = Math.abs(e.clientX - startX);
    const distY = Math.abs(e.clientY - startY);

    if (distX < 5 && distY < 5) {
      window.open(`/project/${id}`, "_blank");
    }
  };

  return (
    <section
      id="work"
      style={{
        width: "100%",
        height: "100dvh",
        position: "relative",
        background: "#26331d",
        overflow: "hidden",
      }}
    >
      {/* Cutting mat background */}
      <CuttingMatGrid width={window.innerWidth} height={window.innerHeight} />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: "6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.25em",
            color: "var(--yellow)",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          Work
        </p>
        <p
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "12px",
            color: "rgba(243, 237, 237, 0.35)",
            letterSpacing: "0.1em",
          }}
        >
          Here are few Projects I worked on
        </p>
      </div>

      {/* Drag / click hint — a small printed-label tag rather than a giant watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            width: "24px",
            height: "1px",
            background: "rgba(240,237,228,0.25)",
          }}
        />
        <p
          style={{
            fontFamily: "Space Grotesk, monospace",
            fontSize: "clamp(0.65rem, 2.6vw, 2.3rem)",
            letterSpacing: "0.1em",
            color: "rgba(240,237,228,0.45)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            margin: 10,
          }}
        >
          Drag to explore · Click to open
        </p>
        <span
          style={{
            width: "24px",
            height: "1px",
            background: "rgba(240,237,228,0.25)",
          }}
        />
      </div>

      {/* Draggable cards */}
      <DragElements dragMomentum={false} className="w-full h-full p-20">
        {projects.map((project, index) => {
          const rotation = rotations.current[index];
          const { width, height } = sizes.current[index];

          return (
            <div
              key={project.id}
              onMouseDown={handleMouseDown}
              onClick={(e) => handleClick(e, project.id)}
              style={{
                transform: `rotate(${rotation}deg)`,
                width: `${width}px`,
                height: `${height}px`,
                background: "white",
                padding: "8px",
                boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "6px",
                transition: "box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 16px 48px rgba(255,184,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 28px rgba(0,0,0,0.45)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${height - 36}px`,
                  overflow: "hidden",
                }}
              >
                <img
                  src={project.teaser}
                  alt={project.title}
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    userSelect: "none",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "#0A0A0A",
                  textTransform: "uppercase",
                }}
              >
                {project.title}
              </p>
            </div>
          );
        })}
      </DragElements>
    </section>
  );
}