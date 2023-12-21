/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gradientColorStops: theme => ({
        'blue-600': theme('colors.blue.600'),
        'blue-400': theme('colors.blue.400'),
        'purple-700': theme('colors.purple.700'),
        'purple-500': theme('colors.purple.500'),
        'green-500': theme('colors.green.500'),
        'green-300': theme('colors.green.300'),
        'orange-500': theme('colors.orange.500'),
        'orange-300': theme('colors.orange.300'),
      }),
    },
    colors: {
      ...colors,
      primary: colors.purple,
      secondary: colors.pink,
    },
  },
  plugins: [],
};
