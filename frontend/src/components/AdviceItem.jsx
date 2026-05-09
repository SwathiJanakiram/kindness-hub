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
    <div className={`rounded-2xl border p-4 shadow-sm ${
      advice.isAI
        ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
        : 'bg-white border-gray-100'
    }`}>
      {/* AI Badge */}
      {advice.isAI && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            ✨ AI Generated
          </span>
          <span className="text-xs text-gray-400">First advice by Kindness AI</span>
        </div>
      )}
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