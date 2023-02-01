/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        screens: {
          sm: "100%",
          md: "100%",
          lg: "670px",
          xl: "670px",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
