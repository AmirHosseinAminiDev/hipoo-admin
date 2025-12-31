export default function EmptyState({ title = 'موردی یافت نشد', description }) {
  return (
    <div className="text-center py-10 text-slate-500">
      <p className="text-lg font-semibold">{title}</p>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  );
}
