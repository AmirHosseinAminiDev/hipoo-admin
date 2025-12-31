import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit3, Eye, Trash2, RefreshCcw, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { members as seedMembers, plans } from '../../data/mockData';
import DataTable from '../../tables/DataTable';
import SearchBar from '../../ui/SearchBar';
import Select from '../../ui/Select';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Pagination from '../../ui/Pagination';

export default function Members() {
  const [data, setData] = useState(seedMembers);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ plan: 'all', status: 'all', payment: 'all', endDate: '' });
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ open: false, mode: 'create', member: null, type: 'edit' });
  const pageSize = 5;

  const filtered = useMemo(() => {
    return data
      .filter((m) =>
        [m.firstName, m.lastName, m.nationalId, m.phone].some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      )
      .filter((m) => (filters.plan === 'all' ? true : m.plan === filters.plan))
      .filter((m) => (filters.status === 'all' ? true : m.status === filters.status))
      .filter((m) => (filters.payment === 'all' ? true : m.paymentStatus === filters.payment))
      .filter((m) => (filters.endDate ? m.endDate === filters.endDate : true));
  }, [data, search, filters]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { header: 'نام', accessor: 'firstName' },
    { header: 'نام خانوادگی', accessor: 'lastName' },
    { header: 'کد ملی', accessor: 'nationalId', sortable: true },
    { header: 'شماره تماس', accessor: 'phone' },
    {
      header: 'وضعیت عضویت',
      accessor: 'status',
      cell: (row) => (
        <Badge variant={row.status === 'فعال' ? 'success' : 'danger'}>{row.status}</Badge>
      )
    },
    { header: 'تاریخ شروع', accessor: 'startDate' },
    { header: 'تاریخ پایان', accessor: 'endDate' },
    { header: 'پلن', accessor: 'plan' },
    {
      header: 'وضعیت پرداخت',
      accessor: 'paymentStatus',
      cell: (row) => (
        <Badge
          variant={row.paymentStatus === 'موفق' ? 'success' : row.paymentStatus === 'بدهکار' ? 'warning' : 'danger'}
        >
          {row.paymentStatus}
        </Badge>
      )
    },
    {
      header: 'عملیات',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <Link to={`/admin/members/${row.id}`} className="text-primary flex items-center gap-1">
            <Eye className="w-4 h-4" /> مشاهده
          </Link>
          <button onClick={() => openModal('edit', row)} className="text-blue-600 flex items-center gap-1">
            <Edit3 className="w-4 h-4" /> ویرایش
          </button>
          <button onClick={() => handleRemove(row.id)} className="text-red-600 flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> حذف
          </button>
          <button onClick={() => openModal('renew', row)} className="text-amber-600 flex items-center gap-1">
            <RefreshCcw className="w-4 h-4" /> تمدید
          </button>
          <button onClick={() => toggleActive(row.id)} className="text-emerald-600 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> {row.active ? 'غیرفعال' : 'فعال'}
          </button>
        </div>
      )
    }
  ];

  const openModal = (type, member = null) => {
    setModal({ open: true, type, member });
  };

  const handleRemove = (id) => {
    setData((prev) => prev.filter((m) => m.id !== id));
    toast.success('عضو حذف شد');
  };

  const toggleActive = (id) => {
    setData((prev) => prev.map((m) => (m.id === id ? { ...m, active: !m.active, status: m.active ? 'منقضی' : 'فعال' } : m)));
    toast.success('وضعیت به‌روزرسانی شد');
  };

  const handleSave = (values) => {
    if (modal.type === 'edit') {
      setData((prev) => prev.map((m) => (m.id === modal.member.id ? { ...m, ...values } : m)));
      toast.success('عضو ویرایش شد');
    } else {
      setData((prev) => [...prev, { ...values, id: `m${prev.length + 1}`, payments: [], debt: 0 }]);
      toast.success('عضو جدید افزوده شد');
    }
    setModal({ open: false, type: 'edit', member: null });
  };

  const handleRenew = (values) => {
    setData((prev) =>
      prev.map((m) =>
        m.id === modal.member.id
          ? {
              ...m,
              plan: values.plan,
              endDate: values.endDate,
              status: 'فعال',
              renewals: (m.renewals || 0) + 1
            }
          : m
      )
    );
    toast.success('تمدید انجام شد');
    setModal({ open: false, type: 'edit', member: null });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <SearchBar value={search} onChange={setSearch} placeholder="جستجو نام، کدملی یا شماره" />
          <Select value={filters.plan} onChange={(e) => setFilters((f) => ({ ...f, plan: e.target.value }))}>
            <option value="all">همه پلن‌ها</option>
            {plans.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </Select>
          <Select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
            <option value="all">همه وضعیت‌ها</option>
            <option value="فعال">فعال</option>
            <option value="منقضی">منقضی</option>
          </Select>
          <Select value={filters.payment} onChange={(e) => setFilters((f) => ({ ...f, payment: e.target.value }))}>
            <option value="all">همه پرداخت‌ها</option>
            <option value="موفق">موفق</option>
            <option value="ناموفق">ناموفق</option>
            <option value="بدهکار">بدهکار</option>
          </Select>
          <Input
            type="text"
            placeholder="تاریخ پایان (مثلاً 1403/08/01)"
            value={filters.endDate}
            onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
          />
        </div>
        <Button onClick={() => openModal('create')} className="self-end">
          <PlusCircle className="w-4 h-4" /> عضو جدید
        </Button>
      </div>

      <DataTable columns={columns} data={paged} />
      <Pagination page={page} total={filtered.length} pageSize={pageSize} onChange={setPage} />

      <MemberModal modal={modal} onClose={() => setModal({ open: false, type: 'edit', member: null })} onSave={handleSave} onRenew={handleRenew} />
    </div>
  );
}

function MemberModal({ modal, onClose, onSave, onRenew }) {
  const isRenew = modal.type === 'renew';
  const defaultValues = modal.member || {
    firstName: '',
    lastName: '',
    nationalId: '',
    phone: '',
    status: 'فعال',
    startDate: '',
    endDate: '',
    plan: plans[0]?.name,
    paymentStatus: 'موفق'
  };

  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const submit = (values) => {
    if (isRenew) {
      onRenew(values);
    } else {
      onSave(values);
    }
    reset();
  };

  return (
    <Modal open={modal.open} onClose={onClose} title={isRenew ? 'تمدید عضویت' : modal.type === 'create' ? 'عضو جدید' : 'ویرایش عضو'}>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={handleSubmit(submit)}>
        {!isRenew && (
          <>
            <Input label="نام" {...register('firstName', { required: true })} />
            <Input label="نام خانوادگی" {...register('lastName', { required: true })} />
            <Input label="کد ملی" {...register('nationalId', { required: true })} />
            <Input label="شماره تماس" {...register('phone', { required: true })} />
          </>
        )}
        <Select label="پلن" {...register('plan')}>
          {plans.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </Select>
        <Input label="تاریخ شروع" type="text" placeholder="مثلاً 1403/07/01" {...register('startDate')} />
        <Input label="تاریخ پایان" type="text" placeholder="مثلاً 1403/08/01" {...register('endDate')} />
        {!isRenew && (
          <Select label="وضعیت پرداخت" {...register('paymentStatus')}>
            <option value="موفق">موفق</option>
            <option value="ناموفق">ناموفق</option>
            <option value="بدهکار">بدهکار</option>
          </Select>
        )}
        <div className="sm:col-span-2 flex items-center justify-end gap-2 mt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            انصراف
          </Button>
          <Button type="submit">ذخیره</Button>
        </div>
      </form>
    </Modal>
  );
}
