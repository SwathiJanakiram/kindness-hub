import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SecretCodeModal({ code, onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-bounce-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Your Secret Code!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Save this code! Use it anytime to find your post and see reactions.
          <span className="block mt-1 font-semibold text-purple-500">We don't store anything about you 💜</span>
        </p>

        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-teal-100 rounded-2xl px-6 py-4 mb-6">
          <span className="text-3xl font-extrabold tracking-widest text-purple-700 font-mono">
            {code}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={copy}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-2xl transition-all"
          >
            {copied ? '✅ Copied!' : '📋 Copy Code'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}