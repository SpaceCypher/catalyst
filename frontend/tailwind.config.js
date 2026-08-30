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
          50: '#f8fafc',
          100: '#f1f5f9',
          400: '#93c5fd', // Soft Ice Blue
          500: '#60a5fa', // Muted Platinum Blue
          600: '#3b82f6', // Calm Deep Blue
          700: '#2563eb',
          900: '#1e293b',
          razor: '#0f172a',
          blue: '#93c5fd',
          cyan: '#7dd3fc',
          emerald: '#86efac', // Soft Sage Emerald
          rose: '#fda4af',    // Soft Coral Slate
          amber: '#fde68a',   // Soft Muted Warmth
        },
        surface: {
          dark: '#090a0f',      // Deep Zinc Canvas
          obsidian: '#0d0f17',  // Charcoal Canvas
          card: '#121624',      // Soft Card Surface
          cardLighter: '#171c2e',
          border: '#272d3d',    // Warm Slate Border
          borderLight: '#384156'
        }
      },
      fontFamily: {
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        space: ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}
