export function filterBy(list, year, cat) {
  if (!Array.isArray(list)) return [];
  const y = year === undefined || year === null ? "all" : String(year);
  const c = cat === undefined || cat === null ? "all" : String(cat);
  return list.filter((item) => {
    const yearOk = y === "all" || String(item.year) === y;
    if (!yearOk) return false;
    if (c === "all") return true;
    const tags = item.tags || item.models || [];
    return Array.isArray(tags) && tags.includes(c);
  });
}
