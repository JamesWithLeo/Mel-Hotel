/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['cinzel'],
        'fauna': ['fauna'],
        'edu': ['edu'],
        'bebas': ['bebas']
      },
      colors: {
        'contrast': '#ED7D31',
        'primarydarker': '#6C5F5B',
        'primarydark': '#4F4A45',
        'light': '#F6F1EE',
      }
    },
  },
  plugins: [],
}

