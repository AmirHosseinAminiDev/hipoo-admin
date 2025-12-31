import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { classes as seedClasses, trainers } from '../../data/mockData';
import DataTable from '../../tables/DataTable';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Badge from '../../ui/Badge';
import Pagination from '../../ui/Pagination';

export default function Classes() {
  const [data, setData] = useState(seedClasses);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const pageSize = 5;

  const columns = [
    { header: 'عنوان', accessor: 'title' },
    { header: 'مربی', accessor: 'coach' },
    {
      header: 'ظرفیت',
      accessor: 'capacity',
      cell: (row) => `${row.reserved}/${row.capacity}`
    },
    {
      header: 'وضعیت',
      accessor: 'active',
      cell: (row) => <Badge variant={row.active ? 'success' : 'danger'}>{row.active ? 'فعال' : 'غیرفعال'}</Badge>
    },
    {
      header: 'زمان‌بندی',
      accessor: 'schedule',
      cell: (row) => `${row.schedule.day} | ${row.schedule.start} - ${row.schedule.end}`
    },
    {
      header: 'عملیات',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <button className="text-primary flex items-center gap-1" onClick={() => setSelected(row)}>
            <Eye className="w-4 h-4" /> رزروها
          </button>
          <button className="text-amber-600 flex items-center gap-1" onClick={() => toggleActive(row.id)}>
            {row.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {row.active ? 'غیرفعال' : 'فعال'}
          </button>
        </div>
      )
    }
  ];

  const toggleActive = (id) => {
    setData((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
    toast.success('وضعیت کلاس بروزرسانی شد');
  };

  const addClass = (values) => {
    setData((prev) => [...prev, { ...values, id: `c${prev.length + 1}`, reserved: 0, active: true, reservations: [] }]);
    toast.success('کلاس جدید ایجاد شد');
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">مدیریت کلاس‌ها</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="w-4 h-4" /> کلاس جدید
        </Button>
      </div>

      <DataTable columns={columns} data={data.slice((page - 1) * pageSize, page * pageSize)} />
      <Pagination page={page} total={data.length} pageSize={pageSize} onChange={setPage} />

      <ClassModal open={open} onClose={() => setOpen(false)} onSubmit={addClass} />
      <ReservationsModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function ClassModal({ open, onClose, onSubmit }) {
  const defaultCoach = trainers[0] ? `${trainers[0].firstName} ${trainers[0].lastName}` : 'نامشخص';
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: '', coach: defaultCoach, capacity: 12, day: '', start: '', end: '' }
  });

  const submit = (values) => {
    onSubmit({
      title: values.title,
      coach: values.coach,
      capacity: Number(values.capacity),
      reserved: 0,
      schedule: { day: values.day, start: values.start, end: values.end }
    });
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} title="ایجاد کلاس">
      <form className="space-y-3" onSubmit={handleSubmit(submit)}>
        <Input label="عنوان" {...register('title', { required: true })} />
        <Select label="مربی" {...register('coach')}>
          {trainers.map((t) => (
            <option key={t.id} value={`${t.firstName} ${t.lastName}`}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </Select>
        <Input label="ظرفیت" type="number" {...register('capacity', { required: true })} />
        <Input label="روز هفته" placeholder="مثلاً شنبه" {...register('day')} />
        <div className="grid grid-cols-2 gap-2">
          <Input label="ساعت شروع" type="time" {...register('start')} />
          <Input label="ساعت پایان" type="time" {...register('end')} />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            انصراف
          </Button>
          <Button type="submit">ذخیره</Button>
        </div>
      </form>
    </Modal>
  );
}

function ReservationsModal({ item, onClose }) {
  if (!item) return null;
  return (
    <Modal open={!!item} onClose={onClose} title={`رزروهای ${item.title}`}>
      <div className="space-y-3">
        <p className="text-sm text-slate-600">ظرفیت باقی‌مانده: {item.capacity - item.reserved}</p>
        {item.reservations?.map((r, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs text-slate-500">وضعیت: {r.status}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Button variant="outline">تایید</Button>
              <Button variant="danger">لغو</Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
