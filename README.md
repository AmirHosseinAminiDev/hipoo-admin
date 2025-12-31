# پنل ادمین باشگاه (React + Vite + Tailwind)

پنل راست‌چین و فارسی برای مدیریت باشگاه بدنسازی با نقش‌های مختلف، حالت تاریک/روشن و داده‌های ماک.

## اجرای پروژه

```bash
npm install
npm run dev
```

> در این محیط ممکن است دسترسی به رجیستری npm محدود باشد؛ در صورت خطا، از یک آینه داخلی استفاده کنید یا پکیج‌ها را آفلاین نصب کنید.

## ساختار پوشه‌ها

```
src/
├─ assets
├─ components
├─ ui
├─ layout
├─ tables
├─ forms
├─ charts
├─ pages
│  ├─ auth
│  ├─ dashboard
│  ├─ members
│  ├─ payments
│  ├─ classes
│  ├─ trainers
│  └─ settings
├─ routes
├─ data
├─ utils
├─ hooks
├─ store
└─ styles
```

## حساب‌های تست
- admin / 123456
- reception / 123456
- finance / 123456
- trainer / 123456

بعد از ورود یک توکن ماک در `localStorage` ذخیره می‌شود و مسیرهای `/admin/*` محافظت می‌شوند.
