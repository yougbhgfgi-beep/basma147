/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
        vibes: ['Great Vibes', 'cursive'],
      },
      colors: {
        'deep-rose': '#C8557A',
        'blush-pink': '#F4C2C2',
        'warm-cream': '#FFF8F5',
        'soft-lavender': '#D4BBDD',
        'dusty-mauve': '#9B7B8F',
        'dark-plum': '#4A2C3F',
        'gold-accent': '#D4A853',
    },
    boxShadow: {
      'romantic': '0 4px 24px rgba(200, 85, 122, 0.35)',
      'gold': '0 4px 24px rgba(212, 168, 83, 0.4)',
      'glow': '0 0 30px rgba(212, 168, 83, 0.2)',
    },
    },
  },
  plugins: [],
}
