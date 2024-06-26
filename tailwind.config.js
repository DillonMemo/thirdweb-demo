const flowbite = require('flowbite-react/tailwind')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    // flowbite init
    flowbite.content(),
  ],
  theme: {
    screens: {
      xxs: { max: '512px' },
      xs: { max: '608px' },
      sm: { max: '768px' },
      md: { max: '992px' },
      lg: { max: '1280px' },
      xl: { max: '1440px' },
      xxl: { max: '1920px' },
    },
    extend: {},
  },
  plugins: [
    // flowbite init
    flowbite.plugin(),
  ],
}
