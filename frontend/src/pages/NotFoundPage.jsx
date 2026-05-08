import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6">🌸</div>
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-3">
        Oops! This page doesn't exist
      </h2>
      <p className="text-gray-400 text-sm max-w-sm mb-8">
        Looks like you wandered off the kindness path. Let's get you back! 💜
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-3 rounded-2xl hover:opacity-90 transition-all"
        >
          🏠 Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-100 text-gray-600 font-bold px-8 py-3 rounded-2xl hover:bg-gray-200 transition-all"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}