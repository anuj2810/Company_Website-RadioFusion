

// frontend/tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Professional Corporate Color Palette - Muted & Calm
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9', 
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Muted slate blue - Main accent (desaturated)
          600: '#475569',
          700: '#334155',
          800: '#1e293b', // Charcoal - Primary dark
          900: '#0f172a',
          950: '#0A1F44'  // Deep Navy Blue - Primary darkest
        },
        secondary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626', // Warm charcoal
          900: '#171717',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Muted sky blue - Accent (desaturated)
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neutral: {
          50: '#fafafa',   // Soft White
          100: '#f5f7fa',  // Cool Gray (warmer)
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        background: '#fafafa', // Soft off-white instead of pure white
        surface: '#f5f7fa',    // Warm gray surface
        success: '#059669',    // Muted green
        warning: '#d97706',    // Muted amber
        error: '#dc2626'       // Muted red
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', ...defaultTheme.fontFamily.sans],
        heading: ['Inter', 'system-ui', ...defaultTheme.fontFamily.sans],
        body: ['Inter', 'system-ui', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'corporate': '1.75rem', // 28px - Increased for softer look
        'premium': '2rem',      // 32px - More premium feel
        'hero': '2.5rem',       // 40px - For hero sections
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'soft': '0 6px 18px rgba(10, 20, 30, 0.06)', // Softer, less contrast
        'corporate': '0 10px 30px rgba(10, 20, 30, 0.08)', // Professional depth
        'premium': '0 20px 40px rgba(10, 20, 30, 0.12)', // Premium elevation
        'glow': '0 0 30px rgba(100, 116, 139, 0.15)', // Muted glow
        'glow-accent': '0 0 25px rgba(14, 165, 233, 0.12)', // Subtle accent glow
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
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
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    }
  },
  plugins: [
      require('@tailwindcss/forms')
    ]
};
