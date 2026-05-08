import { useEffect, useState } from 'react';
import { getProblems } from '../api/problems';
import ProblemForm from '../components/ProblemForm';
import ProblemCard from '../components/ProblemCard';
import CategoryFilter from '../components/CategoryFilter';
import SecretCodeModal from '../components/SecretCodeModal';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [secretCode, setSecretCode] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, [category]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await getProblems(category);
      setProblems(res.data);
    } catch {
      toast.error('Failed to load problems');
    } finally {
      setLoading(false);
    }
  };

  const handleCreated = (code, problem) => {
    setSecretCode(code);
    setProblems(prev => [problem, ...prev]);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {secretCode && (
        <SecretCodeModal code={secretCode} onClose={() => setSecretCode(null)} />
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">💡 Advice Board</h1>
        <p className="text-gray-400 text-sm">Share a problem. Get real advice from real people. Anonymously.</p>
      </div>

      <ProblemForm onCreated={handleCreated} />
      <CategoryFilter selected={category} onChange={setCategory} />

      {loading ? <Loader /> : (
        <>
          <p className="text-xs text-gray-400 mb-4">{problems.length} problems shared 💡</p>
          <div className="flex flex-col gap-4">
            {problems.map(p => (
              <ProblemCard key={p._id} problem={p} />
            ))}
            {problems.length === 0 && (
              <div className="text-center py-16 text-gray-300">
                <div className="text-5xl mb-4">💡</div>
                <p className="font-semibold">No problems here yet — share yours!</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}