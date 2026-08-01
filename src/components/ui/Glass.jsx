import React, { useEffect, useRef, useState, useId, useMemo } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs) => twMerge(clsx(inputs));

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return isDark;
};

const GLASS_PRESETS = {
  subtle: { backgroundOpacity: 0.06, saturation: 1.1, brightness: 55, blur: 8, displace: 0.3, distortionScale: -80, redOffset: -2, greenOffset: 6, blueOffset: 12, mixBlendMode: "difference" },
  default: { backgroundOpacity: 0.1, saturation: 1.4, brightness: 55, blur: 10, displace: 0.5, distortionScale: -160, redOffset: 0, greenOffset: 8, blueOffset: 16, mixBlendMode: "difference" },
  bold: { backgroundOpacity: 0.18, saturation: 1.8, brightness: 60, blur: 12, displace: 0.8, distortionScale: -240, redOffset: 6, greenOffset: 12, blueOffset: 24, mixBlendMode: "screen" },
  ghost: { backgroundOpacity: 0, saturation: 1, brightness: 55, blur: 6, displace: 0, distortionScale: 0, redOffset: 0, greenOffset: 0, blueOffset: 0, mixBlendMode: "difference" },
};

const GLASS_DEFAULTS = { width: "auto", height: "auto", borderRadius: 999, borderWidth: 0.07, opacity: 0.93, xChannel: "R", yChannel: "G" };

const Glass = (rawProps) => {
  const { variant = "default", children, className = "", style = {}, width, height, borderRadius, borderWidth, brightness, opacity, blur, displace, backgroundOpacity, saturation, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode } = rawProps;

  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;
  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);
  const isDarkMode = useDarkMode();

  const v = useMemo(() => {
    const p = GLASS_PRESETS[variant] ?? GLASS_PRESETS.default;
    return {
      ...GLASS_DEFAULTS, ...p,
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(borderRadius !== undefined && { borderRadius }),
      ...(borderWidth !== undefined && { borderWidth }),
      ...(brightness !== undefined && { brightness }),
      ...(opacity !== undefined && { opacity }),
      ...(blur !== undefined && { blur }),
      ...(displace !== undefined && { displace }),
      ...(backgroundOpacity !== undefined && { backgroundOpacity }),
      ...(saturation !== undefined && { saturation }),
      ...(distortionScale !== undefined && { distortionScale }),
      ...(redOffset !== undefined && { redOffset }),
      ...(greenOffset !== undefined && { greenOffset }),
      ...(blueOffset !== undefined && { blueOffset }),
      ...(xChannel !== undefined && { xChannel }),
      ...(yChannel !== undefined && { yChannel }),
      ...(mixBlendMode !== undefined && { mixBlendMode }),
    };
  }, [variant, width, height, borderRadius, borderWidth, brightness, opacity, blur, displace, backgroundOpacity, saturation, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode]);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 60;
    const edgeSize = Math.min(actualWidth, actualHeight) * (v.borderWidth * 0.5);
    const svgContent = `<svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"/>
      <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${v.borderRadius}" fill="url(#${redGradId})" />
      <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${v.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${v.mixBlendMode}" />
      <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${v.borderRadius}" fill="hsl(0 0% ${v.brightness}% / ${v.opacity})" style="filter:blur(${v.blur}px)" />
    </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    if (feImageRef.current) feImageRef.current.setAttribute("href", generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [{ ref: redChannelRef, offset: v.redOffset }, { ref: greenChannelRef, offset: v.greenOffset }, { ref: blueChannelRef, offset: v.blueOffset }].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute("scale", (v.distortionScale + offset).toString());
        ref.current.setAttribute("xChannelSelector", v.xChannel);
        ref.current.setAttribute("yChannelSelector", v.yChannel);
      }
    });
    if (gaussianBlurRef.current) gaussianBlurRef.current.setAttribute("stdDeviation", v.displace.toString());
  }, [v.width, v.height, v.borderRadius, v.borderWidth, v.brightness, v.opacity, v.blur, v.displace, v.distortionScale, v.redOffset, v.greenOffset, v.blueOffset, v.xChannel, v.yChannel, v.mixBlendMode, variant]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => setTimeout(updateDisplacementMap, 0));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => { setTimeout(updateDisplacementMap, 0); }, [v.width, v.height]);

  const [svgFilterSupported, setSvgFilterSupported] = useState(true);
  const [backdropFilterSupported, setBackdropFilterSupported] = useState(true);

  useEffect(() => {
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    setSvgFilterSupported(!isWebkit && !isFirefox);
    setBackdropFilterSupported(CSS.supports("backdrop-filter", "blur(10px)"));
  }, []);

  const getContainerStyles = () => {
    const baseStyles = {
      ...style,
      width: typeof v.width === "number" ? `${v.width}px` : v.width,
      height: typeof v.height === "number" ? `${v.height}px` : v.height,
      borderRadius: `${v.borderRadius}px`,
    };
    if (svgFilterSupported) {
      return {
        ...baseStyles,
        background: `hsl(0 0% 0% / ${v.backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${v.saturation}) blur(5px)`,
        boxShadow: `0px 8px 32px rgba(0,0,0,0.3)`,
        border: "1px solid rgba(255, 255, 255, 0.15)",
      };
    }
    return {
      ...baseStyles,
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px) saturate(1.8)",
      WebkitBackdropFilter: "blur(12px) saturate(1.8)",
      border: "1px solid rgba(255,255,255,0.15)",
    };
  };

  return (
    <div ref={containerRef} className={cn("relative flex items-center justify-center overflow-hidden", className)} style={getContainerStyles()}>
      <svg className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} href={generateDisplacementMap()} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
      <div className="w-full h-full flex items-center justify-center rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Glass;
