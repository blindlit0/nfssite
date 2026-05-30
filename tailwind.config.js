/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',
        'primary-hover': '#b91c1c',
        accent: '#16a34a',
        'accent-hover': '#15803d',
        secondary: '#2563eb',
        'secondary-hover': '#1d4ed8',
        muted: '#64748b',
        surface: '#f8fafc',
        border: '#e2e8f0',
      },
    },
  },
  plugins: [],
}

