/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#8134DF",
      },
      keyframes: {
        "reveal-pop": {
          "0%": {
            transform: "translate(-50%, 10px) scale(0.95)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(-50%, -5px) scale(1.05)",
          },
          "100%": {
            transform: "translate(-50%, 0) scale(1)",
            opacity: "1",
          },
        },
        sparkle: {
          "0%": {
            transform: "translate(-50%, 0) scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(-150%, -20px) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-250%, -10px) scale(0)",
            opacity: "0",
          },
        },
        "sparkle-delayed": {
          "0%": {
            transform: "translate(-50%, 0) scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(50%, -20px) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(150%, -10px) scale(0)",
            opacity: "0",
          },
        },
        "text-reveal": {
          "0%": {
            transform: "translateY(10px)",
            opacity: "0",
            filter: "blur(10px)",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
            filter: "blur(0)",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "reveal-pop": "reveal-pop 0.4s ease-out forwards",
        sparkle: "sparkle 1.2s ease-out forwards",
        "sparkle-delayed": "sparkle-delayed 1.2s ease-out 0.1s forwards",
        "text-reveal": "text-reveal 0.5s ease-out 0.3s forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
