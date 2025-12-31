import clsx from 'clsx';

const variants = {
  success: 'bg-green-100 text-green-700 border border-green-200',
  danger: 'bg-red-100 text-red-700 border border-red-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
  info: 'bg-blue-100 text-blue-700 border border-blue-200',
  gray: 'bg-slate-100 text-slate-700 border border-slate-200'
};

export default function Badge({ children, variant = 'gray', className }) {
  return (
    <span className={clsx('px-2.5 py-1 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  );
}
