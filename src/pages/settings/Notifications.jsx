import { useMemo, useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { notifications as seedNotifications } from '../../data/mockData';
import DataTable from '../../tables/DataTable';
import Select from '../../ui/Select';
import SearchBar from '../../ui/SearchBar';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';

export default function Notifications() {
  const [data, setData] = useState(seedNotifications);
  const [filters, setFilters] = useState({ type: 'all', status: 'all' });
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      data
        .filter((n) => (filters.type === 'all' ? true : n.type === filters.type))
        .filter((n) => (filters.status === 'all' ? true : n.status === filters.status))
        .filter((n) => n.title.includes(search) || n.message.includes(search)),
    [data, filters, search]
  );

  const columns = [
    { header: 'عنوان', accessor: 'title' },
    { header: 'پیام', accessor: 'message' },
    { header: 'کانال', accessor: 'channel' },
    { header: 'نوع', accessor: 'type' },
    {
      header: 'وضعیت',
      accessor: 'status',
      cell: (row) => <Badge variant={row.status === 'خوانده نشده' ? 'warning' : 'success'}>{row.status}</Badge>
    },
    {
      header: 'عملیات',
      accessor: 'actions',
      cell: (row) => (
        <Button variant="outline" onClick={() => markAsRead(row.id)} className="text-emerald-700">
          <CheckCircle className="w-4 h-4" /> خوانده شد
        </Button>
      )
    }
  ];

  const markAsRead = (id) => {
    setData((prev) => prev.map((n) => (n.id === id ? { ...n, status: 'خوانده شده' } : n)));
    toast.success('اعلان خوانده شد');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="جستجو اعلان" />
        <Select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}>
          <option value="all">همه نوع‌ها</option>
          <option value="پرداخت">پرداخت</option>
          <option value="کلاس">کلاس</option>
          <option value="تمدید">تمدید</option>
        </Select>
        <Select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
          <option value="all">همه</option>
          <option value="خوانده نشده">خوانده نشده</option>
          <option value="خوانده شده">خوانده شده</option>
        </Select>
        <Badge variant="info" className="flex items-center gap-1">
          <Bell className="w-4 h-4" /> مرکز اعلان‌ها
        </Badge>
      </div>

      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
