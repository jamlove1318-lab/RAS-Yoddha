/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rajasthan: {
          saffron: '#FF7722',
          maroon: '#800000',
          sand: '#E6C280',
          gold: '#D4AF37',
          royal: '#1A365D',
          desert: '#F4E8C1'
        }
      }
    },
  },
  plugins: [],
}
