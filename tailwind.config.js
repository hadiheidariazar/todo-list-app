/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: "640px",
      md: '769px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      screens: {
        xs: "480px",
        ipad: "992px"
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    }
  ],
}

