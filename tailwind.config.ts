import type { Config } from 'tailwindcss';

export default {
  darkMode: 'selector',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx, css}',
    './app/**/*.{js,ts,jsx,tsx,mdx, css}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
