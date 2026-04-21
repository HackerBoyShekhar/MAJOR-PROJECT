/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // allowing dark mode toggles explicitly
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          light: '#c084fc',
          DEFAULT: '#a855f7',
          dark: '#9333ea',
        },
        dark: {
          100: '#1E293B',
          200: '#0F172A',
          300: '#020617',
          400: '#010413',
        }
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 15px -5px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 8px 20px -5px rgba(0, 0, 0, 0.1)',
        'glow-primary': '0 0 20px rgba(14, 165, 233, 0.4)',
        'glow-accent': '0 0 20px rgba(168, 85, 247, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'move-bg': 'move-bg 15s ease infinite',
        'border-move': 'border-move 6s linear infinite',
        'pulse-slow': 'pulse 4s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'move-bg': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'border-move': {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '300%' },
        },
      }
    },
  },
  plugins: [],
}
