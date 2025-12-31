import clsx from 'clsx';

const variants = {
  primary:
    'bg-primary text-white hover:bg-red-500 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700',
  outline:
    'border border-slate-200 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800',
  danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
};

export default function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-all duration-150 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
