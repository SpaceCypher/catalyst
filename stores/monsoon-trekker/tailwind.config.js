/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          dark: '#070c14',
          card: '#0d1527',
          border: '#1e293b'
        }
      }
    },
  },
  plugins: [],
};
