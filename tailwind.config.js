module.exports = {
  mode: "jit",
  darkMode: "class",
  // These paths are just examples, customize them to match your project structure
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
