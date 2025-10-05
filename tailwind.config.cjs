/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Use RGB values for theme switching with opacity support
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        neon: "rgb(var(--color-neon) / <alpha-value>)",
        cyan: "rgb(var(--color-cyan) / <alpha-value>)",
        sub: "rgb(var(--color-sub) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
