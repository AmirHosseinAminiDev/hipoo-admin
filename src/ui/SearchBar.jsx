import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/70"
      />
    </div>
  );
}
