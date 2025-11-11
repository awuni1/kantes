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
        'deep-charcoal': '#0A0A0A',
        'cool-gray': '#C8C8C8',
        'neon-blue': '#0FF0FC',
        'role-architect': '#0FF0FC',
        'role-contractor': '#FF8C42',
        'role-engineer': '#4ECCA3',
        'role-firm': '#8B5CF6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-electric': 'linear-gradient(135deg, #0FF0FC 0%, #8B5CF6 100%)',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(15, 240, 252, 0.8)',
        'neon-glow-sm': '0 0 10px rgba(15, 240, 252, 0.6)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}

export default config
