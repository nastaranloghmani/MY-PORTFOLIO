"use client";

import { useEffect, useRef, useState } from "react";

const MARQUEE_ITEMS = [
  "UX Research", "Product Thinking", "AI Design", "Frontend Code",
  "Design Systems", "User Interviews", "Vibe Coding", "Data-Driven UI",
  "UX Research", "Product Thinking", "AI Design", "Frontend Code",
  "Design Systems", "User Interviews", "Vibe Coding", "Data-Driven UI",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex gap-6 w-max"
        style={{
          animation: `marquee${reverse ? "Rev" : ""} 28s linear infinite`,
        }}
      >
        {MARQUEE_ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-6"
          >
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap tracking-wide">
              {item}
            </span>
            <span className="text-[#1a4f6e] text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhilosophyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // 3 overlapping circles — represent: research · design · code
      const circles = [
        { ox: -70, oy: -30, label: "Research", angle: -0.5 },
        { ox: 70, oy: -30, label: "Design", angle: 0.5 },
        { ox: 0, oy: 60, label: "Code", angle: Math.PI },
      ];

      const r = 90 + Math.sin(t * 0.012) * 4;

      circles.forEach((c, i) => {
        const x = cx + c.ox + Math.sin(t * 0.01 + i * 2.1) * 5;
        const y = cy + c.oy + Math.cos(t * 0.009 + i * 1.7) * 5;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(26, 79, 110, ${0.12 + i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = `rgba(26, 79, 110, ${0.025})`;
        ctx.fill();

        // Label
        const labelX = x + Math.cos(c.angle) * (r + 20);
        const labelY = y + Math.sin(c.angle) * (r + 20);
        ctx.fillStyle = `rgba(26, 79, 110, ${0.35 + Math.sin(t * 0.015 + i) * 0.1})`;
        ctx.font = "11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(c.label, labelX, labelY);
      });

      // Center dot
      const centerAlpha = 0.6 + Math.sin(t * 0.03) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26, 79, 110, ${centerAlpha})`;
      ctx.fill();

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Visual metaphor: research, design, and code as intersecting disciplines"
    />
  );
}

export default function Signature() {
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
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <section className="py-32 bg-white overflow-hidden" ref={ref}>
        {/* Marquee */}
        <div
          className="mb-24 border-y border-gray-100 py-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(30px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              <span className="section-divider mb-6" />
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6 leading-snug">
                The intersection
                <br />
                <span className="gradient-text">is where I live.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Great products aren't built by designers who can't code, or developers
                who can't think in systems, or researchers who never ship.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                I work at the center — where research becomes design,
                design becomes code, and code becomes something people
                actually love using.
              </p>
              <div className="text-sm text-[#1a4f6e] font-medium tracking-wide">
                — Nastaran Loghmani
              </div>
            </div>

            {/* Canvas visual */}
            <div
              className="h-72 md:h-80"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(30px)",
                transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
              }}
            >
              <PhilosophyCanvas />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
