const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.js', './src/components/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
    },
    fontFamily: {
      roboto: ['var(--font-roboto)', 'sans-serif'],
    },
  },
};
