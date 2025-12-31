export default function LoadingState({ label = 'در حال بارگذاری...' }) {
  return (
    <div className="flex items-center justify-center py-8 text-slate-500">
      <span className="w-3 h-3 rounded-full bg-primary animate-ping mr-2" />
      {label}
    </div>
  );
}
