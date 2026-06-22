import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ServiceHeading({ text }) {
  const scope = useRef(null);
  const timelineRef = useRef(null);
  const [splitting, setSplitting] = useState(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    import("splitting").then((mod) => {
      setSplitting(() => mod.default);
    });
  }, []);

  useGSAP(
    () => {
      const setup = async () => {
        if (!splitting || !scope.current) return;
        await splitting({ target: scope.current });

        const chars = scope.current?.querySelectorAll(".char");
        if (!chars || !chars.length) return;

        // build the timeline but keep it paused at the start
        timelineRef.current = gsap.timeline({ paused: true }).fromTo(
          chars,
          {
            skewX: -30,
            filter: "blur(10px) brightness(0%)",
            willChange: "filter, transform",
          },
          {
            skewX: 0,
            filter: "blur(0px) brightness(100%)",
            duration: 0.5,
            stagger: 0.05,
            ease: "none",
          }
        );

        // watch for when this heading scrolls into view
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              timelineRef.current?.restart();
              hasPlayedRef.current = true;
            } else if (hasPlayedRef.current) {
              // reset so it can replay next time it scrolls back in
              timelineRef.current?.pause(0);
            }
          },
          { threshold: 0.4 }
        );

        observer.observe(scope.current);

        return () => observer.disconnect();
      };

      setup();
    },
    { scope, dependencies: [splitting] }
  );

  return (
    <h2
      ref={scope}
      data-splitting
      style={{
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: "clamp(3rem, 8vw, 7rem)",
        lineHeight: 1,
        color: "var(--white)",
        marginBottom: "1rem",
      }}
    >
      {text}
    </h2>
  );
}