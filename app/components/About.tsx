"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const VALUES = ["Research-led", "Systems thinker", "AI-native", "Builds in code"];

export default function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto", borderTop: "1px solid #e8e8e8" }}>
      <div ref={ref}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "baseline", gap: 20,
          marginBottom: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa" }}>003</span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.025em", margin: 0 }}>About</h2>
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          {/* Left: photo + values */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}>
            <div style={{ width: "100%", maxWidth: 340, aspectRatio: "4/5", overflow: "hidden", position: "relative", marginBottom: 32 }}>
              <Image
                src="/nastaran.jpg"
                alt="Nastaran Loghmani"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {VALUES.map(v => (
                <span key={v} style={{
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#1a4f6e",
                  border: "1px solid rgba(26,79,110,0.25)",
                  padding: "5px 10px",
                }}>
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            <p style={{ fontSize: "clamp(1.2rem, 2vw, 1.45rem)", fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.01em", color: "#0f0f0f", margin: "0 0 32px" }}>
              I'm a UX/UI developer who doesn't separate design from code - they're the same thing.
            </p>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: "0 0 24px" }}>
              I work across research, design, and frontend development. Not because I have to - because I think the best products come from people who understand all three.
            </p>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: "0 0 40px" }}>
              At MK Innovations in Dubai, I've been doing exactly that - investigating user behavior, translating it into design decisions, and shipping the result.
            </p>

            {/* Personal info block */}
            <div style={{ borderTop: "1px solid #e8e8e8", paddingTop: 28, marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 16 }}>Personal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Born", "2 May 2005 (age 20)"],
                  ["Nationality", "Iranian"],
                  ["Based in", "Dubai, UAE"],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "#bbb", minWidth: 80, textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: 1 }}>{label}</span>
                    <span style={{ fontSize: 13, color: "#555" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education block */}
            <div style={{ borderTop: "1px solid #e8e8e8", paddingTop: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 16 }}>Education</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#0f0f0f" }}>BSc Software Engineering</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>University of Europe (UE) · 2025 - 2028</div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#0f0f0f" }}>Meta Front-End Developer Certificate</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>Meta / Coursera · 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
