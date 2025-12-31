import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Dumbbell,
  Settings,
  Bell,
  CalendarCheck
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { canAccess } from '../utils/roles';

const items = [
  { to: '/admin', label: 'داشبورد', icon: LayoutDashboard, key: 'dashboard' },
  { to: '/admin/members', label: 'اعضا', icon: Users, key: 'members' },
  { to: '/admin/payments', label: 'پرداخت‌ها', icon: CreditCard, key: 'payments' },
  { to: '/admin/classes', label: 'کلاس‌ها', icon: CalendarCheck, key: 'classes' },
  { to: '/admin/trainers', label: 'مربیان', icon: Dumbbell, key: 'trainers' },
  { to: '/admin/notifications', label: 'اعلان‌ها', icon: Bell, key: 'notifications' },
  { to: '/admin/settings', label: 'تنظیمات', icon: Settings, key: 'settings' }
];

export default function Sidebar() {
  const { role } = useAuthStore();

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <p className="text-lg font-extrabold text-primary">HIPOO GYM</p>
        <p className="text-xs text-slate-500 mt-1">مدیریت جامع</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {items
          .filter((item) => canAccess(role, item.key))
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors border border-transparent ${
                    isActive
                      ? 'bg-primary text-white shadow'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
      </nav>
      <div className="p-3 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800">
        دسترسی: {role || 'تعریف نشده'}
      </div>
    </aside>
  );
}
