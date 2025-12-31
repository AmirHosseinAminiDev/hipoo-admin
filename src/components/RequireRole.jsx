import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function RequireRole({ roles, children }) {
  const { role } = useAuthStore();
  if (!roles.includes(role)) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
