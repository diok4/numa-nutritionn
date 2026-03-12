import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NUMA Brand palette (Brandbook aligned)
        forest: '#0A0A0A',   // near-black — dark backgrounds, primary text
        moss:   '#3DDC84',   // bright NUMA green — primary accent
        sage:   '#D4F7E8',   // light mint — text on dark, light accents
        beige:  '#F4F4F4',   // neutral light gray — section backgrounds
        cream:  '#FFFFFF',   // pure white — card backgrounds
        mint:   '#25C46F',   // deeper green — secondary accent
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        float:        'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        shimmer:      'shimmer 2.5s linear infinite',
        'spin-slow':  'spin 20s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
