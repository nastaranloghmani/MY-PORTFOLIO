"use client";

import { useEffect, useRef, useState } from "react";

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

const SKILLS = [
  { group: "Frontend",  items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { group: "Design",    items: ["Figma", "UX Research", "Wireframing", "Design Systems", "Prototyping"] },
  { group: "Tools",     items: ["Git", "GitHub", "Python", "Accessibility", "AI Workflows"] },
];

export default function Experience() {
  const { ref, visible } = useInView();

  return (
    <section id="experience" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto", borderTop: "1px solid #e8e8e8" }}>
      <div ref={ref}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "baseline", gap: 20,
          marginBottom: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa" }}>004</span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.025em", margin: 0 }}>Experience</h2>
        </div>

        {/* Main role */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          marginBottom: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
              Current Role
            </div>
            <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 500, letterSpacing: "-0.02em", color: "#0f0f0f", margin: "0 0 8px" }}>
              UX/UI Developer
            </h3>
            <div style={{ fontSize: 16, color: "#1a4f6e", marginBottom: 4, fontWeight: 500 }}>MK Innovations</div>
            <div style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>Dubai, UAE · 2024 — Present · 8 months</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.04em" }}>Active</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
              What I do there
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["Data Research",      "User behavior analysis, market investigation, turning data into design decisions."],
                ["UX/UI Design",       "From research to wireframes to high-fidelity interfaces across real products."],
                ["Frontend Build",     "Shipping production-ready code. The design and the build are one process."],
              ].map(([title, desc]) => (
                <div key={title} style={{ paddingLeft: 16, borderLeft: "2px solid #e8e8e8" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#0f0f0f", marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{
          borderTop: "1px solid #e8e8e8",
          paddingTop: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
        }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 28 }}>Skills</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px 40px" }}>
            {SKILLS.map(({ group, items }) => (
              <div key={group}>
                <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1a4f6e", marginBottom: 12, fontWeight: 500 }}>
                  {group}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map(s => (
                    <span key={s} style={{ fontSize: 12, color: "#555", background: "#f5f5f5", padding: "3px 8px" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
