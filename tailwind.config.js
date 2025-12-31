/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn Variable', 'Vazirmatn', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        primary: '#ef4444',
        dark: '#0b1220',
        gray: '#94a3b8'
      }
    }
  },
  plugins: []
};
