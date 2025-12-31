import { create } from 'zustand';

const getInitialAuth = () => {
  if (typeof window === 'undefined') return { token: null, role: null, user: null };
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const user = localStorage.getItem('user');
  return {
    token,
    role,
    user: user ? JSON.parse(user) : null
  };
};

export const useAuthStore = create((set) => ({
  ...getInitialAuth(),
  login: ({ username, role, name }) => {
    const token = `mock-token-${Date.now()}`;
    const user = { username, role, name };
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ token, role, user });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    }
    set({ token: null, role: null, user: null });
  }
}));
