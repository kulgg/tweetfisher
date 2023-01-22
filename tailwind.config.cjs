/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        screens: {
          sm: "100%",
          md: "100%",
          lg: "800px",
          xl: "800px",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
