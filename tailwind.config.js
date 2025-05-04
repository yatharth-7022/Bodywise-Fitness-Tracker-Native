// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D6FC03",  // Your lime color
        secondary: "#3B82F6", // Your blue color
      },
    },
  },
  plugins: [],
}