import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { rolesConfig } from '../utils/roles';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { token, role } = useAuthStore();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const permitted = allowedRoles ? allowedRoles.includes(role) : true;
  if (!permitted) {
    const defaultRoute = rolesConfig[role]?.defaultRoute || '/admin';
    return <Navigate to={defaultRoute} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
