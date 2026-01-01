import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import RequireRole from '../components/RequireRole';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Members from '../pages/members/Members';
import MemberDetails from '../pages/members/MemberDetails';
import Payments from '../pages/payments/Payments';
import Classes from '../pages/classes/Classes';
import Trainers from '../pages/trainers/Trainers';
import Settings from '../pages/settings/Settings';
import Notifications from '../pages/settings/Notifications';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<Login />} />
      <Route element={<ProtectedRoute allowedRoles={[ 'admin', 'receptionist', 'finance', 'trainer' ]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <RequireRole roles={[ 'admin', 'receptionist', 'finance', 'trainer' ]}>
                <Dashboard />
              </RequireRole>
            }
          />
          <Route
            path="members"
            element={
              <RequireRole roles={[ 'admin', 'receptionist', 'trainer' ]}>
                <Members />
              </RequireRole>
            }
          />
          <Route
            path="members/:id"
            element={
              <RequireRole roles={[ 'admin', 'receptionist', 'trainer' ]}>
                <MemberDetails />
              </RequireRole>
            }
          />
          <Route
            path="payments"
            element={
              <RequireRole roles={[ 'admin', 'finance' ]}>
                <Payments />
              </RequireRole>
            }
          />
          <Route
            path="classes"
            element={
              <RequireRole roles={[ 'admin', 'receptionist', 'trainer' ]}>
                <Classes />
              </RequireRole>
            }
          />
          <Route
            path="trainers"
            element={
              <RequireRole roles={[ 'admin', 'receptionist' ]}>
                <Trainers />
              </RequireRole>
            }
          />
          <Route
            path="settings"
            element={
              <RequireRole roles={[ 'admin' ]}>
                <Settings />
              </RequireRole>
            }
          />
          <Route
            path="notifications"
            element={
              <RequireRole roles={[ 'admin', 'receptionist', 'finance', 'trainer' ]}>
                <Notifications />
              </RequireRole>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
