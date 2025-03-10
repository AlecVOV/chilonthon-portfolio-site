import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'eerie-black': '#1E1E1E',
        'onyx': '#252525',
        'jet': '#333333',
        'orange-yellow': '#FFB400',
      },
      backgroundImage: {
        'gradient-onyx': 'linear-gradient(to bottom right, #1E1E1E, #252525)',
        'gradient-jet': 'linear-gradient(to bottom right, #333333, #252525)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config