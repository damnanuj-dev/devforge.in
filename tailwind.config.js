/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#2A1248',
        'bg-wave': '#8A12F5',
        'ink': '#0F0D14',
        'scarf': '#8F8F94',
        'paper': '#F4F1EC',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        site: '1120px',
      },
      borderRadius: {
        'card': '20px',
        'button': '12px',
        'mascot': '24px',
      }
    },
  },
  plugins: [],
}
