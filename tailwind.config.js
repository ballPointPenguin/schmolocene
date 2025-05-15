/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0d8edc',
          600: '#0070bb',
          700: '#015998',
          800: '#064a7d',
          900: '#0a3e68',
          950: '#07264a',
        },
        earth: {
          brown: '#8B4513',
          tan: '#D2B48C',
          green: '#228B22',
          blue: '#1E90FF',
          red: '#CD5C5C',
          gray: '#708090',
          dark: '#2F4F4F'
        }
      },
    },
  },
  plugins: [],
}
