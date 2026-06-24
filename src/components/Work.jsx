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

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function Work() {
  const rotations = useRef(projects.map(() => randomInt(-12, 12)));
  const sizes = useRef(projects.map(() => ({
    width: randomInt(320, 360),
    height: randomInt(350, 390),
  })));

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
        background: "#1A1206",
        overflow: "hidden",
      }}
    >
      {/* Background heading */}
      <h2
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Bebas Neue, sans-serif",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          color: "rgba(255,184,0,0.08)",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        Drag to explore · Click to open
      </h2>

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: "2.5rem",
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
            color: "rgba(240,237,228,0.35)",
            letterSpacing: "0.1em",
          }}
        >
         Projects worked on
        </p>
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
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "6px",
    transition: "box-shadow 0.2s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = "0 16px 48px rgba(255,184,0,0.3)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
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
