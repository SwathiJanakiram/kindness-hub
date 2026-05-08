import { useState } from 'react';
import { createCompliment } from '../api/compliments';
import toast from 'react-hot-toast';

export default function ComplimentForm({ onCreated }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return toast.error('Write something kind first! 🌸');
    if (message.length > 280) return toast.error('Max 280 characters!');
    setLoading(true);
    try {
      const res = await createCompliment({ message });
      onCreated(res.data.secretCode, res.data.compliment);
      setMessage('');
      toast.success('Compliment posted! 🌸');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 border border-pink-100 mb-8">
      <h2 className="text-lg font-bold text-gray-700 mb-3">💌 Drop an anonymous compliment</h2>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Say something kind to the world... 🌸"
        rows={3}
        className="w-full rounded-2xl border border-pink-200 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
      />
      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs ${message.length > 260 ? 'text-red-400' : 'text-gray-400'}`}>
          {message.length}/280
        </span>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-6 py-2.5 rounded-2xl hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post 🌸'}
        </button>
      </div>
    </div>
  );
}