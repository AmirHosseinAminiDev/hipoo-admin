import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { payments as seedPayments } from '../../data/mockData';
import DataTable from '../../tables/DataTable';
import SearchBar from '../../ui/SearchBar';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Pagination from '../../ui/Pagination';
import Badge from '../../ui/Badge';
import { exportToCsv } from '../../utils/csvExport';
import { formatCurrency } from '../../utils/format';

export default function Payments() {
  const [data, setData] = useState(seedPayments);
  const [filters, setFilters] = useState({ status: 'all' });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return data
      .filter((p) => (filters.status === 'all' ? true : p.status === filters.status))
      .filter((p) => p.member.toLowerCase().includes(search.toLowerCase()));
  }, [data, filters, search]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { header: 'مبلغ', accessor: 'amount', cell: (row) => `${formatCurrency(row.amount)} تومان`, sortable: true },
    { header: 'تاریخ', accessor: 'date' },
    { header: 'روش پرداخت', accessor: 'method' },
    {
      header: 'وضعیت',
      accessor: 'status',
      cell: (row) => <Badge variant={row.status === 'موفق' ? 'success' : 'danger'}>{row.status}</Badge>
    },
    { header: 'عضو', accessor: 'member' }
  ];

  const addPayment = (values) => {
    setData((prev) => [{ ...values, id: `pay${prev.length + 1}` }, ...prev]);
    toast.success('پرداخت ثبت شد');
    setOpen(false);
  };

  const exportCsv = () => {
    exportToCsv(filtered, 'financial-report.csv');
    toast.success('فایل CSV آماده شد');
  };

  const revenueWeek = filtered.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="جستجو عضو" />
          <Select value={filters.status} onChange={(e) => setFilters({ status: e.target.value })}>
            <option value="all">همه</option>
            <option value="موفق">موفق</option>
            <option value="ناموفق">ناموفق</option>
          </Select>
          <Badge variant="info">درآمد جاری: {formatCurrency(revenueWeek)} تومان</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportCsv}>
            <Download className="w-4 h-4" /> خروجی CSV
          </Button>
          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="w-4 h-4" /> ثبت پرداخت
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={paged} />
      <Pagination page={page} total={filtered.length} pageSize={pageSize} onChange={setPage} />

      <PaymentModal open={open} onClose={() => setOpen(false)} onSubmit={addPayment} />
    </div>
  );
}

function PaymentModal({ open, onClose, onSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { amount: '', date: '', method: 'آنلاین', status: 'موفق', member: '' }
  });

  const submit = (values) => {
    onSubmit({ ...values, amount: Number(values.amount) });
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} title="ثبت پرداخت">
      <form className="space-y-3" onSubmit={handleSubmit(submit)}>
        <Input label="مبلغ" type="number" {...register('amount', { required: true })} />
        <Input label="تاریخ" placeholder="مثلاً 1403/07/01" {...register('date', { required: true })} />
        <Select label="روش پرداخت" {...register('method')}>
          <option value="کارت">کارت</option>
          <option value="نقدی">نقدی</option>
          <option value="آنلاین">آنلاین</option>
        </Select>
        <Select label="وضعیت" {...register('status')}>
          <option value="موفق">موفق</option>
          <option value="ناموفق">ناموفق</option>
        </Select>
        <Input label="عضو" placeholder="نام عضو" {...register('member', { required: true })} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            انصراف
          </Button>
          <Button type="submit">ثبت</Button>
        </div>
      </form>
    </Modal>
  );
}
