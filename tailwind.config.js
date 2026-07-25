/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // KHOJ Design System Colors
        primary: {
          DEFAULT: '#59200F',
          light: '#873415',
          dark: '#3d1509',
        },
        copper: {
          DEFAULT: '#A64B2A',
          light: '#C5633A',
        },
        cream: {
          DEFAULT: '#FFF9ED',
          warm: '#EBE2C8',
          parchment: '#F7EED2',
          deep: '#F1E8CD',
        },
        sage: {
          DEFAULT: '#B7B9A2',
          dark: '#4A5D4E',
        },
        ink: {
          DEFAULT: '#1F1C0B',
          brown: '#3E2723',
          muted: '#56423C',
          light: '#6D4C41',
        },
        peach: '#FFDED4',
        gold: '#F9BC50',
      },

      // Use Bricolage Grotesque everywhere
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Bricolage Grotesque"', 'sans-serif'],
        serif: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"Bricolage Grotesque"', 'sans-serif'],
      },

      borderRadius: {
        ticket: '24px',
      },

      boxShadow: {
        ledger: '0px 25px 50px -12px rgba(0,0,0,0.25)',
        card: '0px 4px 20px rgba(3,22,53,0.08)',
        pin: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
      },

      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideLeft 0.5s ease forwards',
      },

      keyframes: {
        fadeUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(24px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },

        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },

        slideLeft: {
          '0%': {
            opacity: 0,
            transform: 'translateX(24px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
};