import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Chatbot() {
  const [input, setInput] = useState('How much did I spend last month?');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!input.trim()) return;
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      if (res.ok) setAnswer(data.answer);
      else setAnswer(data.detail || 'Something went wrong');
    } catch (e) {
      setAnswer(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Ask the AI about your money</h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex gap-3 items-center">
            <input
              className="flex-1 bg-transparent text-white placeholder-blue-200/60 focus:outline-none"
              placeholder="Ask anything about your transactions…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask()}
            />
            <button onClick={ask} className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60" disabled={loading}>
              {loading ? 'Thinking…' : 'Ask'}
            </button>
          </div>
          {answer && (
            <div className="mt-4 text-blue-100 whitespace-pre-line">{answer}</div>
          )}
        </div>
      </div>
    </section>
  );
}
