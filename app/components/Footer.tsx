export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#0f1c26] text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* Left */}
          <div>
            <div className="text-xs tracking-widest uppercase text-white/40 mb-4">
              Available for opportunities
            </div>
            <h2 className="text-4xl font-semibold leading-snug mb-6">
              Let's build
              <br />
              <span style={{
                background: "linear-gradient(135deg, #2a7fa8 0%, #5ab3d8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                something real.
              </span>
            </h2>
            <a
              href="mailto:loghmaninastaran@gmail.com"
              className="inline-flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
            >
              <span className="border-b border-white/20 group-hover:border-white/60 transition-colors pb-0.5">
                loghmaninastaran@gmail.com
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Find me</div>
                <div className="space-y-2">
                  <a
                    href="https://github.com/nastaranloghmani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Contact</div>
                <div className="space-y-2">
                  <a
                    href="tel:+989178068915"
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    +98 917 806 8915
                  </a>
                  <a
                    href="mailto:loghmaninastaran@gmail.com"
                    className="block text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-semibold tracking-widest text-white/80">
            NASTARAN LOGHMANI
          </div>
          <div className="text-xs text-white/30">
            © {year} · UX/UI Developer · Dubai, UAE
          </div>
        </div>
      </div>
    </footer>
  );
}
