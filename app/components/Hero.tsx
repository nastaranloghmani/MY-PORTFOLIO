"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedGrid() {
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

      const cols = 8;
      const rows = 8;
      const cellW = w / cols;
      const cellH = h / rows;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * cellW;
          const y = r * cellH;
          const wave = Math.sin(t * 0.02 + c * 0.5 + r * 0.3) * 6;
          const size = 1.5 + Math.abs(Math.sin(t * 0.015 + c * 0.4 + r * 0.5)) * 2.5;
          const alpha = 0.08 + Math.abs(Math.sin(t * 0.01 + c * 0.3 + r * 0.4)) * 0.15;

          ctx.beginPath();
          ctx.arc(x, y + wave, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(26, 79, 110, ${alpha})`;
          ctx.fill();
        }
      }

      // Connecting lines (sparse)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if ((c + r) % 3 !== 0) continue;
          const x1 = c * cellW;
          const y1 = r * cellH + Math.sin(t * 0.02 + c * 0.5 + r * 0.3) * 6;
          const x2 = (c + 1) * cellW;
          const y2 = r * cellH + Math.sin(t * 0.02 + (c + 1) * 0.5 + r * 0.3) * 6;
          const alpha = 0.04 + Math.abs(Math.sin(t * 0.01 + c)) * 0.04;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(26, 79, 110, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

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
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}

const words = ["UX Thinker.", "Product Builder.", "AI Designer.", "Vibe Coder."];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fafafa]">
      <AnimatedGrid />

      {/* Subtle accent orb */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full glow-pulse pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(26,79,110,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-[#1a4f6e]" />
            <span className="text-xs tracking-widest uppercase text-[#1a4f6e] font-medium">
              UX/UI Developer · Dubai, UAE
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-gray-900 mb-6">
            I design products that
            <br />
            <span className="gradient-text">don't just look good —</span>
            <br />
            they work.
          </h1>

          {/* Rotating descriptor */}
          <div className="flex items-center gap-3 mb-8 h-9">
            <span className="text-gray-400 text-lg">I am a</span>
            <span
              className="text-lg font-semibold text-[#1a4f6e] transition-all duration-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {words[wordIndex]}
            </span>
          </div>

          {/* Sub */}
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-12">
            Nastaran Loghmani. I bridge research, design, and code — turning
            complex problems into products people actually want to use.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 bg-[#1a4f6e] text-white px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-[#163f58] transition-colors"
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="mailto:loghmaninastaran@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a4f6e] transition-colors border-b border-gray-300 hover:border-[#1a4f6e] pb-0.5"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  );
}
