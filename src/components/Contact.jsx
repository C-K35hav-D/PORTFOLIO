import { motion } from "framer-motion";
import CenterUnderline from "@/components/fancy/text/underline-center";
import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out";
import GoesOutComesInUnderline from "@/components/fancy/text/underline-goes-out-comes-in";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
const socials = [
  { label: "LinkedIn", href: "#", type: "center" },
  { label: "Behance", href: "#", type: "comes-in-right" },
  { label: "Instagram", href: "#", type: "comes-in-left" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "8rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1A0900",
        position: "relative",
      }}
    >
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
          color: "var(--orange)",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}
      >
        Let's Talk
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          // fontSize: "clamp(2.5rem, 7vw, 6rem)",
          fontSize: "clamp(1.8rem, 6vw, 6rem)",
          lineHeight: 1,
          color: "var(--white)",
          marginBottom: "4rem",
          textAlign: "center",
        }}
      >
        Got a project in mind?
        <br />
        <span
          style={{
            WebkitTextStroke: ".15vw var(--orange)",
            WebkitTextFillColor: "transparent",
          }}
        >
          Let's build it.
        </span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          fontFamily: "Space Grotesk, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {/* Email — primary, biggest */}
        
          <a href="mailto:channakeshavdevarmani@gmail.com"
          style={{
            textDecoration: "none",
            color: "var(--yellow)",
            // fontSize: "clamp(1.3rem, 3vw, 2rem)",
            fontSize: "clamp(0.9rem, 4vw, 2rem)",
            fontWeight: 600,
            marginBottom: "1rem",
            display: "inline-block",
          }}
        >
          <UnderlineToBackground
            targetTextColor="#0A0A0A"
            className="cursor-pointer"
          >
            channakeshavdevaramani@gmail.com
          </UnderlineToBackground>
        </a>

        {/* Socials row */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            // fontSize: "1rem",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            color: "var(--white)",
          }}
        >

          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
            <ComesInGoesOutUnderline direction="right">
              Behance
            </ComesInGoesOutUnderline>
          </a>          
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
            <CenterUnderline>LinkedIn</CenterUnderline>
          </a>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
            <ComesInGoesOutUnderline direction="left">
              Instagram
            </ComesInGoesOutUnderline>
          </a>
        </div>
      </motion.div>
    </section>
  );
}