import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: "#1AA7B0",
      black: "#1A1A1C",
      deepGray: "#4E4E4E",
      gray: "#CCCCCC",
      thinGray: "#E6E6E6",
      white: "#FFFFFF",
    },
    fontFamily: {
      dot: ["DotGothic16", "sans-serif"],
    },
  },
};
export default config;
