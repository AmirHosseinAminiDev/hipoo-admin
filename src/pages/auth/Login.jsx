import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { mockUsers } from '../../data/mockData';
import { useAuthStore } from '../../store/authStore';
import { rolesConfig } from '../../utils/roles';

const schema = z.object({
  username: z.string().min(3, 'نام کاربری الزامی است'),
  password: z.string().min(4, 'رمز عبور حداقل ۴ کاراکتر')
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, token, role } = useAuthStore();
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  const locked = useMemo(() => lockUntil && lockUntil > Date.now(), [lockUntil]);

  useEffect(() => {
    if (token && role) {
      const redirectTo = location.state?.from?.pathname || rolesConfig[role]?.defaultRoute || '/admin';
      navigate(redirectTo, { replace: true });
    }
  }, [token, role, navigate, location.state]);

  const onSubmit = (values) => {
    if (locked) {
      toast.error('حساب موقتاً قفل است. لطفاً کمی صبر کنید.');
      return;
    }
    const user = mockUsers.find((u) => u.username === values.username && u.password === values.password);
    if (!user) {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 3) {
        setLockUntil(Date.now() + 30000);
        toast.error('سه تلاش ناموفق! ۳۰ ثانیه قفل شد.');
      } else {
        toast.error('نام کاربری یا رمز نادرست است');
      }
      return;
    }
    setAttempts(0);
    setLockUntil(null);
    login({ username: user.username, role: user.role, name: user.name });
    toast.success('ورود موفق');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark px-4">
      <div className="w-full max-w-md card p-8">
        <div className="text-center mb-6">
          <p className="text-2xl font-extrabold text-primary">ورود به پنل ادمین</p>
          <p className="text-sm text-slate-500 mt-2">باشگاه بدنسازی - رابط فارسی و راست‌چین</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input placeholder="نام کاربری" {...register('username')} />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <Input type="password" placeholder="رمز عبور" {...register('password')} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          {locked && <p className="text-xs text-amber-600">ورود قفل است؛ چند ثانیه بعد دوباره تلاش کنید.</p>}
          <Button type="submit" className="w-full justify-center">
            <LogIn className="w-4 h-4" /> ورود
          </Button>
        </form>
        <div className="mt-4 text-xs text-slate-500 leading-6">
          <p>کاربران تست:</p>
          <p>admin / 123456 (ادمین)</p>
          <p>reception / 123456 (پذیرش)</p>
          <p>finance / 123456 (مالی)</p>
          <p>trainer / 123456 (مربی)</p>
        </div>
      </div>
    </div>
  );
}
