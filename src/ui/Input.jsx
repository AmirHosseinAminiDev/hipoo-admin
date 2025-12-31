import clsx from 'clsx';

export default function Input({ label, helper, className, ...props }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-200">
      {label && <span className="font-medium">{label}</span>}
      <input
        className={clsx(
          'w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/70',
          className
        )}
        {...props}
      />
      {helper && <span className="text-xs text-slate-500">{helper}</span>}
    </label>
  );
}
