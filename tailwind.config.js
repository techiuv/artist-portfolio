/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#070707',
        'active': '#6F6969',
        'nav-bg': '#2C2B2B',
        'shadow-color': '#FF7B00',
        'secondary-color': '#1F1F1F82',
        'primary-color': '#2E251C',
        'accent-color': '#0097FB',
      },
    },
  },
  plugins: [],
}
