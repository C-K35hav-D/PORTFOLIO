import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BoxCarousel from "@/components/fancy/carousel/box-carousel";
import useScreenSize from "@/hooks/use-screen-size";

const carouselItems = [
  {
    id: "1",
    type: "image",
    src: "https://placehold.co/700x500/FF3D00/F0EDE4?text=Project+01",
    alt: "Brand Identity Project",
  },
  {
    id: "2",
    type: "image",
    src: "https://placehold.co/700x500/FFB800/0A0A0A?text=Project+02",
    alt: "Motion Design",
  },
  {
    id: "3",
    type: "image",
    src: "https://placehold.co/700x500/E8135A/F0EDE4?text=Project+03",
    alt: "UI/UX Design",
  },
  {
    id: "4",
    type: "image",
    src: "https://placehold.co/700x500/1A2B6D/F0EDE4?text=Project+04",
    alt: "Visual Identity",
  },
  {
    id: "5",
    type: "image",
    src: "https://placehold.co/700x500/FF3D00/F0EDE4?text=Project+05",
    alt: "3D Art",
  },
  {
    id: "6",
    type: "image",
    src: "https://placehold.co/700x500/FFB800/0A0A0A?text=Project+06",
    alt: "Poster Design",
  },
];

export default function Work() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenSize = useScreenSize();

  const getCarouselDimensions = () => {
    if (screenSize.lessThan("md")) {
      return { width: 220, height: 165 };
    }
    return { width: 400, height: 300 };
  };

  const { width, height } = getCarouselDimensions();

  return (
    <section
      id="work"
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "8rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1A1206",
        position: "relative",
      }}
    >
      {/* section label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.25em",
          color: "var(--yellow)",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Here are few Projects
      </motion.p>

      {/* heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          fontSize: "clamp(2.5rem, 7vw, 6rem)",
          lineHeight: 1,
          color: "var(--white)",
          marginBottom: "4rem",
          textAlign: "center",
        }}
      >
        Things I've{" "}
        <span
          style={{
            WebkitTextStroke: ".15vw var(--yellow)",
            WebkitTextFillColor: "transparent",
          }}
        >
          DESIGNED
        </span>
      </motion.h2>

      {/* carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <BoxCarousel
          ref={carouselRef}
          items={carouselItems}
          width={width}
          height={height}
          direction="right"
          autoPlay
          autoPlayInterval={2000}
          onIndexChange={setCurrentIndex}
          enableDrag
          perspective={1000}
        />

        {/* project title below carousel */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                color: "var(--yellow)",
                textTransform: "uppercase",
              }}
            >
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                color: "var(--white)",
                letterSpacing: "0.05em",
              }}
            >
              {carouselItems[currentIndex]?.alt}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}