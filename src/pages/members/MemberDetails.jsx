import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { members } from '../../data/mockData';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';

export default function MemberDetails() {
  const { id } = useParams();
  const member = useMemo(() => members.find((m) => m.id === id), [id]);

  if (!member) {
    return (
      <div className="card p-6">
        <p className="text-red-600">عضو یافت نشد</p>
        <Link className="text-primary mt-2 inline-block" to="/admin/members">
          بازگشت
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card p-6 flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold">{member.firstName} {member.lastName}</h2>
          <p className="text-sm text-slate-500">کد ملی: {member.nationalId}</p>
          <p className="text-sm text-slate-500">شماره تماس: {member.phone}</p>
          <div className="flex items-center gap-2">
            <Badge variant={member.status === 'فعال' ? 'success' : 'danger'}>{member.status}</Badge>
            <Badge variant="info">پلن: {member.plan}</Badge>
            <Badge variant="warning">تمدیدها: {member.renewals}</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline">تمدید عضویت</Button>
          <Button variant="outline">ویرایش اطلاعات</Button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-lg mb-3">تاریخچه پرداخت</h3>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {member.payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold">{p.amount.toLocaleString('fa-IR')} تومان</p>
                <p className="text-xs text-slate-500">{p.date} - {p.method}</p>
              </div>
              <Badge variant={p.status === 'موفق' ? 'success' : 'danger'}>{p.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
