/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0c8ce9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#082f49',
          razor: '#0c2340',
          blue: '#3395ff'
        },
        surface: {
          dark: '#0a0d14',
          card: '#111726',
          cardLighter: '#172033',
          border: '#1f293d',
          borderLight: '#2e3d5b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
