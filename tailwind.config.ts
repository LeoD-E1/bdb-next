import type { Config } from 'tailwindcss';

export default {
  darkMode: 'selector',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx, css}',
    './app/**/*.{js,ts,jsx,tsx,mdx, css}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1240px',
    },
    extend: {
      backgroundImage: {},
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
