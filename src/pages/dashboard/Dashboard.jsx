import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from 'recharts';
import { AlertTriangle, CreditCard, Users, RefreshCcw, Clock3 } from 'lucide-react';
import { stats, members, payments, classes } from '../../data/mockData';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/format';

const alertItems = [
  {
    title: 'اعضای در آستانه اتمام',
    description: '۳ عضویت در ۵ روز آینده منقضی می‌شود',
    color: 'warning'
  },
  {
    title: 'پرداخت ناموفق',
    description: `${payments.filter((p) => p.status === 'ناموفق').length} تراکنش نیاز به پیگیری دارد`,
    color: 'danger'
  },
  {
    title: 'ظرفیت کلاس‌ها',
    description: `${classes.filter((c) => c.reserved >= c.capacity).length} کلاس ظرفیت تکمیل شده دارد`,
    color: 'info'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Users} label="اعضای فعال" value={stats.activeMembers} color="bg-primary/10 text-primary" />
        <StatCard icon={Clock3} label="اعضای جدید این هفته" value={stats.newMembers} color="bg-amber-100 text-amber-700" />
        <StatCard icon={CreditCard} label="درآمد ماه" value={` ${formatCurrency(stats.revenueMonth)} تومان`} color="bg-emerald-100 text-emerald-700" />
        <StatCard icon={RefreshCcw} label="تمدیدها" value={stats.renewals} color="bg-blue-100 text-blue-700" />
        <StatCard icon={AlertTriangle} label="کلاس‌های امروز" value={stats.todayClasses} color="bg-purple-100 text-purple-700" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-2 card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">نمودار درآمد ماهانه</h3>
            <Badge variant="info">ریال (میلیون)</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.incomeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">نمودار تعداد اعضا</h3>
            <Badge variant="success">رشد ماهانه</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.memberTrend}>
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="members" stroke="#ef4444" fillOpacity={1} fill="url(#colorMembers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">هشدارها و اعلان‌ها</h3>
            <Button variant="outline">مشاهده همه</Button>
          </div>
          <ul className="space-y-3">
            {alertItems.map((item) => (
              <li key={item.title} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
                <Badge variant={item.color === 'danger' ? 'danger' : item.color === 'warning' ? 'warning' : 'info'}>
                  اقدام سریع
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-bold text-lg mb-3">اعضای رو به پایان</h3>
          <div className="space-y-3">
            {members.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-semibold">{member.firstName} {member.lastName}</p>
                  <p className="text-xs text-slate-500">پایان: {member.endDate}</p>
                </div>
                <Button variant="outline" className="text-primary border-primary/40">تمدید سریع</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <span className={`w-11 h-11 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </span>
      <div className="flex flex-col">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-xl font-extrabold">{value}</span>
      </div>
    </div>
  );
}
