import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { trainers as seedTrainers, classes } from '../../data/mockData';
import DataTable from '../../tables/DataTable';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Badge from '../../ui/Badge';
import Select from '../../ui/Select';

export default function Trainers() {
  const [data, setData] = useState(seedTrainers);
  const [open, setOpen] = useState(false);

  const columns = [
    { header: 'نام', accessor: 'firstName' },
    { header: 'نام خانوادگی', accessor: 'lastName' },
    { header: 'کد ملی', accessor: 'nationalId' },
    { header: 'شماره تماس', accessor: 'phone' },
    { header: 'تخصص', accessor: 'specialty', cell: (row) => <Badge variant="info">{row.specialty}</Badge> },
    { header: 'وضعیت همکاری', accessor: 'status', cell: (row) => <Badge variant={row.status === 'فعال' ? 'success' : 'danger'}>{row.status}</Badge> },
    {
      header: 'کلاس‌ها',
      accessor: 'classes',
      cell: (row) => <span className="text-xs text-slate-600">{row.classes.join('، ')}</span>
    },
    {
      header: 'عملیات',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <button className="text-amber-600 flex items-center gap-1" onClick={() => toggleStatus(row.id)}>
            {row.status === 'فعال' ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {row.status === 'فعال' ? 'غیرفعال' : 'فعال'}
          </button>
        </div>
      )
    }
  ];

  const toggleStatus = (id) => {
    setData((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === 'فعال' ? 'غیرفعال' : 'فعال' } : t)));
    toast.success('وضعیت مربی بروزرسانی شد');
  };

  const addTrainer = (values) => {
    setData((prev) => [...prev, { ...values, id: `t${prev.length + 1}`, classes: values.classes ? [values.classes] : [] }]);
    toast.success('مربی اضافه شد');
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">مدیریت مربیان</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="w-4 h-4" /> افزودن مربی
        </Button>
      </div>

      <DataTable columns={columns} data={data} />

      <TrainerModal open={open} onClose={() => setOpen(false)} onSubmit={addTrainer} />
    </div>
  );
}

function TrainerModal({ open, onClose, onSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { firstName: '', lastName: '', nationalId: '', phone: '', specialty: 'بدنسازی', classes: classes[0]?.title }
  });

  const submit = (values) => {
    onSubmit(values);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} title="افزودن مربی">
      <form className="space-y-3" onSubmit={handleSubmit(submit)}>
        <div className="grid grid-cols-2 gap-2">
          <Input label="نام" {...register('firstName', { required: true })} />
          <Input label="نام خانوادگی" {...register('lastName', { required: true })} />
        </div>
        <Input label="کد ملی" {...register('nationalId', { required: true })} />
        <Input label="شماره تماس" {...register('phone', { required: true })} />
        <Input label="تخصص" {...register('specialty')} />
        <Select label="کلاس مرتبط" {...register('classes')}>
          {classes.map((c) => (
            <option key={c.id} value={c.title}>
              {c.title}
            </option>
          ))}
        </Select>
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
