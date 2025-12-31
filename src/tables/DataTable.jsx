import { useMemo, useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

export default function DataTable({ columns, data, rowKey = 'id' }) {
  const [sort, setSort] = useState({ field: null, direction: null });

  const sortedData = useMemo(() => {
    if (!sort.field) return data;
    return [...data].sort((a, b) => {
      const valueA = a[sort.field];
      const valueB = b[sort.field];
      if (valueA === valueB) return 0;
      if (valueA > valueB) return sort.direction === 'asc' ? 1 : -1;
      return sort.direction === 'asc' ? -1 : 1;
    });
  }, [data, sort]);

  const toggleSort = (field) => {
    setSort((prev) => {
      if (prev.field !== field) return { field, direction: 'asc' };
      if (prev.direction === 'asc') return { field, direction: 'desc' };
      return { field: null, direction: null };
    });
  };

  if (!data.length) return <EmptyState />;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 text-right whitespace-nowrap">
                <button className="flex items-center gap-1" onClick={() => col.sortable && toggleSort(col.accessor)}>
                  <span>{col.header}</span>
                  {col.sortable && <ArrowDownUp className="w-4 h-4" />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-100">
          {sortedData.map((row) => (
            <tr key={row[rowKey]} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3 whitespace-nowrap align-middle">
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
