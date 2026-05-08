import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackVisit, trackSession, getStats } from '../api/stats';
import { getComplimentByCode } from '../api/compliments';
import { getProblemByCode } from '../api/problems';
import toast from 'react-hot-toast';

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    // track visit always
    trackVisit();
    // track session only once per tab
    if (!sessionStorage.getItem('kh_visited')) {
      trackSession();
      sessionStorage.setItem('kh_visited', 'true');
    }
    // load stats
    getStats().then(res => setStats(res.data)).catch(() => {});
  }, []);

  const handleCodeSearch = async () => {
    if (!code.trim()) return toast.error('Enter your secret code!');
    try {
      // try compliment first
      await getComplimentByCode(code.trim());
      navigate(`/compliments?code=${code.trim()}`);
    } catch {
      try {
        // try problem
        const res = await getProblemByCode(code.trim());
        navigate(`/problems/${res.data._id}?highlight=true`);
      } catch {
        toast.error('Code not found! Double check it 🔍');
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">🌸</div>
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 bg-clip-text text-transparent leading-tight">
          Kindness Hub
        </h1>
        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
          A safe, anonymous space to spread compliments and share problems.
          No accounts. No tracking. Just kindness. 💜
        </p>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div
            onClick={() => navigate('/compliments')}
            className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 text-left"
          >
            <div className="text-4xl mb-3">💌</div>
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">Compliment Board</h2>
            <p className="text-gray-500 text-sm">Drop anonymous kind notes into the world. Someone needs to hear it today.</p>
            <span className="inline-block mt-4 text-sm font-bold text-pink-500">
              Spread love →
            </span>
          </div>

          <div
            onClick={() => navigate('/problems')}
            className="bg-gradient-to-br from-teal-50 to-purple-50 border border-teal-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 text-left"
          >
            <div className="text-4xl mb-3">💡</div>
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">Advice Board</h2>
            <p className="text-gray-500 text-sm">Share a problem anonymously. The community will help you figure it out.</p>
            <span className="inline-block mt-4 text-sm font-bold text-teal-500">
              Get advice →
            </span>
          </div>
        </div>

        {/* Secret Code Search */}
        <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-sm max-w-lg mx-auto">
          <h3 className="font-bold text-gray-700 mb-1">🔍 Find your post</h3>
          <p className="text-xs text-gray-400 mb-4">Enter your secret code to see your compliment or problem</p>
          <div className="flex gap-3">
            <input
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="KH-XXXXX"
              className="flex-1 border border-purple-200 rounded-2xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400 tracking-widest"
              onKeyDown={e => e.key === 'Enter' && handleCodeSearch()}
            />
            <button
              onClick={handleCodeSearch}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-2xl hover:opacity-90 transition-all"
            >
              Find
            </button>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      {stats && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h3 className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Live kindness stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '👁️', label: 'Visits', value: stats.totalVisits },
              { icon: '🌸', label: 'Compliments', value: stats.complimentsPosted },
              { icon: '💡', label: 'Problems Shared', value: stats.problemsPosted },
              { icon: '💬', label: 'Advice Given', value: stats.adviceGiven },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-3xl border border-gray-100 p-5 text-center shadow-sm">
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="text-2xl font-extrabold text-gray-800">{s.value ?? 0}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}