import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  const link = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
        pathname === to
          ? 'bg-purple-500 text-white shadow-md'
          : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 bg-clip-text text-transparent">
          🌸 Kindness Hub
        </Link>
        <div className="flex items-center gap-2">
          {link('/', 'Home')}
          {link('/compliments', '💌 Compliments')}
          {link('/problems', '💡 Advice Board')}
        </div>
      </div>
    </nav>
  );
}