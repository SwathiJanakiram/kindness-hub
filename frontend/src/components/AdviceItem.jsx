import { markHelpful } from '../api/problems';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdviceItem({ advice, problemId, onUpdate }) {
  const [helped, setHelped] = useState(false);

  const handleHelpful = async () => {
    if (helped) return;
    try {
      const res = await markHelpful(problemId, advice._id);
      setHelped(true);
      onUpdate(res.data);
      toast('🙌 Marked as helpful!');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <p className="text-gray-700 text-sm leading-relaxed mb-3">{advice.suggestion}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {new Date(advice.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={handleHelpful}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            helped
              ? 'bg-teal-100 text-teal-600'
              : 'bg-gray-100 text-gray-500 hover:bg-teal-100 hover:text-teal-600'
          }`}
        >
          👍 {advice.helpful} helpful
        </button>
      </div>
    </div>
  );
}