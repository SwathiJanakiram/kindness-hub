import { heartCompliment } from '../api/compliments';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ComplimentCard({ compliment, highlight = false }) {
  const [hearts, setHearts] = useState(compliment.hearts);
  const [hearted, setHearted] = useState(false);

  const handleHeart = async () => {
    if (hearted) return;
    try {
      const res = await heartCompliment(compliment._id);
      setHearts(res.data.hearts);
      setHearted(true);
      toast('💖 Spread the love!');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className={`rounded-3xl p-6 shadow-sm border transition-all hover:shadow-md ${
      highlight
        ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-purple-300 ring-2 ring-purple-400'
        : 'bg-white border-gray-100'
    }`}>
      <p className="text-gray-700 text-base leading-relaxed mb-4">"{compliment.message}"</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {new Date(compliment.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={handleHeart}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            hearted
              ? 'bg-pink-100 text-pink-500'
              : 'bg-gray-100 text-gray-500 hover:bg-pink-100 hover:text-pink-500'
          }`}
        >
          ❤️ {hearts}
        </button>
      </div>
    </div>
  );
}