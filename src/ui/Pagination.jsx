import Button from './Button';

export default function Pagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 mt-3">
      <span>
        صفحه {page} از {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="outline" disabled={page === 1} onClick={() => onChange(page - 1)}>
          قبلی
        </Button>
        <Button variant="outline" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          بعدی
        </Button>
      </div>
    </div>
  );
}
