import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const check = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTouchDevice;
}

function getScale(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 100, 0.25);
}

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

export function Cursor() {
  const isTouchDevice = useIsTouchDevice();
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [cursorName, setCursorName] = useState("");
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

useEffect(() => {
    const handleMouseEnter = (e) => {
      const el = e.target.closest('[data-cursor="drag"]');
      const scaleEl = e.target.closest('[data-cursor="scale"]');
      const hoverEl = e.target.closest('a, button, [data-cursor="hover"]');
      if (el) setCursorName("drag");
      else if (scaleEl) setCursorName("scale");
      else if (hoverEl) setCursorName("hover");
    };

    const handleMouseLeave = (e) => {
      const el = e.target.closest('[data-cursor="drag"], [data-cursor="scale"], a, button, [data-cursor="hover"]');
      if (el) setCursorName("");
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice || !cursorRef.current) return;
    const el = cursorRef.current;
    const transition = { duration: 0.2, ease: "power2.out" };

    const setX        = gsap.quickTo(el, "x", transition);
    const setY        = gsap.quickTo(el, "y", transition);
    const setRotation = gsap.quickSetter(el, "rotate", "deg");
    const setScaleX   = gsap.quickSetter(el, "scaleX");
    const setScaleY   = gsap.quickSetter(el, "scaleY");
    const setTextRot  = gsap.quickSetter(cursorTextRef.current, "rotate", "deg");

    const update = () => {
      const rotation = getAngle(vel.current.x, vel.current.y);
      const scale    = getScale(vel.current.x, vel.current.y);
      setX(pos.current.x);
      setY(pos.current.y);
      setRotation(rotation);
      setTextRot(-rotation);
      setScaleX(1 + scale);
      setScaleY(1 - scale);
    };

    const animate = () => {
      const speed = 0.5;
      pos.current.x += (targetPos.current.x - pos.current.x) * speed;
      pos.current.y += (targetPos.current.y - pos.current.y) * speed;
      vel.current.x  = targetPos.current.x - pos.current.x;
      vel.current.y  = targetPos.current.y - pos.current.y;
      update();
      requestAnimationFrame(animate);
    };

    const onMove  = (e) => { targetPos.current.x = e.clientX; targetPos.current.y = e.clientY; update(); };
    const onHide  = () => gsap.to(el, { opacity: 0, duration: 0.7, ease: "power2.out" });
    const onShow  = () => gsap.to(el, { opacity: 1, duration: 0.7, ease: "power2.out" });

    animate();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onHide);
    document.addEventListener("mouseenter", onShow);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onHide);
      document.removeEventListener("mouseenter", onShow);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  // blob sizes per state
  const blobSize = {
    "":      "10px",
    "hover": "80px",
    "scale": "40px",
    "drag":  "80px",
  }[cursorName] ?? "0px";

  const blobColor = cursorName === "drag" ? "rgba(255,255,255,0.9)" : "white";

  return (
    <div ref={cursorRef} style={{ pointerEvents: "none", position: "fixed", top: 0, left: 0, zIndex: 9999 }}>
      {/* blob */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: blobSize, height: blobSize,
        borderRadius: "50%",
        background: cursorName === "drag" ? "rgba(255,255,255,0.9)" : "transparent",
        border: "2px solid rgba(255,255,255,0.8)",
        boxShadow: cursorName === "drag" ? "0 0 20px rgba(255,255,255,0.3)" : "none",
        transition: "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease",
      }} />
      {/* drag text */}
      <div ref={cursorTextRef}>
        <div style={{
          pointerEvents: "none",
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
                    color: "#ffffff",
          fontSize: "21px",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: cursorName === "drag" || cursorName === "hover" ? 1 : 0,
          transition: "opacity 0.3s ease",
          whiteSpace: "nowrap",
        }}>
        <span style={{ color: cursorName === "drag" ? "#0A0A0A" : "#ffffff" }}>
          {cursorName === "drag" ? "Drag" : "Click"}
        </span>
        </div>
      </div>
    </div>
  );
}

// Default export = just the cursor (no demo article)
export default Cursor;