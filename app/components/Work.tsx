"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "ZennTech - AI SaaS Platform",
    role: "UX Research · UI Design · Frontend",
    year: "2025",
    desc: "Full product design and build for an AI-powered enterprise SaaS suite. Six interconnected products including virtual assistants, voice AI, and content generation tools.",
    accent: "#1a4f6e",
    url: "https://zenntech-ious.onrender.com/",
    screenshots: ["/zenntech-1.png", "/zenntech-2.png", "/zenntech-3.png", "/zenntech-4.png"],
  },
  {
    num: "02",
    title: "Luxor PMG - Luxury Retail",
    role: "UI Design · Brand Design · Frontend",
    year: "2025",
    desc: "Bespoke digital experience for a Dubai luxury atelier specialising in fine jewellery, Swiss timepieces, and precious metals for high-net-worth clients.",
    accent: "#8a6a3a",
    url: "https://luxorpmg.com/",
    screenshots: ["/luxor-1.png", "/luxor-2.png", "/luxor-3.png", "/luxor-4.png"],
  },
  {
    num: "03",
    title: "MKHA - Luxury Car Rental",
    role: "UI Design · Frontend Development",
    year: "2025",
    desc: "High-end rental platform for exotic and premium vehicles in Dubai. Designed to reflect the lifestyle positioning of the brand - Ferraris, Lamborghinis, concierge service.",
    accent: "#3d2a6e",
    url: "https://mkharentacar.ae/",
    screenshots: ["/mkha-1.png", "/mkha-2.png", "/mkha-3.png", "/mkha-4.png"],
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealLine({ children, visible, delay = 0, style }: {
  children: React.ReactNode; visible: boolean; delay?: number; style?: React.CSSProperties;
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

function ScreenshotCell({ src, alt, accent, hov }: { src: string; alt: string; accent: string; hov: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div style={{ overflow: "hidden", position: "relative", background: "#f0f0f0" }}>
      {!loaded && !errored && (
        <div style={{ position: "absolute", inset: 0, background: "#ebebeb", animation: "pulse 1.5s ease-in-out infinite" }} />
      )}
      {errored ? (
        <div style={{ width: "100%", height: "100%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: accent, opacity: 0.15 }} />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            filter: hov ? "brightness(1.03)" : "brightness(1)",
          }}
        />
      )}
    </div>
  );
}

function ProjectCard({ p, index }: { p: typeof PROJECTS[0]; index: number }) {
  const { ref, visible } = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
    >
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        {/* 2×2 screenshot grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 3,
          aspectRatio: "16/10",
          overflow: "hidden",
          marginBottom: 20,
          background: "#f0f0f0",
          transform: hov ? "scale(1.01)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}>
          {p.screenshots.map((src, i) => (
            <div key={i} style={{ position: "relative" }}>
              <ScreenshotCell src={src} alt={`${p.title} section ${i + 1}`} accent={p.accent} hov={hov} />
              {i === 0 && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, zIndex: 1,
                  height: 2, background: p.accent,
                  width: hov ? "100%" : "0%",
                  transition: "width 0.5s ease",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <RevealLine visible={visible} delay={index * 0.15 + 0.1} style={{ marginBottom: 6 }}>
              <h3 style={{
                fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
                fontWeight: 500, letterSpacing: "-0.02em",
                color: hov ? p.accent : "#0f0f0f",
                margin: 0, transition: "color 0.2s",
              }}>{p.title}</h3>
            </RevealLine>
            <RevealLine visible={visible} delay={index * 0.15 + 0.2}>
              <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{p.role}</p>
            </RevealLine>
            <p style={{
              fontSize: 13, color: "#666", margin: 0, lineHeight: 1.65, maxWidth: 480,
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 0.15 + 0.35}s`,
            }}>{p.desc}</p>
          </div>
          <div style={{ fontSize: 11, color: "#ccc", flexShrink: 0, marginTop: 4, letterSpacing: "0.06em" }}>{p.year}</div>
        </div>
      </a>
    </div>
  );
}

export default function Work() {
  const { ref, visible } = useInView();

  return (
    <section id="work" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div ref={ref} style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        marginBottom: 72,
        borderBottom: "1px solid #e8e8e8",
        paddingBottom: 24,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa",
            opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.1s",
          }}>002</span>
          <RevealLine visible={visible} delay={0.15}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.025em", margin: 0 }}>
              Selected Work
            </h2>
          </RevealLine>
        </div>
        <span style={{
          fontSize: 12, color: "#bbb", letterSpacing: "0.04em",
          opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.4s",
        }}>3 Projects</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,360px), 1fr))", gap: "72px 48px" }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.num} p={p} index={i} />)}
      </div>
    </section>
  );
}
