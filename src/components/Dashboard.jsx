import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Dashboard({ refreshKey = 0 }) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    try {
      const res = await fetch(`${API}/dashboard/summary?days=0`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setSummary(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    setError('');
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  if (loading) {
    return (
      <section id="dashboard" className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-blue-200">Loading dashboard…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="dashboard" className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-red-300">{error}</div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Overview</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <StatCard label="Combined balance" value={`₹${summary.total_balance?.toLocaleString()}`} />
          <StatCard label="Inflow (all time)" value={`₹${summary.inflow_lookback?.toLocaleString()}`} />
          <StatCard label="Outflow (all time)" value={`₹${summary.outflow_lookback?.toLocaleString()}`} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Breakdown title="By channel" data={summary.by_channel} />
          <Breakdown title="By category" data={summary.by_category} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="text-blue-200/80 text-sm">{label}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </div>
  );
}

function Breakdown({ title, data }) {
  const entries = Object.entries(data || {}).sort((a, b) => b[1] - a[1]).slice(0, 6);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="text-blue-200/80 text-sm mb-3">{title}</div>
      <ul className="space-y-2">
        {entries.map(([k, v]) => (
          <li key={k} className="flex justify-between text-blue-100">
            <span className="capitalize">{k}</span>
            <span>₹{Number(v).toLocaleString()}</span>
          </li>
        ))}
        {entries.length === 0 && <li className="text-blue-200/70">No data yet.</li>}
      </ul>
    </div>
  );
}
