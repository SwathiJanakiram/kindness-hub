import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCompliments, getComplimentByCode } from '../api/compliments';
import ComplimentForm from '../components/ComplimentForm';
import ComplimentCard from '../components/ComplimentCard';
import SecretCodeModal from '../components/SecretCodeModal';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function Compliments() {
  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secretCode, setSecretCode] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCompliments();
    // check if navigated here with a code
    const code = searchParams.get('code');
    if (code) highlightByCode(code);
  }, []);

  const fetchCompliments = async () => {
    try {
      const res = await getCompliments();
      setCompliments(res.data);
    } catch {
      toast.error('Failed to load compliments');
    } finally {
      setLoading(false);
    }
  };

  const highlightByCode = async (code) => {
    try {
      const res = await getComplimentByCode(code);
      setHighlightId(res.data._id);
      setTimeout(() => {
        document.getElementById(res.data._id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    } catch {
      toast.error('Code not found!');
    }
  };

  const handleCreated = (code, compliment) => {
    setSecretCode(code);
    setCompliments(prev => [compliment, ...prev]);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {secretCode && (
        <SecretCodeModal code={secretCode} onClose={() => setSecretCode(null)} />
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">💌 Compliment Board</h1>
        <p className="text-gray-400 text-sm">Say something kind. Anonymously. No sign up needed.</p>
      </div>

      <ComplimentForm onCreated={handleCreated} />

      {loading ? <Loader /> : (
        <>
          <p className="text-xs text-gray-400 mb-4">{compliments.length} compliments on the board 🌸</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compliments.map(c => (
              <div key={c._id} id={c._id}>
                <ComplimentCard compliment={c} highlight={highlightId === c._id} />
              </div>
            ))}
            {compliments.length === 0 && (
              <div className="col-span-2 text-center py-16 text-gray-300">
                <div className="text-5xl mb-4">🌸</div>
                <p className="font-semibold">No compliments yet — be the first!</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}