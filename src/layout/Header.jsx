import { LogOut, MoonStar, SunMedium } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import Button from '../ui/Button';

export default function Header() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-xl font-extrabold">باشگاه سلامت</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">پنل مدیریت حرفه‌ای</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={toggleTheme}
          aria-label="تغییر حالت نمایش"
        >
          {theme === 'dark' ? <SunMedium className="w-5 h-5" /> : <MoonStar className="w-5 h-5" />}
        </button>
        <div className="hidden sm:flex flex-col text-sm text-right">
          <span className="font-semibold">{user?.name || 'کاربر'}</span>
          <span className="text-slate-500">{user?.role}</span>
        </div>
        <Button variant="outline" onClick={logout} className="!px-3">
          <LogOut className="w-4 h-4" />
          خروج
        </Button>
      </div>
    </header>
  );
}
