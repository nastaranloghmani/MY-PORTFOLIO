"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "AI-Driven Dashboard",
    role: "UX Research · UI Design · Frontend",
    year: "2025",
    desc: "End-to-end product design and build for an internal analytics platform. Led research, designed the system, shipped the code.",
    bg: "#f0f4f8",
    accent: "#1a4f6e",
  },
  {
    num: "02",
    title: "UX Research System",
    role: "UX Research · Design Lead",
    year: "2024",
    desc: "A repeatable research framework for a B2B product team - from user interviews to a design system used across products.",
    bg: "#f5f3f0",
    accent: "#2a5c3f",
  },
  {
    num: "03",
    title: "Component Library",
    role: "Frontend Development · UI Design",
    year: "2024",
    desc: "Scalable component library unifying design language across a product suite. Built for accessibility and performance first.",
    bg: "#f0f0f4",
    accent: "#3d2a6e",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* Clip-path slide-up reveal for a single line of text */
function RevealLine({ children, visible, delay = 0, style }: {
  children: React.ReactNode;
  visible: boolean;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div style={{
        transform: visible ? "translateY(0)" : "translateY(105%)",
        transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}>
        {children}
      </div>
    </div>
  );
}

function ProjectCard({ p, index }: { p: typeof PROJECTS[0]; index: number }) {
  const { ref, visible } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: p.bg, overflow: "hidden",
        position: "relative", marginBottom: 24,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s ease",
        }}>
          <span style={{
            fontSize: "clamp(6rem, 16vw, 14rem)", fontWeight: 600,
            color: p.accent, opacity: 0.07, letterSpacing: "-0.04em",
            lineHeight: 1, userSelect: "none",
          }}>{p.num}</span>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(${p.accent}18 1px, transparent 1px), linear-gradient(90deg, ${p.accent}18 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, height: 3,
            background: p.accent,
            width: hov ? "100%" : "0%",
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div style={{ flex: 1 }}>
          {/* Title with clip reveal */}
          <RevealLine visible={visible} delay={index * 0.12 + 0.1} style={{ marginBottom: 8 }}>
            <h3 style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              fontWeight: 500, letterSpacing: "-0.02em",
              color: hov ? "#1a4f6e" : "#0f0f0f",
              margin: 0, transition: "color 0.2s",
            }}>{p.title}</h3>
          </RevealLine>
          <RevealLine visible={visible} delay={index * 0.12 + 0.18}>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 10px", letterSpacing: "0.01em" }}>{p.role}</p>
          </RevealLine>
          <p style={{
            fontSize: 14, color: "#555", margin: 0, lineHeight: 1.6, maxWidth: 480,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ease ${index * 0.12 + 0.3}s`,
          }}>{p.desc}</p>
        </div>
        <div style={{ fontSize: 12, color: "#bbb", flexShrink: 0, marginTop: 4, letterSpacing: "0.04em" }}>{p.year}</div>
      </div>
    </div>
  );
}

export default function Work() {
  const { ref, visible } = useInView();

  return (
    <section id="work" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Section header */}
      <div ref={ref} style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        marginBottom: 80,
        borderBottom: "1px solid #e8e8e8",
        paddingBottom: 24,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.1s",
          }}>002</span>
          <RevealLine visible={visible} delay={0.15}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.025em", margin: 0 }}>
              Selected Work
            </h2>
          </RevealLine>
        </div>
        <span style={{
          fontSize: 12, color: "#bbb", letterSpacing: "0.04em",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease 0.4s",
        }}>3 Projects</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,360px), 1fr))", gap: "72px 48px" }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.num} p={p} index={i} />)}
      </div>
    </section>
  );
}
