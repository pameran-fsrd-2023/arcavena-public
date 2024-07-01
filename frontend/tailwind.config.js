/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "380px",
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        inknutAntiqua: ['"Inknut Antiqua"', ...defaultTheme.fontFamily.sans],
        jomolhari: ['"Jomolhari"', ...defaultTheme.fontFamily.serif],
        inter: ['"Inter"', ...defaultTheme.fontFamily.serif],
        openSans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        yrsa: ['"Yrsa"', ...defaultTheme.fontFamily.sans],
        lato: ['"Lato"', ...defaultTheme.fontFamily.sans],
        vollkorn: ['"Vollkorn"', ...defaultTheme.fontFamily.serif],
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
