import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-950/90 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Realtime AI finance companion
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
          All your money in one clean, intelligent dashboard
        </h1>
        <p className="mt-4 text-blue-200/90 text-lg">
          Connect UPI, bank accounts and cards. See spend by channel and category. Ask anything — get instant answers.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#dashboard" className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition">Open demo</a>
          <a href="#chat" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition">Ask the AI</a>
        </div>
      </div>
    </section>
  );
}
