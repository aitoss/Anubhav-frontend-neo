/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        rotate: "rotate 3s linear infinite both",
        flip: "flip 6s infinite steps(2, end)",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        rotate: {
          "0%": { transform: "translateX(-50%) translateY(-15%) rotate(0deg)" },
          "100%": {
            transform: "translateX(-50%) translateY(-15%) rotate(360deg)",
          },
        },
        "flip": {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      animationDelay: {
        4: "4s",
      },
      colors: {
        primary: "rgba(50, 51, 55, 1)",
        secondry: "rgba(51, 34, 51, 0.2)",
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      screens: {
        md: { max: "770px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        "md-xl": { min: "769px", max: "940px" },
        "md-2xl": { min: "769px", max: "1240px" },
        // => @media (min-width: 1280px) and (max-width: 1535px) { ... }

        "x-sm": { max: "480px" },
        "lg-xl": { max: "1024px" },
      },
    },
  },
  plugins: [flowbite],
};
