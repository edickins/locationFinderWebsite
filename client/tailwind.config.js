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
        'dark-secondary-color': '#ff8269',
        'dark-primary-color': '#8372CE',
        'light-panel': '#BAD6CA',
        'light-panel-secondary': '#BAD6CA',
        'light-secondary-color': '#7f1d1d',
        'light-primary-color': '#233617'
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
