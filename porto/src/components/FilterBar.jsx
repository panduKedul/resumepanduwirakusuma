export default function FilterBar({ years, categories, year, category, onYear, onCategory }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        aria-label="Filter tahun"
        value={year}
        onChange={(e) => onYear(e.target.value)}
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="all">Semua tahun</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>{y}</option>
        ))}
      </select>
      <select
        aria-label="Filter kategori"
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="all">Semua kategori</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
