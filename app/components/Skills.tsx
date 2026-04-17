"use client";

import { useEffect, useRef, useState } from "react";

const groups = [
  {
    category: "Frontend",
    color: "#1a4f6e",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
  },
  {
    category: "UX & Design",
    color: "#2a7fa8",
    skills: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing", "Figma", "UI Architecture"],
  },
  {
    category: "Tools & Dev",
    color: "#1a4f6e",
    skills: ["Git", "GitHub", "GitLab", "Python", "Responsive Design", "Accessibility", "AI-assisted workflows"],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-32 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="section-divider mb-6" />
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 leading-snug">
            The stack behind
            <br />
            <span className="gradient-text">the thinking.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {groups.map((g, gi) => (
            <div
              key={g.category}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(30px)",
                transition: `opacity 0.6s ease ${gi * 0.12}s, transform 0.6s ease ${gi * 0.12}s`,
              }}
            >
              <div className="mb-6">
                <span
                  className="text-xs tracking-widest uppercase font-semibold"
                  style={{ color: g.color }}
                >
                  {g.category}
                </span>
                <div className="mt-2 h-px bg-gray-100" />
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="text-sm text-gray-600 border border-gray-200 px-3 py-1.5 hover:border-[#1a4f6e]/40 hover:text-[#1a4f6e] transition-all duration-200 cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
