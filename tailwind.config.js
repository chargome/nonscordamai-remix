/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      animation: {
        "logo-pulse": "pulse 4s cubic-bezier(0, 0, 0, 0.5) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
