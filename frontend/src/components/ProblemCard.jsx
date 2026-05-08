import { useNavigate } from 'react-router-dom';

const categoryColors = {
  career: 'bg-blue-100 text-blue-600',
  relationships: 'bg-pink-100 text-pink-600',
  'mental health': 'bg-purple-100 text-purple-600',
  academics: 'bg-yellow-100 text-yellow-600',
  finance: 'bg-green-100 text-green-600',
  other: 'bg-gray-100 text-gray-600',
};

export default function ProblemCard({ problem, highlight = false }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/problems/${problem._id}`)}
      className={`rounded-3xl p-6 border cursor-pointer transition-all hover:shadow-md ${
        highlight
          ? 'bg-gradient-to-br from-teal-50 to-purple-50 border-teal-300 ring-2 ring-teal-400'
          : 'bg-white border-gray-100 hover:border-teal-200'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-bold text-gray-800 text-base">{problem.title}</h3>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize shrink-0 ${categoryColors[problem.category] || 'bg-gray-100 text-gray-600'}`}>
          {problem.category}
        </span>
      </div>
      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{problem.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
        <span>💬 {problem.advice?.length ?? 0} advice</span>
      </div>
    </div>
  );
}