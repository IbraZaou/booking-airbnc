/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
      backgroundImage: {
        'gradient': "linear-gradient(108deg, #F5385D 0%, #530010 100%)",
      },
      rotate: {
        '17': '17deg',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

