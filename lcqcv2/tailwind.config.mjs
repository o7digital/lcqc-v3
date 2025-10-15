/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  safelist: [
    'reservation-box', // 👈 fuerza a Tailwind a mantener tu clase personalizada
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
