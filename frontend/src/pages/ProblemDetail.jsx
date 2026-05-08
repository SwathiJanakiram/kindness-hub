import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getProblemById, addAdvice } from '../api/problems';
import AdviceItem from '../components/AdviceItem';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const categoryColors = {
  career: 'bg-blue-100 text-blue-600',
  relationships: 'bg-pink-100 text-pink-600',
  'mental health': 'bg-purple-100 text-purple-600',
  academics: 'bg-yellow-100 text-yellow-600',
  finance: 'bg-green-100 text-green-600',
  other: 'bg-gray-100 text-gray-600',
};

export default function ProblemDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const highlight = searchParams.get('highlight') === 'true';

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    getProblemById(id)
      .then(res => setProblem(res.data))
      .catch(() => toast.error('Problem not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdvice = async () => {
    if (!suggestion.trim()) return toast.error('Write your advice first!');
    setPosting(true);
    try {
      const res = await addAdvice(id, { suggestion });
      setProblem(res.data);
      setSuggestion('');
      toast.success('Advice posted! 🙌');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <Loader />;
  if (!problem) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate('/problems')}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
      >
        ← Back to board
      </button>

      {/* Problem */}
      <div className={`rounded-3xl p-6 border mb-8 ${
        highlight
          ? 'bg-gradient-to-br from-teal-50 to-purple-50 border-teal-300 ring-2 ring-teal-400'
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-xl font-extrabold text-gray-800">{problem.title}</h1>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize shrink-0 ${categoryColors[problem.category]}`}>
            {problem.category}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">{problem.description}</p>
        <span className="text-xs text-gray-400">
          {new Date(problem.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Advice list */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        💬 {problem.advice.length} {problem.advice.length === 1 ? 'piece of advice' : 'pieces of advice'}
      </h2>

      <div className="flex flex-col gap-3 mb-8">
        {problem.advice.length === 0 && (
          <div className="text-center py-10 text-gray-300">
            <div className="text-4xl mb-3">🤔</div>
            <p>No advice yet — be the first to help!</p>
          </div>
        )}
        {problem.advice.map(a => (
          <AdviceItem
            key={a._id}
            advice={a}
            problemId={id}
            onUpdate={updated => setProblem(updated)}
          />
        ))}
      </div>

      {/* Add advice form */}
      <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-3xl p-6 border border-teal-100">
        <h3 className="font-bold text-gray-700 mb-3">🙌 Give your advice</h3>
        <textarea
          value={suggestion}
          onChange={e => setSuggestion(e.target.value)}
          placeholder="Share your thoughts, experience or advice..."
          rows={3}
          className="w-full rounded-2xl border border-teal-200 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white mb-3"
        />
        <button
          onClick={handleAdvice}
          disabled={posting}
          className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-2xl hover:opacity-90 transition-all disabled:opacity-50"
        >
          {posting ? 'Posting...' : 'Post Advice 💡'}
        </button>
      </div>
    </div>
  );
}