/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "main-dark": "url('/src/assets/images/hero-dark@90.dba36cdf.jpg')",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      animation: {
        shaking: "shake 0.8s ease-in-out",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-3px, 0, 0)",
            outline: "1px solid #f87171",
          },
          "20%, 80%": {
            transform: "translate3d(4px, 0, 0)",
            outline: "1px solid #f87171",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-5px, 0, 0)",
            outline: "1px solid #f87171",
          },
          "40%, 60%": {
            transform: "translate3d(5px, 0, 0)",
            outline: "1px solid #f87171",
          },
        },
      },
    },
  },

  plugins: [],
};
