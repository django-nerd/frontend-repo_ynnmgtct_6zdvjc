import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function PdfUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file) return;
    setLoading(true);
    setStatus('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('account_name', 'PDF Statement');
      fd.append('account_type', 'checking');
      fd.append('currency', 'INR');
      const res = await fetch(`${API}/ingest/statement/pdf`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        const skipped = data.skipped_no_marker || 0;
        const msg = `Imported ${data.inserted} of ${data.parsed} exact-matched rows` + (skipped ? ` • Skipped ${skipped} rows without explicit CR/DR markers` : '');
        setStatus(msg);
        onUploaded && onUploaded();
      } else {
        setStatus(data.detail || 'Failed to parse PDF');
      }
    } catch (e) {
      setStatus(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
        <div className="text-blue-200/80 text-sm mb-3">Upload bank statement (PDF)</div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-blue-100"
          />
          <button
            onClick={upload}
            disabled={!file || loading}
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? 'Uploading…' : 'Import PDF'}
          </button>
        </div>
        {status && (
          <div className="mt-3 text-blue-100 text-sm">
            {status}
          </div>
        )}
        <p className="mt-2 text-xs text-blue-200/70">For exact matching, only lines with an explicit CR/DR indicator are imported. Others are left out to avoid guessing.</p>
      </div>
    </section>
  );
}
