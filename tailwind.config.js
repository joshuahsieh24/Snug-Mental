/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f7',
          100: '#ccefef',
          200: '#99dfdf',
          300: '#66cfcf',
          400: '#33bfbf',
          500: '#00afaf',
          600: '#008c8c',
          700: '#006969',
          800: '#004646',
          900: '#002323',
        },
        secondary: {
          50: '#f3f0fb',
          100: '#e7e0f7',
          200: '#cfc2ef',
          300: '#b7a3e7',
          400: '#9f85df',
          500: '#8766d7',
          600: '#6c52ac',
          700: '#513d81',
          800: '#362956',
          900: '#1b142b',
        },
        accent: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#fee799',
          300: '#fedb66',
          400: '#fdcf33',
          500: '#fdc300',
          600: '#ca9c00',
          700: '#987500',
          800: '#654e00',
          900: '#322700',
        }
      },
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};