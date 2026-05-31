/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        gold: '#FFD700',
        'gold-dim': '#B8860B',
        'gold-mid': '#E6BE8A',
        'gold-light': '#F0C848',
        surface: '#111111',
        bg: '#0a0a0a',
        text: '#F5F0E8',
      },
      animation: {
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        blink: 'blink 1s step-end infinite',
        'gold-pulse': 'goldPulse 3s ease-in-out infinite',
      },
      keyframes: {
        scrollPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255, 215, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
