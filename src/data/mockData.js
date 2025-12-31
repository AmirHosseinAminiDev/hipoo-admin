export const mockUsers = [
  { username: 'admin', password: '123456', role: 'admin', name: 'ادمین اصلی' },
  { username: 'reception', password: '123456', role: 'receptionist', name: 'کاربر پذیرش' },
  { username: 'finance', password: '123456', role: 'finance', name: 'مدیر مالی' },
  { username: 'trainer', password: '123456', role: 'trainer', name: 'مربی' }
];

export const plans = [
  { id: 'p1', name: 'یک ماهه عادی', price: 1200000, duration: '۱ ماه' },
  { id: 'p2', name: 'سه ماهه حرفه‌ای', price: 3200000, duration: '۳ ماه' },
  { id: 'p3', name: 'شش ماهه VIP', price: 6200000, duration: '۶ ماه' }
];

export const discounts = [
  { id: 'd1', code: 'OFF10', value: 10, description: '۱۰٪ تخفیف مناسبتی', active: true },
  { id: 'd2', code: 'FALL20', value: 20, description: 'پاییزه ویژه', active: false }
];

export const members = [
  {
    id: 'm1',
    firstName: 'سارا',
    lastName: 'محمودی',
    nationalId: '1234567890',
    phone: '09121234567',
    status: 'فعال',
    startDate: '1403/07/01',
    endDate: '1403/08/01',
    plan: 'سه ماهه حرفه‌ای',
    paymentStatus: 'موفق',
    debt: 0,
    active: true,
    renewals: 2,
    payments: [
      { id: 'pay1', amount: 1200000, date: '1403/07/01', method: 'آنلاین', status: 'موفق' }
    ]
  },
  {
    id: 'm2',
    firstName: 'رضا',
    lastName: 'کاظمی',
    nationalId: '0987654321',
    phone: '09351234567',
    status: 'منقضی',
    startDate: '1403/05/01',
    endDate: '1403/06/01',
    plan: 'یک ماهه عادی',
    paymentStatus: 'ناموفق',
    debt: 400000,
    active: false,
    renewals: 1,
    payments: [
      { id: 'pay2', amount: 1200000, date: '1403/05/01', method: 'کارت', status: 'ناموفق' }
    ]
  },
  {
    id: 'm3',
    firstName: 'الهه',
    lastName: 'صادقی',
    nationalId: '2233445566',
    phone: '09191122334',
    status: 'فعال',
    startDate: '1403/06/15',
    endDate: '1403/07/15',
    plan: 'شش ماهه VIP',
    paymentStatus: 'موفق',
    debt: 0,
    active: true,
    renewals: 3,
    payments: [
      { id: 'pay3', amount: 6200000, date: '1403/06/15', method: 'آنلاین', status: 'موفق' }
    ]
  },
  {
    id: 'm4',
    firstName: 'مانی',
    lastName: 'حسینی',
    nationalId: '3344556677',
    phone: '09127778899',
    status: 'فعال',
    startDate: '1403/06/25',
    endDate: '1403/07/25',
    plan: 'سه ماهه حرفه‌ای',
    paymentStatus: 'بدهکار',
    debt: 250000,
    active: true,
    renewals: 1,
    payments: [
      { id: 'pay4', amount: 950000, date: '1403/06/25', method: 'نقدی', status: 'موفق' }
    ]
  }
];

export const trainers = [
  {
    id: 't1',
    firstName: 'علی',
    lastName: 'مرادی',
    nationalId: '5566778899',
    phone: '09120001122',
    specialty: 'بدنسازی',
    status: 'فعال',
    classes: ['کلاس HIIT', 'قدرتی صبح']
  },
  {
    id: 't2',
    firstName: 'نگار',
    lastName: 'راد',
    nationalId: '6677889900',
    phone: '09350002233',
    specialty: 'یوگا',
    status: 'فعال',
    classes: ['یوگا عصر']
  }
];

export const payments = [
  {
    id: 'pay1',
    member: 'سارا محمودی',
    amount: 1200000,
    date: '1403/07/01',
    method: 'آنلاین',
    status: 'موفق'
  },
  {
    id: 'pay2',
    member: 'رضا کاظمی',
    amount: 900000,
    date: '1403/06/29',
    method: 'کارت',
    status: 'ناموفق'
  },
  {
    id: 'pay3',
    member: 'الهه صادقی',
    amount: 6200000,
    date: '1403/06/15',
    method: 'آنلاین',
    status: 'موفق'
  }
];

export const classes = [
  {
    id: 'c1',
    title: 'کلاس HIIT',
    coach: 'علی مرادی',
    capacity: 15,
    reserved: 13,
    active: true,
    schedule: { day: 'شنبه و دوشنبه', start: '18:00', end: '19:00' },
    reservations: [
      { name: 'سارا محمودی', status: 'تایید شده' },
      { name: 'مانی حسینی', status: 'در انتظار' }
    ]
  },
  {
    id: 'c2',
    title: 'یوگا عصر',
    coach: 'نگار راد',
    capacity: 10,
    reserved: 10,
    active: false,
    schedule: { day: 'سه‌شنبه', start: '17:00', end: '18:00' },
    reservations: [
      { name: 'الهه صادقی', status: 'تایید شده' }
    ]
  }
];

export const notifications = [
  { id: 'n1', type: 'پرداخت', title: 'بدهی عضویت', status: 'خوانده نشده', message: 'مانی حسینی ۲۵۰،۰۰۰ تومان بدهکار است.', channel: 'پیامک' },
  { id: 'n2', type: 'کلاس', title: 'ظرفیت تکمیل', status: 'خوانده شده', message: 'کلاس یوگا عصر ظرفیت تکمیل شده است.', channel: 'واتساپ' },
  { id: 'n3', type: 'تمدید', title: 'تمدید نزدیک', status: 'خوانده نشده', message: 'اشتراک سارا محمودی رو به پایان است.', channel: 'ایمیل' }
];

export const stats = {
  activeMembers: 132,
  newMembers: 12,
  revenueMonth: 48000000,
  renewals: 34,
  todayClasses: 8,
  incomeTrend: [
    { name: 'فروردین', income: 120 },
    { name: 'اردیبهشت', income: 150 },
    { name: 'خرداد', income: 170 },
    { name: 'تیر', income: 190 },
    { name: 'مرداد', income: 220 },
    { name: 'شهریور', income: 210 },
    { name: 'مهر', income: 240 }
  ],
  memberTrend: [
    { name: 'فروردین', members: 80 },
    { name: 'اردیبهشت', members: 92 },
    { name: 'خرداد', members: 105 },
    { name: 'تیر', members: 118 },
    { name: 'مرداد', members: 126 },
    { name: 'شهریور', members: 132 },
    { name: 'مهر', members: 138 }
  ]
};
