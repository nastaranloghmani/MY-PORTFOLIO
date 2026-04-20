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

function Typewriter({ text, visible, delay = 0 }: { text: string; visible: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 45);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [visible, text, delay]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && visible && (
        <span style={{
          display: "inline-block", width: 2, height: "0.85em",
          background: "#1a4f6e", marginLeft: 2, verticalAlign: "middle",
          animation: "blink 0.8s step-end infinite",
        }} />
      )}
    </span>
  );
}

const SKILLS = [
  { group: "Frontend",      items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Bootstrap", "Responsive Design"] },
  { group: "Design",        items: ["Figma", "UX Research", "Wireframing", "Design Systems", "Prototyping", "User Testing", "Information Architecture"] },
  { group: "Tools & Other", items: ["Git", "GitHub", "Python", "AI Workflows", "Vibe Coding", "Accessibility", "Agile/Scrum"] },
];

const LANGUAGES = [
  { lang: "Persian", level: "Native" },
  { lang: "English", level: "B2" },
  { lang: "German",  level: "B2" },
];

const CERTIFICATES = [
  { name: "BSc Software Engineering",          issuer: "University of Europe (UE)",  year: "2025 - 2028" },
  { name: "Meta Front-End Developer Certificate", issuer: "Meta / Coursera",          year: "2024" },
  { name: "Web Development Basics",            issuer: "HTML, CSS, JavaScript fundamentals", year: "Nov 2023" },
  { name: "Python Programming Course",         issuer: "Syntax, data types, functions, I/O", year: "Oct 2023" },
];

export default function Experience() {
  const { ref, visible } = useInView();

  return (
    <>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      <section id="experience" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto", borderTop: "1px solid #e8e8e8" }}>
        <div ref={ref}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 80 }}>
            <span style={{
              fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa",
              opacity: visible ? 1 : 0, transition: "opacity 0.5s ease",
            }}>004</span>
            <RevealLine visible={visible} delay={0.1}>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.025em", margin: 0 }}>Experience</h2>
            </RevealLine>
          </div>

          {/* Main role */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 80,
          }}>
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
                Current Role
              </div>
              {/* Typewriter on role title */}
              <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 500, letterSpacing: "-0.02em", color: "#0f0f0f", margin: "0 0 8px", minHeight: "1.2em" }}>
                <Typewriter text="UX/UI Developer" visible={visible} delay={0.3} />
              </h3>
              <a href="https://mkinnovations.ae/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 16, color: "#1a4f6e", marginBottom: 4, fontWeight: 500, textDecoration: "none", display: "block" }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
              >MK Innovations</a>
              <div style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>Dubai, UAE · Sep 2025 - Present</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.04em" }}>Active</span>
              </div>
            </div>

            <div>
              <div style={{
                fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 20,
                opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.2s",
              }}>
                What I do there
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  ["Data Research",  "User behavior analysis, market investigation, turning data into design decisions."],
                  ["UX/UI Design",   "From research to wireframes to high-fidelity interfaces across real products."],
                  ["Frontend Build", "Shipping production-ready code. The design and the build are one process."],
                  ["Vibe Coding",    "Rapid AI-assisted prototyping - translating ideas into working interfaces fast."],
                ].map(([title, desc], i) => (
                  <div key={title} style={{
                    paddingLeft: 16, borderLeft: "2px solid #e8e8e8",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateX(-8px)",
                    transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#0f0f0f", marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{
            borderTop: "1px solid #e8e8e8", paddingTop: 48, marginBottom: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 28 }}>Skills</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px 40px" }}>
              {SKILLS.map(({ group, items }, gi) => (
                <div key={group}>
                  <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1a4f6e", marginBottom: 12, fontWeight: 500 }}>{group}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {items.map((s, si) => (
                      <span key={s} style={{
                        fontSize: 12, color: "#555", background: "#f5f5f5", padding: "3px 8px",
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.4s ease ${0.5 + gi * 0.1 + si * 0.04}s`,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages + Certificates */}
          <div style={{
            borderTop: "1px solid #e8e8e8", paddingTop: 48,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
          }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 28 }}>Languages</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {LANGUAGES.map(({ lang, level }) => (
                  <div key={lang} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#0f0f0f" }}>{lang}</span>
                    <span style={{ fontSize: 12, color: "#888", background: "#f5f5f5", padding: "2px 10px" }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 28 }}>Certificates & Education</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {CERTIFICATES.map(({ name, issuer, year }) => (
                  <div key={name} style={{ paddingLeft: 16, borderLeft: "2px solid #e8e8e8" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#0f0f0f", marginBottom: 2 }}>{name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{issuer} · {year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
