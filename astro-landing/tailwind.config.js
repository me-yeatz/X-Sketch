/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0A0A0C',
        'cyber-blue': '#72A0C1',
        'cyber-cyan': '#A5D8FF',
        'cyber-cream': '#E2E2D0',
        'cyber-red': '#EF4444',
      },
      fontFamily: {
        'mono': ['"Courier New"', 'monospace'],
        'sans': ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
