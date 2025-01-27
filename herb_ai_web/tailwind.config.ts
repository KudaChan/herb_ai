import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        primary: "#164d36",
        secondary: "#edfaec",
        tertiary: "#afe5b1",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#fbf9f5",
        "btn": "#3ec040",
      },
    },
  },
  plugins: [],
} satisfies Config;
