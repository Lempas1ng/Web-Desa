/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Warna biru langit (bisa diganti sesuai tema desa)
        secondary: '#64748b',
      }
    },
  },
  plugins: [],
}