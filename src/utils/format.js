export const formatCurrency = (value) => new Intl.NumberFormat('fa-IR').format(value);
export const formatDate = (value) => value;

export const membershipStatusColor = {
  فعال: 'green',
  منقضی: 'red',
  بدهکار: 'amber'
};
