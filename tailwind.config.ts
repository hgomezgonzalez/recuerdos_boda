import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wedding-blue': '#0B3C5D',
        'wedding-ochre': '#CFA15A',
        'wedding-ivory': '#F7F3EB',
        'wedding-blue-dark': '#072940',
        'wedding-ochre-light': '#E4C280',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        'lever-pull': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(-15deg) scale(0.95)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
