"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    number: "01",
    title: "AI-Driven Dashboard",
    role: "UX Research · UI Design · Frontend",
    tools: ["Next.js", "TypeScript", "Tailwind", "Figma"],
    desc: "Designed and built a data visualization dashboard for internal analytics. Led the full UX research cycle — from interviews to final UI — resulting in a product that reduced time-on-task by 40%.",
    tag: "Product Design",
  },
  {
    number: "02",
    title: "User Research System",
    role: "UX Researcher · Design Lead",
    tools: ["Figma", "Research", "Data Analysis"],
    desc: "Built a repeatable research framework for a B2B product team. Conducted user interviews, synthesized behavioral data, and translated findings into a design system used across multiple products.",
    tag: "UX Research",
  },
  {
    number: "03",
    title: "Frontend Component Library",
    role: "Frontend Developer · UI Designer",
    tools: ["React", "TypeScript", "Tailwind", "Storybook"],
    desc: "Developed a scalable component library that unified design language across a product suite. Built with accessibility and performance as first principles.",
    tag: "Design System",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="py-32 bg-[#fafafa]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="section-divider mb-6" />
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 leading-snug">
            Work that
            <br />
            <span className="gradient-text">actually shipped.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {projects.map((p, i) => (
            <div
              key={p.number}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative bg-white border border-gray-100 overflow-hidden cursor-default"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 bg-[#1a4f6e] transition-all duration-500 pointer-events-none"
                style={{
                  opacity: hovered === i ? 1 : 0,
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-[80px_1fr_auto] gap-8 items-start">
                {/* Number */}
                <div
                  className="text-4xl font-semibold transition-colors duration-300"
                  style={{ color: hovered === i ? "rgba(255,255,255,0.2)" : "#e5e7eb" }}
                >
                  {p.number}
                </div>

                {/* Content */}
                <div>
                  <div className="mb-1">
                    <span
                      className="text-xs tracking-widest uppercase font-medium transition-colors duration-300"
                      style={{ color: hovered === i ? "rgba(255,255,255,0.5)" : "#2a7fa8" }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2 transition-colors duration-300"
                    style={{ color: hovered === i ? "white" : "#111827" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm mb-4 leading-relaxed max-w-lg transition-colors duration-300"
                    style={{ color: hovered === i ? "rgba(255,255,255,0.7)" : "#6b7280" }}
                  >
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tools.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 border transition-all duration-300"
                        style={{
                          color: hovered === i ? "rgba(255,255,255,0.6)" : "#6b7280",
                          borderColor: hovered === i ? "rgba(255,255,255,0.2)" : "#e5e7eb",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role */}
                <div
                  className="hidden md:block text-xs text-right leading-relaxed transition-colors duration-300"
                  style={{ color: hovered === i ? "rgba(255,255,255,0.5)" : "#9ca3af" }}
                >
                  {p.role.split(" · ").map((r) => (
                    <div key={r}>{r}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
