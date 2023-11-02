/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'Roboto', '"Helvetica Neue"', 'sans-serif']
      },
      colors: {
        'dark-panel': '#15121e',
        'dark-primary-color': '#ff8269',
        'dark-secondary-color': '#8372CE'
      }
    }
  },
  variants: {
    extend: {
      translate: ['active'],
      transform: ['active']
    }
  },
  plugins: []
};
