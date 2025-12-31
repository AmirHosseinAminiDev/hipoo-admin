import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import DataTable from '../../tables/DataTable';
import { discounts as seedDiscounts, plans as seedPlans } from '../../data/mockData';

export default function Settings() {
  const contactForm = useForm({ defaultValues: { phone: '02112345678', address: 'تهران، خیابان مثال', hours: '۶ صبح تا ۱۲ شب' } });
  const rulesForm = useForm({ defaultValues: { rules: 'ورود با کارت، استفاده از حوله، احترام به دیگران', messages: 'سلام! عضویت شما رو به پایان است.' } });
  const [plans, setPlans] = useState(seedPlans);
  const [discounts, setDiscounts] = useState(seedDiscounts);
  const [openPlan, setOpenPlan] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false);

  const planColumns = [
    { header: 'عنوان پلن', accessor: 'name' },
    { header: 'مدت', accessor: 'duration' },
    { header: 'قیمت (تومان)', accessor: 'price' }
  ];

  const discountColumns = [
    { header: 'کد', accessor: 'code' },
    { header: 'درصد', accessor: 'value' },
    { header: 'توضیح', accessor: 'description' },
    { header: 'وضعیت', accessor: 'active', cell: (row) => (row.active ? 'فعال' : 'غیرفعال') }
  ];

  const saveContact = (values) => {
    toast.success('تنظیمات ذخیره شد');
    contactForm.reset(values);
  };

  const saveRules = (values) => {
    toast.success('پیام‌ها بروزرسانی شد');
    rulesForm.reset(values);
  };

  const addPlan = (values) => {
    setPlans((prev) => [...prev, { ...values, id: `p${prev.length + 1}` }]);
    toast.success('پلن اضافه شد');
    setOpenPlan(false);
  };

  const addDiscount = (values) => {
    setDiscounts((prev) => [...prev, { ...values, id: `d${prev.length + 1}`, active: values.active === 'true' }]);
    toast.success('کد تخفیف اضافه شد');
    setOpenDiscount(false);
  };

  return (
    <div className="space-y-6">
      <section className="card p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <form className="space-y-3" onSubmit={contactForm.handleSubmit(saveContact)}>
          <h3 className="font-bold text-lg">اطلاعات تماس</h3>
          <Input label="تلفن" {...contactForm.register('phone')} />
          <Input label="آدرس" {...contactForm.register('address')} />
          <Input label="ساعات کاری" {...contactForm.register('hours')} />
          <Button type="submit" className="justify-center">
            <Save className="w-4 h-4" /> ذخیره
          </Button>
        </form>

        <form className="space-y-3" onSubmit={rulesForm.handleSubmit(saveRules)}>
          <h3 className="font-bold text-lg">قوانین و پیام‌ها</h3>
          <Textarea label="قوانین باشگاه" rows={4} {...rulesForm.register('rules')} />
          <Textarea label="پیام‌های آماده" rows={3} {...rulesForm.register('messages')} />
          <Button type="submit" className="justify-center">
            <Save className="w-4 h-4" /> ذخیره
          </Button>
        </form>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">پلن‌ها و قیمت‌ها</h3>
            <Button onClick={() => setOpenPlan(true)}>
              <PlusCircle className="w-4 h-4" /> پلن جدید
            </Button>
          </div>
          <DataTable columns={planColumns} data={plans} />
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">کد تخفیف و جشنواره</h3>
            <Button onClick={() => setOpenDiscount(true)}>
              <PlusCircle className="w-4 h-4" /> تخفیف جدید
            </Button>
          </div>
          <DataTable columns={discountColumns} data={discounts} />
        </div>
      </section>

      <PlanModal open={openPlan} onClose={() => setOpenPlan(false)} onSubmit={addPlan} />
      <DiscountModal open={openDiscount} onClose={() => setOpenDiscount(false)} onSubmit={addDiscount} />
    </div>
  );
}

function PlanModal({ open, onClose, onSubmit }) {
  const form = useForm({ defaultValues: { name: '', duration: '', price: '' } });
  const submit = (values) => {
    onSubmit({ ...values, price: Number(values.price) });
    form.reset();
  };
  return (
    <Modal open={open} onClose={onClose} title="پلن جدید">
      <form className="space-y-3" onSubmit={form.handleSubmit(submit)}>
        <Input label="عنوان" {...form.register('name', { required: true })} />
        <Input label="مدت" {...form.register('duration', { required: true })} />
        <Input label="قیمت" type="number" {...form.register('price', { required: true })} />
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

function DiscountModal({ open, onClose, onSubmit }) {
  const form = useForm({ defaultValues: { code: '', value: '', description: '', active: 'true' } });
  const submit = (values) => {
    onSubmit({ ...values, value: Number(values.value) });
    form.reset();
  };
  return (
    <Modal open={open} onClose={onClose} title="کد تخفیف جدید">
      <form className="space-y-3" onSubmit={form.handleSubmit(submit)}>
        <Input label="کد" {...form.register('code', { required: true })} />
        <Input label="درصد" type="number" {...form.register('value', { required: true })} />
        <Textarea label="توضیح" rows={3} {...form.register('description')} />
        <Select label="فعال باشد؟" {...form.register('active')}>
          <option value="true">بله</option>
          <option value="false">خیر</option>
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
