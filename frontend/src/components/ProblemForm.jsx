import { useState } from 'react';
import { createProblem } from '../api/problems';
import toast from 'react-hot-toast';

const CATEGORIES = ['career', 'relationships', 'mental health', 'academics', 'finance', 'other'];

export default function ProblemForm({ onCreated }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'other' });
  const [loading, setLoading] = useState(false);

  const update = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim())
      return toast.error('Title and description are required!');
    setLoading(true);
    try {
      const res = await createProblem(form);
      onCreated(res.data.secretCode, res.data.problem);
      setForm({ title: '', description: '', category: 'other' });
      toast.success('Problem shared! 💡');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-3xl p-6 border border-teal-100 mb-8">
      <h2 className="text-lg font-bold text-gray-700 mb-4">💡 Share a problem anonymously</h2>
      <input
        value={form.title}
        onChange={e => update('title', e.target.value)}
        placeholder="Give it a short title..."
        className="w-full rounded-2xl border border-teal-200 p-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
      />
      <textarea
        value={form.description}
        onChange={e => update('description', e.target.value)}
        placeholder="Describe your problem in detail..."
        rows={3}
        className="w-full rounded-2xl border border-teal-200 p-3 text-sm resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
      />
      <select
        value={form.category}
        onChange={e => update('category', e.target.value)}
        className="w-full rounded-2xl border border-teal-200 p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white capitalize"
      >
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-2xl hover:opacity-90 transition-all disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Share Anonymously 💡'}
      </button>
    </div>
  );
}