import Button from './Button';

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">×</button>
        </div>
        <div className="p-5 space-y-4 text-sm text-slate-700 dark:text-slate-200">{children}</div>
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-200 dark:border-slate-800">
          {footer || (
            <Button variant="outline" onClick={onClose}>
              بستن
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
