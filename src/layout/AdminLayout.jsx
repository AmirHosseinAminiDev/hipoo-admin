import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-dark">
      <Sidebar />
      <main className="flex-1 px-4 sm:px-8">
        <Header />
        <Breadcrumbs />
        <div className="pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
