import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';
import { useThemeStore } from './store/themeStore';
import './index.css';

const ThemeWatcher = () => {
  const theme = useThemeStore((state) => state.theme);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeWatcher />
      <Toaster position="top-center" />
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
