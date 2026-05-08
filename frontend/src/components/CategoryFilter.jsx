const CATEGORIES = ['all', 'career', 'relationships', 'mental health', 'academics', 'finance', 'other'];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat === 'all' ? '' : cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${
            (cat === 'all' && !selected) || selected === cat
              ? 'bg-teal-500 text-white shadow'
              : 'bg-white text-gray-500 border border-gray-200 hover:border-teal-400 hover:text-teal-500'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}