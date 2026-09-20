export default function Badge({ children }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs bg-amber-400/10 text-amber-300 border border-amber-400/30">
      {children}
    </span>
  );
}
