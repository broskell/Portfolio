/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#000000',
        surface: '#0d0d0d',
        card: '#141414',
        line: '#262626',
        ink: '#ffffff',
        muted: '#9ca3af'
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(255,255,255,0.12)'
      }
    }
  },
  plugins: []
}
