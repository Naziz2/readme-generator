/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors (black, gray, gold)
        dark: {
          bg: '#000000',
          surface: '#1a1a1a',
          border: '#333333',
          text: '#e5e5e5',
          accent: '#fbbf24', // gold
        },
        // Light mode colors (purple, blue theme)
        light: {
          bg: '#7c3aed', // purple
          surface: '#8b5cf6',
          border: '#a78bfa',
          text: '#ffffff',
          accent: '#3b82f6', // blue
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(251, 191, 36, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};