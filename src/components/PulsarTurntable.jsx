// import { useEffect, useRef, useState } from "react";

// // Import all 240 frames
// const frames = [
//   new URL('../assets/pulsar/turntable/0001.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0002.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0003.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0004.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0005.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0006.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0007.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0008.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0009.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0010.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0011.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0012.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0013.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0014.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0015.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0016.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0017.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0018.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0019.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0020.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0021.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0022.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0023.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0024.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0025.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0026.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0027.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0028.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0029.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0030.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0031.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0032.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0033.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0034.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0035.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0036.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0037.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0038.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0039.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0040.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0041.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0042.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0043.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0044.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0045.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0046.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0047.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0048.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0049.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0050.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0051.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0052.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0053.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0054.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0055.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0056.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0057.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0058.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0059.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0060.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0061.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0062.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0063.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0064.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0065.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0066.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0067.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0068.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0069.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0070.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0071.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0072.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0073.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0074.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0075.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0076.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0077.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0078.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0079.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0080.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0081.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0082.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0083.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0084.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0085.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0086.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0087.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0088.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0089.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0090.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0091.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0092.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0093.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0094.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0095.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0096.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0097.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0098.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0099.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0100.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0101.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0102.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0103.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0104.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0105.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0106.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0107.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0108.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0109.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0110.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0111.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0112.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0113.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0114.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0115.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0116.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0117.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0118.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0119.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0120.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0121.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0122.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0123.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0124.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0125.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0126.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0127.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0128.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0129.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0130.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0131.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0132.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0133.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0134.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0135.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0136.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0137.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0138.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0139.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0140.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0141.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0142.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0143.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0144.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0145.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0146.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0147.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0148.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0149.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0150.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0151.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0152.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0153.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0154.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0155.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0156.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0157.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0158.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0159.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0160.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0161.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0162.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0163.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0164.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0165.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0166.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0167.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0168.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0169.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0170.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0171.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0172.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0173.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0174.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0175.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0176.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0177.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0178.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0179.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0180.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0181.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0182.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0183.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0184.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0185.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0186.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0187.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0188.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0189.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0190.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0191.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0192.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0193.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0194.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0195.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0196.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0197.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0198.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0199.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0200.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0201.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0202.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0203.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0204.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0205.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0206.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0207.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0208.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0209.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0210.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0211.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0212.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0213.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0214.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0215.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0216.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0217.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0218.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0219.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0220.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0221.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0222.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0223.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0224.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0225.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0226.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0227.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0228.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0229.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0230.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0231.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0232.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0233.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0234.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0235.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0236.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0237.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0238.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0239.webp', import.meta.url).href,
//   new URL('../assets/pulsar/turntable/0240.webp', import.meta.url).href,
// ];

// const TOTAL = frames.length; // 240

// export default function PulsarTurntable() {
//   const [frameIndex, setFrameIndex] = useState(0);
//   const [dragging, setDragging]     = useState(false);
//   const [loaded, setLoaded]         = useState(false);
//   const lastX   = useRef(null);
//   const accRef  = useRef(0); // sub-frame accumulator for smooth feel
//   const containerRef = useRef(null);

//   // Preload all frames
//   useEffect(() => {
//     let loaded = 0;
//     frames.forEach(src => {
//       const img = new Image();
//       img.onload = () => { loaded++; if (loaded === TOTAL) setLoaded(true); };
//       img.src = src;
//     });
//   }, []);

//   // Mouse wheel — horizontal or vertical both work
//   const handleWheel = (e) => {
//     e.preventDefault();
//     const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
//     accRef.current += delta * 0.08;
//     const steps = Math.round(accRef.current);
//     if (steps !== 0) {
//       accRef.current -= steps;
//       setFrameIndex(i => ((i + steps) % TOTAL + TOTAL) % TOTAL);
//     }
//   };

//   // Touch / drag
//   const handlePointerDown = (e) => {
//     setDragging(true);
//     lastX.current = e.clientX ?? e.touches?.[0]?.clientX;
//     e.currentTarget.setPointerCapture?.(e.pointerId);
//   };

//   const handlePointerMove = (e) => {
//     if (!dragging) return;
//     const x = e.clientX ?? e.touches?.[0]?.clientX;
//     if (lastX.current === null) { lastX.current = x; return; }
//     const dx = x - lastX.current;
//     lastX.current = x;
//     accRef.current += dx * -0.5; // negative = drag right → rotate forward
//     const steps = Math.round(accRef.current);
//     if (steps !== 0) {
//       accRef.current -= steps;
//       setFrameIndex(i => ((i + steps) % TOTAL + TOTAL) % TOTAL);
//     }
//   };

//   const handlePointerUp = () => { setDragging(false); lastX.current = null; };

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     el.addEventListener("wheel", handleWheel, { passive: false });
//     return () => el.removeEventListener("wheel", handleWheel);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//       onPointerLeave={handlePointerUp}
//       style={{
//         position: "relative",
//         width: "100%",
//         aspectRatio: "16/9",
//         borderRadius: "16px",
//         overflow: "hidden",
//         background: "#0a0a0d",
//         border: "1px solid rgba(242,104,34,0.2)",
//         cursor: dragging ? "grabbing" : "grab",
//         userSelect: "none",
//         touchAction: "none",
//       }}
//     >
//       {!loaded && (
//         <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
//           <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid rgba(242,104,34,0.2)", borderTop: "2px solid #f26822", animation: "spin 0.8s linear infinite" }} />
//           <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(244,245,247,0.3)", textTransform: "uppercase" }}>Loading frames…</p>
//         </div>
//       )}

//       {loaded && (
//         <img
//           src={frames[frameIndex]}
//           alt={`Bike angle ${frameIndex + 1}`}
//           draggable={false}
//           style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", pointerEvents: "none" }}
//         />
//       )}

//       {/* hint */}
//       <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "6px", pointerEvents: "none" }}>
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(242,104,34,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M5 12h14"/><path d="M15 6l6 6-6 6"/>
//         </svg>
//         <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(244,245,247,0.25)", textTransform: "uppercase" }}>Drag or scroll to rotate</p>
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(242,104,34,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scaleX(-1)" }}>
//           <path d="M5 12h14"/><path d="M15 6l6 6-6 6"/>
//         </svg>
//       </div>

//       {/* frame counter */}
//       {/* <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: "999px", border: "1px solid rgba(242,104,34,0.2)" }}>
//         <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", color: "rgba(242,104,34,0.7)", letterSpacing: "0.1em" }}>
//           {String(frameIndex + 1).padStart(3, "0")} / {TOTAL}
//         </p>
//       </div> */}

//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";

const BIKE_VIDEO = new URL('../assets/pulsar/3dbike-smooth.webm', import.meta.url).href;

export default function PulsarTurntable() {
  const videoRef    = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady]     = useState(false);
  const [dragging, setDragging] = useState(false);
  const lastX       = useRef(null);
  const durationRef = useRef(0);
  const currentTime = useRef(0);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.pause();
    vid.addEventListener("loadedmetadata", () => {
      durationRef.current = vid.duration;
      vid.currentTime = 0;
      setReady(true);
    });
  }, []);

  const seek = (delta) => {
    const vid = videoRef.current;
    if (!vid || !durationRef.current) return;
    currentTime.current = (currentTime.current + delta + durationRef.current) % durationRef.current;
    vid.currentTime = currentTime.current;
  };

  // Scroll wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 0.003;
      seek(delta);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag
  const onPointerDown = (e) => {
    setDragging(true);
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    seek(dx * -0.004); // negative = drag right → forward
  };

  const onPointerUp = () => { setDragging(false); lastX.current = null; };

  return (
    <div
      ref={containerRef}
      data-cursor="drag"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
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
      {/* loading spinner */}
      {!ready && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid rgba(242,104,34,0.2)", borderTop: "2px solid #f26822", animation: "spin 0.8s linear infinite" }} />
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(244,245,247,0.3)", textTransform: "uppercase" }}>Loading…</p>
        </div>
      )}

      <video
        ref={videoRef}
        src={BIKE_VIDEO}
        muted
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* hint */}
      {ready && (
        <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "6px", pointerEvents: "none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(242,104,34,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="M15 6l6 6-6 6"/>
          </svg>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(244,245,247,0.25)", textTransform: "uppercase" }}>
            Drag to rotate.
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