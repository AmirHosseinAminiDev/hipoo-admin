export const exportToCsv = (rows, filename = 'report.csv') => {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [headers.join(',')]
    .concat(rows.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(',')))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.click();
};
