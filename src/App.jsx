import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import PdfUploader from './components/PdfUploader'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_60%)]" />
      </div>

      <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/flame-icon.svg" alt="logo" className="w-6 h-6" />
            <span className="text-sm text-blue-200">Flames • AI Finance</span>
          </div>
          <div className="flex gap-4 text-sm text-blue-200/80">
            <a href="#dashboard" className="hover:text-white">Dashboard</a>
            <a href="#upload" className="hover:text-white">Upload</a>
            <a href="#chat" className="hover:text-white">Chat</a>
          </div>
        </div>
      </nav>

      <Hero />
      <section id="upload" className="py-6">
        <div className="max-w-6xl mx-auto px-6">
          <PdfUploader onUploaded={() => window.location.hash = '#dashboard'} />
        </div>
      </section>
      <Dashboard />
      <Chatbot />

      <footer className="py-10 text-center text-xs text-blue-300/60">Built with ❤️</footer>
    </div>
  )
}

export default App
