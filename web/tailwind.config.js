/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "primary-color": "primary-color",
      },
      textColor: {
        "fancy-color": "text-fancy-color",
        color: "#1e293b",
      },
    },
  },
  plugins: [],
};
