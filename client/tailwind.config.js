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
        'light-panel-secondary': '#CBD3C8',
        'light-secondary-color': '#de8154',
        'light-primary-color': '#686d93'
      },
      maxHeight: {
        '45vh': '45vh'
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
