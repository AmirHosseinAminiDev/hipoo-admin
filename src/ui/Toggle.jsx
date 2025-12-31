import clsx from 'clsx';

export default function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={clsx(
        'w-12 h-6 rounded-full relative transition-colors',
        checked ? 'bg-primary' : 'bg-slate-300'
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow transition-all',
          checked ? 'translate-x-0' : 'translate-x-[-24px]'
        )}
      />
    </button>
  );
}
