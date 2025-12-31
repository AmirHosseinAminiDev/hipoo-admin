import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    return { label: segment === 'admin' ? 'داشبورد' : segment, path };
  });

  return (
    <nav className="text-xs text-slate-500 mb-3">
      <ul className="flex items-center gap-2">
        <li>
          <Link to="/admin" className="hover:text-primary">
            خانه
          </Link>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <span>/</span>
            {idx === crumbs.length - 1 ? (
              <span className="text-primary font-semibold">{crumb.label}</span>
            ) : (
              <Link className="hover:text-primary" to={crumb.path}>
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
