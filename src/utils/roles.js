export const roleLabels = {
  admin: 'ادمین',
  receptionist: 'پذیرش',
  finance: 'مالی',
  trainer: 'مربی'
};

export const rolesConfig = {
  admin: {
    permissions: ['dashboard', 'members', 'payments', 'classes', 'trainers', 'settings', 'notifications'],
    defaultRoute: '/admin'
  },
  receptionist: {
    permissions: ['dashboard', 'members', 'classes', 'notifications'],
    defaultRoute: '/admin/members'
  },
  finance: {
    permissions: ['dashboard', 'payments', 'notifications'],
    defaultRoute: '/admin/payments'
  },
  trainer: {
    permissions: ['dashboard', 'members', 'classes', 'notifications'],
    defaultRoute: '/admin/classes'
  }
};

export const canAccess = (role, section) => rolesConfig[role]?.permissions.includes(section);
