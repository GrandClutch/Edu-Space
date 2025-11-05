/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#10266F",
        secondary: "#59BCF3",
        accent: "#1E80C9",
        lightBg: "#AED2EA",
        darkBg: "#10266F",
      },
      fontFamily: {
        inter: ["Inter_400Regular", "sans-serif"],
        interMedium: ["Inter_500Medium", "sans-serif"],
        interSemiBold: ["Inter_600SemiBold", "sans-serif"],
        interBold: ["Inter_700Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
