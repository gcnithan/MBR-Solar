/** @type {import('tailwindcss').Config} */
const calibriStack = ['"Calibre"', 'Calibri', 'Candara', '"Segoe UI"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif']

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#99C24D',
          greenDark: '#7DA83A',
          blue: '#2E3192',
          blueSecondary: '#4A55A2',
          sky: '#27A8E0',
          sun: '#FBB03B',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: calibriStack,
        display: calibriStack,
        body: calibriStack,
        mono: calibriStack,
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(153,194,77,0.35)' },
          '50%': { boxShadow: '0 0 50px rgba(251,176,59,0.45)' },
        }
      }
    },
  },
  plugins: [],
}
