/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Godrej Brand Colors
        godrej: {
          DEFAULT: '#046a38',
          light: '#e5f0ea',
          dark: '#03552e',
        },
        // Accent Colors
        gold: {
          DEFAULT: '#d4af37',
          light: '#f5e8c1',
        },
        // Text Colors
        text: {
          DEFAULT: '#1a1a1a',
          light: '#4a5568',
        },
        // Background Colors
        bg: {
          DEFAULT: '#ffffff',
          light: '#f8f9fa',
        },
        // Border Colors
        border: '#e2e8f0',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-hover': '0 8px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
