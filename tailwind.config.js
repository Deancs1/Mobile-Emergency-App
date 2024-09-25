/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line to scan your components for class names
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
